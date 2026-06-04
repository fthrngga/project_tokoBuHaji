<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Payment;
use App\Models\User;
use App\Notifications\InstallmentReminderNotification;
use App\Notifications\CriticalArrearsNotification;
use Illuminate\Support\Facades\Notification;
use Carbon\Carbon;

class CheckInstallmentsCommand extends Command
{
    protected $signature = 'app:check-installments';
    protected $description = 'Check all active installments and send notifications to customers and admins';

    public function handle()
    {
        $this->info("Memulai pengecekan angsuran...");
        
        $activePayments = Payment::whereNotIn('status', ['paid_off', 'repossessed', 'cancelled'])->get();
        $admins = User::where('role', 'admin')->get();

        foreach ($activePayments as $payment) {
            $customer = $payment->order->user;
            if (!$customer) continue;

            $isFlexible = $payment->payment_method === 'cash_gantung';
            $actualVerifiedAmount = $payment->paymentLogs()->where('status', 'verified')->sum('amount');
            $remainingDebt = max(0, $payment->total_amount - $actualVerifiedAmount);
            
            if ($remainingDebt <= 0) continue;

            $monthsPaidFully = $payment->installment_amount > 0 ? floor($actualVerifiedAmount / $payment->installment_amount) : 0;
            $nextDueDateCarbon = null;
            $daysUntilDue = null;
            $tunggakanMonths = 0;

            if ($isFlexible) {
                $nextDueDateCarbon = $payment->created_at->copy()->addMonths($payment->duration_months);
                $daysUntilDue = (int) now()->startOfDay()->diffInDays($nextDueDateCarbon->startOfDay(), false);
                
                if ($daysUntilDue < 0) {
                    $tunggakanMonths = floor(abs($daysUntilDue) / 30);
                }
            } else {
                $nextDueDateCarbon = $payment->created_at->copy()->addMonths($monthsPaidFully + 1);
                $daysUntilDue = (int) now()->startOfDay()->diffInDays($nextDueDateCarbon->startOfDay(), false);
                
                if ($daysUntilDue < 0) {
                    // Cek total bulan berjalan
                    $monthsElapsed = $payment->created_at->diffInMonths(now());
                    $tunggakanMonths = max(0, $monthsElapsed - $monthsPaidFully);
                }
            }

            // 1. Notifikasi Customer (H-7, H-3, H-1, atau sudah nunggak)
            if (in_array($daysUntilDue, [7, 3, 1]) || ($daysUntilDue < 0 && abs($daysUntilDue) % 7 === 0)) {
                $statusMsg = $daysUntilDue < 0 ? "Tunggakan angsuran Anda sudah lewat jatuh tempo." : "Angsuran Anda akan jatuh tempo dalam $daysUntilDue hari.";
                $msg = "$statusMsg Segera lakukan pembayaran sebesar Rp " . number_format($payment->installment_amount, 0, ',', '.') . " untuk pesanan #" . $payment->order_id;
                
                // Cek apakah hari ini sudah dikirim
                $alreadySent = $customer->notifications()
                    ->where('type', InstallmentReminderNotification::class)
                    ->whereDate('created_at', now()->toDateString())
                    ->where('data->target_url', route('customer.installments.index'))
                    ->exists();

                if (!$alreadySent) {
                    $customer->notify(new InstallmentReminderNotification($msg, route('customer.installments.index'), $daysUntilDue));
                }
            }

            // 2. Notifikasi Admin (Tunggakan Kritis >= 3 Bulan)
            if ($tunggakanMonths >= 3) {
                $msgAdmin = "Pelanggan {$customer->name} (Order #{$payment->order_id}) memiliki tunggakan kritis selama $tunggakanMonths bulan.";
                
                // Batasi notifikasi admin seminggu sekali untuk kasus ini
                $alreadySentAdmin = \DB::table('notifications')
                    ->where('type', CriticalArrearsNotification::class)
                    ->where('notifiable_type', User::class)
                    ->where('data', 'like', '%"target_url":"'.route('admin.payments.monitoring').'"%')
                    ->where('data', 'like', "%Order #{$payment->order_id}%")
                    ->where('created_at', '>=', now()->subDays(7))
                    ->exists();

                if (!$alreadySentAdmin) {
                    Notification::send($admins, new CriticalArrearsNotification($msgAdmin, route('admin.payments.monitoring')));
                }
            }
        }

        $this->info("Pengecekan selesai.");
    }
}

<?php

namespace App\Http\Controllers;

use App\Features\Product\Product;
use App\Models\Features\Order\Order;
use App\Models\Payment;
use App\Models\PaymentLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Menangani request yang masuk untuk halaman utama (Homepage).
     */
    public function __invoke(): Response
    {
        $featuredProducts = Product::query()
            ->where('is_featured', true)
            ->where('is_published', true)
            ->with(['images', 'category'])
            ->latest()
            ->take(4)
            ->get();

        $recommendedProducts = collect();

        if (auth()->check()) {
            $lastSearch = \App\Models\Features\Search\UserSearchHistory::where('user_id', auth()->id())
                ->latest()
                ->first();

            if ($lastSearch) {
                $recommendedProducts = Product::query()
                    ->where('is_published', true)
                    ->where(function ($q) use ($lastSearch) {
                        $q->where('name', 'like', "%{$lastSearch->query}%")
                            ->orWhere('description', 'like', "%{$lastSearch->query}%");
                    })
                    ->with('images', 'category')
                    ->take(4)
                    ->get();
            }
        }

        if ($recommendedProducts->isEmpty()) {
            $recommendedProducts = Product::query()
                ->where('is_published', true)
                ->inRandomOrder()
                ->with('images', 'category')
                ->take(4)
                ->get();
        }

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'recommendedProducts' => $recommendedProducts,
        ]);
    }

    /**
     * Menangani request yang masuk untuk halaman Admin Dashboard.
     */
    public function dashboard()
    {
        // Statistik Sales
        $salesData = [
            'totalRevenue' => Order::where('status', 'completed')->sum('total_amount'),
            'totalOrders' => Order::count(),
            'pendingOrders' => Order::whereIn('status', ['awaiting_payment', 'processing'])->count(),
            'completedOrders' => Order::where('status', 'completed')->count(),
            'recentOrders' => Order::with('user')->latest()->take(5)->get()->map(function($order) {
                return [
                    'id' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                    'customer' => $order->user->name ?? 'Guest',
                    'amount' => $order->total_amount,
                    'status' => $order->status,
                    'date' => $order->created_at->diffForHumans(),
                ];
            }),
        ];

        // Statistik Finance
        $financeData = [
            'totalCashIn' => PaymentLog::where('status', 'verified')->sum('amount'),
            'totalReceivables' => Payment::where('status', '!=', 'paid_off')
                ->where('payment_method', 'credit')
                ->get()
                ->sum(fn($p) => ($p->installment_amount * $p->duration_months) - ($p->installment_amount * $p->installments_paid)),
            'pendingVerifications' => PaymentLog::where('status', 'pending')->whereNotNull('proof_path')->count(),
            'activeInstallments' => Payment::where('payment_method', 'credit')->where('status', '!=', 'paid_off')->count(),
            'recentPayments' => PaymentLog::with('payment.order.user')->latest()->take(5)->get()->map(function($log) {
                return [
                    'id' => 'PAY-' . str_pad($log->id, 4, '0', STR_PAD_LEFT),
                    'customer' => $log->payment->order->user->name ?? 'N/A',
                    'type' => str_replace('_', ' ', ucfirst($log->type)),
                    'amount' => $log->amount,
                    'status' => $log->status == 'pending' ? 'pending_verification' : ($log->status == 'verified' ? 'verified' : 'overdue'),
                    'date' => $log->created_at->diffForHumans(),
                ];
            }),
        ];

        return Inertia::render('dashboard', [
            'salesData' => $salesData,
            'financeData' => $financeData
        ]);
    }
}
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

        // Statistik Finance Baru (Berdasarkan Wireframe)
        $totalIncome = \App\Models\FinancialTransaction::where('type', 'income')->sum('amount');
        $totalExpense = \App\Models\FinancialTransaction::where('type', 'expense')->sum('amount');
        $saldoKas = $totalIncome - $totalExpense;

        // Tunggakan Pelanggan
        $activeCredits = \App\Models\Payment::with(['order.user', 'customer.user', 'paymentLogs'])
            ->where('payment_method', 'credit')
            ->where('status', 'ongoing')
            ->get();
            
        $arrearsList = [];
        foreach ($activeCredits as $credit) {
            $monthsElapsed = min($credit->duration_months, $credit->created_at->diffInMonths(now()));
            $expectedTotal = $monthsElapsed * $credit->installment_amount;
            $actualVerified = $credit->paymentLogs->where('type', 'installment')->where('status', 'verified')->sum('amount');
            $tunggakan_amount = max(0, $expectedTotal - $actualVerified);
            $tunggakan_months = $credit->installment_amount > 0 ? floor($tunggakan_amount / $credit->installment_amount) : 0;
            
            if ($tunggakan_months > 0) {
                $arrearsList[] = [
                    'id' => $credit->id,
                    'customer_name' => $credit->customer->user->name ?? $credit->order->user->name ?? 'Guest',
                    'amount' => $tunggakan_amount,
                    'months' => $tunggakan_months,
                ];
            }
        }
        
        // Urutkan berdasarkan tunggakan terbesar
        usort($arrearsList, function($a, $b) { return $b['amount'] <=> $a['amount']; });
        $topArrears = array_slice($arrearsList, 0, 5);

        // Arus Kas Harian (7 Hari Terakhir)
        $startDate = now()->subDays(6)->startOfDay();
        $dailyTransactions = \App\Models\FinancialTransaction::where('transaction_date', '>=', $startDate)
            ->selectRaw('DATE(transaction_date) as date, type, SUM(amount) as total')
            ->groupBy('date', 'type')
            ->get();
            
        $cashFlowData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $dayName = now()->subDays($i)->format('D');
            $income = $dailyTransactions->where('date', $date)->where('type', 'income')->first()->total ?? 0;
            $expense = $dailyTransactions->where('date', $date)->where('type', 'expense')->first()->total ?? 0;
            $cashFlowData[] = [
                'day' => $dayName,
                'income' => $income,
                'expense' => $expense
            ];
        }

        // Tunai vs Kredit (Pemasukan)
        $cashIncome = \App\Models\FinancialTransaction::where('type', 'income')->where('category', 'cash_sale')->sum('amount');
        $creditIncome = \App\Models\FinancialTransaction::where('type', 'income')->whereIn('category', ['down_payment', 'installment', 'full_payment'])->sum('amount');

        // Recent Transactions
        $recentTransactions = \App\Models\FinancialTransaction::latest('transaction_date')
            ->latest('id')
            ->take(5)
            ->get()
            ->map(function($t) {
                return [
                    'id' => $t->id,
                    'desc' => $t->description,
                    'amount' => $t->amount,
                    'time' => $t->transaction_date->diffForHumans(),
                    'type' => $t->type,
                ];
            });

        // Notifications
        $pendingRestocks = \App\Models\RestockRequest::where('status', 'pending')->with('product')->get();
        $inventoryAlerts = \App\Features\Product\Product::where('stock', '<', 5)->where('is_published', true)->get();

        $notifications = [];
        foreach($pendingRestocks as $r) {
            $notifications[] = [
                'id' => 'req-'.$r->id,
                'type' => 'restock',
                'title' => 'Pending Restock Request',
                'message' => "Request untuk {$r->product->name}",
                'time' => $r->created_at->diffForHumans()
            ];
        }
        foreach($inventoryAlerts as $p) {
            $notifications[] = [
                'id' => 'alert-'.$p->id,
                'type' => 'inventory',
                'title' => 'Inventory Alert',
                'message' => "Stok {$p->name} menipis (Sisa {$p->stock})",
                'time' => 'Terbaru'
            ];
        }

        $financeData = [
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'saldoKas' => $saldoKas,
            'arrearsCount' => count($arrearsList),
            'topArrears' => $topArrears,
            'cashFlowChart' => $cashFlowData,
            'paymentStats' => [
                'cash' => $cashIncome,
                'credit' => $creditIncome
            ],
            'recentTransactions' => $recentTransactions,
            'notifications' => $notifications
        ];

        return Inertia::render('dashboard', [
            'salesData' => $salesData,
            'financeData' => $financeData
        ]);
    }
}
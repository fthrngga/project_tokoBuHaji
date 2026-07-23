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
            ->with(['images', 'category', 'variants'])
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
                    ->with('images', 'category', 'variants')
                    ->take(4)
                    ->get();
            }
        }

        if ($recommendedProducts->isEmpty()) {
            $recommendedProducts = Product::query()
                ->where('is_published', true)
                ->inRandomOrder()
                ->with('images', 'category', 'variants')
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
    public function dashboard(Request $request)
    {
        $filter = $request->input('filter', 'minggu');

        $chartDates = [];
        switch ($filter) {
            case 'hari':
                $startDate = now()->startOfDay();
                $endDate = now()->endOfDay();
                for ($i = 0; $i <= 23; $i++) {
                    $chartDates[] = [
                        'label' => str_pad($i, 2, '0', STR_PAD_LEFT) . ':00',
                        'match' => (string)$i
                    ];
                }
                break;
            case 'bulan':
                $startDate = now()->startOfMonth();
                $endDate = now()->endOfMonth();
                $daysInMonth = now()->daysInMonth;
                for ($i = 1; $i <= $daysInMonth; $i++) {
                    $dateObj = now()->startOfMonth()->addDays($i - 1);
                    $chartDates[] = [
                        'label' => (string)$i,
                        'match' => $dateObj->format('Y-m-d')
                    ];
                }
                break;
            case 'tahun':
                $startDate = now()->startOfYear();
                $endDate = now()->endOfYear();
                for ($i = 1; $i <= 12; $i++) {
                    $dateObj = now()->startOfYear()->addMonths($i - 1);
                    $chartDates[] = [
                        'label' => $dateObj->translatedFormat('M'),
                        'match' => $dateObj->format('Y-m')
                    ];
                }
                break;
            case 'minggu':
            default:
                $startDate = now()->startOfWeek(\Carbon\Carbon::MONDAY);
                $endDate = now()->endOfWeek(\Carbon\Carbon::SUNDAY);
                for ($i = 0; $i < 7; $i++) {
                    $dateObj = $startDate->copy()->addDays($i);
                    $chartDates[] = [
                        'label' => $dateObj->translatedFormat('D'),
                        'match' => $dateObj->format('Y-m-d')
                    ];
                }
                break;
        }

        // --- FILTERED CHART QUERIES ---
        $salesQuery = Order::whereBetween('created_at', [$startDate, $endDate]);
        if ($filter == 'hari') {
            $salesRaw = $salesQuery->selectRaw('HOUR(created_at) as matched, COUNT(*) as total')->groupBy('matched')->get();
        } else if ($filter == 'tahun') {
            $salesRaw = $salesQuery->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as matched, COUNT(*) as total')->groupBy('matched')->get();
        } else {
            $salesRaw = $salesQuery->selectRaw('DATE(created_at) as matched, COUNT(*) as total')->groupBy('matched')->get();
        }

        $dailyOrders = [];
        foreach ($chartDates as $cd) {
            $matchedRow = $salesRaw->where('matched', $cd['match'])->first();
            $dailyOrders[] = [
                'day' => $cd['label'],
                'total' => $matchedRow ? (int)$matchedRow->total : 0
            ];
        }

        $financeQuery = \App\Models\FinancialTransaction::whereBetween('transaction_date', [$startDate, $endDate]);
        if ($filter == 'hari') {
            $financeRaw = $financeQuery->selectRaw('HOUR(transaction_date) as matched, type, SUM(amount) as total')->groupBy('matched', 'type')->get();
        } else if ($filter == 'tahun') {
            $financeRaw = $financeQuery->selectRaw('DATE_FORMAT(transaction_date, "%Y-%m") as matched, type, SUM(amount) as total')->groupBy('matched', 'type')->get();
        } else {
            $financeRaw = $financeQuery->selectRaw('DATE(transaction_date) as matched, type, SUM(amount) as total')->groupBy('matched', 'type')->get();
        }

        $cashFlowData = [];
        foreach ($chartDates as $cd) {
            $income = $financeRaw->where('matched', $cd['match'])->where('type', 'income')->first()->total ?? 0;
            $expense = $financeRaw->where('matched', $cd['match'])->where('type', 'expense')->first()->total ?? 0;
            $cashFlowData[] = [
                'day' => $cd['label'],
                'income' => (float)$income,
                'expense' => (float)$expense
            ];
        }

        // Statistik Sales
        $salesData = [
            'totalOrders' => Order::whereBetween('created_at', [$startDate, $endDate])->count(),
            'pendingOrders' => Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'awaiting_payment')->count(),
            'processingOrders' => Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'processing')->count(),
            'completedOrders' => Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'completed')->count(),
            
            'totalUnitsSold' => \App\Models\Features\Order\OrderItem::whereHas('order', function($q) use ($startDate, $endDate) {
                $q->where('status', 'completed')->whereBetween('created_at', [$startDate, $endDate]);
            })->sum('quantity'),
            
            'totalCustomers' => \App\Models\User::where('role', 'customer')->whereBetween('created_at', [$startDate, $endDate])->count(),
            
            'cashOrdersCount' => \App\Models\Payment::whereHas('order', function($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            })->where('payment_method', 'cash')->count(),
            'creditOrdersCount' => \App\Models\Payment::whereHas('order', function($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            })->where('payment_method', 'credit')->count(),
            'cashGantungOrdersCount' => \App\Models\Payment::whereHas('order', function($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            })->where('payment_method', 'cash_gantung')->count(),

            'recentOrders' => Order::with(['user', 'payment'])->latest()->take(5)->get()->map(function($order) {
                return [
                    'id' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                    'customer' => $order->user->name ?? 'Guest',
                    'status' => $order->status,
                    'payment_method' => $order->payment->payment_method ?? '-',
                    'date' => $order->created_at->diffForHumans(),
                ];
            }),
            
            'topProducts' => \App\Models\Features\Order\OrderItem::whereHas('order', function($q) {
                $q->where('status', 'completed');
            })
            ->selectRaw('product_id, SUM(quantity) as total_sold')
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->take(5)
            ->with('product')
            ->get()
            ->map(function($item) {
                return [
                    'name' => $item->product->name ?? 'Produk Dihapus',
                    'sold' => (int) $item->total_sold,
                ];
            }),
            
            'dailyOrders' => $dailyOrders, // DARI FILTER
            
            'orderStatusChart' => [
                Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'awaiting_payment')->count(),
                Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'processing')->count(),
                Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'completed')->count(),
                Order::whereBetween('created_at', [$startDate, $endDate])->where('status', 'cancelled')->count()
            ],
        ];

        // Notifications & Alerts for Sales
        $notifications = [];

        // 1. Pending Restocks
        $pendingRestocks = \App\Models\RestockRequest::where('status', 'pending')->with(['product', 'variant'])->get();
        foreach($pendingRestocks as $r) {
            $variantName = $r->variant ? " ({$r->variant->name})" : "";
            $notifications[] = [
                'id' => 'req-'.$r->id,
                'type' => 'restock',
                'title' => 'Permintaan Restock',
                'message' => "Menunggu stok untuk {$r->product->name}{$variantName}",
                'time' => $r->created_at->diffForHumans()
            ];
        }

        // 2. Inventory Alerts (Low Stock)
        $inventoryAlerts = \App\Features\Product\Product::where('is_published', true)
            ->with('variants')
            ->where(function ($query) {
                $query->where('stock', '<', 5)
                      ->orWhereHas('variants', function ($q) {
                          $q->where('stock', '<', 5);
                      });
            })->get();

        foreach($inventoryAlerts as $p) {
            if ($p->variants->count() > 0) {
                foreach($p->variants as $variant) {
                    if ($variant->stock < 5) {
                        $notifications[] = [
                            'id' => 'alert-v-'.$variant->id,
                            'type' => 'inventory',
                            'title' => 'Peringatan Stok Menipis',
                            'message' => "{$p->name} ({$variant->name}) sisa {$variant->stock} - Tunda Promosi",
                            'time' => 'Terbaru'
                        ];
                    }
                }
            } else if ($p->stock < 5) {
                $notifications[] = [
                    'id' => 'alert-'.$p->id,
                    'type' => 'inventory',
                    'title' => 'Peringatan Stok Menipis',
                    'message' => "{$p->name} sisa {$p->stock} - Tunda Promosi",
                    'time' => 'Terbaru'
                ];
            }
        }

        // 3. Pending Returns
        $pendingReturns = \App\Models\Features\Order\ProductReturn::where('status', 'pending')->with('order.user')->get();
        foreach($pendingReturns as $ret) {
            $notifications[] = [
                'id' => 'ret-'.$ret->id,
                'type' => 'return',
                'title' => 'Pengajuan Retur Baru',
                'message' => "Menunggu tindak lanjut dari: " . ($ret->order->user->name ?? 'Guest'),
                'time' => $ret->created_at->diffForHumans()
            ];
        }

        // Statistik Finance Asli
        $totalIncome = \App\Models\FinancialTransaction::whereBetween('transaction_date', [$startDate, $endDate])->where('type', 'income')->sum('amount');
        $totalExpense = \App\Models\FinancialTransaction::whereBetween('transaction_date', [$startDate, $endDate])->where('type', 'expense')->sum('amount');
        $saldoKas = $totalIncome - $totalExpense;

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
        usort($arrearsList, function($a, $b) { return $b['amount'] <=> $a['amount']; });
        $topArrears = array_slice($arrearsList, 0, 5);

        $cashIncome = \App\Models\FinancialTransaction::whereBetween('transaction_date', [$startDate, $endDate])
            ->where('type', 'income')->where('category', 'cash_sale')->sum('amount');
        
        $creditIncome = \App\Models\FinancialTransaction::whereBetween('transaction_date', [$startDate, $endDate])
            ->where('type', 'income')
            ->whereIn('category', ['down_payment', 'installment', 'full_payment'])
            ->whereHasMorph('related', [\App\Models\PaymentLog::class], function($q) {
                $q->whereHas('payment', function($p) {
                    $p->where('payment_method', 'credit');
                });
            })->sum('amount');

        $cashGantungIncome = \App\Models\FinancialTransaction::whereBetween('transaction_date', [$startDate, $endDate])
            ->where('type', 'income')
            ->whereIn('category', ['down_payment', 'installment', 'full_payment'])
            ->whereHasMorph('related', [\App\Models\PaymentLog::class], function($q) {
                $q->whereHas('payment', function($p) {
                    $p->where('payment_method', 'cash_gantung');
                });
            })->sum('amount');

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

        $financeData = [
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'saldoKas' => $saldoKas,
            'arrearsCount' => count($arrearsList),
            'topArrears' => $topArrears,
            'cashFlowChart' => $cashFlowData, // DARI FILTER
            'paymentStats' => [
                'cash' => $cashIncome,
                'credit' => $creditIncome,
                'cashGantung' => $cashGantungIncome
            ],
            'recentTransactions' => $recentTransactions,
            'notifications' => []
        ];

        return Inertia::render('dashboard', [
            'salesData' => $salesData,
            'financeData' => $financeData,
            'notifications' => $notifications,
            'currentFilter' => $filter
        ]);
    }
}
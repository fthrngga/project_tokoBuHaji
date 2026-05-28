import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Chart from 'react-apexcharts';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    ShoppingBag, 
    TrendingUp, 
    Package, 
    CheckCircle, 
    DollarSign, 
    CreditCard, 
    AlertCircle, 
    Clock,
    ArrowRight
} from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Utility format rupiah
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

interface DashboardProps {
    salesData: any;
    financeData: any;
}

export default function Dashboard({ salesData, financeData }: DashboardProps) {
    // State untuk mengontrol Tab aktif
    const [activeTab, setActiveTab] = useState<'sales' | 'finance'>('sales');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin - Toko Haji Elektronik" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
                
                {/* Header & Tab Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview Kinerja</h1>
                        <p className="text-sm text-secondary-foreground mt-1">Pantau metrik penjualan dan tren transaksi toko Anda hari ini.</p>
                    </div>

                    {/* Custom Elegant Tab Switcher */}
                    <div className="flex p-1 bg-secondary/30 border border-border rounded-lg">
                        <button
                            onClick={() => setActiveTab('sales')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === 'sales' 
                                ? 'bg-primary text-primary-foreground shadow-md' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Sales & Operasional
                        </button>
                        <button
                            onClick={() => setActiveTab('finance')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === 'finance' 
                                ? 'bg-primary text-primary-foreground shadow-md' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <DollarSign className="w-4 h-4" />
                            Finance & Piutang
                        </button>
                    </div>
                </div>

                {/* ------------------------------------------------------------------------- */}
                {/* SALES TAB CONTENT */}
                {/* ------------------------------------------------------------------------- */}
                {activeTab === 'sales' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* KPI Cards Sales */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Kotor (Gross Revenue)</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(salesData.totalRevenue)}</div>
                                    <p className="text-xs text-gray-500 mt-1">Total nilai pesanan bulan ini</p>
                                </CardContent>
                            </Card>
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Total Pesanan</CardTitle>
                                    <ShoppingBag className="h-4 w-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{salesData.totalOrders}</div>
                                    <p className="text-xs text-gray-500 mt-1">POS & Online Store</p>
                                </CardContent>
                            </Card>
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Perlu Diproses</CardTitle>
                                    <Package className="h-4 w-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">{salesData.pendingOrders}</div>
                                    <p className="text-xs text-gray-500 mt-1">Pesanan menunggu pengiriman</p>
                                </CardContent>
                            </Card>
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Selesai</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{salesData.completedOrders}</div>
                                    <p className="text-xs text-gray-500 mt-1">Pesanan berhasil dikirim</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Orders List */}
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Pesanan Terbaru</CardTitle>
                                <Link href={route('admin.orders.index')} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                                    Lihat Semua <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="divide-y divide-gray-100">
                                    {salesData.recentOrders.map((order: any) => (
                                        <div key={order.id} className="flex items-center justify-between py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-sm">{order.id}</span>
                                                    <span className="text-sm text-gray-500">• {order.customer}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">{order.date}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-medium text-sm">{formatCurrency(order.amount)}</span>
                                                {order.status === 'processing' && <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 shadow-none">Diproses</Badge>}
                                                {order.status === 'awaiting_payment' && <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200 shadow-none">Menunggu Bayar</Badge>}
                                                {order.status === 'completed' && <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 shadow-none">Selesai</Badge>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}


                {/* ------------------------------------------------------------------------- */}
                {/* FINANCE TAB CONTENT */}
                {/* ------------------------------------------------------------------------- */}
                {activeTab === 'finance' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* KPI Cards Finance */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-border shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Pemasukan</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(financeData.totalIncome)}</div>
                                </CardContent>
                            </Card>
                            <Card className="border-border shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengeluaran</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(financeData.totalExpense)}</div>
                                </CardContent>
                            </Card>
                            <Card className="border-border shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Saldo Kas</CardTitle>
                                    <DollarSign className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(financeData.saldoKas)}</div>
                                </CardContent>
                            </Card>
                            <Card className="border-amber-500/30 shadow-sm bg-amber-500/5">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-amber-500">Pelanggan Menunggak</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-amber-500">{financeData.arrearsCount}</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts Row */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-lg">Tren Transaksi Harian</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <Chart
                                            options={{
                                                chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
                                                colors: ['#16a34a', '#dc2626'],
                                                dataLabels: { enabled: false },
                                                stroke: { curve: 'smooth', width: 2 },
                                                xaxis: { categories: financeData.cashFlowChart.map((d: any) => d.day) },
                                                yaxis: { labels: { formatter: (val) => new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(val) } },
                                                tooltip: { y: { formatter: (val) => formatCurrency(val) } }
                                            }}
                                            series={[
                                                { name: 'Pemasukan', data: financeData.cashFlowChart.map((d: any) => d.income) },
                                                { name: 'Pengeluaran', data: financeData.cashFlowChart.map((d: any) => d.expense) }
                                            ]}
                                            type="area"
                                            height="100%"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-lg">Tunai vs Kredit</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <Chart
                                            options={{
                                                chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
                                                colors: ['#3b82f6', '#f59e0b'],
                                                plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
                                                dataLabels: { enabled: false },
                                                xaxis: { categories: ['Tunai', 'Kredit'] },
                                                yaxis: { labels: { formatter: (val) => new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(val) } },
                                                tooltip: { y: { formatter: (val) => formatCurrency(val) } }
                                            }}
                                            series={[{
                                                name: 'Total Pemasukan',
                                                data: [financeData.paymentStats.cash, financeData.paymentStats.credit]
                                            }]}
                                            type="bar"
                                            height="100%"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Arrears List */}
                            <Card className="md:col-span-2 border-border">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg text-primary">Daftar Tunggakan</CardTitle>
                                    <Link href={route('finance.arrears')} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center">
                                        Selengkapnya <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <div className="divide-y divide-gray-100">
                                        <div className="grid grid-cols-4 py-2 font-semibold text-sm text-muted-foreground border-b border-border/50">
                                            <div className="col-span-1">Nama</div>
                                            <div className="col-span-1 text-right">Jumlah Tunggakan</div>
                                            <div className="col-span-1 text-center">Lama Tunggak</div>
                                            <div className="col-span-1 text-right">Action</div>
                                        </div>
                                        {financeData.topArrears.length === 0 ? (
                                            <div className="py-8 text-center text-sm text-muted-foreground">Tidak ada pelanggan menunggak.</div>
                                        ) : financeData.topArrears.map((arrear: any) => (
                                            <div key={arrear.id} className="grid grid-cols-4 items-center py-3 text-sm border-b border-border/20 last:border-0">
                                                <div className="col-span-1 font-medium">{arrear.customer_name}</div>
                                                <div className="col-span-1 text-right font-bold text-primary">{formatCurrency(arrear.amount)}</div>
                                                <div className="col-span-1 text-center">{arrear.months} bulan</div>
                                                <div className="col-span-1 text-right">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('finance.payment-monitoring')}>View Details</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sidebar: Notifications & Recent Tx */}
                            <div className="space-y-4 md:col-span-1">
                                <Card className="border-border">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-md flex justify-between items-center">
                                            Notifications
                                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">{financeData.notifications.length}</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="divide-y divide-border/20">
                                            {financeData.notifications.length === 0 ? (
                                                <div className="py-4 text-center text-xs text-muted-foreground">Tidak ada notifikasi baru.</div>
                                            ) : financeData.notifications.map((notif: any) => (
                                                <div key={notif.id} className="py-3 flex gap-3 items-start">
                                                    <div className={`p-2 rounded-md ${notif.type === 'restock' ? 'bg-secondary/50 text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>
                                                        {notif.type === 'restock' ? <Package className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xs font-semibold">{notif.title}</div>
                                                        <div className="text-xs text-muted-foreground mt-0.5">{notif.message}</div>
                                                        <div className="text-[10px] text-muted-foreground/70 mt-1">{notif.time}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-border">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-md flex justify-between items-center">
                                            Recent Transactions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="divide-y divide-border/20">
                                            {financeData.recentTransactions.map((tx: any) => (
                                                <div key={tx.id} className="py-3 flex justify-between items-center">
                                                    <div className="flex-1 overflow-hidden pr-2">
                                                        <div className="text-xs font-medium truncate">{tx.desc}</div>
                                                        <div className="text-[10px] text-muted-foreground mt-0.5">{tx.time}</div>
                                                    </div>
                                                    <div className={`text-xs font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-green-500' : 'text-primary'}`}>
                                                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </AppLayout>
    );
};
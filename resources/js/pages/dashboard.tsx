import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    ShoppingBag, 
    Package, 
    CheckCircle, 
    AlertCircle, 
    Clock,
    ArrowRight,
    Users,
    CreditCard,
    TrendingUp,
    RefreshCw,
    DollarSign
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
    notifications: any[];
    currentFilter: string;
}

export default function Dashboard({ salesData, financeData, notifications, currentFilter }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<'sales' | 'finance'>('sales');

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('dashboard'), { filter: e.target.value }, { preserveState: true, preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin - Toko Haji Elektronik" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
                
                {/* Header & Tabs */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview Kinerja</h1>
                        <p className="text-sm text-secondary-foreground mt-1">Pantau metrik penjualan dan tren transaksi toko Anda hari ini.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Tab Switcher */}
                        <div className="flex p-1 bg-secondary/30 border border-border rounded-lg h-10">
                            <button
                                onClick={() => setActiveTab('sales')}
                                className={`flex items-center gap-2 px-4 text-sm font-medium rounded-md transition-all h-full ${
                                    activeTab === 'sales' 
                                    ? 'bg-primary text-primary-foreground shadow-md' 
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span className="hidden sm:inline">Sales & Operasional</span>
                                <span className="sm:hidden">Sales</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('finance')}
                                className={`flex items-center gap-2 px-4 text-sm font-medium rounded-md transition-all h-full ${
                                    activeTab === 'finance' 
                                    ? 'bg-primary text-primary-foreground shadow-md' 
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <DollarSign className="w-4 h-4" />
                                <span className="hidden sm:inline">Finance & Piutang</span>
                                <span className="sm:hidden">Finance</span>
                            </button>
                        </div>

                        {/* Filter Dropdown */}
                        <select
                            value={currentFilter}
                            onChange={handleFilterChange}
                            className="h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        >
                            <option value="hari">Hari Ini</option>
                            <option value="minggu">Minggu Ini</option>
                            <option value="bulan">Bulan Ini</option>
                            <option value="tahun">Tahun Ini</option>
                        </select>
                    </div>
                </div>

                {/* --- TAB SALES --- */}
                {activeTab === 'sales' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Pesanan</CardTitle>
                                <ShoppingBag className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{salesData.totalOrders}</div>
                                <p className="text-xs text-muted-foreground mt-1">Semua waktu (All time)</p>
                            </CardContent>
                        </Card>
                        <Card className="border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Menunggu Pembayaran</CardTitle>
                                <Clock className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-amber-500">{salesData.pendingOrders}</div>
                                <p className="text-xs text-muted-foreground mt-1">Belum dibayar lunas / diverifikasi</p>
                            </CardContent>
                        </Card>
                        <Card className="border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Diproses & Dikirim</CardTitle>
                                <Package className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">{salesData.processingOrders}</div>
                                <p className="text-xs text-muted-foreground mt-1">Pesanan sedang disiapkan</p>
                            </CardContent>
                        </Card>
                        <Card className="border-border shadow-sm bg-primary/5">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-primary">Pesanan Selesai</CardTitle>
                                <CheckCircle className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{salesData.completedOrders}</div>
                                <p className="text-xs text-primary/70 mt-1">Pesanan berhasil diselesaikan</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* KPI 3 Cards - Full Width */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-border bg-secondary/10">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-full text-primary">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Unit Barang Terjual</p>
                                    <h3 className="text-2xl font-bold">{salesData.totalUnitsSold}</h3>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border bg-secondary/10">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-3 bg-secondary rounded-full text-secondary-foreground">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Pelanggan</p>
                                    <h3 className="text-2xl font-bold">{salesData.totalCustomers}</h3>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border bg-secondary/10">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-full text-blue-500">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1">Cash / Kredit / Gantung</p>
                                    <div className="flex items-baseline gap-1 text-lg font-bold text-foreground">
                                        {salesData.cashOrdersCount}
                                        <span className="text-muted-foreground text-sm font-normal">/</span> 
                                        {salesData.creditOrdersCount}
                                        <span className="text-muted-foreground text-sm font-normal">/</span> 
                                        {salesData.cashGantungOrdersCount}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Row - Full Width */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="border-border shadow-sm md:col-span-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-md">Tren Pesanan ({currentFilter})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px]">
                                    <Chart
                                        options={{
                                            chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
                                            colors: ['#3b82f6'],
                                            dataLabels: { enabled: false },
                                            stroke: { curve: 'smooth', width: 2 },
                                            xaxis: { categories: salesData.dailyOrders?.map((d: any) => d.day) || [] },
                                        }}
                                        series={[
                                            { name: 'Pesanan Masuk', data: salesData.dailyOrders?.map((d: any) => d.total) || [] }
                                        ]}
                                        type="area"
                                        height="100%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border shadow-sm md:col-span-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-md">Status Pesanan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px] flex items-center justify-center">
                                    <Chart
                                        options={{
                                            chart: { type: 'donut', fontFamily: 'inherit' },
                                            labels: ['Menunggu', 'Diproses', 'Selesai', 'Batal'],
                                            colors: ['#f59e0b', '#3b82f6', '#16a34a', '#ef4444'],
                                            dataLabels: { enabled: false },
                                            legend: { position: 'bottom' },
                                            stroke: { show: false }
                                        }}
                                        series={salesData.orderStatusChart || []}
                                        type="donut"
                                        height="100%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Row: 3 Columns side by side */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-1">
                            {/* Recent Orders List */}
                            <Card className="border-border shadow-sm flex flex-col h-[400px]">
                                <CardHeader className="flex flex-row items-center justify-between pb-3 shrink-0">
                                    <CardTitle className="text-lg">Pesanan Terbaru</CardTitle>
                                    <Link href={route('admin.orders.index')} className="text-xs font-medium text-primary hover:text-primary/80 flex items-center">
                                        Kelola <ArrowRight className="ml-1 w-3 h-3" />
                                    </Link>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto pr-2">
                                    <div className="divide-y divide-border/30">
                                        {salesData.recentOrders.length === 0 ? (
                                            <div className="text-center py-6 text-muted-foreground text-sm">Belum ada pesanan terbaru.</div>
                                        ) : salesData.recentOrders.map((order: any) => (
                                            <div key={order.id} className="flex flex-col gap-2 py-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-sm">{order.id}</span>
                                                    <span className="text-xs text-muted-foreground/70">{order.date}</span>
                                                </div>
                                                <span className="text-sm text-muted-foreground truncate">{order.customer}</span>
                                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                    <Badge variant="outline" className="text-[10px] capitalize">{order.payment_method}</Badge>
                                                    {order.status === 'processing' && <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-[10px]">Diproses</Badge>}
                                                    {order.status === 'awaiting_payment' && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">Menunggu</Badge>}
                                                    {order.status === 'completed' && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Selesai</Badge>}
                                                    {order.status === 'cancelled' && <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]">Batal</Badge>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-1">
                            {/* 5 Produk Terlaris */}
                            <Card className="border-border shadow-sm flex flex-col h-[400px]">
                                <CardHeader className="pb-3 shrink-0">
                                    <CardTitle className="text-lg">5 Produk Terlaris</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto pr-2">
                                    <div className="space-y-4">
                                        {salesData.topProducts.length === 0 ? (
                                            <div className="text-center py-4 text-muted-foreground text-sm">Belum ada data.</div>
                                        ) : salesData.topProducts.map((prod: any, index: number) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-xs shrink-0">
                                                    #{index + 1}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-sm font-medium truncate" title={prod.name}>{prod.name}</p>
                                                </div>
                                                <div className="font-bold text-sm text-primary shrink-0">
                                                    {prod.sold} <span className="text-xs font-normal text-muted-foreground">unit</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-1">
                            {/* Pemberitahuan Sales */}
                            <Card className="border-border shadow-sm bg-secondary/5 flex flex-col h-[400px]">
                                <CardHeader className="pb-3 shrink-0">
                                    <CardTitle className="text-md flex justify-between items-center">
                                        Pemberitahuan
                                        <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                                            {notifications.length} Info
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto pr-2">
                                    <div className="divide-y divide-border/20">
                                        {notifications.length === 0 ? (
                                            <div className="py-6 text-center text-sm text-muted-foreground">Semua aman. Tidak ada alert.</div>
                                        ) : notifications.map((notif: any) => (
                                            <div key={notif.id} className="py-3 flex gap-3 items-start">
                                                <div className={`p-2 rounded-md shrink-0 ${
                                                    notif.type === 'restock' ? 'bg-blue-500/20 text-blue-500' : 
                                                    notif.type === 'return' ? 'bg-destructive/20 text-destructive' :
                                                    'bg-amber-500/20 text-amber-500'
                                                }`}>
                                                    {notif.type === 'restock' ? <RefreshCw className="w-4 h-4" /> : 
                                                     notif.type === 'return' ? <AlertCircle className="w-4 h-4" /> : 
                                                     <Package className="w-4 h-4" />}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="text-sm font-semibold text-foreground truncate">{notif.title}</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</div>
                                                    <div className="text-[10px] font-medium text-primary/70 mt-1">{notif.time}</div>
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


                {/* --- TAB FINANCE --- */}
                {activeTab === 'finance' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-lg">Tren Transaksi ({currentFilter})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <Chart
                                        options={{
                                            chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
                                            colors: ['#16a34a', '#dc2626'],
                                            dataLabels: { enabled: false },
                                            stroke: { curve: 'smooth', width: 2 },
                                            xaxis: { categories: financeData.cashFlowChart?.map((d: any) => d.day) || [] },
                                            yaxis: { labels: { formatter: (val) => new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(val) } },
                                            tooltip: { y: { formatter: (val) => formatCurrency(val) } }
                                        }}
                                        series={[
                                            { name: 'Pemasukan', data: financeData.cashFlowChart?.map((d: any) => d.income) || [] },
                                            { name: 'Pengeluaran', data: financeData.cashFlowChart?.map((d: any) => d.expense) || [] }
                                        ]}
                                        type="area"
                                        height="100%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle className="text-lg">Metode Pembayaran</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <Chart
                                        options={{
                                            chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
                                            colors: ['#3b82f6', '#f59e0b', '#8b5cf6'],
                                            plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
                                            dataLabels: { enabled: false },
                                            xaxis: { categories: ['Tunai', 'Kredit', 'Gantung'] },
                                            yaxis: { labels: { formatter: (val) => new Intl.NumberFormat("id-ID", { notation: "compact", compactDisplay: "short" }).format(val) } },
                                            tooltip: { y: { formatter: (val) => formatCurrency(val) } }
                                        }}
                                        series={[{
                                            name: 'Total Pemasukan',
                                            data: [
                                                financeData.paymentStats?.cash || 0, 
                                                financeData.paymentStats?.credit || 0,
                                                financeData.paymentStats?.cashGantung || 0
                                            ]
                                        }]}
                                        type="bar"
                                        height="100%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
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
                                    {financeData.topArrears?.length === 0 ? (
                                        <div className="py-8 text-center text-sm text-muted-foreground">Tidak ada pelanggan menunggak.</div>
                                    ) : financeData.topArrears?.map((arrear: any) => (
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

                        <div className="space-y-4 md:col-span-1">
                            <Card className="border-border">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-md flex justify-between items-center">
                                        Recent Transactions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="divide-y divide-border/20">
                                        {financeData.recentTransactions?.length === 0 ? (
                                            <div className="py-4 text-center text-xs text-muted-foreground">Tidak ada transaksi.</div>
                                        ) : financeData.recentTransactions?.map((tx: any) => (
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
}
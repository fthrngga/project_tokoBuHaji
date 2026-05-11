import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Overview Kinerja</h1>
                        <p className="text-sm text-gray-500 mt-1">Pantau metrik penjualan dan arus kas toko Anda hari ini.</p>
                    </div>

                    {/* Custom Elegant Tab Switcher */}
                    <div className="flex p-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <button
                            onClick={() => setActiveTab('sales')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === 'sales' 
                                ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' 
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                            }`}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Sales & Operasional
                        </button>
                        <button
                            onClick={() => setActiveTab('finance')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === 'finance' 
                                ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' 
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
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
                            <Card className="border-gray-200 shadow-sm bg-gray-50/50">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Kas Masuk (Real Cash)</CardTitle>
                                    <DollarSign className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(financeData.totalCashIn)}</div>
                                    <p className="text-xs text-gray-500 mt-1">Uang tunai & transfer diterima</p>
                                </CardContent>
                            </Card>
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Piutang Berjalan</CardTitle>
                                    <CreditCard className="h-4 w-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(financeData.totalReceivables)}</div>
                                    <p className="text-xs text-gray-500 mt-1">Total sisa cicilan pelanggan</p>
                                </CardContent>
                            </Card>
                            <Card className="border-gray-200 shadow-sm border-yellow-200">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-yellow-700">Verifikasi Menunggu</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-700">{financeData.pendingVerifications}</div>
                                    <p className="text-xs text-yellow-600 mt-1">Bukti bayar butuh pengecekan</p>
                                </CardContent>
                            </Card>
                            <Card className="border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">Kredit Aktif</CardTitle>
                                    <Clock className="h-4 w-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{financeData.activeInstallments}</div>
                                    <p className="text-xs text-gray-500 mt-1">Pelanggan sedang menyicil</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Payments List */}
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Log Pembayaran & Angsuran</CardTitle>
                                <Link href={route('finance.payment-monitoring')} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                                    Ke Manajemen Keuangan <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="divide-y divide-gray-100">
                                    {financeData.recentPayments.map((payment: any) => (
                                        <div key={payment.id} className="flex items-center justify-between py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-sm">{payment.customer}</span>
                                                    <span className="text-sm text-gray-500">• {payment.id}</span>
                                                </div>
                                                <span className="text-xs font-medium text-gray-500">{payment.type} — <span className="font-normal text-gray-400">{payment.date}</span></span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-medium text-sm">{formatCurrency(payment.amount)}</span>
                                                {payment.status === 'pending_verification' && <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200 shadow-none">Verifikasi Kasir</Badge>}
                                                {payment.status === 'verified' && <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 shadow-none">Terkonfirmasi</Badge>}
                                                {payment.status === 'overdue' && <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200 shadow-none">Menunggak</Badge>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                
            </div>
        </AppLayout>
    );
};
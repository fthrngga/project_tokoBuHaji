import { Head, Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { route } from 'ziggy-js';

interface Order {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
}

interface Props {
    orders: Order[];
}

const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(value));
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'negotiation': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Negosiasi</Badge>;
        case 'pending': return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Menunggu</Badge>;
        case 'awaiting_payment': return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Menunggu Pembayaran</Badge>;
        case 'processing': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Diproses</Badge>;
        case 'completed': return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Selesai</Badge>;
        case 'cancelled': return <Badge variant="destructive">Dibatalkan</Badge>;
        default: return <Badge variant="outline">{status}</Badge>;
    }
}

export default function Index({ orders }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Pesanan Saya - Haji Elektronik" />
            <div className="flex min-h-screen w-full flex-col bg-[#080f1a] text-white">
                <Header user={auth.user} />

                <main className="flex-1 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Pesanan Saya</h1>
                            <p className="mt-2 text-[#bdd5ea]/60 text-sm md:text-base">Pantau riwayat transaksi dan status pesanan Anda.</p>
                        </div>

                        {orders.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {orders.map((order) => (
                                    <Link key={order.id} href={route('orders.show', order.id)} className="block group">
                                        <div className="bg-[#0d1e2e]/80 backdrop-blur-sm border border-[#577399]/20 hover:border-[#FE5F55]/50 transition-all duration-300 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between shadow-lg">
                                            
                                            {/* Order Info */}
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-bold text-white group-hover:text-[#FE5F55] transition-colors">
                                                        Pesanan #{order.id}
                                                    </span>
                                                    {getStatusBadge(order.status)}
                                                </div>
                                                <p className="text-sm text-[#bdd5ea]/60">
                                                    Dibuat pada {format(new Date(order.created_at), "d MMMM yyyy", { locale: id })}
                                                </p>
                                            </div>

                                            {/* Order Total & Arrow */}
                                            <div className="flex items-center justify-between md:justify-end gap-6 mt-2 md:mt-0 pt-4 md:pt-0 border-t border-[#577399]/10 md:border-t-0">
                                                <div className="flex flex-col md:text-right">
                                                    <span className="text-xs text-[#bdd5ea]/50 uppercase tracking-wider mb-1">Total Belanja</span>
                                                    <span className="text-lg font-bold text-emerald-400">
                                                        {formatCurrency(order.total_amount)}
                                                    </span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-[#577399]/10 flex items-center justify-center group-hover:bg-[#FE5F55] transition-colors duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bdd5ea] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-[#0d1e2e]/50 backdrop-blur-sm border border-[#577399]/20 rounded-3xl shadow-xl flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-[#577399]/10 rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#bdd5ea]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Belum ada pesanan</h3>
                                <p className="mt-2 text-[#bdd5ea]/60">Anda belum melakukan pembelian apapun.</p>
                                <div className="mt-8">
                                    <Link href="/" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #FE5F55, #e84a40)', boxShadow: '0 4px 15px rgba(254,95,85,0.4)' }}>
                                        Mulai Belanja Sekarang
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

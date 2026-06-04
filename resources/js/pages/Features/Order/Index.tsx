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
            <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
                <Header user={auth.user} />

                <main className="flex-1 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground">Pesanan Saya</h1>
                            <p className="mt-2 text-muted-foreground">Riwayat transaksi dan status pesanan Anda.</p>
                        </div>

                        {orders.length > 0 ? (
                            <div className="bg-card shadow overflow-hidden sm:rounded-md border border-border">
                                <ul role="list" className="divide-y divide-border">
                                    {orders.map((order) => (
                                        <li key={order.id}>
                                            <Link href={route('orders.show', order.id)} className="block hover:bg-muted transition duration-150 ease-in-out">
                                                <div className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm font-medium text-blue-600 truncate">
                                                            Pesanan #{order.id}
                                                        </div>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            {getStatusBadge(order.status)}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="flex items-center text-sm text-muted-foreground">
                                                                Total: {formatCurrency(order.total_amount)}
                                                            </p>
                                                        </div>
                                                        <div className="mt-2 flex items-center text-sm text-muted-foreground sm:mt-0">
                                                            <p>
                                                                Dibuat pada {format(new Date(order.created_at), "d MMM yyyy", { locale: id })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-card border border-border rounded-lg shadow-sm">
                                <h3 className="text-lg font-medium text-foreground">Belum ada pesanan</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Anda belum melakukan pembelian apapun.</p>
                                <div className="mt-6">
                                    <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90">
                                        Mulai Belanja
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

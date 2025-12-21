import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { SharedData, Product } from '@/types';
import { route } from 'ziggy-js';
import Header from '@/Pages/welcome/Partials/Header';
import Footer from '@/Pages/welcome/Partials/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, ArrowLeft, Clock, CheckCircle, Truck, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useRef } from "react";

interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

interface Message {
    id: number;
    user_id: number;
    message: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    }
}

interface Order {
    id: number;
    status: string;
    total_amount: number;
    province: string;
    city: string;
    postal_code: string;
    items: OrderItem[];
    messages: Message[];
    created_at: string;
    address_detail: string;
}

interface Props {
    order: Order;
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

export default function Show({ order }: Props) {
    const { auth } = usePage<SharedData>().props;
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [order.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.messages.store', order.id), {
            preserveScroll: true,
            onSuccess: () => reset('message'),
        });
    }

    return (
        <>
            <Head title={`Pesanan #${order.id} - Haji Elektronik`} />
            <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                <Header user={auth.user} />

                <main className="flex-1 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <Link href={route('orders.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Pesanan
                            </Link>
                            <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                        Pesanan #{order.id}
                                        {getStatusBadge(order.status)}
                                    </h1>
                                    <p className="mt-1 text-gray-500 text-sm">
                                        Dibuat pada {format(new Date(order.created_at), "d MMMM yyyy, HH:mm", { locale: id })}
                                    </p>
                                </div>
                                {/* Tombol Aksi (Bayar, dsb) bisa ditaruh sini nanti */}
                            </div>
                        </div>

                        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
                            {/* Kiri: Detail Order & Chat */}
                            <div className="lg:col-span-8 space-y-6">
                                {/* Chat Section */}
                                <Card className="flex flex-col h-[600px]">
                                    <CardHeader className="border-b">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                                <Truck className="h-5 w-5" />
                                            </div>
                                            Diskusi Pengiriman & Harga
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50" ref={scrollRef}>
                                        <div className="text-center text-xs text-gray-400 py-4">
                                            Pesanan dibuat. Silakan diskusikan ongkos kirim dan detail pengiriman dengan admin di sini.
                                        </div>

                                        {order.messages.map((msg) => {
                                            const isMe = msg.user_id === auth.user?.id;
                                            return (
                                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] rounded-lg p-3 ${isMe ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-none' : 'bg-white border text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-tl-none'}`}>
                                                        <p className="text-sm">{msg.message}</p>
                                                        <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-gray-300 dark:text-gray-500' : 'text-gray-400'}`}>
                                                            {format(new Date(msg.created_at), "HH:mm")}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </CardContent>
                                    <CardFooter className="p-4 border-t bg-white dark:bg-gray-900">
                                        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                                            <Input
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                placeholder="Tulis pesan..."
                                                className="flex-1"
                                                disabled={processing}
                                            />
                                            <Button type="submit" size="icon" disabled={processing || !data.message.trim()}>
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </CardFooter>
                                </Card>
                            </div>

                            {/* Kanan: Ringkasan Produk & Info */}
                            <div className="lg:col-span-4 space-y-6 mt-8 lg:mt-0">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Rincian Barang</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex gap-3 justify-between">
                                                <div className="flex gap-3 overflow-hidden">
                                                    <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-md">
                                                        {/* Image Placeholder if needed, or real image */}
                                                        <img
                                                            src={item.product.images?.[0]?.image_path ? `/storage/${item.product.images[0].image_path}` : 'https://placehold.co/50'}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                                                        <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium">
                                                    {formatCurrency(item.quantity * item.price)}
                                                </div>
                                            </div>
                                        ))}
                                        <Separator />
                                        <div className="flex justify-between items-center font-bold">
                                            <span>Total Barang</span>
                                            <span>{formatCurrency(order.total_amount)}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Alamat Pengiriman</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p className="font-medium text-gray-900 dark:text-white">{auth.user?.name}</p>
                                        <p className="text-gray-500 mt-1">
                                            {order.address_detail}<br />
                                            {order.city}, {order.province}<br />
                                            {order.postal_code ? `Kode Pos: ${order.postal_code}` : ''}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { SharedData, Product } from '@/types';
import { route } from 'ziggy-js';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, ArrowLeft, Clock, CheckCircle, Truck, RefreshCcw, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';

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

interface PaymentLog {
    id: number;
    payment_id: number;
    type: 'down_payment' | 'installment' | 'full_payment';
    installment_number?: number;
    amount: number;
    proof_path: string;
    status: 'pending' | 'verified' | 'rejected';
    snap_token?: string;
    paid_at?: string;
    created_at: string;
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
    payment?: {
        payment_method: string;
        status: string;
        proof_of_payment_path?: string;
        down_payment: number;
        installment_amount: number;
        duration_months: number;
        installments_paid: number;
        payment_logs: PaymentLog[];
    };
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

    const [isAtBottom, setIsAtBottom] = useState(true);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setIsAtBottom(scrollHeight - scrollTop - clientHeight < 50);
    };

    // Chat Form
    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    // Payment Form
    const { data: paymentData, setData: setPaymentData, post: postPayment, processing: processingPayment, errors: paymentErrors } = useForm({
        payment_method: 'cash',
        cash_type: '',
        down_payment: '',
        with_down_payment: false,
    });

    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    // 1. Polling untuk mendapatkan pesan realtime menggunakan Inertia Reload
    useEffect(() => {
        // Hentikan polling jika user sedang memproses pengiriman pesan
        // (menghindari tabrakan request/Inertia visit cancelled)
        if (processing) return;

        const intervalId = setInterval(() => {
            router.reload({
                only: ['order'], // Cukup panggil 'only' saja
            });
        }, 3000); 

        return () => clearInterval(intervalId); 
    }, [processing]); // Masukkan processing ke dependency array

    // 2. Auto-scroll HANYA JIKA user sedang berada di paling bawah
    const messagesCount = order.messages.length;
    useEffect(() => {
        if (scrollRef.current && isAtBottom) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messagesCount]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAtBottom(true);
        post(route('orders.messages.store', order.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset('message'),
        });
    }

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPayment(route('orders.payment.store', order.id), {
            onSuccess: () => setIsInvoiceOpen(false),
        });
    };

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
                                    <CardContent 
                                        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50" 
                                        ref={scrollRef}
                                        onScroll={handleScroll} 
                                    >
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
                                                autoComplete="off"
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
                                                        <img
                                                            src={item.product.images?.[0]?.image_path ? `/storage/${item.product.images[0].image_path}` : 'https://placehold.co/50'}
                                                            className="h-full w-full object-cover"
                                                            alt={item.product.name}
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
                                    {order.status === 'awaiting_payment' && !order.payment && (
                                        <CardFooter>
                                            <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full">
                                                        <CreditCard className="mr-2 h-4 w-4" />
                                                        Lihat Invoice
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Invoice Pembayaran</DialogTitle>
                                                        <DialogDescription>
                                                            Pilih metode pembayaran Anda untuk pesanan ini.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                                            <span className="font-medium">Total Tagihan</span>
                                                            <span className="font-bold text-lg">{formatCurrency(order.total_amount)}</span>
                                                        </div>

                                                        <form id="payment-form" onSubmit={handlePaymentSubmit} className="grid gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Metode Pembayaran</Label>
                                                                <Select
                                                                    value={paymentData.payment_method}
                                                                    onValueChange={(val) => setPaymentData('payment_method', val)}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Pilih metode" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="cash">Cash / Tunai</SelectItem>
                                                                        <SelectItem value="credit" disabled={order.total_amount < 1000000}>
                                                                            Kredit / Cicilan {order.total_amount < 1000000 && "(Min. Rp 1.000.000)"}
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            {paymentData.payment_method === 'cash' && (
                                                                <div className="space-y-2">
                                                                    <Label>Jenis Pembayaran Cash</Label>
                                                                    <Select
                                                                        value={paymentData.cash_type}
                                                                        onValueChange={(val) => setPaymentData('cash_type', val)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Pilih jenis cash" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="transfer">Transfer Bank</SelectItem>
                                                                            <SelectItem value="direct">Bayar di Tempat (COD/Langsung)</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    {paymentErrors.cash_type && <p className="text-red-500 text-xs">{paymentErrors.cash_type}</p>}
                                                                </div>
                                                            )}

                                                            {paymentData.payment_method === 'credit' && (
                                                                <div className="space-y-4 border rounded-md p-4">
                                                                    <div className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id="with_down_payment"
                                                                            checked={paymentData.with_down_payment}
                                                                            onCheckedChange={(checked) => setPaymentData('with_down_payment', checked as boolean)}
                                                                        />
                                                                        <Label htmlFor="with_down_payment">Pakai Uang Muka (DP)?</Label>
                                                                    </div>

                                                                    {paymentData.with_down_payment && (
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="down_payment">Nominal Uang Muka</Label>
                                                                            <Input
                                                                                id="down_payment"
                                                                                type="number"
                                                                                placeholder="Contoh: 500000"
                                                                                value={paymentData.down_payment}
                                                                                onChange={(e) => setPaymentData('down_payment', e.target.value)}
                                                                            />
                                                                            {paymentErrors.down_payment && <p className="text-red-500 text-xs">{paymentErrors.down_payment}</p>}
                                                                        </div>
                                                                    )}
                                                                    {/* Simulasi Kredit Otomatis */}
                                                                    <div className="bg-blue-50/50 border border-blue-100 rounded p-3 mt-4">
                                                                        <h4 className="text-xs font-semibold text-blue-800 uppercase mb-2">Simulasi Kredit (10 Bulan)</h4>
                                                                        <div className="grid grid-cols-2 gap-1 text-xs">
                                                                            <div className="text-muted-foreground">Sisa Dicicil:</div>
                                                                            <div className="text-right font-medium">
                                                                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                                                                                    Math.max(0, (order.total_amount * 1.5) - (paymentData.with_down_payment ? (parseFloat(paymentData.down_payment) || 0) : 0))
                                                                                )}
                                                                            </div>
                                                                            <div className="text-muted-foreground font-semibold mt-1">Estimasi Angsuran/Bulan:</div>
                                                                            <div className="text-right font-bold text-sm text-green-600 mt-1">
                                                                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                                                                                    Math.max(0, (order.total_amount * 1.5) - (paymentData.with_down_payment ? (parseFloat(paymentData.down_payment) || 0) : 0)) / 10
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-[10px] text-gray-500 mt-2">*Cicilan default 10 bulan. Nominal riil sepenuhnya ditentukan oleh Admin.</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </form>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="button" variant="outline" onClick={() => setIsInvoiceOpen(false)}>Batal</Button>
                                                        <Button type="submit" form="payment-form" disabled={processingPayment}>
                                                            {paymentData.payment_method === 'credit' ? 'Ajukan Kredit' : 'Konfirmasi Pembayaran'}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </CardFooter>
                                    )}
                                    {order.payment && (
                                        <CardFooter className="bg-gray-50 flex flex-col gap-4 items-center p-4">
                                            <div className="w-full text-center">
                                                <p className="text-gray-700 font-medium text-sm">Status Pembayaran: <span className="font-bold">{order.payment.status === 'pending_approval' ? 'Menunggu Konfirmasi' : order.payment.status}</span></p>
                                            </div>

                                            {/* CASH PAYMENT LOGIC */}
                                            {order.payment.payment_method === 'cash' && order.payment.status !== 'paid_off' && (
                                                <div className="w-full border-t pt-4">
                                                    {(() => {
                                                        const logs = order.payment!.payment_logs || [];
                                                        const cashManualPending = logs.some(l => l.type === 'full_payment' && l.status === 'pending' && l.proof_path);
                                                        const cashMidtransPending = logs.some(l => l.type === 'full_payment' && l.status === 'pending' && !l.proof_path);

                                                        if (cashManualPending) {
                                                            return (
                                                                <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm text-center border border-yellow-200">
                                                                    Bukti pembayaran telah diupload.<br />Mohon tunggu verifikasi admin.
                                                                </div>
                                                            );
                                                        }

                                                        return (
                                                            <div className="space-y-3">
                                                                {cashMidtransPending && (
                                                                    <div className="bg-amber-50 text-amber-900 p-4 rounded-lg text-sm mb-3 border border-amber-200 shadow-sm relative overflow-hidden">
                                                                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 rounded-bl-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
                                                                        <div className="font-bold text-amber-800 text-base mb-1">Tagihan Sedang Diproses</div>
                                                                        <p className="mb-3 text-amber-800/90 leading-relaxed">
                                                                            Anda memiliki transaksi Midtrans yang belum diselesaikan. Selesaikan di aplikasi bank Anda.
                                                                        </p>
                                                                        {logs.filter(l => l.type === 'full_payment' && l.status === 'pending' && !l.proof_path && l.snap_token).map(payment => (
                                                                            <Button 
                                                                                key={payment.id} 
                                                                                size="sm" 
                                                                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm w-full sm:w-auto"
                                                                                onClick={() => {
                                                                                    if (window.snap) {
                                                                                        window.snap.pay(payment.snap_token!, {
                                                                                            onSuccess: async function (result: any) {
                                                                                                await axios.post('/api/midtrans/callback', {
                                                                                                    transaction_status: result.transaction_status || 'settlement',
                                                                                                    payment_type: result.payment_type,
                                                                                                    order_id: result.order_id,
                                                                                                    fraud_status: result.fraud_status || 'accept'
                                                                                                });
                                                                                                window.location.reload();
                                                                                            },
                                                                                            onPending: async function (result: any) {
                                                                                                await axios.post('/api/midtrans/callback', {
                                                                                                    transaction_status: result.transaction_status || 'pending',
                                                                                                    payment_type: result.payment_type,
                                                                                                    order_id: result.order_id,
                                                                                                    fraud_status: result.fraud_status || 'accept'
                                                                                                });
                                                                                                window.location.reload();
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <CreditCard className="w-4 h-4 mr-2" />
                                                                                Lihat Tagihan {formatCurrency(payment.amount)}
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                                <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm mb-2 border border-blue-100">
                                                                    Silakan lakukan pembayaran Lunas.
                                                                </div>
                                                                <MidtransButton orderId={order.id} amount={order.total_amount} type="Pembayaran Lunas" />
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            )}

                                            {/* CREDIT PAYMENT LOGIC */}
                                            {order.payment.payment_method === 'credit' && (
                                                <div className="w-full border-t pt-4">
                                                    <div className="space-y-4">
                                                        {/* Logic to determine what to show: DP or Installment */}
                                                        {(() => {
                                                                const payment = order.payment!;
                                                                const logs = payment.payment_logs || [];

                                                                // Check DP Status
                                                                const hasDp = payment.down_payment > 0;
                                                                const dpVerified = logs.some(l => l.type === 'down_payment' && l.status === 'verified');
                                                                const dpManualPending = logs.some(l => l.type === 'down_payment' && l.status === 'pending' && l.proof_path);
                                                                const dpMidtransPending = logs.some(l => l.type === 'down_payment' && l.status === 'pending' && !l.proof_path);

                                                                if (hasDp && !dpVerified) {
                                                                    if (dpManualPending) {
                                                                        return (
                                                                            <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm text-center border border-yellow-200">
                                                                                Bukti Uang Muka (DP) sebesar <strong>{formatCurrency(payment.down_payment)}</strong> sedang diverifikasi.
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="space-y-3">
                                                                                {dpMidtransPending && (
                                                                                    <div className="bg-amber-50 text-amber-900 p-4 rounded-lg text-sm mb-3 border border-amber-200 shadow-sm relative overflow-hidden">
                                                                                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 rounded-bl-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
                                                                                        <div className="font-bold text-amber-800 text-base mb-1">Tagihan Sedang Diproses</div>
                                                                                        <p className="mb-3 text-amber-800/90 leading-relaxed">
                                                                                            Anda memiliki transaksi Midtrans yang belum diselesaikan. Selesaikan di aplikasi bank Anda.
                                                                                        </p>
                                                                                        {logs.filter(l => l.type === 'down_payment' && l.status === 'pending' && !l.proof_path && l.snap_token).map(payment => (
                                                                                            <Button 
                                                                                                key={payment.id} 
                                                                                                size="sm" 
                                                                                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm w-full sm:w-auto"
                                                                                                onClick={() => {
                                                                                                    if (window.snap) {
                                                                                                        window.snap.pay(payment.snap_token!, {
                                                                                                            onSuccess: async function (result: any) {
                                                                                                                await axios.post('/api/midtrans/callback', {
                                                                                                                    transaction_status: result.transaction_status || 'settlement',
                                                                                                                    payment_type: result.payment_type,
                                                                                                                    order_id: result.order_id,
                                                                                                                    fraud_status: result.fraud_status || 'accept'
                                                                                                                });
                                                                                                                window.location.reload();
                                                                                                            },
                                                                                                            onPending: async function (result: any) {
                                                                                                                await axios.post('/api/midtrans/callback', {
                                                                                                                    transaction_status: result.transaction_status || 'pending',
                                                                                                                    payment_type: result.payment_type,
                                                                                                                    order_id: result.order_id,
                                                                                                                    fraud_status: result.fraud_status || 'accept'
                                                                                                                });
                                                                                                                window.location.reload();
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <CreditCard className="w-4 h-4 mr-2" />
                                                                                                Lihat Tagihan {formatCurrency(payment.amount)}
                                                                                            </Button>
                                                                                        ))}
                                                                                    </div>
                                                                                )}
                                                                                <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm mb-2 border border-blue-100">
                                                                                    Silakan bayar Uang Muka (DP) sebesar <strong>{formatCurrency(payment.down_payment)}</strong>.
                                                                                </div>
                                                                                <MidtransButton orderId={order.id} amount={payment.down_payment} type="Uang Muka (DP)" />
                                                                            </div>
                                                                        );
                                                                    }
                                                                }

                                                                // Installment Logic
                                                                if (payment.status !== 'paid_off') {
                                                                    const installmentsPaid = payment.installments_paid || 0;
                                                                    if (!hasDp && installmentsPaid === 0) {
                                                                        const nextInstallment = 1;
                                                                        const manualPendingInst = logs.find(l => l.type === 'installment' && l.installment_number === nextInstallment && l.status === 'pending' && l.proof_path);
                                                                        const midtransPendingInst = logs.find(l => l.type === 'installment' && l.installment_number === nextInstallment && l.status === 'pending' && !l.proof_path);

                                                                        if (manualPendingInst) {
                                                                            return (
                                                                                <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm text-center border border-yellow-200">
                                                                                    Bukti Angsuran Bulan ke-{nextInstallment} sedang diverifikasi.
                                                                                </div>
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <div className="space-y-3">
                                                                                    {midtransPendingInst && (
                                                                                        <div className="bg-amber-50 text-amber-900 p-4 rounded-lg text-sm mb-3 border border-amber-200 shadow-sm relative overflow-hidden">
                                                                                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 rounded-bl-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
                                                                                            <div className="font-bold text-amber-800 text-base mb-1">Tagihan Sedang Diproses</div>
                                                                                            <p className="mb-3 text-amber-800/90 leading-relaxed">
                                                                                                Anda memiliki transaksi Midtrans yang belum diselesaikan. Selesaikan di aplikasi bank Anda.
                                                                                            </p>
                                                                                            <Button 
                                                                                                size="sm" 
                                                                                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm w-full sm:w-auto"
                                                                                                onClick={() => {
                                                                                                    if (midtransPendingInst.snap_token && window.snap) {
                                                                                                        window.snap.pay(midtransPendingInst.snap_token, {
                                                                                                            onSuccess: async function (result: any) {
                                                                                                                await axios.post('/api/midtrans/callback', {
                                                                                                                    transaction_status: result.transaction_status || 'settlement',
                                                                                                                    payment_type: result.payment_type,
                                                                                                                    order_id: result.order_id,
                                                                                                                    fraud_status: result.fraud_status || 'accept'
                                                                                                                });
                                                                                                                window.location.reload();
                                                                                                            },
                                                                                                            onPending: async function (result: any) {
                                                                                                                await axios.post('/api/midtrans/callback', {
                                                                                                                    transaction_status: result.transaction_status || 'pending',
                                                                                                                    payment_type: result.payment_type,
                                                                                                                    order_id: result.order_id,
                                                                                                                    fraud_status: result.fraud_status || 'accept'
                                                                                                                });
                                                                                                                window.location.reload();
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <CreditCard className="w-4 h-4 mr-2" />
                                                                                                Lihat Tagihan {formatCurrency(midtransPendingInst.amount)}
                                                                                            </Button>
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm mb-2 border border-blue-100">
                                                                                        <strong>Tagihan Awal: Angsuran 1 (Tanpa DP)</strong>
                                                                                        <br />Nominal: <strong>{formatCurrency(payment.installment_amount)}</strong>
                                                                                    </div>
                                                                                    <MidtransButton
                                                                                        orderId={order.id}
                                                                                        amount={payment.installment_amount}
                                                                                        type={`Angsuran ke-${nextInstallment}`}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        }
                                                                    }

                                                                    return (
                                                                        <div className="bg-green-50 text-green-800 p-3 rounded text-sm text-center border border-green-200">
                                                                            <strong>Kredit Sedang Berjalan</strong>
                                                                            <br />
                                                                            Silakan cek menu <strong>Angsuran</strong> untuk melakukan pembayaran angsuran selanjutnya.
                                                                        </div>
                                                                    );
                                                                }

                                                                return (
                                                                    <div className="bg-green-50 text-green-800 p-3 rounded text-sm text-center border border-green-200 font-bold">
                                                                        Lunas! Terima kasih telah menyelesaikan pembayaran.
                                                                    </div>
                                                                );
                                                            })()}
                                                        </div>
                                                </div>
                                            )}
                                        </CardFooter>
                                    )}
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

function MidtransButton({ orderId, amount, type }: { orderId: number, amount: number, type: string }) {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('orders.payment.snap', orderId));
            const snapToken = response.data.token;

            if (window.snap) {
                window.snap.pay(snapToken, {
                    onSuccess: async function (result: any) {
                        await axios.post('/api/midtrans/callback', {
                            transaction_status: result.transaction_status || 'settlement',
                            payment_type: result.payment_type,
                            order_id: result.order_id,
                            fraud_status: result.fraud_status || 'accept'
                        });
                        window.location.reload();
                    },
                    onPending: async function (result: any) {
                        await axios.post('/api/midtrans/callback', {
                            transaction_status: result.transaction_status || 'pending',
                            payment_type: result.payment_type,
                            order_id: result.order_id,
                            fraud_status: result.fraud_status || 'accept'
                        });
                        window.location.reload();
                    },
                    onError: function (result: any) {
                        alert("Pembayaran gagal!");
                    },
                    onClose: function () {
                        setLoading(false);
                    }
                });
            } else {
                alert("Midtrans script not loaded.");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Gagal memproses pembayaran.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className="space-y-2 bg-gray-50 p-3 rounded border">
                <div className="text-sm font-medium text-gray-700">Nominal Tagihan ({type}):</div>
                <div className="text-xl font-bold text-blue-700">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)}
                </div>
            </div>

            <Button onClick={handlePay} className="w-full" disabled={loading}>
                {loading ? 'Memproses...' : 'Bayar Sekarang dengan Midtrans'}
            </Button>
        </div>
    );
}
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
    type: 'down_payment' | 'installment';
    installment_number?: number;
    amount: number;
    proof_path: string;
    status: 'pending' | 'verified' | 'rejected';
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
                                                            {/* ... (Select Inputs remain same) ... */}
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
                                                                        <SelectItem value="credit">Kredit / Cicilan</SelectItem>
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
                                                                    <p className="text-xs text-gray-500">
                                                                        *Besaran angsuran dan tenor akan ditentukan oleh Admin setelah pengajuan.
                                                                    </p>
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
                                                    {order.payment.proof_of_payment_path ? (
                                                        <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm text-center border border-yellow-200">
                                                            Bukti pembayaran telah diupload.<br />Mohon tunggu verifikasi admin.
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm mb-2 border border-blue-100">
                                                                Silakan upload bukti pembayaran (Transfer/Lainnya) untuk diproses.
                                                            </div>
                                                            <FileUploadForm orderId={order.id} label="Upload Bukti Pembayaran" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* CREDIT PAYMENT LOGIC */}
                                            {order.payment.payment_method === 'credit' && (
                                                <div className="w-full border-t pt-4">
                                                    {order.payment.status === 'pending_approval' ? (
                                                        <div className="bg-gray-100 text-gray-700 p-3 rounded text-sm text-center border border-gray-200">
                                                            Pengajuan kredit sedang ditinjau oleh Admin.
                                                            <br />
                                                            <span className="text-xs text-gray-500">Anda akan mendapatkan notifikasi setelah diterima untuk melanjutkan pembayaran DP/Angsuran.</span>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            {/* Logic to determine what to show: DP or Installment */}
                                                            {(() => {
                                                                const payment = order.payment!;
                                                                const logs = payment.payment_logs || [];

                                                                // Check DP Status
                                                                const hasDp = payment.down_payment > 0;
                                                                const dpVerified = logs.some(l => l.type === 'down_payment' && l.status === 'verified');
                                                                const dpPending = logs.some(l => l.type === 'down_payment' && l.status === 'pending');

                                                                if (hasDp && !dpVerified) {
                                                                    // Show DP Upload
                                                                    if (dpPending) {
                                                                        return (
                                                                            <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm text-center border border-yellow-200">
                                                                                Bukti Uang Muka (DP) sebesar <strong>{formatCurrency(payment.down_payment)}</strong> sedang diverifikasi.
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <div className="space-y-3">
                                                                                <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm mb-2 border border-blue-100">
                                                                                    Silakan bayar Uang Muka (DP) sebesar <strong>{formatCurrency(payment.down_payment)}</strong>.
                                                                                    <br />Upload bukti pembayaran di bawah ini.
                                                                                </div>
                                                                                <FileUploadForm orderId={order.id} label="Upload Bukti DP" />
                                                                            </div>
                                                                        );
                                                                    }
                                                                }

                                                                // Installment Logic
                                                                // If DP is verified OR no DP required
                                                                if (payment.status !== 'paid_off') {
                                                                    // Special Case: No DP selected and First Installment not yet paid.
                                                                    // Show Upload for Installment #1 immediately.
                                                                    const installmentsPaid = payment.installments_paid || 0;
                                                                    if (!hasDp && installmentsPaid === 0) {
                                                                        const nextInstallment = 1;
                                                                        const pendingInstallment = logs.find(l => l.type === 'installment' && l.installment_number === nextInstallment && l.status === 'pending');

                                                                        if (pendingInstallment) {
                                                                            return (
                                                                                <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm text-center border border-yellow-200">
                                                                                    Bukti Angsuran Bulan ke-{nextInstallment} sedang diverifikasi.
                                                                                </div>
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <div className="space-y-3">
                                                                                    <div className="bg-blue-50 text-blue-800 p-3 rounded text-sm mb-2 border border-blue-100">
                                                                                        <strong>Tagihan Awal: Angsuran 1 (Tanpa DP)</strong>
                                                                                        <br />Nominal: <strong>{formatCurrency(payment.installment_amount)}</strong>
                                                                                    </div>
                                                                                    <FileUploadForm
                                                                                        orderId={order.id}
                                                                                        label={`Upload Bukti Angsuran ke-${nextInstallment}`}
                                                                                        showMonthsInput={true}
                                                                                        installmentAmount={payment.installment_amount}
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
                                                    )}
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

// Sub-component for File Upload to handle useForm hook cleanly
function FileUploadForm({ orderId, label, showMonthsInput = false, installmentAmount = 0 }: { orderId: number, label?: string, showMonthsInput?: boolean, installmentAmount?: number }) {
    const { data, setData, post, processing, errors } = useForm<{ proof_of_payment: File | null; months_paid: number }>({
        proof_of_payment: null,
        months_paid: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.payment.proof', orderId), {
            forceFormData: true,
        });
    };

    const handleMonthsChange = (val: number) => {
        const m = isNaN(val) ? 1 : Math.max(1, val);
        setData('months_paid', m);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {showMonthsInput && (
                <div className="space-y-2 bg-gray-50 p-3 rounded border">
                    <Label htmlFor="months_paid" className="text-sm">Jumlah Bulan yang Dibayar</Label>
                    <div className="flex gap-2">
                        <Input
                            id="months_paid"
                            type="number"
                            min={1}
                            value={data.months_paid}
                            onChange={(e) => handleMonthsChange(parseInt(e.target.value))}
                            className="bg-white w-24"
                        />
                        <div className="flex items-center text-sm text-gray-500">
                            x {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(installmentAmount)}
                        </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                        Total Transfer: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(installmentAmount * data.months_paid)}
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="proof_of_payment" className="text-sm">{label || "Upload Bukti Transfer"}</Label>
                <Input
                    id="proof_of_payment"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('proof_of_payment', e.target.files ? e.target.files[0] : null)}
                    className="bg-white"
                />
                {errors.proof_of_payment && <p className="text-red-500 text-xs">{errors.proof_of_payment}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={processing || !data.proof_of_payment}>
                {processing ? 'Mengupload...' : (label || 'Upload Bukti Pembayaran')}
            </Button>
        </form>
    );
}

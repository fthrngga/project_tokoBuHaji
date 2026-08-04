import { useRef, useState, useEffect } from "react";
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData, Product } from '@/types';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { route } from 'ziggy-js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Send, ArrowLeft, TrendingUp, DollarSign, Truck } from "lucide-react";
import { toast } from "sonner";

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
    user_id: number;
    user: { id: number; name: string; email: string };
    status: string;
    total_amount: number;
    shipping_cost: number | null;
    province: string;
    city: string;
    postal_code: string;
    address_detail: string;
    village: string;
    district: string;
    notes: string;
    items: OrderItem[];
    messages: Message[];
    credit?: {
        id: number;
        payment_method: string;
        status: string;
        proof_of_payment_path?: string | null;
        [key: string]: any;
    } | null;
    allow_credit: boolean;
    created_at: string;
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
        case 'negotiation': return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/20">Negosiasi</Badge>;
        case 'pending': return <Badge variant="secondary" className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30 border border-slate-500/20">Menunggu</Badge>;
        case 'awaiting_payment': return <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/20">Menunggu Pembayaran</Badge>;
        case 'processing': return <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/20">Diproses</Badge>;
        case 'completed': return <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/20">Selesai</Badge>;
        case 'cancelled': return <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20">Dibatalkan</Badge>;
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

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: route('admin.orders.index') },
        { title: `Order #${order.id}`, href: '#' },
    ];

    // Chat Form
    const { data: msgData, setData: setMsgData, post: postMsg, processing: msgProcessing, reset: resetMsg } = useForm({
        message: '',
    });

    // Update Form (Invoice/Shipping)
    const { data: updateData, setData: setUpdateData, put: putUpdate, processing: updateProcessing } = useForm({
        shipping_cost: order.shipping_cost || '',
        status: order.status,
        cancel_reason: '',
    });

    // 1. Polling untuk mendapatkan pesan realtime menggunakan Inertia Reload
    useEffect(() => {
        // Hentikan polling jika admin sedang memproses pengiriman pesan
        if (msgProcessing) return;

        const intervalId = setInterval(() => {
            router.reload({
                only: ['order'], // Cukup panggil 'only' saja
            });
        }, 3000); 

        return () => clearInterval(intervalId); 
    }, [msgProcessing]); // Masukkan msgProcessing ke dependency array

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
        postMsg(route('orders.messages.store', order.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => resetMsg('message'),
            onError: () => toast.error("Failed to send message"),
        });
    }

    const handleSendInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        putUpdate(route('admin.orders.update', order.id), {
            onSuccess: () => toast.success("Invoice sent / Order updated successfully"),
            onError: () => toast.error("Failed to update order"),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin - Order #${order.id}`} />

            <div className="flex flex-col space-y-4 p-4 h-[calc(100vh-4rem)]">
                <div className="flex justify-between items-center bg-card text-card-foreground p-6 rounded-xl shadow-sm border">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            Order #{order.id}
                            {getStatusBadge(order.status)}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Customer: <span className="font-semibold text-foreground">{order.user.name}</span> ({order.user.email})
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
                    {/* LEFT COLUMN: Chat */}
                    <Card className="lg:col-span-2 flex flex-col h-full overflow-hidden">
                        <CardHeader className="border-b py-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" /> Negotiation Chat
                            </CardTitle>
                        </CardHeader>
                        <CardContent 
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20 dark:bg-slate-900/50" 
                            ref={scrollRef}
                            onScroll={handleScroll} 
                        >
                            {order.messages.length === 0 && (
                                <div className="text-center text-sm text-gray-400 py-10">
                                    No messages yet. Start the conversation.
                                </div>
                            )}
                            {order.messages.map((msg) => {
                                const isAdmin = msg.user.id !== order.user_id;
                                const isMe = msg.user_id === auth.user.id;

                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-lg p-3 text-sm shadow-sm ${isMe
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-muted border border-border text-foreground rounded-bl-none'
                                            }`}>
                                            <p>{msg.message}</p>
                                            <div className={`text-[10px] mt-1 flex justify-between gap-4 ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                <span className="font-semibold">{msg.user.name} {isAdmin && !(msg.user.id === order.user.id) && '(Admin)'}</span>
                                                <span>{format(new Date(msg.created_at), "HH:mm")}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                        <CardFooter className="p-3 border-t bg-background">
                            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                                <Input
                                    value={msgData.message}
                                    onChange={e => setMsgData('message', e.target.value)}
                                    placeholder="Reply as Admin..."
                                    className="flex-1"
                                    disabled={msgProcessing}
                                    autoComplete="off"
                                />
                                <Button type="submit" size="icon" disabled={msgProcessing || !msgData.message.trim()}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>

                    {/* RIGHT COLUMN: Details & Actions */}
                    <div className="space-y-6 overflow-y-auto h-full pr-1">
                        {/* Action Panel: Set Invoice */}
                        <Card className="border-border bg-secondary/30">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    {order.credit?.payment_method === 'cash' ? 'Payment Proof' : 'Submit Invoice / Update Order'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {order.credit?.payment_method === 'cash' ? (
                                    <div className="space-y-4">
                                        {order.credit.status === 'paid_off' ? (
                                            <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm font-medium border border-green-200">
                                                Pembayaran Lunas / Terverifikasi.
                                            </div>
                                        ) : order.credit.proof_of_payment_path ? (
                                            <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium border border-yellow-200">
                                                Bukti pembayaran sedang diverifikasi admin.
                                            </div>
                                        ) : (
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                            }} className="space-y-4">
                                                {/* Placeholder */}
                                            </form>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                                            <div className="space-y-0.5">
                                                <Label className="text-base font-semibold">Izinkan Opsi Kredit</Label>
                                                <p className="text-sm text-muted-foreground">Berikan izin kepada customer ini untuk memilih metode cicilan.</p>
                                            </div>
                                            <Button 
                                                variant={order.allow_credit ? "default" : "outline"}
                                                onClick={() => {
                                                    router.put(route('admin.orders.update', order.id), {
                                                        toggle_credit: true,
                                                        allow_credit: !order.allow_credit
                                                    }, { preserveScroll: true });
                                                }}
                                            >
                                                {order.allow_credit ? 'Diizinkan' : 'Dilarang'}
                                            </Button>
                                        </div>

                                        <form onSubmit={handleSendInvoice} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="shipping_cost">Shipping Cost (Rp)</Label>
                                                <Input
                                                    id="shipping_cost"
                                                    type="number"
                                                    placeholder="e.g. 50000"
                                                    value={updateData.shipping_cost}
                                                    onChange={e => setUpdateData('shipping_cost', e.target.value)}
                                                    className="bg-background"
                                                />
                                            </div>
                                        <div className="space-y-2">
                                            <Label>Order Status</Label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={updateData.status}
                                                onChange={e => setUpdateData('status', e.target.value)}
                                                disabled={['completed', 'cancelled'].includes(order.status)} // Kunci jika sudah final
                                            >
                                                {/* Opsi dinonaktifkan berdasarkan urutan statusHierarchy di backend */}
                                                <option value="negotiation" disabled={order.status !== 'negotiation'}>Negotiation</option>
                                                <option value="awaiting_payment" disabled={!['negotiation', 'awaiting_payment'].includes(order.status)}>Awaiting Payment</option>
                                                <option value="processing" disabled={['completed', 'cancelled'].includes(order.status)}>Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>

                                        {/* Munculkan input alasan jika memilih Cancelled */}
                                        {updateData.status === 'cancelled' && order.status !== 'cancelled' && (
                                            <div className="space-y-2 mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
                                                <Label className="text-red-900">Alasan Pembatalan</Label>
                                                <textarea
                                                    className="w-full text-sm p-2 border rounded-md"
                                                    placeholder="Contoh: Stok barang tiba-tiba habis atau lokasi tidak terjangkau..."
                                                    value={updateData.cancel_reason}
                                                    onChange={e => setUpdateData('cancel_reason', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        )}
                                        <Button type="submit" className="w-full" disabled={updateProcessing}>
                                            {updateProcessing ? "Updating..." : "Update Order"}
                                        </Button>
                                    </form>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Order Summary */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Order Items ({order.items.length})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex gap-2 items-center">
                                            <div className="h-8 w-8 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    src={item.product.images?.[0]?.image_path ? `/storage/${item.product.images[0].image_path}` : 'https://placehold.co/40'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium line-clamp-1 max-w-[120px]">{item.product.name}</p>
                                                {item.variant && (
                                                    <div className="mt-0.5 flex flex-wrap gap-1">
                                                        {Object.entries(item.variant.options).map(([k, v]) => (
                                                            <span key={k} className="inline-flex items-center text-[9px] font-medium text-gray-500 bg-gray-100 px-1 rounded">
                                                                {k}: {v}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-xs text-muted-foreground">{item.quantity} x {formatCurrency(item.price)}</p>
                                            </div>
                                        </div>
                                        <span className="font-medium">{formatCurrency(item.quantity * item.price)}</span>
                                    </div>
                                ))}
                                <Separator />
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Items Subtotal</span>
                                        <span>{formatCurrency(order.items.reduce((acc, item) => acc + item.quantity * item.price, 0))}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping Cost</span>
                                        <span className="text-blue-600 font-medium">{order.shipping_cost ? formatCurrency(order.shipping_cost) : '-'}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t">
                                        <span>Total Amount</span>
                                        <span>{formatCurrency(order.total_amount)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Truck className="h-4 w-4" /> Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p className="font-semibold">{order.address_detail}</p>
                                <p>{order.village}, {order.district}</p>
                                <p>{order.city}, {order.province}</p>
                                <p>Postal Code: {order.postal_code || '-'}</p>
                                {order.notes && (
                                    <div className="mt-3 bg-yellow-50 p-2 rounded border border-yellow-100 text-xs text-yellow-800">
                                        <span className="font-bold">Note:</span> {order.notes}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
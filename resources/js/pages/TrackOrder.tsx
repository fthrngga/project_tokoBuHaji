import React from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Search, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

interface TrackOrderProps {
    orderData?: any;
    errors?: any;
}

export default function TrackOrder({ orderData, errors }: TrackOrderProps) {
    const { data, setData, post, processing } = useForm({
        order_id: '',
        phone: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('track.search'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="h-10 w-10 text-green-500" />;
            case 'processing': return <Clock className="h-10 w-10 text-amber-500" />;
            case 'awaiting_payment': return <AlertCircle className="h-10 w-10 text-blue-500" />;
            default: return <Package className="h-10 w-10 text-slate-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Selesai / Lunas';
            case 'processing': return 'Sedang Diproses (Pre-Order/Menunggu)';
            case 'awaiting_payment': return 'Menunggu Pembayaran';
            case 'negotiation': return 'Tahap Negosiasi';
            case 'cancelled': return 'Dibatalkan';
            default: return status;
        }
    };

    return (
        <div className="bg-background min-h-screen text-foreground font-sans flex flex-col">
            <Head title="Lacak Pesanan" />
            
            <Header user={null} />

            <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="text-center">
                        <Package className="mx-auto h-12 w-12 text-primary" />
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
                            Lacak Pesanan Anda
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Masukkan Order ID dari struk kasir dan Nomor HP Anda untuk melihat status pesanan pre-order.
                        </p>
                    </div>

                    <Card className="shadow-lg border-primary/20">
                        <CardHeader className="bg-primary/5 rounded-t-xl pb-6">
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="order_id">Order ID</Label>
                                        <Input
                                            id="order_id"
                                            placeholder="Contoh: 125"
                                            value={data.order_id}
                                            onChange={e => setData('order_id', e.target.value)}
                                            required
                                            className="bg-background"
                                        />
                                        {errors?.order_id && <p className="text-xs text-red-500">{errors.order_id}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor HP</Label>
                                        <Input
                                            id="phone"
                                            placeholder="Contoh: 08123456789"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            required
                                            className="bg-background"
                                        />
                                        {errors?.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-11" disabled={processing}>
                                    {processing ? 'Mencari...' : (
                                        <>
                                            <Search className="mr-2 h-4 w-4" /> Cari Pesanan
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardHeader>
                        
                        {orderData && (
                            <CardContent className="pt-8 space-y-6">
                                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
                                    <div className="shrink-0">
                                        {getStatusIcon(orderData.status)}
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-foreground">Order #{orderData.id}</h3>
                                        <p className="text-lg font-medium text-primary mt-1">{getStatusText(orderData.status)}</p>
                                        <div className="mt-2 text-sm text-muted-foreground space-y-1">
                                            <p>Atas Nama: <span className="font-medium text-foreground">{orderData.user?.name}</span></p>
                                            <p>Tanggal Pesanan: <span className="font-medium text-foreground">{new Date(orderData.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg mb-4 border-b pb-2">Rincian Barang</h4>
                                    <div className="space-y-3">
                                        {orderData.items.map((item: any) => (
                                            <div key={item.id} className="flex justify-between items-center bg-card border rounded-lg p-3">
                                                <div>
                                                    <p className="font-medium text-foreground">{item.product?.name}</p>
                                                    {item.preorder_quantity > 0 && (
                                                        <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                                            {item.preorder_quantity} Pre-Order
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">{item.quantity}x</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {orderData.status === 'processing' && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg flex gap-3 text-sm">
                                        <Truck className="h-5 w-5 shrink-0" />
                                        <p>Barang Pre-Order Anda sedang dalam proses penyediaan/pengiriman. Silakan hubungi admin kami jika ada pertanyaan lebih lanjut.</p>
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

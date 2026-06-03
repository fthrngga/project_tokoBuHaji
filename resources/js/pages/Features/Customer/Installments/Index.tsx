import { Head, useForm } from '@inertiajs/react'; // Added useForm
import AppLayout from '@/layouts/app-layout';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Calendar, Package, AlertCircle, CheckCircle2, CreditCard } from "lucide-react";
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import axios from 'axios';

function MidtransButton({ orderId, installmentAmount = 0, tunggakan = 0, tunggakanMonths = 0, onSuccess, onPayStart }: { orderId: number, installmentAmount?: number, tunggakan?: number, tunggakanMonths?: number, onSuccess?: () => void, onPayStart?: () => void }) {
    const minBelanja = installmentAmount / 2;
    const [amount, setAmount] = useState(tunggakan > 0 ? installmentAmount + tunggakan : installmentAmount);
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('orders.payment.snap', orderId), {
                amount: amount
            });
            const snapToken = response.data.token;

            if (window.snap) {
                if (onPayStart) onPayStart();
                window.snap.pay(snapToken, {
                    onSuccess: async function (result: any) {
                        await axios.post('/api/midtrans/callback', {
                            transaction_status: result.transaction_status || 'settlement',
                            payment_type: result.payment_type,
                            order_id: result.order_id,
                            fraud_status: result.fraud_status || 'accept'
                        });
                        if (onSuccess) onSuccess();
                        window.location.reload();
                    },
                    onPending: async function (result: any) {
                        await axios.post('/api/midtrans/callback', {
                            transaction_status: result.transaction_status || 'pending',
                            payment_type: result.payment_type,
                            order_id: result.order_id,
                            fraud_status: result.fraud_status || 'accept'
                        });
                        if (onSuccess) onSuccess();
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
        <div className="space-y-6">
            <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
                <h4 className="text-base font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> Pilih Nominal Pembayaran
                </h4>
                <div className="space-y-4">
                    {tunggakan > 0 ? (
                        <div className="space-y-3">
                            <div className="text-sm font-medium text-amber-600 dark:text-amber-500 mb-2">Anda memiliki tunggakan {tunggakanMonths} bulan. Pilih jumlah bulan yang ingin dibayar:</div>
                            {Array.from({ length: Math.max(1, tunggakanMonths) }).map((_, i) => {
                                const monthsToPay = i + 1;
                                const isLunas = monthsToPay === Math.max(1, tunggakanMonths);
                                const optionAmount = isLunas ? tunggakan : monthsToPay * installmentAmount;
                                const isSelected = amount === optionAmount;
                                return (
                                    <label key={i} className={`relative flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-amber-500 bg-amber-500/10 shadow-md ring-4 ring-amber-500/20' : 'border-border bg-background hover:border-amber-400 hover:bg-amber-500/5'}`}>
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-input bg-background mt-0.5">
                                            {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-amber-600" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment_option"
                                            checked={isSelected}
                                            onChange={() => setAmount(optionAmount)}
                                            className="sr-only"
                                        />
                                        <div className="flex-1">
                                            <div className={`font-bold ${isSelected ? 'text-amber-600 dark:text-amber-500' : 'text-foreground'}`}>
                                                Bayar {monthsToPay} Bulan {isLunas ? '(Lunas Tunggakan)' : ''}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-0.5">
                                                {monthsToPay === 1 ? 'Hanya angsuran pokok' : `Pokok + ${monthsToPay - 1} bulan tunggakan`}
                                            </div>
                                            <div className="text-lg font-black mt-2 text-foreground tracking-tight">
                                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(optionAmount)}
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className={`relative flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${amount === installmentAmount ? 'border-blue-600 bg-blue-500/10 shadow-md ring-4 ring-blue-600/20' : 'border-border bg-background hover:border-blue-400 hover:bg-blue-500/5'}`}>
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-input bg-background mt-0.5">
                                    {amount === installmentAmount && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                                </div>
                                <input
                                    type="radio"
                                    name="payment_option"
                                    checked={amount === installmentAmount}
                                    onChange={() => setAmount(installmentAmount)}
                                    className="sr-only"
                                />
                                <div className="flex-1">
                                    <div className={`font-bold ${amount === installmentAmount ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>Angsuran Pokok Saja</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Angsuran bulan ini</div>
                                    <div className="text-lg font-black mt-2 text-foreground tracking-tight">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(installmentAmount)}
                                    </div>
                                </div>
                            </label>

                            <label className={`relative flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${amount === minBelanja ? 'border-orange-500 bg-orange-500/10 shadow-md ring-4 ring-orange-500/20' : 'border-border bg-background hover:border-orange-400 hover:bg-orange-500/5'}`}>
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-input bg-background mt-0.5">
                                    {amount === minBelanja && <div className="h-2.5 w-2.5 rounded-full bg-orange-600" />}
                                </div>
                                <input
                                    type="radio"
                                    name="payment_option"
                                    checked={amount === minBelanja}
                                    onChange={() => setAmount(minBelanja)}
                                    className="sr-only"
                                />
                                <div className="flex-1">
                                    <div className={`font-bold ${amount === minBelanja ? 'text-orange-600 dark:text-orange-400' : 'text-foreground'}`}>Keringanan (50%)</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Batas minimal bulan ini</div>
                                    <div className="text-lg font-black mt-2 text-foreground tracking-tight">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(minBelanja)}
                                    </div>
                                </div>
                            </label>
                        </div>
                    )}
                </div>
            </div>

            <Button onClick={handlePay} className="w-full h-14 text-lg font-bold shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all transform hover:scale-[1.02] active:scale-95" disabled={loading}>
                {loading ? 'Menghubungkan ke Midtrans...' : '💳 Lanjutkan ke Pembayaran'}
            </Button>
        </div>
    );
}

interface Installment {
    id: number;
    order_id: number;
    productName: string;
    contractNumber: string;
    remainingDebt: number;
    status: string;
    dueDate: string;
    daysUntilDue: number | null;
    dueStatus: 'safe' | 'warning' | 'overdue' | null;
    installment_amount: number;
    history: {
        id: number;
        installmentKe: number;
        date: string;
        method: string;
        amount: number;
        status: string;
        admin_notes: string;
    }[];
    tunggakan: number;
    tunggakan_months: number;
    totalBillThisMonth: number;
    activePayments?: {
        id: number;
        amount: number;
        type: string;
        snap_token?: string;
    }[];
}

export default function InstallmentIndex({ auth, installments }: { auth: any, installments: Installment[] }) {
    const [selectedPaymentItem, setSelectedPaymentItem] = useState<Installment | null>(null);

    // Calculate total active payments across all installments
    const totalActivePaymentsCount = installments.reduce((acc, curr) => acc + (curr.activePayments?.length || 0), 0);
    const activeInstallmentsWithPending = installments.filter(i => (i.activePayments?.length || 0) > 0);

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <Head title="Cek Status Angsuran" />
            <Header user={auth?.user} />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Cek Status Angsuran Anda</h1>
                        <p className="mt-2 text-muted-foreground">Pantau sisa tagihan dan riwayat pembayaran cicilan Anda di sini.</p>
                    </div>

                    {/* Search Bar (Optional decoration) */}
                    <div className="flex gap-2 max-w-lg mx-auto mb-8">
                        <input
                            type="text"
                            placeholder="Cari Barang atau Kontrak..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Button variant="secondary">Cari</Button>
                    </div>

                    <div className="space-y-6">
                        {/* User Greeting Card */}
                        <div className="bg-card p-4 rounded-lg border shadow-sm flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {auth.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">Halo, {auth.user.name}</h3>
                                <p className="text-sm text-muted-foreground">{auth.user.email}</p>
                            </div>
                        </div>

                        {installments.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg border">
                                <p className="text-muted-foreground">Anda belum memiliki tagihan angsuran aktif.</p>
                            </div>
                        )}

                        {totalActivePaymentsCount > 0 && (
                            <Alert className="bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300 shadow-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200 rounded-bl-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
                                <AlertCircle className="h-6 w-6 !text-amber-600 dark:!text-amber-400" />
                                <AlertTitle className="font-bold text-amber-800 dark:text-amber-300 text-lg mb-2">Tagihan Sedang Diproses</AlertTitle>
                                <AlertDescription className="text-amber-800/90 dark:text-amber-400/90">
                                    <p className="mb-4 text-sm leading-relaxed">
                                        Anda memiliki <strong>{totalActivePaymentsCount}</strong> transaksi Midtrans yang belum diselesaikan. Jika Anda belum mentransfer uang, silakan selesaikan pembayaran di channel bank yang Anda pilih.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {activeInstallmentsWithPending.map(inst => 
                                            inst.activePayments?.map(payment => (
                                                <Button 
                                                    key={payment.id} 
                                                    size="sm" 
                                                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm transition-all hover:shadow"
                                                    onClick={() => {
                                                        if (payment.snap_token && window.snap) {
                                                            window.snap.pay(payment.snap_token, {
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
                                                        } else {
                                                            alert('Mohon maaf, sesi pembayaran ini sudah kadaluarsa. Silakan klik "Bayar Sekarang" pada angsuran terkait untuk membuat tagihan baru.');
                                                        }
                                                    }}
                                                >
                                                    <CreditCard className="w-4 h-4 mr-2" />
                                                    Lihat Tagihan {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(payment.amount)}
                                                </Button>
                                            ))
                                        )}
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* LIST OF INSTALLMENTS */}
                        {installments.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <CardHeader className="bg-muted/50 pb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                {item.productName}
                                                {item.status === 'paid_off' ? (
                                                    <Badge className="bg-green-600 hover:bg-green-700">Lunas</Badge>
                                                ) : (
                                                    <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">Belum Lunas</Badge>
                                                )}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                No. Kontrak: {item.contractNumber}
                                            </CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Sisa Tagihan</p>
                                            <p className="text-2xl font-bold text-foreground">
                                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.remainingDebt)}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-0">
                                    {/* Main Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b">
                                        <div className="flex items-start gap-3">
                                            <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Barang</p>
                                                <p className="text-gray-600 dark:text-gray-300">{item.productName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium">Jatuh Tempo Berikutnya</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-semibold ${
                                                        item.status === 'paid_off' ? 'text-green-600' :
                                                        item.dueStatus === 'overdue' ? 'text-red-600' :
                                                        item.dueStatus === 'warning' ? 'text-orange-500' :
                                                        'text-gray-700'
                                                    }`}>
                                                        {item.dueDate}
                                                    </span>
                                                    {item.status !== 'paid_off' && item.dueStatus === 'overdue' && (
                                                        <Badge variant="outline" className="text-xs border-red-300 bg-red-50 text-red-700">
                                                            <AlertCircle className="w-3 h-3 mr-1" />
                                                            Sudah Jatuh Tempo!
                                                        </Badge>
                                                    )}
                                                    {item.status !== 'paid_off' && item.dueStatus === 'warning' && (
                                                        <Badge variant="outline" className="text-xs border-orange-300 bg-orange-50 text-orange-700">
                                                            <AlertCircle className="w-3 h-3 mr-1" />
                                                            Segera Bayar ({item.daysUntilDue} hari lagi)
                                                        </Badge>
                                                    )}
                                                    {item.status !== 'paid_off' && item.dueStatus === 'safe' && (
                                                        <Badge variant="outline" className="text-xs border-green-300 bg-green-50 text-green-700">
                                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                                            {item.daysUntilDue} hari lagi
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Collapsible History Table */}
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="history" className="border-b-0">
                                            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                                                <span className="font-medium text-foreground">Lihat Riwayat Pembayaran ({item.history.length})</span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="overflow-x-auto">
                                                    <Table>
                                                        <TableHeader className="bg-muted/30">
                                                            <TableRow>
                                                                <TableHead className="w-[100px] pl-6">Angsuran Ke</TableHead>
                                                                <TableHead>Tanggal Bayar</TableHead>
                                                                <TableHead>Metode</TableHead>
                                                                <TableHead>Jumlah</TableHead>
                                                                <TableHead>Status</TableHead>
                                                                <TableHead className="text-right pr-6">Bukti</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {item.history.map((hist) => (
                                                                <TableRow key={hist.id}>
                                                                    <TableCell className="pl-6 font-medium">{hist.installmentKe}</TableCell>
                                                                    <TableCell>{hist.date}</TableCell>
                                                                    <TableCell>{hist.method}</TableCell>
                                                                    <TableCell>
                                                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(hist.amount)}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 flex w-fit items-center gap-1">
                                                                            <CheckCircle2 className="w-3 h-3" />
                                                                            {hist.status}
                                                                        </Badge>
                                                                    </TableCell>
                                                                    <TableCell className="text-right pr-6">
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                                                                            <Download className="h-4 w-4" />
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>

                                {item.status !== 'paid_off' && (
                                    <CardFooter className="bg-blue-50/50 dark:bg-blue-900/10 p-4 flex justify-between items-center">
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            Ingin membayar angsuran bulan ini?
                                        </p>
                                        <Button size="sm" onClick={() => setSelectedPaymentItem(item)}>Bayar Sekarang</Button>
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* LOGIC MODAL PEMBAYARAN */}
                <Dialog open={!!selectedPaymentItem} onOpenChange={(open) => !open && setSelectedPaymentItem(null)}>
                    <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-0 shadow-2xl">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white text-center">
                            <DialogTitle className="text-2xl font-bold mb-2 text-white">Pembayaran Angsuran</DialogTitle>
                            <DialogDescription className="text-blue-100 text-base">
                                Selesaikan pembayaran untuk <strong>{selectedPaymentItem?.productName}</strong>
                            </DialogDescription>
                        </div>
                        
                        <div className="p-6 bg-background max-h-[70vh] overflow-y-auto">
                            {selectedPaymentItem && (
                                <div className="mb-6 pb-6 border-b border-dashed border-gray-300 dark:border-gray-800">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-500">Nomor Kontrak</span>
                                        <span className="font-medium">{selectedPaymentItem.contractNumber}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Sisa Tagihan Total</span>
                                        <span className="font-bold text-foreground">
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(selectedPaymentItem.remainingDebt)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {selectedPaymentItem && (
                                <MidtransButton
                                    orderId={selectedPaymentItem.order_id}
                                    installmentAmount={selectedPaymentItem.installment_amount}
                                    tunggakan={selectedPaymentItem.tunggakan}
                                    tunggakanMonths={selectedPaymentItem.tunggakan_months}
                                    onSuccess={() => setSelectedPaymentItem(null)}
                                    onPayStart={() => setSelectedPaymentItem(null)}
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

            </main>
            <Footer />
        </div>
    );
}

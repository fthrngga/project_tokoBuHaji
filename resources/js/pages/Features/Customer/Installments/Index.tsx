import { Head, useForm } from '@inertiajs/react'; // Added useForm
import AppLayout from '@/layouts/app-layout';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Calendar, Package, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

// Sub-component for File Upload (Copied/Adapted from Order/Show)
function FileUploadForm({ orderId, label, showMonthsInput = false, installmentAmount = 0, tunggakan = 0, onSuccess }: { orderId: number, label?: string, showMonthsInput?: boolean, installmentAmount?: number, tunggakan?: number, onSuccess?: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm<{ proof_of_payment: File | null; amount: number; months_paid: number }>({
        proof_of_payment: null,
        amount: installmentAmount + tunggakan,
        months_paid: 1, // keeping this default for backend compatibility
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.payment.proof', orderId), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    const minBelanja = installmentAmount / 2;

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {showMonthsInput && (
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded border">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pilih Nominal Pembayaran:</h4>
                    <div className="space-y-3">
                        {tunggakan > 0 && (
                            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-900 border-red-200">
                                <input
                                    type="radio"
                                    name="payment_option"
                                    checked={data.amount === installmentAmount + tunggakan}
                                    onChange={() => setData('amount', installmentAmount + tunggakan)}
                                    className="mt-1"
                                />
                                <div>
                                    <div className="font-semibold text-red-700">Tagihan Penuh (+ Tunggakan)</div>
                                    <div className="text-xs text-gray-500">Pokok + Sisa bulan lalu</div>
                                    <div className="text-sm font-bold mt-1 text-gray-800 dark:text-gray-200">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(installmentAmount + tunggakan)}
                                    </div>
                                </div>
                            </label>
                        )}
                        <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <input
                                type="radio"
                                name="payment_option"
                                checked={data.amount === installmentAmount}
                                onChange={() => setData('amount', installmentAmount)}
                                className="mt-1"
                            />
                            <div>
                                <div className="font-semibold text-blue-700">Angsuran Pokok Saja</div>
                                <div className="text-xs text-gray-500">Angsuran bulan ini</div>
                                <div className="text-sm font-bold mt-1 text-gray-800 dark:text-gray-200">
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(installmentAmount)}
                                </div>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <input
                                type="radio"
                                name="payment_option"
                                checked={data.amount === minBelanja}
                                onChange={() => setData('amount', minBelanja)}
                                className="mt-1"
                            />
                            <div>
                                <div className="font-semibold text-orange-600">Bayar Setengah (Keringanan)</div>
                                <div className="text-xs text-gray-500">Batas minimal pembayaran</div>
                                <div className="text-sm font-bold mt-1 text-gray-800 dark:text-gray-200">
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(minBelanja)}
                                </div>
                            </div>
                        </label>
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
                    className="bg-white dark:bg-gray-900"
                />
                {errors.proof_of_payment && <p className="text-red-500 text-xs">{errors.proof_of_payment}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={processing || !data.proof_of_payment}>
                {processing ? 'Mengupload...' : (label || 'Upload Bukti Pembayaran')}
            </Button>
        </form>
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
    totalBillThisMonth: number;
}

export default function InstallmentIndex({ auth, installments }: { auth: any, installments: Installment[] }) {
    const [selectedPaymentItem, setSelectedPaymentItem] = useState<Installment | null>(null);

    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
            <Head title="Cek Status Angsuran" />
            <Header user={auth?.user} />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cek Status Angsuran Anda</h1>
                        <p className="mt-2 text-gray-500">Pantau sisa tagihan dan riwayat pembayaran cicilan Anda di sini.</p>
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
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border shadow-sm flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {auth.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold">Halo, {auth.user.name}</h3>
                                <p className="text-sm text-gray-500">{auth.user.email}</p>
                            </div>
                        </div>

                        {installments.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg border">
                                <p className="text-muted-foreground">Anda belum memiliki tagihan angsuran aktif.</p>
                            </div>
                        )}

                        {/* LIST OF INSTALLMENTS */}
                        {installments.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <CardHeader className="bg-gray-50/50 dark:bg-gray-800/50 pb-4">
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
                                            <p className="text-sm text-gray-500">Sisa Tagihan</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
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
                                                    <span className={`font-semibold ${item.status === 'paid_off' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {item.dueDate}
                                                    </span>
                                                    {item.status !== 'paid_off' && (
                                                        <Badge variant="outline" className="text-xs border-red-200 bg-red-50 text-red-700">
                                                            <AlertCircle className="w-3 h-3 mr-1" />
                                                            Segera Bayar
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Collapsible History Table */}
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="history" className="border-b-0">
                                            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Lihat Riwayat Pembayaran ({item.history.length})</span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="overflow-x-auto">
                                                    <Table>
                                                        <TableHeader className="bg-gray-50 dark:bg-gray-900">
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
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Bukti Pembayaran</DialogTitle>
                            <DialogDescription>
                                Upload bukti transfer untuk angsuran <strong>{selectedPaymentItem?.productName}</strong>.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedPaymentItem && (
                            <FileUploadForm
                                orderId={selectedPaymentItem.order_id}
                                label="Upload Bukti Transfer"
                                showMonthsInput={true}
                                installmentAmount={selectedPaymentItem.installment_amount}
                                tunggakan={selectedPaymentItem.tunggakan}
                                onSuccess={() => setSelectedPaymentItem(null)}
                            />
                        )}
                    </DialogContent>
                </Dialog>

            </main>
            <Footer />
        </div>
    );
}

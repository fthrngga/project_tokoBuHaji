
import { Head, usePage, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Printer, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from 'react';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const breadcrumbs = [
    {
        title: 'Finance',
        href: '#',
    },
    {
        title: 'Input Pembayaran Angsuran',
        href: '#',
    },
];

interface Customer {
    id: number; // Payment ID
    customer_name: string;
    customer_address: string;
    total_installments: number;
    current_installment: number;
    remaining_months: number;
    installment_amount: number;
    product_name?: string;
    tunggakan?: number;
}

// Add History Interface
interface HistoryLog {
    id: number;
    paid_at: string; // H:i
    customer_name: string;
    installment_number: number;
    amount: number;
    notes: string;
}

export default function InstallmentPayment({ customers, history = [], filters = { date: '' } }: { customers: Customer[], history?: HistoryLog[], filters?: { date: string } }) {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Ensure filter date fallsback to today if empty
    const defaultDate = filters.date || new Date().toISOString().split('T')[0];

    // Initialize form with the current Filter Date if possible, or today
    const { data, setData, post, processing, errors, reset } = useForm({
        payment_id: '',
        amount: '',
        payment_date: defaultDate,
        payment_method: 'tunai',
        notes: '',
        months_paid: 1,
    });

    const handleCustomerChange = (val: string) => {
        const customerId = parseInt(val);
        const customer = customers.find(c => c.id === customerId) || null;
        setSelectedCustomer(customer);

        // Auto-fill form data with Pokok + Tunggakan
        setData(prev => ({
            ...prev,
            payment_id: val,
            amount: customer ? (Number(customer.installment_amount) + Number(customer.tunggakan || 0)).toString() : '',
            notes: customer ? `Pembayaran Angsuran ke-${customer.current_installment}` : '',
            months_paid: 1,
        }));
    };

    const handleMonthsChange = (valStr: string) => {
        const val = parseInt(valStr);
        const months = isNaN(val) ? 1 : Math.max(1, val);
        setData(prev => {
            const baseAmount = selectedCustomer ? selectedCustomer.installment_amount : 0;
            const tunggakan = selectedCustomer ? (selectedCustomer.tunggakan || 0) : 0;
            
            // Calculate new default total based on months
            const newAmount = (baseAmount * months) + tunggakan;

            let newNote = '';
            if (selectedCustomer) {
                const start = selectedCustomer.current_installment;
                const end = start + months - 1;
                newNote = months > 1
                    ? `Pembayaran Angsuran ke-${start} s/d ${end}`
                    : `Pembayaran Angsuran ke-${start}`;
            }

            return {
                ...prev,
                months_paid: months,
                amount: newAmount > 0 ? newAmount.toString() : '',
                notes: newNote
            };
        });
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Strip non-numeric chars for raw data
        const numericValue = e.target.value.replace(/\D/g, '');
        setData('amount', numericValue);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('finance.payment.store-installment'), {
            onSuccess: () => {
                reset();
                setSelectedCustomer(null);
                // Force a visit to current page to refresh history if back() doesn't work as expected
                // But typically back() is enough.
            },
        });
    };

    const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(route('finance.payment.manual'), { date: e.target.value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Angsuran" />
            <div className="flex flex-col gap-8 p-4">

                {/* FORM INPUT SECTION */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* LEFT: FORM INPUT */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Pembayaran</CardTitle>
                            <CardDescription>Pastikan data pelanggan dan nominal sesuai.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Pilih Pelanggan (Kredit Aktif)</Label>
                                    <Select
                                        value={data.payment_id}
                                        onValueChange={handleCustomerChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Cari pelanggan..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.length === 0 ? (
                                                <SelectItem value="empty" disabled>Tidak ada kredit aktif</SelectItem>
                                            ) : (
                                                customers.map((c) => (
                                                    <SelectItem key={c.id} value={c.id.toString()}>
                                                        {c.customer_name} {c.customer_address ? `(${c.customer_address})` : ''}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.payment_id && <p className="text-red-500 text-xs">{errors.payment_id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Jml Bulan</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={data.months_paid ?? 1}
                                            onChange={e => handleMonthsChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Total (Rp)</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium.">Rp</span>
                                            <Input
                                                type="text"
                                                value={data.amount ? new Intl.NumberFormat('id-ID').format(Number(data.amount)) : ''}
                                                onChange={handleAmountChange}
                                                className="pl-9 text-lg font-bold"
                                            />
                                        </div>
                                        {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tanggal</Label>
                                        <Input
                                            type="date"
                                            value={data.payment_date ?? ''}
                                            onChange={e => setData('payment_date', e.target.value)}
                                        />
                                        {errors.payment_date && <p className="text-red-500 text-xs">{errors.payment_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Metode</Label>
                                        <Select value={data.payment_method} onValueChange={(val) => setData('payment_method', val)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tunai">Tunai</SelectItem>
                                                <SelectItem value="transfer">Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Catatan (Opsional)</Label>
                                    <Input
                                        placeholder="Contoh: Titip tetangga, dsb."
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={processing || !selectedCustomer}>
                                    {processing ? 'Simpan' : 'Simpan'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* RIGHT COLUMN: DYNAMIC CONTENT */}
                    <div className="hidden md:block space-y-6">
                        {selectedCustomer ? (
                            <Card className="border-border bg-secondary/30">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Detail Pelanggan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-foreground">
                                    <div>
                                        <p className="text-xs text-primary uppercase font-semibold">Nama Pelanggan</p>
                                        <p className="text-lg font-medium">{selectedCustomer.customer_name}</p>
                                        <p className="text-sm opacity-80">{selectedCustomer.customer_address}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-primary uppercase font-semibold">Sisa Tenor</p>
                                            <p className="text-2xl font-bold">{selectedCustomer.remaining_months} <span className="text-sm font-normal">Bulan</span></p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-primary uppercase font-semibold">Angsuran / Bln</p>
                                            <p className="text-lg font-medium text-foreground">
                                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(selectedCustomer.installment_amount)}
                                            </p>
                                            {(selectedCustomer.tunggakan || 0) > 0 && (
                                                <>
                                                    <p className="text-xs mt-2 text-red-600 uppercase font-semibold">Tunggakan</p>
                                                    <p className="text-sm font-bold text-red-600">
                                                        + {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(selectedCustomer.tunggakan!)}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-border">
                                        <p className="text-xs text-primary uppercase font-semibold">Status Pembayaran</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            <span className="font-medium text-foreground">Kredit Aktif (Lancar)</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Alert className="bg-secondary/30 border-border text-foreground">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <AlertTitle>Tips Admin</AlertTitle>
                                <AlertDescription className="mt-2 text-muted-foreground">
                                    Pilih pelanggan dari dropdown di sebelah kiri untuk melihat detail tagihan.
                                    Pastikan uang tunai sudah diterima sebelum menyimpan data.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* FULL WIDTH TABLE */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Riwayat Pembayaran Harian</CardTitle>
                                    <CardDescription>Daftar pembayaran yang masuk pada tanggal: <strong>{new Date(defaultDate).toLocaleDateString('id-ID', { dateStyle: 'full' })}</strong></CardDescription>
                                </div>
                                <div>
                                    <Input
                                        type="date"
                                        className="w-40"
                                        value={defaultDate}
                                        onChange={handleDateFilterChange}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Jam</TableHead>
                                            <TableHead>Pelanggan</TableHead>
                                            <TableHead>Angsuran Ke</TableHead>
                                            <TableHead>Jumlah Bayar</TableHead>
                                            <TableHead>Keterangan</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {history.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                                    Tidak ada pembayaran pada tanggal ini.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            history.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell>{log.paid_at}</TableCell>
                                                    <TableCell className="font-medium">{log.customer_name}</TableCell>
                                                    <TableCell>
                                                        #{log.installment_number}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(log.amount)}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">{log.notes || '-'}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                                                            <Printer className="w-4 h-4 mr-1" /> Cetak
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

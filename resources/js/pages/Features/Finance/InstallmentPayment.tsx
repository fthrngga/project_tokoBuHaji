
import { Head, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Printer } from "lucide-react";
import { useState, useEffect } from 'react';
import { route } from 'ziggy-js';

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
}

export default function InstallmentPayment({ customers }: { customers: Customer[] }) {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Form handling
    const { data, setData, post, processing, errors, reset } = useForm({
        payment_id: '',
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'tunai',
        notes: '',
    });

    const handleCustomerChange = (val: string) => {
        const customerId = parseInt(val);
        const customer = customers.find(c => c.id === customerId) || null;
        setSelectedCustomer(customer);

        // Auto-fill form data
        setData(prev => ({
            ...prev,
            payment_id: val,
            amount: customer ? customer.installment_amount.toString() : '',
            notes: customer ? `Pembayaran Angsuran ke-${customer.current_installment}` : ''
        }));
    };

    // Auto-calculate amount when months change
    const handleMonthsChange = (months: number) => {
        // Prevent NaN or undefined effectively.
        // If user input is empty, parseInt might return NaN.
        // We force it to be at least 1, or if it's NaN we treat it as 1.
        const val = isNaN(months) ? 1 : Math.max(1, months);

        if (selectedCustomer) {
            const total = selectedCustomer.installment_amount * val;
            setData(prev => ({
                ...prev,
                months_paid: val,
                amount: total.toString(),
                notes: `Pembayaran Angsuran ke-${selectedCustomer.current_installment} s/d ${selectedCustomer.current_installment + val - 1}`
            }));
        } else {
            setData(prev => ({
                ...prev,
                months_paid: val
            }));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('finance.payment.store-installment'), {
            onSuccess: () => {
                reset(); // This resets to initial values (payment_id='', months_paid=1)
                setSelectedCustomer(null);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Pembayaran Angsuran" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow">
                    <h1 className="text-2xl font-bold tracking-tight">Pembayaran Angsuran</h1>
                    <p className="text-muted-foreground">
                        Input pembayaran angsuran manual pelanggan.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* LEft: Form Input Tagihan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Input Tagihan</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <form onSubmit={submit} id="installment-form">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label>Nama Pelanggan</Label>
                                        <Select onValueChange={handleCustomerChange} value={data.payment_id}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Pelanggan" />
                                            </SelectTrigger>
                                            <SelectContent max-h="200px">
                                                {customers.length > 0 ? (
                                                    customers.map(c => (
                                                        <SelectItem key={c.id} value={c.id.toString()}>
                                                            {c.customer_name} (ID: {c.id})
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="none" disabled>Tidak ada kredit aktif</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {errors.payment_id && <p className="text-sm text-red-500">{errors.payment_id}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Jumlah Bulan</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={data.months_paid}
                                            onChange={e => handleMonthsChange(parseInt(e.target.value) || 1)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Total Pembayaran</Label>
                                        <Input
                                            placeholder="Rp 0"
                                            type="number"
                                            value={data.amount}
                                            onChange={e => setData('amount', e.target.value)}
                                        />
                                        {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label>Tanggal Bayar</Label>
                                        <Input
                                            type="date"
                                            value={data.payment_date}
                                            onChange={e => setData('payment_date', e.target.value)}
                                        />
                                        {errors.payment_date && <p className="text-sm text-red-500">{errors.payment_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Metode Pembayaran</Label>
                                        <Select
                                            value={data.payment_method}
                                            onValueChange={val => setData('payment_method', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Metode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tunai">Tunai</SelectItem>
                                                <SelectItem value="transfer">Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.payment_method && <p className="text-sm text-red-500">{errors.payment_method}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Catatan</Label>
                                    <Textarea
                                        placeholder="Tambahkan catatan pembayaran..."
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-end gap-2">
                            <Button variant="outline" type="button" onClick={() => reset()}>Cancel</Button>
                            <Button type="submit" form="installment-form" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Right: Info Pelanggan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Info Pelanggan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {selectedCustomer ? (
                                <>
                                    <div className="space-y-1">
                                        <Label className="text-muted-foreground">Nama:</Label>
                                        <p className="font-medium text-lg">{selectedCustomer.customer_name}</p>
                                    </div>
                                    <div className="space-y-1 border-t pt-2">
                                        <Label className="text-muted-foreground">Alamat:</Label>
                                        <p className="font-medium">{selectedCustomer.customer_address}</p>
                                    </div>
                                    <div className="space-y-1 border-t pt-2">
                                        <Label className="text-muted-foreground">Total Angsuran:</Label>
                                        <p className="font-medium">{selectedCustomer.total_installments} Bulan</p>
                                    </div>
                                    <div className="space-y-1 border-t pt-2">
                                        <Label className="text-muted-foreground">Angsuran Saat Ini:</Label>
                                        <p className="font-medium">Ke-{selectedCustomer.current_installment}</p>
                                    </div>
                                    <div className="space-y-1 border-t pt-2">
                                        <Label className="text-muted-foreground">Nominal Angsuran:</Label>
                                        <p className="font-medium">
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(selectedCustomer.installment_amount)}
                                        </p>
                                    </div>
                                    <div className="space-y-1 border-t pt-2">
                                        <Label className="text-muted-foreground">Sisa Tagihan:</Label>
                                        <p className="font-medium text-red-600">{selectedCustomer.remaining_months} Bulan Lagi</p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground italic">
                                    <p>Pilih pelanggan untuk melihat detail.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom: Riwayat Pembayaran (Coming soon, for now showing placeholder or we can fetch real history if needed) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground text-center py-8">
                            Fitur riwayat detail per pelanggan akan muncul di sini setelah update berikutnya.
                            <br />
                            (Saat ini data tersimpan di Laporan Keuangan).
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

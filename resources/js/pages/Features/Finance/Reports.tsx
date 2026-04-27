import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input"; // Placeholder for specific date picker if needed
import { Download, Calendar as CalendarIcon, ArrowUpCircle, ArrowDownCircle, ArrowRightCircle, Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { route } from 'ziggy-js';
import { format } from "date-fns";

const breadcrumbs = [
    {
        title: 'Finance',
        href: '#',
    },
    {
        title: 'Laporan Keuangan',
        href: '#',
    },
];

interface Transaction {
    id: number;
    date: string;
    desc: string;
    category: string;
    type: string;
    amount: number;
    original_type: string;
}

interface Summary {
    income: number;
    expense: number;
    profit: number;
}

export default function Reports({ summary = { income: 0, expense: 0, profit: 0 }, transactions = [], filters = {} }: { summary?: Summary, transactions?: Transaction[], filters?: any }) {
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    
    const { data, setData, post, processing, reset, errors } = useForm({
        transaction_date: format(new Date(), 'yyyy-MM-dd'),
        category: 'operational',
        amount: '',
        payment_method: 'cash',
        description: '',
    });

    const submitExpense = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('finance.expenses.store'), {
            onSuccess: () => {
                setIsExpenseModalOpen(false);
                reset();
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Keuangan" />
            <div className="flex flex-col gap-6 p-4">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Laporan Keuangan</h1>
                        <p className="text-muted-foreground">Ringkasan pemasukan, pengeluaran, dan laba bersih.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button 
                            className="bg-red-600 hover:bg-red-700 text-white" 
                            onClick={() => setIsExpenseModalOpen(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Catat Pengeluaran
                        </Button>
                        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Bulan Ini</span>
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Kategori Transaksi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="installment">Cicilan</SelectItem>
                                <SelectItem value="restock">Restock</SelectItem>
                                <SelectItem value="operational">Operasional</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export PDF
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
                            <ArrowUpCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(summary.income)}
                            </div>
                            <p className="text-xs text-muted-foreground">Seluruh jenis pemasukan (termasuk DP & Cicilan)</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                            <ArrowDownCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(summary.expense)}
                            </div>
                            <p className="text-xs text-muted-foreground">Gaji karyawan, operasional, dan lain-lain</p>
                        </CardContent>
                    </Card>
                    <Card className={summary.profit >= 0 ? 'border-green-200' : 'border-red-200'}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Laba Bersih</CardTitle>
                            <ArrowRightCircle className={`h-4 w-4 ${summary.profit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${summary.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(summary.profit)}
                            </div>
                            <p className="text-xs text-muted-foreground">Pemasukan dikurangi seluruh pengeluaran</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Rincian Transaksi</CardTitle>
                        <CardDescription>Daftar lengkap transaksi pada periode ini.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Keterangan</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Tipe</TableHead>
                                    <TableHead className="text-right">Nominal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            Belum ada log transaksi yang tercatat.
                                        </TableCell>
                                    </TableRow>
                                ) : transactions.map((item, i) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell className="font-medium">{item.desc}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.original_type === 'income' ? 'default' : 'destructive'} className={item.original_type === 'income' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : 'bg-red-100 text-red-800 hover:bg-red-100 border-none'}>
                                                {item.original_type === 'income' ? '↑ Masuk' : '↓ Keluar'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={`text-right font-bold ${item.original_type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Expense Modal */}
            <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={submitExpense}>
                        <DialogHeader>
                            <DialogTitle>Catat Pengeluaran Baru</DialogTitle>
                            <DialogDescription>
                                Masukkan detail pengeluaran untuk gaji, operasional, atau restock.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">Tanggal</Label>
                                <Input 
                                    id="date" 
                                    type="date" 
                                    value={data.transaction_date}
                                    onChange={(e) => setData('transaction_date', e.target.value)}
                                    required
                                />
                                {errors.transaction_date && <span className="text-sm text-red-500">{errors.transaction_date}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Kategori Pengeluaran</Label>
                                <Select value={data.category} onValueChange={(val) => setData('category', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="operational">Operasional Toko (Listrik, Air, dll)</SelectItem>
                                        <SelectItem value="salary">Gaji Karyawan</SelectItem>
                                        <SelectItem value="other">Lain-lain</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Nominal (Rp)</Label>
                                <Input 
                                    id="amount" 
                                    type="number" 
                                    min="0"
                                    placeholder="Contoh: 500000"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    required
                                />
                                {errors.amount && <span className="text-sm text-red-500">{errors.amount}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="payment_method">Metode Pembayaran</Label>
                                <Select value={data.payment_method} onValueChange={(val) => setData('payment_method', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Metode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Tunai / Cash</SelectItem>
                                        <SelectItem value="transfer">Transfer Bank</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.payment_method && <span className="text-sm text-red-500">{errors.payment_method}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Keterangan</Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Contoh: Pembayaran tagihan listrik bulan ini"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsExpenseModalOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-red-600 hover:bg-red-700 text-white">
                                {processing ? 'Menyimpan...' : 'Simpan Pengeluaran'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

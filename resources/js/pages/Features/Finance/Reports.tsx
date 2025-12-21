import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input"; // Placeholder for specific date picker if needed
import { Download, Calendar as CalendarIcon, ArrowUpCircle, ArrowDownCircle, ArrowRightCircle, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export default function Reports() {
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
                        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white dark:bg-gray-800">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">01 Mei - 31 Mei</span>
                            {/* In real implement, use DateRangePicker */}
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Kategori Transaksi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="cicilan">Cicilan</SelectItem>
                                <SelectItem value="restock">Restock</SelectItem>
                                <SelectItem value="operasional">Operasional</SelectItem>
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
                            <div className="text-2xl font-bold text-green-600">IDR 15.000.000</div>
                            <p className="text-xs text-muted-foreground">+20.1% dari bulan lalu</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                            <ArrowDownCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">IDR 8.500.000</div>
                            <p className="text-xs text-muted-foreground">+4.5% dari bulan lalu</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Laba Bersih</CardTitle>
                            <ArrowRightCircle className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">IDR 6.500.000</div>
                            <p className="text-xs text-muted-foreground">+12.2% margin keuntungan</p>
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
                                {/* Mock Data */}
                                {[
                                    { date: '01 Mei', desc: 'Cicilan Daryono', cat: 'Cicilan', type: 'Masuk', amount: 'IDR 320.000', color: 'text-green-600' },
                                    { date: '03 Mei', desc: 'Beli Stok TV LED', cat: 'Restock', type: 'Keluar', amount: 'IDR 5.000.000', color: 'text-red-600' },
                                    { date: '05 Mei', desc: 'Gaji Karyawan', cat: 'Operasional', type: 'Keluar', amount: 'IDR 1.500.000', color: 'text-red-600' },
                                    { date: '07 Mei', desc: 'Cicilan Bu Siti', cat: 'Cicilan', type: 'Masuk', amount: 'IDR 500.000', color: 'text-green-600' },
                                    { date: '10 Mei', desc: 'Penjualan Tunai Kulkas', cat: 'Penjualan', type: 'Masuk', amount: 'IDR 2.500.000', color: 'text-green-600' },
                                ].map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell className="font-medium">{item.desc}</TableCell>
                                        <TableCell>{item.cat}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.type === 'Masuk' ? 'default' : 'destructive'} className={item.type === 'Masuk' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : 'bg-red-100 text-red-800 hover:bg-red-100 border-none'}>
                                                {item.type === 'Masuk' ? '↑ Masuk' : '↓ Keluar'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={`text-right font-bold ${item.color}`}>
                                            {item.amount}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

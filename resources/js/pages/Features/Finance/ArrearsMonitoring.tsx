import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from 'react';
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { route } from 'ziggy-js';

const breadcrumbs = [
    {
        title: 'Finance',
        href: '#',
    },
    {
        title: 'Daftar Tunggakan & Penagihan',
        href: '#',
    },
];

interface Credit {
    id: number;
    order_id: number;
    customer_id: number;
    payment_method: string;
    status: string;
    down_payment: number;
    installment_amount: number;
    duration_months: number;
    installments_paid?: number;
    created_at: string;
    customer: {
        phone_number?: string;
        user: {
            name: string;
        }
    };
    order: {
        total_amount: number;
        address_detail: string;
        province: string;
        city: string;
        items: {
            product: {
                name: string;
            }
        }[];
    };
    tunggakan_amount?: number;
    tunggakan_months?: number;
    is_kritis?: boolean;
}

interface Props {
    credits: Credit[];
    pageParams: {
        title: string;
    };
}

const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(value));
};

export default function ArrearsMonitoring({ credits }: Props) {
    const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [filterTab, setFilterTab] = useState<'semua' | 'lewat_1' | 'lewat_3'>('semua');

    const handleValuesDetail = (credit: Credit) => {
        setSelectedCredit(credit);
        setIsDetailOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Tunggakan & Penagihan" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow border-red-200">
                    <h1 className="text-2xl font-bold tracking-tight text-red-800">Daftar Tunggakan & Penagihan</h1>
                    <p className="text-muted-foreground text-red-600">
                        Kelola pelanggan yang mengalami kendala pembayaran angsuran.
                    </p>
                </div>

                {/* Filter Tabs matching Wireframe */}
                <div className="flex space-x-2 border-b overflow-x-auto pb-2">
                    <button
                        className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors whitespace-nowrap ${filterTab === 'semua'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        onClick={() => setFilterTab('semua')}
                    >
                        Semua
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors whitespace-nowrap ${filterTab === 'lewat_1'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        onClick={() => setFilterTab('lewat_1')}
                    >
                        Lewat &gt; 1 Bulan
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors whitespace-nowrap ${filterTab === 'lewat_3'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        onClick={() => setFilterTab('lewat_3')}
                    >
                        Lewat &ge; 3 Bulan (Siap Tarik)
                    </button>
                </div>

                <div className="rounded-xl border bg-card shadow overflow-hidden border-red-200">
                    <Table>
                        <TableHeader className="bg-red-50">
                            <TableRow>
                                <TableHead className="font-bold text-red-900">Pelanggan</TableHead>
                                <TableHead className="font-bold text-red-900">No. HP</TableHead>
                                <TableHead className="font-bold text-red-900">Masa Menunggak</TableHead>
                                <TableHead className="font-bold text-red-900">Nominal Tunggakan</TableHead>
                                <TableHead className="text-right font-bold text-red-900">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {credits.filter(c => {
                                if (filterTab === 'semua') return (c.tunggakan_months || 0) > 0;
                                if (filterTab === 'lewat_1') return (c.tunggakan_months || 0) > 1;
                                if (filterTab === 'lewat_3') return (c.tunggakan_months || 0) >= 3;
                                return true;
                            }).length > 0 ? credits.filter(c => {
                                if (filterTab === 'semua') return (c.tunggakan_months || 0) > 0;
                                if (filterTab === 'lewat_1') return (c.tunggakan_months || 0) > 1;
                                if (filterTab === 'lewat_3') return (c.tunggakan_months || 0) >= 3;
                                return true;
                            }).map((credit) => (
                                <TableRow key={credit.id}>
                                    <TableCell>
                                        <div className="font-medium">{credit.customer?.user?.name}</div>
                                        <div className="text-xs text-muted-foreground">Order #{credit.order_id}</div>
                                    </TableCell>
                                    <TableCell>{credit.customer?.phone_number || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive" className="font-bold">
                                            {credit.tunggakan_months} Bulan
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-bold text-red-600">
                                        {formatCurrency(credit.tunggakan_amount || 0)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleValuesDetail(credit)}>
                                                Detail
                                            </Button>
                                            <a 
                                                href={`https://wa.me/${(credit.customer?.phone_number || '').replace(/^0/, '62')}?text=Halo%20Bapak/Ibu%20${encodeURIComponent(credit.customer?.user?.name || '')},%20kami%20dari%20Toko%20Bu%20Haji%20menginformasikan%20bahwa%20Order%20%23${credit.order_id}%20Anda%20telah%20menunggak%20selama%20${credit.tunggakan_months}%20bulan%20dengan%20total%20${formatCurrency(credit.tunggakan_amount||0)}.%20Harap%20segera%20menyelesaikan%20pembayaran%20untuk%20menghindari%20penarikan%20barang.%20Terima%20kasih.`}
                                                target="_blank" 
                                                rel="noreferrer"
                                            >
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">Kirim WA</Button>
                                            </a>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        Tidak ada pelanggan dalam kategori tunggakan ini. Bagus!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Detail Modal */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[700px] bg-red-50/50">
                        <DialogHeader>
                            <DialogTitle>Detail Tunggakan Pelanggan</DialogTitle>
                            <DialogDescription>
                                Informasi lengkap terkait pesanan dan pembayaran.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedCredit && (
                            <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Kolom Kiri: Info Pelanggan & Pesanan */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold border-b pb-2">Informasi Pesanan</h3>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground block text-xs">Pelanggan</span>
                                                <span className="font-medium">{selectedCredit.customer?.user?.name}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground block text-xs">ID Order</span>
                                                <span className="font-medium">#{selectedCredit.order_id}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground block text-xs">Tanggal Order</span>
                                                <span className="font-medium">{format(new Date(selectedCredit.created_at), "d MMMM yyyy", { locale: id })}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground block text-xs">Total Harga Produk</span>
                                                <span className="font-medium text-lg text-primary">{formatCurrency(selectedCredit.order.total_amount)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kolom Kanan: Rincian Kredit */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold border-b pb-2">Rincian Kredit</h3>
                                        <div className="space-y-2 text-sm bg-red-100 p-3 rounded-lg border border-red-200">
                                            <div>
                                                <span className="text-muted-foreground block text-xs">Tagihan Per Bulan</span>
                                                <span className="font-medium">{formatCurrency(selectedCredit.installment_amount)}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground block text-xs">Progress Pembayaran</span>
                                                <span className="font-bold text-red-700">
                                                    {selectedCredit.installments_paid || 0} / {selectedCredit.duration_months} Bulan
                                                </span>
                                            </div>
                                            <div className="pt-2 mt-2 border-t border-red-300">
                                                <span className="text-muted-foreground block text-xs">Tunggakan Kritis</span>
                                                <span className="font-bold text-xl text-red-600 block">
                                                    {formatCurrency(selectedCredit.tunggakan_amount || 0)}
                                                </span>
                                                <span className="text-red-500 font-medium text-xs">
                                                    Menunggak selama {selectedCredit.tunggakan_months} Bulan
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Tutup</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </AppLayout>
    );
}

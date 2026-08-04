import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { route } from 'ziggy-js';
import {
    ArrowUpRight, Package, Warehouse, Wrench, Truck, ShieldAlert, FileText, Loader2, Info
} from 'lucide-react';

interface DefectiveProductData {
    id: number;
    product_id: number;
    product_variant_id: number | null;
    source_type: string;
    source_id: number;
    quantity: number;
    status: 'in_warehouse' | 'sent_to_agent' | 'repaired' | 'written_off';
    notes: string | null;
    created_at: string;
    product: { name: string; sku: string };
    variant: { options: any } | null;
}

interface Customer {
    id: number;
    name: string;
    phone_number: string;
}

interface Props {
    defectiveProducts: DefectiveProductData[];
    customers: Customer[];
}

const STATUS_CONFIG = {
    in_warehouse: {
        label: 'Di Gudang Isolasi',
        icon: Warehouse,
        badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        dot: 'bg-amber-500',
    },
    sent_to_agent: {
        label: 'Dikirim ke Agen',
        icon: Truck,
        badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        dot: 'bg-blue-500',
    },
    repaired: {
        label: 'Selesai Diperbaiki',
        icon: Wrench,
        badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        dot: 'bg-emerald-500',
    },
    written_off: {
        label: 'Dibuang (Rusak Total)',
        icon: ShieldAlert,
        badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
        dot: 'bg-red-500',
    },
    sold: {
        label: 'Terjual (Penarikan)',
        icon: Package,
        badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
        dot: 'bg-indigo-500',
    },
};

function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
    if (!cfg) return <Badge variant="outline">{status}</Badge>;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
}

export default function Index({ defectiveProducts, customers }: Props) {
    const [activeTab, setActiveTab] = useState<'return' | 'repossession'>('return');
    const [selectedItem, setSelectedItem] = useState<DefectiveProductData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);

    const { data, setData, put, processing, reset } = useForm({
        status: 'in_warehouse'
    });

    const sellForm = useForm({
        buyer_id: '',
        sale_type: 'cash',
        agreed_price: '',
        down_payment: '',
        installment_amount: '',
        duration_months: ''
    });

    const handleOpenDialog = (item: DefectiveProductData) => {
        setSelectedItem(item);
        setData('status', item.status);
        setIsDialogOpen(true);
    };

    const handleUpdateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem) return;
        put(route('admin.defective_products.update', selectedItem.id), {
            onSuccess: () => {
                setIsDialogOpen(false);
                reset();
            }
        });
    };

    const handleOpenSellDialog = (item: DefectiveProductData) => {
        setSelectedItem(item);
        sellForm.reset();
        setIsSellDialogOpen(true);
    };

    const handleSell = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedItem) return;
        sellForm.post(route('admin.defective_products.sell', selectedItem.id), {
            onSuccess: () => {
                setIsSellDialogOpen(false);
                sellForm.reset();
            }
        });
    };

    const returnsList = defectiveProducts.filter(item => !item.notes?.startsWith('[PENARIKAN]'));
    const repossessionsList = defectiveProducts.filter(item => item.notes?.startsWith('[PENARIKAN]'));

    const currentList = activeTab === 'return' ? returnsList : repossessionsList;

    const counts = {
        in_warehouse: currentList.filter(r => r.status === 'in_warehouse').length,
        sent_to_agent: currentList.filter(r => r.status === 'sent_to_agent').length,
        repaired: currentList.filter(r => r.status === 'repaired').length,
        written_off: currentList.filter(r => r.status === 'written_off').length,
        sold: currentList.filter(r => r.status === 'sold').length,
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Gudang Isolasi', href: route('admin.defective_products.index') }]}>
            <Head title="Gudang Isolasi - Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Gudang Isolasi (Defective)</h1>
                            <p className="text-sm text-muted-foreground">Kelola barang rusak hasil retur atau penarikan</p>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        { label: 'Di Gudang', count: counts.in_warehouse, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', show: true },
                        { label: 'Dikirim ke Agen', count: counts.sent_to_agent, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', show: activeTab === 'return' },
                        { label: 'Selesai Diperbaiki', count: counts.repaired, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', show: true },
                        { label: 'Dibuang/Rusak Total', count: counts.written_off, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', show: true },
                        { label: 'Terjual (Penarikan)', count: counts.sold, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', show: activeTab === 'repossession' },
                    ]
                    .filter(stat => stat.show)
                    .map((stat) => (
                        <div key={stat.label} className={`rounded-xl border p-4 ${stat.bg} ${stat.border} transition-all`}>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className={`mt-1 text-3xl font-bold ${stat.color}`}>{stat.count}</p>
                        </div>
                    ))}
                </div>

                {/* Custom Tabs Navigation (Pill Style) */}
                <div className="inline-flex h-10 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground self-start">
                    <button
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-medium transition-all ${activeTab === 'return' ? 'bg-background text-foreground shadow-sm' : 'hover:bg-muted-foreground/10 hover:text-foreground'}`}
                        onClick={() => setActiveTab('return')}
                    >
                        Barang Retur
                    </button>
                    <button
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-medium transition-all ${activeTab === 'repossession' ? 'bg-background text-foreground shadow-sm' : 'hover:bg-muted-foreground/10 hover:text-foreground'}`}
                        onClick={() => setActiveTab('repossession')}
                    >
                        Barang Tarikan
                    </button>
                </div>

                {/* Table Card */}
                <Card className="overflow-hidden border shadow-sm">
                    <div className="border-b bg-muted/20 px-6 py-4">
                        <h3 className="font-semibold">{activeTab === 'return' ? 'Inventaris Barang Retur' : 'Inventaris Barang Tarikan'}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Total {currentList.length} item tercatat</p>
                    </div>
                    <CardContent className="p-0">
                        {currentList.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-12 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <Warehouse className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Gudang Isolasi Kosong</p>
                                    <p className="text-sm text-muted-foreground mt-1">Belum ada barang bermasalah yang perlu dikelola.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20">
                                            <th className="px-6 py-3 text-left">Tercatat Tanggal</th>
                                            <th className="px-6 py-3 text-left">Produk & Varian</th>
                                            <th className="px-6 py-3 text-left">Asal Usul</th>
                                            <th className="px-6 py-3 text-left">Status Gudang</th>
                                            <th className="px-6 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {currentList.map((item) => (
                                            <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                                    {format(new Date(item.created_at), "d MMM yyyy, HH:mm", { locale: id })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border flex-shrink-0">
                                                            <Package className="h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-foreground">
                                                                {item.product.name}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge variant="outline" className="text-[10px] font-mono h-5 px-1.5">{item.product.sku}</Badge>
                                                                <span className="text-xs font-medium text-muted-foreground">
                                                                    x{item.quantity} Unit
                                                                </span>
                                                            </div>
                                                            {item.variant && (
                                                                <div className="mt-1 flex flex-wrap gap-1">
                                                                    {Object.entries(item.variant.options).map(([k, v]) => (
                                                                        <span key={k} className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                                                                            {k}: {v as string}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs text-muted-foreground max-w-[200px]">
                                                        {item.notes || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={item.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {item.notes?.startsWith('[PENARIKAN]') && item.status !== 'sold' ? (
                                                            <Button
                                                                size="sm"
                                                                className="gap-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-foreground"
                                                                onClick={() => handleOpenSellDialog(item)}
                                                            >
                                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                                                Jual Barang
                                                            </Button>
                                                        ) : item.status === 'sold' ? (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleOpenDialog(item)}
                                                                className="gap-1.5 text-xs font-medium transition-all hover:bg-muted"
                                                            >
                                                                <FileText className="h-3.5 w-3.5" />
                                                                Detail Terjual
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleOpenDialog(item)}
                                                                className="gap-1.5 text-xs font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                                            >
                                                                <FileText className="h-3.5 w-3.5" />
                                                                Kelola
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* ─── Modal Kelola Status ─── */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Kelola Status Gudang</DialogTitle>
                    </DialogHeader>

                    {selectedItem && (
                        <div className="space-y-4 py-4">
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <div className="font-semibold">{selectedItem.product.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">Jumlah: {selectedItem.quantity} Unit</div>
                                {selectedItem.status !== 'sold' && (
                                    <div className="text-xs text-muted-foreground mt-1">{selectedItem.notes}</div>
                                )}
                            </div>

                            {selectedItem.status === 'sold' ? (
                                <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 flex gap-3">
                                    <Info className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-400">Status: Telah Terjual</p>
                                        <p className="text-sm leading-relaxed text-indigo-700 dark:text-indigo-300 mt-1">
                                            {selectedItem.notes?.includes('|') ? selectedItem.notes.split('|').pop()?.trim() : (selectedItem.notes || 'Detail penjualan tidak tersedia.')}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form id="update-warehouse-form" onSubmit={handleUpdateStatus} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Ubah Status</label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(v) => setData('status', v)}
                                        disabled={selectedItem.status === 'repaired' || selectedItem.status === 'written_off'}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in_warehouse">
                                                <span className="flex items-center gap-2"><Warehouse className="h-4 w-4 text-amber-500" /> Masih di Gudang Isolasi</span>
                                            </SelectItem>
                                            <SelectItem value="sent_to_agent">
                                                <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-blue-500" /> Sedang Dikirim ke Agen</span>
                                            </SelectItem>
                                            <SelectItem value="repaired">
                                                <span className="flex items-center gap-2"><Wrench className="h-4 w-4 text-emerald-500" /> Selesai Diperbaiki (Stok Kembali Bagus)</span>
                                            </SelectItem>
                                            <SelectItem value="written_off">
                                                <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-red-500" /> Rusak Total (Dibuang)</span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 flex gap-2">
                                    <Info className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs leading-relaxed text-emerald-700 dark:text-emerald-400">
                                        Pilih <strong>Selesai Diperbaiki</strong> jika barang telah dikembalikan oleh agen atau teknisi dalam kondisi baru/bagus. Sistem akan secara otomatis menambahkan stok utama Anda sebanyak {selectedItem.quantity} unit.
                                    </p>
                                </div>
                            </form>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            {selectedItem?.status === 'sold' ? 'Tutup' : 'Batal'}
                        </Button>
                        {selectedItem?.status !== 'sold' && (
                            <Button type="submit" form="update-warehouse-form" disabled={processing} className="gap-2">
                                {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                Simpan
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Jual Barang Tarikan */}
            <Dialog open={isSellDialogOpen} onOpenChange={setIsSellDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Penjualan Barang Tarikan</DialogTitle>
                    </DialogHeader>

                    {selectedItem && (
                        <div className="space-y-4 py-4">
                            <div className="rounded-xl border bg-muted/30 p-4">
                                <div className="font-semibold">{selectedItem.product.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">Jumlah: {selectedItem.quantity} Unit</div>
                                <div className="text-xs text-muted-foreground mt-1">{selectedItem.notes}</div>
                            </div>

                            <form id="sell-form" onSubmit={handleSell} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Pembeli (Customer)</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={sellForm.data.buyer_id}
                                        onChange={(e) => sellForm.setData('buyer_id', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Pilih pelanggan...</option>
                                        {customers.map(c => (
                                            <option key={c.id} value={c.id.toString()}>
                                                {c.name} - {c.phone_number}
                                            </option>
                                        ))}
                                    </select>
                                    {sellForm.errors.buyer_id && <p className="text-xs text-red-500">{sellForm.errors.buyer_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Skenario Penjualan</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={sellForm.data.sale_type}
                                        onChange={(e) => sellForm.setData('sale_type', e.target.value)}
                                        required
                                    >
                                        <option value="cash">Jual Cash / Lunas (Nego)</option>
                                        <option value="continue_credit">Lanjutkan Kredit Lama (Tanpa DP)</option>
                                        <option value="new_credit">Buat Kredit Baru</option>
                                    </select>
                                </div>

                                {sellForm.data.sale_type === 'cash' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Harga Kesepakatan Lunas (Rp)</label>
                                        <input
                                            type="number"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={sellForm.data.agreed_price}
                                            onChange={e => sellForm.setData('agreed_price', e.target.value)}
                                            placeholder="Contoh: 1500000"
                                            required
                                        />
                                    </div>
                                )}

                                {sellForm.data.sale_type === 'continue_credit' && (
                                    <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 flex gap-2">
                                        <Info className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-xs leading-relaxed text-indigo-700 dark:text-indigo-400">
                                            Pelanggan baru akan otomatis melanjutkan cicilan dari kreditur lama (Sisa bulan dan tagihan per bulan disamakan persis).
                                        </p>
                                    </div>
                                )}

                                {sellForm.data.sale_type === 'new_credit' && (
                                    <div className="space-y-4 rounded-xl border p-4 bg-muted/10">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Uang Muka (DP) (Rp)</label>
                                            <input
                                                type="number"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                value={sellForm.data.down_payment}
                                                onChange={e => sellForm.setData('down_payment', e.target.value)}
                                                placeholder="Contoh: 500000"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Tenor (Bulan)</label>
                                                <input
                                                    type="number"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    value={sellForm.data.duration_months}
                                                    onChange={e => sellForm.setData('duration_months', e.target.value)}
                                                    placeholder="Contoh: 6"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Angsuran / Bln (Rp)</label>
                                                <input
                                                    type="number"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    value={sellForm.data.installment_amount}
                                                    onChange={e => sellForm.setData('installment_amount', e.target.value)}
                                                    placeholder="Contoh: 200000"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsSellDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" form="sell-form" disabled={sellForm.processing} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-foreground">
                            {sellForm.processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            Proses Penjualan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

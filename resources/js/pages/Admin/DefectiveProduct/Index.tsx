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

interface Props {
    defectiveProducts: DefectiveProductData[];
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

export default function Index({ defectiveProducts }: Props) {
    const [selectedItem, setSelectedItem] = useState<DefectiveProductData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, put, processing, reset } = useForm({
        status: 'in_warehouse'
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

    const counts = {
        in_warehouse: defectiveProducts.filter(r => r.status === 'in_warehouse').length,
        sent_to_agent: defectiveProducts.filter(r => r.status === 'sent_to_agent').length,
        repaired: defectiveProducts.filter(r => r.status === 'repaired').length,
        written_off: defectiveProducts.filter(r => r.status === 'written_off').length,
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
                        { label: 'Di Gudang', count: counts.in_warehouse, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                        { label: 'Dikirim ke Agen', count: counts.sent_to_agent, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                        { label: 'Selesai Diperbaiki', count: counts.repaired, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                        { label: 'Dibuang/Rusak Total', count: counts.written_off, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
                    ].map((stat) => (
                        <div key={stat.label} className={`rounded-xl border p-4 ${stat.bg} ${stat.border}`}>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className={`mt-1 text-3xl font-bold ${stat.color}`}>{stat.count}</p>
                        </div>
                    ))}
                </div>

                {/* Table Card */}
                <Card className="overflow-hidden border shadow-sm">
                    <div className="border-b bg-muted/30 px-6 py-4">
                        <h2 className="text-sm font-semibold text-foreground">Inventaris Barang Rusak</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Total {defectiveProducts.length} item tercatat</p>
                    </div>
                    <CardContent className="p-0">
                        {defectiveProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
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
                                        {defectiveProducts.map((item) => (
                                            <tr key={item.id} className="group transition-colors hover:bg-muted/30">
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
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleOpenDialog(item)}
                                                        className="gap-1.5 text-xs font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                                    >
                                                        <FileText className="h-3.5 w-3.5" />
                                                        Kelola
                                                    </Button>
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
                                <div className="text-xs text-muted-foreground mt-1">{selectedItem.notes}</div>
                            </div>

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
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" form="update-warehouse-form" disabled={processing} className="gap-2">
                            {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

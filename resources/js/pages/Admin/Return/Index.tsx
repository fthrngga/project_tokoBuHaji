import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from 'react';
import { route } from 'ziggy-js';
import {
    ArrowUpRight, Package, RotateCcw, Clock, CheckCircle2,
    XCircle, Loader2, AlertTriangle, ZoomIn, User, Calendar, FileText
} from 'lucide-react';

interface ReturnData {
    id: number;
    order_id: number;
    user: { name: string; email: string };
    order_item: {
        quantity: number;
        price: number;
        product: { name: string };
    };
    reason: string;
    proof_image_path: string | null;
    status: 'pending' | 'processing' | 'completed' | 'rejected';
    created_at: string;
}

interface Props {
    returns: ReturnData[];
}

const STATUS_CONFIG = {
    pending: {
        label: 'Menunggu Konfirmasi',
        icon: Clock,
        badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
        dot: 'bg-amber-500',
    },
    processing: {
        label: 'Sedang Diproses',
        icon: Loader2,
        badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
        dot: 'bg-blue-500',
    },
    completed: {
        label: 'Selesai',
        icon: CheckCircle2,
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
        dot: 'bg-emerald-500',
    },
    rejected: {
        label: 'Ditolak',
        icon: XCircle,
        badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
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

export default function Index({ returns }: Props) {
    const [selectedReturn, setSelectedReturn] = useState<ReturnData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, put, processing, reset } = useForm({
        status: 'processing'
    });

    const handleOpenDialog = (ret: ReturnData) => {
        setSelectedReturn(ret);
        setData('status', ret.status === 'pending' ? 'processing' : ret.status);
        setIsDialogOpen(true);
    };

    const handleUpdateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedReturn) return;
        put(route('admin.returns.update', selectedReturn.id), {
            onSuccess: () => {
                setIsDialogOpen(false);
                reset();
            }
        });
    };

    const counts = {
        pending: returns.filter(r => r.status === 'pending').length,
        processing: returns.filter(r => r.status === 'processing').length,
        completed: returns.filter(r => r.status === 'completed').length,
        rejected: returns.filter(r => r.status === 'rejected').length,
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Return Produk', href: route('admin.returns.index') }]}>
            <Head title="Manajemen Return - Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <RotateCcw className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Pengembalian Produk</h1>
                            <p className="text-sm text-muted-foreground">Tinjau dan proses pengajuan return dari pelanggan</p>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        { label: 'Menunggu', count: counts.pending, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10', border: 'border-amber-100 dark:border-amber-900/30' },
                        { label: 'Diproses', count: counts.processing, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10', border: 'border-blue-100 dark:border-blue-900/30' },
                        { label: 'Selesai', count: counts.completed, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-100 dark:border-emerald-900/30' },
                        { label: 'Ditolak', count: counts.rejected, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/10', border: 'border-red-100 dark:border-red-900/30' },
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
                        <h2 className="text-sm font-semibold text-foreground">Semua Pengajuan Return</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Total {returns.length} pengajuan</p>
                    </div>
                    <CardContent className="p-0">
                        {returns.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                    <Package className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Tidak ada pengajuan return</p>
                                    <p className="text-sm text-muted-foreground mt-1">Pengajuan return dari pelanggan akan muncul di sini.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            <th className="px-6 py-3 text-left">Pesanan</th>
                                            <th className="px-6 py-3 text-left">Pelanggan</th>
                                            <th className="px-6 py-3 text-left">Produk & Alasan</th>
                                            <th className="px-6 py-3 text-left">Status</th>
                                            <th className="px-6 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {returns.map((ret) => (
                                            <tr key={ret.id} className="group transition-colors hover:bg-muted/30">
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route('admin.orders.show', ret.order_id)}
                                                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                                                    >
                                                        Order #{ret.order_id}
                                                        <ArrowUpRight className="h-3 w-3 opacity-60" />
                                                    </Link>
                                                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {format(new Date(ret.created_at), "d MMM yyyy, HH:mm", { locale: id })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                                                            {ret.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{ret.user.name}</div>
                                                            <div className="text-xs text-muted-foreground">{ret.user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium line-clamp-1">{ret.order_item.product.name}</div>
                                                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1 max-w-[220px]">
                                                        "{ret.reason}"
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={ret.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleOpenDialog(ret)}
                                                        className="gap-1.5 text-xs font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                                    >
                                                        <FileText className="h-3.5 w-3.5" />
                                                        Detail & Proses
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

            {/* ─── Modal Detail & Proses ─── */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
                    {/* Fixed Header */}
                    <DialogHeader className="flex-shrink-0 border-b px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <RotateCcw className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold">Detail Pengembalian</DialogTitle>
                                {selectedReturn && (
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        Pengajuan untuk Order #{selectedReturn.order_id}
                                    </p>
                                )}
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto">
                        {selectedReturn && (
                            <div className="space-y-5 px-6 py-5">
                                {/* Info Grid */}
                                <div className="rounded-xl border bg-muted/30 p-4">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pelanggan</p>
                                            <div className="flex items-center gap-1.5 font-semibold">
                                                <User className="h-3.5 w-3.5 text-muted-foreground" />
                                                {selectedReturn.user.name}
                                            </div>
                                            <p className="text-xs text-muted-foreground">{selectedReturn.user.email}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pesanan</p>
                                            <Link
                                                href={route('admin.orders.show', selectedReturn.order_id)}
                                                className="flex items-center gap-1 font-semibold text-primary hover:underline"
                                                onClick={() => setIsDialogOpen(false)}
                                            >
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                                Order #{selectedReturn.order_id}
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {format(new Date(selectedReturn.created_at), "d MMM yyyy", { locale: id })}
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="my-3" />
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Produk</p>
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                            <p className="font-semibold text-sm">{selectedReturn.order_item.product.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Status */}
                                <div className="flex items-center justify-between rounded-xl border px-4 py-3">
                                    <span className="text-sm font-medium text-muted-foreground">Status Saat Ini</span>
                                    <StatusBadge status={selectedReturn.status} />
                                </div>

                                {/* Alasan */}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alasan Pelanggan</p>
                                    <div className="rounded-xl border-l-4 border-l-amber-400 bg-amber-50 px-4 py-3 dark:bg-amber-900/10">
                                        <div className="flex gap-2">
                                            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                                            <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                                                {selectedReturn.reason}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Foto Bukti */}
                                {selectedReturn.proof_image_path ? (
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Foto Bukti Kerusakan</p>
                                        <a
                                            href={`/storage/${selectedReturn.proof_image_path}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group relative flex items-center justify-center overflow-hidden rounded-xl border bg-muted/50 transition-all hover:border-primary/40 hover:shadow-md"
                                            style={{ minHeight: '180px' }}
                                        >
                                            <img
                                                src={`/storage/${selectedReturn.proof_image_path}`}
                                                alt="Bukti Kerusakan"
                                                className="max-h-64 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                                                <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                                    <ZoomIn className="h-3.5 w-3.5" />
                                                    Klik untuk memperbesar
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed p-6 text-center">
                                        <Package className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                        <p className="mt-2 text-sm text-muted-foreground">Tidak ada foto bukti diunggah</p>
                                    </div>
                                )}

                                {/* Update Status Form */}
                                <div className="rounded-xl border bg-background p-4 shadow-sm">
                                    <form id="update-return-form" onSubmit={handleUpdateStatus}>
                                        <p className="mb-3 text-sm font-semibold">Perbarui Status Return</p>
                                        <Select
                                            value={data.status}
                                            onValueChange={(v) => setData('status', v)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending" disabled>
                                                    <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-amber-500" /> Menunggu Konfirmasi</span>
                                                </SelectItem>
                                                <SelectItem value="processing">
                                                    <span className="flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 text-blue-500" /> Terima & Diproses</span>
                                                </SelectItem>
                                                <SelectItem value="completed">
                                                    <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Selesai (Barang Diganti)</span>
                                                </SelectItem>
                                                <SelectItem value="rejected">
                                                    <span className="flex items-center gap-2"><XCircle className="h-3.5 w-3.5 text-red-500" /> Tolak Pengajuan</span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Status "Selesai" menandakan unit pengganti telah dikirim/diserahkan kepada pelanggan.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed Footer */}
                    <DialogFooter className="flex-shrink-0 border-t bg-muted/30 px-6 py-4">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" form="update-return-form" disabled={processing} className="gap-2">
                            {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            Simpan Perubahan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

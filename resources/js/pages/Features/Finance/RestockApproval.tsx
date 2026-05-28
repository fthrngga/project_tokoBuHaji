import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Package, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface RestockRequest {
    id: number;
    requested_quantity: number;
    status: 'pending' | 'approved' | 'rejected';
    notes: string;
    created_at: string;
    product: { name: string; sku: string; stock: number; category?: { name: string } };
    user: { name: string };
}

export default function RestockApproval({ restockRequests }: { restockRequests: RestockRequest[] }) {
    
    const handleAction = (id: number, action: 'approve' | 'reject') => {
        if (!confirm(`Apakah Anda yakin ingin ${action === 'approve' ? 'MENYETUJUI' : 'MENOLAK'} restock ini?`)) return;
        
        router.patch(route(`restock.${action}`, id), {}, {
            onSuccess: () => toast.success(`Permintaan restock berhasil di-${action === 'approve' ? 'setujui' : 'tolak'}!`),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Finance', href: '#' }, { title: 'Persetujuan Restock', href: route('restock-approval') }]}>
            <Head title="Persetujuan Restock" />
            <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Persetujuan Restock Gudang</h1>
                    <p className="text-muted-foreground text-sm">Tinjau dan setujui permintaan penambahan stok dari tim Sales/Gudang.</p>
                </div>

                <div className="bg-card text-card-foreground border border-border rounded-xl shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary/30">
                                <TableHead>Produk</TableHead>
                                <TableHead>Diajukan Oleh</TableHead>
                                <TableHead className="text-center">Stok Saat Ini</TableHead>
                                <TableHead className="text-center">Permintaan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restockRequests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-32 text-slate-500">Belum ada riwayat permintaan restock.</TableCell>
                                </TableRow>
                            ) : (
                                restockRequests.map((req) => (
                                    <TableRow key={req.id}>
                                        <TableCell>
                                            <p className="font-semibold text-sm">{req.product.name}</p>
                                            <p className="text-xs text-muted-foreground">SKU: {req.product.sku}</p>
                                            {req.notes && <p className="text-xs text-orange-600 mt-1 italic">"{req.notes}"</p>}
                                        </TableCell>
                                        <TableCell className="text-sm">{req.user.name}</TableCell>
                                        <TableCell className="text-center font-medium text-red-400">{req.product.stock}</TableCell>
                                        <TableCell className="text-center font-bold text-primary">+{req.requested_quantity}</TableCell>
                                        <TableCell>
                                            {req.status === 'pending' && <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="w-3 h-3 mr-1"/> Menunggu</Badge>}
                                            {req.status === 'approved' && <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Disetujui</Badge>}
                                            {req.status === 'rejected' && <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Ditolak</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {req.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10" onClick={() => handleAction(req.id, 'reject')}>
                                                        <X className="w-4 h-4 mr-1" /> Tolak
                                                    </Button>
                                                    <Button size="sm" className="bg-primary hover:opacity-90 text-primary-foreground" onClick={() => handleAction(req.id, 'approve')}>
                                                        <Check className="w-4 h-4 mr-1" /> Setujui
                                                    </Button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">{new Date(req.created_at).toLocaleDateString('id-ID')}</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
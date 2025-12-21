import { Head, usePage, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { format, addMonths } from "date-fns";
import { id } from "date-fns/locale";
import { route } from 'ziggy-js';

const breadcrumbs = [
    {
        title: 'Finance',
        href: '#',
    },
    {
        title: 'Monitoring Pembayaran',
        href: '#',
    },
];

interface PaymentLog {
    id: number;
    payment_id: number;
    type: 'down_payment' | 'installment';
    installment_number?: number;
    amount: number;
    proof_path: string;
    status: 'pending' | 'verified' | 'rejected';
    paid_at?: string;
    created_at: string;
}

interface Credit {
    id: number;
    order_id: number;
    customer_id: number;
    payment_method: string;
    cash_type?: string;
    status: string;
    down_payment: number;
    installment_amount: number;
    duration_months: number;
    installments_paid?: number;
    proof_of_payment_path?: string;
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
    payment_logs?: PaymentLog[];
}

interface Props {
    credits: Credit[];
    cashPayments: Credit[];
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

export default function CreditMonitoring({ credits, cashPayments }: Props) {
    const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<Credit | null>(null);
    const [selectedLog, setSelectedLog] = useState<PaymentLog | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isVerifyOpen, setIsVerifyOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isLogVerifyOpen, setIsLogVerifyOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'credit' | 'cash'>('credit');

    const { data, setData, put, processing, errors, reset } = useForm({
        installment_amount: '',
        duration_months: '',
    });

    const handleProcessClick = (credit: Credit) => {
        setSelectedCredit(credit);
        setData({
            installment_amount: credit.installment_amount ? String(credit.installment_amount) : '',
            duration_months: credit.duration_months ? String(credit.duration_months) : '',
        });
        setIsEditOpen(true);
    };

    const handleValuesDetail = (credit: Credit) => {
        setSelectedCredit(credit);
        setIsDetailOpen(true);
    };

    const handleVerifyClick = (payment: Credit) => {
        setSelectedPayment(payment);
        setIsVerifyOpen(true);
    };

    const handleVerifyLogClick = (log: PaymentLog) => {
        setSelectedLog(log);
        setIsLogVerifyOpen(true);
    };

    const handleConfirmVerifyLog = (action: 'accept' | 'reject') => {
        if (!selectedLog) return;

        router.put(route('finance.payment-log.verify', selectedLog.id), {
            action: action
        }, {
            onSuccess: () => {
                setIsLogVerifyOpen(false);
                setSelectedLog(null);
                setIsDetailOpen(false); // Close detail to force refresh
            }
        });
    };

    const handleVerifyPayment = (action: 'accept' | 'reject') => {
        if (!selectedPayment) return;

        router.put(route('finance.payment.verify', selectedPayment.id), {
            action: action
        }, {
            onSuccess: () => {
                setIsVerifyOpen(false);
                setSelectedPayment(null);
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCredit) return;

        put(route('finance.payment.terms.update', selectedCredit.id), {
            onSuccess: () => {
                setIsEditOpen(false);
                reset();
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Monitoring Pembayaran" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow">
                    <h1 className="text-2xl font-bold tracking-tight">Monitoring Pembayaran</h1>
                    <p className="text-muted-foreground">
                        Kelola pembayaran Kredit dan Cash pelanggan.
                    </p>
                </div>

                {/* Manual Tabs Implementation */}
                <div className="flex space-x-2 border-b">
                    <button
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'credit'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('credit')}
                    >
                        Kredit
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'cash'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('cash')}
                    >
                        Cash / Tunai
                    </button>
                </div>

                {activeTab === 'credit' && (
                    <div className="rounded-xl border bg-card shadow overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID Order</TableHead>
                                    <TableHead>Pelanggan</TableHead>
                                    <TableHead>Nominal Angsuran</TableHead>
                                    <TableHead>Angsuran Berjalan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {credits.length > 0 ? credits.map((credit) => (
                                    <TableRow key={credit.id}>
                                        <TableCell>#{credit.order_id}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{credit.customer?.user?.name}</div>
                                            <div className="text-xs text-muted-foreground">{format(new Date(credit.created_at), "d MMM yyyy", { locale: id })}</div>
                                        </TableCell>
                                        <TableCell>{credit.installment_amount ? formatCurrency(credit.installment_amount) : '-'}</TableCell>
                                        <TableCell>
                                            {credit.duration_months ? (
                                                <Badge variant="outline">
                                                    {credit.installments_paid || 0} / {credit.duration_months} Bulan
                                                </Badge>
                                            ) : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={credit.status === 'pending_approval' ? 'secondary' : credit.status === 'ongoing' ? 'default' : 'outline'}>
                                                {credit.status === 'pending_approval' ? 'Menunggu Persetujuan' :
                                                    credit.status === 'ongoing' ? 'Berjalan' :
                                                        credit.status === 'paid_off' ? 'Lunas' : credit.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {credit.status === 'pending_approval' ? (
                                                <Button size="sm" onClick={() => handleProcessClick(credit)}>
                                                    Proses
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" onClick={() => handleValuesDetail(credit)}>
                                                    Detail
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Tidak ada data pengajuan kredit.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {activeTab === 'cash' && (
                    <div className="rounded-xl border bg-card shadow overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID Order</TableHead>
                                    <TableHead>Pelanggan</TableHead>
                                    <TableHead>Barang</TableHead>
                                    <TableHead>Total Tagihan</TableHead>
                                    <TableHead>Tipe Pembayaran</TableHead>
                                    <TableHead>Alamat Pengiriman</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cashPayments.length > 0 ? cashPayments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>#{payment.order_id}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{payment.customer?.user?.name}</div>
                                            <div className="text-xs text-muted-foreground">{format(new Date(payment.created_at), "d MMM yyyy", { locale: id })}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px] truncate" title={payment.order.items.map(i => i.product.name).join(', ')}>
                                                {payment.order.items.map(i => i.product.name).join(', ')}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatCurrency(payment.order.total_amount)}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="uppercase">
                                                {payment.cash_type || 'Cash'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px] text-xs">
                                                {payment.order.address_detail}, {payment.order.city}, {payment.order.province}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={payment.status === 'pending_approval' ? 'secondary' : 'default'}>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleVerifyClick(payment)}
                                                disabled={payment.status === 'paid_off' || payment.status === 'rejected'}
                                            >
                                                {payment.status === 'paid_off' ? 'Terverifikasi' : 'Verifikasi'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            Tidak ada data pembayaran cash.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Proses Pengajuan Kredit</DialogTitle>
                            <DialogDescription>
                                Masukkan nominal angsuran dan tenor untuk pesanan #{selectedCredit?.order_id}.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedCredit && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Pelanggan:</span>
                                        <p className="font-medium">{selectedCredit.customer?.user?.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Total Order:</span>
                                        <p className="font-medium">{formatCurrency(selectedCredit.order.total_amount)}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Uang Muka:</span>
                                        <p className="font-medium">{selectedCredit.down_payment ? formatCurrency(selectedCredit.down_payment) : '-'}</p>
                                    </div>
                                </div>

                                <form id="credit-terms-form" onSubmit={handleSubmit} className="grid gap-4 border-t pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="installment_amount">Nominal Angsuran (Per Bulan)</Label>
                                        <Input
                                            id="installment_amount"
                                            type="number"
                                            value={data.installment_amount}
                                            onChange={(e) => setData('installment_amount', e.target.value)}
                                            placeholder="Contoh: 100000"
                                        />
                                        {errors.installment_amount && <p className="text-red-500 text-xs">{errors.installment_amount}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration_months">Lama Angsuran (Bulan)</Label>
                                        <Input
                                            id="duration_months"
                                            type="number"
                                            value={data.duration_months}
                                            onChange={(e) => setData('duration_months', e.target.value)}
                                            placeholder="Contoh: 10"
                                        />
                                        {errors.duration_months && <p className="text-red-500 text-xs">{errors.duration_months}</p>}
                                    </div>
                                </form>
                            </div>
                        )}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                            <Button type="submit" form="credit-terms-form" disabled={processing}>Simpan Data</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Detail Modal */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Detail Kredit Transaksi #{selectedCredit?.order_id}</DialogTitle>
                        </DialogHeader>
                        {selectedCredit && (
                            <div className="grid gap-6 py-4">
                                {/* Customer Info */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold border-b pb-1">Informasi Pelanggan</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-3 rounded">
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Nama Pelanggan</span>
                                            <span className="font-medium">{selectedCredit.customer?.user?.name}</span>
                                            <span className="text-muted-foreground block text-xs mt-1">No. HP</span>
                                            <span className="font-medium">{selectedCredit.customer?.phone_number || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Alamat Pengiriman</span>
                                            <span className="font-medium">
                                                {selectedCredit.order.address_detail}, {selectedCredit.order.city}, {selectedCredit.order.province}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Financial Details */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold border-b pb-1">Rincian Pembayaran</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-blue-50/50 p-4 rounded border border-blue-100">
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Total Order</span>
                                            <span className="font-bold text-blue-700">{formatCurrency(selectedCredit.order.total_amount)}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Uang Muka (DP)</span>
                                            <span className="font-medium">{formatCurrency(selectedCredit.down_payment)}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Angsuran/Bulan</span>
                                            <span className="font-medium">{formatCurrency(selectedCredit.installment_amount)}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Progress</span>
                                            <span className="font-bold">
                                                {selectedCredit.installments_paid || 0} / {selectedCredit.duration_months} Bulan
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Status</span>
                                            <Badge variant={selectedCredit.status === 'ongoing' ? 'default' : 'outline'} className="mt-1">
                                                {selectedCredit.status}
                                            </Badge>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs">Tgl Pengajuan</span>
                                            <span className="font-medium">{format(new Date(selectedCredit.created_at), "d MMMM yyyy", { locale: id })}</span>
                                        </div>
                                        {selectedCredit.status === 'ongoing' && (
                                            <div>
                                                <span className="text-muted-foreground block text-xs">Jatuh Tempo Berikutnya</span>
                                                <span className="font-medium text-red-600">
                                                    {format(
                                                        addMonths(new Date(selectedCredit.created_at), (selectedCredit.installments_paid || 0) + 1),
                                                        "d MMMM yyyy",
                                                        { locale: id }
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Payment History / Logs */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold border-b pb-1">Riwayat Pembayaran</h3>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[150px]">Tanggal</TableHead>
                                                    <TableHead>Keterangan</TableHead>
                                                    <TableHead>Nominal</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Aksi</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {selectedCredit.payment_logs && selectedCredit.payment_logs.length > 0 ? (
                                                    selectedCredit.payment_logs.map((log) => (
                                                        <TableRow key={log.id}>
                                                            <TableCell className="font-medium">
                                                                {format(new Date(log.created_at), "d MMM yyyy HH:mm", { locale: id })}
                                                            </TableCell>
                                                            <TableCell>
                                                                {log.type === 'down_payment' ? 'Uang Muka (DP)' : `Angsuran Bulan ke-${log.installment_number}`}
                                                            </TableCell>
                                                            <TableCell>{formatCurrency(log.amount)}</TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={
                                                                        log.status === 'verified' ? 'default' :
                                                                            log.status === 'rejected' ? 'destructive' : 'secondary'
                                                                    }
                                                                >
                                                                    {log.status === 'verified' ? 'Diterima' :
                                                                        log.status === 'rejected' ? 'Ditolak' : 'Menunggu Verifikasi'}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {log.status === 'pending' && (
                                                                    <Button size="sm" variant="outline" onClick={() => handleVerifyLogClick(log)}>
                                                                        Verifikasi
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground text-sm">
                                                            Belum ada bukti pembayaran diupload.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Tutup</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Log Verification Modal */}
                <Dialog open={isLogVerifyOpen} onOpenChange={setIsLogVerifyOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Verifikasi Pembayaran</DialogTitle>
                            <DialogDescription>
                                Periksa bukti pembayaran ini.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedLog && (
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="text-muted-foreground">Tipe:</span>
                                        <span className="font-medium capitalize">
                                            {selectedLog.type === 'down_payment' ? 'Uang Muka' : `Angsuran #${selectedLog.installment_number}`}
                                        </span>
                                        <span className="text-muted-foreground">Nominal:</span>
                                        <span className="font-medium">{formatCurrency(selectedLog.amount)}</span>
                                    </div>
                                </div>
                                <div className="border rounded-lg p-2 bg-slate-50 flex justify-center items-center min-h-[200px]">
                                    <img
                                        src={`/storage/${selectedLog.proof_path}`}
                                        alt="Bukti Pembayaran"
                                        className="max-h-[400px] object-contain rounded"
                                    />
                                </div>
                            </div>
                        )}

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="destructive" onClick={() => handleConfirmVerifyLog('reject')} disabled={processing}>
                                Tolak
                            </Button>
                            <div className="flex-1"></div>
                            <Button variant="outline" onClick={() => setIsLogVerifyOpen(false)} disabled={processing}>Batal</Button>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleConfirmVerifyLog('accept')} disabled={processing}>
                                Terima
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Verification Modal */}
                <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Verifikasi Pembayaran Cash</DialogTitle>
                            <DialogDescription>
                                Periksa bukti pembayaran yang diupload pelanggan.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedPayment && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                    <div>
                                        <span className="text-muted-foreground">ID Order:</span>
                                        <p className="font-medium">#{selectedPayment.order_id}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Total Tagihan:</span>
                                        <p className="font-medium">{formatCurrency(selectedPayment.order.total_amount)}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Bukti Pembayaran</Label>
                                    <div className="border rounded-lg p-2 bg-slate-50 flex justify-center items-center min-h-[200px]">
                                        {selectedPayment.proof_of_payment_path ? (
                                            <img
                                                src={`/storage/${selectedPayment.proof_of_payment_path}`}
                                                alt="Proof of Payment"
                                                className="max-h-[300px] object-contain rounded"
                                            />
                                        ) : (
                                            <p className="text-muted-foreground italic">Belum ada bukti pembayaran diupload.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="destructive" onClick={() => handleVerifyPayment('reject')} disabled={processing}>
                                Tolak Pembayaran
                            </Button>
                            <div className="flex-1"></div>
                            <Button type="button" variant="outline" onClick={() => setIsVerifyOpen(false)} disabled={processing}>Batal</Button>
                            <Button type="button" className="bg-green-600 hover:bg-green-700" onClick={() => handleVerifyPayment('accept')} disabled={processing}>
                                Terima Pembayaran
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

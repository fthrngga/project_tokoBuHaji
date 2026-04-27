import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const breadcrumbs = [
    { title: 'Finance', href: '#' },
    { title: 'Konfirmasi Pengadaan', href: '#' },
];

type RestockStatus = 'pending' | 'approved' | 'rejected';

interface RestockRequest {
    id: number;
    request_date: string;
    item_name: string;
    supplier: string;
    quantity: number;
    unit: string;
    estimated_cost: number;
    status: RestockStatus;
    notes?: string;
}

// Dummy data - akan diganti dengan data dari backend setelah integrasi dengan modul Gudang
const DUMMY_DATA: RestockRequest[] = [
    {
        id: 1,
        request_date: '20-05-2025',
        item_name: 'Kulkas 2 Pintu',
        supplier: 'Agen Jaya',
        quantity: 2,
        unit: 'Unit',
        estimated_cost: 6000000,
        status: 'pending',
    },
    {
        id: 2,
        request_date: '21-05-2025',
        item_name: 'Mesin Cuci 8kg',
        supplier: 'Toko Maju',
        quantity: 1,
        unit: 'Unit',
        estimated_cost: 2500000,
        status: 'pending',
    },
    {
        id: 3,
        request_date: '18-05-2025',
        item_name: 'TV LED 32 Inch',
        supplier: 'Agen Elektronik',
        quantity: 5,
        unit: 'Unit',
        estimated_cost: 7500000,
        status: 'approved',
    },
    {
        id: 4,
        request_date: '15-05-2025',
        item_name: 'AC 1 PK',
        supplier: 'Distributor Dingin',
        quantity: 3,
        unit: 'Unit',
        estimated_cost: 9000000,
        status: 'rejected',
        notes: 'Stok masih mencukupi',
    },
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

export default function RestockApproval() {
    const [activeTab, setActiveTab] = useState<RestockStatus>('pending');
    // State lokal untuk simulasi aksi (akan diganti dengan router.put setelah backend siap)
    const [items, setItems] = useState<RestockRequest[]>(DUMMY_DATA);

    const filtered = items.filter(item => item.status === activeTab);

    const handleApprove = (id: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
    };

    const handleReject = (id: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
    };

    const tabCounts = {
        pending: items.filter(i => i.status === 'pending').length,
        approved: items.filter(i => i.status === 'approved').length,
        rejected: items.filter(i => i.status === 'rejected').length,
    };

    const tabs: { key: RestockStatus; label: string; icon: React.ReactNode }[] = [
        { key: 'pending', label: 'Menunggu Persetujuan', icon: <Clock className="w-4 h-4" /> },
        { key: 'approved', label: 'Disetujui', icon: <CheckCircle className="w-4 h-4" /> },
        { key: 'rejected', label: 'Ditolak', icon: <XCircle className="w-4 h-4" /> },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Konfirmasi Pengadaan Barang" />
            <div className="flex flex-col gap-4 p-4">

                {/* Header */}
                <div className="flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow">
                    <h1 className="text-2xl font-bold tracking-tight">Konfirmasi Pengadaan Barang</h1>
                    <p className="text-muted-foreground">
                        Daftar pengajuan restock dari Gudang yang menunggu persetujuan.
                    </p>
                    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                        ⚠️ <strong>Integrasi dalam Pengembangan:</strong> Data pengajuan restock akan terhubung otomatis dari Modul Gudang setelah integrasi selesai. Saat ini menampilkan data simulasi.
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md transition-colors whitespace-nowrap ${
                                activeTab === tab.key
                                    ? tab.key === 'pending'
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : tab.key === 'approved'
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-red-600 text-white border-red-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                                activeTab === tab.key ? 'bg-white/30 text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tabCounts[tab.key]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal Request</TableHead>
                                <TableHead>Item Barang</TableHead>
                                <TableHead>Supplier / Agen</TableHead>
                                <TableHead>Jumlah Unit</TableHead>
                                <TableHead>Estimasi Biaya</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length > 0 ? filtered.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-muted-foreground text-sm">{item.request_date}</TableCell>
                                    <TableCell className="font-medium">{item.item_name}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{item.quantity} {item.unit}</Badge>
                                    </TableCell>
                                    <TableCell className="font-semibold">{formatCurrency(item.estimated_cost)}</TableCell>
                                    <TableCell className="text-right">
                                        {item.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white gap-1"
                                                    onClick={() => handleApprove(item.id)}
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" /> Setujui
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="gap-1"
                                                    onClick={() => handleReject(item.id)}
                                                >
                                                    <XCircle className="w-3.5 h-3.5" /> Tolak
                                                </Button>
                                            </div>
                                        )}
                                        {item.status === 'approved' && (
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                                                <CheckCircle className="w-3 h-3 mr-1" /> Status: 'Disetujui'
                                            </Badge>
                                        )}
                                        {item.status === 'rejected' && (
                                            <div className="flex flex-col items-end gap-1">
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                                                    <XCircle className="w-3 h-3 mr-1" /> Status: 'Ditolak'
                                                </Badge>
                                                {item.notes && (
                                                    <span className="text-xs text-muted-foreground">{item.notes}</span>
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Tidak ada pengajuan restock dalam kategori ini.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </AppLayout>
    );
}

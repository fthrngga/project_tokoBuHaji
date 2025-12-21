import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { route } from 'ziggy-js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';

interface Order {
    id: number;
    user?: { name: string; email: string };
    status: string;
    total_amount: number;
    created_at: string;
}

interface Props {
    orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/admin/orders',
    },
];

const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(value));
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'negotiation': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Negosiasi</Badge>;
        case 'pending': return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Menunggu</Badge>;
        case 'awaiting_payment': return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Menunggu Pembayaran</Badge>;
        case 'processing': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Diproses</Badge>;
        case 'completed': return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Selesai</Badge>;
        case 'cancelled': return <Badge variant="destructive">Dibatalkan</Badge>;
        default: return <Badge variant="outline">{status}</Badge>;
    }
}

export default function Index({ orders }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Orders" />

            <div className="flex bg-background h-full w-full flex-col p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Management</CardTitle>
                        <CardDescription>View and manage customer orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">#{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.user?.name || 'Unknown'}</span>
                                                <span className="text-xs text-muted-foreground">{order.user?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(order.total_amount)}</TableCell>
                                        <TableCell>{format(new Date(order.created_at), "d MMM yyyy, HH:mm", { locale: id })}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={route('admin.orders.show', order.id)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {orders.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                            No orders found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

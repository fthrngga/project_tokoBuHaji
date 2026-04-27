import { type NavItem } from "@/types";
import { dashboard } from "@/routes"; // Impor fungsi route dashboard
import { route } from 'ziggy-js';
import { LayoutGrid, Package, ClipboardList, ShoppingCart, Banknote, Store } from "lucide-react"; // Impor ikon

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Kasir (POS)',
        href: route('admin.pos.index', undefined, false),
        icon: Store,
    },
    {
        title: 'Sales',
        href: '#',
        icon: ShoppingCart,
        items: [
            {
                title: 'Products',
                href: route('products.index', undefined, false),
            },
            {
                title: 'Orders',
                href: route('admin.orders.index', undefined, false),
            },
            {
                title: 'Customers',
                href: route('customers.index', undefined, false),
            },
        ],
    },
    {
        title: 'Finance',
        href: '#',
        icon: Banknote,
        items: [
            {
                title: 'Monitoring Pembayaran',
                href: route('finance.payment-monitoring', undefined, false),
            },
            {
                title: 'Tunggakan Kritis',
                href: route('finance.arrears', undefined, false),
            },
            {
                title: 'Input Angsuran',
                href: route('finance.payment.manual', undefined, false),
            },
            {
                title: 'Laporan Keuangan',
                icon: 'FileText',
                href: route('finance.reports', undefined, false),
            },
            {
                title: 'Konfirmasi Restock',
                href: route('finance.restock.index', undefined, false),
            },
        ],
    },
];

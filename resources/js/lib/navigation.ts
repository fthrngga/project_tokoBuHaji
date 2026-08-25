import { type NavItem } from "@/types";
import { dashboard } from "@/routes"; // Impor fungsi route dashboard
import { route } from 'ziggy-js';
import { LayoutGrid, Package, ClipboardList, ShoppingCart, Banknote, Store, Database } from "lucide-react"; // Impor ikon

export const getMainNavItems = (role: string): NavItem[] => {
    // If somehow a customer logs in here, return empty
    if (role === 'customer') return [];

    return [
        {
            title: 'Dashboard',
            href: dashboard().url,
            icon: LayoutGrid,
            roles: ['super_admin', 'owner'],
        },
        {
            title: 'Kasir (POS)',
            href: route('admin.pos.index', undefined, false),
            icon: Store,
            roles: ['super_admin', 'owner', 'admin'],
        },
        {
            title: 'Sales',
            href: '#',
            icon: ShoppingCart,
            roles: ['super_admin', 'owner', 'admin'],
            items: [
                {
                    title: 'Products',
                    href: route('products.index', undefined, false),
                    roles: ['super_admin', 'admin'], // Owner doesn't see Products according to prompt
                },
                {
                    title: 'Orders',
                    href: route('admin.orders.index', undefined, false),
                    roles: ['super_admin', 'owner', 'admin'],
                },
                {
                    title: 'Return Produk',
                    href: route('admin.returns.index', undefined, false),
                    roles: ['super_admin', 'admin'],
                },
                {
                    title: 'Gudang Isolasi',
                    href: route('admin.defective_products.index', undefined, false),
                    roles: ['super_admin', 'owner'],
                },
                {
                    title: 'Customers',
                    href: route('customers.index', undefined, false),
                    roles: ['super_admin', 'owner', 'admin'],
                },
            ].filter(item => item.roles?.includes(role)),
        },
        {
            title: 'Finance',
            href: '#',
            icon: Banknote,
            roles: ['super_admin', 'owner', 'admin'],
            items: [
                {
                    title: 'Monitoring Pembayaran',
                    href: route('finance.payment-monitoring', undefined, false),
                    roles: ['super_admin', 'owner'], // Admin doesn't see this
                },
                {
                    title: 'Tunggakan Kritis',
                    href: route('finance.arrears', undefined, false),
                    roles: ['super_admin', 'owner', 'admin'],
                },
                {
                    title: 'Input Angsuran',
                    href: route('finance.payment.manual', undefined, false),
                    roles: ['super_admin', 'owner', 'admin'],
                },
                {
                    title: 'Laporan Keuangan',
                    icon: 'FileText',
                    href: route('finance.reports', undefined, false),
                    roles: ['super_admin', 'owner'], // Admin doesn't see this
                },
                {
                    title: 'Konfirmasi Restock',
                    href: route('finance.restock.index', undefined, false),
                    roles: ['super_admin', 'owner'],
                },
            ].filter(item => item.roles?.includes(role)),
        },
        {
            title: 'Data Warehouse',
            href: '#',
            icon: Database,
            roles: ['super_admin', 'owner'],
            items: [
                {
                    title: 'Visualisasi Data',
                    href: route('datawarehouse.index', undefined, false),
                    roles: ['super_admin', 'owner'],
                },
            ].filter(item => item.roles?.includes(role)),
        },
    ].filter(item => item.roles?.includes(role) && (!item.items || item.items.length > 0));
};

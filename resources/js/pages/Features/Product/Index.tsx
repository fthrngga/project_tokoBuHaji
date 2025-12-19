import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Pagination, BreadcrumbItem, Category } from '@/types';
import { route } from 'ziggy-js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Pencil, PlusCircle, Search, ArrowUpDown, Trash2, CheckCircle, XCircle, Star } from 'lucide-react';
import debounce from 'lodash.debounce';

// Sesuaikan interface Product untuk menyertakan relasi 'category'
interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    is_featured: boolean;
    is_published: boolean;
    category: Category; // Relasi dengan tabel Kategori
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('products.index'),
    },
];

// SOLUSI: Definisikan nilai default untuk paginator
const defaultPaginator: Pagination<Product> = {
    data: [],
    from: 0,
    to: 0,
    total: 0,
    prev_page_url: null,
    next_page_url: null,
    links: [],
    current_page: 1,
    last_page: 1,
    per_page: 0,
    path: '',
};

export default function Index({ auth, items = defaultPaginator, filters }: PageProps<{ items: Pagination<Product>, filters: any }>) {
    const [search, setSearch] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
    const [sortDir, setSortDir] = useState(filters.sort_dir || 'desc');

    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(route('products.index'), { search: value, sort_by: sortBy, sort_dir: sortDir }, { preserveState: true, replace: true });
        }, 300),
        [sortBy, sortDir]
    );

    useEffect(() => {
        debouncedSearch(search);
        return () => debouncedSearch.cancel();
    }, [search, debouncedSearch]);

    const handleSort = (newSortBy: string) => {
        const newSortDir = sortBy === newSortBy && sortDir === 'asc' ? 'desc' : 'asc';
        setSortBy(newSortBy);
        setSortDir(newSortDir);
        router.get(route('products.index'), { search, sort_by: newSortBy, sort_dir: newSortDir }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="p-4 sm:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>Kelola semua produk Anda di sini.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between gap-2 py-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Cari produk..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button asChild>
                                <Link href={route('products.create')}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Tambah Produk
                                </Link>
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Produk</TableHead>
                                        <TableHead className="text-center">SKU</TableHead>
                                        <TableHead className="text-center">Kategori</TableHead>
                                        <TableHead className="text-center">
                                            <Button variant="ghost" onClick={() => handleSort('price')} className="justify-center w-full">
                                                Harga
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <Button variant="ghost" onClick={() => handleSort('stock')} className="justify-center w-full">
                                                Stok
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.data.map((item: Product) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">{item.sku}</Badge>
                                            </TableCell>
                                            <TableCell className="text-center">{item.category.name}</TableCell>
                                            <TableCell className="text-center">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}</TableCell>
                                            <TableCell className="text-center">{item.stock}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {item.is_published ? (
                                                        <Badge variant="success"><CheckCircle className="mr-1 h-3 w-3" /> Published</Badge>
                                                    ) : (
                                                        <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Draft</Badge>
                                                    )}
                                                    {item.is_featured && <Badge variant="secondary"><Star className="mr-1 h-3 w-3" /> Unggulan</Badge>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('products.edit', item.id)}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                <span>Edit</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" asChild>
                                                            <Link href={route('products.destroy', item.id)} method="delete" as="button">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                <span>Delete</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="text-sm text-muted-foreground">
                                Menampilkan {items.from}-{items.to} dari {items.total} data
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" asChild disabled={!items.prev_page_url}><Link href={items.prev_page_url ?? '#'}>Sebelumnya</Link></Button>
                                <Button variant="outline" size="sm" asChild disabled={!items.next_page_url}><Link href={items.next_page_url ?? '#'}>Berikutnya</Link></Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}


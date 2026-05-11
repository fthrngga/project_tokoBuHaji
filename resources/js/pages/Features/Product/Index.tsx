import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Category, BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, PlusCircle, MoreHorizontal, Pencil, Trash2, AlertTriangle, Package } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    minimum_stock?: number;
    is_published: boolean;
    category?: Category;
}

interface Paginator<T> {
    data: T[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
}

interface ProductIndexProps extends PageProps {
    products: Paginator<Product> | Product[]; 
    filters?: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: route('products.index'),
    },
];

export default function Index({ products }: ProductIndexProps) {
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { data: restockData, setData: setRestockData, post: postRestock, processing: restockProcessing, reset } = useForm({
        requested_quantity: '',
        notes: ''
    });

    const getProductsData = () => {
        if (!products) return [];
        if (Array.isArray(products)) return products;
        return products.data || [];
    };

    const productsList = getProductsData();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };

    const deleteProduct = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(route('products.destroy', id), {
                onSuccess: () => toast.success('Produk berhasil dihapus!'),
            });
        }
    };

    const openRestockModal = (product: Product) => {
        setSelectedProduct(product);
        setRestockData({ requested_quantity: '', notes: '' });
        setIsRestockOpen(true);
    };

    const submitRestock = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        
        postRestock(route('products.restock', selectedProduct.id), {
            onSuccess: () => {
                setIsRestockOpen(false);
                reset();
                toast.success('Permintaan restock berhasil dikirim!');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-64"
                            />
                        </div>
                    </div>
                    <Button asChild className="gap-2 bg-black text-white hover:bg-gray-800">
                        <Link href={route('products.create')}>
                            <PlusCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Add Product</span>
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            Manage your product catalog and monitor inventory.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Nama Produk</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead className="text-center">Stok</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productsList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center">
                                                <Package className="h-8 w-8 mb-2 opacity-20" />
                                                Data produk tidak ditemukan.
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    productsList.map((product) => {
                                        const minStock = product.minimum_stock ?? 5;
                                        const isLowStock = product.stock <= minStock;

                                        return (
                                            <TableRow key={product.id} className={isLowStock ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}>
                                                <TableCell className="font-medium text-muted-foreground">{product.sku}</TableCell>
                                                <TableCell className="font-medium">{product.name}</TableCell>
                                                <TableCell>{product.category?.name || '-'}</TableCell>
                                                <TableCell>{formatCurrency(product.price)}</TableCell>
                                                
                                                <TableCell className="text-center">
                                                    <span className={isLowStock ? 'text-amber-600 font-bold' : ''}>
                                                        {product.stock}
                                                    </span>
                                                    {isLowStock && (
                                                        <Badge variant="outline" className="ml-2 border-amber-300 text-amber-700 bg-amber-100 text-[10px]">
                                                            LOW
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                
                                                <TableCell className="text-center">
                                                    <Badge variant={product.is_published ? 'default' : 'secondary'}>
                                                        {product.is_published ? 'Publik' : 'Draft'}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {isLowStock && (
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-100" 
                                                                onClick={() => openRestockModal(product)} 
                                                                title="Ajukan Restock"
                                                            >
                                                                <AlertTriangle className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={route('products.edit', product.id)} className="flex items-center cursor-pointer">
                                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => deleteProduct(product.id)} className="text-red-600 focus:text-red-600 cursor-pointer">
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Modal Restock */}
            <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Permintaan Restock
                        </DialogTitle>
                        <DialogDescription>
                            Ajukan permintaan penambahan stok ke bagian Finance untuk produk <strong>{selectedProduct?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitRestock} className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Sisa Stok</Label>
                                <Input value={selectedProduct?.stock || 0} disabled className="bg-muted text-red-600 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label>Jumlah Tambahan <span className="text-red-500">*</span></Label>
                                <Input 
                                    type="number" 
                                    min="1" 
                                    value={restockData.requested_quantity} 
                                    onChange={e => setRestockData('requested_quantity', e.target.value)} 
                                    required 
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Catatan (Opsional)</Label>
                            <Textarea 
                                value={restockData.notes} 
                                onChange={e => setRestockData('notes', e.target.value)} 
                                rows={2}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsRestockOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={restockProcessing}>Kirim Request</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
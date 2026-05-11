import React, { useState, useMemo } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Minus, Trash2, ShoppingCart, User as UserIcon, Package } from "lucide-react";
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    stock: number;
    images?: { image_path: string }[];
    category?: { name: string };
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

interface CartItem extends Product {
    quantity: number;
}

export default function Index({ products, customers }: PageProps<{ products: Product[], customers: Customer[] }>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: '',
        customer_name: '',
        customer_phone: '',
        items: [] as { id: number, quantity: number }[],
        payment_method: 'tunai',
        amount_paid: '',
    });

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return products;
        const query = searchQuery.toLowerCase();
        return products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            (p.sku && p.sku.toLowerCase().includes(query)) ||
            (p.category && p.category.name.toLowerCase().includes(query))
        );
    }, [products, searchQuery]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) {
                    toast.error(`Stok tidak cukup! Hanya tersisa ${product.stock} unit untuk ${product.name}`);
                    return prev;
                }
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity <= 0) return item;
                if (newQuantity > item.stock) {
                    toast.error("Tidak dapat menambah melebihi stok yang tersedia.");
                    return item;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const totalAmount = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            toast.warning("Keranjang belanja masih kosong!");
            return;
        }

        const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
        
        const payloadData = {
            ...data,
            items: items,
            amount_paid: data.amount_paid || totalAmount.toString(),
            customer_name: data.customer_id ? undefined : data.customer_name,
        };

        router.post(route('admin.pos.store'), payloadData, {
            onSuccess: () => {
                setCart([]);
                reset();
                toast.success("Transaksi POS berhasil diproses dan dicatat!");
            },
            onError: (err) => {
                const errorMessage = Object.values(err)[0] as string;
                toast.error("Transaksi Gagal: " + errorMessage);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Kasir (POS)', href: route('admin.pos.index') }]}>
            <Head title="Kasir (POS)" />
            <div className="flex h-[calc(100vh-theme(spacing.16)-theme(spacing.8))] flex-col lg:flex-row gap-6 p-4 md:p-6 overflow-hidden">
                
                {/* Kiri: Daftar Produk */}
                <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Cari nama produk, SKU, atau kategori..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-1"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                                <Package className="h-10 w-10 mb-2 opacity-20" />
                                <p>Tidak ada produk yang ditemukan.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map(product => (
                                    <div 
                                        key={product.id} 
                                        onClick={() => addToCart(product)}
                                        className="group cursor-pointer rounded-xl border bg-card hover:border-blue-500 hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
                                    >
                                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                            {product.images && product.images.length > 0 ? (
                                                <img 
                                                    src={`/storage/${product.images[0].image_path}`} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <Package className="h-8 w-8 text-slate-300" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
                                                Stok: {product.stock}
                                            </div>
                                        </div>
                                        <div className="p-3 flex flex-col flex-1 justify-between">
                                            <div>
                                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 truncate">{product.category?.name}</p>
                                                <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{product.name}</h3>
                                            </div>
                                            <p className="font-bold text-sm mt-2">{formatCurrency(product.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Kanan: Keranjang & Pembayaran */}
                <div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col min-h-0 bg-white dark:bg-slate-900 rounded-xl border shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-blue-600" />
                            <h2 className="font-semibold text-lg">Keranjang</h2>
                        </div>
                        <Badge variant="secondary">{cart.reduce((acc, item) => acc + item.quantity, 0)} Item</Badge>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                                <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                                <p>Keranjang masih kosong</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-3 items-center group">
                                        <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                                            {item.images && item.images.length > 0 ? (
                                                <img src={`/storage/${item.images[0].image_path}`} className="w-full h-full object-cover" />
                                            ) : (
                                                <Package className="h-6 w-6 text-slate-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                            <p className="text-xs text-slate-500">{formatCurrency(item.price)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, -1)}>
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-4 text-center font-medium text-sm">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, 1)}>
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t bg-slate-50 dark:bg-slate-800/50 rounded-b-xl">
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold text-slate-600 dark:text-slate-300">Total Pembayaran</span>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalAmount)}</span>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-slate-500">Pelanggan</Label>
                                    <Select value={data.customer_id} onValueChange={(val) => setData('customer_id', val === 'walk_in' ? '' : val)}>
                                        <SelectTrigger className="bg-white dark:bg-slate-900">
                                            <SelectValue placeholder="Walk-in Customer (Baru)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="walk_in">Walk-in Customer (Baru)</SelectItem>
                                            {customers.map(c => (
                                                <SelectItem key={c.id} value={c.id.toString()}>{c.name} {c.phone ? `(${c.phone})` : ''}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {!data.customer_id && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1.5">
                                            <Input 
                                                placeholder="Nama Pelanggan" 
                                                value={data.customer_name} 
                                                onChange={e => setData('customer_name', e.target.value)}
                                                className="bg-white dark:bg-slate-900 text-sm"
                                                required={!data.customer_id}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Input 
                                                placeholder="No. WhatsApp" 
                                                value={data.customer_phone} 
                                                onChange={e => setData('customer_phone', e.target.value)}
                                                className="bg-white dark:bg-slate-900 text-sm"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-slate-500">Metode Bayar</Label>
                                        <Select value={data.payment_method} onValueChange={val => setData('payment_method', val)}>
                                            <SelectTrigger className="bg-white dark:bg-slate-900">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tunai">Tunai / Cash</SelectItem>
                                                <SelectItem value="transfer">Transfer Bank</SelectItem>
                                                <SelectItem value="qris">QRIS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-slate-500">Uang Diterima (Opsional)</Label>
                                        <Input 
                                            type="number"
                                            placeholder={totalAmount.toString()}
                                            value={data.amount_paid}
                                            onChange={e => setData('amount_paid', e.target.value)}
                                            className="bg-white dark:bg-slate-900 text-sm font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-12 text-base font-semibold mt-2" 
                                disabled={processing || cart.length === 0}
                            >
                                {processing ? 'Memproses...' : 'Proses Pembayaran'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
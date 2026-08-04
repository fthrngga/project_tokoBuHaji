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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    selling_price: number;
    stock: number;
    images?: { image_path: string }[];
    category?: { name: string };
    variants?: { id: number; sku: string; stock: number; options: Record<string, string>; selling_price: number }[];
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

interface CartItem extends Product {
    cart_id: string;
    product_variant_id: number | null;
    variant_options?: Record<string, string>;
    quantity: number;
}

export default function Index({ products, customers }: PageProps<{ products: Product[], customers: Customer[] }>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: '',
        customer_name: '',
        customer_phone: '',
        payment_type: 'cash',
        payment_method: 'tunai',
        amount_paid: '',
        down_payment: '',
        duration_months: '1',
        installment_type: 'fixed',
        items: [] as { id: number, product_variant_id: number | null, quantity: number }[],
    });

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedVariantId, setSelectedVariantId] = useState<string>('');

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return products;
        const query = searchQuery.toLowerCase();
        return products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            (p.sku && p.sku.toLowerCase().includes(query)) ||
            (p.category && p.category.name.toLowerCase().includes(query))
        );
    }, [products, searchQuery]);

    const handleProductClick = (product: Product) => {
        if (product.variants && product.variants.length > 0) {
            setSelectedProduct(product);
            setSelectedVariantId('');
        } else {
            addToCart(product, null);
        }
    };

    const confirmVariantSelection = () => {
        if (!selectedProduct || !selectedVariantId) return;
        const variant = selectedProduct.variants?.find(v => v.id.toString() === selectedVariantId);
        if (variant) {
            addToCart(selectedProduct, variant);
        }
        setSelectedProduct(null);
    };

    const addToCart = (product: Product, variant: { id: number, stock: number, options: Record<string, string>, selling_price: number } | null) => {
        setCart(prev => {
            const cartId = variant ? `${product.id}-${variant.id}` : `${product.id}`;
            const existing = prev.find(item => item.cart_id === cartId);
            const stockToCheck = variant ? variant.stock : product.stock;
            
            if (existing) {
                if (existing.quantity >= stockToCheck && stockToCheck > 0) {
                    toast.error(`Stok tidak cukup! Hanya tersisa ${stockToCheck} unit.`);
                    return prev;
                }
                return prev.map(item => item.cart_id === cartId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { 
                ...product, 
                cart_id: cartId, 
                product_variant_id: variant ? variant.id : null,
                variant_options: variant ? variant.options : undefined,
                price: variant ? variant.selling_price : product.selling_price,
                quantity: 1 
            }];
        });
    };

    const updateQuantity = (cartId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.cart_id === cartId) {
                const newQuantity = item.quantity + delta;
                if (newQuantity <= 0) return item;
                const maxStock = item.product_variant_id ? 
                    (item.variants?.find(v => v.id === item.product_variant_id)?.stock || 0) : 
                    item.stock;

                if (newQuantity > maxStock && maxStock > 0) {
                    toast.error("Tidak dapat menambah melebihi stok yang tersedia.");
                    return item;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (cartId: string) => {
        setCart(prev => prev.filter(item => item.cart_id !== cartId));
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

        const items = cart.map(item => ({ id: item.id, product_variant_id: item.product_variant_id, quantity: item.quantity }));
        
        let payloadData: any = {
            ...data,
            items: items,
            customer_name: data.customer_id ? undefined : data.customer_name,
        };

        if (data.payment_type === 'cash') {
            payloadData.amount_paid = data.amount_paid || totalAmount.toString();
        } else {
            payloadData.down_payment = data.down_payment || '0';
        }

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
                <div className="flex-1 flex flex-col min-h-0 bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Cari nama produk, SKU, atau kategori..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-secondary border-none focus-visible:ring-1"
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
                                        onClick={() => handleProductClick(product)}
                                        className="group cursor-pointer rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
                                    >
                                        <div className="aspect-square bg-secondary relative overflow-hidden">
                                            {product.images && product.images.length > 0 ? (
                                                <img 
                                                    src={`/storage/${product.images[0].image_path}`} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover bg-white transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <Package className="h-8 w-8 text-slate-300" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm text-foreground">
                                                Stok: {product.stock}
                                            </div>
                                        </div>
                                        <div className="p-3 flex flex-col flex-1 justify-between">
                                            <div>
                                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 truncate">{product.category?.name}</p>
                                                <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{product.name}</h3>
                                            </div>
                                            <p className="font-bold text-sm mt-2">{formatCurrency(product.selling_price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Kanan: Keranjang & Pembayaran */}
                <div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col min-h-0 bg-card text-card-foreground rounded-xl border border-border shadow-sm">
                    <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/50 rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-primary" />
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
                                    <div key={item.cart_id} className="flex gap-3 items-center group">
                                        <div className="w-12 h-12 rounded-md bg-secondary overflow-hidden shrink-0 flex items-center justify-center">
                                            {item.images && item.images.length > 0 ? (
                                                <img src={`/storage/${item.images[0].image_path}`} className="w-full h-full object-cover" />
                                            ) : (
                                                <Package className="h-6 w-6 text-slate-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                            {item.variant_options && (
                                                <div className="flex flex-wrap gap-1 mt-0.5">
                                                    {Object.entries(item.variant_options).map(([k, v]) => (
                                                        <span key={k} className="inline-flex items-center text-[9px] font-medium text-blue-800 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 px-1 rounded">
                                                            {k}: {v as string}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-500">{formatCurrency(item.price)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.cart_id, -1)}>
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-4 text-center font-medium text-sm">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.cart_id, 1)}>
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={() => removeFromCart(item.cart_id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-border bg-secondary/30 rounded-b-xl relative shrink-0 overflow-y-auto max-h-[55vh] custom-scrollbar">
                        {cart.length === 0 && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[1px] rounded-b-xl">
                                <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1.5 rounded-full shadow-sm border border-border">Pilih produk terlebih dahulu</span>
                            </div>
                        )}
                        <form onSubmit={handleCheckout} className={`space-y-4 ${cart.length === 0 ? 'opacity-40 pointer-events-none' : ''}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold text-muted-foreground">Total Pembayaran</span>
                                <span className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</span>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs text-muted-foreground">Pelanggan</Label>
                                    <Select value={data.customer_id} onValueChange={(val) => setData('customer_id', val === 'walk_in' ? '' : val)}>
                                        <SelectTrigger className="bg-card">
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
                                                className="bg-card text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Input 
                                                placeholder="No. WhatsApp" 
                                                value={data.customer_phone} 
                                                onChange={e => setData('customer_phone', e.target.value)}
                                                className="bg-card text-sm"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4 pt-4 border-t border-border mt-4">
                                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                                        <span className="text-muted-foreground font-medium">Total Belanja</span>
                                        <span className="text-2xl font-bold text-red-500">{formatCurrency(totalAmount)}</span>
                                    </div>
                                    
                                    <div className="space-y-3 pt-2">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Jenis Pembayaran</Label>
                                            <Select value={data.payment_type} onValueChange={val => setData('payment_type', val)}>
                                                <SelectTrigger className="bg-card text-sm font-medium">
                                                    <SelectValue placeholder="Pilih Jenis" />
                                                </SelectTrigger>
                                                    <SelectContent className="z-[9999]">
                                                        <SelectItem value="cash">Bayar Penuh (Cash)</SelectItem>
                                                        <SelectItem value="credit">Kredit / Cicilan</SelectItem>
                                                        <SelectItem value="cash_gantung">Cash Gantung</SelectItem>
                                                    </SelectContent>
                                            </Select>
                                        </div>

                                        {data.payment_type === 'cash' ? (
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs text-muted-foreground">Metode Bayar</Label>
                                                    <Select value={data.payment_method} onValueChange={val => setData('payment_method', val)}>
                                                        <SelectTrigger className="bg-card text-sm font-medium">
                                                            <SelectValue placeholder="Pilih Metode" />
                                                        </SelectTrigger>
                                                        <SelectContent className="z-[9999]">
                                                            <SelectItem value="tunai">Tunai / Cash</SelectItem>
                                                            <SelectItem value="transfer">Transfer Bank</SelectItem>
                                                            <SelectItem value="qris">QRIS</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs text-muted-foreground">Uang Diterima (Opsional)</Label>
                                                    <Input 
                                                        type="number"
                                                        placeholder={totalAmount.toString()}
                                                        value={data.amount_paid}
                                                        onChange={e => setData('amount_paid', e.target.value)}
                                                        className="bg-card text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                        ) : data.payment_type === 'credit' ? (
                                            <div className="space-y-3 border border-border p-3 rounded-lg bg-card/50">
                                                <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                                                    <span className="text-muted-foreground">Harga Kredit (Total x 1.5)</span>
                                                    <span className="font-semibold text-red-500">{formatCurrency(totalAmount * 1.5)}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs text-muted-foreground">Metode Bayar DP</Label>
                                                        <Select value={data.payment_method} onValueChange={val => setData('payment_method', val)}>
                                                            <SelectTrigger className="bg-card text-sm font-medium">
                                                                <SelectValue placeholder="Pilih Metode" />
                                                            </SelectTrigger>
                                                            <SelectContent className="z-[9999]">
                                                                <SelectItem value="tunai">Tunai / Cash</SelectItem>
                                                                <SelectItem value="transfer">Transfer Bank</SelectItem>
                                                                <SelectItem value="qris">QRIS</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs text-muted-foreground">Uang Muka / DP</Label>
                                                        <Input 
                                                            type="number"
                                                            placeholder="0"
                                                            value={data.down_payment}
                                                            onChange={e => setData('down_payment', e.target.value)}
                                                            className="bg-card text-sm font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-sm pt-1">
                                                    <span className="text-muted-foreground">Tenor Cicilan</span>
                                                    <span className="font-semibold">10 Bulan</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">Angsuran per Bulan</span>
                                                    <span className="font-semibold">{formatCurrency((totalAmount * 1.5 - (parseFloat(data.down_payment || '0'))) / 10)}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 border border-border p-3 rounded-lg bg-card/50">
                                                <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                                                    <span className="text-muted-foreground">Harga Cash Gantung (Total + 15%)</span>
                                                    <span className="font-semibold text-red-500">{formatCurrency(totalAmount * 1.15)}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs text-muted-foreground">Tenor Cicilan</Label>
                                                        <Select value={data.duration_months} onValueChange={val => setData('duration_months', val)}>
                                                            <SelectTrigger className="bg-card text-sm font-medium">
                                                                <SelectValue placeholder="Pilih Tenor" />
                                                            </SelectTrigger>
                                                            <SelectContent className="z-[9999]">
                                                                <SelectItem value="1">1 Bulan</SelectItem>
                                                                <SelectItem value="2">2 Bulan</SelectItem>
                                                                <SelectItem value="3">3 Bulan</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs text-muted-foreground">Tipe Cicilan</Label>
                                                        <Select value={data.installment_type} onValueChange={val => setData('installment_type', val)}>
                                                            <SelectTrigger className="bg-card text-sm font-medium">
                                                                <SelectValue placeholder="Pilih Tipe" />
                                                            </SelectTrigger>
                                                            <SelectContent className="z-[9999]">
                                                                <SelectItem value="fixed">Tetap (Dibagi Rata)</SelectItem>
                                                                <SelectItem value="flexible">Bebas / Suka-suka</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs text-muted-foreground">Metode Bayar DP</Label>
                                                        <Select value={data.payment_method} onValueChange={val => setData('payment_method', val)}>
                                                            <SelectTrigger className="bg-card text-sm font-medium">
                                                                <SelectValue placeholder="Pilih Metode" />
                                                            </SelectTrigger>
                                                            <SelectContent className="z-[9999]">
                                                                <SelectItem value="tunai">Tunai / Cash</SelectItem>
                                                                <SelectItem value="transfer">Transfer Bank</SelectItem>
                                                                <SelectItem value="qris">QRIS</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-xs text-muted-foreground">Uang Muka / DP</Label>
                                                        <Input 
                                                            type="number"
                                                            placeholder="0"
                                                            value={data.down_payment}
                                                            onChange={e => setData('down_payment', e.target.value)}
                                                            className="bg-card text-sm font-medium"
                                                        />
                                                    </div>
                                                </div>
                                                {data.installment_type === 'fixed' && (
                                                    <div className="flex justify-between items-center text-sm pt-1">
                                                        <span className="text-muted-foreground">Angsuran per Bulan</span>
                                                        <span className="font-semibold">{formatCurrency((totalAmount * 1.15 - (parseFloat(data.down_payment || '0'))) / parseInt(data.duration_months || '1'))}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
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
            
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pilih Varian Produk</DialogTitle>
                        <DialogDescription>
                            {selectedProduct?.name} memiliki beberapa variasi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <Label>Pilihan Varian</Label>
                        <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Varian" />
                            </SelectTrigger>
                            <SelectContent className="z-[9999]">
                                {selectedProduct?.variants?.map(variant => {
                                    const optionStr = Object.entries(variant.options).map(([k, v]) => `${k}: ${v}`).join(', ');
                                    const stockStr = variant.stock > 0 ? `Stok: ${variant.stock}` : 'Pre-order';
                                    return (
                                        <SelectItem key={variant.id} value={variant.id.toString()}>
                                            {optionStr} ({stockStr})
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedProduct(null)}>Batal</Button>
                        <Button onClick={confirmVariantSelection} disabled={!selectedVariantId}>Tambahkan ke Keranjang</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
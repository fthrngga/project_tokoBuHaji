import { Head, usePage, Link, router } from "@inertiajs/react";
import { type CartItem, type SharedData } from "@/types";
import { route } from "ziggy-js";
import Header from "@/pages/welcome/Partials/Header";
import Footer from "@/pages/welcome/Partials/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { Toaster, toast } from 'sonner';
import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper function local to avoid import issues
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

interface Props {
    cartItems: CartItem[];
    total: number;
}

export default function Index({ cartItems, total }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    // Filter selected items to ensure they still exist in cartItems (cleanup on delete)
    useEffect(() => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            const currentIds = new Set(cartItems.map(item => item.id));
            let changed = false;
            prev.forEach(id => {
                if (!currentIds.has(id)) {
                    newSet.delete(id);
                    changed = true;
                }
            });
            return changed ? newSet : prev;
        });
    }, [cartItems]);

    // Calculate total based on selected items
    const checkedTotal = cartItems
        .filter(item => selectedItems.has(item.id))
        .reduce((sum, item) => {
            const price = item.variant?.selling_price || item.product.selling_price;
            return sum + (item.quantity * price);
        }, 0);

    const toggleItem = (id: number) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedItems(newSelected);
    };

    const toggleAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(new Set(cartItems.map(item => item.id)));
        } else {
            setSelectedItems(new Set());
        }
    };

    const isAllSelected = cartItems.length > 0 && selectedItems.size === cartItems.length;

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        router.patch(route('cart.update', id), { quantity: newQuantity }, {
            preserveScroll: true,
            onSuccess: () => toast.success("Jumlah produk diperbarui"),
            onError: () => toast.error("Gagal memperbarui jumlah"),
        });
    };

    const confirmDelete = (id: number) => {
        setItemToDelete(id);
    };

    const handleDelete = () => {
        if (itemToDelete !== null) {
            router.delete(route('cart.destroy', itemToDelete), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Item dihapus dari keranjang");
                    setItemToDelete(null);
                },
                onError: () => {
                    toast.error("Gagal menghapus item");
                    setItemToDelete(null);
                }
            });
        }
    };

    const handleCheckout = () => {
        if (selectedItems.size === 0) {
            toast.error("Pilih setidaknya satu produk untuk checkout");
            return;
        }

        const itemsParam = Array.from(selectedItems).join(',');
        router.visit(route('checkout.index'), {
            method: 'get',
            data: { items: itemsParam }
        });
    };

    return (
        <>
            <Head title="Keranjang Belanja - Haji Elektronik" />
            <Toaster richColors closeButton position="top-center" />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                <Header user={auth.user} />

                <main className="flex-1 py-12 pb-32">
                    <div className="container mx-auto px-8 md:px-12 lg:px-24">
                        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Keranjang</h1>

                        {cartItems.length > 0 ? (
                            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                                {/* List Keranjang */}
                                <div className="lg:col-span-8">
                                    {/* Header Tabel (Desktop) */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                        <div className="col-span-1 text-center">
                                            <Checkbox
                                                checked={isAllSelected}
                                                onCheckedChange={(checked) => toggleAll(checked === true)}
                                            />
                                        </div>
                                        <div className="col-span-5">Produk</div>
                                        <div className="col-span-2 text-right">Harga</div>
                                        <div className="col-span-2 text-center">Jumlah</div>
                                        <div className="col-span-2 text-right">Subtotal</div>
                                    </div>

                                    <div className="mt-4 space-y-6">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                                                <div className="hidden md:block col-span-1 text-center">
                                                    <Checkbox
                                                        id={`check-${item.id}`}
                                                        checked={selectedItems.has(item.id)}
                                                        onCheckedChange={() => toggleItem(item.id)}
                                                    />
                                                </div>

                                                <div className="col-span-1 md:col-span-5 flex gap-4">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-slate-50 dark:bg-slate-900 dark:border-gray-700">
                                                        <img
                                                            src={item.product.images.length > 0 ? `/storage/${item.product.images[0].image_path}` : 'https://placehold.co/100x100?text=No+Image'}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-contain p-2"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                                            <Link href={route('products.show', item.product.slug)} className="hover:underline">
                                                                {item.product.name}
                                                            </Link>
                                                        </h3>
                                                        {item.variant && (
                                                            <div className="mt-1 flex flex-wrap gap-1">
                                                                {Object.entries(item.variant.options).map(([k, v]) => (
                                                                    <span key={k} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                                        {k}: {v}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                            {item.variant ? (
                                                                item.variant.stock > 0 ? `Stok tersedia: ${item.variant.stock}` : <span className="text-amber-600 font-medium">Pre-order / Menunggu Stok</span>
                                                            ) : (
                                                                item.product.stock > 0 ? `Stok tersedia: ${item.product.stock}` : <span className="text-red-500 font-medium">Stok Habis</span>
                                                            )}
                                                        </p>
                                                        <button
                                                            onClick={() => confirmDelete(item.id)}
                                                            className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center md:hidden"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1" /> Hapus
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-span-1 md:col-span-2 text-right font-medium md:font-normal">
                                                    <span className="md:hidden text-gray-500 mr-2">Harga:</span>
                                                    {formatCurrency(item.variant?.selling_price || item.product.selling_price)}
                                                </div>

                                                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center items-center gap-2">
                                                    <span className="md:hidden text-gray-500 mr-2">Jumlah:</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.variant ? (item.variant.stock > 0 && item.quantity >= item.variant.stock) : (item.quantity >= item.product.stock)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                                                    <span className="md:hidden text-gray-500">Subtotal:</span>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-gray-900 dark:text-white">
                                                            {formatCurrency(item.quantity * (item.variant?.selling_price || item.product.selling_price))}
                                                        </span>
                                                        <button
                                                            onClick={() => confirmDelete(item.id)}
                                                            className="text-gray-400 hover:text-red-500 hidden md:block"
                                                            title="Hapus item"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ringkasan Pesanan */}
                                <div className="mt-12 lg:mt-0 lg:col-span-4">
                                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 md:p-8">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Ringkasan Pesanan</h2>

                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                                                <dt className="text-base text-gray-600 dark:text-gray-400">Total Harga</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(checkedTotal)}</dd>
                                            </div>
                                            <div className="pt-4 flex items-center justify-between">
                                                <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                                <dd className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(checkedTotal)}</dd>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <Button
                                                className="w-full h-12 text-base rounded-lg bg-gray-700 hover:bg-gray-800 text-white"
                                                onClick={handleCheckout}
                                                disabled={selectedItems.size === 0}
                                            >
                                                CHECKOUT <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                            <p className="mt-4 text-xs text-center text-gray-500">
                                                Harga belum termasuk ongkos kirim.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 px-4">
                                <div className="mx-auto h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                                    <div className="text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Keranjang Belanja Kosong</h2>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                    Sepertinya Anda belum menambahkan produk apapun ke keranjang.
                                </p>
                                <Link href="/" className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                    Mulai Belanja
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />

                <AlertDialog open={itemToDelete !== null} onOpenChange={(open) => !open && setItemToDelete(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Item ini akan dihapus permanen dari keranjang belanja Anda. Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
}

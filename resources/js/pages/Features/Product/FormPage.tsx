import React, { useState, useEffect } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem, Category, ProductImage } from '@/types';
import { route } from 'ziggy-js';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { PlusCircle, X, UploadCloud, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Toaster, toast } from 'sonner';

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    weight: number;
    specifications: Record<string, any> | string;
    is_featured: boolean;
    is_published: boolean;
    images: ProductImage[];
    custom_options?: { name: string; options: string[] }[];
    variants?: { id?: number; sku: string | null; stock: number; options: Record<string, string> }[];
}

export default function FormPage({ auth, item, categories = [] }: PageProps<{ item?: Product; categories: Category[] }>) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: route('products.index') },
        { title: item ? 'Edit' : 'Create', href: item ? route('products.edit', item.id) : route('products.create') },
    ];

    const { data, setData, post, processing, errors, progress, transform } = useForm({
        name: item?.name ?? '',
        slug: item?.slug ?? '',
        sku: item?.sku ?? '',
        description: item?.description ?? '',
        price: item?.price ?? 0,
        stock: item?.stock ?? 0,
        category_id: item?.category_id ?? '',
        weight: item?.weight ?? 0,
        specifications: '{}',
        is_featured: item?.is_featured ?? false,
        is_published: item?.is_published ?? true,
        images: [] as File[],
        custom_options: (item?.custom_options ?? []).map((opt: any) => ({
            name: opt.name,
            options_string: (opt.options || []).join(', ')
        })),
        variants: item?.variants ?? [],
    });

    transform((data) => ({
        ...data,
        _method: item ? 'PUT' : 'POST',
        custom_options: data.custom_options.map((opt: any) => ({
            name: opt.name,
            options: (opt.options_string || '').split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
        }))
    }));

    const [specItems, setSpecItems] = useState<{ key: string; value: string }[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [imageToDelete, setImageToDelete] = useState<ProductImage | null>(null); // State untuk dialog konfirmasi

    useEffect(() => {
        let parsedSpecs: Record<string, any> = {};
        if (item?.specifications) {
            if (typeof item.specifications === 'string') {
                try { parsedSpecs = JSON.parse(item.specifications); } catch (e) {}
            } else {
                parsedSpecs = item.specifications;
            }
        }
        const specArray = Object.entries(parsedSpecs).map(([key, value]) => ({ key, value: String(value) }));
        setSpecItems(specArray.length > 0 ? specArray : [{ key: '', value: '' }]);
    }, [item]);

    useEffect(() => {
        const newSpecifications = specItems.reduce((acc, currentItem) => {
            if (currentItem.key) acc[currentItem.key] = currentItem.value;
            return acc;
        }, {} as Record<string, string>);
        setData('specifications', JSON.stringify(newSpecifications));
    }, [specItems]);

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newItems = [...specItems];
        newItems[index][field] = value;
        setSpecItems(newItems);
    };
    const addSpecItem = () => setSpecItems([...specItems, { key: '', value: '' }]);
    const removeSpecItem = (index: number) => setSpecItems(specItems.filter((_, i) => i !== index));

    // **LOGIKA UNGGAH GAMBAR DIPERBAIKI**
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        // Tambahkan file baru ke yang sudah ada, jangan ganti
        setData('images', [...data.images, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const removeNewImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData('images', newImages);
        setImagePreviews(newPreviews);
    };

    useEffect(() => {
        return () => {
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const url = item ? route('products.update', item.id) : route('products.store');
        
        post(url, {
            forceFormData: true,
            onSuccess: () => {
                toast.success(`Produk berhasil di${item ? 'update' : 'tambahkan'}!`);
            },
            onError: (errs) => {
                console.error("Validation errors:", errs);
                toast.error("Gagal menyimpan produk. Periksa kembali form Anda.");
            }
        });
    }

    // **FUNGSI BARU** untuk menjalankan aksi hapus setelah konfirmasi
    const handleDeleteConfirmation = () => {
        if (!imageToDelete) return;
        router.delete(route('products.images.destroy', imageToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setImageToDelete(null), // Tutup dialog setelah sukses
        });
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={(item ? 'Edit' : 'Create') + ' Product'} />
                <Toaster richColors closeButton position="top-center" />
                <div className="p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Detail Produk</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2"><Label htmlFor="name">Nama Produk</Label><Input id="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                                            <div className="space-y-2"><Label htmlFor="sku">SKU</Label><Input id="sku" type="text" value={data.sku} onChange={e => setData('sku', e.target.value)} /></div>
                                        </div>
                                        <div className="space-y-2"><Label htmlFor="description">Deskripsi</Label><Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={5} /></div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="price">Harga Modal (Dasar)</Label>
                                                <div className="text-[10px] text-muted-foreground leading-tight">Sistem akan +10% untuk Harga Jual.</div>
                                                <Input id="price" type="number" value={data.price} onChange={e => setData('price', parseInt(e.target.value))} />
                                            </div>
                                            <div className="space-y-2"><Label htmlFor="stock">Stok</Label><Input id="stock" type="number" value={data.stock} onChange={e => setData('stock', parseInt(e.target.value))} /></div>
                                            <div className="space-y-2"><Label htmlFor="weight">Berat (gram)</Label><Input id="weight" type="number" value={data.weight} onChange={e => setData('weight', parseInt(e.target.value))} /></div>
                                            <div className="space-y-2"><Label htmlFor="category_id">Kategori</Label><Select value={String(data.category_id)} onValueChange={value => setData('category_id', parseInt(value))}><SelectTrigger><SelectValue placeholder="Pilih kategori..." /></SelectTrigger><SelectContent>{categories.map(category => (<SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>))}</SelectContent></Select></div>
                                        </div>
                                        <div className="space-y-2"><Label>Spesifikasi</Label><div className="space-y-3 rounded-md border border-border bg-secondary/20 p-4">{specItems.map((spec, index) => (<div key={index} className="flex items-center gap-2"><Input placeholder="Key (e.g., Dimensi)" value={spec.key} onChange={(e) => handleSpecChange(index, 'key', e.target.value)} className="flex-1 bg-background" /><Input placeholder="Value (e.g., 120cm x 60cm)" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} className="flex-1 bg-background" /><Button type="button" variant="ghost" size="icon" onClick={() => removeSpecItem(index)} className="text-muted-foreground hover:bg-red-500/20 hover:text-red-500"><X className="h-4 w-4" /></Button></div>))}<Button type="button" variant="outline" size="sm" onClick={addSpecItem} className="mt-2 border-dashed"><PlusCircle className="mr-2 h-4 w-4" /> Tambah Spesifikasi</Button></div></div>
                                    </CardContent>
                                </Card>

                                {/* Varian Produk Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Varian Produk (Opsional)</CardTitle>
                                        <CardDescription>Atur tipe varian produk seperti Warna, Ukuran, dan Kelengkapan lainnya.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="font-medium text-sm">Opsi Varian (Misal: Warna, Ukuran)</h3>
                                            {data.custom_options.map((opt, i) => (
                                                <div key={i} className="flex gap-2 items-start">
                                                    <Input placeholder="Nama Opsi (Cth: Warna)" value={opt.name} onChange={e => {
                                                        const newOpts = [...data.custom_options];
                                                        newOpts[i].name = e.target.value;
                                                        setData('custom_options', newOpts);
                                                    }} className="w-1/3" />
                                                    <Input placeholder="Pilihan (pisahkan dengan koma, Cth: Merah, Biru)" value={opt.options_string || ''} onChange={e => {
                                                        const newOpts = [...data.custom_options];
                                                        newOpts[i].options_string = e.target.value;
                                                        setData('custom_options', newOpts);
                                                    }} className="flex-1" />
                                                    <Button type="button" variant="ghost" className="text-red-600" onClick={() => {
                                                        setData('custom_options', data.custom_options.filter((_, idx) => idx !== i));
                                                    }}><X className="h-4 w-4" /></Button>
                                                </div>
                                            ))}
                                            <Button type="button" variant="outline" size="sm" onClick={() => {
                                                setData('custom_options', [...data.custom_options, { name: '', options_string: '' }]);
                                            }} className="border-dashed"><PlusCircle className="mr-2 h-4 w-4"/> Tambah Opsi Varian</Button>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-sm">Daftar Varian & Stok</h3>
                                                <Button type="button" variant="secondary" size="sm" onClick={() => {
                                                    if (data.custom_options.length === 0) return;
                                                    
                                                    const generateCombinations = (optionsList: typeof data.custom_options): Record<string, string>[] => {
                                                        if (optionsList.length === 0) return [];
                                                        const result: Record<string, string>[] = [];
                                                        const recurse = (current: Record<string, string>, depth: number) => {
                                                            if (depth === optionsList.length) {
                                                                result.push({ ...current });
                                                                return;
                                                            }
                                                            const option = optionsList[depth];
                                                            if (option.options.length === 0) {
                                                                recurse(current, depth + 1);
                                                                return;
                                                            }
                                                            for (const val of option.options) {
                                                                current[option.name] = val;
                                                                recurse(current, depth + 1);
                                                                delete current[option.name];
                                                            }
                                                        };
                                                        recurse({}, 0);
                                                        return result;
                                                    };
                                                    
                                                    const parsedOptions = data.custom_options.map((opt: any) => ({
                                                        name: opt.name,
                                                        options: (opt.options_string || '').split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
                                                    })).filter(o => o.name && o.options.length > 0);
                                                    
                                                    const combinations = generateCombinations(parsedOptions);
                                                    if (combinations.length === 0) return;

                                                    const newVariants = combinations.map(comb => {
                                                        const existing = data.variants.find(v => JSON.stringify(v.options) === JSON.stringify(comb));
                                                        if (existing) return existing;
                                                        return { sku: '', stock: 0, price: '', options: comb };
                                                    });
                                                    
                                                    setData('variants', newVariants);
                                                }}>Buat Kombinasi Otomatis</Button>
                                            </div>
                                            
                                            {data.variants.length > 0 ? (
                                                <div className="border rounded-md divide-y overflow-hidden">
                                                    <div className="grid grid-cols-12 gap-2 p-3 bg-secondary/30 border-b border-border font-medium text-sm text-muted-foreground">
                                                        <div className="col-span-4">Kombinasi Opsi</div>
                                                        <div className="col-span-2">SKU</div>
                                                        <div className="col-span-3">Harga Modal (Opsional)</div>
                                                        <div className="col-span-2">Stok</div>
                                                        <div className="col-span-1"></div>
                                                    </div>
                                                    {data.variants.map((variant, i) => (
                                                        <div key={i} className="grid grid-cols-12 gap-2 p-3 items-center">
                                                            <div className="col-span-4 flex flex-wrap gap-1">
                                                                {Object.entries(variant.options).map(([k, v]) => (
                                                                    <span key={k} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary">
                                                                        {k}: {v}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="col-span-2">
                                                                <Input value={variant.sku || ''} onChange={e => {
                                                                    const newV = [...data.variants];
                                                                    newV[i].sku = e.target.value;
                                                                    setData('variants', newV);
                                                                }} placeholder="SKU" />
                                                            </div>
                                                            <div className="col-span-3">
                                                                <Input type="number" placeholder="Harga Modal" value={variant.price || ''} onChange={e => {
                                                                    const newV = [...data.variants];
                                                                    newV[i].price = e.target.value ? parseInt(e.target.value) : '';
                                                                    setData('variants', newV);
                                                                }} min={0} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <Input type="number" value={variant.stock} onChange={e => {
                                                                    const newV = [...data.variants];
                                                                    newV[i].stock = parseInt(e.target.value) || 0;
                                                                    setData('variants', newV);
                                                                }} min={0} />
                                                            </div>
                                                            <div className="col-span-1 text-right">
                                                                <Button type="button" variant="ghost" size="icon" className="text-red-600" onClick={() => {
                                                                    setData('variants', data.variants.filter((_, idx) => idx !== i));
                                                                }}><Trash2 className="h-4 w-4"/></Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 text-sm text-muted-foreground border border-border rounded-md bg-secondary/20">
                                                    Belum ada varian. Tambahkan opsi di atas lalu klik "Buat Kombinasi Otomatis".
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Gambar Produk</CardTitle><CardDescription>Unggah gambar utama dan pendukung.</CardDescription></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            {item && item.images.map(image => (
                                                <div key={`existing-${image.id}`} className="relative group aspect-square">
                                                    <img src={`/storage/${image.image_path}`} alt="Gambar Produk" className="object-cover w-full h-full rounded-md" />
                                                    <button type="button" onClick={() => setImageToDelete(image)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            {imagePreviews.map((previewUrl, index) => (
                                                <div key={`new-${index}`} className="relative group aspect-square">
                                                    <img src={previewUrl} alt="Pratinjau Gambar" className="object-cover w-full h-full rounded-md" />
                                                    <button type="button" onClick={() => removeNewImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <Label htmlFor="images" className="p-4 border-2 border-dashed border-border rounded-md text-center block cursor-pointer hover:border-primary hover:bg-secondary/50 transition-colors"><UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" /><span className="mt-2 block text-sm font-medium text-foreground">Klik untuk memilih file</span><p className="text-xs text-muted-foreground">PNG, JPG, WEBP hingga 2MB</p><Input id="images" type="file" multiple className="sr-only" onChange={handleImageChange} /></Label>
                                        {errors.images && <p className="text-sm text-red-500 mt-1">{errors.images}</p>}
                                        {progress && (<div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div></div>)}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle>Status</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between"><div><Label htmlFor="is_published" className="font-semibold">Publikasikan</Label><p className="text-sm text-muted-foreground">Produk akan langsung ditampilkan di website Anda.</p></div><Switch id="is_published" checked={data.is_published} onCheckedChange={(checked) => setData('is_published', checked)} /></div>
                                        <div className="flex items-center justify-between"><div><Label htmlFor="is_featured" className="font-semibold">Jadikan Produk Unggulan</Label><p className="text-sm text-muted-foreground">Produk akan muncul di bagian "Produk Unggulan".</p></div><Switch id="is_featured" checked={data.is_featured} onCheckedChange={(checked) => setData('is_featured', checked)} /></div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <Link href={route('products.index')} className={cn(buttonVariants({ variant: 'ghost' }))}>Batal</Link>
                            <Button type="submit" disabled={processing}>{item ? 'Update Produk' : 'Simpan Produk'}</Button>
                        </div>
                    </form>
                </div>
            </AppLayout>

            <AlertDialog open={!!imageToDelete} onOpenChange={() => setImageToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Gambar akan dihapus secara permanen.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirmation} className={cn(buttonVariants({ variant: 'destructive' }))}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}


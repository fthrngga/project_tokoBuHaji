import { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { SharedData, CartItem } from '@/types';
import { route } from 'ziggy-js';
import Header from '@/Pages/welcome/Partials/Header';
import Footer from '@/Pages/welcome/Partials/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Toaster, toast } from 'sonner';

interface Province {
    id: string;
    name: string;
}

interface Regency {
    id: string;
    province_id: string;
    name: string;
}

interface District {
    id: string;
    regency_id: string;
    name: string;
}

interface Village {
    id: string;
    district_id: string;
    name: string;
}

interface Props {
    cartItems: CartItem[];
    total: number;
}

const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(value));
};

export default function Checkout({ cartItems, total }: Props) {
    const { auth } = usePage<SharedData>().props;

    // API State
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);

    const [loadingLocation, setLoadingLocation] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        province: '',
        city: '',
        district: '',
        village: '',
        address_detail: '',
        postal_code: '',
        notes: '',
        items: cartItems.map(item => item.id), // Send IDs to backend
    });

    // Fetch Provinces on Load
    useEffect(() => {
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Failed to load provinces", err));
    }, []);

    // Handlers for location changes
    const handleProvinceChange = (provinceName: string) => {
        const prov = provinces.find(p => p.name === provinceName);
        setData('province', provinceName);
        setRegencies([]);
        setDistricts([]);
        setVillages([]);
        // Reset lower fields
        setData(prev => ({ ...prev, province: provinceName, city: '', district: '', village: '' }));

        if (prov) {
            setLoadingLocation(true);
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`)
                .then(res => res.json())
                .then(data => setRegencies(data))
                .finally(() => setLoadingLocation(false));
        }
    };

    const handleCityChange = (cityName: string) => {
        const regency = regencies.find(r => r.name === cityName);
        setData(prev => ({ ...prev, city: cityName, district: '', village: '' }));
        setDistricts([]);
        setVillages([]);

        if (regency) {
            setLoadingLocation(true);
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regency.id}.json`)
                .then(res => res.json())
                .then(data => setDistricts(data))
                .finally(() => setLoadingLocation(false));
        }
    };

    const handleDistrictChange = (districtName: string) => {
        const district = districts.find(d => d.name === districtName);
        setData(prev => ({ ...prev, district: districtName, village: '' }));
        setVillages([]);

        if (district) {
            setLoadingLocation(true);
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${district.id}.json`)
                .then(res => res.json())
                .then(data => setVillages(data))
                .finally(() => setLoadingLocation(false));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'), {
            onSuccess: () => toast.success("Pesanan berhasil dibuat!"),
            onError: () => toast.error("Mohon lengkapi data pesanan."),
        });
    };

    return (
        <>
            <Head title="Checkout Pesanan - Haji Elektronik" />
            <Toaster richColors closeButton position="top-center" />

            <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                <Header user={auth.user} />

                <main className="flex-1 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout Pesanan</h1>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Lengkapi alamat pengiriman dan konfirmasi pesanan Anda.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                            {/* Kolom Kiri: Form Alamat */}
                            <div className="lg:col-span-7 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Alamat Pengiriman</CardTitle>
                                        <CardDescription>Masukkan detail alamat lengkap untuk pengiriman.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Provinsi</Label>
                                                <Select onValueChange={handleProvinceChange} value={data.province}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Provinsi" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {provinces.map(p => (
                                                            <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.province && <p className="text-xs text-red-500">{errors.province}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Kota/Kabupaten</Label>
                                                <Select onValueChange={handleCityChange} value={data.city} disabled={!data.province}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Kota" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {regencies.map(r => (
                                                            <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Kecamatan</Label>
                                                <Select onValueChange={handleDistrictChange} value={data.district} disabled={!data.city}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Kecamatan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {districts.map(d => (
                                                            <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.district && <p className="text-xs text-red-500">{errors.district}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Desa/Kelurahan</Label>
                                                <Select onValueChange={(val) => setData('village', val)} value={data.village} disabled={!data.district}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Desa" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {villages.map(v => (
                                                            <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.village && <p className="text-xs text-red-500">{errors.village}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address_detail">Detail Jalan / Nomor Rumah</Label>
                                            <Textarea
                                                id="address_detail"
                                                placeholder="Contoh: Jl. Mawar No. 12, RT 01/RW 02"
                                                value={data.address_detail}
                                                onChange={e => setData('address_detail', e.target.value)}
                                            />
                                            {errors.address_detail && <p className="text-xs text-red-500">{errors.address_detail}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="postal_code">Kode Pos</Label>
                                                <Input
                                                    id="postal_code"
                                                    placeholder="Contoh: 12345"
                                                    value={data.postal_code}
                                                    onChange={e => setData('postal_code', e.target.value)}
                                                />
                                                {errors.postal_code && <p className="text-xs text-red-500">{errors.postal_code}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Contoh: Rumah cat biru pagar hitam, dekat masjid."
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Kolom Kanan: Ringkasan Order */}
                            <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Rincian Pesanan</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                                                        <img
                                                            src={item.product.images.length > 0 ? `/storage/${item.product.images[0].image_path}` : 'https://placehold.co/100x100'}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{item.product.name}</p>
                                                        <div className="flex justify-between items-center mt-1">
                                                            <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.product.price)}</p>
                                                            <p className="text-sm font-medium">{formatCurrency(item.quantity * item.product.price)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Separator className="my-6" />

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Total Harga Barang</span>
                                                <span className="font-medium">{formatCurrency(total)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Ongkos Kirim</span>
                                                <span className="italic text-blue-600">Akan didiskusikan via chat</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold pt-4">
                                                <span>Total Sementara</span>
                                                <span>{formatCurrency(total)}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full h-12 text-base bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200" disabled={processing || loadingLocation}>
                                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                                            {processing ? "Memproses Pesanan..." : "Konfirmasi & Lanjut Chat"}
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Informasi Penting</h4>
                                    <ul className="list-disc list-inside text-xs text-blue-700 dark:text-blue-400 space-y-1">
                                        <li>Ongkos kirim akan ditentukan setelah Anda mengkonfirmasi alamat.</li>
                                        <li>Admin akan menghubungi Anda melalui fitur pesan untuk kesepakatan akhir.</li>
                                        <li>Pembayaran dilakukan setelah ada kesepakatan total biaya.</li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

import { useState, useEffect } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { SharedData, CartItem } from '@/types';
import { route } from 'ziggy-js';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowRight, Check } from "lucide-react";
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

interface Address {
    id: number;
    label: string;
    recipient_name: string;
    phone_number: string;
    province: string;
    city: string;
    district: string;
    village: string;
    address_detail: string;
    postal_code: string;
    is_primary: boolean;
}

interface Props {
    cartItems: CartItem[];
    total: number;
    addresses: Address[];
}

const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(value));
};

export default function Checkout({ cartItems, total, addresses }: Props) {
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

    const [selectedAddressId, setSelectedAddressId] = useState(
        addresses.find(a => a.is_primary)?.id || addresses[0]?.id || null
    );

    // Fungsi untuk mendapatkan data alamat yang aktif
    const activeAddress = addresses.find(a => a.id === selectedAddressId);

    // Gunakan useEffect untuk mensinkronkan data alamat ke form checkout
    useEffect(() => {
        if (activeAddress) {
            setData({
                ...data,
                province: activeAddress.province,
                city: activeAddress.city,
                district: activeAddress.district,
                village: activeAddress.village,
                address_detail: activeAddress.address_detail,
                postal_code: activeAddress.postal_code,
            });
        }
    }, [selectedAddressId]);

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

        <div className="flex min-h-screen w-full flex-col" style={{ background: '#0d1e2e', color: '#F7F7FF' }}>
                <Header user={auth.user} />

                <main className="flex-1 py-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 mb-2">— Pembelian</p>
                            <h1 className="text-3xl font-extrabold text-white">Checkout Pesanan</h1>
                            <p className="mt-2 text-slate-400">Konfirmasi alamat pengiriman dan rincian pesanan Anda.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                            {/* Kolom Kiri: Form Alamat */}
                            <div className="lg:col-span-7 space-y-8">
                            <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(87,115,153,0.2)', background: '#1a2d42' }}>
                                <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(87,115,153,0.15)' }}>
                                    <h2 className="font-semibold text-white">Alamat Pengiriman</h2>
                                    <Link href={route('addresses.index')} className="text-sm font-medium transition-colors" style={{ color: '#BDD5EA' }}
                                        onMouseEnter={e => (e.currentTarget.style.color = '#FE5F55')}
                                        onMouseLeave={e => (e.currentTarget.style.color = '#BDD5EA')}
                                    >
                                        Kelola Alamat
                                    </Link>
                                </div>
                                <div className="p-5 space-y-3">
                                        {addresses.length > 0 ? (
                                            <div className="grid gap-3">
                                                {addresses.map((addr) => (
                                                    <div
                                                        key={addr.id}
                                                        onClick={() => setSelectedAddressId(addr.id)}
                                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all`}
                                                        style={selectedAddressId === addr.id
                                                            ? { borderColor: '#577399', background: 'rgba(87,115,153,0.15)' }
                                                            : { borderColor: 'rgba(87,115,153,0.12)', background: 'rgba(87,115,153,0.05)' }
                                                        }
                                                    >
                                                        <div className="flex justify-between items-start gap-3">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="font-bold text-sm text-white">{addr.recipient_name}</p>
                                                                    <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-slate-400">{addr.label}</span>
                                                                    {addr.is_primary && <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 text-[10px] font-semibold text-orange-400">Utama</span>}
                                                                </div>
                                                                <p className="text-xs text-slate-500 mt-1">{addr.phone_number}</p>
                                                                <p className="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2">{addr.address_detail}, {addr.city}, {addr.province}</p>
                                                            </div>
                                                            {selectedAddressId === addr.id && (
                                                                    <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full" style={{ background: '#577399' }}>
                                                                        <Check className="w-3.5 h-3.5 text-white" />
                                                                    </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-sm text-slate-400 mb-4">Anda belum memiliki alamat tersimpan.</p>
                                                <Link
                                                    href={route('addresses.index')}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-orange-400 hover:bg-orange-500/20 transition-all"
                                                >
                                                    Tambah Alamat Baru
                                                </Link>
                                            </div>
                                        )}
                                </div>
                            </div>
                            </div>

                            {/* Kolom Kanan: Ringkasan Order */}
                            <div className="lg:col-span-5 mt-8 lg:mt-0 space-y-6">
                                <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(87,115,153,0.2)', background: '#1a2d42' }}>
                                    <div className="border-b border-white/10 px-6 py-4">
                                        <h2 className="font-semibold text-white">Rincian Pesanan</h2>
                                        <p className="text-xs text-slate-500 mt-0.5">{cartItems.length} item</p>
                                    </div>
                                    <div className="p-5">
                                        <div className="space-y-4 divide-y divide-white/5">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex gap-3 items-start pt-4 first:pt-0">
                                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-800">
                                                        <img
                                                            src={item.product.images.length > 0 ? `/storage/${item.product.images[0].image_path}` : 'https://placehold.co/100x100/1e293b/94a3b8'}
                                                            className="h-full w-full object-contain p-1"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-white line-clamp-2">{item.product.name}</p>
                                                        {item.variant && (
                                                            <div className="mt-1 flex flex-wrap gap-1">
                                                                {Object.entries(item.variant.options).map(([k, v]) => (
                                                                    <span key={k} className="rounded border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                                                                        {k}: {v}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between items-center mt-2">
                                                            <p className="text-xs text-slate-500">{item.quantity} × {formatCurrency(item.variant?.selling_price || item.product.selling_price)}</p>
                                                            <p className="text-sm font-bold text-white">{formatCurrency(item.quantity * (item.variant?.selling_price || item.product.selling_price))}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 border-t border-white/10 pt-4 space-y-2.5">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Total Harga Barang</span>
                                                <span className="font-medium text-white">{formatCurrency(total)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Ongkos Kirim</span>
                                                <span className="text-orange-400 italic text-xs">Negosiasi via chat</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-extrabold pt-3 border-t border-white/10">
                                                <span className="text-white">Total Sementara</span>
                                                <span className="text-orange-400">{formatCurrency(total)}</span>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={processing || loadingLocation || !selectedAddressId}
                                            className="group relative mt-5 w-full overflow-hidden rounded-xl py-3.5 font-semibold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{ background: 'linear-gradient(135deg, #FE5F55, #e84a40)', boxShadow: '0 8px 24px rgba(254,95,85,0.3)' }}
                                        >
                                            <span className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" style={{ background: 'linear-gradient(135deg, #e84a40, #FE5F55)' }} />
                                            <span className="relative flex items-center justify-center gap-2">
                                                {processing
                                                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Memproses Pesanan...</>
                                                    : <><ArrowRight className="h-4 w-4" /> Konfirmasi &amp; Lanjut Chat</>}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Info box */}
                                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                                    <h4 className="text-sm font-semibold text-amber-400 mb-2">ℹ️ Informasi Penting</h4>
                                    <ul className="space-y-1.5 text-xs text-amber-300/80">
                                        <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Ongkos kirim ditentukan setelah Anda mengkonfirmasi alamat.</li>
                                        <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Admin akan menghubungi Anda melalui fitur pesan untuk kesepakatan akhir.</li>
                                        <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Pembayaran dilakukan setelah ada kesepakatan total biaya.</li>
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

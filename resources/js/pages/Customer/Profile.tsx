import { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { SharedData } from '@/types';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { route } from 'ziggy-js';
import { MapPin, Plus, Trash2, Phone, User, KeyRound, Map } from 'lucide-react';

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

export default function Profile({ mustVerifyEmail, status, customer, addresses = [] }: { mustVerifyEmail: boolean; status?: string; customer?: any; addresses?: Address[] }) {
    const { auth } = usePage<SharedData>().props;
    const urlParams = new URLSearchParams(window.location.search);
    const initialTab = (urlParams.get('tab') as 'profile' | 'addresses' | 'password') || 'profile';
    const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'password'>(initialTab);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // Profile Form
    const { data: profileData, setData: setProfileData, patch: patchProfile, processing: profileProcessing, errors: profileErrors, recentlySuccessful: profileSuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email as string,
        phone_number: customer?.phone_number || '',
        province: customer?.province || '',
        city: customer?.city || '',
        address: customer?.address || '',
    });

    const submitProfile = (e: React.FormEvent) => {
        e.preventDefault();
        patchProfile(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => toast.success('Profil berhasil diperbarui')
        });
    };

    // Password Form
    const { data: passwordData, setData: setPasswordData, put: updatePassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword, recentlySuccessful: passwordSuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        updatePassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                resetPassword();
                toast.success('Password berhasil diubah');
            },
        });
    };

    // Address Form
    const { data: addressData, setData: setAddressData, post: postAddress, processing: addressProcessing, reset: resetAddress, errors: addressErrors } = useForm({
        label: '',
        recipient_name: '',
        phone_number: '',
        province: '',
        city: '',
        district: '',
        village: '',
        address_detail: '',
        postal_code: '',
        is_primary: false,
    });

    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);
    
    useEffect(() => {
        if (isAddressModalOpen && provinces.length === 0) {
            fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
                .then(res => res.json())
                .then(data => setProvinces(data))
                .catch(err => console.error("Failed to load provinces", err));
        }
    }, [isAddressModalOpen]);

    const handleProvinceChange = (val: string) => {
        const prov = JSON.parse(val);
        setAddressData(prev => ({ ...prev, province: prov.name, city: '', district: '', village: '' }));
        setCities([]); setDistricts([]); setVillages([]);
        
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`)
            .then(res => res.json())
            .then(data => setCities(data));
    };

    const handleCityChange = (val: string) => {
        const city = JSON.parse(val);
        setAddressData(prev => ({ ...prev, city: city.name, district: '', village: '' }));
        setDistricts([]); setVillages([]);

        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${city.id}.json`)
            .then(res => res.json())
            .then(data => setDistricts(data));
    };

    const handleDistrictChange = (val: string) => {
        const district = JSON.parse(val);
        setAddressData(prev => ({ ...prev, district: district.name, village: '' }));
        setVillages([]);

        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${district.id}.json`)
            .then(res => res.json())
            .then(data => setVillages(data));
    };

    const handleVillageChange = (val: string) => {
        const village = JSON.parse(val);
        setAddressData('village', village.name);
    };

    const submitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        postAddress(route('addresses.store'), {
            onSuccess: () => {
                setIsAddressModalOpen(false);
                resetAddress();
                toast.success('Alamat baru berhasil ditambahkan');
            },
        });
    };

    const deleteAddress = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
            router.delete(route('addresses.destroy', id), {
                preserveScroll: true,
                onSuccess: () => toast.success('Alamat berhasil dihapus'),
            });
        }
    };

    const setPrimaryAddress = (id: number) => {
        router.patch(route('addresses.primary', id), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Alamat utama berhasil diperbarui'),
        });
    };

    return (
        <>
            <Head title="Profil Saya - Haji Elektronik" />
            
            <div className="min-h-screen flex flex-col bg-transparent text-foreground font-sans">
                <Header user={auth.user} />

                <main className="flex-1 py-12">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-6 md:gap-8">
                        
                        {/* Sidebar Menu */}
                        <aside className="w-full lg:max-w-[250px] shrink-0">
                            <div style={{ background: "#0d1f33", padding: "16px", borderRadius: "12px", border: "1px solid rgba(87,115,153,0.2)", position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                <div style={{ padding: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(87,115,153,0.15)" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #577399, #3d5a80)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "16px" }}>
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div style={{ overflow: "hidden" }}>
                                        <p style={{ fontWeight: 600, color: "white", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "14px" }}>{auth.user.name}</p>
                                        <p style={{ fontSize: "12px", color: "rgba(189,213,234,0.6)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{auth.user.email as string}</p>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => setActiveTab('profile')}
                                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", background: activeTab === 'profile' ? "rgba(87,115,153,0.2)" : "transparent", color: activeTab === 'profile' ? "white" : "rgba(189,213,234,0.7)", border: "none", width: "100%", textAlign: "left" }}
                                >
                                    <User size={16} /> Biodata Diri
                                </button>
                                <button 
                                    onClick={() => setActiveTab('addresses')}
                                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", background: activeTab === 'addresses' ? "rgba(87,115,153,0.2)" : "transparent", color: activeTab === 'addresses' ? "white" : "rgba(189,213,234,0.7)", border: "none", width: "100%", textAlign: "left" }}
                                >
                                    <Map size={16} /> Buku Alamat
                                </button>
                                <button 
                                    onClick={() => setActiveTab('password')}
                                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", background: activeTab === 'password' ? "rgba(87,115,153,0.2)" : "transparent", color: activeTab === 'password' ? "white" : "rgba(189,213,234,0.7)", border: "none", width: "100%", textAlign: "left" }}
                                >
                                    <KeyRound size={16} /> Keamanan & Password
                                </button>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0">
                            
                            {/* TAB: PROFIL */}
                            {activeTab === 'profile' && (
                                <div className="bg-card p-6 md:p-8 rounded-2xl border border-border/20">
                                    <div style={{ marginBottom: "32px" }}>
                                        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>Biodata Diri</h1>
                                        <p style={{ color: "rgba(189,213,234,0.6)", margin: 0, fontSize: "14px" }}>Kelola informasi data diri dan alamat penagihan utama Anda.</p>
                                    </div>
                                    
                                    <form onSubmit={submitProfile} className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <Label htmlFor="name" style={{ color: "#BDD5EA" }}>Nama Lengkap</Label>
                                                <Input
                                                    id="name"
                                                    value={profileData.name}
                                                    onChange={e => setProfileData('name', e.target.value)}
                                                    required
                                                    style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                                />
                                                <InputError message={profileErrors.name} />
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <Label htmlFor="email" style={{ color: "#BDD5EA" }}>Alamat Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={e => setProfileData('email', e.target.value)}
                                                    required
                                                    style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                                />
                                                <InputError message={profileErrors.email} />
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <Label htmlFor="phone_number" style={{ color: "#BDD5EA" }}>Nomor HP</Label>
                                            <Input
                                                id="phone_number"
                                                value={profileData.phone_number}
                                                onChange={e => setProfileData('phone_number', e.target.value)}
                                                style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                            />
                                            <InputError message={profileErrors.phone_number} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <Label htmlFor="province" style={{ color: "#BDD5EA" }}>Provinsi</Label>
                                                <Input
                                                    id="province"
                                                    value={profileData.province}
                                                    onChange={e => setProfileData('province', e.target.value)}
                                                    style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                                />
                                                <InputError message={profileErrors.province} />
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <Label htmlFor="city" style={{ color: "#BDD5EA" }}>Kota/Kabupaten</Label>
                                                <Input
                                                    id="city"
                                                    value={profileData.city}
                                                    onChange={e => setProfileData('city', e.target.value)}
                                                    style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                                />
                                                <InputError message={profileErrors.city} />
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <Label htmlFor="address" style={{ color: "#BDD5EA" }}>Alamat Lengkap</Label>
                                            <Textarea
                                                id="address"
                                                value={profileData.address}
                                                onChange={e => setProfileData('address', e.target.value)}
                                                rows={4}
                                                style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                            />
                                            <InputError message={profileErrors.address} />
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "24px", borderTop: "1px solid rgba(87,115,153,0.2)" }}>
                                            <Button type="submit" disabled={profileProcessing} style={{ background: "#FE5F55", color: "white", padding: "10px 24px", borderRadius: "8px", fontWeight: 600, border: "none" }}>
                                                Simpan Perubahan
                                            </Button>

                                            {profileSuccessful && (
                                                <p style={{ fontSize: "14px", color: "#4ade80", margin: 0 }}>Biodata berhasil disimpan.</p>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* TAB: BUKU ALAMAT */}
                            {activeTab === 'addresses' && (
                                <div className="flex flex-col gap-6">
                                    <div className="bg-card p-5 md:p-6 rounded-2xl border border-border/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h1 className="text-xl md:text-2xl font-bold m-0 mb-2 text-foreground">Buku Alamat</h1>
                                            <p className="text-muted-foreground/60 m-0 text-xs md:text-sm">Kelola alamat pengiriman untuk memudahkan proses checkout Anda.</p>
                                        </div>
                                        
                                        <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
                                            <DialogTrigger asChild>
                                                <Button style={{ display: "flex", alignItems: "center", gap: "8px", background: "#FE5F55", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none" }}>
                                                    <Plus size={16} /> Tambah Alamat
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" style={{ background: "#0d1f33", borderColor: "rgba(87,115,153,0.3)", color: "white" }}>
                                                <form onSubmit={submitAddress}>
                                                    <DialogHeader>
                                                        <DialogTitle style={{ color: "white" }}>Tambah Alamat Baru</DialogTitle>
                                                        <DialogDescription style={{ color: "rgba(189,213,234,0.6)" }}>Masukkan detail alamat pengiriman Anda dengan lengkap.</DialogDescription>
                                                    </DialogHeader>
                                                    
                                                    <div className="flex flex-col gap-4 py-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label htmlFor="label" style={{ color: "#BDD5EA" }}>Label Alamat</Label>
                                                                <Input id="label" value={addressData.label} onChange={e => setAddressData('label', e.target.value)} placeholder="Rumah / Kantor" style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.label} />
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label htmlFor="recipient" style={{ color: "#BDD5EA" }}>Nama Penerima</Label>
                                                                <Input id="recipient" value={addressData.recipient_name} onChange={e => setAddressData('recipient_name', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.recipient_name} />
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                            <Label htmlFor="phone" style={{ color: "#BDD5EA" }}>Nomor Telepon</Label>
                                                            <Input id="phone" value={addressData.phone_number} onChange={e => setAddressData('phone_number', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                            <InputError message={addressErrors.phone_number} />
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Provinsi</Label>
                                                                <Select onValueChange={handleProvinceChange}>
                                                                    <SelectTrigger style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: addressData.province ? "white" : "rgba(189,213,234,0.5)" }}>
                                                                        <SelectValue placeholder="Pilih Provinsi" />
                                                                    </SelectTrigger>
                                                                    <SelectContent style={{ background: "#0d1f33", border: "1px solid rgba(87,115,153,0.3)", color: "white", maxHeight: "250px", overflowY: "auto" }}>
                                                                        {provinces.map(p => (
                                                                            <SelectItem key={p.id} value={JSON.stringify({ id: p.id, name: p.name })} className="hover:bg-slate-800 focus:bg-slate-800 focus:text-foreground cursor-pointer">
                                                                                {p.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError message={addressErrors.province} />
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kota/Kabupaten</Label>
                                                                <Select onValueChange={handleCityChange} disabled={cities.length === 0}>
                                                                    <SelectTrigger style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: addressData.city ? "white" : "rgba(189,213,234,0.5)" }}>
                                                                        <SelectValue placeholder="Pilih Kota" />
                                                                    </SelectTrigger>
                                                                    <SelectContent style={{ background: "#0d1f33", border: "1px solid rgba(87,115,153,0.3)", color: "white", maxHeight: "250px", overflowY: "auto" }}>
                                                                        {cities.map(c => (
                                                                            <SelectItem key={c.id} value={JSON.stringify({ id: c.id, name: c.name })} className="hover:bg-slate-800 focus:bg-slate-800 focus:text-foreground cursor-pointer">
                                                                                {c.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError message={addressErrors.city} />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kecamatan</Label>
                                                                <Select onValueChange={handleDistrictChange} disabled={districts.length === 0}>
                                                                    <SelectTrigger style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: addressData.district ? "white" : "rgba(189,213,234,0.5)" }}>
                                                                        <SelectValue placeholder="Pilih Kecamatan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent style={{ background: "#0d1f33", border: "1px solid rgba(87,115,153,0.3)", color: "white", maxHeight: "250px", overflowY: "auto" }}>
                                                                        {districts.map(d => (
                                                                            <SelectItem key={d.id} value={JSON.stringify({ id: d.id, name: d.name })} className="hover:bg-slate-800 focus:bg-slate-800 focus:text-foreground cursor-pointer">
                                                                                {d.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError message={addressErrors.district} />
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kelurahan/Desa</Label>
                                                                <Select onValueChange={handleVillageChange} disabled={villages.length === 0}>
                                                                    <SelectTrigger style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: addressData.village ? "white" : "rgba(189,213,234,0.5)" }}>
                                                                        <SelectValue placeholder="Pilih Kelurahan" />
                                                                    </SelectTrigger>
                                                                    <SelectContent style={{ background: "#0d1f33", border: "1px solid rgba(87,115,153,0.3)", color: "white", maxHeight: "250px", overflowY: "auto" }}>
                                                                        {villages.map(v => (
                                                                            <SelectItem key={v.id} value={JSON.stringify({ id: v.id, name: v.name })} className="hover:bg-slate-800 focus:bg-slate-800 focus:text-foreground cursor-pointer">
                                                                                {v.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError message={addressErrors.village} />
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                            <Label style={{ color: "#BDD5EA" }}>Alamat Lengkap</Label>
                                                            <Textarea value={addressData.address_detail} onChange={e => setAddressData('address_detail', e.target.value)} placeholder="Nama jalan, nomor rumah, blok, dll." style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                            <InputError message={addressErrors.address_detail} />
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kode Pos</Label>
                                                                <Input value={addressData.postal_code} onChange={e => setAddressData('postal_code', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.postal_code} />
                                                            </div>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "24px" }}>
                                                                <input 
                                                                    type="checkbox" 
                                                                    id="primary" 
                                                                    checked={addressData.is_primary} 
                                                                    onChange={e => setAddressData('is_primary', e.target.checked)}
                                                                />
                                                                <Label htmlFor="primary" style={{ color: "#BDD5EA" }}>Jadikan Alamat Utama</Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <DialogFooter>
                                                        <Button type="submit" disabled={addressProcessing} style={{ background: "#FE5F55", color: "white", width: "100%", border: "none" }}>Simpan Alamat</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        {addresses.length === 0 ? (
                                            <div className="bg-transparent border-2 border-dashed border-border/30 py-12 px-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                                                <div className="w-16 h-16 bg-[#577399]/10 rounded-full flex items-center justify-center">
                                                    <MapPin size={32} color="rgba(189,213,234,0.5)" />
                                                </div>
                                                <p className="text-muted-foreground/80 font-medium m-0">Anda belum memiliki daftar alamat.</p>
                                                <p className="text-muted-foreground/50 text-sm m-0">Tambahkan alamat untuk mempermudah pengiriman pesanan Anda.</p>
                                            </div>
                                        ) : (
                                            addresses.map((address) => (
                                                <div key={address.id} className={`bg-card rounded-xl p-5 flex flex-col gap-3 ${address.is_primary ? 'border border-[#FE5F55]' : 'border border-border/20'}`}>
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{address.label}</span>
                                                                {address.is_primary && <span className="bg-[#FE5F55]/10 text-[#FE5F55] px-2 py-0.5 rounded-full text-[10px] font-bold">Utama</span>}
                                                            </div>
                                                            <h3 className="text-lg font-bold text-foreground m-0">{address.recipient_name}</h3>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {!address.is_primary && (
                                                                <Button variant="outline" size="sm" onClick={() => setPrimaryAddress(address.id)} className="border-border/30 text-muted-foreground hover:bg-[#577399]/20">Set Utama</Button>
                                                            )}
                                                            <Button variant="ghost" size="icon" onClick={() => deleteAddress(address.id)} className="text-[#FE5F55] hover:bg-[#FE5F55]/10 hover:text-[#FE5F55]">
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3 text-sm">
                                                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                                            <Phone size={16} className="text-muted-foreground/60" /> {address.phone_number}
                                                        </div>
                                                        <div className="bg-transparent/40 p-3 rounded-lg text-muted-foreground/80 leading-relaxed">
                                                            {address.address_detail}<br/>
                                                            {address.village}, {address.district}<br/>
                                                            {address.city}, {address.province} {address.postal_code}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* TAB: KEAMANAN & PASSWORD */}
                            {activeTab === 'password' && (
                                <div className="bg-card p-6 md:p-8 rounded-2xl border border-border/20">
                                    <div className="mb-8">
                                        <h1 className="text-xl md:text-2xl font-bold m-0 mb-2 text-foreground">Ubah Password</h1>
                                        <p className="text-muted-foreground/60 m-0 text-xs md:text-sm">Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.</p>
                                    </div>
                                    
                                    <form onSubmit={submitPassword} className="flex flex-col gap-6 max-w-[400px]">
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <Label htmlFor="current_password" style={{ color: "#BDD5EA" }}>Password Saat Ini</Label>
                                            <Input
                                                id="current_password"
                                                type="password"
                                                value={passwordData.current_password}
                                                onChange={e => setPasswordData('current_password', e.target.value)}
                                                required
                                                style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                            />
                                            <InputError message={passwordErrors.current_password} />
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <Label htmlFor="password" style={{ color: "#BDD5EA" }}>Password Baru</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={passwordData.password}
                                                onChange={e => setPasswordData('password', e.target.value)}
                                                required
                                                style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                            />
                                            <InputError message={passwordErrors.password} />
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <Label htmlFor="password_confirmation" style={{ color: "#BDD5EA" }}>Konfirmasi Password Baru</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={passwordData.password_confirmation}
                                                onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                                required
                                                style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }}
                                            />
                                            <InputError message={passwordErrors.password_confirmation} />
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "24px", borderTop: "1px solid rgba(87,115,153,0.2)" }}>
                                            <Button type="submit" disabled={passwordProcessing} style={{ background: "#FE5F55", color: "white", padding: "10px 24px", borderRadius: "8px", fontWeight: 600, border: "none" }}>
                                                Simpan Password
                                            </Button>

                                            {passwordSuccessful && (
                                                <p style={{ fontSize: "14px", color: "#4ade80", margin: 0 }}>Password berhasil diubah.</p>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}

                        </div>
                    </div>

                </main>

                <Footer />
            </div>
        </>
    );
}

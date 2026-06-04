import { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'password'>('profile');
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
            
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#080f1a", color: "#F7F7FF", fontFamily: "Inter, system-ui, sans-serif" }}>
                <Header user={auth.user} />

                <main style={{ flex: 1, padding: "48px 0" }}>
                    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "32px", flexDirection: window.innerWidth < 1024 ? "column" : "row" }}>
                        
                        {/* Sidebar Menu */}
                        <aside style={{ width: "100%", maxWidth: "250px", flexShrink: 0 }}>
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
                        <div style={{ flex: 1, minWidth: 0 }}>
                            
                            {/* TAB: PROFIL */}
                            {activeTab === 'profile' && (
                                <div style={{ background: "#0d1f33", padding: "32px", borderRadius: "16px", border: "1px solid rgba(87,115,153,0.2)" }}>
                                    <div style={{ marginBottom: "32px" }}>
                                        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>Biodata Diri</h1>
                                        <p style={{ color: "rgba(189,213,234,0.6)", margin: 0, fontSize: "14px" }}>Kelola informasi data diri dan alamat penagihan utama Anda.</p>
                                    </div>
                                    
                                    <form onSubmit={submitProfile} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
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

                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
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
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                    <div style={{ background: "#0d1f33", padding: "24px", borderRadius: "16px", border: "1px solid rgba(87,115,153,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>Buku Alamat</h1>
                                            <p style={{ color: "rgba(189,213,234,0.6)", margin: 0, fontSize: "14px" }}>Kelola alamat pengiriman untuk memudahkan proses checkout Anda.</p>
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
                                                    
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0" }}>
                                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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

                                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Provinsi</Label>
                                                                <Input value={addressData.province} onChange={e => setAddressData('province', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.province} />
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kota/Kabupaten</Label>
                                                                <Input value={addressData.city} onChange={e => setAddressData('city', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.city} />
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kecamatan</Label>
                                                                <Input value={addressData.district} onChange={e => setAddressData('district', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.district} />
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                                <Label style={{ color: "#BDD5EA" }}>Kelurahan/Desa</Label>
                                                                <Input value={addressData.village} onChange={e => setAddressData('village', e.target.value)} style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                                <InputError message={addressErrors.village} />
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                            <Label style={{ color: "#BDD5EA" }}>Alamat Lengkap</Label>
                                                            <Textarea value={addressData.address_detail} onChange={e => setAddressData('address_detail', e.target.value)} placeholder="Nama jalan, nomor rumah, blok, dll." style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(87,115,153,0.3)", color: "white" }} />
                                                            <InputError message={addressErrors.address_detail} />
                                                        </div>

                                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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

                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        {addresses.length === 0 ? (
                                            <div style={{ background: "transparent", border: "2px dashed rgba(87,115,153,0.3)", padding: "48px 24px", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "12px" }}>
                                                <div style={{ width: "64px", height: "64px", background: "rgba(87,115,153,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <MapPin size={32} color="rgba(189,213,234,0.5)" />
                                                </div>
                                                <p style={{ color: "rgba(189,213,234,0.8)", fontWeight: 500, margin: 0 }}>Anda belum memiliki daftar alamat.</p>
                                                <p style={{ color: "rgba(189,213,234,0.5)", fontSize: "14px", margin: 0 }}>Tambahkan alamat untuk mempermudah pengiriman pesanan Anda.</p>
                                            </div>
                                        ) : (
                                            addresses.map((address) => (
                                                <div key={address.id} style={{ background: "#0d1f33", border: address.is_primary ? "1px solid #FE5F55" : "1px solid rgba(87,115,153,0.2)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                <span style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(189,213,234,0.6)" }}>{address.label}</span>
                                                                {address.is_primary && <span style={{ background: "rgba(254,95,85,0.1)", color: "#FE5F55", padding: "2px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: "bold" }}>Utama</span>}
                                                            </div>
                                                            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "white", margin: 0 }}>{address.recipient_name}</h3>
                                                        </div>
                                                        <div style={{ display: "flex", gap: "8px" }}>
                                                            {!address.is_primary && (
                                                                <Button variant="outline" size="sm" onClick={() => setPrimaryAddress(address.id)} style={{ borderColor: "rgba(87,115,153,0.3)", color: "#BDD5EA" }}>Set Utama</Button>
                                                            )}
                                                            <Button variant="ghost" size="icon" onClick={() => deleteAddress(address.id)} style={{ color: "#FE5F55" }}>
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#BDD5EA", fontWeight: 500 }}>
                                                            <Phone size={16} color="rgba(189,213,234,0.6)" /> {address.phone_number}
                                                        </div>
                                                        <div style={{ background: "rgba(8,15,26,0.4)", padding: "12px", borderRadius: "8px", color: "rgba(189,213,234,0.8)", lineHeight: 1.6 }}>
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
                                <div style={{ background: "#0d1f33", padding: "32px", borderRadius: "16px", border: "1px solid rgba(87,115,153,0.2)" }}>
                                    <div style={{ marginBottom: "32px" }}>
                                        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0", color: "white" }}>Ubah Password</h1>
                                        <p style={{ color: "rgba(189,213,234,0.6)", margin: 0, fontSize: "14px" }}>Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.</p>
                                    </div>
                                    
                                    <form onSubmit={submitPassword} style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
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

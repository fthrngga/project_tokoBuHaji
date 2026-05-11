import { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { SharedData } from '@/types';
import Header from '@/pages/welcome/Partials/Header';
import Footer from '@/pages/welcome/Partials/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Trash2, Phone } from 'lucide-react';
import { toast } from 'sonner';

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
    addresses: Address[];
}

export default function Index({ addresses }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('addresses.store'), {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                toast.success('Alamat baru berhasil ditambahkan');
            },
        });
    };

    const deleteAddress = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
            router.delete(route('addresses.destroy', id), {
                onSuccess: () => toast.success('Alamat berhasil dihapus'),
            });
        }
    };

    const setPrimary = (id: number) => {
        router.patch(route('addresses.primary', id), {}, {
            onSuccess: () => toast.success('Alamat utama berhasil diperbarui'),
        });
    };

    return (
        <>
            <Head title="Buku Alamat - Haji Elektronik" />
            
            <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                {/* Gunakan Header Frontend Customer */}
                <Header user={auth.user} />

                <main className="flex-1 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
                        
                        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Buku Alamat</h1>
                                <p className="text-muted-foreground text-sm mt-1">Kelola alamat pengiriman untuk memudahkan proses checkout Anda.</p>
                            </div>
                            
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2 bg-black hover:bg-gray-800 text-white">
                                        <Plus className="w-4 h-4" /> Tambah Alamat
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                                    <form onSubmit={submit}>
                                        <DialogHeader>
                                            <DialogTitle>Tambah Alamat Baru</DialogTitle>
                                            <DialogDescription>Masukkan detail alamat pengiriman Anda dengan lengkap.</DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="label">Label Alamat (E.g: Rumah)</Label>
                                                    <Input id="label" value={data.label} onChange={e => setData('label', e.target.value)} placeholder="Rumah / Kantor" />
                                                    {errors.label && <p className="text-xs text-red-500">{errors.label}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="recipient">Nama Penerima</Label>
                                                    <Input id="recipient" value={data.recipient_name} onChange={e => setData('recipient_name', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Nomor Telepon</Label>
                                                <Input id="phone" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Provinsi</Label>
                                                    <Input value={data.province} onChange={e => setData('province', e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Kota/Kabupaten</Label>
                                                    <Input value={data.city} onChange={e => setData('city', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Kecamatan</Label>
                                                    <Input value={data.district} onChange={e => setData('district', e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Kelurahan/Desa</Label>
                                                    <Input value={data.village} onChange={e => setData('village', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Alamat Lengkap</Label>
                                                <Textarea value={data.address_detail} onChange={e => setData('address_detail', e.target.value)} placeholder="Nama jalan, nomor rumah, blok, dll." />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Kode Pos</Label>
                                                    <Input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} />
                                                </div>
                                                <div className="flex items-center space-x-2 pt-8">
                                                    <input 
                                                        type="checkbox" 
                                                        id="primary" 
                                                        checked={data.is_primary} 
                                                        onChange={e => setData('is_primary', e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <Label htmlFor="primary">Jadikan Alamat Utama</Label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <DialogFooter>
                                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={processing}>Simpan Alamat</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid gap-4">
                            {addresses.length === 0 ? (
                                <Card className="border-dashed py-12 bg-white">
                                    <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
                                        <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                                            <MapPin className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <p className="text-gray-500 font-medium">Anda belum memiliki daftar alamat.</p>
                                        <p className="text-sm text-gray-400">Tambahkan alamat untuk mempermudah pengiriman pesanan Anda.</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                addresses.map((address) => (
                                    <Card key={address.id} className={`transition-all ${address.is_primary ? 'border-black border-2 shadow-sm' : 'border-gray-200 bg-white'}`}>
                                        <CardHeader className="pb-2 flex-row justify-between items-start space-y-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold uppercase text-xs tracking-wider text-gray-500">{address.label}</span>
                                                    {address.is_primary && <Badge className="bg-black text-white hover:bg-gray-800 text-[10px] h-5">Utama</Badge>}
                                                </div>
                                                <CardTitle className="text-lg font-bold text-gray-900">{address.recipient_name}</CardTitle>
                                            </div>
                                            <div className="flex gap-2">
                                                {!address.is_primary && (
                                                    <Button variant="outline" size="sm" onClick={() => setPrimary(address.id)} className="text-xs">Set Utama</Button>
                                                )}
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteAddress(address.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-sm space-y-3">
                                            <div className="flex items-center gap-2 font-medium text-gray-700">
                                                <Phone className="w-4 h-4 text-gray-400" /> {address.phone_number}
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-md">
                                                <p className="leading-relaxed text-gray-600">
                                                    {address.address_detail}<br/>
                                                    {address.village}, {address.district}<br/>
                                                    {address.city}, {address.province} {address.postal_code}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
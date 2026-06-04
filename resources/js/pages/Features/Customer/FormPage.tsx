// stubs/feature/react/FormPage.tsx.stub

import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Customer {
    id: number;
    // SYNC_FORM_ITEM_TYPE_START
    user_id: string | number;
    phone_number: string;
    address: string;
    city: string;
    province: string;
    user?: {
        name: string;
        email: string;
    };
    // SYNC_FORM_ITEM_TYPE_END
}

export default function FormPage({ auth, item }: PageProps<{ item?: Customer }>) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Customers',
            href: route('customers.index'),
        },
        {
            title: item ? 'Edit' : 'Create',
            href: item ? route('customers.edit', item.id) : route('customers.create'),
        },
    ];

    // SYNC_FORM_DATA_START
    const { data, setData, post, put, processing, errors } = useForm({
        name: item?.user?.name ?? '',
        email: item?.user?.email ?? '',
        password: '',
        phone_number: item?.phone_number ?? '',
        address: item?.address ?? '',
        city: item?.city ?? '',
        province: item?.province ?? '',
    });
    // SYNC_FORM_DATA_END

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (item) {
            put(route('customers.update', item.id));
        } else {
            post(route('customers.store'));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={(item ? 'Edit' : 'Create') + ' Customer'} />

            <div className="p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{item ? 'Edit' : 'Create'} Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* SYNC_FORM_FIELDS_START */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                    <Input id="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} required />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Alamat Email <span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="password">Password {item ? '(Kosongkan jika tidak ingin mengubah)' : <span className="text-red-500">*</span>}</Label>
                <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} required={!item} />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="phone_number">Nomor HP</Label>
                <Input id="phone_number" type="text" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                {errors.phone_number && <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="province">Provinsi</Label>
                    <Input id="province" type="text" value={data.province} onChange={e => setData('province', e.target.value)} />
                    {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">Kota/Kabupaten</Label>
                    <Input id="city" type="text" value={data.city} onChange={e => setData('city', e.target.value)} />
                    {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <Textarea id="address" value={data.address} onChange={e => setData('address', e.target.value)} rows={3} />
                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
{/* SYNC_FORM_FIELDS_END */}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Link href={route('customers.index')} className={cn(buttonVariants({ variant: 'ghost' }))}>Cancel</Link>
                            <Button type="submit" disabled={processing}>{item ? 'Update' : 'Create'}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}

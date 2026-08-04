import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    return (
        <AuthLayout title="Buat Akun Baru" description="Daftarkan diri Anda untuk mulai berbelanja">
            <Head title="Register" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6 mt-4 w-full px-4 sm:px-0"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2 relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <User className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama Lengkap"
                                    className="pl-10 py-6 rounded-xl border-white/20 bg-[#0c1626] text-foreground focus-visible:ring-[#FE5F55] placeholder:text-gray-500"
                                />
                                <InputError message={errors.name} className="ml-1" />
                            </div>

                            <div className="grid gap-2 relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="pl-10 py-6 rounded-xl border-white/20 bg-[#0c1626] text-foreground focus-visible:ring-[#FE5F55] placeholder:text-gray-500"
                                />
                                <InputError message={errors.email} className="ml-1" />
                            </div>

                            <div className="grid gap-2 relative">
                                <div className="absolute left-3 top-[22px] -translate-y-1/2 text-gray-500">
                                    <Lock className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    className="pl-10 pr-10 py-6 rounded-xl border-white/20 bg-[#0c1626] text-foreground focus-visible:ring-[#FE5F55] placeholder:text-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[22px] -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
                                </button>
                                <InputError message={errors.password} className="ml-1" />
                            </div>

                            <div className="grid gap-2 relative">
                                <div className="absolute left-3 top-[22px] -translate-y-1/2 text-gray-500">
                                    <Lock className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <Input
                                    id="password_confirmation"
                                    type={showPasswordConfirm ? "text" : "password"}
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi Password"
                                    className="pl-10 pr-10 py-6 rounded-xl border-white/20 bg-[#0c1626] text-foreground focus-visible:ring-[#FE5F55] placeholder:text-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                    className="absolute right-3 top-[22px] -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPasswordConfirm ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
                                </button>
                                <InputError message={errors.password_confirmation} className="ml-1" />
                            </div>

                            <Button 
                                type="submit" 
                                className="mt-2 w-full py-6 rounded-xl text-base font-semibold bg-[#FE5F55] text-foreground hover:bg-[#e0534a] border-none transition-all shadow-[0_4px_14px_rgba(254,95,85,0.3)] hover:shadow-[0_6px_20px_rgba(254,95,85,0.4)] hover:-translate-y-0.5" 
                                tabIndex={5}
                            >
                                {processing && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                Daftar Sekarang
                            </Button>
                        </div>

                        <div className="text-center text-sm mt-2" style={{ color: "rgba(189,213,234,0.7)" }}>
                            Sudah punya akun?{' '}
                            <TextLink href={login()} tabIndex={6} className="font-semibold text-foreground hover:text-[#FE5F55] transition-colors">
                                Masuk
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

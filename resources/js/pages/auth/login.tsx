import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout title="Selamat Datang" description="Sistem Informasi Keuangan Toko Pak Haji">
            <Head title="Log in" />

            <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6 mt-4 w-full px-4 sm:px-0">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            {/* Email / Username */}
                            <div className="grid gap-2 relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <User className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Email / Username"
                                    className="pl-10 py-6 rounded-xl border-white/20 bg-[#0c1626] text-foreground focus-visible:ring-[#FE5F55] placeholder:text-gray-500"
                                />
                                <InputError message={errors.email} className="ml-1" />
                            </div>

                            {/* Password */}
                            <div className="grid gap-2 relative">
                                <div className="absolute left-3 top-[22px] -translate-y-1/2 text-gray-500">
                                    <Lock className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
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

                            <div className="flex justify-end w-full px-1">
                                {canResetPassword && (
                                    <TextLink href={request()} className="text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors" tabIndex={5}>
                                        Lupa Password?
                                    </TextLink>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                className="mt-2 w-full py-6 rounded-xl text-base font-semibold bg-[#FE5F55] text-foreground hover:bg-[#e0534a] border-none transition-all shadow-[0_4px_14px_rgba(254,95,85,0.3)] hover:shadow-[0_6px_20px_rgba(254,95,85,0.4)] hover:-translate-y-0.5" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                Masuk
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground mt-2" style={{ color: "rgba(189,213,234,0.7)" }}>
                            Belum punya akun?{' '}
                            <TextLink href={register()} tabIndex={5} className="font-semibold text-foreground hover:text-[#FE5F55] transition-colors">
                                Daftar
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}

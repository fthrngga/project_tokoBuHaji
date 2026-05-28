import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side: Store Illustration/Image */}
            <div className="relative hidden h-full flex-col bg-muted lg:flex dark:border-r border-r">
                <div className="absolute inset-0 bg-white">
                    {/* PLACEHOLDER IMAGE */}
                    <img 
                        src="/image/auth-store-illustration.png" 
                        alt="Toko Pak Haji Elektronik" 
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                        onError={(e) => {
                            // Fallback if image not yet placed
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.style.backgroundColor = '#f3f4f6';
                            e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400 font-medium">Gambar Toko<br>(Letakkan di public/image/auth-store-illustration.png)</div>';
                        }}
                    />
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="w-full lg:p-8 h-full flex flex-col items-center justify-center relative" style={{ background: "#080f1a", color: "#F7F7FF", fontFamily: "Inter, system-ui, sans-serif" }}>
                <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px] p-8 sm:p-0">
                    <Link href={home()} className="relative z-20 flex items-center justify-center lg:hidden mb-4">
                        <AppLogoIcon className="h-10 fill-current text-[#F7F7FF] sm:h-12" />
                    </Link>
                    
                    <div className="flex flex-col items-center text-center space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
                        <p className="text-sm" style={{ color: "rgba(189,213,234,0.7)" }}>{description}</p>
                    </div>

                    {children}
                </div>

                {/* Footer */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-xs" style={{ color: "rgba(189,213,234,0.5)" }}>
                        © 2025 Toko Pak Haji Elektronik
                    </p>
                </div>
            </div>
        </div>
    );
}

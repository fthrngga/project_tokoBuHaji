import { type User, type SharedData } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Search, LogOut, ShoppingBag, LayoutDashboard, User as UserIcon, CreditCard, X, MapPin, Menu } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import AppLogoIcon from '@/components/app-logo-icon';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const NAV_LINKS = [
    { label: "Elektronik", href: "/kategori/elektronik" },
    { label: "Mebel", href: "/kategori/mebel" },
    { label: "Semua Produk", href: "/kategori" },
];

export default function Header({ user }: { user: User | null }) {
    const { cartCount } = usePage<SharedData>().props;
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [q, setQ] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
    }, [searchOpen]);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSearchOpen(false);
            if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
        };
        document.addEventListener("keydown", fn);
        return () => document.removeEventListener("keydown", fn);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (q.trim()) { router.get(route('search.index'), { q }); setSearchOpen(false); }
    };

    return (
        <>
            {/* ─── Search Overlay ─── */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] md:pt-[20vh] bg-[#080f1a]/95 backdrop-blur-xl"
                    onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}
                >
                    <div className="w-full max-w-[640px] px-4 md:px-6">
                        {/* Close */}
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="text-[#bdd5ea]/40 hover:text-[#BDD5EA] transition-colors p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSearch}>
                            <div className="relative border-b border-[#577399]/30">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={q}
                                    onChange={e => setQ(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-2xl md:text-[40px] font-bold text-white tracking-tight pb-4 placeholder:text-white/20 focus:ring-0"
                                    style={{ caretColor: "#FE5F55" }}
                                />
                            </div>
                            <p className="mt-4 text-xs text-[#577399]/50 text-center">
                                Tekan Enter untuk mencari · Esc untuk menutup
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── Navbar ─── */}
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
                    scrolled ? 'bg-[#080f1a]/95 backdrop-blur-xl border-b border-[#577399]/10' : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-[60px] md:h-[68px] flex items-center justify-between gap-4 md:gap-8">
                    
                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        {/* Mobile Menu Toggle */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="md:hidden p-2 -ml-2 text-[#bdd5ea]/60 hover:text-white transition-colors">
                                    <Menu size={20} />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-[#080f1a] border-r border-[#577399]/20 p-0 w-[280px]">
                                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                                <SheetDescription className="sr-only">Navigasi situs untuk perangkat seluler</SheetDescription>
                                <div className="p-6 border-b border-[#577399]/20 flex items-center gap-3">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-[#3d5a80] text-white">
                                        <AppLogoIcon className="size-5 fill-current" />
                                    </div>
                                    <span className="text-[15px] font-extrabold text-white tracking-tight">Toko Pak Haji</span>
                                </div>
                                <div className="py-4 flex flex-col">
                                    {NAV_LINKS.map(({ label, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="px-6 py-3 text-[#bdd5ea]/70 hover:text-white hover:bg-[#577399]/10 transition-colors text-sm font-medium"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 md:gap-2.5 flex-shrink-0">
                            <div className="flex aspect-square size-7 md:size-8 items-center justify-center rounded-md bg-[#3d5a80] text-white">
                                <AppLogoIcon className="size-4 md:size-5 fill-current" />
                            </div>
                            <span className="text-sm md:text-[15px] font-extrabold text-white tracking-tight hidden sm:block">
                                Toko Pak Haji Elektronik
                            </span>
                            <span className="text-sm md:text-[15px] font-extrabold text-white tracking-tight sm:hidden block">
                                Pak Haji
                            </span>
                        </Link>
                    </div>

                    {/* Center nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[#bdd5ea]/60 hover:text-white hover:bg-[#577399]/10 transition-all"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                        {/* Search button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[#bdd5ea]/60 hover:text-white hover:bg-[#577399]/10 transition-all"
                        >
                            <Search size={16} />
                        </button>

                        {user ? (
                            <>
                                <NotificationDropdown />
                                {/* Cart */}
                                <Link
                                    href={route('cart.index')}
                                    className="relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[#bdd5ea]/60 hover:text-white hover:bg-[#577399]/10 transition-all"
                                >
                                    <ShoppingCart size={16} />
                                    {cartCount > 0 && (
                                        <span className="absolute top-[2px] md:top-[4px] right-[2px] md:right-[4px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#FE5F55] text-white text-[8px] md:text-[9px] font-extrabold flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Avatar dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="w-7 h-7 md:w-8 md:h-8 ml-1 rounded-full bg-gradient-to-br from-[#577399] to-[#3d5a80] text-white text-[11px] md:text-[12px] font-extrabold flex items-center justify-center hover:opacity-80 transition-opacity">
                                            {user.name.charAt(0).toUpperCase()}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-52 bg-[#0d1f33] border-[#577399]/20 text-[#BDD5EA]">
                                        <div className="px-3 py-2.5 border-b border-[#577399]/15">
                                            <p className="text-[13px] font-semibold text-white m-0 truncate">{user.name}</p>
                                            <p className="text-[11px] text-[#577399] mt-0.5 m-0 truncate">{user.email as string}</p>
                                        </div>
                                        {(user.role as string) === 'admin' ? (
                                            <DropdownMenuItem asChild className="focus:bg-[#577399]/20 focus:text-white cursor-pointer">
                                                <Link href={route('dashboard')} className="flex items-center gap-2 text-[#BDD5EA] text-[13px]">
                                                    <LayoutDashboard size={14} /> Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : (
                                            <>
                                                <DropdownMenuItem asChild className="focus:bg-[#577399]/20 focus:text-white cursor-pointer">
                                                    <Link href={route('profile.edit')} className="flex items-center gap-2 text-[#BDD5EA] text-[13px]">
                                                        <UserIcon size={14} /> Profil & Buku Alamat
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="focus:bg-[#577399]/20 focus:text-white cursor-pointer">
                                                    <Link href={route('orders.index')} className="flex items-center gap-2 text-[#BDD5EA] text-[13px]">
                                                        <ShoppingBag size={14} /> Pesanan Saya
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="focus:bg-[#577399]/20 focus:text-white cursor-pointer">
                                                    <Link href={route('customer.installments.index')} className="flex items-center gap-2 text-[#BDD5EA] text-[13px]">
                                                        <CreditCard size={14} /> Angsuran
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuSeparator className="bg-[#577399]/15" />
                                        <DropdownMenuItem asChild className="focus:bg-[#FE5F55]/10 focus:text-[#FE5F55] cursor-pointer">
                                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-2 text-[#FE5F55] text-[13px]">
                                                <LogOut size={14} /> Log Out
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center gap-1 md:gap-2">
                                <Link
                                    href={route('login')}
                                    className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-[12px] md:text-[13px] font-medium text-[#bdd5ea]/60 hover:text-white transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-1.5 md:px-[18px] md:py-2 rounded-full text-[12px] md:text-[13px] font-semibold text-white bg-[#FE5F55] hover:bg-[#e84a40] hover:-translate-y-[1px] transition-all"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-[60px] md:h-[68px]" />
        </>
    );
}

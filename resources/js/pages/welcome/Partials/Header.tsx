import { type User, type SharedData } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Search, LogOut, ShoppingBag, LayoutDashboard, User as UserIcon, CreditCard, X, Menu } from 'lucide-react';
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

// ── NAVY BLUE: #1A3C6D ──
// Seperti Shopee = orange, website ini = Navy Blue
const NAVY = "#1A3C6D";
const NAVY_DARK = "#142E55";

export default function Header({ user }: { user: User | null }) {
    const { cartCount } = usePage<SharedData>().props;
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [q, setQ] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
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
                    className="fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] md:pt-[15vh]"
                    style={{ background: "rgba(26,60,109,0.96)", backdropFilter: "blur(12px)" }}
                    onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}
                >
                    <div className="w-full max-w-[600px] px-4 md:px-6">
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSearch}>
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center gap-3 px-5 py-4">
                                <Search size={18} className="text-muted-foreground flex-none" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Cari produk, kategori..."
                                    value={q}
                                    onChange={e => setQ(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-foreground placeholder:text-muted-foreground focus:ring-0"
                                    style={{ caretColor: NAVY }}
                                />
                                {q && (
                                    <button type="button" onClick={() => setQ('')} className="text-muted-foreground hover:text-foreground">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <p className="mt-3 text-xs text-white/40 text-center">
                                Tekan Enter untuk mencari · Esc untuk menutup
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── Navbar — NAVY BLUE background ─── */}
            <header
                className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
                style={{
                    background: scrolled ? `${NAVY_DARK}F5` : NAVY,
                    backdropFilter: scrolled ? "blur(12px)" : undefined,
                    boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.25)" : "0 1px 0 rgba(255,255,255,0.08)",
                }}
            >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-[60px] md:h-[64px] flex items-center justify-between gap-4 md:gap-8">

                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        {/* Mobile Menu Toggle */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="md:hidden p-2 -ml-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                    <Menu size={20} />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-[280px]" style={{ background: NAVY_DARK, border: "1px solid rgba(255,255,255,0.1)" }}>
                                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                                <SheetDescription className="sr-only">Navigasi situs untuk perangkat seluler</SheetDescription>
                                <div className="p-5 border-b border-white/10 flex items-center gap-3">
                                    <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-white/15">
                                        <AppLogoIcon className="size-5 fill-current text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-extrabold text-white tracking-tight leading-none">Toko Pak Haji</p>
                                        <p className="text-[11px] text-white/50 mt-0.5">Elektronik & Mebel</p>
                                    </div>
                                </div>
                                <div className="py-3 flex flex-col">
                                    {NAV_LINKS.map(({ label, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="px-5 py-3 text-white/70 hover:text-white hover:bg-white/8 transition-colors text-sm font-medium"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/15">
                                <AppLogoIcon className="size-5 fill-current text-white" />
                            </div>
                            <span className="text-[14px] font-extrabold text-white tracking-tight hidden sm:block">
                                Haji Elektronik
                            </span>
                        </Link>
                    </div>

                    {/* Center nav */}
                    <nav className="hidden md:flex items-center gap-0.5">
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="px-4 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            aria-label="Cari"
                        >
                            <Search size={17} />
                        </button>

                        {user ? (
                            <>
                                <NotificationDropdown />
                                {/* Cart */}
                                <Link
                                    href={route('cart.index')}
                                    className="relative w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                                    aria-label="Keranjang"
                                >
                                    <ShoppingCart size={17} />
                                    {cartCount > 0 && (
                                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-extrabold flex items-center justify-center leading-none">
                                            {cartCount > 9 ? '9+' : cartCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Avatar dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="w-8 h-8 ml-1 rounded-full bg-white/15 text-white text-[12px] font-extrabold flex items-center justify-center hover:bg-white/25 transition-colors border border-white/20">
                                            {user.name.charAt(0).toUpperCase()}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-52 bg-card border-border shadow-xl">
                                        <div className="px-3 py-2.5 border-b border-border">
                                            <p className="text-[13px] font-semibold text-foreground m-0 truncate">{user.name}</p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5 m-0 truncate">{user.email as string}</p>
                                        </div>
                                        {(user.role as string) === 'admin' ? (
                                            <DropdownMenuItem asChild className="focus:bg-secondary cursor-pointer">
                                                <Link href={route('dashboard')} className="flex items-center gap-2 text-foreground text-[13px]">
                                                    <LayoutDashboard size={14} /> Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : (
                                            <>
                                                <DropdownMenuItem asChild className="focus:bg-secondary cursor-pointer">
                                                    <Link href={route('profile.edit')} className="flex items-center gap-2 text-foreground text-[13px]">
                                                        <UserIcon size={14} /> Profil & Buku Alamat
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="focus:bg-secondary cursor-pointer">
                                                    <Link href={route('orders.index')} className="flex items-center gap-2 text-foreground text-[13px]">
                                                        <ShoppingBag size={14} /> Pesanan Saya
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="focus:bg-secondary cursor-pointer">
                                                    <Link href={route('customer.installments.index')} className="flex items-center gap-2 text-foreground text-[13px]">
                                                        <CreditCard size={14} /> Angsuran
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuSeparator className="bg-border" />
                                        <DropdownMenuItem asChild className="focus:bg-red-50 focus:text-red-600 cursor-pointer">
                                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-2 text-red-500 text-[13px]">
                                                <LogOut size={14} /> Log Out
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 rounded-lg text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-full text-[13px] font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-[60px] md:h-[64px]" />
        </>
    );
}

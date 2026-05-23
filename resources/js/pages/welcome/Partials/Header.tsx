import { type User, type SharedData } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Search, LogOut, ShoppingBag, LayoutDashboard, User as UserIcon, CreditCard, X } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

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
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 200,
                        background: "rgba(8,15,26,0.95)",
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingTop: "20vh",
                    }}
                    onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}
                >
                    <div style={{ width: "100%", maxWidth: "640px", padding: "0 24px" }}>
                        {/* Close */}
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
                            <button
                                onClick={() => setSearchOpen(false)}
                                style={{ color: "rgba(189,213,234,0.4)", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#BDD5EA")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(189,213,234,0.4)")}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSearch}>
                            <div style={{ position: "relative", borderBottom: "1px solid rgba(87,115,153,0.3)" }}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={q}
                                    onChange={e => setQ(e.target.value)}
                                    style={{
                                        width: "100%",
                                        background: "transparent",
                                        border: "none",
                                        outline: "none",
                                        fontSize: "clamp(24px, 4vw, 40px)",
                                        fontWeight: 700,
                                        color: "white",
                                        letterSpacing: "-0.03em",
                                        padding: "0 0 20px",
                                        caretColor: "#FE5F55",
                                    }}
                                />
                            </div>
                            <p style={{ marginTop: "16px", fontSize: "12px", color: "rgba(87,115,153,0.5)", textAlign: "center" }}>
                                Tekan Enter untuk mencari · Esc untuk menutup
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── Navbar ─── */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
                    background: scrolled ? "rgba(8,15,26,0.95)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: `1px solid ${scrolled ? "rgba(87,115,153,0.12)" : "transparent"}`,
                }}
            >
                <div
                    style={{
                        maxWidth: "1440px",
                        margin: "0 auto",
                        padding: "0 48px",
                        height: "68px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "32px",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexShrink: 0,
                            textDecoration: "none",
                        }}
                    >
                        <div
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "7px",
                                background: "linear-gradient(135deg, #577399, #3d5a80)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                fontWeight: 900,
                                color: "white",
                            }}
                        >
                            HE
                        </div>
                        <span
                            style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: "white",
                                letterSpacing: "-0.025em",
                            }}
                        >
                            Haji Elektronik
                        </span>
                    </Link>

                    {/* Center nav */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                style={{
                                    padding: "7px 14px",
                                    borderRadius: "100px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "rgba(189,213,234,0.55)",
                                    transition: "color 0.2s, background 0.2s",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = "white";
                                    el.style.background = "rgba(87,115,153,0.12)";
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = "rgba(189,213,234,0.55)";
                                    el.style.background = "transparent";
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                        {/* Search button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "rgba(189,213,234,0.5)",
                                transition: "color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "white"; el.style.background = "rgba(87,115,153,0.12)"; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(189,213,234,0.5)"; el.style.background = "transparent"; }}
                        >
                            <Search size={16} />
                        </button>

                        {user ? (
                            <>
                                {/* Cart */}
                                <Link
                                    href={route('cart.index')}
                                    style={{
                                        position: "relative",
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        background: "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "rgba(189,213,234,0.5)",
                                        transition: "color 0.2s, background 0.2s",
                                    }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "white"; el.style.background = "rgba(87,115,153,0.12)"; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(189,213,234,0.5)"; el.style.background = "transparent"; }}
                                >
                                    <ShoppingCart size={16} />
                                    {cartCount > 0 && (
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "2px",
                                                right: "2px",
                                                width: "16px",
                                                height: "16px",
                                                borderRadius: "50%",
                                                background: "#FE5F55",
                                                color: "white",
                                                fontSize: "9px",
                                                fontWeight: 800,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Avatar dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #577399, #3d5a80)",
                                                border: "none",
                                                cursor: "pointer",
                                                color: "white",
                                                fontSize: "12px",
                                                fontWeight: 800,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "opacity 0.2s",
                                            }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                                        >
                                            {user.name.charAt(0).toUpperCase()}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-52"
                                        style={{ background: "#0d1f33", border: "1px solid rgba(87,115,153,0.2)", color: "#BDD5EA" }}
                                    >
                                        <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid rgba(87,115,153,0.15)" }}>
                                            <p style={{ fontSize: "13px", fontWeight: 600, color: "white", margin: 0 }}>{user.name}</p>
                                            <p style={{ fontSize: "11px", color: "#577399", margin: "2px 0 0" }}>{user.email as string}</p>
                                        </div>
                                        {(user.role as string) === 'admin' ? (
                                            <DropdownMenuItem asChild>
                                                <Link href={route('dashboard')} className="flex items-center gap-2" style={{ color: "#BDD5EA", fontSize: "13px" }}>
                                                    <LayoutDashboard size={14} /> Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : (
                                            <>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('addresses.index')} className="flex items-center gap-2" style={{ color: "#BDD5EA", fontSize: "13px" }}>
                                                        <UserIcon size={14} /> Profil & Alamat
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('orders.index')} className="flex items-center gap-2" style={{ color: "#BDD5EA", fontSize: "13px" }}>
                                                        <ShoppingBag size={14} /> Pesanan Saya
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('customer.installments.index')} className="flex items-center gap-2" style={{ color: "#BDD5EA", fontSize: "13px" }}>
                                                        <CreditCard size={14} /> Angsuran
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                        <DropdownMenuSeparator style={{ background: "rgba(87,115,153,0.15)" }} />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-2" style={{ color: "#FE5F55", fontSize: "13px" }}>
                                                <LogOut size={14} /> Log Out
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <Link
                                    href={route('login')}
                                    style={{
                                        padding: "7px 16px",
                                        borderRadius: "100px",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        color: "rgba(189,213,234,0.6)",
                                        transition: "color 0.2s",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "white")}
                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(189,213,234,0.6)")}
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    style={{
                                        padding: "8px 18px",
                                        borderRadius: "100px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        color: "white",
                                        background: "#FE5F55",
                                        textDecoration: "none",
                                        transition: "transform 0.2s, background 0.2s",
                                    }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#e84a40"; el.style.transform = "translateY(-1px)"; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#FE5F55"; el.style.transform = "translateY(0)"; }}
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Spacer */}
            <div style={{ height: "68px" }} />
        </>
    );
}

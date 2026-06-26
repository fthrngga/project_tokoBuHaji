import { Link } from "@inertiajs/react";
import AppLogoIcon from '@/components/app-logo-icon';

export default function Footer() {
    const year = new Date().getFullYear();

    const nav = {
        Produk: [
            { label: "Elektronik", href: "/kategori/elektronik" },
            { label: "Mebel & Furnitur", href: "/kategori/mebel" },
            { label: "Semua Produk", href: "/kategori" },
        ],
        Akun: [
            { label: "Masuk", href: "/login" },
            { label: "Daftar", href: "/register" },
            { label: "Pesanan Saya", href: "/orders" },
        ],
    };

    return (
        <footer className="bg-[#060d18] border-t border-[#577399]/10">
            {/* CTA Band */}
            <div className="bg-[#080f1a] py-12 md:py-20 border-b border-[#577399]/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-start gap-6 md:gap-10">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-[1px] bg-[#FE5F55]" />
                            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#577399] m-0">
                                Mulai Sekarang
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6 md:gap-8">
                            <h2 className="text-4xl md:text-[clamp(40px,6vw,96px)] font-extrabold tracking-tight leading-[1] text-white m-0">
                                Temukan Produk<br />
                                <span className="bg-gradient-to-br from-[#BDD5EA] to-[#8aacca] text-transparent bg-clip-text">
                                    yang Tepat.
                                </span>
                            </h2>

                            <Link
                                href="/kategori/elektronik"
                                className="group inline-flex items-center justify-center gap-3 bg-[#FE5F55] text-white font-bold text-[15px] px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(254,95,85,0.4)] flex-shrink-0 w-full md:w-auto"
                            >
                                Lihat Koleksi
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer body */}
            <div className="max-w-[1440px] mx-auto py-12 md:py-16 px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#577399] to-[#3d5a80] flex items-center justify-center text-white">
                                <AppLogoIcon className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-base font-extrabold text-white tracking-tight">
                                Haji Elektronik
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-[#bdd5ea]/35 max-w-[280px] m-0">
                            Toko elektronik dan mebel terpercaya. Siap membantu Anda menemukan produk yang tepat.
                        </p>
                    </div>

                    {/* Nav */}
                    {Object.entries(nav).map(([section, links]) => (
                        <div key={section}>
                            <p className="text-[11px] font-bold tracking-widest uppercase text-[#577399] mb-5">
                                {section}
                            </p>
                            <ul className="list-none p-0 m-0 flex flex-col gap-3">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-[#bdd5ea]/35 hover:text-[#BDD5EA] transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#577399]/10 py-5 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <p className="text-xs text-[#577399]/40 m-0">
                        © {year} Haji Elektronik. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Syarat & Ketentuan", "Kebijakan Privasi"].map(item => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs text-[#577399]/40 hover:text-[#577399] transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

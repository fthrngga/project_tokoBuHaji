import { Link } from "@inertiajs/react";
import AppLogoIcon from '@/components/app-logo-icon';
import { MessageCircle, Phone } from "lucide-react";

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
        Bantuan: [
            { label: "Cara Pembelian", href: "#" },
            { label: "Program Angsuran", href: "#" },
            { label: "Hubungi Kami", href: "#kontak" },
        ],
    };

    return (
        <footer className="bg-[#111827] text-white">
            {/* Footer body */}
            <div className="max-w-[1440px] mx-auto py-12 md:py-16 px-4 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
                    {/* Brand — spans 2 cols */}
                    <div className="col-span-2 md:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                                <AppLogoIcon className="w-5 h-5 fill-current text-white" />
                            </div>
                            <span className="text-base font-extrabold text-white tracking-tight">
                                Haji Elektronik
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-white/50 max-w-[260px] mb-5">
                            Toko elektronik dan mebel terpercaya di Bengkalis, Riau. Siap membantu Anda menemukan produk yang tepat.
                        </p>
                        {/* Quick contacts */}
                        <div className="flex flex-col gap-2">
                            <a href="tel:082321671759" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                                <Phone size={13} /> 0823 2167 1759
                            </a>
                            <a
                                href="https://wa.me/6282321671759"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                            >
                                <MessageCircle size={13} /> Chat WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(nav).map(([section, links]) => (
                        <div key={section}>
                            <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">
                                {section}
                            </p>
                            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-white/50 hover:text-white transition-colors"
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
            <div className="border-t border-white/8 py-5 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/30 m-0">
                        © {year} Haji Elektronik. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        {["Syarat & Ketentuan", "Kebijakan Privasi"].map(item => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs text-white/30 hover:text-white/60 transition-colors"
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

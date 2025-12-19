import { Link } from "@inertiajs/react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

// Komponen untuk Logo (konsisten dengan Header)
function BrandLogo() {
    return (
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1v1h22V1H1zm2 2v18h18V3H3zm4 4h10v10H7V7zm2 2v6h6V9H9z"/>
            </svg>
            <span className="text-slate-900 dark:text-white">Haji Elektronik</span>
        </Link>
    );
}

// Komponen untuk Ikon Media Sosial
const SocialIcons = () => (
    <div className="flex items-center gap-4 mt-4">
        <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Twitter className="h-5 w-5" /></Link>
        <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Facebook className="h-5 w-5" /></Link>
        <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Instagram className="h-5 w-5" /></Link>
        <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><Github className="h-5 w-5" /></Link>
    </div>
);

// Komponen untuk Ikon Pembayaran
const PaymentIcons = () => (
    <div className="flex items-center gap-4">
        <img src="https://placehold.co/40x25/ffffff/000000?text=VISA" alt="Visa" className="h-6"/>
        <img src="https://placehold.co/40x25/ffffff/000000?text=MC" alt="Mastercard" className="h-6"/>
        <img src="https://placehold.co/40x25/ffffff/000000?text=PP" alt="PayPal" className="h-6"/>
        <img src="https://placehold.co/40x25/ffffff/000000?text=GPay" alt="Google Pay" className="h-6"/>
    </div>
);

export default function Footer() {
    return (
        <footer className="relative bg-gray-100 dark:bg-slate-900 pt-24">
            {/* Banner CTA yang sekarang menjadi bagian dari footer */}
            <div className="absolute left-1/2 -top-12 transform -translate-x-1/2 w-[90%] lg:w-4/5 max-w-6xl">
                 <div className="bg-slate-900 dark:bg-black rounded-3xl py-12 px-8 text-center shadow-2xl">
                    <h2 className="text-4xl font-bold text-white">Toko Haji Elektronik</h2>
                </div>
            </div>

            <div className="container px-4 sm:px-6 lg:px-8">
                {/* Bagian Atas Footer */}
                <div className="grid grid-cols-1 gap-12 pt-20 pb-16 md:grid-cols-5">
                    <div className="col-span-1 md:col-span-2">
                        <BrandLogo />
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                            Menyediakan kebutuhan rumah tangga seperti peralatan elektronik dan perlengkapan meuble.
                        </p>
                        <SocialIcons />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">COMPANY</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">About</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Features</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Works</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Career</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">HELP</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Customer Support</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Delivery Details</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Terms & Conditions</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">RESOURCES</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Free eBooks</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Development Tutorial</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Youtube Playlist</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bagian Bawah Footer */}
                <div className="border-t border-gray-200 dark:border-gray-800 py-6 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Haji Elektronik. All Rights Reserved.
                    </p>
                    <PaymentIcons />
                </div>
            </div>
        </footer>
    );
}


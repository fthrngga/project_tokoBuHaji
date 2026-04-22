import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function PromoBannerSection() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-0 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="p-12 md:p-16 lg:p-24 flex flex-col justify-center text-left order-2 md:order-1">
                        <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 block">Promo Eksklusif</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Wujudkan Ruang Impian, Tanpa Kompromi.
                        </h2>
                        <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                            Dapatkan penawaran terbaik untuk koleksi mebel premium kami. 
                            Kualitas tinggi dengan desain tak lekang oleh waktu.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/kategori/mebel"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 dark:bg-white px-8 text-sm font-medium text-white dark:text-slate-900 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                            >
                                Mulai Menjelajah
                            </Link>
                        </div>
                    </div>
                    <div className="relative h-[400px] md:h-full w-full order-1 md:order-2">
                        <img 
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop" 
                            alt="Mebel Premium" 
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

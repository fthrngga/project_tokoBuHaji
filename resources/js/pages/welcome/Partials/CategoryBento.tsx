import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function CategoryBento() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-medium tracking-tight text-slate-900 dark:text-white">Ekspresi Ruang Anda</h2>
                    <p className="mt-2 text-slate-500">Temukan harmoni antara fungsionalitas dan estetika.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:h-[600px]">
                    {/* BENTO ITEM 1 (Large) */}
                    <div className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-slate-100 min-h-[400px] md:min-h-0">
                        <img 
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                            alt="Mebel Elegan" 
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-3 block">Interior Signature</span>
                            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">Mebel Minimalis Modern</h3>
                            <Link href="/kategori/mebel" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors">
                                Jelajahi Mebel
                            </Link>
                        </div>
                    </div>

                    {/* BENTO COLUMN 2 (Two smaller items) */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="relative flex-1 overflow-hidden rounded-2xl bg-slate-900 min-h-[250px] group">
                            <img 
                                src="https://images.unsplash.com/photo-1550009158-9effb64fda70?q=80&w=2069&auto=format&fit=crop" 
                                alt="Elektronik Canggih" 
                                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                                <h3 className="text-xl font-medium text-white mb-4">Elektronik Premium</h3>
                                <Link href="/kategori/elektronik" className="text-sm font-medium text-white hover:text-slate-300 flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Lihat Koleksi <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex-1 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 p-8 flex flex-col justify-center min-h-[250px]">
                            <div className="mb-4">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Cicilan 0%</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">Miliki barang impian Anda hari ini. Nikmati fasilitas angsuran fleksibel tanpa kartu kredit.</p>
                            <Link href="#" className="text-sm font-medium text-slate-900 dark:text-white underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 dark:decoration-slate-700 dark:hover:decoration-white transition-colors">
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

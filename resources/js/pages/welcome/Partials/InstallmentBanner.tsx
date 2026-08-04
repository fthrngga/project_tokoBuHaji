import { Link } from "@inertiajs/react";
import { CreditCard, CheckCircle2, ArrowRight } from "lucide-react";

const BENEFITS = [
    "Tanpa kartu kredit",
    "Proses persetujuan cepat",
    "Cicilan fleksibel",
    "Bunga transparan",
];

export default function InstallmentBanner() {
    return (
        <section className="py-6 md:py-8">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="relative overflow-hidden rounded-2xl bg-primary px-6 md:px-10 py-8 md:py-10">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.2) 0%, transparent 40%)"
                        }}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5"
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                        }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        {/* Left content */}
                        <div className="flex items-start gap-4">
                            <div className="flex-none w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                                <CreditCard className="text-white" size={22} />
                            </div>
                            <div>
                                <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">
                                    Program Cicilan
                                </p>
                                <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight m-0 mb-3">
                                    Beli Sekarang, Bayar Nanti
                                </h2>
                                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                                    {BENEFITS.map((b) => (
                                        <span key={b} className="inline-flex items-center gap-1.5 text-white/80 text-xs font-medium">
                                            <CheckCircle2 size={12} className="text-white/60" />
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/kategori"
                            className="flex-none inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5 shadow-lg whitespace-nowrap"
                        >
                            Belanja Sekarang
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

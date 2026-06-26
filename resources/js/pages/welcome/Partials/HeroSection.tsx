import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

const TICKER_ITEMS = ["Elektronik", "Perabotan", "Mebel", "Aksesori", "Terbaru"];

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);
    const tickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Entrance animation
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <section
                className="relative w-full overflow-hidden min-h-[100svh] bg-[#080f1a]"
            >
                {/* Fine grain noise texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Subtle radial gradient bottom-right */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(87,115,153,0.08) 0%, transparent 70%)",
                    }}
                />

                {/* ─── Content Grid ─── */}
                <div
                    className="relative z-10 mx-auto grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 md:px-12 max-w-[1440px] min-h-[100svh] pt-24 md:pt-0"
                >
                    {/* ── LEFT: Text ── */}
                    <div
                        className="flex flex-col justify-center"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transform: loaded ? "none" : "translateY(24px)",
                            transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)",
                        }}
                    >
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-8 h-[1px] bg-[#577399]/60" />
                            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#577399]">
                                Haji Elektronik
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-[clamp(44px,5.5vw,88px)] font-extrabold leading-[1.05] md:leading-[1.02] tracking-tight text-white m-0">
                            Elektronik{" "}
                            <span className="bg-gradient-to-br from-[#BDD5EA] to-[#8aacca] text-transparent bg-clip-text">
                                &amp; Mebel
                            </span>
                            <br />
                            untuk Rumah Anda.
                        </h1>

                        {/* Divider */}
                        <div className="w-12 h-0.5 bg-[#FE5F55] rounded-sm my-6 md:my-8" />

                        {/* Subtext */}
                        <p className="text-sm md:text-base leading-relaxed text-[#bdd5ea]/50 max-w-[380px] m-0">
                            Temukan produk elektronik dan perabotan berkualitas yang sesuai dengan kebutuhan dan gaya hidup Anda.
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-5 mt-8 md:mt-10">
                            <Link
                                href="/kategori/elektronik"
                                className="group relative inline-flex items-center gap-3 font-semibold text-white rounded-full overflow-hidden bg-[#FE5F55] px-6 md:px-8 py-3.5 md:py-[15px] text-sm tracking-tight transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(254,95,85,0.4)]"
                            >
                                Lihat Koleksi
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            <Link
                                href="/kategori"
                                className="text-sm font-medium text-[#bdd5ea]/50 hover:text-[#BDD5EA] transition-colors tracking-tight"
                            >
                                Semua Kategori →
                            </Link>
                        </div>
                    </div>

                    {/* ── RIGHT: Image Composition ── */}
                    <div
                        className="relative flex items-center justify-center pb-24 md:pb-0"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transform: loaded ? "none" : "translateY(20px)",
                            transition: "opacity 1s 0.2s cubic-bezier(0.4,0,0.2,1), transform 1s 0.2s cubic-bezier(0.4,0,0.2,1)",
                        }}
                    >
                        {/* Main image card */}
                        <div className="relative overflow-hidden w-full aspect-[4/5] max-w-[460px] rounded-2xl md:rounded-[24px] border border-[#577399]/15">
                            <img
                                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1200&auto=format&fit=crop"
                                alt="Koleksi Produk"
                                className="absolute inset-0 w-full h-full object-cover saturate-[0.75] brightness-[0.85]"
                            />
                            {/* Bottom fade */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080f1a]/70 to-transparent to-50%" />
                        </div>

                        {/* Small floating card — bottom left */}
                        <div className="absolute bottom-16 md:bottom-[10%] left-0 md:left-[-12%] bg-[#080f1a]/90 backdrop-blur-xl border border-[#577399]/20 rounded-xl md:rounded-2xl p-3 md:p-4 min-w-[140px] md:min-w-[160px] shadow-lg">
                            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#577399] mb-1">Kategori</p>
                            <p className="text-xs md:text-sm font-bold text-white m-0">Elektronik</p>
                        </div>

                        {/* Small floating card — top right */}
                        <div className="absolute top-4 md:top-[8%] right-0 md:right-[-8%] bg-[#080f1a]/90 backdrop-blur-xl border border-[#FE5F55]/20 rounded-xl md:rounded-2xl p-3 md:p-4 min-w-[130px] md:min-w-[150px] shadow-lg">
                            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#FE5F55] mb-1">Tersedia</p>
                            <p className="text-xs md:text-sm font-bold text-white m-0">Mebel & Furnitur</p>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
                    style={{ opacity: loaded ? 0.4 : 0, transition: "opacity 1s 0.8s" }}
                >
                    <div
                        className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#577399]/80 animate-scrollPulse"
                    />
                </div>
            </section>

            {/* ─── TICKER ─── */}
            <div className="bg-[#FE5F55] overflow-hidden py-2 md:py-3">
                <div
                    ref={tickerRef}
                    className="flex gap-0 w-max animate-ticker"
                >
                    {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-white/90 px-6 md:px-8 border-r border-white/25"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes ticker {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.3; transform: scaleY(1); }
                    50% { opacity: 1; transform: scaleY(1.1); }
                }
            `}</style>
        </>
    );
}

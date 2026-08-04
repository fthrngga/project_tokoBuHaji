import { Link } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// NAVY BRAND = #1A3C6D — identitas visual website
// Seperti IKEA: headernya putih, tapi langsung keliatan "ini IKEA"
// karena panel biru itu ada di bawah header, bukan di header itu sendiri.

const SLIDES = [
    {
        id: 1,
        eyebrow: "Elektronik",
        title: "Laptop, TV & Perangkat\nRumah Pilihan",
        desc: "Dari laptop kerja hingga smart TV. Garansi resmi, stok terjamin.",
        cta: "Lihat Elektronik",
        ctaHref: "/kategori/elektronik",
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        eyebrow: "Mebel & Furnitur",
        title: "Sofa, Lemari &\nFurnitur Premium",
        desc: "Koleksi mebel berkualitas untuk setiap sudut rumah Anda.",
        cta: "Lihat Mebel",
        ctaHref: "/kategori/mebel",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        eyebrow: "Bayar Fleksibel",
        title: "Cicilan Mudah\nTanpa Kartu Kredit",
        desc: "Syarat ringan, persetujuan cepat. Bayar sesuai kemampuan Anda.",
        cta: "Belanja Sekarang",
        ctaHref: "/kategori",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    },
];

const NAVY = "#1A3C6D";
const NAVY_DARK = "#12284A";

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback((idx: number) => {
        if (animating || idx === current) return;
        setPrev(current);
        setAnimating(true);
        setCurrent(idx);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 600);
    }, [animating, current]);

    const goPrev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
    const goNext = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

    useEffect(() => {
        const t = setInterval(goNext, 5500);
        return () => clearInterval(t);
    }, [goNext]);

    const slide = SLIDES[current];

    return (
        <section
            className="w-full overflow-hidden"
            style={{ height: "clamp(300px, 44vw, 460px)" }}
        >
            <div className="h-full flex flex-col md:flex-row">

                {/* ─── LEFT: NAVY BRAND PANEL ─── */}
                {/* Inilah identitas website — navy solid panel, bukan header berwarna */}
                <div
                    className="relative flex-none md:w-[42%] lg:w-[40%] flex flex-col justify-center px-7 sm:px-10 md:px-12 lg:px-16 py-10 overflow-hidden"
                    style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_DARK} 100%)` }}
                >
                    {/* Subtle pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Content — animated per slide */}
                    <div
                        key={current}
                        style={{ animation: "slideIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards" }}
                    >
                        {/* Eyebrow label */}
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/45 mb-4">
                            {slide.eyebrow}
                        </p>

                        {/* Headline */}
                        <h1 className="text-2xl sm:text-3xl md:text-[clamp(24px,3vw,40px)] font-extrabold text-white leading-[1.15] tracking-tight whitespace-pre-line m-0 mb-4">
                            {slide.title}
                        </h1>

                        {/* Description */}
                        <p className="text-sm text-white/55 leading-relaxed m-0 mb-8 max-w-[280px]">
                            {slide.desc}
                        </p>

                        {/* CTA */}
                        <Link
                            href={slide.ctaHref}
                            className="inline-flex items-center gap-2.5 font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                background: "#E85D4A",
                                color: "#FFFFFF",
                                boxShadow: "0 4px 16px rgba(232,93,74,0.35)",
                            }}
                        >
                            {slide.cta}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>

                    {/* Dot Navigation + Arrows — inside the navy panel */}
                    <div className="absolute bottom-5 left-7 sm:left-10 md:left-12 lg:left-16 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className={`transition-all duration-300 rounded-full ${
                                        i === current
                                            ? 'w-5 h-1.5 bg-white'
                                            : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={goPrev}
                                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={goNext}
                                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
                                aria-label="Next"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Slide counter */}
                    <div className="absolute bottom-5 right-5 text-[10px] font-bold text-white/25 tracking-widest">
                        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                    </div>
                </div>

                {/* ─── RIGHT: PRODUCT IMAGE ─── */}
                <div className="flex-1 relative overflow-hidden hidden md:block bg-[#E8EDF3]">
                    {SLIDES.map((s, i) => (
                        <img
                            key={s.id}
                            src={s.image}
                            alt={s.eyebrow}
                            loading={i === 0 ? "eager" : "lazy"}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
                            style={{ opacity: i === current ? 1 : 0 }}
                        />
                    ))}
                    {/* Very subtle left edge fade to merge with navy panel */}
                    <div
                        className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
                        style={{ background: `linear-gradient(to right, ${NAVY_DARK}60, transparent)` }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}

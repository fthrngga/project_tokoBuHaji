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
                className="relative w-full overflow-hidden"
                style={{ minHeight: "100svh", background: "#080f1a" }}
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
                    className="relative z-10 mx-auto grid items-center"
                    style={{
                        maxWidth: "1440px",
                        minHeight: "100svh",
                        padding: "0 48px",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "48px",
                    }}
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
                        <div className="flex items-center gap-3 mb-8">
                            <div style={{ width: 32, height: 1, background: "rgba(87,115,153,0.6)" }} />
                            <span
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                    color: "#577399",
                                }}
                            >
                                Haji Elektronik
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            style={{
                                fontSize: "clamp(44px, 5.5vw, 88px)",
                                fontWeight: 800,
                                lineHeight: 1.02,
                                letterSpacing: "-0.04em",
                                color: "#ffffff",
                                margin: 0,
                            }}
                        >
                            Elektronik{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #BDD5EA 0%, #8aacca 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                &amp; Mebel
                            </span>
                            <br />
                            untuk Rumah Anda.
                        </h1>

                        {/* Divider */}
                        <div
                            style={{
                                width: 48,
                                height: 2,
                                background: "#FE5F55",
                                borderRadius: 2,
                                margin: "32px 0",
                            }}
                        />

                        {/* Subtext */}
                        <p
                            style={{
                                fontSize: "16px",
                                lineHeight: 1.7,
                                color: "rgba(189,213,234,0.5)",
                                maxWidth: "380px",
                                margin: 0,
                            }}
                        >
                            Temukan produk elektronik dan perabotan berkualitas yang sesuai dengan kebutuhan dan gaya hidup Anda.
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-5 mt-10">
                            <Link
                                href="/kategori/elektronik"
                                className="group relative inline-flex items-center gap-3 font-semibold text-white rounded-full overflow-hidden"
                                style={{
                                    background: "#FE5F55",
                                    padding: "15px 32px",
                                    fontSize: "14px",
                                    letterSpacing: "-0.01em",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    boxShadow: "0 0 0 0 rgba(254,95,85,0)",
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = "translateY(-2px)";
                                    el.style.boxShadow = "0 12px 32px rgba(254,95,85,0.4)";
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = "translateY(0)";
                                    el.style.boxShadow = "0 0 0 0 rgba(254,95,85,0)";
                                }}
                            >
                                Lihat Koleksi
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s" }}
                                    className="group-hover:translate-x-1">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            <Link
                                href="/kategori"
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "rgba(189,213,234,0.5)",
                                    transition: "color 0.2s",
                                    letterSpacing: "-0.01em",
                                }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#BDD5EA")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(189,213,234,0.5)")}
                            >
                                Semua Kategori →
                            </Link>
                        </div>
                    </div>

                    {/* ── RIGHT: Image Composition ── */}
                    <div
                        className="relative flex items-center justify-center"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transform: loaded ? "none" : "translateY(20px)",
                            transition: "opacity 1s 0.2s cubic-bezier(0.4,0,0.2,1), transform 1s 0.2s cubic-bezier(0.4,0,0.2,1)",
                        }}
                    >
                        {/* Main image card */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                width: "100%",
                                aspectRatio: "4/5",
                                maxWidth: 460,
                                borderRadius: "24px",
                                border: "1px solid rgba(87,115,153,0.15)",
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1200&auto=format&fit=crop"
                                alt="Koleksi Produk"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    filter: "saturate(0.75) brightness(0.85)",
                                }}
                            />
                            {/* Bottom fade */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(8,15,26,0.7) 0%, transparent 50%)",
                                }}
                            />
                        </div>

                        {/* Small floating card — bottom left */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "10%",
                                left: "-12%",
                                background: "rgba(8,15,26,0.9)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(87,115,153,0.2)",
                                borderRadius: "16px",
                                padding: "16px 20px",
                                minWidth: "160px",
                            }}
                        >
                            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#577399", marginBottom: "4px" }}>Kategori</p>
                            <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Elektronik</p>
                        </div>

                        {/* Small floating card — top right */}
                        <div
                            style={{
                                position: "absolute",
                                top: "8%",
                                right: "-8%",
                                background: "rgba(8,15,26,0.9)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(254,95,85,0.2)",
                                borderRadius: "16px",
                                padding: "16px 20px",
                                minWidth: "150px",
                            }}
                        >
                            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#FE5F55", marginBottom: "4px" }}>Tersedia</p>
                            <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Mebel & Furnitur</p>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    style={{ opacity: loaded ? 0.4 : 0, transition: "opacity 1s 0.8s" }}
                >
                    <div
                        style={{
                            width: 1,
                            height: 40,
                            background: "linear-gradient(to bottom, rgba(87,115,153,0), rgba(87,115,153,0.8))",
                            animation: "scrollPulse 2s ease-in-out infinite",
                        }}
                    />
                </div>
            </section>

            {/* ─── TICKER ─── */}
            <div style={{ background: "#FE5F55", overflow: "hidden", padding: "12px 0" }}>
                <div
                    ref={tickerRef}
                    style={{
                        display: "flex",
                        gap: "0",
                        width: "max-content",
                        animation: "ticker 18s linear infinite",
                    }}
                >
                    {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span
                            key={i}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.9)",
                                padding: "0 32px",
                                borderRight: "1px solid rgba(255,255,255,0.25)",
                            }}
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
                @media (max-width: 768px) {
                    .hero-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </>
    );
}

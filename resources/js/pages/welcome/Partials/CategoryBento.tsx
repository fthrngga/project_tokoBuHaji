import { Link } from "@inertiajs/react";
import { useRef, useState } from "react";

const CATEGORIES = [
    {
        label: "Elektronik",
        href: "/kategori/elektronik",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1400&auto=format&fit=crop",
        span: "col", // wide
    },
    {
        label: "Mebel",
        href: "/kategori/mebel",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop",
        span: "row", // tall
    },
    {
        label: "Peralatan Rumah",
        href: "/kategori/peralatan",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900&auto=format&fit=crop",
        span: "normal",
    },
];

function Cat({ cat, style }: { cat: typeof CATEGORIES[0], style?: React.CSSProperties }) {
    const [hovered, setHovered] = useState(false);
    return (
        <Link
            href={cat.href}
            className="relative block overflow-hidden"
            style={{
                borderRadius: "16px",
                ...style,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={cat.image}
                alt={cat.label}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)",
                    filter: "saturate(0.75) brightness(0.7)",
                }}
            />
            {/* Gradient */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(8,15,26,0.85) 0%, rgba(8,15,26,0.1) 60%, transparent 100%)",
                }}
            />
            {/* Hover tint */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(87,115,153,0.25)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.4s",
                }}
            />
            {/* Label */}
            <div style={{ position: "absolute", bottom: 0, left: 0, padding: "24px 28px" }}>
                <p style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(189,213,234,0.6)",
                    marginBottom: "6px",
                    transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    transition: "transform 0.35s",
                }}>
                    Kategori
                </p>
                <h3 style={{
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    transform: hovered ? "translateY(-2px)" : "translateY(0)",
                    transition: "transform 0.35s 0.05s",
                }}>
                    {cat.label}
                </h3>
            </div>
            {/* Arrow */}
            <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: hovered ? "#FE5F55" : "rgba(87,115,153,0.25)",
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s, transform 0.3s",
                transform: hovered ? "rotate(45deg)" : "rotate(0)",
            }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </Link>
    );
}

export default function CategoryBento() {
    return (
        <section style={{ background: "#080f1a", padding: "96px 0" }}>
            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
                    <div>
                        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#577399", marginBottom: "10px" }}>
                            Apa yang Kami Sediakan
                        </p>
                        <h2 style={{ fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: "white", lineHeight: 1, margin: 0 }}>
                            Kategori
                        </h2>
                    </div>
                    <Link
                        href="/kategori"
                        style={{ fontSize: "13px", fontWeight: 500, color: "rgba(189,213,234,0.4)", transition: "color 0.2s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#BDD5EA")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(189,213,234,0.4)")}
                    >
                        Semua kategori →
                    </Link>
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "280px 280px", gap: "12px" }}>
                    {/* Large — spans 2 rows */}
                    <div style={{ gridRow: "span 2" }}>
                        <Cat cat={CATEGORIES[0]} style={{ height: "100%" }} />
                    </div>
                    <Cat cat={CATEGORIES[1]} />
                    <Cat cat={CATEGORIES[2]} />
                </div>
            </div>
        </section>
    );
}

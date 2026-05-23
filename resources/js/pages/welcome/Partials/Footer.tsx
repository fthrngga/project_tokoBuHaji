import { Link } from "@inertiajs/react";

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
        <footer style={{ background: "#060d18", borderTop: "1px solid rgba(87,115,153,0.1)" }}>
            {/* CTA Band */}
            <div style={{ background: "#080f1a", padding: "80px 0", borderBottom: "1px solid rgba(87,115,153,0.08)" }}>
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "40px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "24px", height: "1px", background: "#FE5F55" }} />
                            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#577399", margin: 0 }}>
                                Mulai Sekarang
                            </p>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: "32px" }}>
                            <h2
                                style={{
                                    fontSize: "clamp(40px, 6vw, 96px)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.05em",
                                    lineHeight: 0.95,
                                    color: "white",
                                    margin: 0,
                                }}
                            >
                                Temukan Produk<br />
                                <span style={{
                                    background: "linear-gradient(135deg, #BDD5EA 0%, #8aacca 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    yang Tepat.
                                </span>
                            </h2>

                            <Link
                                href="/kategori/elektronik"
                                className="group"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    background: "#FE5F55",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    padding: "18px 40px",
                                    borderRadius: "100px",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    flexShrink: 0,
                                    alignSelf: "flex-end",
                                    letterSpacing: "-0.01em",
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = "translateY(-3px)";
                                    el.style.boxShadow = "0 16px 40px rgba(254,95,85,0.4)";
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = "translateY(0)";
                                    el.style.boxShadow = "none";
                                }}
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
            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px" }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #577399, #3d5a80)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "11px",
                                    fontWeight: 900,
                                    color: "white",
                                }}
                            >
                                HE
                            </div>
                            <span style={{ fontSize: "16px", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                                Haji Elektronik
                            </span>
                        </Link>
                        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(189,213,234,0.35)", maxWidth: "280px", margin: 0 }}>
                            Toko elektronik dan mebel terpercaya. Siap membantu Anda menemukan produk yang tepat.
                        </p>
                    </div>

                    {/* Nav */}
                    {Object.entries(nav).map(([section, links]) => (
                        <div key={section}>
                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#577399", marginBottom: "20px" }}>
                                {section}
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            style={{ fontSize: "14px", color: "rgba(189,213,234,0.35)", transition: "color 0.2s" }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#BDD5EA")}
                                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(189,213,234,0.35)")}
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
            <div style={{ borderTop: "1px solid rgba(87,115,153,0.08)", padding: "20px 48px" }}>
                <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "12px", color: "rgba(87,115,153,0.4)", margin: 0 }}>
                        © {year} Haji Elektronik. All rights reserved.
                    </p>
                    <div style={{ display: "flex", gap: "24px" }}>
                        {["Syarat & Ketentuan", "Kebijakan Privasi"].map(item => (
                            <Link
                                key={item}
                                href="#"
                                style={{ fontSize: "12px", color: "rgba(87,115,153,0.4)", transition: "color 0.2s" }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#577399")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(87,115,153,0.4)")}
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

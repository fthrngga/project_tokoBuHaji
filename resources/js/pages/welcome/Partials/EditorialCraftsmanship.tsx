// EditorialCraftsmanship — Visual break section
// No fake stats. No unverifiable claims.
// Just a beautiful full-bleed image with a focused, honest statement.

export default function EditorialCraftsmanship() {
    return (
        <section style={{ background: "#080f1a", padding: "0 0 96px" }}>
            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0",
                        overflow: "hidden",
                        borderRadius: "24px",
                        border: "1px solid rgba(87,115,153,0.12)",
                        minHeight: "520px",
                    }}
                >
                    {/* Left: Content */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "64px 56px",
                            background: "#0d1f33",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                            <div style={{ width: "24px", height: "1px", background: "#FE5F55" }} />
                            <p style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "#577399",
                                margin: 0,
                            }}>
                                Tentang Kami
                            </p>
                        </div>

                        <h2
                            style={{
                                fontSize: "clamp(28px, 3.5vw, 48px)",
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.1,
                                color: "white",
                                margin: "0 0 24px",
                            }}
                        >
                            Melayani Kebutuhan Rumah Anda.
                        </h2>

                        <p
                            style={{
                                fontSize: "15px",
                                lineHeight: 1.75,
                                color: "rgba(189,213,234,0.5)",
                                maxWidth: "380px",
                                margin: 0,
                            }}
                        >
                            Toko Haji Elektronik hadir untuk memenuhi kebutuhan elektronik dan perabotan rumah tangga Anda. Kami menyediakan produk pilihan dengan pelayanan yang ramah dan profesional.
                        </p>

                        {/* Divider */}
                        <div
                            style={{
                                width: "100%",
                                height: "1px",
                                background: "rgba(87,115,153,0.15)",
                                margin: "40px 0",
                            }}
                        />

                        <p
                            style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "rgba(189,213,234,0.35)",
                                fontStyle: "italic",
                            }}
                        >
                            "Kunjungi toko kami dan temukan produk yang tepat untuk Anda."
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                        <img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
                            alt="Koleksi Mebel"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "saturate(0.6) brightness(0.75)",
                            }}
                        />
                        {/* Left edge fade */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to right, #0d1f33 0%, transparent 40%)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

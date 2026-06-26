// EditorialCraftsmanship — Visual break section
// No fake stats. No unverifiable claims.
// Just a beautiful full-bleed image with a focused, honest statement.

export default function EditorialCraftsmanship() {
    return (
        <section className="bg-[#080f1a] pb-16 md:pb-[96px]">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div
                    className="flex flex-col md:grid md:grid-cols-2 gap-0 overflow-hidden rounded-[20px] md:rounded-[24px] border border-[#577399]/10 min-h-[400px] md:min-h-[520px]"
                >
                    {/* Left: Content */}
                    <div
                        className="flex flex-col justify-center px-6 py-10 sm:px-10 md:px-14 md:py-16 bg-[#0d1f33] z-10"
                    >
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-6 h-[1px] bg-[#FE5F55]" />
                            <p className="text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-[#577399] m-0">
                                Tentang Kami
                            </p>
                        </div>

                        <h2
                            className="text-3xl md:text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-tight leading-[1.1] text-white m-0 mb-4 md:mb-6"
                        >
                            Melayani Kebutuhan Rumah Anda.
                        </h2>

                        <p
                            className="text-sm md:text-[15px] leading-relaxed text-[#bdd5ea]/50 max-w-[380px] m-0"
                        >
                            Toko Haji Elektronik hadir untuk memenuhi kebutuhan elektronik dan perabotan rumah tangga Anda. Kami menyediakan produk pilihan dengan pelayanan yang ramah dan profesional.
                        </p>

                        {/* Divider */}
                        <div
                            className="w-full h-[1px] bg-[#577399]/15 my-8 md:my-10"
                        />

                        <p
                            className="text-xs md:text-[13px] font-medium text-[#bdd5ea]/35 italic m-0"
                        >
                            "Kunjungi toko kami dan temukan produk yang tepat untuk Anda."
                        </p>
                    </div>

                    {/* Right: Image */}
                    <div className="relative overflow-hidden min-h-[250px] md:min-h-0">
                        <img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"
                            alt="Koleksi Mebel"
                            className="absolute inset-0 w-full h-full object-cover saturate-[0.6] brightness-75"
                        />
                        {/* Left edge fade - desktop only */}
                        <div
                            className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0d1f33] to-transparent to-40%"
                        />
                        {/* Top edge fade - mobile only */}
                        <div
                            className="md:hidden absolute inset-0 bg-gradient-to-b from-[#0d1f33] to-transparent to-40%"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

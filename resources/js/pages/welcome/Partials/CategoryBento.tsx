import { Link } from "@inertiajs/react";
import { useState } from "react";

const CATEGORIES = [
    {
        label: "Elektronik",
        href: "/kategori/elektronik",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1400&auto=format&fit=crop",
    },
    {
        label: "Mebel",
        href: "/kategori/mebel",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop",
    },
    {
        label: "Peralatan Rumah",
        href: "/kategori/peralatan",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900&auto=format&fit=crop",
    },
];

function Cat({ cat, className = "" }: { cat: typeof CATEGORIES[0], className?: string }) {
    const [hovered, setHovered] = useState(false);
    return (
        <Link
            href={cat.href}
            className={`relative block overflow-hidden rounded-[16px] ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={cat.image}
                alt={cat.label}
                className={`absolute inset-0 w-full h-full object-cover saturate-[0.75] brightness-75 transition-transform duration-1000 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f1a]/90 via-[#080f1a]/20 to-transparent" />
            
            {/* Hover tint */}
            <div
                className={`absolute inset-0 bg-[#577399]/20 transition-opacity duration-400 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            />
            
            {/* Label */}
            <div className="absolute bottom-0 left-0 p-5 md:p-7 w-full">
                <p className={`text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-[#bdd5ea]/60 mb-1.5 transition-transform duration-300 ${hovered ? '-translate-y-1' : 'translate-y-0'}`}>
                    Kategori
                </p>
                <h3 className={`text-2xl md:text-[clamp(20px,2.5vw,32px)] font-extrabold text-white leading-none tracking-tight transition-transform duration-300 delay-50 ${hovered ? '-translate-y-1' : 'translate-y-0'}`}>
                    {cat.label}
                </h3>
            </div>
            
            {/* Arrow */}
            <div className={`absolute top-4 right-4 md:top-5 md:right-5 backdrop-blur-md rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 ${hovered ? 'bg-[#FE5F55] rotate-45' : 'bg-[#577399]/25 rotate-0'}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </Link>
    );
}

export default function CategoryBento() {
    return (
        <section className="bg-[#080f1a] py-16 md:py-24">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Section header */}
                <div className="flex flex-row items-end justify-between mb-8 md:mb-10">
                    <div>
                        <p className="text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-[#577399] mb-2">
                            Apa yang Kami Sediakan
                        </p>
                        <h2 className="text-3xl md:text-[clamp(28px,4vw,56px)] font-extrabold tracking-tight text-white leading-none m-0">
                            Kategori
                        </h2>
                    </div>
                    <Link
                        href="/kategori"
                        className="text-[12px] md:text-[13px] font-medium text-[#bdd5ea]/40 hover:text-[#BDD5EA] transition-colors mb-1"
                    >
                        Semua kategori →
                    </Link>
                </div>

                {/* Grid */}
                <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4 h-auto md:h-[580px]">
                    {/* Large — spans 2 rows & 2 cols on desktop */}
                    <div className="md:col-span-2 md:row-span-2 h-[300px] md:h-full">
                        <Cat cat={CATEGORIES[0]} className="h-full w-full" />
                    </div>
                    <div className="h-[200px] md:h-full">
                        <Cat cat={CATEGORIES[1]} className="h-full w-full" />
                    </div>
                    <div className="h-[200px] md:h-full">
                        <Cat cat={CATEGORIES[2]} className="h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}

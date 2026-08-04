import { Link } from "@inertiajs/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
    {
        label: "Elektronik",
        href: "/kategori/elektronik",
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=900&auto=format&fit=crop",
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
            className={`relative block overflow-hidden rounded-2xl ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={cat.image}
                alt={cat.label}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}
            />
            {/* Gradient overlay — always present for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Hover tint */}
            <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Label */}
            <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full z-10 flex items-end justify-between">
                <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-white/70 mb-1">
                        Kategori
                    </p>
                    <h3 className={`text-xl md:text-2xl font-extrabold text-white leading-none tracking-tight transition-transform duration-300 ${hovered ? '-translate-y-1' : 'translate-y-0'}`}>
                        {cat.label}
                    </h3>
                </div>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${hovered ? 'bg-primary rotate-0' : 'bg-white/20 -rotate-45'}`}>
                    <ArrowUpRight size={16} className="text-white" />
                </div>
            </div>
        </Link>
    );
}

export default function CategoryBento() {
    return (
        <section className="py-10 md:py-14 bg-background">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                {/* Section header */}
                <div className="flex flex-row items-end justify-between mb-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground m-0">
                            Jelajahi Kategori
                        </h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Temukan produk sesuai kebutuhan Anda</p>
                    </div>
                    <Link
                        href="/kategori"
                        className="text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        Semua →
                    </Link>
                </div>

                {/* Grid */}
                <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4 h-auto md:h-[520px]">
                    {/* Large — spans 2 rows & 2 cols on desktop */}
                    <div className="md:col-span-2 md:row-span-2 h-[260px] md:h-full">
                        <Cat cat={CATEGORIES[0]} className="h-full w-full" />
                    </div>
                    <div className="h-[180px] md:h-full">
                        <Cat cat={CATEGORIES[1]} className="h-full w-full" />
                    </div>
                    <div className="h-[180px] md:h-full">
                        <Cat cat={CATEGORIES[2]} className="h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}

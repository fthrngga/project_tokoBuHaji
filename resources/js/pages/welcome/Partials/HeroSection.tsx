import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

// Komponen Kartu Kategori yang Interaktif
const ProductCategoryCard = ({ title, description, imageUrl, href }: { title: string, description: string, imageUrl: string, href: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    // Efek Tilt 3D
    const rotateX = useSpring(useTransform(mouseY, [0, 300], [10, -10]), { stiffness: 300, damping: 30, mass: 0.5 });
    const rotateY = useSpring(useTransform(mouseX, [0, 500], [-10, 10]), { stiffness: 300, damping: 30, mass: 0.5 });

    // Efek Parallax pada gambar
    const imgTranslateX = useTransform(mouseX, [0, 500], [-10, 10]);
    const imgTranslateY = useTransform(mouseY, [0, 300], [-5, 5]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                mouseX.set(250); // Reset ke tengah
                mouseY.set(150); // Reset ke tengah
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-transparent shadow-lg"
            >
                <motion.img
                    src={imageUrl}
                    alt={title}
                    style={{
                        translateX: imgTranslateX,
                        translateY: imgTranslateY,
                    }}
                    className="absolute inset-0 h-full w-full object-cover rounded-xl opacity-20"
                />
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="text-center text-white"
                >
                    <h2 className="text-4xl font-bold">{title}</h2>
                    <p className="mt-2 text-slate-300">{description}</p>
                    <Link href={href} className="mt-4 inline-flex items-center gap-2 text-orange-400 font-semibold group">
                        Jelajahi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

// Komponen Utama HeroSection
export default function HeroSection() {
    return (
        <section className="w-full bg-white dark:bg-black py-20 lg:py-28">
            <div className="container px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
                        Desain Ruang, Ciptakan <span className="text-slate-500 dark:text-slate-400">Kenyamanan.</span>
                    </h1>
                    <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                        Pilih kategori untuk menemukan koleksi perabotan dan elektronik yang memadukan fungsionalitas dan estetika modern.
                    </p>
                </motion.div>
            </div>

            <div className="container px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <ProductCategoryCard
                    title="Elektronik"
                    description="Peralatan canggih untuk hidup Anda."
                    imageUrl="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1778&auto=format&fit=crop"
                    href="/kategori/elektronik"
                />
                <ProductCategoryCard
                    title="Mebel"
                    description="Furnitur modern untuk setiap sudut."
                    imageUrl="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"
                    href="/kategori/mebel"
                />
            </div>
        </section>
    );
}


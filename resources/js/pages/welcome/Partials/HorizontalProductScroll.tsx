import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { ProductCard } from "@/components/ProductCard";

export default function HorizontalProductScroll({
    products,
    title,
}: {
    products: Product[];
    title: string;
    subtitle?: string;
}) {
    if (!products || products.length === 0) return null;

    return (
        <section style={{ background: "#080f1a", padding: "96px 0 80px" }}>
            {/* Section header */}
            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px", marginBottom: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <h2 style={{
                        fontSize: "clamp(24px, 3.5vw, 48px)",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        color: "white",
                        lineHeight: 1,
                        flexShrink: 0,
                        margin: 0,
                    }}>
                        {title}
                    </h2>
                    <div style={{ flex: 1, height: "1px", background: "rgba(87,115,153,0.12)" }} />
                </div>
            </div>

            {/* Scroll track — bleeds to edge */}
            <div
                style={{
                    display: "flex",
                    gap: "14px",
                    overflowX: "auto",
                    padding: "4px 48px 16px",
                    scrollbarWidth: "none",
                    cursor: "grab",
                    maxWidth: "1440px",
                    margin: "0 auto",
                }}
            >
                {products.map((product) => (
                    <div key={product.id} style={{ flex: "none", width: "clamp(220px, 22vw, 280px)" }}>
                        <ProductCard product={product} />
                    </div>
                ))}
                <div style={{ flex: "none", width: "32px" }} />
            </div>
        </section>
    );
}

import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { route } from "ziggy-js";
import { useState } from "react";

const fmt = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

export const ProductCard = ({ product }: { product: Product }) => {
    const [hovered, setHovered] = useState(false);

    const img = product.images?.length > 0
        ? `/storage/${product.images[0].image_path}`
        : `https://placehold.co/600x600/0b1929/2a4a6a?text=${encodeURIComponent(product.name.charAt(0))}`;

    return (
        <Link
            href={route("products.show", product.slug)}
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: "16px",
                background: "#0d1f33",
                border: `1px solid ${hovered ? "rgba(87,115,153,0.35)" : "rgba(87,115,153,0.1)"}`,
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                transform: hovered ? "translateY(-5px)" : "translateY(0)",
                boxShadow: hovered ? "0 24px 48px rgba(8,15,26,0.7)" : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#0b1929" }}>
                <img
                    src={img}
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "20px",
                        transform: hovered ? "scale(1.06)" : "scale(1)",
                        transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                    }}
                />
                {/* Hover overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "16px",
                        background: "linear-gradient(to top, rgba(8,15,26,0.75), transparent)",
                        opacity: hovered ? 1 : 0,
                        transition: "opacity 0.3s",
                    }}
                >
                    <span
                        style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "white",
                            background: "rgba(87,115,153,0.5)",
                            backdropFilter: "blur(8px)",
                            padding: "6px 12px",
                            borderRadius: "20px",
                        }}
                    >
                        Lihat Detail
                    </span>
                </div>

                {/* Low stock badge */}
                {product.stock > 0 && product.stock <= 5 && (
                    <div
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "#FE5F55",
                            color: "white",
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: "20px",
                        }}
                    >
                        Sisa {product.stock}
                    </div>
                )}
            </div>

            {/* Info */}
            <div style={{ padding: "16px 18px 18px" }}>
                {product.category && (
                    <p style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#577399",
                        marginBottom: "6px",
                    }}>
                        {product.category.name}
                    </p>
                )}
                <h3 style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: hovered ? "#BDD5EA" : "#e8f0f8",
                    marginBottom: "12px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    transition: "color 0.2s",
                }}>
                    {product.name}
                </h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                        {fmt(product.price)}
                    </p>
                    <span style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: product.stock > 0 ? "#4ade80" : "#577399",
                        letterSpacing: "0.06em",
                    }}>
                        {product.stock > 0 ? "Tersedia" : "Pre-order"}
                    </span>
                </div>
            </div>
        </Link>
    );
};

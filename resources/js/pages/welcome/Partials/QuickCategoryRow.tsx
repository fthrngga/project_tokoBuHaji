import { Link } from "@inertiajs/react";
import {
    Monitor, Sofa, AirVent, ShoppingBag, Tv, Laptop, Refrigerator, Wind
} from "lucide-react";

const CATEGORIES = [
    { label: "Semua", href: "/kategori", icon: ShoppingBag, active: false },
    { label: "Elektronik", href: "/kategori/elektronik", icon: Monitor, active: false },
    { label: "Mebel", href: "/kategori/mebel", icon: Sofa, active: false },
    { label: "Laptop", href: "/kategori/elektronik", icon: Laptop, active: false },
    { label: "TV & Monitor", href: "/kategori/elektronik", icon: Tv, active: false },
    { label: "AC & Pendingin", href: "/kategori/elektronik", icon: AirVent, active: false },
    { label: "Kulkas", href: "/kategori/elektronik", icon: Refrigerator, active: false },
    { label: "Kipas Angin", href: "/kategori/elektronik", icon: Wind, active: false },
];

export default function QuickCategoryRow() {
    return (
        <div className="bg-card border-b border-border">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                    {CATEGORIES.map(({ label, href, icon: Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            className="flex-none inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-secondary hover:border-primary/30 hover:text-primary text-foreground text-sm font-medium transition-all duration-200 whitespace-nowrap group"
                        >
                            <Icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { type SharedData, type Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import HeroSection from './welcome/Partials/HeroSection';
import Header from './welcome/Partials/Header';
import Footer from './welcome/Partials/Footer';
import CategoryBento from './welcome/Partials/CategoryBento';
import HorizontalProductScroll from './welcome/Partials/HorizontalProductScroll';
import EditorialCraftsmanship from './welcome/Partials/EditorialCraftsmanship';
import ContactSection from './welcome/Partials/ContactSection';

export default function Welcome() {
    const { auth, featuredProducts, recommendedProducts } = usePage<{
        auth: SharedData['auth'];
        featuredProducts: Product[];
        recommendedProducts: Product[];
    }>().props;

    return (
        <>
            <Head title="Haji Elektronik — Elektronik & Mebel" />
            <div style={{ background: "#080f1a", color: "#F7F7FF", fontFamily: "Inter, system-ui, sans-serif" }}>
                <Header user={auth.user} />

                <main>
                    <HeroSection />
                    <CategoryBento />
                    <HorizontalProductScroll
                        products={featuredProducts}
                        title="Produk Terbaru"
                    />
                    <EditorialCraftsmanship />
                    <HorizontalProductScroll
                        products={recommendedProducts}
                        title={auth.user ? "Untuk Anda" : "Produk Pilihan"}
                    />
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
}

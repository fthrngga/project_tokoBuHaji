import { type SharedData, type Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import HeroSection from './welcome/Partials/HeroSection';
import Header from './welcome/Partials/Header';
import Footer from './welcome/Partials/Footer';
import QuickCategoryRow from './welcome/Partials/QuickCategoryRow';
import FeaturedProductsGrid from './welcome/Partials/FeaturedProductsGrid';
import CategoryBento from './welcome/Partials/CategoryBento';
import HorizontalProductScroll from './welcome/Partials/HorizontalProductScroll';
import InstallmentBanner from './welcome/Partials/InstallmentBanner';
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
            <div className="bg-background text-foreground min-h-screen font-sans">
                <Header user={auth.user} />

                <main>
                    {/* 1. Promo Banner Slider */}
                    <HeroSection />

                    {/* 2. Quick Category Navigation */}
                    <QuickCategoryRow />

                    {/* 3. Featured Products Grid */}
                    <FeaturedProductsGrid products={featuredProducts} />

                    {/* 4. Category Bento */}
                    <CategoryBento />

                    {/* 5. New Products Horizontal Scroll */}
                    <HorizontalProductScroll
                        products={featuredProducts}
                        title="Produk Terbaru"
                    />

                    {/* 6. Installment Highlight Banner */}
                    <InstallmentBanner />

                    {/* 7. Recommended Products */}
                    <HorizontalProductScroll
                        products={recommendedProducts}
                        title="Produk Pilihan"
                    />

                    {/* 8. Contact */}
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
}

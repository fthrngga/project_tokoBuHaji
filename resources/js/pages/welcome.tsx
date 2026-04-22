import { type SharedData, type Product } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import HeroSection from './welcome/Partials/HeroSection';
import Header from './welcome/Partials/Header';
import Footer from './welcome/Partials/Footer';
import CategoryBento from './welcome/Partials/CategoryBento';
import HorizontalProductScroll from './welcome/Partials/HorizontalProductScroll';
import EditorialCraftsmanship from './welcome/Partials/EditorialCraftsmanship';

export default function Welcome() {
    const { auth, featuredProducts, recommendedProducts } = usePage<{ auth: SharedData['auth'], featuredProducts: Product[], recommendedProducts: Product[] }>().props;

    return (
        <>
            <Head title="Haji Elektronik - Perabotan & Elektronik Premium" />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-slate-200 selection:text-slate-900">
                <Header user={auth.user} />

                <main className="flex-1">
                    <HeroSection />
                    
                    <CategoryBento />

                    <HorizontalProductScroll 
                        products={featuredProducts} 
                        title="Terbaru di Koleksi Kami" 
                        subtitle="Eksplorasi inovasi terbaru untuk menyempurnakan rumah Anda." 
                    />

                    <EditorialCraftsmanship />

                    <HorizontalProductScroll 
                        products={recommendedProducts} 
                        title={auth.user ? "Kurasi Khusus Anda" : "Mungkin Anda Suka"} 
                        subtitle="Rekomendasi yang dipersonalisasi dari koleksi terbaik kami." 
                    />
                </main>

                <Footer />
            </div>
        </>
    );
}


export default function EditorialCraftsmanship() {
    return (
        <section className="bg-white dark:bg-black py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 flex flex-col justify-center">
                        <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-6 block">Kualitas Tanpa Kompromi</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            Dibuat Untuk Bertahan Lintas Generasi.
                        </h2>
                        <p className="mt-8 text-lg text-slate-500 leading-relaxed max-w-lg">
                            Kami percaya bahwa setiap produk di rumah Anda harus menceritakan sebuah kisah. 
                            Kisah tentang dedikasi, material terbaik, dan perhatian terhadap detail terkecil. 
                            Temukan standar baru dalam perabotan dan alat elektronik.
                        </p>
                        
                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                            <div>
                                <h4 className="text-3xl font-light text-slate-900 dark:text-white mb-2">99%</h4>
                                <p className="text-sm text-slate-500 font-medium">Kepuasan Pelanggan</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-light text-slate-900 dark:text-white mb-2">5 Thn</h4>
                                <p className="text-sm text-slate-500 font-medium">Garansi Resmi Terpanjang</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="order-1 lg:order-2">
                        <div className="aspect-[4/5] w-full bg-slate-100 overflow-hidden rounded-2xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=2070&auto=format&fit=crop" 
                                alt="Detail Craftsmanship" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

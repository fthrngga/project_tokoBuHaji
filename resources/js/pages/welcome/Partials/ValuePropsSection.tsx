import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, CreditCard } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Pengiriman Cepat & Aman",
        description: "Layanan pengiriman ke seluruh wilayah dengan garansi keamanan barang sampai tujuan."
    },
    {
        icon: ShieldCheck,
        title: "Garansi Resmi",
        description: "Semua produk elektronik dilengkapi dengan garansi resmi pabrik."
    },
    {
        icon: Clock,
        title: "Dukungan Pelanggan",
        description: "Tim support kami siap membantu Anda setiap hari pada jam kerja operasional."
    },
    {
        icon: CreditCard,
        title: "Pembayaran Fleksibel",
        description: "Tersedia berbagai metode pembayaran termasuk sistem angsuran yang meringankan."
    }
];

export default function ValuePropsSection() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-16 border-y border-slate-200 dark:border-slate-800">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900">
                                <feature.icon className="h-8 w-8" aria-hidden="true" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

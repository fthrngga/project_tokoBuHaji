import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { TableauEmbed } from '@/components/TableauEmbed';

const dashboards = [
    { id: 'dashboard-1', name: 'Sales Performance', embedUrl: 'https://public.tableau.com/views/Visualisasi_PA_Vina_17834448439860/SalesPerformance' },
    { id: 'dashboard-2', name: 'Profitability', embedUrl: 'https://public.tableau.com/views/Visualisasi_PA_Vina_17834448439860/ProfitabilityProfitabilitas' },
];

export default function DataWarehouseIndex() {
    const [activeTab, setActiveTab] = useState(dashboards[0].id);

    return (
        <AppLayout breadcrumbs={[{ title: 'Data Warehouse', href: '#' }]}>
            <Head title="Data Warehouse" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Tabs Header */}
                <div className="flex space-x-2 border-b pb-2 overflow-x-auto">
                    {dashboards.map((db) => (
                        <button
                            key={db.id}
                            onClick={() => setActiveTab(db.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${activeTab === db.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                                }`}
                        >
                            {db.name}
                        </button>
                    ))}
                </div>

                {/* Tabs Content */}
                <div className="min-h-[85vh] flex-1 rounded-xl bg-muted/10 border border-muted/50 p-0 overflow-hidden relative">
                    {dashboards.map((db) => (
                        <div
                            key={db.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${activeTab === db.id ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
                        >
                            {db.embedUrl ? (
                                <TableauEmbed url={db.embedUrl} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[85vh] bg-muted/20 border-2 border-dashed border-muted m-4 rounded-xl">
                                    <p className="text-muted-foreground mb-4">Sedang memuat visualisasi data...</p>
                                    <p className="text-sm text-muted-foreground max-w-md text-center">
                                        Pastikan koneksi internet Anda stabil untuk terhubung ke server analitik.
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

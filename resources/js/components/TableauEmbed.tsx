import { useEffect, useRef } from 'react';

interface TableauEmbedProps {
    url: string;
}

export function TableauEmbed({ url }: TableauEmbedProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load the modern Tableau Embed API v3 module if not already loaded
        if (!document.querySelector('script[src*="tableau.embedding.3"]')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
            document.head.appendChild(script);
        }

        // Inject the viz element
        if (containerRef.current) {
            // Clear existing viz if URL changes
            containerRef.current.innerHTML = '';
            
            // Create the Tableau web component
            const viz = document.createElement('tableau-viz');
            viz.setAttribute('src', url);
            viz.setAttribute('device', 'desktop');
            viz.setAttribute('hide-tabs', 'true');
            viz.style.width = '100%';
            viz.style.height = '100%';
            viz.style.minHeight = '85vh';
            viz.style.border = 'none';
            
            containerRef.current.appendChild(viz);
        }
    }, [url]);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[85vh] border-0 rounded-xl overflow-hidden"></div>
    );
}

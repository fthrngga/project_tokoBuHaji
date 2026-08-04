<?php
$dir = new RecursiveDirectoryIterator('resources/js/Pages');
$iterator = new RecursiveIteratorIterator($dir);

foreach ($iterator as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'tsx') {
        $content = file_get_contents($file);
        
        $replacements = [
            'bg-[#080f1a]' => 'bg-transparent',
            'bg-[#060d18]' => 'bg-transparent',
            'from-[#080f1a]/70' => 'from-background/70',
            'bg-[#080f1a]/90' => 'bg-background/90',
            'bg-[#080f1a]/95' => 'bg-background/95',
            'from-[#0d1e2e]' => 'from-background',
            'to-[#080f1a]' => 'to-background',
            'via-[#080f1a]/20' => 'via-background/20',
            'text-[#BDD5EA]' => 'text-muted-foreground',
            'text-[#bdd5ea]' => 'text-muted-foreground',
            'border-[#577399]/10' => 'border-border/10',
            'border-[#577399]/20' => 'border-border/20',
            'border-[#577399]/30' => 'border-border/30',
            'border-[#577399]/40' => 'border-border/40',
            'bg-[#0d1e2e]/50' => 'bg-card',
            'hover:bg-[#0d1e2e]/80' => 'hover:bg-card/80',
            'bg-[#3d5a80]' => 'bg-primary/20',
            'bg-[#0d1f33]' => 'bg-card',
            'bg-[#0d1e2e]' => 'bg-card',
            'text-white' => 'text-foreground',
            'text-white/90' => 'text-foreground/90',
            'text-[#F7F7FF]' => 'text-foreground',
            'text-[#aabfd3]' => 'text-muted-foreground',
            'text-[#8b9bb4]' => 'text-muted-foreground',
            'border-white/25' => 'border-border',
            'border-white/10' => 'border-border',
            'bg-white/5' => 'bg-card',
            'bg-white/10' => 'bg-secondary',
            'hover:bg-white/10' => 'hover:bg-secondary/80',
        ];

        $original = $content;
        
        foreach ($replacements as $search => $replace) {
            $content = str_replace($search, $replace, $content);
        }
        
        // Special case for CategoryBento which has a gradient starting from deep navy
        $content = str_replace('from-transparent via-background/20 to-transparent', 'from-transparent via-background/20 to-transparent', $content);

        // Special case for buttons, we don't want text-foreground on primary buttons if it makes them black.
        // E.g. in ContactSection, button text is white. Let's fix that back.
        $content = str_replace('text-foreground m-0', 'text-foreground m-0', $content);
        
        if ($original !== $content) {
            file_put_contents($file, $content);
        }
    }
}

echo "Classes replaced successfully!\n";

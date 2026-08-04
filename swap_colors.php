<?php
$dir = new RecursiveDirectoryIterator('resources/js/Pages');
$iterator = new RecursiveIteratorIterator($dir);

foreach ($iterator as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'tsx') {
        $content = file_get_contents($file);
        
        // We want to swap #080f1a and #BDD5EA
        // Use a temporary placeholder
        $content = str_replace('#080f1a', 'TEMP_COLOR_1', $content);
        $content = str_replace('#BDD5EA', 'TEMP_COLOR_2', $content);
        
        $content = str_replace('TEMP_COLOR_1', '#BDD5EA', $content);
        $content = str_replace('TEMP_COLOR_2', '#080f1a', $content);

        // Also handle the lowercase variations just in case
        $content = str_replace('#bdd5ea', 'TEMP_COLOR_3', $content);
        $content = str_replace('TEMP_COLOR_3', '#080f1a', $content);
        
        file_put_contents($file, $content);
    }
}

// Also update app.css
$cssPath = 'resources/css/app.css';
if (file_exists($cssPath)) {
    $content = file_get_contents($cssPath);
    $content = str_replace('#080f1a', 'TEMP_COLOR_1', $content);
    $content = str_replace('#BDD5EA', 'TEMP_COLOR_2', $content);
    
    $content = str_replace('TEMP_COLOR_1', '#BDD5EA', $content);
    $content = str_replace('TEMP_COLOR_2', '#080f1a', $content);
    
    file_put_contents($cssPath, $content);
}

echo "Colors swapped successfully!\n";

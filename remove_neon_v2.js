const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const colors = '(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky|orange|yellow|amber|red|rose)';
    const shades = '([1-9]00|950)';

    // text, bg, border, ring, from, via, to

    // Replace gradients
    content = content.replace(new RegExp("(from|via|to)-" + colors + "-" + shades + "(\\/[0-9]+)?", 'g'), (match, type, color, shade, opacity) => {
        return type + "-zinc-" + shade + (opacity || '');
    });

    // Replace text
    content = content.replace(new RegExp("text-" + colors + "-" + shades + "(\\/[0-9]+)?", 'g'), (match, color, shade, opacity) => {
        return "text-zinc-400" + (opacity || '');
    });

    // Replace bg
    content = content.replace(new RegExp("bg-" + colors + "-" + shades + "(\\/[0-9]+)?", 'g'), (match, color, shade, opacity) => {
        return "bg-zinc-" + shade + (opacity || '');
    });

    // Replace border
    content = content.replace(new RegExp("border-" + colors + "-" + shades + "(\\/[0-9]+)?", 'g'), (match, color, shade, opacity) => {
        return "border-zinc-" + shade + (opacity || '');
    });

    // Replace ring
    content = content.replace(new RegExp("ring-" + colors + "-" + shades + "(\\/[0-9]+)?", 'g'), (match, color, shade, opacity) => {
        return "ring-zinc-" + shade + (opacity || '');
    });

    // Replace hex that might be neon
    content = content.replace(/text-\[\#[0-9a-fA-F]+\]/g, (match) => {
        const hex = match.toLowerCase();
        if (hex.includes('fff') || hex.includes('000') || hex.includes('111') || hex.includes('aaa') || hex.includes('ccc') || hex.includes('0d0d0d')) return match;
        return 'text-zinc-300';
    });
    content = content.replace(/bg-\[\#[0-9a-fA-F]+\]/g, (match) => {
        const hex = match.toLowerCase();
        if (hex.includes('fff') || hex.includes('000') || hex.includes('111') || hex.includes('aaa') || hex.includes('ccc') || hex.includes('0d0d0d') || hex.includes('0a0a0a') || hex.includes('171717')) return match;
        return 'bg-zinc-800';
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated: " + filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', '.next'].includes(file)) {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

['app', 'components'].forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir);
    }
});

const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Premium mappings
    // emerald, green, blue, cyan, purple, indigo, pink, fuchsia, violet, teal -> zinc/white
    content = content.replace(/text-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([3456]00)(\/[0-9]+)?/g, 'text-zinc-300$3');
    content = content.replace(/bg-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([56]00)\/([0-9]+)/g, 'bg-white/$3');
    content = content.replace(/bg-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)/g, 'bg-zinc-800');
    content = content.replace(/border-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)\/([0-9]+)/g, 'border-white/$3');
    content = content.replace(/border-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)/g, 'border-white/10');
    content = content.replace(/ring-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)\/([0-9]+)/g, 'ring-white/$3');
    content = content.replace(/ring-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)/g, 'ring-white/20');
    content = content.replace(/from-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)\/([0-9]+)/g, 'from-white/$3');
    content = content.replace(/to-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)\/([0-9]+)/g, 'to-white/$3');
    content = content.replace(/via-(emerald|green|blue|cyan|purple|indigo|pink|fuchsia|violet|teal|sky)-([456]00)\/([0-9]+)/g, 'via-white/$3');

    // orange, yellow -> stone
    content = content.replace(/text-(orange|yellow|amber)-([3456]00)(\/[0-9]+)?/g, 'text-stone-300$3');
    content = content.replace(/bg-(orange|yellow|amber)-([56]00)\/([0-9]+)/g, 'bg-white/$3');
    content = content.replace(/bg-(orange|yellow|amber)-([456]00)/g, 'bg-stone-800');
    content = content.replace(/border-(orange|yellow|amber)-([456]00)\/([0-9]+)/g, 'border-white/$3');
    content = content.replace(/border-(orange|yellow|amber)-([456]00)/g, 'border-white/10');

    // red, rose -> neutral
    content = content.replace(/text-(red|rose)-([3456]00)(\/[0-9]+)?/g, 'text-neutral-400$3');
    content = content.replace(/bg-(red|rose)-([56]00)\/([0-9]+)/g, 'bg-neutral-500/$3');
    content = content.replace(/bg-(red|rose)-([456]00)/g, 'bg-neutral-800');
    content = content.replace(/border-(red|rose)-([456]00)\/([0-9]+)/g, 'border-neutral-500/$3');
    content = content.replace(/border-(red|rose)-([456]00)/g, 'border-neutral-800');

    // specifically target custom hex codes often used
    content = content.replace(/text-\[\#[0-9a-fA-F]+\]/g, (match) => {
        // Only replace neon looking hex codes. Actually, let's just make all hardcoded hex texts more subtle if they aren't black or white
        const hex = match.toLowerCase();
        if (hex.includes('fff') || hex.includes('000') || hex.includes('111') || hex.includes('aaa') || hex.includes('ccc')) return match;
        // e.g. text-[#0A66C2] for linkedin
        return 'text-zinc-300';
    });

    // Some specific cases from globals.css
    content = content.replace(/var\(--slate-blue\)/g, 'var(--primary)');
    content = content.replace(/var\(--amber-gold\)/g, 'var(--muted)');
    content = content.replace(/var\(--cool-gray\)/g, 'var(--muted)');
    content = content.replace(/var\(--success\)/g, 'var(--primary)');
    content = content.replace(/var\(--warning\)/g, 'var(--muted)');

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

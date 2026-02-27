const fs = require('fs');
let content = fs.readFileSync('app/pm/dashboard/page.tsx', 'utf8');

// Replace Theme Tokens
content = content.replace(/const T = \{[\s\S]*?\}/, `const T = {
    primary: "#FFFFFF",
    blue: "#0A84FF",
    green: "#30D158",
    orange: "#FF9F0A",
    purple: "#BF5AF2",
    bg: "#000000",
}`);

// Replace FUNNEL
content = content.replace(/const PIPELINE_STAGES = \[[\s\S]*?\]/, `const PIPELINE_STAGES = [
    { stage: "Cold Leads", count: 48, delta: "+6 today", note: null, color: T.primary, health: "good" },
    { stage: "Contacted", count: 32, delta: "+4 today", note: "3 ghosting – nudge?", color: T.orange, health: "warn" },
    { stage: "Meeting Set", count: 9, delta: "–1 this week", note: "Avg response time: 2.3h", color: T.blue, health: "good" },
    { stage: "Proposal Sent", count: 4, delta: "+2 this week", note: "2 viewed >3x – follow up?", color: T.purple, health: "ins" },
    { stage: "Closed Won", count: 2, delta: "+1 this week", note: "Avg deal: $2.6k", color: T.green, health: "good" },
]`);

// Replace AGENTS
content = content.replace(/const AGENTS = \[[\s\S]*?\]/, `const AGENTS = [
    {
        id: "research", name: "Research Agent", status: "scanning", icon: Globe,
        progress: 87, note: "Scanning X trends for Rust & AI hiring spikes", timestamp: "Live",
        colorStart: T.blue, colorEnd: "#5E5CE6"
    },
    {
        id: "outreach", name: "Outreach Agent", status: "done", icon: Send,
        progress: 100, note: "Sent 42 personalised emails – batch B complete", timestamp: "2h ago",
        colorStart: T.green, colorEnd: "#32ADE6"
    },
    {
        id: "experiment", name: "Experiment Agent", status: "running", icon: FlaskConical,
        progress: 34, note: "Running A/B on pricing page – 34% through", timestamp: "Ongoing",
        colorStart: T.purple, colorEnd: "#FF375F"
    },
    {
        id: "analytics", name: "Analytics Agent", status: "done", icon: TrendingUp,
        progress: 100, note: "EOM forecast: $6.2k MRR + 78% confidence", timestamp: "1h ago",
        colorStart: T.orange, colorEnd: "#FFD60A"
    },
]`);

// Hex replacements
content = content.replace(/#00D4B5/g, '#0A84FF'); // Teal to Blue
content = content.replace(/#A855F7/g, '#BF5AF2'); // Purple to Apple Purple 
content = content.replace(/#FF6B35/g, '#FF9F0A'); // Orange to Apple Orange

// Custom text fixes
content = content.replace(/text-\[\#0A84FF\] font-semibold">\+14\.5%/g, 'text-[#30D158] font-semibold">+14.5%'); 

// Button CTA styling to Pure White
content = content.replace(/bg-\[\#0A84FF\] hover:bg-\[\#00E5C5\]/g, 'bg-white hover:bg-white/90');
content = content.replace(/shadow-\[0_0_20px_rgba\(0,212,181,0\.3\)\]/g, 'shadow-[0_0_20px_rgba(255,255,255,0.2)]');
content = content.replace(/hover:shadow-\[0_0_30px_rgba\(0,212,181,0\.5\)\]/g, 'hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]');

content = content.replace(/shadow-\[0_0_15px_rgba\(0,212,181,0\.4\)\]/g, 'shadow-[0_0_15px_rgba(255,255,255,0.2)]');
content = content.replace(/hover:shadow-\[0_0_25px_rgba\(0,212,181,0\.6\)\]/g, 'hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]');

// Score logic mapping
content = content.replace(/lead\.score >= 85 \? T\.teal : lead\.score > 70 \? T\.orange : "white"/g, 'lead.score >= 85 ? T.primary : lead.score > 70 ? T.orange : "rgba(255,255,255,0.3)"');

fs.writeFileSync('app/pm/dashboard/page.tsx', content);

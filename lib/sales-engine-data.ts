import { Globe, TrendingUp, Send, FlaskConical } from "lucide-react"

// Theme tokens for consistency
export const THEME_COLORS = {
    primary: "#FFFFFF",
    blue: "#0A84FF",
    emerald: "#30D158",
    orange: "#FF9F0A",
    violet: "#BF5AF2",
    bg: "#000000",
}

export const SALES_PMF_DATA = {
    score: 88,
    confidence: "High",
    targetAudiences: [
        "VC-Backed B2B SaaS Founders (Seed to Series A)",
        "Solo Developers trying to reach $10k MRR",
        "Growth Leads at early-stage startups"
    ],
    acquisitionChannels: [
        { name: "Hacker News Launch", validation: "High affinity for dev-focused building tools." },
        { name: "Twitter / X Build in Public", validation: "Direct access to the indie hacker community." },
        { name: "Cold Email via Apollo", validation: "Predictable outbound for recently funded founders." }
    ],
    messagingHooks: [
        "Stop playing startup. Start growing.",
        "Your competitors are shipping twice as fast with AI.",
        "The only command center you need to hit $10k MRR."
    ],
    pricingBands: [
        { tier: "Incubator", price: "Free", description: "Merit-based invite only. Pushes you to build." },
        { tier: "Nexus Pro", price: "$49/mo", description: "Unlimited agent actions. Priority queue." },
        { tier: "Fuel Packs", price: "$5/ea", description: "One-off compute credits for heavy data scraping." }
    ],
    gtmPlan: [
        { phase: "Days 1-7", title: "The Waitlist Hype", steps: ["Design pitch deck landing page", "Tease on X with glowing UI mockup", "Collect 500 waitlist emails"] },
        { phase: "Days 8-14", title: "Beta Cohort Onboarding", steps: ["Invite top 50 users from waitlist", "Do unscalable concierge onboarding", "Fix critical Day-1 friction gaps"] },
        { phase: "Days 15-30", title: "Public Launch & Outbound", steps: ["Product Hunt launch", "Activate Outreach Agent for DMs", "Publish 3 SEO teardowns on competitors"] }
    ]
}

// Real-Time Radar Mock Data
export const SALES_RADAR_STREAMS = [
    { source: "X / Twitter", signal: "Surge in posts about 'Rust backend pain'", confidence: 92, trend: "up" as const },
    { source: "Hacker News", signal: "New competitor 'LiteDB' trending", confidence: 85, trend: "flat" as const },
    { source: "LinkedIn", signal: "Director of Eng. jobs mentioning 'AI Agents' +12%", confidence: 88, trend: "up" as const },
]

// Revenue & Pipeline Mock Data
export const SALES_REVENUE_DATA = {
    currentMRR: "$4,250",
    mrrDelta: "+12% from last month",
    churnRisk: "2.4%",
    churnNote: "3 accounts flagged by Agent",
    pipelineCounts: {
        Leads: 48,
        Contacted: 36,
        Meeting: 24,
        Proposal: 12
    }
}

// AI Growth Team State
export const SALES_AGENTS = [
    { id: "research", name: "Research Agent", status: "running" as const, icon: Globe, progress: 87, note: "Scanning X trends for Rust & AI hiring spikes", color: THEME_COLORS.blue },
    { id: "outreach", name: "Outreach Agent", status: "done" as const, icon: Send, progress: 100, note: "Sent 42 personalised emails – batch B complete", color: THEME_COLORS.emerald },
    { id: "experiment", name: "Experiment Agent", status: "running" as const, icon: FlaskConical, progress: 34, note: "Running A/B on pricing page – 34% through", color: THEME_COLORS.violet },
    { id: "analytics", name: "Analytics Agent", status: "done" as const, icon: TrendingUp, progress: 100, note: "EOM forecast: $6.2k MRR + 78% confidence", color: THEME_COLORS.orange },
]

// New Sub-Agent Mock Data

export const SALES_RESEARCH_DATA = {
    targetPersona: "VP of Engineering / DevOps Director",
    totalTAM: 4200,
    identifiedAccounts: 12,
    highIntentSignals: [
        { company: "Vercel", signal: "Recent Series D funding + hiring 5 DevOps engineers.", score: 98 },
        { company: "Supabase", signal: "CTO tweeted about CI/CD pipeline bottlenecks.", score: 95 },
        { company: "Linear", signal: "Expanding infrastructure team based on job openings.", score: 91 },
        { company: "Scale AI", signal: "Heavy GPU provisioning requires cost-optimization tools.", score: 88 }
    ]
}

export const SALES_OUTREACH_DATA = {
    campaignName: "Q3 Series B Engineering Leaders",
    status: "Drafted",
    audienceSize: 12,
    generateSequence: [
        { day: 1, type: "LinkedIn Voice Note", content: "Hey [Name], loved your recent pod on scaling infra. Noticed you're hiring 5 DevOps roles right now..." },
        { day: 3, type: "Cold Email", content: "Subject: Streamlining your CI/CD at [Company]\n\nSaw your team is expanding fast. We help teams like yours reduce pipeline costs by 40%." },
        { day: 7, type: "X DM", content: "Following up here in case email is buried. Would love to share our report on infra costs." }
    ],
    spamScore: 1.2, // very low
    projectedMeetings: 3
}

export const SALES_FORECAST_DATA = {
    mrrTarget: "$10,000",
    currentMRR: "$4,250",
    projections: {
        day30: "$6,100",
        day60: "$8,500",
        day90: "$12,400"
    },
    budgetSplits: [
        { channel: "LinkedIn Outbound", allocation: "40%", amount: "$1,200", roas: "2.4x" },
        { channel: "Twitter / X Ads", allocation: "30%", amount: "$900", roas: "1.8x" },
        { channel: "Content / SEO", allocation: "20%", amount: "$600", roas: "3.1x" },
        { channel: "Experimental (AI)", allocation: "10%", amount: "$300", roas: "?" }
    ],
    runwayRemaining: "14 months"
}

export const SALES_POACHING_DATA = {
    activeScanners: 3,
    competitorsTracked: ["Rippling", "Deel", "Gusto"],
    totalPoachableLeads: 142,
    hotLeads: [
        { name: "Sarah Jenkins", role: "VP People", company: "Acme Corp", system: "Rippling", intent: "High", trigger: "Complained about pricing on LinkedIn" },
        { name: "David Chen", role: "Head of HR", company: "TechFlow", system: "Deel", intent: "Medium", trigger: "Asked for alternatives in Slack community" },
        { name: "Emily Watson", role: "COO", company: "GlobalRetail", system: "Gusto", intent: "High", trigger: "Contract expires in 45 days (ZoomInfo)" }
    ]
}

export const SALES_OBJECTION_DATA = {
    detectedObjection: "Too expensive compared to Deel",
    confidence: "High",
    recommendedScript: [
        { phase: "Context Build", type: "question", content: "Deel is great for basic payroll, but you're scaling a 50+ Eng team globally. Is your priority saving $10/head or avoiding a 6-month compliance headache?" },
        { phase: "The Turn", type: "reframe", content: "Our compliance engine catches the exact edge cases that Deel's self-serve model misses. We cost more because we act as your legal shield." },
        { phase: "The Close", type: "action", content: "If you want, I can show you the exact clauses we cover that they don't. Sound fair?" }
    ],
    battlecards: [
        { competitor: "Deel", claim: "Lower per seat cost", counter: "Hidden FX fees and weak localized compliance support." },
        { competitor: "Gusto", claim: "Easier UI", counter: "Built for mom & pop shops, breaks down with complex engineering org structures." }
    ]
}

export const SALES_PRICING_DATA = {
    analysisType: "Elasticity Simulation",
    currentACV: "$12,400",
    optimizedACV: "$18,500",
    winRateImpact: "-4.2%",
    revenueUplift: "+49.1%",
    recommendations: [
        { tier: "Starter", change: "Hold", logic: "High conversion volume, acts as primary lead magnet." },
        { tier: "Growth", change: "Increase to $999/mo", logic: "Competitor benchmarking shows 30% underpricing for feature parity." },
        { tier: "Enterprise", change: "Unbundle SSO & SLA", logic: "Moves ACV from $25k to $40k through forced add-on pricing." }
    ],
    confidence: "92%"
}

export const SALES_FOLLOW_UP_DATA = {
    activeSequences: 14,
    prospectsInSequence: 842,
    replyRate: "18.4%",
    meetingsBooked: 12,
    topPerformingSequence: "The 'Breakup' Reversal",
    liveThread: [
        { prospect: "John (Stripe)", role: "Head of RevOps", stage: "Touch 3 (Value Bump)", status: "Sent 2h ago", sentiment: "Neutral" },
        { prospect: "Alice (Notion)", role: "VP Growth", stage: "Touch 4 (Case Study)", status: "Opened 4x", sentiment: "Warming" },
        { prospect: "Bob (Figma)", role: "CRO", stage: "Touch 5 (Breakup)", status: "Replied 'Call me'", sentiment: "Hot" }
    ]
}

export const SALES_LEAD_SCORING_DATA = {
    totalLeadsScored: 2450,
    topPercentile: 5,
    conversionProbability: "84%",
    rankedLeads: [
        { name: "Sarah Jenkins", role: "VP Growth", company: "Acme Corp", score: 98, triggers: ["Visited Pricing 4x", "Opened Drip Email", "Stack Match"] },
        { name: "David Chen", role: "Founder", company: "TechFlow", score: 94, triggers: ["Attended Webinar", "Searched 'Alternatives'"] },
        { name: "Emily Watson", role: "CRO", company: "GlobalRetail", score: 89, triggers: ["Inbound Referral", "Series A Funding"] }
    ]
}

export const SALES_WAR_ROOM_DATA = {
    objective: "Q4 Pipeline Dominance",
    status: "Active",
    timeElapsed: "02:14:45",
    activeSubroutines: [
        { name: "Competitor Poaching", status: "Running", metric: "142 Leads Found", iconType: "crosshair", color: "orange" },
        { name: "Follow-Up Sequences", status: "Running", metric: "842 Prospects Active", iconType: "timer", color: "blue" },
        { name: "Pricing Optimizer", status: "Deployed", metric: "+49% MRR Projected", iconType: "calculator", color: "emerald" },
        { name: "Lead Prioritization", status: "Running", metric: "Top 5% Isolated", iconType: "target", color: "indigo" }
    ],
    globalAlerts: [
        { type: "Success", message: "Stripe contract closed: +$14k ACV." },
        { type: "Warning", message: "Outreach Agent hit 80% daily API limit constraint." }
    ]
}

export const SALES_INTEGRATIONS_DATA = {
    totalSynced: 18,
    dataFlow: "2.4 TB/mo",
    status: "All Systems Nominal",
    integrations: [
        { name: "Stripe", category: "Revenue", status: "Connected", sync: "Real-time", icon: "credit-card" },
        { name: "LinkedIn", category: "Social Intent", status: "Connected", sync: "Real-time", icon: "linkedin" },
        { name: "Salesforce", category: "CRM", status: "Connected", sync: "Real-time", icon: "cloud" },
        { name: "HubSpot", category: "Marketing", status: "Connected", sync: "Every 5m", icon: "target" },
        { name: "Slack", category: "Alerts", status: "Connected", sync: "Real-time", icon: "slack" },
        { name: "GitHub", category: "Code Heatmap", status: "Connected", sync: "Every 15m", icon: "github" },
        { name: "Figma", category: "Design Ops", status: "Connected", sync: "Real-time", icon: "figma" },
        { name: "Notion", category: "Knowledge", status: "Connected", sync: "Every 10m", icon: "file-text" },
        { name: "Amplitude", category: "Product Analytics", status: "Connected", sync: "Real-time", icon: "line-chart" },
        { name: "PostgreSQL", category: "Core DB", status: "Connected", sync: "Real-time", icon: "database" },
        { name: "Gmail", category: "Outbound", status: "Connected", sync: "Real-time", icon: "mail" },
        { name: "Intercom", category: "Support", status: "Connected", sync: "Every 2m", icon: "message-circle" },
        { name: "Zoom", category: "Gong/Call AI", status: "Connected", sync: "Post-call", icon: "video" },
        { name: "Airtable", category: "Ops", status: "Connected", sync: "Every 5m", icon: "layers" },
        { name: "AWS", category: "Infra Hub", status: "Connected", sync: "Real-time", icon: "server" },
        { name: "Twilio", category: "SMS Drip", status: "Connected", sync: "Real-time", icon: "phone" },
        { name: "SendGrid", category: "Bulk Email", status: "Connected", sync: "Real-time", icon: "send" },
        { name: "Clearbit", category: "Enrichment", status: "Connected", sync: "Real-time", icon: "search" }
    ]
}

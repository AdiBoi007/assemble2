export type AgentMode =
    | "idle"
    | "performance"
    | "intelligence"
    | "finance"
    | "analyst"
    | "clients"
    | "automation"
    | "unknown"

export type AgentTone = "hot" | "cold" | "neutral"

export interface AgentContext {
    tier: string
    mrrGoal: string
    activeStreak: number
    lastAction: Date | null
}

export interface AgentResponse {
    mode: AgentMode
    message: string
    steps?: string[]
    tone: AgentTone
    nextAction?: string
}

export const DEMO_AGENT_CONTEXT: AgentContext = {
    tier: "Early Access",
    mrrGoal: "$10k",
    activeStreak: 4,
    lastAction: new Date(),
}

export async function parseCentralAgentIntent(input: string, context = DEMO_AGENT_CONTEXT): Promise<AgentResponse> {
    const lowerInput = input.toLowerCase()

    // ─── F1: Co-Worker / General ───
    if (lowerInput.includes("focus") || lowerInput.includes("what should i") || lowerInput.includes("priority") || lowerInput.includes("help me") || lowerInput.includes("what to do")) {
        return {
            mode: "performance",
            tone: "neutral",
            message: "Based on your current data, here are your top 3 priorities for this week:\n\n1. SaaS Tool B — health score dropped to 23/100. Root cause: Email Step 3 dead (1.2% open rate).\n2. Client pipeline is thin — only 4 leads in 'Contacted' stage. Need 20+ for healthy outbound.\n3. MRR is flat this week — no new activations in 5 days.\n\nI'd recommend starting with the Product Intelligence panel. Want me to open the deep-dive on Tool B?",
            steps: ["Scanning all active products...", "Checking pipeline health...", "Analyzing revenue trajectory..."],
            nextAction: "Open Product Intelligence"
        }
    }

    // ─── F2: Performance Dashboard ───
    if (lowerInput.includes("dashboard") || lowerInput.includes("performance") || lowerInput.includes("health") || lowerInput.includes("overview") || lowerInput.includes("show me everything")) {
        return {
            mode: "performance",
            tone: "neutral",
            message: "Opening your Performance Dashboard. Here's the quick summary:\n\n• Total MRR: $3,240 (+6% WoW)\n• Active Customers: 28 (-1 this week)\n• Conversion Rate: 3.1% (↓ from 4.2%)\n• 3 products tracked — 1 critical, 1 warning, 1 healthy\n\nProduct health grid and KPI panel are now live on the right.",
            steps: ["Loading product health scores...", "Pulling MRR from Stripe...", "Fetching conversion data..."],
            nextAction: "View Client Pipeline"
        }
    }

    // ─── F3: Product Intelligence ───
    if (lowerInput.includes("why") || lowerInput.includes("dropping") || lowerInput.includes("sales") || lowerInput.includes("conversion") || lowerInput.includes("intelligence") || lowerInput.includes("diagnose") || lowerInput.includes("root cause") || lowerInput.includes("product")) {
        return {
            mode: "intelligence",
            tone: "hot",
            message: "Running root cause analysis on SaaS Tool B now.\n\nAnalysis complete — Sales dropped 41% in 5 days. Here's what I found:\n\n#1 Email Step 3 is dead — 1.2% open rate (benchmark: 22%)\n#2 Landing page bounce rate increased 18% after last deploy\n#3 No new traffic source in 7 days\n\nI've prepared 3 fix paths. Review and approve on the right →",
            steps: ["Scanning email sequence metrics...", "Analyzing landing page performance...", "Checking traffic sources...", "Ranking root causes by likelihood..."],
            nextAction: "Approve Fix Path #1"
        }
    }

    // ─── F4: Finance Analyzer ───
    if (lowerInput.includes("mrr") || lowerInput.includes("arr") || lowerInput.includes("revenue") || lowerInput.includes("finance") || lowerInput.includes("churn") || lowerInput.includes("money") || lowerInput.includes("burn") || lowerInput.includes("runway") || lowerInput.includes("p&l") || lowerInput.includes("profit")) {
        return {
            mode: "finance",
            tone: "neutral",
            message: "Finance report loaded.\n\nMRR: $3,240 | ARR: $38,880\nChurn this month: 2 customers (-$340 MRR)\nNet new revenue: +$680\nRunway: 14.2 months at current burn\n\nAt your current growth rate of 6% WoW, you'll hit $10K MRR by June 2026. Finance Analyzer is open on the right for the full breakdown.",
            steps: ["Pulling Stripe revenue data...", "Calculating churn rate...", "Running 90-day projection..."],
            nextAction: "View Cash Flow Projection"
        }
    }

    // ─── F5: Business Analyst ───
    if (lowerInput.includes("competitor") || lowerInput.includes("market") || lowerInput.includes("pmf") || lowerInput.includes("business") || lowerInput.includes("trend") || lowerInput.includes("strategy") || lowerInput.includes("growth") || lowerInput.includes("analyst")) {
        return {
            mode: "analyst",
            tone: "neutral",
            message: "Business intelligence report ready.\n\nPMF Score: 61/100 — you're in the early traction zone. Retention cohort D30 is 68% which is above median for your category.\n\nCompetitor alert: Acme Corp changed pricing 3 days ago — moved from $49 to $79/mo, creating an opportunity at the $39 price point.\n\nFull competitor intel and PMF scorecard are open on the right.",
            steps: ["Monitoring 5 tracked competitors...", "Calculating PMF score from behavioral data...", "Scanning market trend signals..."],
            nextAction: "Generate Growth Strategy"
        }
    }

    // ─── F6: Client Finder ───
    if (lowerInput.includes("find") || lowerInput.includes("lead") || lowerInput.includes("client") || lowerInput.includes("prospect") || lowerInput.includes("outbound") || lowerInput.includes("founder") || lowerInput.includes("icp") || lowerInput.includes("pipeline")) {
        const hasLocation = lowerInput.includes("sydney") || lowerInput.includes("london") || lowerInput.includes("new york") || lowerInput.includes("sf")
        const location = hasLocation ? lowerInput.includes("sydney") ? "Sydney" : "London" : "your target market"
        return {
            mode: "clients",
            tone: "hot",
            message: `Client Finder running — searching LinkedIn, AngelList, Product Hunt, and GitHub for SaaS founders in ${location} who recently raised pre-seed.\n\nFound 34 matches. Scored and ranked by ICP fit. Top 3 are 90+ score — exhibiting strong buying signals (job posts, competitor reviews, fundraising news).\n\nClient finder panel is open on the right. Select leads and launch outbound in one click.`,
            steps: ["Searching LinkedIn + AngelList...", "Detecting buying signals...", "Scoring against your ICP...", "Enriching with emails and company data..."],
            nextAction: "Launch Outbound Campaign"
        }
    }

    // ─── F7: Automation Engine ───
    if (lowerInput.includes("automat") || lowerInput.includes("chain") || lowerInput.includes("trigger") || lowerInput.includes("permission") || lowerInput.includes("tool access") || lowerInput.includes("pause") || lowerInput.includes("audit") || lowerInput.includes("slack") || lowerInput.includes("notify") || lowerInput.includes("briefing")) {
        return {
            mode: "automation",
            tone: "neutral",
            message: "Automation Engine is active. Current status:\n\n• 3 automation chains running\n• Slack: Full Execute enabled\n• Email platform: Notify only\n• Stripe: Read Only\n\nLast action: Sent weekly revenue briefing to #founders at 9:00 AM Monday.\n\nChain builder and permission controls are open on the right.",
            steps: ["Loading automation chains...", "Checking tool permissions...", "Pulling 24h audit log..."],
            nextAction: "Create New Chain"
        }
    }

    // ─── Default / Wake-up ───
    return {
        mode: "idle",
        tone: "neutral",
        message: "Good to see you. Here's where your business stands right now:\n\n• MRR: $3,240 (+6% this week)\n• 1 product needs urgent attention (health: 23/100)\n• Client pipeline: 4 active leads\n• PMF Score: 61/100\n\nTry:\n→ 'Why are my sales dropping?'\n→ 'Find 20 SaaS founders in Sydney'\n→ 'Show me my MRR and churn'\n→ 'What should I focus on this week?'",
        steps: ["Initializing Co-Worker context...", "Loading business snapshot..."],
    }
}

export type AgentMode = "idle" | "pmf_analysis" | "radar" | "pipeline" | "growth_team" | "research_deep_dive" | "outreach_campaign" | "revenue_analytics" | "incubator" | "budget_allocator" | "poaching_hunter" | "objection_handler" | "pricing_optimizer" | "auto_follow_up" | "lead_scoring" | "war_room" | "integrations" | "unknown"

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

// Global simulated memory for the MVP
export const DEMO_AGENT_CONTEXT: AgentContext = {
    tier: "Free Beta",
    mrrGoal: "$10k",
    activeStreak: 4,
    lastAction: new Date(),
}

/**
 * Parses a user's natural language input and determines the appropriate
 * sub-agent or widget mode to display. Includes the "Echo Cascade" hot/cold logic.
 */
export async function parseCentralAgentIntent(input: string, context = DEMO_AGENT_CONTEXT): Promise<AgentResponse> {
    const lowerInput = input.toLowerCase()

    // ─── 1. Idea Pitch & Goal Setting (The Core Hot/Cold Hook) ───
    if (lowerInput.includes("idea") || lowerInput.includes("goal") || lowerInput.includes("build") || lowerInput.includes("startup")) {
        // Pseudo-random hot/cold trigger based on input length mapping to simulate varying responses
        const isHot = input.length % 2 === 0

        if (isHot) {
            // DOPAMINE HIT (Hot)
            return {
                mode: "pmf_analysis",
                tone: "hot",
                message: "Brilliant. Market signals show a massive vacuum in this exact niche right now. Your proposed angle cuts straight past the incumbents. \n\nI've generated a 30-day GTM plan and identified 3 channels where early adopters are bleeding cash for this. Let's execute.",
                steps: [
                    "Querying global SaaS market signals...",
                    "Analyzing competitor feature gaps...",
                    "Validating TAM & Pricing bandwidths...",
                    "Generating actionable Execution Blueprint..."
                ],
                nextAction: "Approve 30-Day GTM"
            }
        } else {
            // STARVATION/ROAST (Cold)
            return {
                mode: "pmf_analysis",
                tone: "cold",
                message: "Stop pretending this is a unique angle. 14 other startups tried this exact pivot last quarter and died because they couldn't acquire users under $200 CAC. \n\nYour value prop is painfully weak. I've re-written your pricing tiers to actually make sense, but you need to refine the messaging before we waste time building it.",
                steps: [
                    "Scanning Crunchbase for failed archetypes...",
                    "Calculating theoretical Customer Acquisition Cost (CAC)...",
                    "Stress-testing the core value proposition...",
                    "Flagging critical market friction vectors..."
                ],
                nextAction: "Rewrite Core Messaging"
            }
        }
    }

    // ─── 2. Active Action Push (Incubator/Execution) ───
    if (lowerInput.includes("execute") || lowerInput.includes("launch") || lowerInput.includes("experiment") || lowerInput.includes("action")) {
        return {
            mode: "incubator",
            tone: "hot",
            message: `Initiating momentum loop. You're on a ${context.activeStreak}-day build streak. I've launched the A/B pricing experiment and queued 50 cold DMs for the primary audience.\n\nDon't drop the ball now. Review the copy and hit deploy.`,
            steps: [
                "Awakening Experiment Agent...",
                "Drafting 50 dynamic cold outreach variants...",
                "Configuring Stripe A/B test webhooks...",
                "Synchronizing with LinkedIn automation queue..."
            ],
            nextAction: "Review & Deploy DMs"
        }
    }

    // ─── 2B. Deploy DMs (Outreach Trigger) ───
    if (lowerInput.includes("review & deploy dms") || lowerInput.includes("deploy dms") || lowerInput.includes("outreach") || lowerInput.includes("campaign")) {
        return {
            mode: "auto_follow_up",
            tone: "hot",
            message: "Campaign Authorized. Dispatching 50 highly personalized cold DMs through the LinkedIn proxy queue. I will track recipient sentiment in real-time and orchestrate the follow-up sequences automatically.",
            steps: [
                "Acquiring LinkedIn OAuth tokens...",
                "Injecting dynamic variables into 50 templates...",
                "Dispatching initial cold outbound batch...",
                "Initializing sentiment tracking webhooks..."
            ],
            nextAction: "View Live Campaign"
        }
    }

    // ─── 3. Analytics / Revenue Agent ───
    if (lowerInput.includes("analytics") || lowerInput.includes("churn") || lowerInput.includes("revenue")) {
        return {
            mode: "revenue_analytics",
            tone: "cold",
            message: `You're missing your ${context.mrrGoal} MRR goal target by a long shot because of a 45% drop-off at the proposal stage. Let's fix this friction point immediately before you bleed out the remaining leads.`,
            steps: [
                "Triggering Analytics Agent...",
                "Syncing real-time Stripe billing data...",
                "Analyzing product usage metrics via API...",
                "Running predictive churn models (Confidence: 87%)...",
                "Extrapolating EOM revenue targets..."
            ],
            nextAction: "View Friction Points"
        }
    }

    // ─── 3B. Budget & Forecast ───
    if (lowerInput.includes("budget") || lowerInput.includes("forecast") || lowerInput.includes("runway") || lowerInput.includes("allocation")) {
        return {
            mode: "budget_allocator",
            tone: "hot",
            message: "I've run the neural projection on your current MRR trajectory. We're on pace for $12k in 90 days. I've calculated the optimal capital allocation split to maximize your 14 months of runway.",
            steps: [
                "Modeling 90-day trajectory...",
                "Analyzing historical channel ROAS...",
                "Generating optimal capital efficiency split..."
            ],
            nextAction: "Approve AI Spend"
        }
    }

    // ─── 3C. Competitor Poaching Scanner ───
    if (lowerInput.includes("poach") || lowerInput.includes("competitor") || lowerInput.includes("steal") || lowerInput.includes("rival")) {
        return {
            mode: "poaching_hunter",
            tone: "hot",
            message: "I've isolated 142 high-intent leads currently using your competitors. Scanning social signals and contract renewal dates. 3 targets are red-hot for an immediate aggressive outreach sequence. Let's poach them.",
            steps: [
                "Scraping competitor G2 & Capterra reviews...",
                "Analyzing LinkedIn posts for churn intent...",
                "Cross-referencing ZoomInfo renewal dates...",
                "Isolating Top 3 high-intent targets..."
            ],
            nextAction: "Generate Snipe Outreach"
        }
    }

    // ─── 3D. Objection Handler & Battlecards ───
    if (lowerInput.includes("objection") || lowerInput.includes("pushback") || lowerInput.includes("expensive") || lowerInput.includes("rebuttal")) {
        return {
            mode: "objection_handler",
            tone: "cold",
            message: "Losing deals on price means you haven't established value. I've analyzed Deel's hidden fee structure. Here is the exact turn sequence to reframe the objection into a severe compliance risk for them.",
            steps: [
                "Analyzing prospect's objection vectors...",
                "Querying competitor battlecard database...",
                "Generating multi-stage psychological reframe...",
                "Drafting exact script response..."
            ],
            nextAction: "Load Next Rebuttal"
        }
    }

    // ─── 3E. Pricing Optimizer ───
    if (lowerInput.includes("price") || lowerInput.includes("pricing") || lowerInput.includes("tier") || lowerInput.includes("package")) {
        return {
            mode: "pricing_optimizer",
            tone: "hot",
            message: "Your current ACV is severely optimized for acquisition, not retention. I've run a pricing elasticity simulation on your active user base. Unbundling the Enterprise tier will result in an immediate 49% revenue uplift.",
            steps: [
                "Simulating price elasticity on active cohorts...",
                "Benchmarking against competitor GTM pricing...",
                "Analyzing feature adoption rates...",
                "Generating optimized tier recommendations..."
            ],
            nextAction: "Deploy New Pricing"
        }
    }

    // ─── 3F. Auto-Follow-Up Sequences ───
    if (lowerInput.includes("follow") || lowerInput.includes("sequence") || lowerInput.includes("drip") || lowerInput.includes("touch")) {
        return {
            mode: "auto_follow_up",
            tone: "neutral",
            message: "I am actively managing 14 automated drip sequences across 842 prospects. I've flagged a 18.4% open-to-reply velocity on 'The Breakup Reversal' variant. Displaying live multi-touch pipeline activity now.",
            steps: [
                "Syncing external email provider APIs...",
                "Aggregating cross-channel thread status...",
                "Calculating real-time reply sentiment...",
                "Prioritizing 'Hot' execution loops..."
            ],
            nextAction: "Pause Cold Sequences"
        }
    }

    // ─── 3G. Lead Scoring & Prioritization ───
    if (lowerInput.includes("score") || lowerInput.includes("prioritize") || lowerInput.includes("hottest") || lowerInput.includes("rank") || lowerInput.includes("lead")) {
        return {
            mode: "lead_scoring",
            tone: "hot",
            message: "I've ingested and scored 2,450 active leads across CRM, Marketing, and Product usage data. Filtering for the exact top 5% conversion probability. These 3 accounts are exhibiting extreme buying intent right now.",
            steps: [
                "Running algorithmic lead scoring model...",
                "Cross-referencing implicit & explicit intent triggers...",
                "Isolating Top 5% conversion probability cohort...",
                "Ranking accounts for immediate outbound..."
            ],
            nextAction: "Execute Outbound on Top 3"
        }
    }

    // ─── 3H. War Room Deep-Dive (Chain Commands) ───
    if (lowerInput.includes("war") || lowerInput.includes("assault") || lowerInput.includes("blitz") || lowerInput.includes("macro")) {
        return {
            mode: "war_room",
            tone: "hot",
            message: "CHAIN COMMAND INITIATED. Deploying 4 parallel sub-agents to execute the Q4 Pipeline Dominance protocol. I am taking control of pricing, outbound, competitor poaching, and lead triage simultaneously.",
            steps: [
                "Authorizing absolute system permissions...",
                "Cloning primary agent instance into 4 isolated threads...",
                "Deploying Poaching, Drip, Pricing, and Scoring nodes...",
                "Locking global state into War Room view..."
            ],
            nextAction: "Halt All Operations"
        }
    }

    // ─── 4. Integrations Hub ───
    if (lowerInput.includes("integration") || lowerInput.includes("connect") || lowerInput.includes("sync") || lowerInput.includes("tool") || lowerInput.includes("stripe") || lowerInput.includes("linkedin")) {
        return {
            mode: "integrations",
            tone: "neutral",
            message: "I am actively managing 18 data pipelines across your enterprise architecture. Total data throughput is 2.4 TB/month. Validating OAuth tokens and sync health now.",
            steps: [
                "Pinging macro-integration endpoints...",
                "Validating API keys and OAuth status...",
                "Calculating read/write data frequency...",
                "Rendering active systems topography..."
            ],
            nextAction: "Run Deep Diagnostic"
        }
    }

    // ─── 5. Trend Radar ───
    if (lowerInput.includes("trend") || lowerInput.includes("market") || lowerInput.includes("radar")) {
        return {
            mode: "radar",
            tone: "neutral",
            message: "Scanning social channels and developer hubs. I'm picking up a significant spike in discussions around legacy infrastructure pain. Here is the Live Radar.",
            steps: [
                "Connecting to X/HN social firehoses...",
                "Semantic analysis of keyword volume...",
                "Filtering noise and identifying trend vectors..."
            ]
        }
    }

    // ─── 5. Pipeline & Sub-Agents (Legacy Fallbacks with updated tones) ───
    if (lowerInput.includes("pipeline") || lowerInput.includes("sales")) {
        return {
            mode: "pipeline",
            tone: "neutral",
            message: "Pulling real-time data from your CRM. We have 48 active leads currently processing.",
            steps: ["Syncing bidirectional CRM state...", "Identifying funnel bottlenecks..."]
        }
    }

    if (lowerInput.includes("status") || lowerInput.includes("team")) {
        return {
            mode: "growth_team",
            tone: "neutral",
            message: "Here is the current status of your AI Growth Team. The Research and Experiment agents are currently running active operations.",
            steps: ["Pinging neural agents...", "Retrieving active telemetry data..."]
        }
    }

    // ─── Default Fallback ───
    return {
        mode: "unknown",
        tone: "cold",
        message: "Stop deflecting. Based on our goal of hitting $10k MRR, you should be deploying the Research agent to find new leads, or configuring an Outreach campaign. Define a clear growth mandate.",
        steps: ["Analyzing user intent...", "Intent unclear or passive."],
        nextAction: "Set Daily Objective"
    }
}

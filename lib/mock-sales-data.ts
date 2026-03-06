export type Lead = {
    name: string;
    company: string;
    title: string;
    score: number;
};

export type Remediation = {
    title: string;
    description: string;
    actionTitle: string;
    actionDescription: string;
    buttonText: string;
    type: "warning" | "success" | "neutral";
};

export type Task = {
    id: string;
    query: string;
    date: string;
    status: "Success" | "Warning" | "Failed" | "In Progress";
    runTime: string;
    leads: Lead[];
    remediation: Remediation;
};

// Base leads for reuse
const lStanford = { name: "Dr. Sarah J.", company: "Stanford Univ.", title: "Dean of Innovation", score: 98 };
const lBoston = { name: "Michael T.", company: "Boston College", title: "VP, Academic Affairs", score: 94 };
const lBerkeley = { name: "Elena R.", company: "UC Berkeley", title: "Director of Digital Learning", score: 89 };
const lNYU = { name: "Prof. David K.", company: "NYU", title: "Head of Computer Science", score: 88 };
const lMIT = { name: "Dr. L. Chen", company: "MIT", title: "Provost", score: 99 };
const lUCLA = { name: "A. Williams", company: "UCLA", title: "Assoc. Dean, EdTech", score: 91 };
const lTexas = { name: "Dr. R. Singh", company: "UT Austin", title: "VP, Provost", score: 87 };

export const LEAD_POOL = [lStanford, lBoston, lBerkeley, lNYU, lMIT, lUCLA, lTexas];

export const EDTECH_TASKS: Task[] = [
    {
        id: "task-150",
        query: "Find 20 Deans of Innovation fed up with Canvas LMS renewals",
        date: "Today, 10:45 AM",
        status: "Success",
        runTime: "12.4s",
        leads: [lStanford, lBerkeley, lMIT, lUCLA],
        remediation: {
            type: "warning",
            title: "Canvas Lock-in Friction Detected",
            description: "The 'Feature Comparison' template is converting at 1.4%. Universities are locked into multi-year Canvas contracts. Proceeding risks burning high-leverage leads.",
            actionTitle: "Generate 'Shadow Pilot' Sequence",
            actionDescription: "Agent will rewrite the sequence to pitch a frictionless, free 'Shadow Pilot' of Ingen X0 for single departments, bypassing central university IT procurement entirely.",
            buttonText: "Rewrite & Inject EdTech Pipeline"
        }
    },
    {
        id: "task-149",
        query: "Scrape LinkedIn globally for 'EdTech Transformation' & 'LMS Migration'",
        date: "Today, 09:12 AM",
        status: "Warning",
        runTime: "45.0s",
        leads: [lBoston, lTexas],
        remediation: {
            type: "neutral",
            title: "Broad Keyword Dilution",
            description: "Scraping 'Transformation' yielded 40% non-decision makers (e.g., Instructional Designers without budget).",
            actionTitle: "Refine ICP Filtering Parameters",
            actionDescription: "Agent will apply a rigid exclusion filter removing non-budget holders and re-run the scrape targeting only VPs, Provosts, and Deans.",
            buttonText: "Execute ICP Re-Filter"
        }
    },
    {
        id: "task-148",
        query: "Draft follow-up emails for 'Shadow Pilot' Campaign B (No Repliers)",
        date: "Yesterday, 3:12 PM",
        status: "Success",
        runTime: "8.1s",
        leads: [lNYU, lUCLA],
        remediation: {
            type: "success",
            title: "Optimal Follow-up Trajectory",
            description: "Previous follow-up sequence achieved a 22% reply rate. The new draft isolates the specific 'AI Grading' value proposition.",
            actionTitle: "Deploy Contextual Bump",
            actionDescription: "Agent will dispatch the 2-line bump email referencing the recent article on AI grading bias, demonstrating Ingen X0's superior evaluation engine.",
            buttonText: "Approve & Dispatch Sequence"
        }
    },
    {
        id: "task-147",
        query: "Inject 50 Tier-1 University leads into Ingen X0 Salesforce",
        date: "Yesterday, 1:45 PM",
        status: "Success",
        runTime: "5.2s",
        leads: [lMIT, lStanford, lBoston, lNYU, lTexas, lUCLA, lBerkeley],
        remediation: {
            type: "success",
            title: "Pipeline Injection Complete",
            description: "50 records successfully pushed to Salesforce via API. Duplicate detection caught and merged 3 overlapping records.",
            actionTitle: "Initiate Warm-up Workflow",
            actionDescription: "Agent proposes initiating a passive LinkedIn engagement sequence (Profile views, post likes) for 72 hours before dispatching the first cold email.",
            buttonText: "Start Pre-Outreach Sequence"
        }
    },
    {
        id: "task-146",
        query: "Analyze Blackboard contract expiration dates via public procurement records",
        date: "Mar 3, 2026",
        status: "In Progress",
        runTime: "1m 12s",
        leads: [],
        remediation: {
            type: "neutral",
            title: "Data Crawl Active",
            description: "Agent is currently parsing PDF procurement records from public university transparency portals.",
            actionTitle: "Awaiting Payload",
            actionDescription: "Once target dates are extracted, Agent will automatically correlate expiration windows with our outreach scheduling engine.",
            buttonText: "Monitor Telemetry"
        }
    },
    {
        id: "task-145",
        query: "Draft hyper-personalized email to Dr. Sarah J. regarding Stanford Innovation Initiative",
        date: "Mar 3, 2026",
        status: "Success",
        runTime: "14.8s",
        leads: [lStanford],
        remediation: {
            type: "success",
            title: "Personalization Engine Hit",
            description: "Agent successfully extracted Stanford's 2026 strategic plan mentioning 'AI integration in curricula' and cited it in the opening hook.",
            actionTitle: "Review Single-Target Draft",
            actionDescription: "Email confidently positions Ingen X0 as the execution layer for the Dean's specific public 2026 mandate.",
            buttonText: "Review & Send"
        }
    },
    {
        id: "task-144",
        query: "Identify and scrape contact info for Top 50 Computer Science Dept Heads",
        date: "Mar 2, 2026",
        status: "Success",
        runTime: "22.3s",
        leads: [lNYU, lMIT],
        remediation: {
            type: "warning",
            title: "Deliverability Risk Detected",
            description: "12 of the 50 scraped emails returned a 'Catch-All' ping from the server. Risk of hard bounce is elevated.",
            actionTitle: "Run Secondary Verification",
            actionDescription: "Agent will route the 12 risky emails through a secondary SMTP handshake protocol to guarantee deliverability and protect domain reputation.",
            buttonText: "Verify Risky Targets"
        }
    },
    {
        id: "task-143",
        query: "Generate 'AI vs Legacy LMS' one-pager dynamic link for outbound sequences",
        date: "Mar 2, 2026",
        status: "Success",
        runTime: "4.1s",
        leads: [],
        remediation: {
            type: "success",
            title: "Asset Generation Complete",
            description: "Dynamic tracking URLs have been generated for the one-pager. We can now detect when a Dean opens the document.",
            actionTitle: "Inject Asset into Active Sequences",
            actionDescription: "Agent will automatically append the dynamic link to the Phase 3 email in the 'Shadow Pilot' sequence.",
            buttonText: "Inject Asset"
        }
    },
    {
        id: "task-142",
        query: "Scan Twitter/X for professors complaining about Canvas grading UI",
        date: "Mar 1, 2026",
        status: "Success",
        runTime: "33.5s",
        leads: [lTexas],
        remediation: {
            type: "neutral",
            title: "Micro-Intent Signal Detected",
            description: "Agent found 14 professors tweeting negatively about the Canvas 'SpeedGrader' UI in the last 48 hours.",
            actionTitle: "Deploy 'Agitation' Sequence",
            actionDescription: "Agent has drafted a light, commiserating DM sequence for Twitter/X highlighting Ingen X0's 1-click AI grading module.",
            buttonText: "Approve DM Sequence"
        }
    },
    {
        id: "task-141",
        query: "Rewrite 'Cold Response' handling logic for 'Not right now' replies",
        date: "Feb 28, 2026",
        status: "Success",
        runTime: "18.2s",
        leads: [lBerkeley],
        remediation: {
            type: "success",
            title: "Objection Handling Upgraded",
            description: "Agent trained on previous successful rebuttals. It will now automatically categorize 'timing' objections and schedule a 90-day follow-up.",
            actionTitle: "Apply Logic to Overdue Leads",
            actionDescription: "Agent identified 8 prospects who previously gave a 'timing' objection over 90 days ago. Shall I initiate the re-engagement sequence?",
            buttonText: "Re-engage Old Pipeline"
        }
    }
];

// Generate 40 more filler tasks to hit the 50+ requirement for realism
const verbs = ["Scrape", "Draft", "Inject", "Analyze", "Optimize", "Verify", "Cross-reference", "Enrich", "A/B Test", "Extract"];
const nouns = ["Canvas defectors", "Blackboard renewals", "CS Dept Heads", "University Provosts", "EdTech budgets", "LMS intent data", "Tier-1 Deans", "Public procurement PDFs", "Faculty complaints", "Pricing objections"];

for (let i = 140; i > 100; i--) {
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    // Pick 1-3 random leads
    const shuffledLeads = [lStanford, lBoston, lBerkeley, lNYU, lMIT, lUCLA, lTexas].sort(() => 0.5 - Math.random());
    const leadCount = Math.floor(Math.random() * 3) + 1;
    const selectedLeads = shuffledLeads.slice(0, leadCount);

    const isSuccess = Math.random() > 0.3;

    EDTECH_TASKS.push({
        id: `task-${i}`,
        query: `${verb} ${noun} via API routing`,
        date: `Feb ${Math.floor(Math.random() * 28 + 1)}, 2026`,
        status: isSuccess ? "Success" : "Warning",
        runTime: `${(Math.random() * 40 + 2).toFixed(1)}s`,
        leads: selectedLeads,
        remediation: {
            type: isSuccess ? "success" : "warning",
            title: isSuccess ? "Routine Operation Nominal" : "Data Fidelity Warning",
            description: isSuccess ? "Task completed within expected parameters utilizing standard API protocols." : `The ${verb.toLowerCase()} operation encountered rate-limiting on target indices.`,
            actionTitle: isSuccess ? "No Critical Action Required" : "Rotate IP & Re-Execute",
            actionDescription: isSuccess ? "System will continue to monitor the output feed." : "Agent requests permission to rotate proxies and bypass the rate limit to complete the data extraction.",
            buttonText: isSuccess ? "Acknowledge" : "Rotate & Retry"
        }
    });
}

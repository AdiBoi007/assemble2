// ─── Playbook Generation — Types & Demo Data ──────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// 7. STRUCTURED PLAYBOOK PLAN
// ═══════════════════════════════════════════════════════════════════════════════

export interface PlaybookSection {
    id: string
    title: string
    duration: string
    durationMinutes: number
    objectives: string[]
    probes: string[]
    followUps: string[]
    type: 'intro' | 'technical' | 'behavioural' | 'system-design' | 'culture' | 'closing'
    interviewer?: string
    notes?: string
}

export interface PlaybookPlan {
    roleTitle: string
    totalDuration: string
    totalRounds: number
    sections: PlaybookSection[]
}

export const DEMO_PLAYBOOK_PLAN: PlaybookPlan = {
    roleTitle: 'Enterprise Discovery Call Blueprint',
    totalDuration: '45m structured sync',
    totalRounds: 4,
    sections: [
        {
            id: 'sec-1',
            title: 'Rapport & Agenda Setting',
            duration: '5 min',
            durationMinutes: 5,
            type: 'intro',
            objectives: ['Establish control of the meeting', 'Confirm timeframe', 'Align on the objective'],
            probes: [
                'Before we dive in, we still have 45 minutes booked—does that still work for you?',
                'I pulled some notes on your recent Series B, is infra cost-cutting a core initiative this quarter?',
            ],
            followUps: [
                'If timeframe is cut: Which topic is absolute priority today?',
            ],
            interviewer: 'Account Executive',
            notes: 'Keep it tight. Don\'t spend 10 minutes on the weather.',
        },
        {
            id: 'sec-2',
            title: 'Pain & Current State Discovery',
            duration: '15 min',
            durationMinutes: 15,
            type: 'technical',
            objectives: ['Uncover CI/CD bottlenecks', 'Identify manual QA hours', 'Map current toolchain'],
            probes: [
                'Walk me through your current deployment pipeline. Where are developers spending the most dead time?',
                'You mentioned earlier that releases take hours. What breaks most often?',
                'How are you currently managing test environment provisioning for the 50 person engineering team?',
            ],
            followUps: [
                'Can you quantify that "wasted time" in engineer hours?',
                'Who owns the fallout when the pipeline fails?',
                'What happens if you don\'t fix this by end of Q3?',
            ],
            interviewer: 'Account Executive',
        },
        {
            id: 'sec-3',
            title: 'Solution Mapping & Demo',
            duration: '15 min',
            durationMinutes: 15,
            type: 'system-design',
            objectives: ['Tie product features to identified pain', 'Demonstrate ease of integration', 'Validate technical fit'],
            probes: [
                'Based on the friction you mentioned, let me show you how our visual pipeline builder eliminates that script maintenance.',
                'How does this approach compare to the internal tool your team was considering building?',
            ],
            followUps: [
                'Do you see your team adopting this workflow?',
                'Are there any security or compliance hurdles we should address now?',
            ],
            interviewer: 'Sales Engineer',
        },
        {
            id: 'sec-4',
            title: 'Authority & Next Steps',
            duration: '10 min',
            durationMinutes: 10,
            type: 'closing',
            objectives: ['Identify buying committee', 'Establish a mutual action plan', 'Schedule technical deep dive'],
            probes: [
                'Typically, teams evaluating us will sequence a POC next. Does that align with your evaluation process?',
                'Besides yourself, who else needs to weigh in before rolling out a new CI/CD platform?',
            ],
            followUps: [
                'Are they available next Tuesday for a 30 min technical review?',
                'Should we loop in the security team now or after the POC?',
            ],
            interviewer: 'Account Executive',
        },
    ],
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. DISCOVERY QUESTION BANK
// ═══════════════════════════════════════════════════════════════════════════════

export type QuestionImpact = 'low' | 'medium' | 'high'

export interface DiscoveryQuestion {
    id: string
    competency: string
    category: 'pain' | 'budget' | 'authority' | 'timeline'
    impact: QuestionImpact
    question: string
    expectedSignals: string[]
    redFlags: string[]
    timeAllocation: string
}

export const IMPACT_CONFIG: Record<QuestionImpact, { label: string; color: string; icon: string }> = {
    low: { label: 'Low Impact', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', icon: '🟢' },
    medium: { label: 'Medium Impact', color: 'text-amber-400 bg-amber-500/15 border-amber-500/30', icon: '🟡' },
    high: { label: 'High Impact', color: 'text-red-400 bg-red-500/15 border-red-500/30', icon: '🔴' },
}

export const DEMO_DISCOVERY_BANK: DiscoveryQuestion[] = [
    {
        id: 'q-1', competency: 'Process Inefficiency', category: 'pain', impact: 'high',
        question: 'Walk me through your current PR review to deployment lifecycle. What are the manual steps that slow developers down?',
        expectedSignals: ['Mentions context switching', 'Frustrated by slow CI runners', 'Complains about manual QA overhead'],
        redFlags: ['Everything is perfect', 'Unable to articulate the deployment process'],
        timeAllocation: '5 min',
    },
    {
        id: 'q-2', competency: 'Cost Implications', category: 'budget', impact: 'high',
        question: 'How much engineering time would you estimate is spent maintaining these internal deployment scripts per month?',
        expectedSignals: ['Quantifies hours/cost', 'Acknowledges opportunity cost of not building product', 'Seeking to consolidate tools'],
        redFlags: ['No idea', 'Thinks internal tools are free'],
        timeAllocation: '4 min',
    },
    {
        id: 'q-3', competency: 'Buying Process', category: 'authority', impact: 'medium',
        question: 'When your team previously purchased a dev tool, like GitHub Copilot, what did that approval process look like?',
        expectedSignals: ['Clear understanding of procurement', 'Mentions InfoSec/CFO signoff', 'Identifies an executive sponsor'],
        redFlags: ['Vague answer', '"I just put it on my card" (for enterprise tier)'],
        timeAllocation: '3 min',
    },
    {
        id: 'q-4', competency: 'Urgency', category: 'timeline', impact: 'medium',
        question: 'What happens if we don\'t solve this CI/CD bottleneck by the end of this quarter?',
        expectedSignals: ['Missed product launches', 'Developer attrition', 'Compliance risks'],
        redFlags: ['"Nothing really, it\'s just annoying"'],
        timeAllocation: '3 min',
    },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 9. DYNAMIC OBJECTION HANDLING
// ═══════════════════════════════════════════════════════════════════════════════

export type ProspectReaction = 'positive' | 'skeptical' | 'negative'

export interface ObjectionHandler {
    id: string
    baseQuestion: string
    reaction: ProspectReaction
    followUp: string
    purpose: string
    depth: number
}

export const REACTION_CONFIG: Record<ProspectReaction, { label: string; color: string; icon: string }> = {
    positive: { label: 'Positive', color: 'text-emerald-400 bg-emerald-500/15', icon: '✅' },
    skeptical: { label: 'Skeptical', color: 'text-amber-400 bg-amber-500/15', icon: '⚡' },
    negative: { label: 'Negative', color: 'text-red-400 bg-red-500/15', icon: '⚠️' },
}

export const DEMO_OBJECTION_HANDLING: ObjectionHandler[] = [
    {
        id: 'fu-1', baseQuestion: 'We are considering building this internally.', reaction: 'positive', depth: 2,
        followUp: 'That makes sense given your engineering talent. What core product features would those engineers NOT be building while they maintain the internal tool?',
        purpose: 'Highlight opportunity cost and shift focus to core business tasks.',
    },
    {
        id: 'fu-2', baseQuestion: 'We are considering building this internally.', reaction: 'skeptical', depth: 2,
        followUp: 'Many teams try that first. We recently replaced an internal tool at ACME Corp because they spent $200k/yr maintaining it. Have you scoped the maintenance cost?',
        purpose: 'Inject FOMO and social proof.',
    },
    {
        id: 'fu-3', baseQuestion: 'We are considering building this internally.', reaction: 'negative', depth: 2,
        followUp: 'Understood. If you build it, how will you handle the security and SOC2 compliance overhead for this specific pipeline?',
        purpose: 'Create doubt via compliance/edge cases.',
    },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 10. PERSONA VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

export interface PersonaVariant {
    id: string
    originalId: string
    variantLabel: string
    question: string
    context: string
    isIsomorphic: boolean
    difficultyDelta: number
}

export const DEMO_PERSONA_VARIANTS: PersonaVariant[] = [
    {
        id: 'v-1a', originalId: 'q-2', variantLabel: 'CTO / VP Eng',
        question: 'How is the CI/CD bottleneck impacting your overall sprint velocity and product roadmap delivery?',
        context: 'Cares about high-level velocity, budget, and roadmap.',
        isIsomorphic: true, difficultyDelta: 0,
    },
    {
        id: 'v-1b', originalId: 'q-2', variantLabel: 'Staff Engineer',
        question: 'Which specific Docker build steps or NPM scripts are breaking locally versus in production?',
        context: 'Cares about the technical weeds and daily friction.',
        isIsomorphic: true, difficultyDelta: 0,
    },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 16. BATTLECARD / GUIDANCE
// ═══════════════════════════════════════════════════════════════════════════════

export interface BattlecardGuidance {
    id: string
    question: string
    expectedAnswer: string
    probingStrategy: string[]
    greenFlags: string[]
    redFlags: string[]
    scoringCriteria: { score: number; description: string }[]
    commonMistakes: string[]
}

export const DEMO_BATTLECARD_GUIDANCE: BattlecardGuidance[] = [
    {
        id: 'bg-1',
        question: 'Are there budget constraints we should be aware of?',
        expectedAnswer: 'Should indicate that they have an active budget or can create one for a tool with clear ROI.',
        probingStrategy: [
            'Do not ask "Do you have budget?" outright early on.',
            'Ask: "How are tools like this typically funded at [Company]?"',
        ],
        greenFlags: ['Mentions an approved initiative', 'C-level sponsor is involved', 'Currently paying for a competitor'],
        redFlags: ['"We have zero budget"', 'Requires 12 months of piloting first'],
        scoringCriteria: [
            { score: 1, description: 'No budget, no path to budget.' },
            { score: 3, description: 'Budget can be found if ROI is proven.' },
            { score: 5, description: 'Budget is fully allocated and approved.' },
        ],
        commonMistakes: [
            'Accepting "no budget" without probing on ROI.',
            'Asking too early before establishing value.',
        ],
    },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 17. SDR BRIEFING INSTRUCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export interface SDRBriefing {
    id: string
    section: string
    timeLimit: string
    briefing: string
    expectations: string[]
    doList: string[]
    dontList: string[]
    evaluationPreview: string
}

export const DEMO_SDR_BRIEFING: SDRBriefing[] = [
    {
        id: 'ci-1',
        section: 'Pre-Call Prep',
        timeLimit: '15 mins before call',
        briefing: 'Review the prospect\'s LinkedIn, recent company news, and any previous marketing touchpoints. Understand their tech stack using BuiltWith.',
        expectations: [
            'Do not go in blind.',
            'Formulate a specific hypothesis about their pain before getting on the call.',
        ],
        doList: [
            'Check CRM for past closed-lost opportunities.',
            'Look for recent hiring trends (e.g., hiring 5 DevOps engineers).',
        ],
        dontList: [
            'Don\'t ask basic questions you could have Googled ("What does your company do?").',
            'Don\'t pitch in the first 5 minutes.',
        ],
        evaluationPreview: 'Quality of initial rapport and relevance of discovery questions.',
    },
]

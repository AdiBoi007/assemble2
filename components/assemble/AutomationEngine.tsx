"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Bell, AlertCircle, CheckCircle2, ChevronRight, ArrowRight, Pause, Play } from "lucide-react"
import { SiSlack, SiStripe, SiHubspot, SiPosthog, SiNotion } from "react-icons/si"
import { FiMail } from "react-icons/fi"
import { cn } from "@/lib/utils"

const TOOLS = [
    { name: "Slack", icon: <SiSlack className="w-5 h-5 text-white" />, level: "execute", desc: "Agent can send messages and post to channels" },
    { name: "Email Platform", icon: <FiMail className="w-5 h-5 text-white" />, level: "notify", desc: "Agent can draft and preview — not send without approval" },
    { name: "Stripe", icon: <SiStripe className="w-5 h-5 text-white" />, level: "read", desc: "Agent can read revenue data only. Cannot process payments." },
    { name: "HubSpot CRM", icon: <SiHubspot className="w-5 h-5 text-white" />, level: "notify", desc: "Agent can update stages and notes — requires approval" },
    { name: "PostHog Analytics", icon: <SiPosthog className="w-5 h-5 text-white" />, level: "read", desc: "Agent reads usage data. Cannot modify events." },
    { name: "Notion", icon: <SiNotion className="w-5 h-5 text-white" />, level: "execute", desc: "Agent can create and update pages autonomously" },
]

const CHAINS = [
    {
        id: 1,
        trigger: "Conversion drops > 20%",
        condition: "Product health score < 50",
        action: "Analyze root cause → Notify Slack → Prepare fix path",
        active: true,
        runs: 3,
        lastRun: "2d ago",
    },
    {
        id: 2,
        trigger: "Customer cancels subscription",
        condition: "Subscription active > 30 days",
        action: "Launch win-back email sequence (3-day)",
        active: true,
        runs: 2,
        lastRun: "1w ago",
    },
    {
        id: 3,
        trigger: "Failed payment detected",
        condition: "Payment fails 2+ times",
        action: "Send recovery sequence → escalate at Day 3",
        active: true,
        runs: 1,
        lastRun: "3w ago",
    },
    {
        id: 4,
        trigger: "Lead replies to outbound",
        condition: "Reply contains 'interested' or 'call'",
        action: "Notify founder + book Calendly link via email",
        active: false,
        runs: 0,
        lastRun: "Never",
    },
]

const AUDIT_LOG = [
    { action: "Sent weekly revenue briefing to #founders", agent: "Notification Agent", time: "Today 9:02 AM", type: "notify" },
    { action: "Updated SaaS Tool B fix: rewrote Email Step 3 subject line", agent: "Content Agent", time: "Today 8:45 AM", type: "execute" },
    { action: "Scanned 5 competitor websites for pricing changes", agent: "Research Agent", time: "Yesterday 11pm", type: "read" },
    { action: "Moved 2 leads from Contacted → Replied in CRM", agent: "Outbound Agent", time: "Yesterday 3pm", type: "execute" },
    { action: "Pulled Stripe MRR data for weekly report", agent: "Finance Agent", time: "Mon 8am", type: "read" },
]

const LEVEL_CONFIG = {
    read: { label: "Read Only", color: "text-neutral-400 bg-neutral-500/10 border-neutral-500/20", dot: "bg-neutral-500" },
    notify: { label: "Notify", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400" },
    execute: { label: "Full Execute", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
}

export function AutomationEngine() {
    const [tab, setTab] = useState<"tools" | "chains" | "audit">("tools")
    const [tools, setTools] = useState(TOOLS)
    const [chains, setChains] = useState(CHAINS)
    const [globalPause, setGlobalPause] = useState(false)

    const cycleLevel = (toolName: string) => {
        setTools(prev => prev.map(t => {
            if (t.name !== toolName) return t
            const levels = ["read", "notify", "execute"] as const
            const i = levels.indexOf(t.level as typeof levels[number])
            const next = levels[(i + 1) % 3]
            return { ...t, level: next, desc: LEVEL_CONFIG[next].label + " — tap to change" }
        }))
    }

    const toggleChain = (id: number) => setChains(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c))

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header with global pause */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-white/[0.04] shrink-0">
                <div className="flex items-center gap-1 flex-1">
                    {([
                        { id: "tools", label: "Access Control" },
                        { id: "chains", label: "Automation Chains" },
                        { id: "audit", label: "Audit Log" },
                    ] as const).map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                tab === t.id ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"
                            )}
                        >{t.label}</button>
                    ))}
                </div>
                <button
                    onClick={() => setGlobalPause(!globalPause)}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                        globalPause ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    )}
                >
                    {globalPause ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    {globalPause ? "Resume All" : "Pause All"}
                </button>
            </div>

            {globalPause && (
                <div className="mx-4 mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 flex items-center gap-2 shrink-0">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <p className="text-xs text-rose-300">All agent actions are paused. No executions will run until you resume.</p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 space-y-3">

                    {/* Tool Access Control */}
                    {tab === "tools" && (
                        <>
                            <p className="text-xs text-neutral-500 mb-3">Set what each connected tool allows the agent to do. Tap the access level to cycle through: Read → Notify → Full Execute.</p>
                            {tools.map((tool, i) => {
                                const cfg = LEVEL_CONFIG[tool.level as keyof typeof LEVEL_CONFIG]
                                return (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                                    >
                                        <span className="text-xl w-8 text-center shrink-0">{tool.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white">{tool.name}</p>
                                            <p className="text-[10px] text-neutral-500 mt-0.5">{tool.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => cycleLevel(tool.name)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all hover:scale-105",
                                                cfg.color
                                            )}
                                        >
                                            <div className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                                            {cfg.label}
                                        </button>
                                    </motion.div>
                                )
                            })}
                        </>
                    )}

                    {/* Automation Chains */}
                    {tab === "chains" && (
                        <>
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs text-neutral-500">Set up once, runs forever. Agent executes when trigger conditions are met.</p>
                                <button className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">+ New Chain</button>
                            </div>
                            {chains.map((chain, i) => (
                                <motion.div
                                    key={chain.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className={cn(
                                        "rounded-xl border p-4 transition-all",
                                        chain.active ? "border-white/[0.06] bg-white/[0.02]" : "border-white/[0.03] bg-transparent opacity-60"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full", chain.active ? "bg-emerald-400" : "bg-neutral-600")} />
                                            <span className="text-[10px] font-mono text-neutral-500 uppercase">Chain {chain.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-neutral-600 font-mono">{chain.runs} runs · {chain.lastRun}</span>
                                            <button
                                                onClick={() => toggleChain(chain.id)}
                                                className={cn(
                                                    "text-[10px] px-2.5 py-1 rounded-full border font-mono transition-colors",
                                                    chain.active
                                                        ? "border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                                                        : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                                                )}
                                            >
                                                {chain.active ? "Pause" : "Activate"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md font-mono shrink-0">Trigger</span>
                                            <span className="text-xs text-neutral-300">{chain.trigger}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md font-mono shrink-0">If</span>
                                            <span className="text-xs text-neutral-400">{chain.condition}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md font-mono shrink-0">Then</span>
                                            <span className="text-xs text-neutral-300">{chain.action}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </>
                    )}

                    {/* Audit Log */}
                    {tab === "audit" && (
                        <>
                            <p className="text-xs text-neutral-500 mb-1">Immutable log of every action the agent has taken. Cannot be deleted.</p>
                            <div className="space-y-2">
                                {AUDIT_LOG.map((entry, i) => (
                                    <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                                        <div className={cn(
                                            "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                            entry.type === "execute" ? "bg-indigo-500/20 text-indigo-400" :
                                                entry.type === "notify" ? "bg-emerald-500/20 text-emerald-400" :
                                                    "bg-neutral-500/20 text-neutral-400"
                                        )}>
                                            {entry.type === "execute" ? <Zap className="w-3 h-3" /> :
                                                entry.type === "notify" ? <Bell className="w-3 h-3" /> :
                                                    <Shield className="w-3 h-3" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-neutral-300 leading-relaxed">{entry.action}</p>
                                            <p className="text-[10px] text-neutral-600 mt-0.5">{entry.agent} · {entry.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

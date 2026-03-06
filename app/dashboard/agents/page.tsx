"use client"

import React from "react"
import { motion } from "framer-motion"
import { Search, Zap, CheckCircle2, ShieldAlert, ArrowRight, Brain, Briefcase, Activity, Target, MessageSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const AGENTS = [
    {
        id: "intelligence",
        name: "Product Intelligence Agent",
        role: "System Analytics & PMF Validation",
        description: "Monitors core telemetry, identifies user drop-offs, and proposes actionable feature fixes.",
        icon: Activity,
        status: "Active",
        color: "emerald"
    },
    {
        id: "finance",
        name: "Finance & Capital Agent",
        role: "Revenue & Churn Management",
        description: "Tracks MRR trajectory, flags high-risk enterprise accounts, and deploys win-back campaigns.",
        icon: DollarSign, // Note: importing below
        status: "Active",
        color: "indigo"
    },
    {
        id: "analyst",
        name: "Executive Business Analyst",
        role: "Market & Competitor Operations",
        description: "Evaluates competitor feature releases, funding rounds, and tracks your global PMF Scorecard.",
        icon: Briefcase,
        status: "Active",
        color: "cyan"
    },
    {
        id: "clients",
        name: "Sales Agent",
        role: "Lead Discovery & Pipeline",
        description: "Autonomously manages pipeline, engages prospects, and closes deals natively inside the Command Center.",
        icon: Target,
        status: "Active",
        color: "rose"
    },
    {
        id: "social",
        name: "Social Media Agent",
        role: "Brand Narrative & Distribution",
        description: "Monitors Twitter/X for buying signals, auto-drafts thought leadership threads natively.",
        icon: MessageSquare,
        status: "Standby",
        color: "neutral"
    }
]

import { DollarSign } from "lucide-react"

const RECENT_TASKS = [
    { agent: "Sales Agent", action: "Injected 24 'hiring engineers' leads into CRM", time: "12m ago", status: "success" },
    { agent: "Finance & Capital Agent", action: "Detected $14.2k MRR exposure — Proposed Win-back", time: "1h ago", status: "warning" },
    { agent: "Executive Business Analyst", action: "Flagged competitor 'CEO Tools' shutdown", time: "3h ago", status: "opportunity" },
    { agent: "Product Intelligence Agent", action: "Successfully deployed fix to Email Step 3 via A/B Test", time: "5h ago", status: "success" },
    { agent: "Social Media Agent", action: "Drafted 3 replies to trending Next.js founders", time: "1d ago", status: "pending" },
]

export default function AgentsDirectory() {
    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex flex-col h-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-3xl font-light text-white mb-2 tracking-tight">Agent Roster</h1>
                <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Global Fleet Command</p>
            </motion.div>

            <div className="flex flex-col xl:flex-row gap-8 flex-1 overflow-hidden">

                {/* Left: The Agent Grid */}
                <div className="xl:w-2/3 flex flex-col h-full overflow-y-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {AGENTS.map((agent, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                                key={agent.id}
                            >
                                <Link href={`/chat?view=${agent.id}`} className="block h-full cursor-pointer group">
                                    <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-xl group-hover:bg-white/[0.04] group-hover:border-white/[0.1] transition-all relative overflow-hidden isolate">

                                        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10",
                                            agent.color === "emerald" ? "bg-emerald-500/10" :
                                                agent.color === "indigo" ? "bg-indigo-500/10" :
                                                    agent.color === "cyan" ? "bg-cyan-500/10" :
                                                        agent.color === "rose" ? "bg-rose-500/10" : "bg-white/5"
                                        )} />

                                        <div className="flex justify-between items-start mb-4">
                                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border",
                                                agent.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                                                    agent.color === "indigo" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" :
                                                        agent.color === "cyan" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" :
                                                            agent.color === "rose" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : "bg-white/5 border-white/10 text-neutral-400"
                                            )}>
                                                <agent.icon className="w-5 h-5" />
                                            </div>
                                            <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-widest",
                                                agent.status === "Active" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-neutral-500/10 border-neutral-500/20 text-neutral-400"
                                            )}>
                                                {agent.status}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">{agent.name}</h3>
                                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">{agent.role}</p>
                                        <p className="text-sm text-neutral-400 font-light leading-relaxed">{agent.description}</p>

                                        <div className="mt-6 flex items-center text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            Enter Deep Dive <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: The Live Task Feed */}
                <div className="xl:w-1/3 flex flex-col h-full pl-2">
                    <div className="bg-[#050505] border border-white/[0.05] rounded-3xl p-6 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col h-full">

                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.05]">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                Live Operations Log
                            </h3>
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                        </div>

                        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
                            {RECENT_TASKS.map((task, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
                                    key={i}
                                    className="group"
                                >
                                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-default border border-transparent hover:border-white/[0.05]">
                                        <div className="mt-0.5 shrink-0">
                                            {task.status === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                            {task.status === "warning" && <ShieldAlert className="w-4 h-4 text-amber-400" />}
                                            {task.status === "opportunity" && <Target className="w-4 h-4 text-cyan-400" />}
                                            {task.status === "pending" && <div className="w-4 h-4 rounded-full border border-neutral-500" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white mb-0.5 group-hover:text-cyan-200 transition-colors">{task.action}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono text-neutral-500">{task.agent}</span>
                                                <span className="text-[10px] text-neutral-600">·</span>
                                                <span className="text-[10px] font-mono text-neutral-600">{task.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/[0.05] flex justify-center">
                            <button className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                                View Complete Audit Log
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

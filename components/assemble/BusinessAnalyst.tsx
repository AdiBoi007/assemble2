"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Activity, Zap, CheckCircle2, AlertCircle, RefreshCw, BarChart3, TrendingUp, Shield, Globe, Cpu, Hexagon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const COMPETITORS = [
    { name: "Acme Corp", url: "acme.io", change: "Pricing architecture +$30/mo", type: "pricing", days: 3, threat: "High" },
    { name: "BuildOS", url: "buildos.com", change: "Deployed AI narrative sequencing", type: "feature", days: 5, threat: "Medium" },
    { name: "LaunchPad", url: "launchpad.co", change: "Series A ($12M) secured", type: "funding", days: 8, threat: "Medium" },
    { name: "CEO Tools", url: "ceotools.app", change: "Sunset sequence initiated", type: "shutdown", days: 2, threat: "Opportunity" },
]

const PMF_BREAKDOWN = [
    { label: "D30 Retention", score: 68, benchmark: 55, status: "stable" },
    { label: "NPS Proxy", score: 52, benchmark: 40, status: "stable" },
    { label: "Referral Rate", score: 18, benchmark: 25, status: "critical" },
    { label: "Weekly Active", score: 71, benchmark: 60, status: "stable" },
]

export function BusinessAnalyst() {
    const [activeView, setActiveView] = useState("overview")

    return (
        <div className="h-full flex flex-col bg-[#020202] text-white font-sans overflow-hidden relative isolate">

            {/* Structural Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />
            <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none -z-10 blur-3xl" />

            {/* Header Layer */}
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.04] shrink-0 flex justify-between items-start z-20 backdrop-blur-3xl bg-[#020202]/80">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-white">
                            Business Analyst Engine
                        </h2>
                    </div>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        <strong className="text-indigo-400 font-medium mr-2">Executive Briefing:</strong>
                        MRR grew +6.4% WoW, securing trajectory for June targets. Market positioning remains stable, however <span className="text-rose-400 font-mono">Referral Rate (18%)</span> requires immediate optimization. Competitor 'CEO Tools' shutdown presents a high-leverage acquisition opportunity.
                    </p>
                </div>

                <div className="flex gap-4 text-right shrink-0">
                    <div className="flex flex-col items-end justify-center bg-[#050505] border border-white/[0.05] rounded-xl p-3 shadow-xl">
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Globe className="w-3 h-3" /> Market Pulse</p>
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Favorable
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Workspace Split */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">

                {/* LEFT: Market & Competitor Telemetry */}
                <div className="lg:w-1/2 h-full flex flex-col border-r border-white/[0.04] bg-[#020202]/60 overflow-y-auto custom-scrollbar">

                    <div className="p-8 pb-4">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                            <Shield className="w-3.5 h-3.5 text-indigo-400" /> Competitor Telemetry
                        </h3>

                        <div className="space-y-3">
                            {COMPETITORS.map((comp, i) => (
                                <div key={comp.name} className={cn(
                                    "p-4 rounded-xl border relative overflow-hidden group transition-colors",
                                    comp.threat === "High" ? "border-rose-500/20 bg-rose-500/5 hover:border-rose-500/30" :
                                        comp.threat === "Opportunity" ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30" :
                                            "border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03]"
                                )}>
                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-semibold text-white">{comp.name}</h4>
                                                <span className="text-[10px] text-neutral-600 font-mono">{comp.url}</span>
                                            </div>
                                            <p className="text-xs text-neutral-400 font-light">{comp.change}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5 border-l border-white/5 pl-4">
                                            <span className={cn(
                                                "text-[9px] font-mono uppercase tracking-widest rounded px-1.5 py-0.5 border",
                                                comp.threat === "High" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                                                    comp.threat === "Opportunity" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        "bg-white/5 text-amber-400 border-white/10"
                                            )}>{comp.threat}</span>
                                            <span className="text-[10px] text-neutral-600 font-mono">T-{comp.days}d</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 pt-4">
                        {/* Strategic Opportunity Card */}
                        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 relative overflow-hidden isolate">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] -z-10" />
                            <h4 className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Zap className="w-3.5 h-3.5" /> High-Leverage Vector
                            </h4>
                            <h5 className="text-base font-medium text-white mb-2">Deploy 'CEO Tools' Rescue Sequence</h5>
                            <p className="text-sm text-neutral-300 font-light leading-relaxed mb-5">
                                Competitor shutting down. Agent can instantly scrape their public Twitter followers and deploy a rapid 1-click migration offer campaign via LinkedIn & Email.
                            </p>
                            <button className="w-full h-10 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                                Authorize Campaign Initialization <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* RIGHT: PMF Scorecard & System Status */}
                <div className="lg:w-1/2 h-full bg-[#030303] flex flex-col p-8 overflow-y-auto custom-scrollbar border-l border-white/[0.04] shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">

                    <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-emerald-400" /> PMF Index Matrix
                    </h3>

                    <div className="flex items-center justify-between p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 mb-8">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center relative shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                                <span className="text-xl font-bold text-white">63</span>
                                <div className="absolute inset-[-8px] rounded-full border border-dashed border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-emerald-100">Growth Stage Verified</h4>
                                <p className="text-xs text-emerald-200/60 mt-1 font-light">Index score indicates solid retention base.</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-mono uppercase text-emerald-400/80 tracking-widest">Trajectory</span>
                            <p className="text-sm font-mono text-white mt-1">+4pt <span className="text-emerald-500">↑</span></p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        {PMF_BREAKDOWN.map((metric) => (
                            <div key={metric.label}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-medium text-neutral-300">{metric.label}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-neutral-600">b:{metric.benchmark}</span>
                                        <span className={cn("text-xs font-mono font-bold", metric.status === "stable" ? "text-white" : "text-rose-400")}>{metric.score}</span>
                                    </div>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${metric.score}%` }} transition={{ duration: 1, ease: "easeOut" }}
                                        className={cn("h-full rounded-full", metric.status === "stable" ? "bg-emerald-400/80" : "bg-rose-500/80")}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Corrective Action based on PMF */}
                    <div className="mt-auto pt-6 border-t border-white/[0.04]">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Structural Weakness Detected
                        </h3>
                        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                            <h4 className="text-sm font-medium text-white mb-2">Referral Engine Stalled (18%)</h4>
                            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
                                Users are retaining but not referring. The current incentive structure ($10 credit) lacks viral coefficient.
                            </p>
                            <div className="flex items-center justify-between border-t border-rose-500/10 pt-3">
                                <div className="flex items-center gap-2">
                                    <Hexagon className="w-4 h-4 text-rose-400" />
                                    <span className="text-[10px] uppercase font-mono text-rose-300 tracking-wider">Agent Ready</span>
                                </div>
                                <button className="text-[10px] uppercase font-mono font-bold text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded transition-colors">
                                    Draft Double-Sided Incentive
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

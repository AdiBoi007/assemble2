"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Zap, Crosshair, Target, CheckCircle2, ChevronRight, Activity, Network, ShieldAlert, ArrowRight, RefreshCw, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const LEADS = [
    { name: "Sarah J.", company: "Acme AI", title: "Founder & CEO", score: 98 },
    { name: "Michael T.", company: "Nexus Health", title: "Co-Founder", score: 94 },
    { name: "Elena R.", company: "Ventures.io", title: "Managing Founder", score: 89 },
    { name: "David K.", company: "StreamSync", title: "Founder", score: 88 },
]

export function ClientFinder() {
    const [executing, setExecuting] = useState(false)
    const [executed, setExecuted] = useState(false)

    const handleExecute = () => {
        setExecuting(true)
        setTimeout(() => {
            setExecuting(false)
            setExecuted(true)
        }, 2500)
    }

    return (
        <div className="h-full flex flex-col bg-[#020202] text-white font-sans overflow-hidden relative isolate">

            {/* Intense Ambient Glow for Pipeline Flow */}
            <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none -z-10" />

            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.04] shrink-0 flex justify-between items-start z-20 backdrop-blur-3xl bg-[#020202]/80">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shadow-[inset_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center">
                            <Crosshair className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-white">
                            Autonomous Outbound Engine
                        </h2>
                    </div>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        <strong className="text-cyan-400 font-medium mr-2">System Status:</strong>
                        Scrape completed: 24 new target profiles acquired. Pipeline velocity warning: Severe <span className="text-rose-400 font-mono">62% drop off</span> between 'Contacted' and 'Replied' stages. Agent recommends immediate sequence overhaul before injecting new leads.
                    </p>
                </div>

                <div className="flex gap-4 text-right shrink-0">
                    <div className="bg-[#050505] border border-white/[0.05] rounded-xl p-3 shadow-xl">
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5">Acquisition Target</p>
                        <span className="text-xl font-light text-white">20/50</span>
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-mono text-cyan-400">
                            <Activity className="w-3 h-3" /> Live
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">

                {/* LEFT: Discovery Terminal */}
                <div className="lg:w-[45%] h-full flex flex-col border-r border-white/[0.04] bg-[#020202] overflow-y-auto custom-scrollbar">

                    <div className="p-8 pb-6">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-cyan-400" /> Discovery Vectors
                        </h3>

                        <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-5 backdrop-blur-xl shrink-0">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-neutral-500 font-mono mb-2 uppercase">Core Query</p>
                                    <div className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-cyan-300 font-mono flex items-center gap-2">
                                        <span className="text-cyan-500">{">"}</span> "Founders in Sydney who raised pre-seed"
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] text-neutral-500 font-mono mb-2 uppercase">Positive Signals</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] font-mono">+ "Hiring Engineers"</span>
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] font-mono">+ LinkedIn &lt; 3d</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] text-neutral-500 font-mono mb-2 uppercase">Negative Signals</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md text-[10px] font-mono">- "Agency"</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Scraped Targets (24)</h3>
                            <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-mono font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Awaiting Injection</span>
                        </div>

                        <div className="space-y-2 flex-1">
                            {LEADS.map((lead, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent border border-white/10 flex items-center justify-center shrink-0 text-[10px] font-mono text-cyan-200">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{lead.name}</p>
                                            <p className="text-[10px] text-neutral-500 font-mono">{lead.title} @ {lead.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] text-neutral-600 mb-0.5 uppercase tracking-widest font-mono">Agent Score</span>
                                        <span className={cn(
                                            "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border",
                                            lead.score > 90 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        )}>{lead.score} / 100</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT: Pipeline Stream & Agent Execution */}
                <div className="lg:w-[55%] h-full bg-[#030303] flex flex-col relative isolate overflow-y-auto custom-scrollbar shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]">

                    <div className="p-8 pb-4">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Network className="w-3.5 h-3.5 text-indigo-400" /> Funnel Telemetry Map
                        </h3>

                        {/* Geometric Node Flow (Mimicking Mind Map) */}
                        <div className="h-[200px] w-full relative flex items-center justify-center border border-white/[0.04] bg-[#020202] rounded-2xl p-6">
                            <div className="flex items-center w-full justify-between relative z-10">

                                {/* Connecting Lines */}
                                <div className="absolute top-8 left-[10%] right-[10%] h-px bg-white/[0.05] -z-10" />

                                {/* Nodes */}
                                <FlowStage label="Discovered" val="120" />
                                <FlowStage label="Contacted" val="85" isNode />

                                <div className="flex flex-col items-center relative">
                                    <div className={cn(
                                        "w-16 h-16 rounded-full border flex items-center justify-center mb-3 bg-[#050505] transition-colors relative",
                                        executed ? "border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.1)]" : "border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                                    )}>
                                        {executed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Network className="w-5 h-5 text-rose-400" strokeWidth={1.5} />}
                                        {!executed && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
                                        )}
                                    </div>
                                    <p className={cn("text-xl font-light leading-none mb-1", executed ? "text-emerald-400" : "text-rose-400")}>{executed ? "51" : "32"}</p>
                                    <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase">Replied</p>
                                </div>

                                <FlowStage label="Meeting" val={executed ? "28" : "14"} />
                                <FlowStage label="Closed" val={executed ? "16" : "8"} />

                            </div>
                        </div>
                    </div>

                    {/* Agent Action Resolution */}
                    <div className="flex-1 p-8 pt-4 flex flex-col">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-amber-400" /> Remediation Protocol
                        </h3>

                        {/* Warning Box */}
                        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 mb-6 flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-sm font-semibold text-rose-200 mb-1">Critical Follow-up Friction</h4>
                                <p className="text-xs text-rose-200/70 leading-relaxed font-light">
                                    The "Follow-up 2" email template is converting at 1.4% (Industry baseline: 8%). Injecting the 24 new leads into this sequence will result in catastrophic burn rate.
                                </p>
                            </div>
                        </div>

                        {/* The Action Card */}
                        <div className={cn(
                            "flex-1 rounded-3xl border p-6 transition-all duration-500 flex flex-col relative isolate overflow-hidden",
                            executed ? "bg-emerald-950/10 border-emerald-500/30 shadow-[0_0_40px_rgba(52,211,153,0.1)]" :
                                "bg-white/[0.01] border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent hover:border-indigo-500/40"
                        )}>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                                        executed ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                                            "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                    )}>
                                        {executed ? <CheckCircle2 className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                                    </div>
                                    <h4 className="text-base font-medium text-white">Generate 'Value-Inject' Sequence</h4>
                                </div>
                            </div>

                            <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                                Agent will completely rewrite the outbound sequence focusing on specific founder pain-points mapped to the identified "Hiring Engineers" intent signal, applying this to the 24 new leads.
                            </p>

                            {/* Execute Button */}
                            <div className="mt-auto">
                                <AnimatePresence mode="wait">
                                    {!executed ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <button
                                                onClick={handleExecute} disabled={executing}
                                                className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-neutral-200 flex items-center justify-center gap-3 relative overflow-hidden group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
                                                {executing ? (
                                                    <>
                                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="w-4 h-4 text-neutral-500" /></motion.div>
                                                        Rewriting Sequence & Dispatching...
                                                    </>
                                                ) : (
                                                    <>Rewrite & Inject Pipeline <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                                )}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-[#0a0a0a] border border-emerald-500/20">
                                            <div className="flex gap-4 items-start">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="text-sm font-medium text-emerald-300 mb-1">Pipeline Fortified & Leads Injected</h4>
                                                    <p className="text-xs text-emerald-200/60 font-light leading-relaxed">
                                                        Sequence applied to CRM. 24 new leads dispatched. Projected pipeline velocity restored to 9.2% conversion.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

function FlowStage({ label, val, isNode }: { label: string, val: string, isNode?: boolean }) {
    return (
        <div className="flex flex-col items-center bg-[#020202]">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-3 bg-[#050505]">
                <Network className="w-5 h-5 text-neutral-500" strokeWidth={1} />
            </div>
            <p className="text-xl font-light leading-none mb-1 text-white">{val}</p>
            <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase">{label}</p>
        </div>
    )
}

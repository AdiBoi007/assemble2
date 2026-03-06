"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Target, Zap, TrendingUp, AlertCircle, ArrowRight, RefreshCw, CheckCircle2, X, Plus, Hash } from "lucide-react"
import { cn } from "@/lib/utils"

const INTENT_SIGNALS = [
    { id: 1, user: "AlexD", platform: "X", intent: "Seeking CRM alternative", text: "Why is Salesforce so bloated? I just need a clean CRM for my 10-person agency.", time: "12m ago", score: 96 },
    { id: 2, user: "SarahT_UX", platform: "LinkedIn", intent: "Hiring designers", text: "We are aggressively expanding our product team in London. DMs open.", time: "45m ago", score: 88 },
    { id: 3, user: "StartupFounder7", platform: "X", intent: "Frustrated with API costs", text: "OpenAI API bills are getting out of hand this month. Any alternatives?", time: "1h ago", score: 82 },
    { id: 4, user: "GrowthMarketer", platform: "X", intent: "Lead gen advice", text: "Cold email is dead. What's working for B2B SaaS outbound in 2026?", time: "3h ago", score: 75 },
]

export function SocialMediaAgent() {
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

            {/* Ambient Radial Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] pointer-events-none -z-10" />

            {/* Header Layer */}
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.04] shrink-0 flex justify-between items-start z-20 backdrop-blur-3xl bg-[#020202]/80">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 shadow-[inset_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-fuchsia-400" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-white">
                            Social Media Distribution
                        </h2>
                    </div>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        <strong className="text-fuchsia-400 font-medium mr-2">Brand Telemetry:</strong>
                        Global sentiment is positive (+12% WoW). The agent has detected <span className="text-emerald-400 font-mono">14 high-intent buying signals</span> across X and LinkedIn in the last 2 hours based on your configured keywords. Auto-drafts are holding for executive approval.
                    </p>
                </div>

                <div className="flex gap-4 text-right shrink-0">
                    <div className="bg-[#050505] border border-white/[0.05] rounded-xl p-3 shadow-xl flex flex-col items-end">
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><TrendingUp className="w-3 h-3" /> Live Impressions</p>
                        <span className="text-xl font-light text-white">42.8k</span>
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            +14% 24h
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Workspace Split */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">

                {/* LEFT: The Listening Radar */}
                <div className="lg:w-[45%] h-full flex flex-col border-r border-white/[0.04] bg-[#020202] overflow-y-auto custom-scrollbar">

                    <div className="p-8 pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                <Target className="w-3.5 h-3.5 text-fuchsia-400" /> Signal Radar
                            </h3>
                            <span className="flex items-center gap-2 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 font-mono uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Scanning Live
                            </span>
                        </div>

                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {["crm sucks", "hiring designers", "openai api cost", "b2b outreach"].map(kw => (
                                <span key={kw} className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[10px] text-neutral-400 font-mono flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                                    <Hash className="w-3 h-3 text-fuchsia-500" /> {kw}
                                </span>
                            ))}
                            <button className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center hover:bg-fuchsia-500/20 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {INTENT_SIGNALS.map((signal, i) => (
                                <div key={signal.id} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-all relative overflow-hidden group">

                                    {/* Scanline effect on hover */}
                                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-fuchsia-500/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_1.5s_ease-in-out_infinite]" />

                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-white">@{signal.user}</span>
                                            <span className="text-[10px] font-mono text-neutral-500 px-1.5 py-0.5 rounded border border-white/5 bg-white/5">{signal.platform}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-neutral-600 font-mono">{signal.time}</span>
                                            <span className="text-[10px] font-mono font-bold text-emerald-400 mt-1">{signal.score} Match</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-neutral-300 font-light leading-relaxed mb-3">"{signal.text}"</p>

                                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-fuchsia-400">
                                        <Zap className="w-3 h-3" /> Auto-Drafting Reply...
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Agent Execution Workspace */}
                <div className="lg:w-[55%] h-full bg-[#030303] flex flex-col p-8 relative isolate overflow-y-auto custom-scrollbar shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]">

                    <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> Dispatch Queue (Pending Executive Approval)
                    </h3>

                    <div className="flex-1 flex flex-col gap-6">

                        {/* Draft Card 1 */}
                        <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">Native Thread Draft</span>
                                <button className="text-neutral-500 hover:text-white"><X className="w-4 h-4" /></button>
                            </div>
                            <p className="text-sm text-white leading-relaxed font-light mb-4">
                                "Cold email isn't dead. You're just sending absolute garbage to people who don't care. Here is the exact 3-step outbound framework we used to scale our pipeline to $1.2M this quarter. 🧵👇"
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-neutral-500 border border-white/10 rounded px-2 py-1 bg-white/5">Targeting: "b2b outreach" intent</span>
                            </div>
                        </div>

                        {/* Draft Card 2 (Reply) */}
                        <div className="p-5 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400">Direct Reply to @AlexD</span>
                                <button className="text-neutral-500 hover:text-white"><X className="w-4 h-4" /></button>
                            </div>
                            <p className="text-sm text-white leading-relaxed font-light mb-4">
                                "Hey Alex, I feel that. We ripped out Salesforce last year for that exact reason. We built a hyper-lightweight setup instead. Happy to share the stack if you want the blueprint."
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/20 rounded px-2 py-1 bg-emerald-500/10">Estimated Conversion: High</span>
                            </div>
                        </div>

                    </div>

                    {/* Execution Bar */}
                    <div className="mt-auto pt-6 border-t border-white/[0.04]">
                        <AnimatePresence mode="wait">
                            {!executed ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <button
                                        onClick={handleExecute} disabled={executing}
                                        className="w-full h-14 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-neutral-200 flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
                                        {executing ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="w-4 h-4 text-neutral-500" /></motion.div>
                                                Pushing Content Across Networks...
                                            </>
                                        ) : (
                                            <>Approve & Dispatch All (2 items) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-xl bg-[#0a0a0a] border border-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
                                    <div className="flex gap-4 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-emerald-300 mb-1">Payload Dispatched Successfully</h4>
                                            <p className="text-xs text-emerald-200/60 font-light leading-relaxed">
                                                Agent has published the thread natively and sent the tactical reply. Sentiment monitoring engaged for responses.
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
    )
}

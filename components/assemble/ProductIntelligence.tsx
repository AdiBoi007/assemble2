"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, Target, ArrowRight, Zap, CheckCircle2, ChevronRight, Activity, Network, PenLine, FileText, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const ROOT_CAUSES = [
    { id: 1, title: "Email Step 3 dead", match: "85%", impact: "High", metric: "Open Rate", value: "1.2%" },
    { id: 2, title: "Landing page bounce rate up", match: "60%", impact: "Medium", metric: "Bounce", value: "18%" },
    { id: 3, title: "No new traffic source", match: "45%", impact: "Medium", metric: "Traffic", value: "Flat" },
]

export function ProductIntelligence() {
    const [promptContent, setPromptContent] = useState("")
    const [agentGenerating, setAgentGenerating] = useState(false)
    const [showFixPath, setShowFixPath] = useState(false)
    const [executing, setExecuting] = useState(false)
    const [executed, setExecuted] = useState(false)

    const handleGeneratePath = (e: React.FormEvent) => {
        e.preventDefault()
        if (!promptContent.trim()) return
        setAgentGenerating(true)
        setTimeout(() => {
            setAgentGenerating(false)
            setShowFixPath(true)
        }, 1500)
    }

    const handleExecute = () => {
        setExecuting(true)
        setTimeout(() => {
            setExecuting(false)
            setExecuted(true)
        }, 2000)
    }

    return (
        <div className="h-full flex flex-col bg-[#050505] text-white font-sans overflow-hidden">

            {/* SRS Header (Deep-dive screen opens. AI has pre-loaded...) */}
            <div className="px-8 pt-6 pb-4 border-b border-white/[0.04] shrink-0 flex justify-between items-start z-20">
                <div className="max-w-3xl flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-1">
                        <Activity className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-medium tracking-tight mb-2">
                            SaaS Tool B
                        </h2>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed">
                            <strong className="text-white font-medium mr-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded text-xs select-none">AI Summary</strong>
                            Sales dropped 41% in 5 days. Root cause analysis complete.
                        </p>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5">Health Score</p>
                    <span className="text-2xl font-light text-rose-400">23<span className="text-sm text-rose-500/50">/100</span></span>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">

                {/* LEFT COLUMN: Mind Map & Root Causes */}
                <div className="lg:w-1/2 h-full flex flex-col border-r border-white/[0.04] bg-[#020202]/40">

                    {/* Extremely Minimal Web3 Mind Map (From User Screenshot) */}
                    <div className="h-[280px] w-full relative flex items-center justify-center border-b border-white/[0.04] bg-[#020202]">

                        <div className="flex items-center gap-10">
                            {/* Traffic Node */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center mb-3 transition-colors">
                                    <Network className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white mb-3" />
                                <p className="text-[22px] font-light leading-none mb-1 text-white">24.5k</p>
                                <p className="text-[10px] text-neutral-500 font-mono tracking-wider">Traffic</p>
                            </div>

                            {/* Engagement Node */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center mb-3">
                                    <Network className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white mb-3" />
                                <p className="text-[22px] font-light leading-none mb-1 text-white">4.2k</p>
                                <p className="text-[10px] text-neutral-500 font-mono tracking-wider">Engagement</p>
                            </div>

                            {/* Email Seq 3 (Critical Node) */}
                            <div className="flex flex-col items-center relative">
                                <div className={cn(
                                    "w-16 h-16 rounded-full border flex items-center justify-center mb-3 transition-colors",
                                    executed ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                                )}>
                                    <Network className={cn("w-5 h-5", executed ? "text-emerald-400" : "text-rose-400")} strokeWidth={1.5} />
                                </div>

                                {/* The dropped red dot visualization from screenshot */}
                                <div className="relative mb-3 flex justify-center w-full">
                                    <div className={cn("w-1.5 h-1.5 rounded-full", executed ? "bg-emerald-400" : "bg-transparent")} />
                                    {!executed && (
                                        <>
                                            <div className="absolute top-0 w-px h-6 bg-rose-500/50" />
                                            <div className="absolute top-6 ml-2 w-1.5 h-1.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
                                        </>
                                    )}
                                </div>

                                <p className={cn("text-[22px] font-light leading-none mb-1", executed ? "text-emerald-400" : "text-rose-400 font-medium")}>
                                    {executed ? "19.4%" : "12"}
                                </p>
                                <p className="text-[10px] text-neutral-500 font-mono tracking-wider">Email Seq 3</p>
                            </div>

                            {/* Closed Node */}
                            <div className="flex flex-col items-center">
                                <div className={cn(
                                    "w-16 h-16 rounded-full border flex items-center justify-center mb-3",
                                    executed ? "border-emerald-500/20 bg-emerald-500/5" : "border-rose-500/10 bg-rose-500/[0.02]"
                                )}>
                                    <Network className={cn("w-5 h-5", executed ? "text-emerald-400" : "text-rose-400/50")} strokeWidth={1.5} />
                                </div>
                                <div className={cn("w-1.5 h-1.5 rounded-full mb-3", executed ? "bg-emerald-400" : "bg-transparent")} />
                                <p className={cn("text-[22px] font-light leading-none mb-1", executed ? "text-emerald-400" : "text-rose-400/80")}>
                                    {executed ? "10" : "4"}
                                </p>
                                <p className="text-[10px] text-neutral-500 font-mono tracking-wider">Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Root Cause Analysis (F3.2) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">Ranked Root Causes</h3>
                        <div className="space-y-2">
                            {ROOT_CAUSES.map((cause, i) => (
                                <div key={cause.id} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-neutral-500">#{i + 1}</span>
                                        <div>
                                            <h4 className={cn("text-sm font-medium", i === 0 ? "text-rose-200" : "text-neutral-300")}>{cause.title}</h4>
                                            <p className="text-[10px] text-neutral-500 font-mono uppercase mt-0.5">({cause.metric}: {cause.value})</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-neutral-400">{cause.impact} Impact</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Execution & Agent Generation (F3.3) */}
                <div className="lg:w-1/2 h-full bg-[#050505] flex flex-col relative">

                    <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">

                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 border-b border-white/[0.04] pb-4">
                            Agent Custom Resolution
                        </h3>

                        {/* Step 5: User types in prompt */}
                        {!executed && !showFixPath && (
                            <form onSubmit={handleGeneratePath} className="space-y-4">
                                <div className="relative">
                                    <textarea
                                        value={promptContent}
                                        onChange={(e) => setPromptContent(e.target.value)}
                                        placeholder="Type in prompt e.g: 'Fix the email sequence first and then optimize the landing page'"
                                        className="w-full h-32 bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.04] placeholder:text-neutral-600 font-light"
                                        disabled={agentGenerating}
                                    />
                                    {agentGenerating && (
                                        <div className="absolute inset-0 bg-[#050505]/50 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-indigo-400 animate-pulse" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit" disabled={!promptContent.trim() || agentGenerating}
                                    className="bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Generate Fix Path
                                </button>
                            </form>
                        )}

                        {/* Step 6: Agent presents Path + Previews */}
                        {showFixPath && !executed && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                                <div className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap className="w-4 h-4 text-indigo-400" />
                                        <h4 className="text-sm font-medium text-white">Generated Fix Path</h4>
                                    </div>
                                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                        Rewrite email step 3 subject line (3 variants) + update landing page H1 copy.
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        {/* Preview 1: Email */}
                                        <div className="p-3 border border-white/[0.06] bg-[#030303] rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MailIcon className="w-3.5 h-3.5 text-neutral-500" />
                                                <span className="text-[10px] font-mono text-neutral-500 uppercase">Email 3 Variants (3)</span>
                                            </div>
                                            <div className="space-y-2 text-xs text-neutral-300">
                                                <p className="truncate pl-2 border-l-2 border-indigo-500/30">1. "The architecture scaling lie..."</p>
                                                <p className="truncate pl-2 border-l-2 border-indigo-500/30">2. "How we broke the mold on..."</p>
                                            </div>
                                        </div>
                                        {/* Preview 2: Landing Page */}
                                        <div className="p-3 border border-white/[0.06] bg-[#030303] rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="w-3.5 h-3.5 text-neutral-500" />
                                                <span className="text-[10px] font-mono text-neutral-500 uppercase">Landing Page CSS/H1</span>
                                            </div>
                                            <p className="text-xs text-neutral-300 pl-2 border-l-2 border-indigo-500/30">
                                                "Build Faster. Break Nothing. The definitive guide to..."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        )}

                        {/* Step 9 & 10: Recovery in Progress & Final Telemetry */}
                        {executed && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

                                <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex flex-col items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-emerald-100 flex items-center gap-2">
                                            <span className="bg-emerald-500 text-black text-[9px] uppercase px-1.5 py-0.5 rounded font-bold">48h Later</span>
                                            Telemetry Active
                                        </h4>
                                        <p className="text-xs text-emerald-200/70 mt-1.5">Agent executed CMS update and mapped Email sequences.</p>
                                    </div>
                                </div>

                                <div className="p-5 border border-white/[0.06] rounded-xl bg-white/[0.01]">
                                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">Post-Fix Telemetry (Co-Worker Report)</p>
                                    <p className="text-sm font-light leading-relaxed text-neutral-300">
                                        Email step 3 now <span className="text-emerald-400 font-medium">19.4% open rate</span> (was 1.2%).
                                        <br />6 new conversions captured.
                                        <br /><br />
                                        Revenue recovered: <span className="text-emerald-400 font-medium">$294</span>.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                    </div>

                    {/* Action Footer (Step 7: User clicks approve & execute) */}
                    <div className="p-6 border-t border-white/[0.04] bg-[#050505] shrink-0">
                        {!executed && showFixPath && (
                            <button
                                onClick={handleExecute} disabled={executing}
                                className="w-full h-12 rounded-xl bg-indigo-600 text-white font-semibold text-sm transition-all hover:bg-indigo-500 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                            >
                                {executing ? (
                                    <>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="w-4 h-4 text-white/70" /></motion.div>
                                        Updating CMS & Sequences...
                                    </>
                                ) : (
                                    <>Approve & Execute <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

function MailIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
}

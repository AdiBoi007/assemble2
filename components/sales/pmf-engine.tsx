"use client"

import React from "react"
import { motion } from "framer-motion"
import { Shield, Target, MessageSquare, DollarSign, Rocket, CheckCircle2 } from "lucide-react"

export interface PMFData {
    score: number
    confidence: string
    targetAudiences: string[]
    acquisitionChannels: { name: string; validation: string }[]
    messagingHooks: string[]
    pricingBands: { tier: string; price: string; description: string }[]
    gtmPlan: { phase: string; title: string; steps: string[] }[]
}

export function PMFEngine({ data }: { data: PMFData }) {
    return (
        <motion.div
            key="pmf"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Validation Engine</h2>
                        <p className="text-[11px] text-zinc-300/80 font-mono uppercase tracking-widest mt-0.5">PMF Simulation Active</p>
                    </div>
                </div>
                <div className="text-right flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-3xl font-black text-white">{data.score}<span className="text-zinc-300 text-xl">/100</span></span>
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">PMF Score</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-3 pb-8">
                {/* Audiences & Hooks Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-4 h-4 text-white/50" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Target Audiences</h3>
                        </div>
                        <ul className="space-y-3">
                            {data.targetAudiences.map((aud, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300/70 mt-0.5 shrink-0" />
                                    <span className="text-xs text-white/80 font-medium leading-relaxed">{aud}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="w-4 h-4 text-white/50" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Messaging Hooks</h3>
                        </div>
                        <ul className="space-y-3">
                            {data.messagingHooks.map((hook, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-xs font-bold text-zinc-300 mt-0.5 shrink-0">0{i + 1}.</span>
                                    <span className="text-xs text-white/80 italic leading-relaxed">"{hook}"</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Channels */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Validated Acquisition Channels</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {data.acquisitionChannels.map((ch, i) => (
                            <div key={i} className="p-3 rounded-xl bg-black border border-white/10">
                                <p className="text-[11px] font-bold text-zinc-300 mb-1.5">{ch.name}</p>
                                <p className="text-[10px] text-white/50 leading-relaxed">{ch.validation}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                        <DollarSign className="w-4 h-4 text-white/50" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Pricing Bounds</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 relative z-10">
                        {data.pricingBands.map((band, i) => (
                            <div key={i} className="flex flex-col border-l border-white/10 pl-4">
                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider mb-1">{band.tier}</span>
                                <span className="text-lg font-black text-white tracking-tight mb-1">{band.price}</span>
                                <span className="text-[10px] text-white/60 leading-relaxed">{band.description}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 30-Day GTM */}
                <div className="p-5 rounded-2xl bg-zinc-800/[0.02] border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-5">
                        <Rocket className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">30-Day Execution GTM</h3>
                    </div>
                    <div className="space-y-6">
                        {data.gtmPlan.map((phase, i) => (
                            <div key={i} className="relative">
                                {/* Timeline Line */}
                                {i !== data.gtmPlan.length - 1 && <div className="absolute left-1.5 top-6 bottom-[-1.5rem] w-[1px] bg-white/10" />}
                                <div className="flex gap-4">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] mt-1 shrink-0 relative z-10" />
                                    <div>
                                        <div className="flex flex-wrap items-baseline gap-2 mb-2">
                                            <span className="text-[10px] font-mono text-zinc-300/80 bg-zinc-800/10 px-1.5 py-0.5 rounded">{phase.phase}</span>
                                            <span className="text-sm font-bold text-white">{phase.title}</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {phase.steps.map((step, j) => (
                                                <div key={j} className="p-2.5 rounded-lg bg-black border border-white/[0.08] text-[10px] text-white/70 font-medium">
                                                    {step}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

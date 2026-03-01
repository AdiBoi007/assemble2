"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Zap, Filter, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LeadScoringData {
    totalLeadsScored: number
    topPercentile: number
    conversionProbability: string
    rankedLeads: {
        name: string
        role: string
        company: string
        score: number
        triggers: string[]
    }[]
}

export function LeadScoring({ data }: { data: LeadScoringData }) {
    return (
        <motion.div
            key="lead-scoring"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Target className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Lead Scoring & Prioritization</h2>
                        <div className="text-[11px] font-mono text-zinc-300/80 uppercase tracking-widest mt-0.5">Machine Learning Model Active</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 flex flex-col items-end">
                    Total Scored <span className="text-white text-base">{data.totalLeadsScored.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-4">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-800/5 border border-amber-500/20 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-800/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <Filter className="w-4 h-4 text-zinc-300" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Top Percentile Extracted</span>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight relative z-10">Top {data.topPercentile}%</span>
                        <div className="text-[11px] text-white/40 mt-1 relative z-10">Focusing outbound efforts only on highest intent.</div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-800 border border-white/10 flex flex-col justify-between shadow-inner relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-[30px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <Zap className="w-4 h-4 text-zinc-300" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Conversion Probability</span>
                        </div>
                        <span className="text-3xl font-black text-zinc-300 tracking-tight relative z-10">{data.conversionProbability}</span>
                        <div className="text-[11px] text-white/60 mt-1 relative z-10">Likelihood to book meeting on next touch point.</div>
                    </div>
                </div>

                {/* Ranked Leads List */}
                <div className="p-5 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50">Hot Leads Ready for Execution</h3>
                        <button className="text-[10px] font-bold tracking-widest uppercase text-zinc-300 hover:text-white transition-colors flex items-center gap-1">
                            Deploy Agents <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.rankedLeads.map((lead, i) => (
                            <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/30 transition-colors group gap-3 relative overflow-hidden">
                                {i === 0 && (
                                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                                )}

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center justify-center shrink-0">
                                            <div className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-black text-lg bg-zinc-800"
                                                style={{ borderColor: lead.score > 90 ? '#f59e0b' : lead.score > 80 ? '#6366f1' : '#3f3f46', color: lead.score > 90 ? '#f59e0b' : lead.score > 80 ? '#818cf8' : '#a1a1aa' }}>
                                                {lead.score}
                                            </div>
                                            <span className="text-[8px] uppercase tracking-widest font-bold text-white/40 mt-1">Score</span>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-white mb-0.5">{lead.name}</div>
                                            <div className="text-[11px] text-white/50 font-medium">{lead.role} @ <span className="text-white/80">{lead.company}</span></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap md:flex-col md:items-end gap-1.5 md:gap-1 pl-16 md:pl-0">
                                        {lead.triggers.map((trigger, j) => (
                                            <span key={j} className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border bg-white/10 border-white/20 text-zinc-300">
                                                {trigger}
                                            </span>
                                        ))}
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

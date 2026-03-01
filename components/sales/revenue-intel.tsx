"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target } from "lucide-react"

interface RevenueData {
    currentMRR: string
    mrrDelta: string
    churnRisk: string
    churnNote: string
    pipelineCounts: Record<string, number>
}

export function RevenueIntel({ data }: { data: RevenueData }) {
    const pipelineStages = Object.entries(data.pipelineCounts)

    return (
        <motion.div
            key="pipeline"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <Target className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Live Pipeline & Revenue</h2>
                        <p className="text-[11px] text-zinc-300/80 font-mono uppercase tracking-widest mt-0.5">Stripe Metrics Synced</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-6 rounded-2xl bg-zinc-800/5 border border-[#FF6B00]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-300/70 mb-2 relative z-10">Current MRR</div>
                    <div className="text-4xl font-black tracking-tighter text-white mb-2 relative z-10">{data.currentMRR}</div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-300 relative z-10 bg-white/10 inline-block px-2 py-1 rounded">{data.mrrDelta}</div>
                </div>
                <div className="p-6 rounded-2xl bg-black border border-white/10 relative overflow-hidden shadow-inner">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">Algorithm Flagged Churn Risk</div>
                    <div className="text-4xl font-black tracking-tighter text-white mb-2">{data.churnRisk}</div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-stone-300 bg-white/10 inline-block px-2 py-1 rounded">{data.churnNote}</div>
                </div>
            </div>

            {/* Pipeline Kanban */}
            <div className="flex gap-3 mt-2 h-[300px]">
                {pipelineStages.map(([stage, count], i) => (
                    <div key={stage} className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex flex-col group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center justify-between">
                            {stage}
                            <span className="w-5 h-5 rounded flex items-center justify-center bg-black border border-white/10 text-zinc-300">{count}</span>
                        </div>
                        <div className="flex-1 space-y-2.5 overflow-y-auto custom-scrollbar pr-1">
                            {[...Array(Math.min(3, count))].map((_, j) => (
                                <div key={j} className="h-12 rounded-xl bg-black border border-white/5 w-full hover:border-[#FF6B00]/30 transition-colors shadow-inner flex items-center px-3" />
                            ))}
                            {count > 3 && (
                                <div className="text-[10px] font-bold text-center text-white/30 pt-2 uppercase tracking-widest border-t border-white/5 mt-2">+ {count - 3} More Active</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

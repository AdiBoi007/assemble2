"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, TrendingDown, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PricingData {
    analysisType: string
    currentACV: string
    optimizedACV: string
    winRateImpact: string
    revenueUplift: string
    recommendations: {
        tier: string
        change: string
        logic: string
    }[]
    confidence: string
}

export function PricingOptimizer({ data }: { data: PricingData }) {
    return (
        <motion.div
            key="pricing"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <Calculator className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Pricing Optimizer</h2>
                        <div className="text-[11px] font-mono text-zinc-300/80 uppercase tracking-widest mt-0.5">{data.analysisType}</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-zinc-300 flex flex-col items-end">
                    Confidence <span className="text-white text-base">{data.confidence}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-6">

                {/* Core Impacts */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingDown className="w-4 h-4 text-neutral-400" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Simulated Win Rate Impact</span>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight">{data.winRateImpact}</span>
                        <div className="text-[10px] mt-1 text-white/40 max-w-[80%]">Temporary conversion dip expected in Days 1-14 before neutralizing.</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-800/5 border border-[#FF6B00]/20 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <TrendingUp className="w-4 h-4 text-zinc-300" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Projected Revenue Uplift</span>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight relative z-10">{data.revenueUplift}</span>
                        <div className="flex items-center gap-3 mt-1 relative z-10">
                            <span className="text-[12px] font-medium text-white/40 line-through">{data.currentACV} ACV</span>
                            <span className="text-[12px] font-bold text-zinc-300 flex items-center gap-1">
                                {data.optimizedACV} ACV <ArrowRightIcon className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Intelligent Adjustments */}
                <div className="p-5 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-5">Recommended Tier Adjustments</h3>

                    <div className="space-y-3">
                        {data.recommendations.map((rec, i) => (
                            <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF6B00]/30 transition-colors gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                        {rec.tier} Tier
                                    </div>
                                    <div className={cn(
                                        "text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border",
                                        rec.change === "Hold" ? "bg-white/5 border-white/10 text-white/60" :
                                            rec.change.includes("Increase") ? "bg-zinc-800/10 border-[#FF6B00]/20 text-zinc-300" :
                                                "bg-white/10 border-white/20 text-zinc-300"
                                    )}>
                                        {rec.change}
                                    </div>
                                </div>
                                <div className="pl-4">
                                    <div className="text-[11px] text-white/80 bg-white/5 p-2 rounded leading-relaxed border-l-2 border-white/10">
                                        <span className="font-bold text-white/40 mr-1 uppercase text-[9px] tracking-widest">Logic:</span>
                                        {rec.logic}
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

function ArrowRightIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}

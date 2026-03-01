"use client"

import React from "react"
import { motion } from "framer-motion"
import { Wallet, TrendingUp, PieChart, ArrowUpRight } from "lucide-react"

export interface ForecastData {
    mrrTarget: string
    currentMRR: string
    projections: { day30: string; day60: string; day90: string }
    budgetSplits: { channel: string; allocation: string; amount: string; roas: string }[]
    runwayRemaining: string
}

export function BudgetAllocator({ data }: { data: ForecastData }) {
    return (
        <motion.div
            key="budget"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            <div className="mb-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <Wallet className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Forecast & Allocation</h2>
                        <div className="text-[11px] font-mono text-zinc-300/80 uppercase tracking-widest mt-0.5">Capital Efficiency Active</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 flex flex-col items-end">
                    Runway <span className="text-zinc-300">{data.runwayRemaining}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-4">
                {/* Top Level Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-800/5 border border-[#FF6B00]/20 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <TrendingUp className="w-4 h-4 text-zinc-300" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Current Trajectory</span>
                        </div>
                        <span className="text-3xl font-black text-white relative z-10 tracking-tight">{data.currentMRR} <span className="text-white/30 text-base font-medium">/mo</span></span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black border border-white/10 flex flex-col justify-between shadow-inner">
                        <div className="flex items-center gap-2 mb-4">
                            <TargetIcon className="w-4 h-4 text-white/40" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">EOM Target</span>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight">{data.mrrTarget} <span className="text-white/30 text-base font-medium">/mo</span></span>
                    </div>
                </div>

                {/* 90-Day Projections */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4">Neural 90-Day Forecast</h3>
                    <div className="flex justify-between items-end h-24 mb-2">
                        {/* Day 30 */}
                        <div className="flex flex-col items-center w-1/3">
                            <div className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Day 30</div>
                            <div className="w-full relative px-2">
                                <div className="absolute bottom-0 w-[calc(100%-1rem)] h-8 bg-gradient-to-t from-[#FF6B00]/20 to-[#FF6B00]/10 rounded-t-sm" />
                                <div className="absolute bottom-8 w-[calc(100%-1rem)] h-[1px] bg-zinc-800/50" />
                            </div>
                            <div className="text-sm font-bold text-zinc-300 mt-2">{data.projections.day30}</div>
                        </div>
                        {/* Day 60 */}
                        <div className="flex flex-col items-center w-1/3">
                            <div className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2">Day 60</div>
                            <div className="w-full relative px-2">
                                <div className="absolute bottom-0 w-[calc(100%-1rem)] h-12 bg-gradient-to-t from-[#FF6B00]/30 to-[#FF6B00]/10 rounded-t-sm" />
                                <div className="absolute bottom-12 w-[calc(100%-1rem)] h-[1px] bg-zinc-800/60" />
                            </div>
                            <div className="text-sm font-bold text-zinc-300 mt-2">{data.projections.day60}</div>
                        </div>
                        {/* Day 90 */}
                        <div className="flex flex-col items-center w-1/3">
                            <div className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">Day 90</div>
                            <div className="w-full relative px-2">
                                <div className="absolute bottom-0 w-[calc(100%-1rem)] h-16 bg-gradient-to-t from-[#FF6B00]/40 to-[#FF6B00]/20 rounded-t-sm shadow-[0_0_15px_rgba(255,107,0,0.2)]" />
                                <div className="absolute bottom-16 w-[calc(100%-1rem)] h-[2px] bg-zinc-800 shadow-[0_0_8px_rgba(255,107,0,1)]" />
                            </div>
                            <div className="text-sm font-black text-white mt-2">{data.projections.day90}</div>
                        </div>
                    </div>
                </div>

                {/* AI Budget Allocation */}
                <div className="p-5 rounded-2xl bg-black border border-white/10 shadow-inner">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-zinc-300" />
                            <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50">AI Recommended Capital Allocation</h3>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {data.budgetSplits.map((split, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF6B00]/30 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                                        {split.allocation}
                                    </div>
                                    <div className="text-[11px] font-bold text-white/90 uppercase tracking-wider">{split.channel}</div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-end">
                                        <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Spend</div>
                                        <div className="text-[11px] font-bold text-white tracking-widest">{split.amount}</div>
                                    </div>
                                    <div className="flex flex-col items-end w-12 text-right">
                                        <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-0.5">ROAS</div>
                                        <div className="text-[11px] font-bold text-zinc-300 tracking-widest flex items-center gap-0.5">
                                            {split.roas} {split.roas !== "?" && <ArrowUpRight className="w-3 h-3" />}
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

function TargetIcon(props: any) {
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    )
}

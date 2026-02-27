"use client"

import React from "react"
import { motion } from "framer-motion"
import { Globe, Activity, ArrowUpRight } from "lucide-react"

interface RadarStream {
    source: string
    signal: string
    confidence: number
    trend: "up" | "down" | "flat"
}

export function TrendRadar({ streams }: { streams: RadarStream[] }) {
    return (
        <motion.div
            key="radar"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                    <Globe className="w-5 h-5 text-[#FF6B00]" />
                </div>
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-white">Market & Trend Radar</h2>
                    <p className="text-[11px] text-[#FF6B00]/80 font-mono uppercase tracking-widest mt-0.5">Semantic Analysis Live</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-4">
                {streams.map((stream, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 shrink-0 flex items-center justify-center relative z-10 shadow-inner">
                            <Activity className="w-4 h-4 text-[#FF6B00]/80" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5 relative z-10">
                            <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">{stream.source}</div>
                            <p className="text-sm font-bold text-white/90 mb-4 tracking-tight leading-relaxed">{stream.signal}</p>
                            <div className="flex items-center gap-4">
                                <span className="text-[11px] font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                                    Confidence: {stream.confidence}%
                                </span>
                                {stream.trend === "up" && (
                                    <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" /> Trending Spike
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

"use client"

import React from "react"
import { motion } from "framer-motion"
import { Crosshair, AlertTriangle, UserMinus, ShieldAlert } from "lucide-react"

export interface PoachingData {
    activeScanners: number
    competitorsTracked: string[]
    totalPoachableLeads: number
    hotLeads: {
        name: string
        role: string
        company: string
        system: string
        intent: "High" | "Medium" | "Low"
        trigger: string
    }[]
}

export function PoachingScanner({ data }: { data: PoachingData }) {
    return (
        <motion.div
            key="poaching"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <Crosshair className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Competitor Poaching Scanner</h2>
                        <div className="text-[11px] font-mono text-[#FF6B00]/80 uppercase tracking-widest mt-0.5">Active Extraction</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 flex flex-col items-end">
                    Total Poachable <span className="text-white text-base">{data.totalPoachableLeads}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-4">
                {/* Header Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FF6B00]/5 border border-[#FF6B00]/20 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <ShieldAlert className="w-4 h-4 text-[#FF6B00]" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Competitors Tracked</span>
                        </div>
                        <div className="flex gap-2 relative z-10 flex-wrap">
                            {data.competitorsTracked.map(comp => (
                                <span key={comp} className="px-2 py-1 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-md">
                                    {comp}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#050505] border border-white/10 flex flex-col justify-between shadow-inner">
                        <div className="flex items-center gap-2 mb-4">
                            <UserMinus className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Active Scanners</span>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight">{data.activeScanners} <span className="text-white/30 text-base font-medium">nodes</span></span>
                    </div>
                </div>

                {/* Hot Leads */}
                <div className="p-5 rounded-2xl bg-[#050505] border border-white/10 shadow-inner">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#FF6B00]" />
                            <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50">High-Intent Poaching Targets</h3>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {data.hotLeads.map((lead, i) => (
                            <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF6B00]/30 transition-colors group gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center text-xs font-bold text-white/70 uppercase">
                                            {lead.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{lead.name}</div>
                                            <div className="text-[11px] text-white/50">{lead.role} @ <span className="text-white/80">{lead.company}</span></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded border border-[#FF6B00]/20">
                                            {lead.intent} Intent
                                        </span>
                                        <span className="text-[10px] text-white/40 font-mono">
                                            Using {lead.system}
                                        </span>
                                    </div>
                                </div>
                                <div className="pl-13">
                                    <div className="text-[11px] text-white/60 bg-white/5 p-2 rounded border-l-2 border-[#FF6B00] leading-relaxed">
                                        <span className="text-[#FF6B00] font-bold mr-1">Trigger:</span>
                                        {lead.trigger}
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

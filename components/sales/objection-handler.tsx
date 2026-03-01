"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageSquareWarning, Swords, ChevronRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ObjectionData {
    detectedObjection: string
    confidence: string
    recommendedScript: {
        phase: string
        type: "question" | "reframe" | "action"
        content: string
    }[]
    battlecards: {
        competitor: string
        claim: string
        counter: string
    }[]
}

export function ObjectionHandler({ data }: { data: ObjectionData }) {
    return (
        <motion.div
            key="objection"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <MessageSquareWarning className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Live Objection Handler</h2>
                        <div className="text-[11px] font-mono text-zinc-300/80 uppercase tracking-widest mt-0.5">Call Assist Active</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-zinc-800/10 border border-[#FF6B00]/20 text-[10px] font-bold uppercase tracking-widest text-zinc-300 flex flex-col items-end">
                    Confidence <span className="text-white text-base">{data.confidence}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-6">

                {/* Detected Objection Banner */}
                <div className="p-4 rounded-xl bg-zinc-800 border border-white/10 flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">Detected Pushback</span>
                    <span className="text-xl font-bold text-white tracking-tight">"{data.detectedObjection}"</span>
                </div>

                {/* Script Sequencer */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Swords className="w-4 h-4 text-white/50" />
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50">Recommended Turn Sequence</h3>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <div className="absolute left-4 top-4 bottom-4 w-[1px] bg-white/10" />
                        {data.recommendedScript.map((step, i) => (
                            <div key={i} className="flex gap-4 relative z-10 group">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[10px] font-bold tracking-widest uppercase transition-all",
                                    step.type === "question" ? "bg-zinc-800 border-white/20 text-white/60" :
                                        step.type === "reframe" ? "bg-zinc-800/10 border-[#FF6B00]/30 text-zinc-300 shadow-[0_0_15px_rgba(255,107,0,0.2)]" :
                                            "bg-white/10 border-white/30 text-zinc-300"
                                )}>
                                    0{i + 1}
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors flex-1">
                                    <div className={cn(
                                        "text-[9px] uppercase tracking-widest font-bold mb-2",
                                        step.type === "question" ? "text-white/40" :
                                            step.type === "reframe" ? "text-zinc-300" :
                                                "text-zinc-300"
                                    )}>{step.phase}</div>
                                    <div className="text-sm text-white/80 leading-relaxed font-medium">"{step.content}"</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instant Battlecards */}
                <div className="p-5 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4">Instant Battlecards</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {data.battlecards.map((card, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-[#FF6B00]/30 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">VS</div>
                                        <span className="font-bold text-white text-sm">{card.competitor}</span>
                                    </div>
                                    <div className="text-xs text-white/40 italic mb-2">Claim: "{card.claim}"</div>
                                </div>
                                <div className="text-xs text-zinc-300 font-medium bg-zinc-800/10 p-2 rounded">
                                    <span className="font-bold text-zinc-300 mr-1">Counter:</span>
                                    {card.counter}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

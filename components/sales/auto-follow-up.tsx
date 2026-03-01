"use client"

import React from "react"
import { motion } from "framer-motion"
import { Timer, MailCheck, ReplyAll, CalendarCheck, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FollowUpData {
    activeSequences: number
    prospectsInSequence: number
    replyRate: string
    meetingsBooked: number
    topPerformingSequence: string
    liveThread: {
        prospect: string
        role: string
        stage: string
        status: string
        sentiment: "Neutral" | "Warming" | "Hot"
    }[]
}

export function AutoFollowUp({ data }: { data: FollowUpData }) {
    return (
        <motion.div
            key="follow-up"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <Timer className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Auto-Follow-Up Engine</h2>
                        <div className="text-[11px] font-mono text-zinc-300/80 uppercase tracking-widest mt-0.5">Drip Sequences Active</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 flex flex-col items-end">
                    Total Volume <span className="text-white text-base">{data.prospectsInSequence} Active</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-4">

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-zinc-800 border border-white/10 flex flex-col items-center justify-center text-center">
                        <MailCheck className="w-4 h-4 text-white/30 mb-2" />
                        <span className="text-2xl font-black text-white">{data.activeSequences}</span>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 mt-1">Live Campaigns</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-800/5 border border-[#FF6B00]/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-zinc-800/10 rounded-full blur-[20px] -translate-y-1/2 translate-x-1/2" />
                        <ReplyAll className="w-4 h-4 text-zinc-300 mb-2 relative z-10" />
                        <span className="text-2xl font-black text-white relative z-10">{data.replyRate}</span>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-300/60 mt-1 relative z-10">Avg Reply Rate</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-[20px] -translate-y-1/2 translate-x-1/2" />
                        <CalendarCheck className="w-4 h-4 text-zinc-300 mb-2 relative z-10" />
                        <span className="text-2xl font-black text-white relative z-10">{data.meetingsBooked}</span>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-300/60 mt-1 relative z-10">Meetings Booked</span>
                    </div>
                </div>

                {/* Top Sequence Banner */}
                <div className="p-4 rounded-xl bg-zinc-800 border border-white/10 flex flex-col">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 mb-1">Top Performing Sequence</span>
                    <span className="text-sm font-bold text-white tracking-wide">{data.topPerformingSequence}</span>
                </div>

                {/* Live Activity Thread */}
                <div className="p-5 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-5">Live Activity Thread</h3>

                    <div className="space-y-3">
                        {data.liveThread.map((thread, i) => (
                            <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white/70 uppercase border border-white/10">
                                            {thread.prospect.split(" ")[0][0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{thread.prospect}</div>
                                            <div className="text-[10px] text-white/40 font-mono mt-0.5">{thread.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={cn(
                                            "text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border flex items-center gap-1",
                                            thread.sentiment === "Neutral" ? "bg-white/5 border-white/10 text-white/50" :
                                                thread.sentiment === "Warming" ? "bg-white/10 border-white/20 text-stone-300" :
                                                    "bg-zinc-800/10 border-[#FF6B00]/30 text-zinc-300 shadow-[0_0_10px_rgba(255,107,0,0.2)]"
                                        )}>
                                            {thread.sentiment === "Hot" && <Flame className="w-3 h-3" />}
                                            {thread.sentiment}
                                        </span>
                                        <div className="text-[10px] text-white/40 italic mt-0.5">{thread.status}</div>
                                    </div>
                                </div>
                                <div className="pl-13">
                                    <div className="text-[11px] text-white/70 bg-white/5 p-2 rounded border-l-2 border-white/20 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                        <span className="font-bold text-white/90">{thread.stage}</span>
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

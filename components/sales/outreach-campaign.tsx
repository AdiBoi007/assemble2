"use client"

import React from "react"
import { motion } from "framer-motion"
import { Send, Mail, CheckCircle2, AlertTriangle } from "lucide-react"

interface SequenceStep {
    day: number
    type: string
    content: string
}

interface OutreachData {
    campaignName: string
    status: string
    audienceSize: number
    generateSequence: SequenceStep[]
    spamScore: number
    projectedMeetings: number
}

export function OutreachCampaign({ data }: { data: OutreachData }) {
    return (
        <motion.div
            key="outreach"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            <div className="mb-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <Send className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Outreach Sequence</h2>
                        <div className="text-[11px] font-mono text-[#FF6B00]/80 uppercase tracking-widest mt-0.5">{data.campaignName}</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[10px] font-bold uppercase tracking-widest text-[#FF6B00] flex items-center gap-2 shadow-[0_0_10px_rgba(255,107,0,0.1)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                    {data.status} ({data.audienceSize} Targets)
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="p-4 rounded-2xl bg-[#FF6B00]/5 border border-[#FF6B00]/20 flex items-center justify-between overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6B00]/5 to-transparent pointer-events-none" />
                    <div className="flex items-center gap-2 relative z-10">
                        <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Spam Score</span>
                    </div>
                    <span className="text-2xl font-black text-white relative z-10">{data.spamScore}<span className="text-[#FF6B00] text-base">/10</span></span>
                </div>
                <div className="p-4 rounded-2xl bg-black border border-white/10 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#FF6B00]/60" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Proj. Meetings</span>
                    </div>
                    <span className="text-2xl font-black text-white">{data.projectedMeetings} <span className="text-white/30 text-base font-medium">/wk</span></span>
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-3 pb-8">
                <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">Automated A/B Neural Sequence</h3>
                <div className="relative border-l border-white/10 ml-3 space-y-6">
                    {data.generateSequence.map((step, i) => (
                        <div key={i} className="relative pl-6 group">
                            <div className="absolute -left-[4.5px] top-6 w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.8)] group-hover:scale-125 transition-transform" />

                            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 bg-white/5 px-2 py-0.5 rounded">Day {step.day}</div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#FF6B00]">
                                    <Mail className="w-3 h-3" /> {step.type}
                                </div>
                            </div>

                            {/* A/B Variants Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Variant A */}
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group/var hover:border-[#FF6B00]/30 transition-colors">
                                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-white/5 text-[9px] font-bold tracking-widest uppercase text-white/30 rounded-bl-lg">Variant A</div>
                                    <p className="text-[11px] text-white/70 font-medium leading-relaxed whitespace-pre-wrap mt-2">{step.content}</p>
                                </div>
                                {/* Variant B (Simulated Aggressive Tone) */}
                                <div className="p-4 rounded-xl bg-black border border-white/5 relative overflow-hidden group/var hover:border-[#FF6B00]/30 transition-colors shadow-inner">
                                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#FF6B00]/20 text-[9px] font-bold tracking-widest uppercase text-[#FF6B00] rounded-bl-lg">Variant B</div>
                                    <p className="text-[11px] text-white/60 font-medium leading-relaxed whitespace-pre-wrap mt-2">{step.content.replace("We help teams like yours", "Your competitors are using us to")}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

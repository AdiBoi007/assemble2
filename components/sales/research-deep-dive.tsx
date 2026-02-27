"use client"

import React from "react"
import { motion } from "framer-motion"
import { Globe, Users, Target, Activity } from "lucide-react"

interface HighIntentSignal {
    company: string
    signal: string
    score: number
}

interface ResearchData {
    targetPersona: string
    totalTAM: number
    identifiedAccounts: number
    highIntentSignals: HighIntentSignal[]
}

export function ResearchDeepDive({ data }: { data: ResearchData }) {
    return (
        <motion.div
            key="research"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl h-full flex flex-col"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Research Deep Dive</h2>
                        <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-0.5">Sub-Agent Results</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2 flex items-center gap-1.5">
                        <Users className="w-3 h-3" /> Target Persona
                    </div>
                    <div className="text-sm font-bold text-white/90">{data.targetPersona}</div>
                </div>
                <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2 flex items-center gap-1.5">
                        <Target className="w-3 h-3" /> Total TAM
                    </div>
                    <div className="text-2xl font-black text-white">{data.totalTAM.toLocaleString()}</div>
                </div>
                <div className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2 flex items-center gap-1.5">
                        <Activity className="w-3 h-3" /> High-Intent Accounts
                    </div>
                    <div className="text-2xl font-black text-emerald-400">{data.identifiedAccounts}</div>
                </div>
            </div>

            <div className="flex-1 space-y-4">
                <h3 className="text-sm font-bold tracking-tight text-white/80">Top Account Signals</h3>
                <div className="space-y-3">
                    {data.highIntentSignals.map((item, i) => (
                        <div key={i} className="p-4 rounded-[1.2rem] bg-white/[0.02] border border-white/[0.05] flex items-start gap-4 backdrop-blur-md">
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 w-12 shrink-0">
                                <span className="text-xs font-black text-blue-400">{item.score}</span>
                            </div>
                            <div className="pt-0.5">
                                <h4 className="text-sm font-bold text-white/90 mb-1">{item.company}</h4>
                                <p className="text-xs text-white/60 font-medium leading-relaxed">{item.signal}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

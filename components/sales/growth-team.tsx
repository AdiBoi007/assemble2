"use client"

import React from "react"
import { motion } from "framer-motion"
import { BrainCircuit, RefreshCw, CheckCircle2 } from "lucide-react"

interface AgentData {
    id: string
    name: string
    status: "running" | "done"
    icon: any
    progress: number
    note: string
    color: string
}

const PremiumRing = ({ progress, size = 56, strokeWidth = 5, color, id }: any) => {
    const r = (size - strokeWidth) / 2
    const circ = r * 2 * Math.PI
    const offset = circ - (progress / 100) * circ
    return (
        <div className="relative flex items-center justify-center shrink-0 drop-shadow-xl" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90 absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-white/[0.05]" strokeWidth={strokeWidth} />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={r} fill="none"
                    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    filter={`url(#glow-${id})`}
                />
            </svg>
            <span className="text-[11px] font-bold text-white tracking-tighter drop-shadow-md">
                {progress}%
            </span>
        </div>
    )
}

export function GrowthTeamStatus({ agents }: { agents: AgentData[] }) {
    return (
        <motion.div
            key="team"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                        <BrainCircuit className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">AI Growth Squad</h2>
                        <p className="text-[11px] text-[#FF6B00]/80 font-mono uppercase tracking-widest mt-0.5">Active Execution Nodes</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {agents.map((agent, i) => (
                    <div key={agent.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-4 relative overflow-hidden group">
                        {agent.status === "running" && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" />
                        )}
                        <PremiumRing progress={agent.progress} size={48} strokeWidth={4} color={agent.color} id={`gt-${agent.id}`} />
                        <div className="flex-1 min-w-0 pt-1 relative z-10">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-sm font-bold tracking-tight text-white/90">{agent.name}</h3>
                                {agent.status === "running" ? (
                                    <RefreshCw className="w-3 h-3 text-[#FF6B00] animate-spin drop-shadow-[0_0_5px_rgba(255,107,0,0.8)]" />
                                ) : (
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                )}
                            </div>
                            <p className="text-xs font-medium text-white/50 leading-relaxed max-w-[180px]">{agent.note}</p>
                            {agent.status === "running" && (
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-[#FF6B00] animate-ping" />
                                    <span className="text-[9px] uppercase tracking-widest text-[#FF6B00]/80 font-bold">Executing</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

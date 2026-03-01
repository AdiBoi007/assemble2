"use client"

import React from "react"
import { motion } from "framer-motion"
import { Crosshair, Timer, Calculator, Target, Terminal, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface WarRoomData {
    objective: string
    status: string
    timeElapsed: string
    activeSubroutines: {
        name: string
        status: string
        metric: string
        iconType: "crosshair" | "timer" | "calculator" | "target"
        color: "orange" | "blue" | "emerald" | "indigo"
    }[]
    globalAlerts: {
        type: "Success" | "Warning"
        message: string
    }[]
}

const iconMap = {
    crosshair: Crosshair,
    timer: Timer,
    calculator: Calculator,
    target: Target
}

const colorMap = {
    orange: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    blue: "text-zinc-300 border-white/30 bg-zinc-800/10",
    emerald: "text-zinc-300 border-white/30 bg-zinc-800/10",
    indigo: "text-zinc-300 border-white/30 bg-zinc-800/10"
}

export function WarRoom({ data }: { data: WarRoomData }) {
    return (
        <motion.div
            key="war-room"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-3xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                        <Terminal className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Global War Room</h2>
                        <div className="text-[11px] font-mono text-neutral-400/80 uppercase tracking-widest mt-0.5">Chain Command Invoked</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-neutral-500/20 border border-neutral-500/40 text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    Live System Override
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-6">

                {/* Objective Banner */}
                <div className="p-5 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-500/10 via-black to-black opacity-50" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2 relative z-10">Primary Objective</span>
                    <span className="text-3xl font-black text-white tracking-tight relative z-10">{data.objective}</span>
                    <div className="flex items-center gap-4 mt-4 relative z-10 text-[11px] font-mono uppercase text-white/40 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                        <span>Status: <span className="text-zinc-300 font-bold">{data.status}</span></span>
                        <span>•</span>
                        <span>T-Plus: <span className="text-white font-bold">{data.timeElapsed}</span></span>
                    </div>
                </div>

                {/* Subroutine Grid */}
                <div>
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4 px-1">Active Subroutines (Parallel Execution)</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {data.activeSubroutines.map((routine, i) => {
                            const Icon = iconMap[routine.iconType]
                            const colors = colorMap[routine.color]

                            return (
                                <div key={i} className="p-4 rounded-xl bg-zinc-800 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={cn("w-8 h-8 rounded border flex items-center justify-center", colors)}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className={cn(
                                            "text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border",
                                            routine.status === "Running" ? "bg-white/5 border-white/10 text-white/50 animate-pulse" : "bg-white/10 border-white/20 text-zinc-300"
                                        )}>
                                            {routine.status}
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-white mb-1">{routine.name}</div>
                                    <div className="text-[11px] font-mono text-white/40">{routine.metric}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Global Alerts Feed */}
                <div className="p-5 rounded-2xl bg-zinc-800 border border-white/10 shadow-inner">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4">Global Event Feed</h3>

                    <div className="space-y-2">
                        {data.globalAlerts.map((alert, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                {alert.type === "Success" ? (
                                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300" />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-3.5 h-3.5 text-stone-300" />
                                    </div>
                                )}
                                <div className="text-xs text-white/70 font-medium">
                                    <span className={cn("font-bold mr-1", alert.type === "Success" ? "text-zinc-300" : "text-stone-300")}>
                                        [{alert.type.toUpperCase()}]
                                    </span>
                                    {alert.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

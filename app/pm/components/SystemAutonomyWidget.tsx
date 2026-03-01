
"use client"

import React from "react"
import { Settings, List, Zap, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SystemAutonomyWidget() {
    return (
        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-500/[0.05] to-zinc-500/[0.02] border border-white/20 relative overflow-hidden group hover:border-white/40 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-3 opacity-20">
                <Activity className="w-12 h-12 text-zinc-300" />
            </div>

            <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    Autopilot Core
                </h3>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-800 opacity-75 duration-1000"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-800 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
                </span>
            </div>

            {/* Recent Decisions Ticker */}
            <div className="space-y-3 mb-4 relative z-10">
                <div className="flex items-start gap-2">
                    <div className="w-0.5 h-full min-h-[24px] bg-gradient-to-b from-zinc-500 to-zinc-500 rounded-full" />
                    <div className="text-[10px] text-white/60 leading-tight">
                        Auto-advanced <span className="text-white font-medium">Sarah J.</span>
                        <div className="text-zinc-300/80 text-[9px] mt-0.5 flex items-center gap-1">
                            <Zap className="w-2 h-2" /> 98% Neural Match
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <div className="w-0.5 h-full min-h-[24px] bg-white/10 rounded-full" />
                    <div className="text-[10px] text-white/40 leading-tight">
                        Filtered <span className="text-white/60 font-medium">Candidate #892</span>
                        <div className="text-white/30 text-[9px] mt-0.5">Visa Ineligible</div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 relative z-10">
                <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px] border-white/20 text-zinc-400 hover:bg-white/10 hover:text-zinc-300 bg-zinc-950/20">
                    <Settings className="w-3 h-3 mr-1.5" /> Configure
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px] border-white/20 text-zinc-400 hover:bg-white/10 hover:text-zinc-300 bg-zinc-950/20">
                    <List className="w-3 h-3 mr-1.5" /> Neural Log
                </Button>
            </div>
        </div>
    )
}

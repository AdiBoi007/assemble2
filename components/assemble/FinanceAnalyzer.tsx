"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, ArrowRight, Zap, Target, Activity, CheckCircle2, AlertCircle, RefreshCw, BarChart3, ChevronRight, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export function FinanceAnalyzer() {
    const [executing, setExecuting] = useState(false)
    const [executed, setExecuted] = useState(false)
    const [activeTab, setActiveTab] = useState("topology")

    const handleExecute = () => {
        setExecuting(true)
        setTimeout(() => {
            setExecuting(false)
            setExecuted(true)
        }, 2500)
    }

    return (
        <div className="h-full flex flex-col bg-[#020202] text-white font-sans overflow-hidden relative isolate">

            {/* Ambient Backgrounds */}
            <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none -z-10" />

            {/* Header Layer */}
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.04] shrink-0 flex justify-between items-start z-20 backdrop-blur-3xl bg-[#020202]/60">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shadow-[inset_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h2 className="text-xl font-medium tracking-tight text-white">
                            Finance & Capital Velocity
                        </h2>
                    </div>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                        <strong className="text-emerald-400 font-medium mr-2">Capital Status:</strong>
                        Expansion revenue is outpacing churn. However, systemic anomaly detected: <span className="text-amber-400 font-mono">12 Enterprise Accounts</span> are drifting into the Risk Orbit (Q3 Promo Fatigue). -$14.2k MRR exposure.
                    </p>
                </div>

                <div className="flex gap-4 text-right shrink-0">
                    <div className="bg-[#050505] border border-white/[0.05] rounded-xl p-3 shadow-xl">
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5">Live MRR</p>
                        <span className="text-xl font-light text-white">$142,450</span>
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <TrendingUp className="w-3 h-3" /> +4.2% MoM
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Nav */}
            <div className="px-8 py-3 border-b border-white/[0.04] bg-[#050505] flex gap-6 shrink-0 z-20">
                <button
                    onClick={() => setActiveTab("topology")}
                    className={cn("text-xs font-mono uppercase tracking-widest transition-colors pb-1 border-b-2", activeTab === "topology" ? "border-emerald-500 text-emerald-400" : "border-transparent text-neutral-500 hover:text-white")}
                >
                    Capital Topology Map
                </button>
                <button
                    onClick={() => setActiveTab("revenue")}
                    className={cn("text-xs font-mono uppercase tracking-widest transition-colors pb-1 border-b-2", activeTab === "revenue" ? "border-emerald-500 text-emerald-400" : "border-transparent text-neutral-500 hover:text-white")}
                >
                    Revenue Streams
                </button>
            </div>

            {/* Main Visual Workspace */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row relative z-10">

                {/* LEFT: Customer Radar Map */}
                <div className="lg:w-1/2 h-full flex flex-col border-r border-white/[0.04] bg-[#020202] relative isolate overflow-hidden">

                    <div className="absolute top-8 left-8 z-20">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                            <Target className="w-3.5 h-3.5" /> Client Health Radar
                        </h3>
                        {/* Legend */}
                        <div className="flex flex-col gap-2 mt-4 bg-black/40 border border-white/5 p-3 rounded-lg backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono">Core (Stable)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 shadow-[0_0_10px_rgba(251,191,36,1)] rounded-full bg-amber-400" />
                                <span className="text-[9px] text-amber-400 uppercase tracking-widest font-mono">Risk Orbit</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Churned</span>
                            </div>
                        </div>
                    </div>

                    {/* Radar Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Radar Core Grid */}
                        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                            {/* Inner Core (Stable) */}
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute w-[200px] h-[200px] rounded-full border border-emerald-500/10 bg-emerald-500/5 backdrop-blur-[1px]" />
                            {/* Mid Orbit (Risk) */}
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className={cn("absolute w-[350px] h-[350px] rounded-full border border-dashed transition-colors", executed ? "border-emerald-500/20" : "border-amber-500/20 bg-amber-500/[0.02]")} />
                            {/* Deep Space (Churned) */}
                            <div className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.03]" />

                            {/* Sweeper Line */}
                            <motion.div
                                animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[250px] h-px bg-gradient-to-r from-transparent to-emerald-500/30 origin-left left-1/2 top-1/2"
                            />

                            {/* Client Dots mapping */}
                            <ClientDots executed={executed} />

                            {/* Center Target */}
                            <div className="w-6 h-6 rounded-full bg-[#050505] border border-emerald-500/30 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                <div className="w-1 h-1 rounded-full bg-emerald-400" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT: Agent Action Matrix (Financial Fix Paths) */}
                <div className="lg:w-1/2 h-full bg-[#020202] flex flex-col p-8 relative isolate overflow-y-auto custom-scrollbar">

                    <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-amber-400" /> Outlier Response Vectors
                    </h3>

                    {/* Warning Context */}
                    <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-6">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-amber-200 mb-1">Q3 Promo Cohort Decay</h4>
                                <p className="text-xs text-amber-200/60 leading-relaxed font-light mb-3">
                                    12 Enterprise clients ($14.2k MRR total) entered the mid-orbit risk zone. Their behavior matches the historical fingerprint of post-promo churn.
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-neutral-500 uppercase font-mono">Exposure</span>
                                        <span className="text-sm text-rose-400 font-bold">-$14,200</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-neutral-500 uppercase font-mono">Time to Churn</span>
                                        <span className="text-sm text-amber-400 font-bold">7-14 Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">Proposed Intervention</h3>

                    {/* The Action Card */}
                    <div className={cn(
                        "rounded-3xl border p-6 transition-all duration-500 relative isolate overflow-hidden",
                        executed ? "bg-emerald-950/10 border-emerald-500/30 shadow-[0_0_40px_rgba(52,211,153,0.1)]" :
                            "bg-white/[0.01] border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent hover:border-indigo-500/40"
                    )}>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                                    executed ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                                        "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                                )}>
                                    {executed ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                </div>
                                <h4 className="text-base font-medium text-white">Deploy Sunk-Cost Winback Campaign</h4>
                            </div>
                            {!executed && (
                                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                                    94% Success Probability
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                            Agent will generate a hyper-personalized email sequence for these 12 accounts, highlighting their specific data buildup (sunk cost) to negotiate a discounted annual contract lock-in.
                        </p>

                        <div className="grid grid-cols-4 gap-2 mb-6">
                            <MetricCard label="Effort" value="Low" highlight="emerald" />
                            <MetricCard label="Execution" value="API" highlight="indigo" />
                            <MetricCard label="Time" value="Instant" highlight="neutral" />
                            <MetricCard label="Recovery" value="~$12.8k" highlight="emerald" />
                        </div>

                        {/* Execute Button */}
                        <AnimatePresence mode="wait">
                            {!executed ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <button
                                        onClick={handleExecute} disabled={executing}
                                        className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-neutral-200 flex items-center justify-center gap-3 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
                                        {executing ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="w-4 h-4 text-neutral-500" /></motion.div>
                                                Compiling Personalization Data...
                                            </>
                                        ) : (
                                            <>Authorize Win-back <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-[#0a0a0a] border border-white/[0.04]">
                                    <div className="flex gap-4 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-white mb-1">Campaign Deployed via API</h4>
                                            <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                                12 personalized emails dispatched via CRM. Gravitational pull established. Financial Dashboard will lock new contract values upon signature.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>


                    {/* Supplementary Data */}
                    <div className="mt-6 border-t border-white/[0.04] pt-6 flex-1">
                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">Capital Velocity Indicators</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-neutral-500 font-mono uppercase mb-1">New Pipeline</p>
                                    <p className="text-lg font-light text-white">$45.2k</p>
                                </div>
                                <BarChart3 className="w-5 h-5 text-indigo-400 opacity-50" />
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-neutral-500 font-mono uppercase mb-1">Expansion Rev</p>
                                    <p className="text-lg font-light text-emerald-400">$8.4k</p>
                                </div>
                                <TrendingUp className="w-5 h-5 text-emerald-400 opacity-50" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

function MetricCard({ label, value, highlight }: { label: string, value: string, highlight: "emerald" | "amber" | "indigo" | "rose" | "neutral" }) {
    return (
        <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-between backdrop-blur-md">
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{label}</span>
            <span className={cn(
                "text-xs font-bold mt-1",
                highlight === "emerald" ? "text-emerald-400" :
                    highlight === "amber" ? "text-amber-400" :
                        highlight === "rose" ? "text-rose-400" :
                            highlight === "indigo" ? "text-indigo-400" : "text-white"
            )}>{value}</span>
        </div>
    )
}

// Generates the static scattered dots for the radar to avoid massive DOM load, uses Framer for abstract orbit
function ClientDots({ executed }: { executed: boolean }) {
    // Generate pre-calculated absolute positions for stability
    const generateDots = (count: number, minR: number, maxR: number, category: string) => {
        return Array.from({ length: count }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = minR + Math.random() * (maxR - minR);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return { id: `${category}-${i}`, x, y, category };
        });
    }

    // Core (0 to 90px radius)
    const coreDots = generateDots(60, 10, 85, "core");
    // Risk (120 to 160px radius) - These are the problem childs
    const riskDots = generateDots(12, 110, 160, "risk");
    // Churned (190 to 240px radius)
    const deadDots = generateDots(40, 200, 240, "dead");

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {coreDots.map(dot => (
                <div key={dot.id} className="absolute w-[3px] h-[3px] rounded-full bg-emerald-400 opacity-80" style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }} />
            ))}
            {riskDots.map(dot => (
                <motion.div
                    key={dot.id}
                    animate={executed ? {
                        // When executed, animate them being "pulled" back towards the core
                        x: dot.x * 0.4,
                        y: dot.y * 0.4,
                        backgroundColor: "#34d399",
                        boxShadow: "none"
                    } : {}}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className={cn("absolute w-[3px] h-[3px] rounded-full", executed ? "" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]")}
                    style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }}
                />
            ))}
            {deadDots.map(dot => (
                <div key={dot.id} className="absolute w-[2px] h-[2px] rounded-full bg-white/20" style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }} />
            ))}
        </div>
    )
}

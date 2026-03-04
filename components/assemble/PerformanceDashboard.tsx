"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Target, Zap, DollarSign, Users, AlertCircle, ArrowUpRight, ArrowDownRight, Edit2, Play, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Napkin-inspired visual node system
interface NodeProps {
    id: string
    title: string
    icon: React.ElementType
    value: string | React.ReactNode
    subValue?: string
    trend?: "up" | "down" | "flat"
    status?: "healthy" | "warning" | "critical"
    x: number
    y: number
    onClick?: () => void
    selected?: boolean
}

// Fixed positions for a deterministic flowchart layout
const NODES: NodeProps[] = [
    { id: "core", title: "Assemble Engine", icon: Activity, value: "System Nominal", subValue: "98.4% Integrity", status: "warning", x: 40, y: 240 },

    { id: "rev", title: "Revenue Velocity", icon: DollarSign, value: "$3,240 MRR", subValue: "+6% WoW", trend: "up", status: "healthy", x: 380, y: 60 },
    { id: "pipe", title: "Pipeline Coverage", icon: Target, value: "$12.4k Vol", subValue: "28 Active", trend: "flat", status: "healthy", x: 380, y: 180 },
    { id: "burn", title: "Capital Efficiency", icon: Users, value: "$2.1k Burn", subValue: "14.2mo Runway", trend: "down", status: "warning", x: 380, y: 300 },

    { id: "health", title: "SaaS Tool B", icon: AlertCircle, value: "Critical Leak", subValue: "-$640/mo (Email Seq)", trend: "down", status: "critical", x: 380, y: 440 },
]

export function PerformanceDashboard({ onProductClick }: { onProductClick?: () => void }) {
    const [activeNode, setActiveNode] = useState<string | null>("health")
    const [applyingFix, setApplyingFix] = useState(false)
    const [fixApplied, setFixApplied] = useState(false)

    // Wait a tick to draw lines so DOM layout is stable
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const handleApplyFix = () => {
        setApplyingFix(true)
        setTimeout(() => {
            setApplyingFix(false)
            setFixApplied(true)
        }, 1500)
    }

    // Draw smooth bezier curves from Core (right edge) to Leaves (left edge)
    const drawCurve = (startX: number, startY: number, endX: number, endY: number) => {
        // Offset for node widths (approximate)
        const sx = startX + 220
        const sy = startY + 40
        const ex = endX
        const ey = endY + 40

        // Smooth S-curve
        const midX = sx + (ex - sx) / 2
        return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`
    }

    return (
        <div className="h-full flex flex-col bg-[#050505] text-neutral-200 overflow-hidden relative font-sans">

            {/* Background DOT Grid — Napkin classic */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Header: Mimicking a Canvas File Title */}
            <div className="px-8 pt-6 pb-4 shrink-0 flex items-center justify-between relative z-10 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <Edit2 className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                        <h2 className="text-lg font-medium text-white group-hover:underline underline-offset-4 decoration-white/20">Operational Flowchart_v1.canvas</h2>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Saved 2m ago</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Agent Observing
                    </div>
                    <button className="flex items-center gap-2 text-xs font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-neutral-200 transition-all">
                        <Play className="w-3 h-3 fill-black" /> Run Simulation
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full relative overflow-hidden flex">

                {/* The Canvas (Left 65%) */}
                <div className="flex-1 relative h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar">

                    {mounted && (
                        <svg className="absolute inset-0 w-full h-[800px] pointer-events-none">
                            {NODES.filter(n => n.id !== "core").map(node => {
                                const isCritical = node.id === "health" && !fixApplied;
                                const path = drawCurve(40, 240, node.x, node.y)

                                return (
                                    <g key={`line-${node.id}`}>
                                        <path
                                            d={path}
                                            fill="none"
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="2"
                                        />
                                        <motion.path
                                            d={path}
                                            fill="none"
                                            stroke={isCritical ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.2)"}
                                            strokeWidth="2"
                                            strokeDasharray={isCritical ? "6 6" : "none"}
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                            {...(isCritical && {
                                                animate: { strokeDashoffset: [0, -20] },
                                                transition: { duration: 1, repeat: Infinity, ease: "linear" }
                                            })}
                                        />
                                    </g>
                                )
                            })}
                        </svg>
                    )}

                    {/* Render Nodes */}
                    {NODES.map((node, i) => {
                        const isCritical = node.id === "health" && !fixApplied
                        const isSelected = activeNode === node.id

                        return (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                onClick={() => {
                                    setActiveNode(node.id)
                                    if (node.id === "health") onProductClick?.()
                                }}
                                className={cn(
                                    "absolute w-[220px] rounded-2xl p-4 transition-all cursor-pointer backdrop-blur-xl border flex flex-col gap-3 group",
                                    isCritical
                                        ? "bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50"
                                        : isSelected
                                            ? "bg-white/[0.04] border-white/30"
                                            : "bg-[#0a0a0a]/80 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"
                                )}
                                style={{ left: node.x, top: node.y }}
                            >
                                {/* Node Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-neutral-400">
                                        <node.icon className={cn("w-4 h-4", isCritical ? "text-rose-400" : isSelected ? "text-white" : "")} />
                                        <span className="text-[10px] font-mono uppercase tracking-wider font-medium">{node.title}</span>
                                    </div>
                                    {node.trend === "up" && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
                                    {node.trend === "down" && <ArrowDownRight className={cn("w-3.5 h-3.5", isCritical ? "text-rose-400" : "text-amber-400")} />}
                                </div>

                                {/* Node Value */}
                                <div>
                                    <div className={cn(
                                        "text-lg font-light tracking-tight transition-colors",
                                        isCritical ? "text-rose-300 font-medium" : "text-white"
                                    )}>
                                        {node.id === "core" ? (fixApplied ? "System Stable" : node.value) : node.value}
                                    </div>
                                    {node.subValue && (
                                        <div className={cn(
                                            "text-[10px] mt-0.5",
                                            isCritical ? "text-rose-400/80 font-mono" : "text-neutral-500"
                                        )}>
                                            {node.id === "health" && fixApplied ? "Sequence Patched" : node.subValue}
                                        </div>
                                    )}
                                </div>

                                {/* Selection indicator bubble */}
                                {isSelected && (
                                    <motion.div layoutId="selection-bubble" className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-full" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>


                {/* The Annotator (Right 35%) - Mimics Napkin's side context panel */}
                <div className="w-[360px] border-l border-white/[0.04] bg-[#030303] flex flex-col relative z-20 shrink-0 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
                    <div className="p-6 border-b border-white/[0.04] bg-[#050505]">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-white" />
                            <h3 className="text-sm font-semibold text-white">Agent Annotation</h3>
                        </div>
                        <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Contextual Diagnosis</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {activeNode === "health" && !fixApplied ? (
                                <motion.div
                                    key="critical"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                                        <div className="flex items-center gap-2 text-rose-400 mb-3">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Diagnosis</span>
                                        </div>
                                        <p className="text-sm text-neutral-300 leading-relaxed font-light">
                                            The node <strong className="text-white font-medium">SaaS Tool B</strong> is hemorrhaging conversions at <span className="text-rose-400 font-mono">Email Step 3</span>.
                                            Bounce rate is 92%. The price anchor is structurally misaligned with the current market cycle.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">Proposed Blueprint</h4>

                                        {/* Visual mockup of the fix within the annotation */}
                                        <div className="border border-white/10 rounded-xl p-4 bg-[#080808] font-mono text-xs text-neutral-400 mb-4">
                                            <div className="flex items-center line-through opacity-50 mb-2">
                                                <span className="w-4 text-center mr-2 text-rose-500">-</span> Email 3: Hard Price Anchor ($499)
                                            </div>
                                            <div className="flex items-center text-emerald-400">
                                                <span className="w-4 text-center mr-2">+</span> Email 3: Value Case Study
                                            </div>
                                            <div className="flex items-center text-emerald-400 mt-1">
                                                <span className="w-4 text-center mr-2">+</span> Email 4: Soft Price Reveal
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleApplyFix}
                                            disabled={applyingFix}
                                            className="w-full h-11 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-neutral-200 flex items-center justify-center gap-2"
                                        >
                                            {applyingFix ? (
                                                <>
                                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                                        <Zap className="w-4 h-4" />
                                                    </motion.div>
                                                    Recompiling Canvas...
                                                </>
                                            ) : (
                                                "Inject Narrative Sequence"
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : activeNode === "health" && fixApplied ? (
                                <motion.div
                                    key="fixed"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6 flex flex-col items-center text-center mt-10"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-medium text-white mb-2">Sequence Injected</h4>
                                        <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                            The conversion pathway has been structurally re-routed. Real-time telemetry predicts structural stability within 48 hours.
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center opacity-50"
                                >
                                    <Activity className="w-8 h-8 text-neutral-600 mb-3" />
                                    <p className="text-sm font-light text-neutral-400">Select a node on the canvas<br />to view agent annotations.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    )
}

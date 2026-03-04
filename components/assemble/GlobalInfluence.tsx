"use client"

import React, { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { motion } from "framer-motion"
import { Globe2, ShieldAlert, TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const REGIONS = [
    { name: "North America", status: "Strong", score: 92, trend: "+14%", threat: "Low", lat: 37, lng: -95 },
    { name: "Western Europe", status: "Growing", score: 78, trend: "+8%", threat: "Medium", lat: 48, lng: 14 },
    { name: "APAC", status: "Warning", score: 45, trend: "-12%", threat: "High", lat: 1.3, lng: 103.8 },
]

const INSIGHTS = [
    { title: "APAC Compliance Risk", desc: "New data localization laws in APAC region may restrict product usage. Agent recommends shifting server instances to compliance-ready zones.", type: "warning" },
    { title: "EU Market Expansion", desc: "Strong organic growth detected in Germany and France. Agent suggests localized pricing tier deployment to capture 22% more ARPU.", type: "opportunity" },
    { title: "Supply Chain Disruption", desc: "Geopolitical tension affecting hardware partners impacting Q3 delivery estimates. Agent has drafted contingency routing plans.", type: "critical" }
]

export function GlobalInfluence() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [activeRegion, setActiveRegion] = useState<string | null>(null)

    useEffect(() => {
        let phi = 0
        let width = 0
        let current = null as any

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth
            }
        }
        window.addEventListener("resize", onResize)
        onResize()

        if (canvasRef.current) {
            current = createGlobe(canvasRef.current, {
                devicePixelRatio: 2,
                width: width * 2,
                height: width * 2,
                phi: 0,
                theta: 0.3,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 3,
                baseColor: [0.1, 0.1, 0.1],
                markerColor: [0.38, 0.39, 0.94], // Indigo-500
                glowColor: [0.1, 0.1, 0.2],
                markers: [
                    { location: [37.7749, -122.4194], size: 0.1 }, // SF
                    { location: [40.7128, -74.0060], size: 0.08 }, // NY
                    { location: [51.5074, -0.1278], size: 0.06 }, // London
                    { location: [48.8566, 2.3522], size: 0.05 }, // Paris
                    { location: [1.3521, 103.8198], size: 0.09 }, // SG
                    { location: [35.6895, 139.6917], size: 0.07 }, // Tokyo
                    { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
                ],
                onRender: (state: any) => {
                    state.phi = phi
                    phi += 0.003
                }
            })
        }

        return () => {
            if (current) current.destroy()
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-white/[0.04] shrink-0 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-indigo-400" />
                        Global Product Influence
                    </h3>
                    <p className="text-[10px] text-neutral-500 mt-1">Real-time usage telemetry & geopolitical risk analysis</p>
                </div>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        Live Sync
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col lg:flex-row gap-6 p-6">

                {/* Left Col - 3D Globe */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                    <div className="w-full aspect-square max-w-[500px] mx-auto relative rounded-3xl border border-white/[0.05] bg-black/40 shadow-2xl overflow-hidden flex items-center justify-center isolate">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)] z-0" />
                        <canvas
                            ref={canvasRef}
                            style={{ width: "100%", height: "100%", maxWidth: "500px", aspectRatio: 1 }}
                            className="relative z-10 opacity-90 transition-opacity duration-1000"
                        />
                        {/* Overlay stats */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between z-20">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3">
                                <p className="text-[10px] text-neutral-400 font-mono">Active Instances</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xl font-bold text-white">12,842</span>
                                    <span className="flex items-center text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                                        <TrendingUp className="w-3 h-3 mr-0.5" /> 8%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 text-right">
                                <p className="text-[10px] text-neutral-400 font-mono">Threat Level</p>
                                <div className="flex items-center justify-end gap-2 mt-1">
                                    <span className="text-xl font-bold text-amber-400">Elevated</span>
                                    <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {REGIONS.map(r => (
                            <button
                                key={r.name}
                                onClick={() => setActiveRegion(r.name === activeRegion ? null : r.name)}
                                className={cn(
                                    "p-3 rounded-xl border transition-all text-left",
                                    activeRegion === r.name
                                        ? "border-indigo-500/50 bg-indigo-500/10"
                                        : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05]"
                                )}
                            >
                                <p className="text-xs font-bold text-white mb-1 truncate">{r.name}</p>
                                <div className="flex items-center justify-between">
                                    <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded font-mono font-bold",
                                        r.score > 80 ? "text-emerald-400 bg-emerald-500/20" :
                                            r.score > 60 ? "text-amber-400 bg-amber-500/20" :
                                                "text-rose-400 bg-rose-500/20"
                                    )}>{r.score}</span>
                                    <span className={cn(
                                        "text-[10px]",
                                        r.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400"
                                    )}>{r.trend}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Col - Geopolitical Agent Analysis */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Agent Analysis & Geopolitics</span>
                    </div>

                    <div className="space-y-3">
                        {INSIGHTS.map((insight, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "p-4 rounded-xl border relative overflow-hidden",
                                    insight.type === "critical" ? "border-rose-500/30 bg-rose-500/10" :
                                        insight.type === "warning" ? "border-amber-500/30 bg-amber-500/5" :
                                            "border-emerald-500/30 bg-emerald-500/5"
                                )}
                            >
                                <div className={cn(
                                    "absolute left-0 top-0 bottom-0 w-1",
                                    insight.type === "critical" ? "bg-rose-500" :
                                        insight.type === "warning" ? "bg-amber-500" :
                                            "bg-emerald-500"
                                )} />
                                <div className="flex items-start gap-3">
                                    {insight.type === "critical" ? <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" /> :
                                        insight.type === "warning" ? <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /> :
                                            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}

                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1.5">{insight.title}</h4>
                                        <p className="text-xs text-neutral-400 leading-relaxed">{insight.desc}</p>

                                        <button className={cn(
                                            "mt-3 text-[10px] px-3 py-1.5 rounded-lg border font-bold transition-all hover:scale-105",
                                            insight.type === "critical" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" :
                                                insight.type === "warning" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                                                    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                        )}>
                                            Execute Fix Path →
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-auto p-4 rounded-xl border border-white/[0.05] bg-black/40 mt-4">
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            <span className="text-white font-bold">Agent Recommendation:</span> Based on global telemetry, expanding Latin American infrastructure will yield a 14% latency reduction for 20% of your user base. Proceed with auto-provisioning?
                        </p>
                        <div className="flex gap-2 mt-3">
                            <button className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-neutral-200 transition-colors">Approve Expansion</button>
                            <button className="flex-1 border border-white/10 text-white/60 py-2 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">Dismiss</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

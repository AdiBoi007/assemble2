"use strict";
import React from "react"
import { motion } from "framer-motion"
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts"
import { ArrowUpRight, ArrowDownRight, Activity, Users, Clock, CheckCircle2, AlertTriangle, Zap, MoreHorizontal, FileText, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── 1. Stat Card with Sparkline ─────────────────────────────────────────────
interface StatCardProps {
    title: string
    value: string
    trend: string
    trendDirection: 'up' | 'down' | 'neutral'
    icon: React.ElementType
    data: any[]
    color: string
}

export function StatCard({ title, value, trend, trendDirection, icon: Icon, data, color }: StatCardProps) {
    const isPositive = trendDirection === 'up'
    const trendColor = isPositive ? 'text-emerald-400' : 'text-rose-400'
    const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="group relative overflow-hidden rounded-2xl bg-[#0A0A0E] border border-white/[0.06] p-5 shadow-lg hover:shadow-xl hover:border-white/[0.12] transition-all duration-300"
        >
            <div className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity ${color}`}>
                <Icon className="w-12 h-12" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest font-mono mb-1">{title}</h3>
                    <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-2">
                        {value}
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-white/5 border border-white/5 flex items-center gap-1 ${trendColor}`}>
                            <TrendIcon className="w-3 h-3" />
                            {trend}
                        </span>
                    </div>
                </div>

                <div className="mt-4 h-12 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} className={color} />
                                    <stop offset="95%" stopColor="currentColor" stopOpacity={0} className={color} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="currentColor"
                                strokeWidth={2}
                                fill={`url(#gradient-${title})`}
                                className={color}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    )
}

// ─── 2. Velocity Chart (Main Area) ───────────────────────────────────────────
export function VelocityChart({ data }: { data: any[] }) {
    return (
        <div className="rounded-2xl bg-[#0A0A0E] border border-white/[0.06] p-6 shadow-lg h-full relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h3 className="text-lg font-bold text-white">Talent Velocity</h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-mono">Applications vs Hires (Last 6 Months)</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-[10px] text-white/60 uppercase">Apps</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-white/60 uppercase">Hires</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-black/90 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
                                            <p className="text-white font-bold mb-2">{label}</p>
                                            <div className="space-y-1">
                                                <p className="text-indigo-400 text-xs flex justify-between gap-4">
                                                    <span>Applications:</span>
                                                    <span className="font-mono">{payload[0].value}</span>
                                                </p>
                                                <p className="text-emerald-400 text-xs flex justify-between gap-4">
                                                    <span>Hires:</span>
                                                    <span className="font-mono">{payload[1].value}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Area type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
                        <Area type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHires)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

// ─── 3. Pipeline Funnel (Right Side) ───────────────────────────────────────
export function PipelineFunnel({ stages }: { stages: { label: string; count: number; color: string }[] }) {
    const maxVal = Math.max(...stages.map(s => s.count))

    return (
        <div className="rounded-2xl bg-[#0A0A0E] border border-white/[0.06] p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Live Pipeline</h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-mono">Stage Conversion</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white/40" />
                </div>
            </div>

            <div className="flex-1 space-y-4">
                {stages.map((stage, idx) => (
                    <div key={idx} className="group relative">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-white/60 font-medium group-hover:text-white transition-colors">{stage.label}</span>
                            <span className="font-mono font-bold text-white">{stage.count}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(stage.count / maxVal) * 100}%` }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                                className={`h-full rounded-full ${stage.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── 4. Alert / Anomaly Row ────────────────────────────────────────────────
export function AnomalyRow({ type, message, time }: { type: 'critical' | 'warning' | 'info', message: string, time: string }) {
    const styles = {
        critical: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', icon: AlertTriangle },
        warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: Zap },
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: Activity },
    }
    const style = styles[type]
    const Icon = style.icon

    return (
        <div className={`flex items-center gap-4 p-3 rounded-xl border ${style.bg} ${style.border} group hover:bg-opacity-20 transition-all cursor-pointer`}>
            <div className={`p-2 rounded-lg bg-black/20 ${style.text}`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90 font-medium truncate group-hover:text-white transition-colors">{message}</p>
            </div>
            <div className="text-[10px] text-white/40 font-mono whitespace-nowrap">{time}</div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
        </div>
    )
}

// ─── 5. Candidate Spotlight Mini-Card ──────────────────────────────────────
export function CandidateSpotlight({ name, role, score, match, avatar }: { name: string, role: string, score: number, match: number, avatar: string }) {
    return (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4 hover:border-white/[0.12] transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                {avatar}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{name}</h4>
                <p className="text-xs text-white/50 truncate">{role}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
                <div className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono">
                    {score}/100
                </div>
                <div className="text-[10px] text-white/30 font-mono">
                    {match}% Match
                </div>
            </div>
        </div>
    )
}

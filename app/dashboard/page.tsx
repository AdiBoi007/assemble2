"use client"

import React from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { cn } from "@/lib/utils"

const MRR_DATA = [
    { month: 'Jan', mrr: 12400 },
    { month: 'Feb', mrr: 15800 },
    { month: 'Mar', mrr: 18200 },
    { month: 'Apr', mrr: 24500 },
    { month: 'May', mrr: 31000 },
    { month: 'Jun', mrr: 42500 },
    { month: 'Jul', mrr: 48900 },
]

const ACQUISITION_DATA = [
    { source: 'Organic', users: 400 },
    { source: 'Outbound', users: 850 },
    { source: 'Referral', users: 200 },
    { source: 'Twitter', users: 600 },
]

export default function BusinessDashboard() {
    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-3xl font-light text-white mb-2 tracking-tight">Business Overview</h1>
                <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Global Telemetry · Q3 2026</p>
            </motion.div>

            {/* Top Value Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Net ARR", value: "$586,800", change: "+14.2%", icon: DollarSign, trend: "up" },
                    { label: "Active Users", value: "12,450", change: "+5.4%", icon: Users, trend: "up" },
                    { label: "Churn Rate", value: "2.1%", change: "-0.4%", icon: Activity, trend: "down" }, // Down is good for churn
                    { label: "Pipeline Value", value: "$1.2M", change: "+24%", icon: TrendingUp, trend: "up" },
                ].map((metric, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        key={metric.label}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-xl flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <metric.icon className="w-5 h-5 text-neutral-500" />
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border",
                                (metric.trend === "up" && metric.label !== "Churn Rate") || (metric.trend === "down" && metric.label === "Churn Rate")
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            )}>
                                {metric.change} <ArrowUpRight className={cn("w-3 h-3", metric.trend === "down" && "rotate-90")} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-light text-white mb-1">{metric.value}</h3>
                        <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">{metric.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Trajectory Graph (Takes 2 columns) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 p-6 rounded-3xl bg-black border border-white/[0.06] shadow-2xl overflow-hidden relative isolate"
                >
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10 opacity-50" />

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-white mb-1">Revenue Trajectory</h3>
                            <p className="text-xs text-neutral-500 font-mono">Monthly Recurring Revenue (MRR)</p>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MRR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#737373', fontFamily: 'monospace' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#737373', fontFamily: 'monospace' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="mrr" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pillar/Bar Graph (Takes 1 column) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-2xl flex flex-col"
                >
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-white mb-1">Acquisition Channels</h3>
                        <p className="text-xs text-neutral-500 font-mono">New Users by Source</p>
                    </div>

                    <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ACQUISITION_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a3a3a3', fontFamily: 'monospace' }} width={80} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                                />
                                <Bar dataKey="users" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.05]">
                        <p className="text-xs text-neutral-400 leading-relaxed font-light">
                            <strong className="text-teal-400 font-medium mr-1">Insight:</strong>Outbound agent activities generated 41% of total new pipeline traffic this month.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Zap, Crosshair, Target, CheckCircle2, ChevronRight, Activity, Network, ShieldAlert, ArrowRight, RefreshCw, Mail, MessageSquare, BarChart3, Clock, ArrowUp, ZapIcon, Command, Plug } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { EDTECH_TASKS, Task, LEAD_POOL } from "@/lib/mock-sales-data"

type Tab = "chat" | "dashboard" | "results" | "history" | "integrations"

const NAV_ITEMS = [
    { id: "chat", label: "Agent Chat", icon: Command, color: "text-orange-400", bg: "bg-orange-500", shadow: "shadow-[0_0_12px_rgba(251,146,60,0.6)]" },
    { id: "dashboard", label: "Telemetry Dashboard", icon: Activity, color: "text-cyan-400", bg: "bg-cyan-500", shadow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]" },
    { id: "results", label: "Latest Results", icon: Target, color: "text-emerald-400", bg: "bg-emerald-500", shadow: "shadow-[0_0_12px_rgba(52,211,153,0.6)]" },
    { id: "history", label: "Task History", icon: Clock, color: "text-indigo-400", bg: "bg-indigo-500", shadow: "shadow-[0_0_12px_rgba(129,140,248,0.6)]" },
    { id: "integrations", label: "Agent Integrations", icon: Plug, color: "text-rose-400", bg: "bg-rose-500", shadow: "shadow-[0_0_12px_rgba(244,63,94,0.6)]" },
]

export function ClientFinder() {
    const [activeTab, setActiveTab] = useState<Tab>("chat")
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

    // Chat State
    const [messages, setMessages] = useState([
        { role: "agent", text: "Autonomous Outbound Agent online. Operating under directive: Scale Ingen X0. I am ready to scrape legacy LMS signals, prioritize university decision-makers, and draft targeted pipeline injections. What is our objective today?" }
    ])
    const [input, setInput] = useState("")

    // Dashboard Exec State
    const [executing, setExecuting] = useState(false)
    const [executed, setExecuted] = useState(false)

    // Dynamic Telemetry State
    const [historyTasks, setHistoryTasks] = useState<Task[]>(EDTECH_TASKS)
    const [selectedTaskId, setSelectedTaskId] = useState<string>("task-150")
    const activeTask = historyTasks.find(t => t.id === selectedTaskId) || historyTasks[0]
    const [searchQuery, setSearchQuery] = useState("")

    const handleExecute = () => {
        setExecuting(true)
        setTimeout(() => {
            setExecuting(false)
            setExecuted(true)
        }, 2500)
    }

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userText = input
        setMessages(prev => [...prev, { role: "user", text: userText }])
        setInput("")

        // Determine if it's a known simulated prompt to generate a rich payload
        const isEdTechScrape = userText.toLowerCase().includes("scrape linkedin for deans");
        const isDraftSequence = userText.toLowerCase().includes("draft sequence for canvas");

        setTimeout(() => {
            const taskId = `task-${Math.floor(Math.random() * 900) + 200}` // Generate a random task ID

            // Create a fake task payload
            const newTask: Task = {
                id: taskId,
                query: userText,
                date: "Just Now",
                status: "Success",
                runTime: isEdTechScrape ? "34.2s" : isDraftSequence ? "8.5s" : "12.1s",
                leads: isEdTechScrape ? [LEAD_POOL[0], LEAD_POOL[2], LEAD_POOL[4]] : isDraftSequence ? [LEAD_POOL[1], LEAD_POOL[3]] : [LEAD_POOL[0]],
                remediation: {
                    type: "success",
                    title: isEdTechScrape ? "High-Signal Intent Target Found" : isDraftSequence ? "Sequence Generation Complete" : "Task Execution Finished",
                    description: isEdTechScrape ? "Successfully extracted 3 Dean profiles actively engaging with LMS migration content." : "Drafted a 3-part sequence focusing exclusively on grading-rubric pain points.",
                    actionTitle: "Proceed to Injection Phase",
                    actionDescription: "The selected targets or sequences are ready to be deployed into the active Salesforce queue.",
                    buttonText: "Approve & Deploy"
                }
            }

            // Prepend new task to history
            setHistoryTasks(prev => [newTask, ...prev])

            // Provide rich chat feedback
            setMessages(prev => [
                ...prev,
                {
                    role: "agent",
                    text: `Execution complete. I've processed your directive: "${userText}". The telemetry and payload have been logged under Task ID: ${taskId}.`,
                    taskId: taskId // Attach task ID for interactive button in UI
                }
            ])
        }, 2500)
    }

    const filteredHistory = historyTasks.filter(h => h.query.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleTaskClick = (taskId: string) => {
        setSelectedTaskId(taskId)
        setActiveTab("results")
    }

    return (
        <div className="flex h-screen w-full bg-[#080808] text-white font-sans overflow-hidden relative isolate">

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.012)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[200px] bg-cyan-500/5 blur-[100px] pointer-events-none -z-10" />

            {/* NEW SALES SIDEBAR */}
            <div
                className={cn(
                    "flex flex-col py-4 bg-zinc-800 border border-white/10 shrink-0 z-50 transition-all duration-300 ease-out group/sidebar m-4 max-h-[calc(100vh-2rem)] my-auto rounded-[2.5rem] shadow-2xl relative gap-2",
                    isSidebarExpanded ? "w-72 px-4 items-start" : "w-[68px] items-center"
                )}
                onMouseEnter={() => setIsSidebarExpanded(true)}
                onMouseLeave={() => setIsSidebarExpanded(false)}
            >
                {/* Logo area - Now points back to /dashboard to exit Sales Agent mode */}
                <Link href="/dashboard" className={cn("flex items-center px-0 w-full mb-4", isSidebarExpanded ? "justify-start px-2 gap-3" : "justify-center")}>
                    <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 hover:bg-white/5">
                        <Image src="/logo.jpg" alt="AssembleOne Logo" width={32} height={32} className="w-9 h-9 object-contain rounded-md" />
                    </div>
                    <div className={cn(
                        "flex flex-col overflow-hidden transition-all duration-300",
                        isSidebarExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                    )}>
                        <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">Assemble</span>
                        <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase whitespace-nowrap">Home</span>
                    </div>
                </Link>

                {/* Nav Items */}
                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 w-full items-center mt-6">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeTab === item.id

                        return (
                            <div key={item.label} className="w-full flex flex-col gap-0 items-center">
                                <button
                                    onClick={() => setActiveTab(item.id as Tab)}
                                    className={cn(
                                        "h-10 flex items-center transition-all duration-200 relative group w-full",
                                        isSidebarExpanded ? "justify-start px-3" : "justify-center"
                                    )}
                                >
                                    {/* Active Indicator (Left Bar) */}
                                    {isActive && (
                                        <div className={cn(
                                            "absolute w-1 h-6 rounded-r-full transition-all duration-300",
                                            item.bg,
                                            item.shadow,
                                            isSidebarExpanded ? "-left-4" : "left-0"
                                        )} />
                                    )}

                                    {/* Icon Wrapper */}
                                    <div className={cn(
                                        "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 shrink-0",
                                        isActive ? item.color : cn("text-white/40 group-hover:text-white group-hover:bg-white/5", `group-hover:${item.color.replace('text-', 'text-opacity-100 text-')}`)
                                    )}>
                                        {/* Icon glow on active */}
                                        {isActive && (
                                            <div className={cn("absolute inset-0 rounded-xl opacity-20 filter blur-md", item.bg)} />
                                        )}
                                        <item.icon className="w-5 h-5 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    {/* Label (Expanded) */}
                                    <span className={cn(
                                        "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ml-3 text-left",
                                        isSidebarExpanded ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 absolute",
                                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                    )}>
                                        {item.label}
                                    </span>

                                    {/* Tooltip on Hover (Collapsed Only) */}
                                    {!isSidebarExpanded && (
                                        <div className="absolute left-16 px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60] shadow-xl">
                                            {item.label}
                                        </div>
                                    )}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col items-center bg-[#050505] relative z-10 border-l border-white/[0.04]">

                {/* Panel Header */}
                <div className="w-full h-14 px-5 shrink-0 border-b border-white/[0.04] flex items-center justify-between bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-tight">Sales & Outbound Agent</p>
                            <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono mt-0.5">
                                {NAV_ITEMS.find(n => n.id === activeTab)?.label}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">Agent Active</span>
                    </div>
                </div>

                <div className="flex-1 w-full overflow-hidden relative z-10 custom-scrollbar shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]">
                    <AnimatePresence mode="wait">

                        {/* VIEW 1: CHAT */}
                        {activeTab === "chat" && (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="h-full flex flex-col max-w-4xl mx-auto w-full p-8"
                            >
                                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pb-6 pr-4">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                                            <div className={cn(
                                                "max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed",
                                                msg.role === "user"
                                                    ? "bg-white/[0.05] border border-white/[0.1] text-white"
                                                    : "bg-[#050505] border border-white/[0.04] text-neutral-300 shadow-xl"
                                            )}>
                                                {msg.role === "agent" && (
                                                    <div className="flex items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                                        <Crosshair className="w-3 h-3" /> Sales Agent
                                                    </div>
                                                )}
                                                {msg.text}
                                                {/* If this message contains a simulated task ID, render an interactive "View Results" button */}
                                                {(msg as any).taskId && (
                                                    <div className="mt-4 pt-4 border-t border-white/[0.05]">
                                                        <button
                                                            onClick={() => handleTaskClick((msg as any).taskId)}
                                                            className="flex items-center gap-2 text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-colors px-4 py-2 rounded-lg w-fit"
                                                        >
                                                            <Target className="w-3.5 h-3.5" /> View Extracted Payload
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 shrink-0 flex flex-col gap-3">
                                    {/* Action Chips */}
                                    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 -mx-2 px-2">
                                        {[
                                            "Scrape LinkedIn for Deans of Innovation",
                                            "Draft sequence for Canvas defectors",
                                            "Analyze Blackboard procurement contracts",
                                            "A/B test 'Shadow Pilot' pitch"
                                        ].map((suggestion, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setInput(suggestion)}
                                                className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.2] transition-colors text-xs text-neutral-300 font-light"
                                            >
                                                <Search className="w-3 h-3 text-cyan-500" />
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                    <form onSubmit={handleSend} className="relative">
                                        <input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Instruct the Agent (e.g., 'Draft a sequence for Deans fed up with Canvas')..."
                                            className="w-full h-14 bg-[#050505] border border-white/[0.08] rounded-2xl pl-5 pr-14 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-light"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim()}
                                            className="absolute right-2 top-2 h-10 w-10 bg-white hover:bg-neutral-200 text-black rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ArrowUp className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 2: DASHBOARD */}
                        {activeTab === "dashboard" && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="h-full flex flex-col overflow-y-auto custom-scrollbar p-8"
                            >
                                <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

                                    <div className="lg:col-span-3 grid grid-cols-3 gap-6">
                                        <div className="bg-[#050505] border border-white/[0.05] rounded-2xl p-6 shadow-xl">
                                            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5">Acquisition Target</p>
                                            <span className="text-3xl font-light text-white">24/50</span>
                                            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded w-fit">
                                                <Activity className="w-3 h-3" /> Pacing: Healthy
                                            </div>
                                        </div>
                                        <div className="bg-[#050505] border border-white/[0.05] rounded-2xl p-6 shadow-xl">
                                            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5">Reply Rate</p>
                                            <span className="text-3xl font-light text-white">2.4%</span>
                                            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded w-fit">
                                                <ShieldAlert className="w-3 h-3" /> Critical Drop-off
                                            </div>
                                        </div>
                                        <div className="bg-[#050505] border border-white/[0.05] rounded-2xl p-6 shadow-xl">
                                            <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1.5">Meetings Booked</p>
                                            <span className="text-3xl font-light text-white">14</span>
                                            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded w-fit">
                                                Weekly Goal: 12
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pipeline Stream */}
                                    <div className="lg:col-span-3 bg-[#030303] flex flex-col border border-white/[0.04] rounded-3xl p-8 relative isolate overflow-hidden">
                                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <Network className="w-3.5 h-3.5 text-indigo-400" /> Funnel Telemetry Map
                                        </h3>

                                        {/* Geometric Node Flow */}
                                        <div className="h-[200px] w-full relative flex items-center justify-center border border-white/[0.04] bg-[#020202] rounded-2xl p-6">
                                            <div className="flex items-center w-full justify-between relative z-10">
                                                <div className="absolute top-8 left-[10%] right-[10%] h-px bg-white/[0.05] -z-10" />
                                                <FlowStage label="Discovered" val="120" />
                                                <FlowStage label="Contacted" val="85" isNode />
                                                <div className="flex flex-col items-center relative">
                                                    <div className="w-16 h-16 rounded-full border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)] flex items-center justify-center mb-3 bg-[#050505]">
                                                        <Network className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
                                                    </div>
                                                    <p className="text-xl font-light leading-none mb-1 text-rose-400">32</p>
                                                    <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase">Replied</p>
                                                </div>
                                                <FlowStage label="Meeting" val="14" />
                                                <FlowStage label="Closed" val="8" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 3: RESULTS */}
                        {activeTab === "results" && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="h-full flex flex-col overflow-y-auto custom-scrollbar p-8"
                            >
                                <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left: Target Profiles */}
                                    <div className="flex flex-col h-full bg-[#050505] border border-white/[0.05] rounded-3xl p-6 shadow-xl">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                                <ZapIcon className="w-3.5 h-3.5 text-cyan-400" /> Scraped Targets ({activeTask.leads.length})
                                            </h3>
                                            <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-mono font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Task: {activeTask.id.toUpperCase()}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {activeTask.leads.length === 0 ? (
                                                <div className="py-8 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest border border-dashed border-white/10 rounded-xl">
                                                    No Individual Targets
                                                </div>
                                            ) : (
                                                activeTask.leads.map((lead, i) => (
                                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all group">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent border border-white/10 flex items-center justify-center shrink-0 text-[10px] font-mono text-cyan-200">
                                                                {lead.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{lead.name}</p>
                                                                <p className="text-[10px] text-neutral-500 font-mono">{lead.title} @ {lead.company}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[9px] text-neutral-600 mb-0.5 uppercase tracking-widest font-mono">Agent Score</span>
                                                            <span className={cn(
                                                                "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border",
                                                                lead.score > 90 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                            )}>{lead.score} / 100</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Remediation Protocol */}
                                    <div className="flex flex-col h-full">
                                        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Zap className={cn("w-3.5 h-3.5", activeTask.remediation.type === "warning" ? "text-amber-400" : activeTask.remediation.type === "success" ? "text-emerald-400" : "text-cyan-400")} />
                                            Executive Remediation
                                        </h3>
                                        <div className={cn(
                                            "p-4 rounded-xl border mb-6 flex items-start gap-3",
                                            activeTask.remediation.type === "warning" ? "border-rose-500/20 bg-rose-500/5" :
                                                activeTask.remediation.type === "success" ? "border-emerald-500/20 bg-emerald-500/5" :
                                                    "border-cyan-500/20 bg-cyan-500/5"
                                        )}>
                                            <ShieldAlert className={cn(
                                                "w-5 h-5 mt-0.5 shrink-0",
                                                activeTask.remediation.type === "warning" ? "text-rose-400" :
                                                    activeTask.remediation.type === "success" ? "text-emerald-400" :
                                                        "text-cyan-400"
                                            )} />
                                            <div>
                                                <h4 className={cn(
                                                    "text-sm font-semibold mb-1",
                                                    activeTask.remediation.type === "warning" ? "text-rose-200" :
                                                        activeTask.remediation.type === "success" ? "text-emerald-200" :
                                                            "text-cyan-200"
                                                )}>{activeTask.remediation.title}</h4>
                                                <p className={cn(
                                                    "text-xs leading-relaxed font-light",
                                                    activeTask.remediation.type === "warning" ? "text-rose-200/70" :
                                                        activeTask.remediation.type === "success" ? "text-emerald-200/70" :
                                                            "text-cyan-200/70"
                                                )}>
                                                    {activeTask.remediation.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 rounded-3xl border bg-white/[0.01] border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent p-6 flex flex-col relative isolate overflow-hidden">
                                            <div className="flex justify-between items-start mb-4 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 border-indigo-500/30 flex items-center justify-center">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                    <h4 className="text-base font-medium text-white">{activeTask.remediation.actionTitle}</h4>
                                                </div>
                                            </div>
                                            <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                                                {activeTask.remediation.actionDescription}
                                            </p>
                                            <div className="mt-auto">
                                                <button className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-neutral-200 flex items-center justify-center gap-3 group">
                                                    {activeTask.remediation.buttonText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 4: HISTORY */}
                        {activeTab === "history" && (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="h-full flex flex-col max-w-5xl mx-auto w-full p-8"
                            >
                                <div className="flex w-full justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-xl font-light text-white mb-1">Task History</h3>
                                        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Global Audit Log</p>
                                    </div>
                                    <div className="relative w-72">
                                        <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search previous operations..."
                                            className="w-full h-10 bg-[#050505] border border-white/[0.08] rounded-xl pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-all font-light"
                                        />
                                    </div>
                                </div>

                                <div className="bg-[#050505] border border-white/[0.05] rounded-3xl overflow-hidden shadow-xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                                <th className="py-4 px-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-normal">Task ID</th>
                                                <th className="py-4 px-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-normal">Operation Query</th>
                                                <th className="py-4 px-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-normal">Timestamp</th>
                                                <th className="py-4 px-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-normal">Duration</th>
                                                <th className="py-4 px-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-normal">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHistory.map((row, i) => (
                                                <motion.tr
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                                                    key={row.id}
                                                    onClick={() => handleTaskClick(row.id)}
                                                    className="border-b border-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group"
                                                >
                                                    <td className="py-4 px-6 text-xs font-mono text-cyan-400">{row.id}</td>
                                                    <td className="py-4 px-6 text-sm text-neutral-300 font-light group-hover:text-white transition-colors">{row.query}</td>
                                                    <td className="py-4 px-6 text-xs font-mono text-neutral-500">{row.date}</td>
                                                    <td className="py-4 px-6 text-xs font-mono text-neutral-500">{row.runTime}</td>
                                                    <td className="py-4 px-6">
                                                        {row.status === "Success" ? (
                                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono uppercase text-emerald-400 w-fit">
                                                                <CheckCircle2 className="w-3 h-3" /> {row.status}
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] font-mono uppercase text-amber-400 w-fit">
                                                                <ShieldAlert className="w-3 h-3" /> {row.status}
                                                            </span>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {filteredHistory.length === 0 && (
                                        <div className="py-12 text-center text-sm font-mono text-neutral-500 uppercase tracking-widest">
                                            No Operations Found
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 5: INTEGRATIONS */}
                        {activeTab === "integrations" && (
                            <motion.div
                                key="integrations"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="h-full flex flex-col max-w-5xl mx-auto w-full p-8"
                            >
                                <div className="flex w-full justify-between items-center mb-10">
                                    <div>
                                        <h3 className="text-xl font-light text-white mb-1">Agent Integrations</h3>
                                        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Connect Data Sources & Execution Engines</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <IntegrationCard name="Apollo.io" category="Data Provider" status="connected" icon="Database" />
                                    <IntegrationCard name="LinkedIn Sales Nav" category="Intent Signals" status="connected" icon="Network" />
                                    <IntegrationCard name="Instantly.ai" category="Execution Engine" status="connected" icon="Mail" />
                                    <IntegrationCard name=" Salesforce" category="System of Record" status="connected" icon="Activity" />
                                    <IntegrationCard name="Perplexity API" category="Enrichment" status="available" icon="Zap" />
                                    <IntegrationCard name="SendGrid" category="SMTP Relay" status="available" icon="Mail" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function IntegrationCard({ name, category, status, icon }: { name: string, category: string, status: "connected" | "available", icon: string }) {
    return (
        <div className="bg-[#050505] border border-white/[0.05] rounded-3xl p-6 shadow-xl flex flex-col group hover:border-white/[0.1] hover:bg-white/[0.02] transition-colors cursor-pointer relative isolate overflow-hidden">
            {status === "connected" && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -z-10 group-hover:bg-emerald-500/20 transition-colors" />
            )}
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                    <Plug className="w-5 h-5 text-white/70" />
                </div>
                {status === "connected" ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded font-mono text-[10px] uppercase text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Connected
                    </span>
                ) : (
                    <span className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.1] rounded font-mono text-[10px] uppercase text-neutral-400">
                        Available
                    </span>
                )}
            </div>
            <div className="mt-auto">
                <h4 className="text-base font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">{name}</h4>
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{category}</p>
            </div>
        </div>
    )
}

function FlowStage({ label, val, isNode }: { label: string, val: string, isNode?: boolean }) {
    return (
        <div className="flex flex-col items-center relative">
            <div className={cn(
                "w-16 h-16 bg-[#050505] rounded-full flex items-center justify-center mb-3",
                isNode ? "border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] border" : "border border-white/10"
            )}>
                {isNode && <div className="absolute top-1/2 left-[60%] w-full h-[2px] bg-gradient-to-r from-cyan-500/50 to-transparent -translate-y-1/2" />}
                <span className={cn("text-xl font-light", isNode ? "text-cyan-400" : "text-neutral-400")}>{val}</span>
            </div>
            <p className={cn("text-[10px] font-mono tracking-wider uppercase", isNode ? "text-cyan-400" : "text-neutral-500")}>{label}</p>
        </div>
    )
}

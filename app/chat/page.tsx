"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Brain, BarChart3, Search, TrendingUp, Zap, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { Comfortaa } from "next/font/google"
import { OmniLogo } from "@/components/omni-logo"
import Image from "next/image"
import PMSidebar from "@/app/pm/components/PMSidebar"
import { parseCentralAgentIntent, AgentMode } from "@/app/pm/lib/agent-core"

// Panel components
import { PerformanceDashboard } from "@/components/assemble/PerformanceDashboard"
import { ProductIntelligence } from "@/components/assemble/ProductIntelligence"
import { FinanceAnalyzer } from "@/components/assemble/FinanceAnalyzer"
import { BusinessAnalyst } from "@/components/assemble/BusinessAnalyst"
import { ClientFinder } from "@/components/assemble/ClientFinder"
import { AutomationEngine } from "@/components/assemble/AutomationEngine"
import { GlobalInfluence } from "@/components/assemble/GlobalInfluence"

const font = Comfortaa({ subsets: ["latin"], display: "swap" })

type ViewMode = "coworker" | "performance" | "intelligence" | "finance" | "analyst" | "clients" | "automation" | "global"
type ChatMessage = {
    role: "user" | "agent"
    content: string
    timestamp: Date
    isStep?: boolean
    tone?: "hot" | "cold" | "neutral"
    nextAction?: string
}

const QUICK_PROMPTS = [
    { icon: Activity, label: "Why sales dropping?", prompt: "Why are my sales dropping this week?" },
    { icon: BarChart3, label: "Performance", prompt: "Show me my performance dashboard" },
    { icon: Search, label: "Find leads", prompt: "Find me 20 SaaS founders in Sydney who recently raised pre-seed" },
    { icon: TrendingUp, label: "Check MRR", prompt: "Show me my MRR and churn this month" },
    { icon: Brain, label: "What to focus on", prompt: "What should I focus on this week?" },
    { icon: Zap, label: "Automation", prompt: "Show me my automation chains" },
]

const VIEW_LABELS: Record<ViewMode, string> = {
    coworker: "Co-Worker Agent",
    performance: "Performance Dashboard",
    intelligence: "Product Intelligence",
    finance: "Finance Analyzer",
    analyst: "Business Analyst",
    clients: "Client Finder",
    automation: "Automation Engine",
    global: "Global Product Influence",
}

const agentModeToView: Record<string, ViewMode> = {
    performance: "performance",
    intelligence: "intelligence",
    finance: "finance",
    analyst: "analyst",
    clients: "clients",
    automation: "automation",
    global: "global",
}

function AssembleAppCore() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const urlView = (searchParams.get("view") || "coworker") as ViewMode
    const [panelView, setPanelView] = useState<ViewMode>(urlView)
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "agent",
            content: "Good afternoon, Founder. I'm your Co-Worker — always on, always watching.\n\nHere's where your business stands:\n• MRR: $3,240 (+6% this week)\n• 1 product needs urgent attention — health score 23/100\n• Client pipeline: 4 active leads\n• PMF Score: 61/100\n\nTry: 'Why are my sales dropping?' or 'Find me 20 founders in Sydney'",
            timestamp: new Date(),
            tone: "neutral",
        },
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    useEffect(() => {
        setPanelView(urlView)
    }, [urlView])

    const handleAgentQuery = async (userMsg: string) => {
        setIsTyping(true)
        setMessages(prev => [...prev, { role: "user", content: userMsg, timestamp: new Date() }])

        const response = await parseCentralAgentIntent(userMsg)

        if (response.steps && response.steps.length > 0) {
            for (const step of response.steps) {
                setMessages(prev => [...prev, {
                    role: "agent",
                    content: `> ${step}`,
                    timestamp: new Date(),
                    isStep: true,
                }])
                await new Promise(r => setTimeout(r, 500))
            }
        } else {
            await new Promise(r => setTimeout(r, 700))
        }

        setIsTyping(false)

        // Route to panel based on agent mode
        if (response.mode !== "unknown" && response.mode !== "idle" && agentModeToView[response.mode]) {
            const newView = agentModeToView[response.mode]
            setPanelView(newView)
            router.push(`/chat?view=${newView}`)
        }

        setMessages(prev => [...prev, {
            role: "agent",
            content: response.message,
            timestamp: new Date(),
            tone: response.tone,
            nextAction: response.nextAction,
        }])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return
        const msg = inputValue.trim()
        setInputValue("")
        await handleAgentQuery(msg)
    }

    const RightPanel = () => {
        switch (panelView) {
            case "performance": return <PerformanceDashboard onProductClick={() => { setPanelView("intelligence"); router.push("/chat?view=intelligence") }} />
            case "intelligence": return <ProductIntelligence />
            case "finance": return <FinanceAnalyzer />
            case "analyst": return <BusinessAnalyst />
            case "clients": return <ClientFinder />
            case "automation": return <AutomationEngine />
            case "global": return <GlobalInfluence />
            default: return (
                <div className="h-full flex flex-col items-center justify-center gap-8 p-8">
                    <motion.div
                        animate={{ scale: [1, 1.03, 1], filter: ["hue-rotate(0deg)", "hue-rotate(20deg)", "hue-rotate(0deg)"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex items-center justify-center p-10 rounded-full bg-white/[0.02] border border-white/[0.05]"
                    >
                        <OmniLogo size={72} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] z-10" />
                        <div className="absolute inset-0 rounded-full border border-white/[0.08] animate-[spin_12s_linear_infinite]" />
                        <div className="absolute inset-[-16px] rounded-full border border-dashed border-white/[0.04] animate-[spin_22s_linear_infinite_reverse]" />
                    </motion.div>
                    <div className="text-center max-w-sm">
                        <h3 className="text-xl font-semibold text-white mb-2">Co-Worker Active</h3>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Type a command to open a module, or click a nav item on the left to navigate directly to that feature.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                        {QUICK_PROMPTS.slice(0, 4).map((qp, i) => (
                            <button
                                key={i}
                                onClick={() => handleAgentQuery(qp.prompt)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] text-xs text-neutral-400 hover:text-white transition-all text-left"
                            >
                                <qp.icon className="w-3.5 h-3.5 shrink-0" />
                                {qp.label}
                            </button>
                        ))}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={cn("flex h-screen w-full bg-[#080808] text-white overflow-hidden", font.className)}>

            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.012)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[200px] bg-indigo-500/5 blur-[100px] pointer-events-none" />

            {/* Sidebar */}
            <PMSidebar />

            {/* Co-Worker Chat (always visible) */}
            <div className="w-[360px] min-w-[320px] border-r border-white/[0.04] bg-black/20 flex flex-col relative z-10 shrink-0">
                {/* Chat Header */}
                <div className="h-14 px-4 shrink-0 border-b border-white/[0.04] flex items-center gap-3 bg-black/30 backdrop-blur-md">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                        <Image src="/logo.jpg" alt="Co-Worker" width={28} height={28} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Co-Worker Agent</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest">Online · Monitoring</span>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn("flex flex-col max-w-[88%]", msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start")}
                        >
                            {!msg.isStep && (
                                <span className={cn("text-[9px] uppercase tracking-widest mb-1 px-1 font-semibold", msg.role === "user" ? "text-white/25" : "text-indigo-400/70")}>
                                    {msg.role === "user" ? "You" : "Co-Worker"}
                                </span>
                            )}
                            <div className={cn(
                                "px-4 py-3 rounded-2xl text-[12.5px] leading-relaxed whitespace-pre-wrap relative overflow-hidden",
                                msg.isStep
                                    ? "bg-transparent border border-white/[0.04] text-neutral-600 font-mono text-[10px] !py-1.5 !rounded-lg shadow-none"
                                    : msg.role === "user"
                                        ? "backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-indigo-50 rounded-br-sm border border-indigo-500/30 shadow-[0_8px_32px_-12px_rgba(99,102,241,0.4)]"
                                        : "backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] text-neutral-200 rounded-bl-sm shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]"
                            )}>
                                {msg.content}
                            </div>
                            {msg.nextAction && (
                                <motion.button
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => handleAgentQuery(msg.nextAction!)}
                                    className="mt-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 rounded-lg transition-all flex items-center gap-1.5"
                                >
                                    {msg.nextAction} →
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col mr-auto items-start max-w-[88%]">
                            <span className="text-[9px] text-indigo-400/60 uppercase tracking-widest mb-1 px-1 font-semibold">Co-Worker</span>
                            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.06] flex items-center gap-1.5">
                                {[0, 0.2, 0.4].map((delay, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.4, repeat: Infinity, delay }}
                                        className="w-1.5 h-1.5 rounded-full bg-indigo-400/60"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/[0.04] bg-black/20">
                    {/* Quick Prompts */}
                    <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
                        {QUICK_PROMPTS.map((qp, i) => (
                            <button
                                key={i}
                                onClick={() => handleAgentQuery(qp.prompt)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-[10px] text-neutral-500 hover:text-white transition-all whitespace-nowrap shrink-0"
                            >
                                <qp.icon className="w-3 h-3" />
                                {qp.label}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder="Ask your co-worker anything..."
                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-3 pl-4 pr-11 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/30 focus:bg-white/[0.06] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "absolute right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                inputValue.trim() && !isTyping
                                    ? "bg-white text-black hover:scale-105"
                                    : "bg-white/10 text-white/20"
                            )}
                        >
                            <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Panel — Dynamic Module View */}
            <div className="flex-1 flex flex-col overflow-hidden border-l border-white/[0.04]">
                {/* Panel Header */}
                <div className="h-14 px-5 shrink-0 border-b border-white/[0.04] flex items-center justify-between bg-black/20 backdrop-blur-md">
                    <div>
                        <p className="text-sm font-bold text-white">{VIEW_LABELS[panelView]}</p>
                        <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
                            {panelView === "coworker" ? "F1 · Primary Interface" :
                                panelView === "performance" ? "F2 · Live Monitoring" :
                                    panelView === "intelligence" ? "F3 · Root Cause AI" :
                                        panelView === "finance" ? "F4 · Revenue Intelligence" :
                                            panelView === "analyst" ? "F5 · Business Strategy" :
                                                panelView === "clients" ? "F6 · Lead Engine" :
                                                    "F7 · Execution Layer"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">Agent Active</span>
                    </div>
                </div>

                {/* Panel Content */}
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={panelView}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <RightPanel />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default function AssembleApp() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full bg-[#080808] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <OmniLogo size={40} className="text-white animate-pulse" />
                    <p className="text-xs text-neutral-600 font-mono uppercase tracking-widest">Initializing Co-Worker...</p>
                </div>
            </div>
        }>
            <AssembleAppCore />
        </Suspense>
    )
}

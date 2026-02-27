"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Brain, BarChart3, Bot, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { OmniLogo } from "@/components/omni-logo"
import { parseCentralAgentIntent, AgentMode } from "@/app/pm/lib/agent-core"
import { SALES_PMF_DATA, SALES_RADAR_STREAMS, SALES_REVENUE_DATA, SALES_AGENTS, SALES_RESEARCH_DATA, SALES_OUTREACH_DATA, SALES_FORECAST_DATA, SALES_POACHING_DATA, SALES_OBJECTION_DATA, SALES_PRICING_DATA, SALES_FOLLOW_UP_DATA, SALES_LEAD_SCORING_DATA, SALES_WAR_ROOM_DATA, SALES_INTEGRATIONS_DATA } from "@/lib/sales-engine-data"
import { PMFEngine } from "@/components/sales/pmf-engine"
import { TrendRadar } from "@/components/sales/trend-radar"
import { RevenueIntel } from "@/components/sales/revenue-intel"
import { GrowthTeamStatus } from "@/components/sales/growth-team"
import { ResearchDeepDive } from "@/components/sales/research-deep-dive"
import { OutreachCampaign } from "@/components/sales/outreach-campaign"
import { BudgetAllocator } from "@/components/sales/budget-allocator"
import { PoachingScanner } from "@/components/sales/poaching-scanner"
import { ObjectionHandler } from "@/components/sales/objection-handler"
import { PricingOptimizer } from "@/components/sales/pricing-optimizer"
import { AutoFollowUp } from "@/components/sales/auto-follow-up"
import { LeadScoring } from "@/components/sales/lead-scoring"
import { WarRoom } from "@/components/sales/war-room"
import { IntegrationsHub } from "@/components/sales/integrations-hub"

// Geist / Inter mapping
const font = Inter({ subsets: ["latin"], display: "swap" })

type ChatMessage = { role: "user" | "agent"; content: string; timestamp: Date; isStep?: boolean; tone?: "hot" | "cold" | "neutral"; nextAction?: string }

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function AgentChatCore() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q")
    const [mode, setMode] = useState<AgentMode>("idle")
    const [messages, setMessages] = useState<ChatMessage[]>([{
        role: "agent",
        content: "Good afternoon, Founder. I am your Central Growth Agent. I have full context on your product, stage, and goals.\n\nWhat do we grow today? Tell me your revenue goal, current challenge, or next big idea.",
        timestamp: new Date()
    }])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    // Handle incoming query params from sidebar
    useEffect(() => {
        if (query) {
            handleAgentQuery(query)
        }
    }, [query])

    // Generalized intent handler
    const handleAgentQuery = async (userMsg: string) => {
        setIsTyping(true)
        setMessages(prev => [...prev, { role: "user", content: userMsg, timestamp: new Date() }])

        const response = await parseCentralAgentIntent(userMsg)

        if (response.steps && response.steps.length > 0) {
            for (const step of response.steps) {
                setMessages(prev => [...prev, { role: "agent", content: `> ${step}`, timestamp: new Date(), isStep: true }])
                await new Promise(r => setTimeout(r, 600)) // cinematic delay
            }
        } else {
            await new Promise(r => setTimeout(r, 800))
        }

        setIsTyping(false)
        setMode(response.mode === "unknown" ? mode : response.mode)
        setMessages(prev => [...prev, { role: "agent", content: response.message, timestamp: new Date(), tone: response.tone, nextAction: response.nextAction }])
    }

    // Intent parser integration (form submit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMsg = inputValue.trim()
        setInputValue("")
        await handleAgentQuery(userMsg)
    }

    return (
        <div className={cn("flex h-screen w-full bg-[#050505] text-white overflow-hidden font-sans selection:bg-white/20", font.className)}>

            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

            {/* ─── LEFT PANE: CENTRAL CONVERSATIONAL INTERFACE (40%) ─── */}
            <div className="w-[40%] min-w-[400px] border-r border-white/[0.04] bg-transparent flex flex-col relative z-10 shadow-[20px_0_40px_rgba(0,0,0,0.5)]">

                {/* Header */}
                <div className="h-16 px-6 shrink-0 border-b border-white/[0.04] flex items-center gap-3 bg-white/[0.01] backdrop-blur-md">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center drop-shadow-md">
                        <OmniLogo size={20} className="text-black" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold tracking-tight text-white/90">Central Growth Agent</h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                            <span className="text-[10px] uppercase tracking-widest text-indigo-400/80 font-bold">Online & Tracking</span>
                        </div>
                    </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex flex-col max-w-[85%]",
                                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                            )}
                        >
                            {!msg.isStep && (
                                <span className={cn("text-[10px] uppercase tracking-widest mb-1.5 px-1 font-semibold", msg.role === "user" ? "text-white/30" : "text-indigo-400/80")}>
                                    {msg.role === "user" ? "You" : "Growth Agent"}
                                </span>
                            )}
                            <div className={cn(
                                "px-5 py-3.5 rounded-[1.5rem] text-[13px] leading-relaxed font-medium whitespace-pre-wrap shadow-lg",
                                msg.isStep
                                    ? "bg-white/[0.01] border border-white/5 text-indigo-400 font-mono text-[11px] shadow-none !py-2.5 !rounded-lg"
                                    : msg.role === "user"
                                        ? "bg-white/10 text-white border border-white/20 rounded-tr-sm backdrop-blur-md"
                                        : msg.tone === "hot"
                                            ? "bg-indigo-500/5 border border-indigo-500/30 text-white/90 rounded-tl-sm backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                            : msg.tone === "cold"
                                                ? "bg-black border border-white/20 text-white/80 rounded-tl-sm backdrop-blur-md italic font-mono"
                                                : "bg-white/[0.05] border border-white/[0.08] text-white/90 rounded-tl-sm backdrop-blur-md"
                            )}>
                                {msg.content}
                            </div>
                            {msg.nextAction && (
                                <motion.button
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => setInputValue(`Execute: ${msg.nextAction}`)}
                                    className="mt-3 ml-2 px-4 py-2 text-[11px] font-bold tracking-widest uppercase bg-white/10 hover:bg-indigo-500 text-white hover:text-white border border-white/20 hover:border-indigo-500 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2"
                                >
                                    {msg.nextAction} <ArrowUpRight className="w-3 h-3" />
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col mr-auto items-start max-w-[85%]">
                            <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5 px-1 font-semibold">Growth Agent</span>
                            <div className="px-5 py-4 rounded-[1.5rem] bg-white/[0.05] border border-white/[0.08] rounded-tl-sm backdrop-blur-md flex items-center gap-1.5">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent sticky bottom-0">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Message your agent..."
                            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-[1.5rem] py-3.5 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all backdrop-blur-xl shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "absolute right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                                inputValue.trim() && !isTyping ? "bg-indigo-500 text-white hover:scale-105 shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "bg-white/10 text-white/30"
                            )}
                        >
                            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                    </form>
                    <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-white/40 font-semibold uppercase tracking-widest">
                        <button type="button" onClick={() => setInputValue("Analyze PMF for DevTools")} className="flex items-center gap-2 hover:text-white transition-colors group">
                            <Brain className="w-3.5 h-3.5 text-white/30 group-hover:text-indigo-400 transition-colors" /> PMF Analysis
                        </button>
                        <button type="button" onClick={() => setInputValue("Show active pipeline")} className="flex items-center gap-2 hover:text-white transition-colors group">
                            <BarChart3 className="w-3.5 h-3.5 text-white/30 group-hover:text-indigo-400 transition-colors" /> Live Pipeline
                        </button>
                        <button type="button" onClick={() => setInputValue("Check agent status")} className="flex items-center gap-2 hover:text-white transition-colors group">
                            <Bot className="w-3.5 h-3.5 text-white/30 group-hover:text-indigo-400 transition-colors" /> Growth Team
                        </button>
                        <button type="button" onClick={() => setInputValue("Initiate War Room macro")} className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                            <Terminal className="w-3.5 h-3.5 text-white/30 group-hover:text-red-500 transition-colors" /> War Room
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT PANE: DYNAMIC WIDGETS (60%) ─── */}
            <div className="flex-1 relative z-0 flex flex-col items-center justify-center p-8 overflow-hidden bg-transparent">
                <AnimatePresence mode="wait">

                    {/* IDLE STATE */}
                    {mode === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
                            className="flex flex-col items-center gap-8 text-center"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.02, 1], filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative flex items-center justify-center p-8 rounded-full bg-white/[0.02] border border-white/[0.05] shadow-[0_0_60px_rgba(255,255,255,0.05)]"
                            >
                                <OmniLogo size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                <div className="absolute inset-0 rounded-full border border-white/10 opacity-50 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/5 opacity-30 animate-[spin_20s_linear_infinite_reverse]" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-light tracking-tight text-white mb-3">Awaiting Commands</h3>
                                <p className="text-sm text-white/40 font-medium max-w-sm mx-auto leading-relaxed">
                                    The Central Agent is online. Provide a prompt on the left to activate intelligence modules.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* DYNAMIC WIDGETS */}
                    {mode === "pmf_analysis" && <PMFEngine data={SALES_PMF_DATA} />}
                    {mode === "radar" && <TrendRadar streams={SALES_RADAR_STREAMS} />}
                    {mode === "pipeline" && <RevenueIntel data={SALES_REVENUE_DATA} />}
                    {mode === "growth_team" && <GrowthTeamStatus agents={SALES_AGENTS as any} />}
                    {mode === "research_deep_dive" && <ResearchDeepDive data={SALES_RESEARCH_DATA} />}
                    {mode === "outreach_campaign" && <OutreachCampaign data={SALES_OUTREACH_DATA} />}
                    {mode === "revenue_analytics" && <RevenueIntel data={SALES_REVENUE_DATA} />}
                    {mode === "budget_allocator" && <BudgetAllocator data={SALES_FORECAST_DATA as any} />}
                    {mode === "poaching_hunter" && <PoachingScanner data={SALES_POACHING_DATA as any} />}
                    {mode === "objection_handler" && <ObjectionHandler data={SALES_OBJECTION_DATA as any} />}
                    {mode === "pricing_optimizer" && <PricingOptimizer data={SALES_PRICING_DATA as any} />}
                    {mode === "auto_follow_up" && <AutoFollowUp data={SALES_FOLLOW_UP_DATA as any} />}
                    {mode === "lead_scoring" && <LeadScoring data={SALES_LEAD_SCORING_DATA as any} />}
                    {mode === "war_room" && <WarRoom data={SALES_WAR_ROOM_DATA as any} />}
                    {mode === "integrations" && <IntegrationsHub data={SALES_INTEGRATIONS_DATA as any} />}

                </AnimatePresence>
            </div>
        </div>
    )
}

export default function CentralAgentCommandCenter() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full bg-[#050505] items-center justify-center text-indigo-400">Initializing Growth Neural Net...</div>}>
            <AgentChatCore />
        </Suspense>
    )
}


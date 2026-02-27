"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowUpRight, AlertOctagon, Clock, Globe,
    Activity, Cpu, Save, Terminal, FileText, CheckCircle2,
    Layers, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { generateArchitectBlueprint, InterviewBlueprint } from "@/lib/architect-data"

type Message = { id: string, role: "user" | "ai", content: string }

export default function SandboxArchitectView() {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "ai", content: "Architect System Online. Initialize blueprint parameters by describing the target role.\n\nE.g. 'Build a senior frontend engineer work simulation focusing on Next.js performance'." }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [blueprint, setBlueprint] = useState<InterviewBlueprint | null>(null)
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    const handleSend = async (customInput?: string) => {
        const text = typeof customInput === 'string' ? customInput : input
        if (!text.trim()) return

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: text }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Dynamic AI Logic
        setTimeout(() => {
            const generated = generateArchitectBlueprint(text)
            setBlueprint(generated)

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: `Blueprint generated for ${generated.seniority} ${generated.role}. Analyzing ${generated.constraints.focus} requirements...`
            }

            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1200)
    }

    const handleExport = () => {
        if (!blueprint) return
        const template = {
            id: `custom-${Date.now()}`,
            role: blueprint.role,
            title: `Architect: ${blueprint.role}`,
            difficulty: blueprint.seniority,
            duration: blueprint.constraints.time,
            skills: blueprint.rubric.map(r => r.category),
            description: `${blueprint.summary}\n\nTasks:\n${blueprint.tasks.map((t, i) => `${i + 1}. ${t.title}: ${t.description}`).join('\n')}`
        }
        localStorage.setItem("worksim_draft_template", JSON.stringify(template))
        router.push("/pm/worksim")
    }

    return (
        <div className="flex h-full w-full bg-[#000000] text-white overflow-hidden font-sans selection:bg-indigo-500/30">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

            {/* ─── LEFT PANE: NEURAL CHAT INTERFACE (40%) ─── */}
            <div className="w-[40%] min-w-[400px] border-r border-white/[0.04] bg-transparent flex flex-col relative z-10 shadow-[20px_0_40px_rgba(0,0,0,0.5)]">

                {/* Header */}
                <div className="h-16 px-6 shrink-0 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.01] backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center drop-shadow-md">
                            <Cpu className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold tracking-tight text-white/90">Assessment Architect</h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(48,209,88,0.8)]" />
                                <span className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-bold">Builder Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex flex-col max-w-[85%]",
                                msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                            )}
                        >
                            <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5 px-1 font-semibold">
                                {msg.role === "user" ? "You" : "Architect"}
                            </span>
                            <div className={cn(
                                "px-5 py-3.5 rounded-[1.5rem] text-[13px] leading-relaxed font-medium whitespace-pre-wrap shadow-lg",
                                msg.role === "user"
                                    ? "bg-white text-black rounded-tr-sm"
                                    : "bg-white/[0.05] border border-white/[0.08] text-white/90 rounded-tl-sm backdrop-blur-md"
                            )}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col mr-auto items-start max-w-[85%]">
                            <span className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5 px-1 font-semibold">Architect</span>
                            <div className="px-5 py-4 rounded-[1.5rem] bg-white/[0.05] border border-white/[0.08] rounded-tl-sm backdrop-blur-md flex items-center gap-1.5">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                            </div>
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent sticky bottom-0">
                    {blueprint && !isTyping && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 custom-scrollbar">
                            <ActionChip onClick={() => handleSend(`Make the ${blueprint.role} interview significantly harder`)} label="Increase Difficulty" color="red" />
                            <ActionChip onClick={() => handleSend(`Switch ${blueprint.role} to Async Mode`)} label="Async Mode" color="blue" />
                            <ActionChip onClick={() => handleSend(`Add a system design nuance`)} label="Add Nuance" color="purple" />
                        </div>
                    )}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Describe the role to architect..."
                            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-[1.5rem] py-3.5 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all backdrop-blur-xl shadow-inner"
                            disabled={isTyping}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isTyping}
                            className={cn(
                                "absolute right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                                input.trim() && !isTyping ? "bg-white text-black hover:scale-105" : "bg-white/10 text-white/30"
                            )}
                        >
                            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT PANE: BLUEPRINT PREVIEW (60%) ─── */}
            <div className="flex-1 relative z-0 flex flex-col bg-transparent">

                {!blueprint ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/20 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                            <Layers className="w-10 h-10 opacity-30" />
                        </div>
                        <p className="text-base font-medium tracking-wide font-mono text-white/40">AWAITING SPECIFICATION</p>
                        <p className="text-xs mt-2 text-white/20">System idle. Ready to fabricate.</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 flex flex-col relative z-10"
                    >
                        {/* Blueprint Toolbar */}
                        <div className="h-16 flex items-center justify-between px-8 border-b border-white/[0.04] bg-white/[0.01] backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                                    Generated Blueprint
                                </div>
                                <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase">ID: {Date.now().toString().slice(-6)}</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 bg-transparent border border-white/5 transition-colors">
                                    Save Draft
                                </button>
                                <button onClick={handleExport} className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all">
                                    <Terminal className="w-3.5 h-3.5" /> Deploy
                                </button>
                            </div>
                        </div>

                        {/* Content Scroll */}
                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                            <div className="max-w-4xl mx-auto space-y-6">

                                {/* Header Card */}
                                <div className="p-8 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group hover:border-white/[0.1] transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <FileText className="w-32 h-32 text-indigo-400" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-[10px] text-indigo-400 font-bold mb-2 uppercase tracking-widest">Target Configuration</div>
                                        <h1 className="text-4xl font-black text-white tracking-tight mb-4">{blueprint.role}</h1>
                                        <div className="flex items-center gap-3 mb-8">
                                            <Badge icon={Cpu} label={blueprint.seniority} color="emerald" />
                                            <Badge icon={Clock} label={blueprint.constraints.time} color="blue" />
                                            <Badge icon={Globe} label={blueprint.constraints.mode} color="purple" />
                                        </div>
                                        <div className="pt-6 border-t border-white/[0.05]">
                                            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">Executive Summary</div>
                                            <p className="text-sm text-white/70 font-medium leading-relaxed max-w-2xl">{blueprint.summary}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills / Proof */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05]">
                                        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Eval Matrix</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {blueprint.rubric.map((skill, i) => (
                                                <div key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.03] text-xs font-semibold text-white/80">
                                                    {skill.category}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-[1.5rem] bg-emerald-500/[0.03] border border-emerald-500/10">
                                        <h3 className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Proof Definition
                                        </h3>
                                        <p className="text-sm text-emerald-400/80 font-medium leading-relaxed">
                                            "{blueprint.proofDefinition}"
                                        </p>
                                    </div>
                                </div>

                                {/* Task Flow Timeline */}
                                <div className="pt-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Activity className="w-4 h-4 text-indigo-400" />
                                        <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Simulation Timeline</h3>
                                    </div>

                                    <div className="relative space-y-6">
                                        {/* Vertical Timeline Line */}
                                        <div className="absolute left-[20px] top-6 bottom-6 w-px bg-white/[0.05]" />

                                        {blueprint.tasks.map((task, i) => (
                                            <div key={i} className="relative pl-14 group">
                                                {/* Node */}
                                                <div className={cn(
                                                    "absolute left-0 top-3 w-10 h-10 rounded-full flex items-center justify-center bg-[#050505] z-10 transition-colors duration-300 border border-white/[0.1]",
                                                    task.type === 'chaos' ? "text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" :
                                                        task.type === 'stretch' ? "text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]" :
                                                            "text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                                )}>
                                                    <span className="font-bold text-sm tracking-tighter">{i + 1}</span>
                                                </div>

                                                {/* Card */}
                                                <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.03] group-hover:border-white/[0.08] transition-all relative overflow-hidden">
                                                    <div className="flex justify-between items-start mb-3 relative z-10">
                                                        <h4 className="text-lg font-bold text-white tracking-tight">{task.title}</h4>
                                                        <span className="text-xs font-semibold text-white/40">{task.duration}</span>
                                                    </div>
                                                    <div className="flex gap-2 mb-4 relative z-10">
                                                        <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full",
                                                            task.type === 'chaos' ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                                                task.type === 'stretch' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                                                    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                        )}>{task.type} PHASE</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-white/60 leading-relaxed mb-6 relative z-10">{task.description}</p>

                                                    {/* Failure Modes */}
                                                    <div className="p-4 rounded-xl bg-red-500/[0.02] border border-red-500/[0.05] relative z-10">
                                                        <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                                            <AlertOctagon className="w-3 h-3" /> Failure Protocol
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            {task.failureModes.map((fm, idx) => (
                                                                <div key={idx} className="text-xs font-medium text-white/50 flex items-start gap-2">
                                                                    <span className="text-red-500/50 mt-0.5">•</span> {fm}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Decorative background glow for card based on type */}
                                                    <div className={cn(
                                                        "absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2",
                                                        task.type === 'chaos' ? "bg-amber-500" :
                                                            task.type === 'stretch' ? "bg-purple-500" :
                                                                "bg-emerald-500"
                                                    )} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-8" /> {/* Spacer */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

function ActionChip({ onClick, label, color }: { onClick: () => void, label: string, color: string }) {
    const colors: Record<string, string> = {
        red: "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20",
        blue: "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20",
        purple: "bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20",
    }
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-full border text-[10px] whitespace-nowrap font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shrink-0",
                colors[color]
            )}
        >
            {label}
        </button>
    )
}

function Badge({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
    const colors: Record<string, string> = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    }
    return (
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-widest shadow-sm", colors[color])}>
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
        </div>
    )
}

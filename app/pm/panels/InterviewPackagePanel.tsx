"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X, ClipboardList, Clock, MessageSquare, ShieldCheck, BookOpen, Users,
    ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, Zap, LayoutTemplate
} from "lucide-react"
import {
    DEMO_PLAYBOOK_PLAN,
    DEMO_DISCOVERY_BANK, IMPACT_CONFIG,
    DEMO_OBJECTION_HANDLING, REACTION_CONFIG,
    DEMO_PERSONA_VARIANTS,
    DEMO_BATTLECARD_GUIDANCE,
    DEMO_SDR_BRIEFING,
} from "@/lib/pm-interview-data"

type Tab = 'blueprint' | 'discovery' | 'objections' | 'personas' | 'battlecard' | 'briefing'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'blueprint', label: 'Call Blueprint', icon: LayoutTemplate },
    { key: 'discovery', label: 'Discovery Qs', icon: MessageSquare },
    { key: 'objections', label: 'Objections', icon: Zap },
    { key: 'personas', label: 'Personas', icon: Users },
    { key: 'battlecard', label: 'Battlecard', icon: ShieldCheck },
    { key: 'briefing', label: 'SDR Briefing', icon: BookOpen },
]

const SECTION_COLORS: Record<string, string> = {
    intro: 'border-white/40 bg-white/5',
    technical: 'border-white/40 bg-white/5',
    'system-design': 'border-white/40 bg-white/5',
    closing: 'border-zinc-500/40 bg-zinc-500/5',
}

export default function InterviewPackagePanel({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<Tab>('blueprint')
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

    const toggleExpand = (id: string) => {
        setExpandedItems(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-white">Discovery Call Architect</h2>
                        <p className="text-[11px] text-white/40 uppercase tracking-wider">Dynamic Sales Playbook</p>
                    </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white/40" />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-3 pb-1 flex gap-1 overflow-x-auto border-b border-white/[0.06] custom-scrollbar">
                {TABS.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${tab === t.key
                            ? 'bg-white/15 text-zinc-300 border border-white/30'
                            : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
                            }`}
                    >
                        <t.icon className="w-3.5 h-3.5" />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tab === 'blueprint' && <BlueprintTab />}
                        {tab === 'discovery' && <DiscoveryTab expandedItems={expandedItems} toggleExpand={toggleExpand} />}
                        {tab === 'objections' && <ObjectionsTab />}
                        {tab === 'personas' && <PersonasTab />}
                        {tab === 'battlecard' && <BattlecardTab expandedItems={expandedItems} toggleExpand={toggleExpand} />}
                        {tab === 'briefing' && <BriefingTab expandedItems={expandedItems} toggleExpand={toggleExpand} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ─── Blueprint Tab ──────────────────────────────────────────────────────────────── */
function BlueprintTab() {
    const plan = DEMO_PLAYBOOK_PLAN
    const totalMinutes = plan.sections.reduce((s, sec) => s + sec.durationMinutes, 0)

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-white">{plan.roleTitle}</h3>
                    <p className="text-[11px] text-zinc-300/80 mt-0.5">{plan.totalDuration} • Targeted for VP Eng</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                    <Clock className="w-3 h-3 text-zinc-300" />
                    <span className="text-[10px] text-zinc-300 font-medium">{totalMinutes} min total</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
                {plan.sections.map((sec, i) => (
                    <div key={sec.id} className={`relative rounded-xl border p-4 ${SECTION_COLORS[sec.type] || 'border-white/10 bg-white/[0.02]'}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">{i + 1}</span>
                                <div>
                                    <h4 className="text-[13px] font-semibold text-white">{sec.title}</h4>
                                    {sec.interviewer && <p className="text-[10px] text-white/40 mt-0.5">Assigned to: {sec.interviewer}</p>}
                                </div>
                            </div>
                            <span className="text-[10px] text-white/50 font-mono bg-white/[0.06] px-2 py-0.5 rounded">{sec.duration}</span>
                        </div>

                        <div className="space-y-2 mb-3">
                            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Call Objectives</p>
                            <div className="flex flex-wrap gap-1.5">
                                {sec.objectives.map((obj, j) => (
                                    <span key={j} className="text-[10px] text-white/60 bg-white/[0.06] px-2 py-0.5 rounded-full">{obj}</span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Scripted Probes</p>
                            {sec.probes.slice(0, 2).map((p, j) => (
                                <p key={j} className="text-[11px] text-white/50 pl-3 border-l-2 border-white/10">{p}</p>
                            ))}
                        </div>

                        {/* Duration bar */}
                        <div className="mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-white/60 to-white/20" style={{ width: `${(sec.durationMinutes / totalMinutes) * 100}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Discovery Tab ─────────────────────────────────────────────────────────── */
function DiscoveryTab({ expandedItems, toggleExpand }: { expandedItems: Set<string>; toggleExpand: (id: string) => void }) {
    const categories = ['pain', 'budget', 'authority', 'timeline'] as const
    const catConfig: Record<string, { label: string; color: string }> = {
        pain: { label: 'Pain Identification', color: 'text-zinc-300' },
        budget: { label: 'Budget & Cost', color: 'text-stone-300' },
        authority: { label: 'Authority Mapping', color: 'text-zinc-300' },
        timeline: { label: 'Timeline & Urgency', color: 'text-zinc-300' },
    }

    return (
        <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">BANT Discovery Bank</h3>
                <span className="text-[10px] text-white/40">{DEMO_DISCOVERY_BANK.length} questions</span>
            </div>

            {categories.map(cat => {
                const qs = DEMO_DISCOVERY_BANK.filter(q => q.category === cat)
                if (!qs.length) return null
                return (
                    <div key={cat} className="space-y-2">
                        <h4 className={`text-[11px] font-semibold uppercase tracking-wider ${catConfig[cat].color}`}>{catConfig[cat].label}</h4>
                        {qs.map(q => {
                            const dc = IMPACT_CONFIG[q.impact]
                            const isOpen = expandedItems.has(q.id)
                            return (
                                <div key={q.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                                    <button onClick={() => toggleExpand(q.id)} className="w-full px-4 py-3 flex items-start gap-3 text-left">
                                        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] text-white/80">{q.question}</p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${dc.color}`}>{dc.label}</span>
                                                <span className="text-[9px] text-white/30">{q.competency}</span>
                                                <span className="text-[9px] text-white/20">•</span>
                                                <span className="text-[9px] text-white/30">{q.timeAllocation}</span>
                                            </div>
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            className="px-4 pb-3 border-t border-white/[0.06] pt-3 space-y-2"
                                        >
                                            <div>
                                                <p className="text-[10px] text-zinc-300/80 font-medium mb-1">✅ Buying Signals (Green Flags)</p>
                                                {q.expectedSignals.map((s, i) => (
                                                    <p key={i} className="text-[11px] text-white/50 pl-3 border-l border-white/20 mb-1">{s}</p>
                                                ))}
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-neutral-400/80 font-medium mb-1">🚩 Deal Risk (Red Flags)</p>
                                                {q.redFlags.map((f, i) => (
                                                    <p key={i} className="text-[11px] text-white/50 pl-3 border-l border-neutral-500/20 mb-1">{f}</p>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

/* ─── Objections Tab ────────────────────────────────────────────────────────── */
function ObjectionsTab() {
    const grouped = DEMO_OBJECTION_HANDLING.reduce((acc, fu) => {
        if (!acc[fu.baseQuestion]) acc[fu.baseQuestion] = []
        acc[fu.baseQuestion].push(fu)
        return acc
    }, {} as Record<string, typeof DEMO_OBJECTION_HANDLING>)

    return (
        <div className="space-y-5 animate-fade-in">
            <div>
                <h3 className="text-sm font-semibold text-white">Dynamic Objection Handling</h3>
                <p className="text-[11px] text-white/40 mt-0.5">Adapts based on prospect's tone and reaction</p>
            </div>

            {Object.entries(grouped).map(([question, followUps]) => (
                <div key={question} className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-1">Common Objection</p>
                        <p className="text-[12px] text-white/70 font-medium">{question}</p>
                    </div>
                    <div className="p-3 space-y-2">
                        {followUps.map(fu => {
                            const rc = REACTION_CONFIG[fu.reaction]
                            return (
                                <div key={fu.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${rc.color}`}>{rc.icon} {rc.label} Response</span>
                                    </div>
                                    <p className="text-[11px] text-white/60 mb-1.5">{fu.followUp}</p>
                                    <p className="text-[10px] text-white/30 italic">Strategy: {fu.purpose}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ─── Personas Tab ────────────────────────────────────────────────────────── */
function PersonasTab() {
    const grouped = DEMO_PERSONA_VARIANTS.reduce((acc, v) => {
        if (!acc[v.originalId]) acc[v.originalId] = []
        acc[v.originalId].push(v)
        return acc
    }, {} as Record<string, typeof DEMO_PERSONA_VARIANTS>)

    const original = DEMO_DISCOVERY_BANK.reduce((acc, q) => {
        acc[q.id] = q
        return acc
    }, {} as Record<string, (typeof DEMO_DISCOVERY_BANK)[number]>)

    return (
        <div className="space-y-5 animate-fade-in">
            <div>
                <h3 className="text-sm font-semibold text-white">Persona Context Variants</h3>
                <p className="text-[11px] text-white/40 mt-0.5">Modify your pitch based on who joins the call</p>
            </div>

            {Object.entries(grouped).map(([origId, variants]) => (
                <div key={origId} className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-1">Original Discovery Probe</p>
                        <p className="text-[12px] text-white/70 font-medium">{original[origId]?.question || origId}</p>
                    </div>
                    <div className="p-3 grid gap-2">
                        {variants.map(v => (
                            <div key={v.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-semibold text-zinc-300">{v.variantLabel}</span>
                                </div>
                                <p className="text-[11px] text-white/60 mb-1.5">{v.question}</p>
                                <p className="text-[10px] text-zinc-300/80">Context: {v.context}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ─── Battlecard Tab ──────────────────────────────────────────────────────────── */
function BattlecardTab({ expandedItems, toggleExpand }: { expandedItems: Set<string>; toggleExpand: (id: string) => void }) {
    return (
        <div className="space-y-5 animate-fade-in">
            <div>
                <h3 className="text-sm font-semibold text-white">Decision Criteria Battlecard</h3>
                <p className="text-[11px] text-white/40 mt-0.5">Scoring rules for deal progression</p>
            </div>

            {DEMO_BATTLECARD_GUIDANCE.map(g => {
                const isOpen = expandedItems.has(g.id)
                return (
                    <div key={g.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                        <button onClick={() => toggleExpand(g.id)} className="w-full px-4 py-3 flex items-start gap-2 text-left">
                            {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />}
                            <p className="text-[12px] text-white/70 font-medium">{g.question}</p>
                        </button>
                        {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-3">
                                <div>
                                    <p className="text-[10px] text-zinc-300/80 font-medium mb-1">🎯 Probing Strategy</p>
                                    {g.probingStrategy.map((s, i) => (
                                        <p key={i} className="text-[11px] text-white/50 pl-3 border-l border-white/20 mb-1">{s}</p>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[10px] text-zinc-300/80 font-medium mb-1">✅ Green Flags</p>
                                        {g.greenFlags.map((f, i) => (
                                            <p key={i} className="text-[10px] text-white/40 mb-0.5 flex items-start gap-1"><CheckCircle2 className="w-3 h-3 text-zinc-300/60 shrink-0 mt-0.5" />{f}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-400/80 font-medium mb-1">🚩 Red Flags</p>
                                        {g.redFlags.map((f, i) => (
                                            <p key={i} className="text-[10px] text-white/40 mb-0.5 flex items-start gap-1"><AlertTriangle className="w-3 h-3 text-neutral-400/60 shrink-0 mt-0.5" />{f}</p>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-stone-300/80 font-medium mb-1.5">📊 MEDDIC Score</p>
                                    <div className="space-y-1">
                                        {g.scoringCriteria.map(sc => (
                                            <div key={sc.score} className="flex items-center gap-2">
                                                <span className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center text-[10px] font-bold text-white/60">{sc.score}</span>
                                                <p className="text-[10px] text-white/40">{sc.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

/* ─── Briefing Tab ──────────────────────────────────────────────────────── */
function BriefingTab({ expandedItems, toggleExpand }: { expandedItems: Set<string>; toggleExpand: (id: string) => void }) {
    return (
        <div className="space-y-5 animate-fade-in">
            <div>
                <h3 className="text-sm font-semibold text-white">SDR Briefing</h3>
                <p className="text-[11px] text-white/40 mt-0.5">Auto-generated pre-call recon instructions</p>
            </div>

            {DEMO_SDR_BRIEFING.map(ci => {
                const isOpen = expandedItems.has(ci.id)
                return (
                    <div key={ci.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                        <button onClick={() => toggleExpand(ci.id)} className="w-full px-4 py-3 flex items-center justify-between text-left">
                            <div className="flex items-center gap-3">
                                {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-white/30 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />}
                                <div>
                                    <p className="text-[12px] text-white/70 font-medium">{ci.section}</p>
                                    <p className="text-[10px] text-zinc-300/50 mt-0.5">Time limit: {ci.timeLimit}</p>
                                </div>
                            </div>
                        </button>
                        {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-3">
                                <div className="rounded-lg bg-white/[0.03] p-3">
                                    <p className="text-[11px] text-white/60">{ci.briefing}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-1.5">Expectations</p>
                                    {ci.expectations.map((e, i) => (
                                        <p key={i} className="text-[11px] text-white/50 pl-3 border-l border-white/10 mb-1">{e}</p>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[10px] text-zinc-300/80 font-medium mb-1">✅ Target actions</p>
                                        {ci.doList.map((d, i) => (
                                            <p key={i} className="text-[10px] text-white/40 mb-0.5">{d}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-400/80 font-medium mb-1">❌ Avoid</p>
                                        {ci.dontList.map((d, i) => (
                                            <p key={i} className="text-[10px] text-white/40 mb-0.5">{d}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

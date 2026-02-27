"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Network } from "lucide-react"

export interface IntegrationsData {
    totalSynced: number
    dataFlow: string
    status: string
    integrations: {
        name: string
        category: string
        status: string
        sync: string
        icon: string
    }[]
}

const brandIconMap: Record<string, string> = {
    "credit-card": "stripe",
    "linkedin": "linkedin",
    "cloud": "salesforce",
    "target": "hubspot",
    "slack": "slack",
    "github": "github",
    "figma": "figma",
    "file-text": "notion",
    "line-chart": "amplitude",
    "database": "postgresql",
    "mail": "gmail",
    "message-circle": "intercom",
    "video": "zoom",
    "layers": "airtable",
    "server": "amazonwebservices",
    "phone": "twilio",
    "send": "sendgrid",
    "search": "clearbit"
}

export function IntegrationsHub({ data }: { data: IntegrationsData }) {
    return (
        <motion.div
            key="integrations-hub"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-4xl h-full flex flex-col pt-4 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <Network className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white">Active Integrations Hub</h2>
                        <div className="text-[11px] font-mono text-indigo-400/80 uppercase tracking-widest mt-0.5">Global Data Sync: {data.status}</div>
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 flex flex-col items-end">
                    Monthly Volume <span className="text-white text-base">{data.dataFlow}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 pb-8 space-y-4">

                {/* Integrations Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.integrations.map((tool, i) => {
                        const iconSlug = brandIconMap[tool.icon]
                        return (
                            <div key={i} className="p-4 rounded-xl bg-[#050505] border border-white/10 flex flex-col justify-between hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-[20px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className="w-8 h-8 rounded border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
                                        {iconSlug ? (
                                            <div className="relative w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Image src={`https://cdn.simpleicons.org/${iconSlug}/white`} alt={tool.name} width={16} height={16} className="object-contain" unoptimized />
                                            </div>
                                        ) : (
                                            <Network className="w-4 h-4 text-white/70 group-hover:text-white" />
                                        )}
                                    </div>
                                    <span className="text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                        {tool.status}
                                    </span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-sm font-bold text-white mb-0.5">{tool.name}</div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] font-medium text-white/40">{tool.category}</span>
                                        <span className="text-[9px] font-mono text-indigo-300/60 uppercase">{tool.sync}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </motion.div>
    )
}

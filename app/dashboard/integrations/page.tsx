"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check, Cable, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    SiLinkedin,
    SiGithub,
    SiGoogle,
    SiSlack,
    SiNotion,
    SiFigma,
    SiIndeed,
    SiGreenhouse,
    SiSalesforce,
    SiHubspot,
    SiZendesk,
    SiStripe
} from "react-icons/si"

const INTEGRATION_LIST = [
    { name: "Stripe", icon: SiStripe, status: "Connected", desc: "Syncs MRR, Churn, and LTV for the Finance & Capital Agent." },
    { name: "LinkedIn", icon: SiLinkedin, status: "Connected", desc: "Autonomously scrapes target profiles and extracts intent signals." },
    { name: "GitHub", icon: SiGithub, status: "Connected", desc: "Monitors code velocity and links performance to PMF validation." },
    { name: "Google Analytics", icon: SiGoogle, status: "Connected", desc: "Base traffic, bounce rates, and session mapping." },
    { name: "Slack", icon: SiSlack, status: "Connected", desc: "Posts real-time root-cause alerts and agent remediation paths." },
    { name: "HubSpot", icon: SiHubspot, status: "Available", desc: "Inject pipeline contacts and log autonomous email outreach." },
    { name: "Notion", icon: SiNotion, status: "Available", desc: "Syncs 30-day GTM plans and executive business sprint data." },
    { name: "Salesforce", icon: SiSalesforce, status: "Available", desc: "Enterprise CRM mapping and deep revenue forecasting." },
]

export default function IntegrationsDirectory() {
    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full h-full overflow-y-auto custom-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-10 flex justify-between items-end"
            >
                <div>
                    <h1 className="text-3xl font-light text-white mb-2 tracking-tight">System Integrations</h1>
                    <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Data Ingestion Layer</p>
                </div>
                <button className="h-10 px-5 rounded-xl bg-white text-black font-semibold text-xs transition-colors hover:bg-neutral-200 flex items-center gap-2">
                    <Cable className="w-4 h-4" /> Add Integration
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {INTEGRATION_LIST.map((int, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        key={int.name}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-xl group hover:border-white/[0.1] transition-all flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-[#050505] border border-white/[0.05] flex items-center justify-center p-2.5 shadow-xl">
                                <int.icon className="w-full h-full text-white" />
                            </div>
                            {int.status === "Connected" ? (
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                                    <Check className="w-3 h-3" /> Active
                                </span>
                            ) : (
                                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-widest text-neutral-500 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">
                                    Connect
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-medium text-white mb-2">{int.name}</h3>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed flex-1 mb-6">
                            {int.desc}
                        </p>

                        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-neutral-500">
                            {int.status === "Connected" ? (
                                <span className="font-mono">Syncing live data...</span>
                            ) : (
                                <span className="font-mono flex items-center gap-1 group-hover:text-white transition-colors cursor-pointer">
                                    Requires Auth <ArrowRight className="w-3 h-3" />
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

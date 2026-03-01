"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, BrainCircuit, Users } from "lucide-react"

export function YCRfsSection() {
    return (
        <section className="py-24 px-6 relative border-b border-white/[0.04] bg-black overflow-hidden">
            {/* Subtle Background Glows */}
            <div className="absolute top-0 right-1/4 w-[30%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[30%] h-[50%] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight"
                    >
                        Built in direct response to Y Combinator’s Spring 2026 Requests for Startups
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-neutral-400 font-medium"
                    >
                        AssembleOne directly solves two opportunities YC partners are actively looking for.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group"
                    >
                        <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-indigo-400 uppercase">
                            <BrainCircuit className="w-4 h-4" />
                            <span>Y Combinator RFS</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Cursor for Product Managers
                        </h3>
                        <p className="text-neutral-400 leading-relaxed mb-8 flex-1">
                            Andrew Miklas called for an AI-native system that figures out what to build — turning customer interviews and usage data into validated feature roadmaps and tasks for coding agents.
                        </p>
                        <div className="pt-6 border-t border-white/10 mt-auto">
                            <p className="font-semibold text-white/90">
                                AssembleOne delivers exactly this as your full Digital Co-Founder.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group"
                    >
                        <div className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-[#FF6B00] uppercase">
                            <Users className="w-4 h-4" />
                            <span>Y Combinator RFS</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            AI-Native Agencies
                        </h3>
                        <p className="text-neutral-400 leading-relaxed mb-8 flex-1">
                            Aaron Epstein highlighted how AI turns traditional agencies into high-margin software businesses.
                        </p>
                        <div className="pt-6 border-t border-white/10 mt-auto">
                            <p className="font-semibold text-white/90">
                                AssembleOne lets any solo founder instantly run a scalable AI-native agency with autonomous client acquisition and delivery.
                            </p>
                        </div>
                    </motion.div>

                </div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <a
                        href="https://www.ycombinator.com/rfs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors duration-200 group"
                    >
                        Read the full Requests for Startups here
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

            </div>
        </section>
    )
}

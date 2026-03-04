"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    Command,
    BarChart3,
    Activity,
    TrendingUp,
    Target,
    Search,
    Zap,
    Settings,
    Globe,
} from "lucide-react"

const NAV_ITEMS = [
    {
        label: "Command Core",
        icon: Command,
        href: "/chat",
        exact: true,
        color: "text-orange-400",
        bg: "bg-orange-500",
        shadow: "shadow-[0_0_12px_rgba(251,146,60,0.6)]",
        view: "coworker",
    },
    {
        label: "Performance",
        icon: Activity,
        href: "/chat?view=performance",
        color: "text-cyan-400",
        bg: "bg-cyan-500",
        shadow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
        view: "performance",
    },
    {
        label: "Intelligence",
        icon: BarChart3,
        href: "/chat?view=intelligence",
        color: "text-purple-400",
        bg: "bg-purple-500",
        shadow: "shadow-[0_0_12px_rgba(168,85,247,0.6)]",
        view: "intelligence",
    },
    {
        label: "Finance",
        icon: TrendingUp,
        href: "/chat?view=finance",
        color: "text-emerald-400",
        bg: "bg-emerald-500",
        shadow: "shadow-[0_0_12px_rgba(52,211,153,0.6)]",
        view: "finance",
    },
    {
        label: "Business Analyst",
        icon: Target,
        href: "/chat?view=analyst",
        color: "text-amber-400",
        bg: "bg-amber-500",
        shadow: "shadow-[0_0_12px_rgba(251,191,36,0.6)]",
        view: "analyst",
    },
    {
        label: "Client Finder",
        icon: Search,
        href: "/chat?view=clients",
        color: "text-rose-400",
        bg: "bg-rose-500",
        shadow: "shadow-[0_0_12px_rgba(244,63,94,0.6)]",
        view: "clients",
    },
    {
        label: "Automation",
        icon: Zap,
        href: "/chat?view=automation",
        color: "text-indigo-400",
        bg: "bg-indigo-500",
        shadow: "shadow-[0_0_12px_rgba(129,140,248,0.6)]",
        view: "automation",
    },
    {
        label: "Global Influence",
        icon: Globe,
        href: "/chat?view=global",
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-500",
        shadow: "shadow-[0_0_12px_rgba(232,121,249,0.6)]",
        view: "global",
    },
]

export default function PMSidebar({ currentView = "coworker" }: { currentView?: string }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div
            className={cn(
                "flex flex-col py-4 bg-zinc-800 border border-white/10 shrink-0 z-50 transition-all duration-300 ease-out group/sidebar m-4 max-h-[calc(100vh-2rem)] my-auto rounded-[2.5rem] shadow-2xl relative gap-2",
                isExpanded ? "w-72 px-4 items-start" : "w-[68px] items-center"
            )}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Logo area */}
            <div className={cn("flex items-center px-0 w-full", isExpanded ? "justify-start px-2 gap-3" : "justify-center")}>
                <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 hover:bg-white/5">
                    <Image src="/logo.jpg" alt="AssembleOne Logo" width={32} height={32} className="w-9 h-9 object-contain rounded-md" />
                </div>
                <div className={cn(
                    "flex flex-col overflow-hidden transition-all duration-300",
                    isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                )}>
                    <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">Assemble</span>
                    <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase whitespace-nowrap">Founder OS</span>
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-1 w-full items-center mt-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = currentView === item.view

                    return (
                        <div key={item.label} className="w-full flex flex-col gap-0 items-center">
                            <Link
                                href={item.href}
                                className={cn(
                                    "h-10 flex items-center transition-all duration-200 relative group w-full",
                                    isExpanded ? "justify-start px-3" : "justify-center"
                                )}
                            >
                                {/* Active Indicator (Left Bar) */}
                                {isActive && (
                                    <div className={cn(
                                        "absolute w-1 h-6 rounded-r-full transition-all duration-300",
                                        item.bg,
                                        item.shadow,
                                        isExpanded ? "-left-4" : "left-0"
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
                                    "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ml-3",
                                    isExpanded ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 absolute",
                                    isActive ? "text-white" : "text-white/60 group-hover:text-white"
                                )}>
                                    {item.label}
                                </span>

                                {/* Tooltip on Hover (Collapsed Only) */}
                                {!isExpanded && (
                                    <div className="absolute left-16 px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60] shadow-xl">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        </div>
                    )
                })}
            </div>

            {/* Bottom Actions */}
            <div className={cn("mt-auto flex flex-col gap-2 w-full", isExpanded ? "px-2" : "px-0 items-center")}>
                <Link href="/" className={cn(
                    "h-10 flex items-center transition-all duration-200 relative group w-full cursor-pointer",
                    isExpanded ? "justify-start px-2" : "justify-center"
                )}>
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl text-white/40 group-hover:text-white group-hover:bg-white/5 transition-all">
                        <Settings className="w-5 h-5" />
                    </div>
                    <span className={cn(
                        "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ml-3 text-white/60 group-hover:text-white",
                        isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 absolute"
                    )}>
                        Home Page
                    </span>
                </Link>

                <div className={cn(
                    "flex items-center rounded-xl transition-all duration-300 cursor-pointer",
                    isExpanded ? "bg-white/5 pr-4 p-1 gap-3 hover:bg-white/10" : "p-0 justify-center w-10 h-10 hover:opacity-80"
                )}>
                    <div className="w-8 h-8 rounded-full ring-2 ring-black shrink-0 overflow-hidden relative bg-zinc-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">F</span>
                    </div>
                    <div className={cn(
                        "flex flex-col overflow-hidden transition-all duration-300",
                        isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                    )}>
                        <span className="text-xs font-semibold text-white whitespace-nowrap">Founder</span>
                        <span className="text-[10px] text-white/40 whitespace-nowrap">Admin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

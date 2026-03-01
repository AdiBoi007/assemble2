"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Brain,
    Bot,
    LayoutDashboard,
    Users,
    LineChart,
    Settings,
    Briefcase,
    Search,
    Network,
    Shield,
    Building2,
    Globe,
    Activity,
    Command,
    BookOpen,
    Zap,
    Crosshair,
    MessageSquareWarning,
    Calculator,
    Timer,
    Target,
    Terminal,
    Send,
} from "lucide-react"

import { MOCK_HISTORY } from "@/lib/demo-data"



export default function PMSidebar() {
    const pathname = usePathname()
    const [isExpanded, setIsExpanded] = useState(false)

    const navItems = [
        { label: "Command Core", icon: Command, href: "/chat", exact: true, color: "text-core-orange", bg: "bg-zinc-800", shadow: "shadow-[0_0_12px_rgba(255,107,0,0.6)]" },
        { label: "War Room Blitz", icon: Terminal, href: "/chat?q=war", color: "text-rose-500", bg: "bg-neutral-800", shadow: "shadow-[0_0_12px_rgba(244,63,94,0.6)]" },
        { label: "PMF Validation", icon: Shield, href: "/chat?q=pmf", color: "text-emerald-400", bg: "bg-zinc-800", shadow: "shadow-[0_0_12px_rgba(52,211,153,0.6)]" },
        { label: "Outbound AI", icon: Send, href: "/chat?q=outreach", color: "text-cyan-400", bg: "bg-zinc-800", shadow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]" },
        { label: "Lead Triage", icon: Target, href: "/chat?q=score", color: "text-amber-400", bg: "bg-stone-800", shadow: "shadow-[0_0_12px_rgba(251,191,36,0.6)]" },
        { label: "Active Integrations", icon: Network, href: "/chat?q=integrations", color: "text-indigo-400", bg: "bg-zinc-800", shadow: "shadow-[0_0_12px_rgba(129,140,248,0.6)]" },
    ]

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
                    <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">Forge AI</span>
                    <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase whitespace-nowrap">Growth OS</span>
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-1 w-full items-center">
                {navItems.map((item) => {
                    const isActive = (item as any).exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href)

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
                                    <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
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
                <button className={cn(
                    "h-10 flex items-center transition-all duration-200 relative group w-full",
                    isExpanded ? "justify-start px-2" : "justify-center"
                )}>
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl text-white/40 group-hover:text-white group-hover:bg-white/5 transition-all">
                        <Settings className="w-5 h-5" />
                    </div>
                    <span className={cn(
                        "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ml-3 text-white/60 group-hover:text-white",
                        isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 absolute"
                    )}>
                        Settings
                    </span>
                </button>

                <div className={cn(
                    "flex items-center rounded-xl transition-all duration-300",
                    isExpanded ? "bg-white/5 pr-4 p-1 gap-3" : "p-0 justify-center w-10 h-10"
                )}>
                    <div className="w-8 h-8 rounded-full ring-2 ring-black shrink-0 overflow-hidden relative">
                        <Image src="/placeholder-user.jpg" alt="User" fill className="object-cover" />
                    </div>
                    <div className={cn(
                        "flex flex-col overflow-hidden transition-all duration-300",
                        isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                    )}>
                        <span className="text-xs font-semibold text-white whitespace-nowrap">Adhiraj</span>
                        <span className="text-[10px] text-white/40 whitespace-nowrap">PM</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

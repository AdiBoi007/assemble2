"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Network, Settings, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { OmniLogo } from "@/components/omni-logo"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const navItems = [
        { href: "/dashboard", icon: BarChart3, label: "Business Analytics" },
        { href: "/dashboard/agents", icon: Users, label: "Agent Roster" },
        { href: "/dashboard/integrations", icon: Network, label: "Integrations" },
    ]

    return (
        <div className="flex h-screen bg-[#020202] text-white font-sans overflow-hidden selection:bg-white/20">

            {/* Structural Minimalist Sidebar */}
            <div className="w-[72px] hover:w-[240px] group transition-all duration-300 ease-in-out border-r border-white/[0.04] bg-[#020202]/80 backdrop-blur-3xl flex flex-col z-50 shrink-0 absolute inset-y-0 left-0 hover:shadow-[20px_0_40px_rgba(0,0,0,0.5)] md:relative">

                <div className="h-20 flex items-center px-6 border-b border-transparent shrink-0">
                    <Link href="/" className="flex items-center gap-3">
                        <OmniLogo size={24} className="text-white shrink-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                        <span className="font-bold tracking-tight text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Assemble</span>
                    </Link>
                </div>

                <div className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-hidden">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-all relative",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-neutral-500 hover:text-white hover:bg-white/[0.05]"
                                )}
                                title={item.label}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                )}
                                <item.icon className="w-5 h-5 shrink-0" />
                                <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-white/[0.04]">
                    <Link
                        href="/"
                        className="flex items-center gap-4 px-3 py-3 rounded-xl text-neutral-500 hover:text-white hover:bg-white/[0.05] transition-all"
                        title="Back to Website"
                    >
                        <ChevronLeft className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Exit to Website
                        </span>
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative isolate overflow-y-auto custom-scrollbar md:ml-0 ml-[72px]">
                {/* Subtle global gradient noise map for premium feel */}
                <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none -z-10" />
                {children}
            </div>

        </div>
    )
}

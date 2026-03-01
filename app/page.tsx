"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar"
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Brain,
  Users,
  Target,
  Award,
  TrendingUp,
  FileCheck,
  Sparkles,
  ChevronRight,
  BarChart3,
  Lock,
  Eye,
  GitBranch,
  FileText,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Star,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Minus,
} from "lucide-react"

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#E01E5A"
      d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
    />
    <path
      fill="#36C5F0"
      d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
    />
    <path
      fill="#2EB67D"
      d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
    />
    <path
      fill="#ECB22E"
      d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
    />
  </svg>
)

const NotionLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
  </svg>
)

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
    <path fill="#A259FF" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
    <path fill="#F24E1E" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
    <path fill="#FF7262" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
    <path fill="#1ABCFE" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
  </svg>
)

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#F25022" d="M0 0h11.377v11.377H0z" />
    <path fill="#00A4EF" d="M0 12.623h11.377V24H0z" />
    <path fill="#7FBA00" d="M12.623 0H24v11.377H12.623z" />
    <path fill="#FFB900" d="M12.623 12.623H24V24H12.623z" />
  </svg>
)

const IndeedLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#2164f3]" fill="currentColor">
    <path d="M11.566 21.5622v-8.0305c.2862.044.5765.066.8682.066 1.4573 0 2.7955-.5765 3.8027-1.518v9.4823c0 .8108-.3984 1.232-1.1873 1.232-.7847 0-1.188-.4212-1.188-1.232h-2.2956zm.8682-10.0247c-2.4102 0-4.3808-1.9702-4.3808-4.3805 0-2.4144 1.9706-4.3847 4.3808-4.3847 2.414 0 4.3847 1.9703 4.3847 4.3847 0 2.4103-1.9706 4.3805-4.3847 4.3805z" />
  </svg>
)

const GreenhouseLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#3ab549]" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const LeverLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1da1f2]" fill="currentColor">
    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 18a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
)

const WorkdayLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#ff6900]" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
)

const SeekLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d3880]" fill="currentColor">
    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44-3.84 0-7.13-2.99-7.13-7.27s3.29-7.27 7.13-7.27c3.04 0 4.82 1.94 4.82 1.94l1.91-1.97S16.32 2 12.19 2C6.42 2 2 6.7 2 12c0 5.21 4.29 10 10.26 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.16-1.81z" />
  </svg>
)

type IntegrationLogo = React.FC<React.SVGProps<SVGSVGElement>>

const INTEGRATIONS: { name: string; Logo: IntegrationLogo; color: string }[] = [
  { name: "LinkedIn", Logo: LinkedInLogo, color: "text-[#0A66C2]" },
  { name: "GitHub", Logo: GitHubLogo, color: "text-white" },
  { name: "Google", Logo: GoogleLogo, color: "" },
  { name: "Slack", Logo: SlackLogo, color: "" },
  { name: "Notion", Logo: NotionLogo, color: "text-white" },
  { name: "Figma", Logo: FigmaLogo, color: "" },
  { name: "Microsoft", Logo: MicrosoftLogo, color: "" },
  { name: "Indeed", Logo: IndeedLogo, color: "" },
  { name: "Greenhouse", Logo: GreenhouseLogo, color: "" },
  { name: "Lever", Logo: LeverLogo, color: "" },
  { name: "Workday", Logo: WorkdayLogo, color: "" },
  { name: "Seek", Logo: SeekLogo, color: "" },
]

const STATS = [
  { value: "10x", label: "Faster Time from Idea to Live Product" },
  { value: "3x", label: "More Revenue Channels Activated by Agents" },
  { value: "<24h", label: "Average Time from Goal to Deployed MVP" },
  { value: "24/7", label: "Agents Working While You Sleep" },
]

const FORGE_VS_CRM = [
  { feature: "Product Building (No-Code)", forge: true, ats: false },
  { feature: "Product-Market Fit Validation", forge: true, ats: false },
  { feature: "Go-to-Market Strategy", forge: true, ats: false },
  { feature: "Outbound Sales Execution", forge: true, ats: "partial" },
  { feature: "Marketing Campaign Management", forge: true, ats: false },
  { feature: "Competitor & Market Monitoring", forge: true, ats: false },
  { feature: "Revenue & Growth Forecasting", forge: true, ats: false },
  { feature: "Requires a Full Engineering Team", forge: false, ats: true },
  { feature: "Requires Dedicated Sales Hire", forge: true, ats: true },
  { feature: "High Monthly Burn Rate", forge: true, ats: true },
]

const INTELLIGENCE_MODULES = [
  { name: "PMF Validation Engine", icon: Target, description: "Test value props before building features" },
  { name: "Live Trend Radar", icon: BarChart3, description: "Scan HackerNews/X for buying signals" },
  { name: "Revenue Forecaster", icon: TrendingUp, description: "Predictive ARR & Churn Modeling" },
  { name: "Agentic Outreach", icon: MessageSquare, description: "Self-optimizing email campaigns" },
  { name: "Market Blueprint", icon: Briefcase, description: "Autogenerated 30-day GTM plans" },
]

const AUTOMATION_TIERS = [
  {
    tier: "Full Autopilot",
    multiplier: "1.0x",
    description: "Agents build, launch, sell, and iterate your entire company with zero human input.",
    color: "text-emerald-400",
  },
  {
    tier: "Founder Approval Mode",
    multiplier: "0.7x",
    description: "Agents prepare everything — you approve before anything goes live.",
    color: "text-blue-400",
  },
  { tier: "Co-Pilot Mode", multiplier: "0.4x", description: "Agents suggest what to build and who to target; you stay hands-on with execution.", color: "text-amber-400" },
  { tier: "Research Mode", multiplier: "0.15x", description: "Agents gather market data, competitor insights, and lead intelligence for you.", color: "text-orange-400" },
  { tier: "DIY Mode", multiplier: "0x", description: "You handle everything manually; agents are on standby.", color: "text-red-400" },
]

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const numericTarget = Number.parseInt(target.replace(/\D/g, "")) || 0
    const duration = 2000
    const steps = 60
    const increment = numericTarget / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, target])

  const displayValue = target.includes("x")
    ? `${count}x`
    : target.includes("%")
      ? `${count}%`
      : target.includes("s")
        ? `${count}s`
        : target

  return (
    <span ref={ref} className="tabular-nums">
      {isVisible ? displayValue : target}
    </span>
  )
}

// Floating animation wrapper
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "6s",
      }}
    >
      {children}
    </div>
  )
}

export default function EcosystemLandingPage() {
  const [activeTab, setActiveTab] = useState<"sdrs" | "founders">("sdrs")
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Central Agent",
      link: "/chat",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      highlight: true,
    },
    { name: "How it Works", link: "#how-it-works" },
    { name: "For SDRs", link: "#for-sdrs" },
    { name: "For Founders", link: "#for-founders" },
    { name: "Integrations", link: "#integrations" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 grid-background opacity-50 pointer-events-none" />
      <div className="fixed inset-0 radial-glow pointer-events-none" />

      {/* Navigation */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2.5 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <Image src="/forge-logo.png" alt="AssembleOne" width={24} height={24} />
            </div>
            <span className="text-lg font-black tracking-tight text-foreground">AssembleOne</span>
          </Link>
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            <NavbarButton href="/pm" variant="secondary">Sign In</NavbarButton>
            <NavbarButton href="/pm" variant="primary">Deploy Agent</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <Image src="/forge-logo.png" alt="AssembleOne" width={24} height={24} />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">AssembleOne</span>
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative text-sm ${
                  item.highlight
                    ? "text-emerald-400 font-semibold flex items-center gap-1.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-3 pt-4">
              <NavbarButton
                href="/pm"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Sign In
              </NavbarButton>
              <NavbarButton
                href="/pm"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Deploy Agent
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Bento Grid */}
      <FeaturesSection />

      {/* Logos Marquee */}
      <section id="integrations" className="py-12 border-y border-border/40 overflow-hidden">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Connects to every tool your company needs to run
          </p>
        </div>
        <div className="flex items-center gap-8 animate-marquee">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((integration, i) => (
            <div
              key={`${integration.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm shrink-0 hover:border-border/80 hover:bg-card/50 transition-all duration-300 group"
              onMouseEnter={() => setHoveredIntegration(integration.name)}
              onMouseLeave={() => setHoveredIntegration(null)}
            >
              <div className={`${integration.color} group-hover:scale-110 transition-transform`}>
                <integration.Logo />
              </div>
              <span className="text-sm font-semibold whitespace-nowrap">{integration.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How AssembleOne Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete operating system that builds, launches, and scales your company — all from a single goal prompt
            </p>
          </div>

          {/* The Algorithm */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto p-8 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-2">The Founder OS Engine</h3>
                <p className="text-muted-foreground">Your goal, broken down and executed by autonomous agents</p>
              </div>

              <div className="bg-black/50 rounded-2xl p-6 mb-8 border border-border/40">
                <code className="text-2xl md:text-3xl font-mono text-center block">
                  <span className="text-emerald-400">GOAL</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="text-blue-400">BUILD</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="text-amber-400">LAUNCH</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="text-cyan-400">SELL</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="text-violet-400">SCALE</span>
                </code>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="font-black text-emerald-400">BUILD</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">Product Creation</div>
                  <div className="text-xs text-muted-foreground">
                    AI agents vibe-code your product, set up infrastructure, and deploy it — no technical skills needed from you.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="font-black text-amber-400">LAUNCH</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">Go-to-Market</div>
                  <div className="text-xs text-muted-foreground">
                    Agents write your positioning, set up your landing page copy, and execute your go-to-market the moment your product is ready.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-violet-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="font-black text-violet-400">SELL</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">Revenue Generation</div>
                  <div className="text-xs text-muted-foreground">
                    Outbound agents prospect leads, write personalized sequences, and book meetings — continuously, without a sales hire.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Automation Tiers */}
          <div className="mb-20">
            <h3 className="text-2xl font-black text-center mb-8">Choose How Much You Stay in Control</h3>
            <div className="max-w-4xl mx-auto space-y-3">
              {AUTOMATION_TIERS.map((tier, i) => (
                <div
                  key={tier.tier}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-16 text-right font-mono font-black ${tier.color}`}>{tier.multiplier}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{tier.tier}</div>
                    <div className="text-sm text-muted-foreground">{tier.description}</div>
                  </div>
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-current to-transparent"
                    style={{
                      width: `${Number.parseFloat(tier.multiplier) * 100}%`,
                      maxWidth: "120px",
                      color: tier.color.replace("text-", "").includes("emerald")
                        ? "#34d399"
                        : tier.color.includes("blue")
                          ? "#60a5fa"
                          : tier.color.includes("amber")
                            ? "#fbbf24"
                            : tier.color.includes("orange")
                              ? "#fb923c"
                              : "#f87171",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Portals Section */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">One Platform, Every Function of Your Company</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a non-tech founder with an idea or a developer ready to scale, AssembleOne runs your entire operation
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("sdrs")}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "sdrs" ? "bg-white text-black" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                For Solo Founders
              </button>
              <button
                onClick={() => setActiveTab("founders")}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "founders" ? "bg-white text-black" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <GraduationCap className="w-4 h-4 inline mr-2" />
                For Non-Tech Builders
              </button>
            </div>
          </div>

          {/* SDRs Content */}
          {activeTab === "sdrs" && (
            <div id="for-sdrs" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-3xl font-black mb-6">Stop Managing. Start Building.</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Traditional startups require a full team — engineers, PMs, marketers, salespeople. AssembleOne gives you autonomous agents that code your product, validate product-market fit, run your marketing, and close your first customers — before you hire anyone.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Describe your idea in plain language — agents create your product spec and start coding",
                      "Agents autonomously deploy your app, set up your domain, and write your landing page",
                      "AI monitors traffic, user behavior, and revenue in real time",
                      "Outbound agents find your ideal customers and run personalized email sequences",
                      "Marketing agents run and optimize paid campaigns across channels automatically",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                    <Link href="/chat">
                      Open Command Center
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Agent Feature Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Target, title: "Idea → Code", desc: "Prompt to deployed product" },
                    { icon: Eye, title: "Auto Deploy", desc: "Live on the web in hours" },
                    { icon: Brain, title: "Market Radar", desc: "Live buyer intent signals" },
                    { icon: FileCheck, title: "Outbound Agent", desc: "Autonomous email sequences" },
                    { icon: BarChart3, title: "Growth Engine", desc: "Traffic + revenue monitoring" },
                    { icon: Lock, title: "Founder Mode", desc: "You approve before agents act" },
                  ].map((feature, i) => (
                    <div
                      key={feature.title}
                      className="p-5 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-border/80 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div className="font-semibold mb-1">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Founders Content */}
          {activeTab === "founders" && (
            <div id="for-founders" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-3xl font-black mb-6">Scale Revenue, Not Headcount</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Stop burning cash on massive SDR teams. FORGE provides an elite, always-on AI Growth Team that validates ideas, builds pipelines, and drives growth.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Deploy specialized agents (Research, Outreach, Analytics)",
                      "Monitor real-time pipeline velocity and MRR impact",
                      "Get predictive churn warnings and intervention strategies",
                      "Auto-generate 30-day Go-To-Market playbooks",
                      "Maintain complete control with final-review dashboards",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                    <Link
                      href="/pm/dashboard"
                    >
                      View Executive Dashboard
                      <ArrowUpRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Intelligence Modules */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-muted-foreground mb-4">INTELLIGENCE MODULES</div>
                  {INTELLIGENCE_MODULES.map((module, i) => (
                    <div
                      key={module.name}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-border/80 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <module.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold">{module.name}</div>
                        <div className="text-sm text-muted-foreground">{module.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Founders Get */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Award,
                    title: "PMF Certainty",
                    desc: "Data-backed confidence scores before you spend engineering time on new features.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Predictable Revenue",
                    desc: "AI forecasts ARR and flags accounts at risk of churn before they leave.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Complete Visibility",
                    desc: "The Central Dashboard gives you a god-view of your entire growth operation.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-lg font-semibold mb-2">{item.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FORGE vs CRM */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">AssembleOne vs Building a Startup Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Most founders need 5+ hires to run a company. AssembleOne replaces every function with an autonomous agent.
            </p>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border/40">
              <div className="p-6 font-semibold">Capability</div>
              <div className="p-6 text-center font-black text-emerald-400 border-x border-border/40 bg-emerald-500/5">
                AssembleOne Agents
              </div>
              <div className="p-6 text-center font-semibold text-muted-foreground">Traditional Startup Team</div>
            </div>

            {/* Rows */}
            {FORGE_VS_CRM.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i < FORGE_VS_CRM.length - 1 ? "border-b border-border/40" : ""}`}
              >
                <div className="p-4 text-sm">{row.feature}</div>
                <div className="p-4 flex justify-center items-center border-x border-border/40 bg-emerald-500/5">
                  {row.forge === true ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : row.forge === false ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Minus className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="p-4 flex justify-center items-center">
                  {row.ats === true ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : row.ats === false ? (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Minus className="w-5 h-5 text-amber-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Connects to Every Tool Your Business Runs On</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AssembleOne connects to the tools your company already uses. Pull data from anywhere, deploy to any platform, and let agents operate your full stack automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.name}
                className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-border/80 transition-all duration-300 flex flex-col items-center gap-3"
                onMouseEnter={() => setHoveredIntegration(integration.name)}
                onMouseLeave={() => setHoveredIntegration(null)}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <integration.Logo />
                </div>
                <span className="text-sm font-semibold">{integration.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Don't see your stack? We're connecting new platforms every week.</p>
            <Button variant="outline" size="lg">
              Request Integration
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Solo Founders Choose AssembleOne</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I went from having an idea to a live product with paying users in under two weeks. I never wrote a single line of code or sent a single cold email myself.",
                author: "Aryan M.",
                role: "Solo Founder, SaaS Product",
              },
              {
                quote: "AssembleOne replaced what would have been a $30k/month team. The agents built my landing page, found my first 50 leads, and booked 8 discovery calls — all while I was sleeping.",
                author: "Priya K.",
                role: "Indie Hacker & Founder",
              },
              {
                quote: "I'm not technical at all. I described what I wanted to build and the agents handled the entire product, marketing site, and outreach. It's like having a co-founder who never sleeps.",
                author: "James T.",
                role: "Non-Tech Founder",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/40 bg-card/30">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Launch Your Company on Autopilot?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the next wave of solo founders building real companies with zero team. Describe your idea and let agents do the rest — from code to customers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-16 px-10 text-lg bg-white text-black hover:bg-white/90 group" asChild>
              <Link href="/chat">
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to Central Agent
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-2 group bg-transparent" asChild>
              <Link href="/pm/dashboard">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Leaderboard
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Image src="/forge-logo.png" alt="AssembleOne" width={20} height={20} />
            </div>
            <span className="font-black">AssembleOne</span>
            <span className="text-muted-foreground text-sm">Agentic Founder OS</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

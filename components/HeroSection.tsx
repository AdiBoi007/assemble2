"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Zap, Rocket, Target, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ── Tab content screens ──────────────────────────────────────────────

function BuildPreview() {
  return (
    <div className="h-full w-full bg-[#0d0d0d] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono text-zinc-300">● Agent Active</span>
        <span className="text-xs text-neutral-500">vibe-coding your product...</span>
      </div>
      <div className="flex flex-col gap-2 font-mono text-sm">
        {[
          { label: "→ Analyzing idea prompt...", color: "text-white/40" },
          { label: "→ Generating product spec", color: "text-white/40" },
          { label: "→ Scaffolding Next.js app", color: "text-indigo-400" },
          { label: "→ Writing components (14/32)", color: "text-indigo-400" },
          { label: "→ Connecting Stripe & Auth", color: "text-zinc-300" },
          { label: "→ Running build...", color: "text-core-orange animate-pulse" },
        ].map((line, i) => (
          <div key={i} className={cn("flex items-center gap-2", line.color)}>
            <span>{line.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full bg-zinc-800 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-1">Build progress: 68%</p>
      </div>
    </div>
  );
}

function LaunchPreview() {
  return (
    <div className="h-full w-full bg-[#0d0d0d] p-6 flex flex-col gap-4">
      <p className="text-xs text-neutral-500 font-mono">deployment_agent.run()</p>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {[
          { label: "Domain", value: "yourapp.com", status: "✓ Live", color: "text-zinc-300" },
          { label: "SSL", value: "Enabled", status: "✓ Secure", color: "text-zinc-300" },
          { label: "CDN", value: "Global Edge", status: "✓ Active", color: "text-zinc-300" },
          { label: "Landing Page", value: "AI-Written", status: "✓ Published", color: "text-zinc-300" },
        ].map((item, i) => (
          <div key={i} className="rounded-lg bg-neutral-900 border border-neutral-800 p-3">
            <p className="text-xs text-neutral-500">{item.label}</p>
            <p className="text-sm text-white font-medium mt-1">{item.value}</p>
            <p className={cn("text-xs mt-1", item.color)}>{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SellPreview() {
  return (
    <div className="h-full w-full bg-[#0d0d0d] p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-neutral-500 font-mono">outbound_agent.run()</span>
        <span className="text-xs text-zinc-300">● 3 sequences active</span>
      </div>
      {[
        { name: "Alex Morgan", company: "BuildFast Inc", status: "Meeting Booked", tag: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
        { name: "Sarah Lin", company: "SaaS Co.", status: "Replied — Interested", tag: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" },
        { name: "Raj Patel", company: "Indie Studio", status: "Email Sent (Follow-up 2)", tag: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
        { name: "Jordan Kim", company: "LaunchLab", status: "Researching Account", tag: "bg-white/5 text-zinc-400 border border-white/10" },
      ].map((lead, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg bg-neutral-900 border border-neutral-800 p-3">
          <div>
            <p className="text-sm text-white font-medium">{lead.name}</p>
            <p className="text-xs text-neutral-500">{lead.company}</p>
          </div>
          <span className={cn("text-xs px-2 py-1 rounded-full", lead.tag)}>{lead.status}</span>
        </div>
      ))}
    </div>
  );
}

function GrowPreview() {
  return (
    <div className="h-full w-full bg-[#0d0d0d] p-6 flex flex-col gap-4">
      <p className="text-xs text-neutral-500 font-mono">monitor_agent.dashboard()</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "MRR", value: "$4,280", change: "+18%" },
          { label: "Visitors", value: "12,440", change: "+34%" },
          { label: "Customers", value: "37", change: "+6" },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg bg-neutral-900 border border-neutral-800 p-3 text-center">
            <p className="text-xs text-neutral-500">{stat.label}</p>
            <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
            <p className="text-xs text-zinc-300 mt-1">{stat.change} this week</p>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg bg-neutral-900 border border-neutral-800 p-3 flex items-end gap-1">
        {[30, 45, 38, 60, 55, 72, 68, 85, 90, 88, 95, 100].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-indigo-500 rounded-sm opacity-80"
            style={{ height: `${h}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Tab data ─────────────────────────────────────────────────────────

const TABS = [
  {
    id: "build",
    label: "Build",
    icon: Zap,
    description: "Idea → Live Product",
  },
  {
    id: "launch",
    label: "Launch",
    icon: Rocket,
    description: "Deploy & Go Live",
  },
  {
    id: "sell",
    label: "Sell",
    icon: Target,
    description: "Agents Close Deals",
  },
  {
    id: "grow",
    label: "Grow",
    icon: LineChart,
    description: "Monitor & Scale",
  },
];

const TAB_CONTENT: Record<string, React.ReactNode> = {
  build: <BuildPreview />,
  launch: <LaunchPreview />,
  sell: <SellPreview />,
  grow: <GrowPreview />,
};

// ── Window Mockup ────────────────────────────────────────────────────

function WindowMockup({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (id: string) => void;
}) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow behind window */}
      <div className="absolute inset-0 -z-10 blur-[80px] opacity-20 bg-gradient-to-b from-indigo-500 via-transparent to-transparent rounded-3xl" />

      {/* Window frame */}
      <div className="rounded-2xl border border-white/10 bg-[#050505]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/80">
        {/* OS Chrome — top bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-neutral-500/80" />
            <div className="w-3 h-3 rounded-full bg-white/80" />
            <div className="w-3 h-3 rounded-full bg-white/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="w-full max-w-sm mx-auto h-6 rounded-md bg-neutral-800 flex items-center px-3">
              <span className="text-xs text-neutral-500 font-mono truncate">
                app.assembleone.com/dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-neutral-950 border-b border-neutral-800 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 group",
                activeTab === tab.id
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900",
              )}
            >
              <tab.icon className={cn(
                "w-4 h-4",
                activeTab === tab.id ? "text-indigo-400" : "text-neutral-500 group-hover:text-neutral-400"
              )} />
              {tab.label}
              <span
                className={cn(
                  "hidden sm:inline text-[10px]",
                  activeTab === tab.id ? "text-neutral-400" : "text-neutral-600",
                )}
              >
                {tab.description}
              </span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="h-[340px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            {TABS.map((tab) =>
              tab.id === activeTab ? (
                <motion.div
                  key={tab.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {TAB_CONTENT[tab.id]}
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Avatar Stack ─────────────────────────────────────────────────────

const AVATARS = [
  "https://assets.aceternity.com/avatars/manu.webp",
  "https://assets.aceternity.com/avatars/1.webp",
  "https://assets.aceternity.com/avatars/5.webp",
  "https://assets.aceternity.com/avatars/8.webp",
  "https://assets.aceternity.com/avatars/9.webp",
];

function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {AVATARS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="founder"
            className="w-7 h-7 rounded-full border-2 border-neutral-950 object-cover"
          />
        ))}
      </div>
      <p className="text-sm text-neutral-400">
        <span className="text-white font-semibold">50+</span> solo founders
        already building
      </p>
    </div>
  );
}

// ── Main Hero Section ────────────────────────────────────────────────

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("build");

  return (
    <section className="relative w-full overflow-hidden pt-28 pb-20 px-4">
      {/* Radial glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -z-10 blur-[120px] opacity-20 bg-indigo-500 rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs text-zinc-300 font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-core-orange animate-pulse shadow-[0_0_8px_#FF6B00]" />
          Agentic Founder OS — now in early access
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight"
        >
          From Idea to Revenue
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed"
        >
          Write your goal. AI agents build your product, launch it, run your
          marketing, do outbound sales, and monitor revenue — 24/7, without a
          team.
        </motion.p>

        {/* Waitlist Capture */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-md mx-auto sm:mx-0 mt-8"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email');
              if (!email) return;

              const btn = e.currentTarget.querySelector('button');
              if (btn) {
                btn.disabled = true;
                btn.innerHTML = 'Joining...';
              }

              try {
                const res = await fetch('/api/waitlist', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                });

                if (btn) {
                  if (res.ok) {
                    btn.innerHTML = '&#10003; Added to Waitlist';
                    btn.classList.add('bg-green-500', 'text-white');
                    e.currentTarget.querySelector('input')!.value = '';
                  } else {
                    btn.innerHTML = 'Error, Try Again';
                    btn.disabled = false;
                  }
                }
              } catch (error) {
                if (btn) {
                  btn.innerHTML = 'Error, Try Again';
                  btn.disabled = false;
                }
              }
            }}
            className="flex flex-col sm:flex-row items-center gap-3 relative"
          >
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email for early access..."
                className="w-full pl-6 pr-4 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium text-sm placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex shrink-0 items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-70 disabled:pointer-events-none"
            >
              Join Waitlist
              <div className="flex items-center justify-center w-5 h-5 bg-black rounded-full text-white">
                <ArrowUp className="w-3 h-3" strokeWidth={3} />
              </div>
            </button>
          </form>
          <p className="text-xs text-neutral-500 mt-4 text-center sm:text-left">
            Spots are extremely limited. Joining gives you priority access to the Founder OS.
          </p>
        </motion.div>

        {/* Avatar stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AvatarStack />
        </motion.div>

        {/* Window Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full mt-4"
        >
          <WindowMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      </div>
    </section>
  );
}

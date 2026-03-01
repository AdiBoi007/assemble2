"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      title: "AI Agents Vibe-Code Your Entire Product",
      description:
        "Describe your idea in plain English. Agents write the code, scaffold the app, connect payments, auth, and deploy — no engineers needed.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Outbound Sales on Autopilot",
      description:
        "Agents scan for buying signals, research leads, and send hyper-personalized sequences while you sleep.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Live Revenue & Growth Dashboard",
      description:
        "Monitor MRR, traffic, conversions, and campaign performance in real time. Agents flag anomalies and act automatically.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Deploy Globally in Seconds",
      description:
        "Your product goes live on a global edge network the moment agents finish building. From idea to URL — in hours, not months.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <section className="relative z-20 mx-auto max-w-7xl py-10 lg:py-40 px-4">
      <div className="px-8">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-white lg:text-5xl lg:leading-tight">
          One Goal. Every Function of Your Company,{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Handled by Agents
          </span>
        </h4>
        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-400 lg:text-base">
          AssembleOne replaces your entire founding team with a coordinated
          system of AI agents — from writing your first line of code to closing
          your first paying customer.
        </p>
      </div>

      <div className="relative">
        <div className="mt-12 grid grid-cols-1 rounded-md lg:grid-cols-6 xl:border dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Shared layout components ─────────────────────────────────────────

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative overflow-hidden p-4 sm:p-8", className)}>
    {children}
  </div>
);

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
  <p className="mx-auto max-w-5xl text-left text-xl tracking-tight text-white md:text-2xl md:leading-snug">
    {children}
  </p>
);

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
  <p className="mx-0 my-2 max-w-sm text-left text-sm font-normal text-neutral-400 md:text-sm">
    {children}
  </p>
);

// ── Skeleton 1: Vibe Coding Terminal ─────────────────────────────────

export const SkeletonOne = () => {
  const lines = [
    { text: "▸ Analyzing idea: 'AI invoice tool for freelancers'", color: "text-neutral-400", delay: 0 },
    { text: "▸ Generating product spec...", color: "text-neutral-400", delay: 0.3 },
    { text: "▸ Scaffolding Next.js + Tailwind app", color: "text-emerald-400", delay: 0.6 },
    { text: "▸ Writing InvoiceEditor component (done)", color: "text-emerald-400", delay: 0.9 },
    { text: "▸ Connecting Stripe payment API", color: "text-emerald-400", delay: 1.2 },
    { text: "▸ Setting up Supabase auth", color: "text-yellow-400", delay: 1.5 },
    { text: "▸ Running build... success ✓", color: "text-emerald-400", delay: 1.8 },
    { text: "▸ Deploying to edge network...", color: "text-cyan-400", delay: 2.1 },
  ];

  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full rounded-lg bg-neutral-950 p-5 shadow-2xl border border-neutral-800">
        {/* Terminal chrome */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs text-neutral-500 font-mono">build_agent.run()</span>
        </div>
        {/* Animated lines */}
        <div className="flex flex-col gap-2 font-mono text-xs">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: line.delay, duration: 0.3 }}
              className={cn("flex items-center gap-2", line.color)}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "92%" }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
            />
          </div>
          <p className="text-xs text-neutral-600 mt-1 font-mono">Build progress: 92% — almost live</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-32 w-full bg-gradient-to-t from-black via-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-32 w-full bg-gradient-to-b from-black via-transparent to-transparent" />
    </div>
  );
};

// ── Skeleton 2: Outbound Lead Cards ──────────────────────────────────

export const SkeletonTwo = () => {
  const leads = [
    { name: "Alex Morgan", co: "BuildFast Inc", status: "Meeting Booked", color: "bg-emerald-900 text-emerald-300" },
    { name: "Sarah Lin", co: "SaaS Co.", status: "Replied — Interested", color: "bg-blue-900 text-blue-300" },
    { name: "Raj Patel", co: "Indie Studio", status: "Follow-up 2 Sent", color: "bg-yellow-900 text-yellow-300" },
    { name: "Jordan Kim", co: "LaunchLab", status: "Researching Account", color: "bg-neutral-800 text-neutral-400" },
    { name: "Maya Chen", co: "DevHouse", status: "Meeting Booked", color: "bg-emerald-900 text-emerald-300" },
  ];

  const cardVariants = {
    whileHover: { scale: 1.03, zIndex: 100 },
    whileTap: { scale: 1.03, zIndex: 100 },
  };

  return (
    <div className="relative flex h-full flex-col items-start gap-3 overflow-hidden p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-neutral-500 font-mono">outbound_agent — 3 sequences active</span>
      </div>
      {/* Row 1 */}
      <div className="-ml-4 flex flex-row gap-2">
        {leads.slice(0, 3).map((lead, idx) => (
          <motion.div
            key={"r1-" + idx}
            variants={cardVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{ rotate: Math.random() * 6 - 3 }}
            className="shrink-0 rounded-xl border border-neutral-800 bg-neutral-900 p-3 w-36"
          >
            <p className="text-xs font-semibold text-white truncate">{lead.name}</p>
            <p className="text-[10px] text-neutral-500 truncate">{lead.co}</p>
            <span className={cn("mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full", lead.color)}>
              {lead.status}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Row 2 */}
      <div className="flex flex-row gap-2">
        {leads.slice(2).map((lead, idx) => (
          <motion.div
            key={"r2-" + idx}
            variants={cardVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{ rotate: Math.random() * 6 - 3 }}
            className="shrink-0 rounded-xl border border-neutral-800 bg-neutral-900 p-3 w-36"
          >
            <p className="text-xs font-semibold text-white truncate">{lead.name}</p>
            <p className="text-[10px] text-neutral-500 truncate">{lead.co}</p>
            <span className={cn("mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full", lead.color)}>
              {lead.status}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-12 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-12 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
};

// ── Skeleton 3: Revenue Dashboard ────────────────────────────────────

export const SkeletonThree = () => {
  const stats = [
    { label: "MRR", value: "$4,280", change: "+18%" },
    { label: "Visitors", value: "12.4k", change: "+34%" },
    { label: "Customers", value: "37", change: "+6" },
  ];
  const bars = [30, 45, 38, 60, 55, 72, 68, 85, 90, 88, 95, 100];

  return (
    <div className="relative flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500 font-mono">monitor_agent.dashboard()</span>
        <span className="text-xs text-emerald-400">● Live</span>
      </div>
      {/* Stat pills */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <div key={i} className="rounded-lg bg-neutral-900 border border-neutral-800 p-2 text-center">
            <p className="text-[10px] text-neutral-500">{s.label}</p>
            <p className="text-sm font-bold text-white">{s.value}</p>
            <p className="text-[10px] text-emerald-500">{s.change}</p>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="flex-1 rounded-lg bg-neutral-900 border border-neutral-800 p-3 flex items-end gap-1 min-h-[80px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-emerald-500 rounded-sm opacity-80"
            style={{ height: `${h}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </div>
      <p className="text-[10px] text-neutral-400 font-mono">Revenue last 12 weeks — agents optimizing ad spend</p>
    </div>
  );
};

// ── Skeleton 4: Globe (global deploy) ───────────────────────────────

export const SkeletonFour = () => {
  return (
    <div className="relative mt-10 flex h-60 flex-col items-center bg-transparent md:h-60">
      <Globe className="absolute -right-10 -bottom-80 md:-right-10 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 4000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.04 },
        { location: [28.6139, 77.209], size: 0.04 },
        { location: [48.8566, 2.3522], size: 0.04 },
        { location: [-23.5505, -46.6333], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

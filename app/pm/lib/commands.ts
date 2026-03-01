import { Zap, Search, Mail, FileText, Globe, Shield, Activity } from "lucide-react"

export type SlashCommand = {
    id: string
    label: string
    description: string
    icon: any
    action: (context: any) => void
    color: string
}

export const SLASH_COMMANDS: SlashCommand[] = [
    {
        id: "analyze",
        label: "/analyze",
        description: "Deep dive analysis on current candidate",
        icon: Search,
        action: ({ setPanel }) => setPanel("analysis"),
        color: "text-zinc-300"
    },
    {
        id: "draft",
        label: "/draft",
        description: "Draft outreach email to candidate",
        icon: Mail,
        action: ({ setInput }) => setInput("Draft a high-conversion outreach email for Alex Rivero focused on our engineering culture."),
        color: "text-zinc-300"
    },
    {
        id: "rubric",
        label: "/rubric",
        description: "Open scoring rubric",
        icon: FileText,
        action: ({ setPanel }) => setPanel("rubric"),
        color: "text-zinc-300"
    },
    {
        id: "market",
        label: "/market",
        description: "View market compensation data",
        icon: Globe,
        action: ({ setPanel }) => setPanel("market"),
        color: "text-stone-300"
    },
    {
        id: "bias",
        label: "/bias",
        description: "Run bias detection check",
        icon: Shield,
        action: ({ setPanel }) => setPanel("bias"),
        color: "text-neutral-400"
    },
    {
        id: "simulate",
        label: "/simulate",
        description: "Run Work Simulation scenario",
        icon: Activity,
        action: ({ setPanel }) => setPanel("work-sim"),
        color: "text-zinc-300"
    }
]

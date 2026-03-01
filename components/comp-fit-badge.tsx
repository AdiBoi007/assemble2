"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { CompFit } from "@/lib/compensation"

interface CompFitBadgeProps {
  compFit: CompFit
}

export function CompFitBadge({ compFit }: CompFitBadgeProps) {
  const statusStyles = {
    "in-band": "bg-white/20 text-zinc-300 border-white/30",
    "slightly-above": "bg-white/20 text-stone-300 border-white/30",
    "way-above": "bg-neutral-500/20 text-neutral-400 border-neutral-500/30",
    "slightly-below": "bg-white/20 text-zinc-300 border-white/30",
    "way-below": "bg-white/20 text-zinc-300 border-white/30",
    unknown: "bg-muted text-muted-foreground border-border",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`cursor-help ${statusStyles[compFit.status]}`}>
            <span className="mr-1">{compFit.icon}</span>
            {compFit.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{compFit.note}</p>
          {compFit.xsMultiplier != null && compFit.xsMultiplier !== 1 && (
            <p className="text-xs text-muted-foreground mt-1">XS adjustment: ×{compFit.xsMultiplier.toFixed(2)}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

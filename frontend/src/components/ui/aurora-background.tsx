import * as React from "react"
import { cn } from "@/lib/utils"

type AuroraBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  showRadialGradient?: boolean
}

export function AuroraBackground({
  className,
  showRadialGradient = true,
  children,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "bg-[radial-gradient(80%_60%_at_35%_20%,rgba(167,139,250,0.08),transparent_60%),radial-gradient(70%_55%_at_70%_75%,rgba(139,92,246,0.06),transparent_60%),linear-gradient(to_bottom_right,#0B0C0F,#0F1115,#0A0B0E)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default AuroraBackground



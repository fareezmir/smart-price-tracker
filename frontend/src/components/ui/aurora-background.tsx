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
        // Base dark gradient fill
        "relative isolate bg-gradient-to-br from-surfaceBlack via-surfaceSlate to-surfaceJet",
        "before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(80%_60%_at_40%_20%,rgba(167,139,250,0.12),transparent_60%),radial-gradient(70%_55%_at_60%_70%,rgba(139,92,246,0.10),transparent_60%)]",
        showRadialGradient &&
          "after:content-[''] after:absolute after:inset-0 after:-z-10 after:bg-radial-spot",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default AuroraBackground



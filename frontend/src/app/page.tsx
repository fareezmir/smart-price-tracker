
import { Button } from "@/components/Button"


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-textWhite">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-surfaceBlack via-surfaceSlate to-surfaceJet" />
      <div className="pointer-events-none absolute inset-0 bg-radial-spot opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/2 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container py-16 space-x-4">
        <div className="relative inline-flex">
          {/* Subtle purple glow behind button */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-radial-spot opacity-60 blur-2xl" />
          <Button appearance="gradient" variant="primary" className="px-5 py-4 rounded-full font-bold text-base md:text-lg min-w-[200px] flex justify-center">
            Track Item
          </Button>
        </div>
      </div>
    </main>
  );
}

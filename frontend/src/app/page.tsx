
"use client"
import { Button } from "@/components/Button"
import AuroraBackground from "@/components/ui/aurora-background"


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-textWhite">
      <AuroraBackground className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto container flex flex-col items-center justify-center text-center gap-4 md:gap-6 min-h-screen">
        <h1 className="mx-auto max-w-3xl font-geist text-7xl font-bold text-center">DealSense</h1>
        <h2 className="mx-auto max-w-3xl font-inter text-2xl text-center">Track anything. Get notified.</h2>
        <div className="relative inline-flex">
          <Button appearance="gradient" variant="primary" className="px-5 py-4 rounded-full font-bold text-base md:text-lg min-w-[200px] flex justify-center">
            Track Item
          </Button>
        </div>
      </div>
    </main>
  );
}

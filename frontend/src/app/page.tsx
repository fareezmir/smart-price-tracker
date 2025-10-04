
"use client";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import { useState } from "react"

export default function Home() {
  const [link, setLink] = useState("");

  function handleSearch(link: string) {
     return console.log(link)
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-textWhite">
      

      {/* Content */}
      <div className="relative z-10 mx-auto container flex flex-col items-center justify-start text-center gap-4 md:gap-6 min-h-screen pt-48">
        <h1 className="mx-auto max-w-3xl font-geist text-7xl font-bold text-center">DealSense</h1>
        <h2 className="mx-auto mb-10 max-w-3xl font-inter text-2xl text-center">Track anything. Get notified.</h2>
        <div className="mb-8">
          <SearchBar 
            value = {link} 
            onChange = {(e) => setLink(e.target.value)}
            onSubmit={() => handleSearch(link)}
          />
        </div>
        <div>
          <Button 
            variant = "hoverOutline" className="px-5 py-4 rounded-full font-bold text-base md:text-lg min-w-[200px] flex justify-center"
            onClick={() => handleSearch(link)}
          >
            Track Item
          </Button>
        </div>
      </div>
    </main>
  );
}

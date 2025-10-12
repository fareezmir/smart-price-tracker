
"use client";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";

import { useState, useEffect } from "react";
import { verifyLink, trackProduct } from "../services/api";
import type { VerifyLinkResponse, TrackedProduct } from "@smart-price-tracker/shared";
import ProductCard from "@/components/ui/ProductCard";

type ValidationResult = VerifyLinkResponse | null;


export default function Home() {
  const [trackedProduct, setTrackedProduct] = useState<TrackedProduct | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);


  const [link, setLink] = useState("");
  const [validation, setValidation] = useState<ValidationResult>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     if (!link) {
       setValidation(null);
       setError(null); 
       return;
     }

     const timer = setTimeout(async () => {
        try {
          const data = await verifyLink(link);
          setValidation(data);
          setError(null);
        } catch (error) {
            setValidation({
              isValid: false,
              error: error instanceof Error ? error.message : "Unknown error"
            });
          } 
     }, 500);

     return () => clearTimeout(timer);

  }, [link])

   async function handleTrackItem(link: string) {
     if (!link || !validation?.isValid) {
       setError(validation?.error || "Invalid Product URL.")
       return;
     }

     setIsTracking(true);
     setError(null);
     setTrackedProduct(null);
     
     try {
        const product = await trackProduct(link);
        setTrackedProduct(product);
     } catch (err) {
       setError(err instanceof Error ? err.message : "Failed to track product.");
     } finally {
      setIsTracking(false);
     }

  }

  return (
    <main className="relative min-h-screen overflow-hidden text-textWhite">
    <div className="relative z-10 mx-auto container px-4 md:px-6 flex flex-col items-center justify-start text-center gap-4 md:gap-6 pt-32 md:pt-48">
      <h1 className="mx-auto max-w-3xl font-geist text-5xl md:text-6xl lg:text-7xl font-bold">DealSense</h1>
      <h2 className="mx-auto mb-6 md:mb-10 max-w-3xl font-inter text-base md:text-xl lg:text-2xl px-4">Track anything. Get notified.</h2>
  
      <section className="w-full max-w-2xl mx-auto">
        <div className="grid grid-rows-[auto,20px,auto] gap-4 justify-items-center">
          <div className="w-full">
            <SearchBar
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onSubmit={() => handleTrackItem(link)}
              className="w-full"
            />
          </div>
  
          <p
            role="status"
            aria-live="polite"
            className={[
              "w-full h-5 pl-8 text-sm overflow-hidden whitespace-nowrap text-left transition-opacity duration-200",
              error
                ? "text-red-400 opacity-100"
                : validation
                ? (validation.isValid ? "text-emerald-400 opacity-100" : "text-red-400 opacity-100")
                : "opacity-0",
            ].join(" ")}
          >
            {error
              ? `✗ ${error}`
              : validation
              ? validation.isValid
                ? `✔ ${validation.retailer} is supported! Ready to track?`
                : `✗ ${validation.error}`
              : ""}
          </p>
          
          <div className="mt-4">
            <Button 
              variant = "hoverOutline" className="px-5 py-4 rounded-full font-bold text-base md:text-lg min-w-[200px] flex justify-center"
              onClick={() => handleTrackItem(link)}
            >
              {isTracking ? "Tracking..." : "Track Item"}
            </Button>
          </div>
        </div>
      </section>
  
      {trackedProduct && (
        <div className="mt-4 w-full max-w-2xl mx-auto">
          <ProductCard trackedProduct={trackedProduct} />
        </div>
      )}
    </div>
  </main>
  );
}

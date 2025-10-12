"use client";

import type { TrackedProduct } from "@smart-price-tracker/shared";

type ProductCardProps = {
  trackedProduct: TrackedProduct;
  className?: string;
};

export default function ProductCard({ trackedProduct, className = "" }: ProductCardProps) {
  const currentPrice = trackedProduct.priceHistory[trackedProduct.priceHistory.length - 1]?.price;
  const previousPrice = trackedProduct.priceHistory[trackedProduct.priceHistory.length - 2]?.price;
  
  const priceChange = currentPrice && previousPrice ? currentPrice - previousPrice : 0;
  const priceChangePercent = currentPrice && previousPrice 
    ? ((priceChange / previousPrice) * 100).toFixed(1)
    : 0;

  return (
    <div className={`p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-4 ${className}`}>
      {trackedProduct.imageUrl && (
        <img 
          src={trackedProduct.imageUrl} 
          alt={trackedProduct.title} 
          className="w-24 h-24 object-cover rounded-lg flex-shrink-0" 
        />
      )}
      <div className="min-w-0 text-left">
        <h3 className="text-sm text-gray-300 font-medium mb-1 line-clamp-2">
          {trackedProduct.title}
        </h3>
        <div className="mb-1">
          <p className="text-lg font-bold text-white">
            {trackedProduct.currency} ${currentPrice?.toFixed(2)}
          </p>
          {priceChange !== 0 && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              priceChange > 0 
                ? "bg-red-500/20 text-red-400" 
                : "bg-green-500/20 text-green-400"
            }`}>
              {priceChange > 0 ? "+" : ""}{priceChangePercent}%
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{trackedProduct.priceHistory.length} price point(s) tracked</span>
          <span>{trackedProduct.retailer}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { TrackedProduct } from "@smart-price-tracker/shared";
import PriceChart from "./PriceChart";

type DashboardProps = {
  trackedProduct: TrackedProduct;
  className?: string;
};

export default function Dashboard({ trackedProduct, className = "" }: DashboardProps) {
  const hasEnoughData = trackedProduct.priceHistory.length >= 5;
  const currentPrice = trackedProduct.priceHistory[trackedProduct.priceHistory.length - 1]?.price;
  const previousPrice = trackedProduct.priceHistory[trackedProduct.priceHistory.length - 2]?.price;
  
  const priceChange = currentPrice && previousPrice ? currentPrice - previousPrice : 0;
  const priceChangePercent = currentPrice && previousPrice 
    ? ((priceChange / previousPrice) * 100).toFixed(1)
    : "0";

  const prices = trackedProduct.priceHistory.map(point => point.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const avgPrice = prices.length > 0 
    ? prices.reduce((sum, price) => sum + price, 0) / prices.length 
    : 0;

  return (
    <div className={`w-full bg-bg-soft border border-borderSlate rounded-xl p-6 md:p-8 space-y-8 ${className}`}>
      {/* Product Header Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {trackedProduct.imageUrl && (
          <img 
            src={trackedProduct.imageUrl} 
            alt={trackedProduct.title} 
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg flex-shrink-0 border border-borderSlate" 
          />
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl text-left md:text-3xl font-bold text-textWhite mb-3 line-clamp-2">
            {trackedProduct.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <p className="text-3xl md:text-4xl font-bold text-primaryPurple">
                {trackedProduct.currency} ${currentPrice?.toFixed(2)}
              </p>
              {priceChange !== 0 && (
                <span className={`text-sm px-2.5 py-1 rounded-full font-medium ${
                  priceChange > 0 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}>
                  {priceChange > 0 ? "+" : ""}{priceChangePercent}%
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-textGray">
            <span className="flex items-center gap-1.5">
              {trackedProduct.retailer}
            </span>
            <span>•</span>
            <span>{trackedProduct.priceHistory.length} price point{trackedProduct.priceHistory.length !== 1 ? 's' : ''} tracked</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-borderSlate"></div>

      {/* Conditional Content: Full Dashboard or Basic View */}
      {hasEnoughData ? (
        <div className="space-y-8">
          {/* Price Chart Section */}
          <section>
            <h3 className="text-lg font-semibold text-textWhite mb-4">Price History</h3>
            <div className="bg-bg-hard rounded-lg border border-borderSlate p-4">
              <PriceChart 
                priceHistory={trackedProduct.priceHistory} 
                currency={trackedProduct.currency}
              />
            </div>
          </section>

          {/* Analytics Section */}
          <section>
            <h3 className="text-lg font-semibold text-textWhite mb-4">Price Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-bg-hard p-5 rounded-lg border border-borderSlate">
                <p className="text-sm text-textGray mb-2">Lowest Recorded Price</p>
                <p className="text-2xl font-bold text-textWhite">
                  {trackedProduct.currency} ${minPrice.toFixed(2)}
                </p>
              </div>
              <div className="bg-bg-hard p-5 rounded-lg border border-borderSlate">
                <p className="text-sm text-textGray mb-2">Average Price</p>
                <p className="text-2xl font-bold text-textWhite">
                  {trackedProduct.currency} ${avgPrice.toFixed(2)}
                </p>
              </div>
              <div className="bg-bg-hard p-5 rounded-lg border border-borderSlate">
                <p className="text-sm text-textGray mb-2">Highest Recorded Price</p>
                <p className="text-2xl font-bold text-textWhite">
                  {trackedProduct.currency} ${maxPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </section>

          {/* ML Insights Section */}
          <section>
            <h3 className="text-lg font-semibold text-textWhite mb-4">AI Insights</h3>
            <div className="bg-bg-hard p-5 rounded-lg border border-borderSlate">
              <p className="text-textGrayMuted">ML analysis coming soon...</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-bg-hard p-6 rounded-lg border border-borderSlate text-center">
          <p className="text-textGray mb-2">
            Collecting price data...
          </p>
          <p className="text-sm text-textGrayMuted">
            Price analytics will be available after {5 - trackedProduct.priceHistory.length} more price check{5 - trackedProduct.priceHistory.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Price Alerts Section */}
      <div className="border-t border-borderSlate pt-6">
        <button className="w-full py-3 px-6 bg-primaryPurple hover:bg-primaryPurple rounded-lg text-textWhite font-medium transition-colors">
          Set Price Alert
        </button>
      </div>
    </div>
  );
}


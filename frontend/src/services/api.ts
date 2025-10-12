import type { Product, TrackedProduct, VerifyLinkResponse } from '@smart-price-tracker/shared';

const API_BASE_URL = 'http://localhost:8000/api';

// Verify if URL is valid and supported
export const verifyLink = async (url: string): Promise<VerifyLinkResponse> => {
    const response = await fetch(`${API_BASE_URL}/verify-link?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return response.json();
};

// Scrape product and start tracking it
export const scrapeProduct = async (url: string): Promise<TrackedProduct> => {
    const response = await fetch(`${API_BASE_URL}/scrape?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scrape product');
    }

    return response.json();
};

// Get tracked product with full price history
export const getTrackedProduct = async (url: string): Promise<TrackedProduct> => {
    const response = await fetch(`${API_BASE_URL}/history?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'No history found for this product');
    }

    return response.json();
};

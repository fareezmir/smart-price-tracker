import type { Product, TrackedProduct, VerifyLinkResponse } from '@smart-price-tracker/shared';
import { getSession } from "next-auth/react";

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

// Track product (handles cache-first logic internally)
export const trackProduct = async (url: string): Promise<TrackedProduct> => {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!session?.user?.id) {
        throw new Error ('You must be logged in to track products');
    }

    const response = await fetch(`${API_BASE_URL}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, userId })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to track product');
    }

    return response.json();
};


// Get all products for a user
export const getUserProducts = async (): Promise<TrackedProduct[]> => {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!session?.user?.id) {
        throw new Error('You must be logged in to view your products');
    }
    
    const response = await fetch(`${API_BASE_URL}/users/${userId}/products`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user products');
    }

    return response.json();
};

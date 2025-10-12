export type Product = {
    title: string;
    price: number;
    currency: string;
    imageUrl: string;
};

export type PricePoint = {
    price: number;
    timestamp: string;
};

export type TrackedProduct = {
    productId: string;
    url: string;
    retailer: string;
    currency: string;
    title: string;
    imageUrl: string;
    lastUpdated: string;
    priceHistory: PricePoint[];
};


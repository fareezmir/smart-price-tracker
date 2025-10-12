export type Product = {
    title: string
    price: number
    currency: string
}

export type PricePoint = {
    price: number
    timestamp: string
}

export type TrackedProduct = {
    productId: string
    url: string
    retailer: string
    currency: string
    title: string
    lastUpdated: string
    priceHistory: PricePoint[]
}
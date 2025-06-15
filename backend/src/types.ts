export type Product = {
    title: string
    price: number
    currency: string
}

export type PricePoint = {
    price: number
    timestamp: string
}

export type PriceHistory = PricePoint[]
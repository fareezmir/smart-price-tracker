CREATE DATABASE smart_price_tracker;

CREATE TABLE products (
    product_id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    retailer TEXT NOT NULL,
    currency TEXT NOT NULL,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    last_updated TEXT NOT NULL
);

CREATE TABLE price_history (
    id SERIAL PRIMARY KEY,
    product_id TEXT NOT NULL,
    price DECIMAL NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

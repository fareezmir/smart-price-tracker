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

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE user_products (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    date_added TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)
);

CREATE INDEX idx_user_products_user_id ON user_products(user_id);
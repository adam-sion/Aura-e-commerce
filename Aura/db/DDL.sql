DROP SCHEMA IF EXISTS aura CASCADE;
CREATE SCHEMA aura;

DROP TABLE IF EXISTS aura.products CASCADE;

CREATE TABLE aura.products (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 price NUMERIC(10,2) NOT NULL,
 category VARCHAR(10) CHECK (category IN ('men', 'women', 'kids')),
 img TEXT NOT NULL
);


DROP TABLE IF EXISTS aura.customers CASCADE;

CREATE TABLE aura.customers (
 id SERIAL PRIMARY KEY,
 username VARCHAR(20) NOT NULL,
 password VARCHAR(255) NOT NULL,

 UNIQUE (username, password)
);


DROP TABLE IF EXISTS aura.orders CASCADE;

CREATE TABLE aura.orders (
 id SERIAL PRIMARY KEY,
 customer_id INTEGER NOT NULL REFERENCES aura.customers(id)
    ON DELETE CASCADE,
 amount SMALLINT NOT NULL
);


DROP TABLE IF EXISTS aura.order_items CASCADE;

CREATE TABLE aura.order_items (
 id SERIAL PRIMARY KEY,
 order_id INTEGER NOT NULL REFERENCES aura.orders(id)
    ON DELETE CASCADE,
 product_id  INTEGER NOT NULL REFERENCES aura.products(id)
    ON DELETE CASCADE,
 quantity SMALLINT NOT NULL
);


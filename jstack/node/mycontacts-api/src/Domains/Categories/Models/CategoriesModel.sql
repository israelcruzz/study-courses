-- Use Extension for generate UUID -> CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
    id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL
);
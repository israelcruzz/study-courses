-- Use Extension for generate UUID -> CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS contacts (
    id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR NOT NULL,
    category_id UUID,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);
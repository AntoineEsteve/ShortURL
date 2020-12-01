CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS shorturls (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    userid INTEGER,
    FOREIGN KEY (userid) REFERENCES users (id)
);

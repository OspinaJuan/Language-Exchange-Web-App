CREATE DATABASE languageapp;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	name TEXT,
	created_at TIMESTAMP DEFAULT NOW()
);
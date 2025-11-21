CREATE DATABASE languageapp;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	name TEXT,
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE languages (
	language_id SERIAL PRIMARY KEY,
	code VARCHAR(10) UNIQUE NOT NULL,
	name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_native_languages (
	user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
	language_id INT REFERENCES languages(language_id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, language_id)
);

CREATE TABLE user_target_languages (
	user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
	language_id INT REFERENCES languages(language_id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, language_id)
);
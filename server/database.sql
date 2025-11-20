CREATE DATABASE languageapp;

CREATE TABLE profiles(
	profile_id SERIAL PRIMARY KEY,
	native_language VARCHAR(50),
	target_language VARCHAR(50)
);
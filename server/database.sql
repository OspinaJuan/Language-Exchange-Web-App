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

CREATE TABLE exchange_sessions (
    session_id SERIAL PRIMARY KEY,
    user_a INT REFERENCES users(user_id),
    user_b INT REFERENCES users(user_id),
    mode VARCHAR(10) NOT NULL,     -- 'audio' o 'chat'
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    language_a_first INT REFERENCES languages(language_id), -- idioma del primer bloque
    language_b_second INT REFERENCES languages(language_id)
);

CREATE TABLE chat_messages (
    message_id SERIAL PRIMARY KEY,
    session_id INT REFERENCES exchange_sessions(session_id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(user_id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE language_feedback (
    feedback_id SERIAL PRIMARY KEY,
    session_id INT REFERENCES exchange_sessions(session_id) ON DELETE CASCADE,
    reviewer_id INT REFERENCES users(user_id),
    reviewed_id INT REFERENCES users(user_id),
    comments TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (session_id, reviewer_id)
);

CREATE TABLE behavioral_feedback (
    feedback_id SERIAL PRIMARY KEY,
    session_id INT NOT NULL REFERENCES exchange_sessions(session_id) ON DELETE CASCADE,
    reviewer_id INT NOT NULL REFERENCES users(user_id),
    reviewed_id INT NOT NULL REFERENCES users(user_id),
    stars_behavior SMALLINT CHECK (stars_behavior BETWEEN 1 AND 5) NOT NULL,
    comment_behavior TEXT,
		auto_flags TEXT ARRAY DEFAULT '{}'
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (session_id, reviewer_id)
);

CREATE TABLE user_penalties (
    penalty_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_created_reports (
    user_report_id SERIAL PRIMARY KEY,
    reporter_id INT NOT NULL REFERENCES users(user_id),
    reported_id INT NOT NULL REFERENCES users(user_id),
    reason TEXT NOT NULL,         
    description TEXT,             
    session_id INT REFERENCES exchange_sessions(session_id) ON DELETE SET NULL,       
    reviewed_at TIMESTAMP,          
    created_at TIMESTAMP DEFAULT NOW()
);

// routes/auth.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
	try{
		const { email, password, name } = req.body;

		// verify if exists
		const existing = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if (existing.rows.length > 0) {
			return res.status(400).json({error: "Email already exists"});
		}

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		// insert in DB
		const result = await pool.query(
			"INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING user_id, email, name",
			[email, hash, name]
		);

		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
});

// LOGIN
router.post("/login", async (req, res) => {
	try{
		const { email, password } = req.body;

		// search user
		const user = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);

		if (user.rows.length == 0) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const foundUser = user.rows[0];

		// verify password
		const valid = await bcrypt.compare(password, foundUser.password_hash);
		if (!valid) {
			return res.status(400).json({ error: "Invalid credentials "});
		}

		// create token
		const token = jwt.sign(
			{ user_id: foundUser.user_id, email: foundUser.email },
			process.env.JWT_SECRET,
			{ expiresIn: "7d"}
		);

		res.json({ token });

	} catch (err) {
		console.error(err);
		return res.status(500).json( { error: "Server error" });
	}
});

module.exports = router;
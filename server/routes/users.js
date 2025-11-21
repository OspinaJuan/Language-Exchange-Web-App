// routes/users.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get all users
router.get("/", async (req, res) => {
	try {
		const users = await pool.query(
			"SELECT user_id, name, email FROM users"
		);
		res.json(users.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
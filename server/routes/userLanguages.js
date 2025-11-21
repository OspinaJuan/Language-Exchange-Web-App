// routes/userLanguages.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

// add native language to a user
router.post("/:userId/add/native", async (req, res) => {
	try {
		console.log(req.body);
		const { userId } = req.params;
		const { language_id } = req.body;

		await pool.query(
			"INSERT INTO user_native_languages (user_id, language_id) VALUES ($1, $2)",
			[userId, language_id]
		);

		res.json({ message: "Native language added!"});		
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}
});

// add target language to a user
router.post('/:userId/add/target', async (req, res) => {
	try {
		const { userId } = req.params;
	  const { language_id } = req.body;

	  await pool.query(
	    "INSERT INTO user_target_languages (user_id, language_id) VALUES ($1, $2)",
	    [userId, language_id]
	  );

	  res.json({ message: "Target language added" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}

});

// get native and target languages from a user
router.get("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;

		const native = await pool.query(
			"SELECT l.language_id, l.name FROM languages l JOIN user_native_languages ul ON l.language_id = ul.language_id WHERE ul.user_id = $1",
			[userId]
		);
		const target = await pool.query(
			"SELECT l.language_id, l.name FROM languages l JOIN user_target_languages ul ON l.language_id = ul.language_id WHERE ul.user_id = $1",
			[userId]
		);

		res.json({
			"native": native,
			"target": target
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}

});

module.exports = router;
const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

router.post("/:userId/add/native", async (req, res) => {
	const { userId } = req.params;
	const { language_id } = req.body;

	await pool.query(
		"INSERT INTO user_native_languages (user_id, language_id) VALUES ($1, $2)",
		[userId, language_id]
	);

	res.json({ message: "Native language added!"});
});

router.post('/:userId/target', async (req, res) => {
  const { userId } = req.params;
  const { language_id } = req.body;

  await pool.query(
    "INSERT INTO user_target_languages (user_id, language_id) VALUES ($1, $2)",
    [userId, language_id]
  );

  res.json({ message: "Target language added" });
});

router.get("/:userId", async (req, res) => {
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
});

module.exports = router;
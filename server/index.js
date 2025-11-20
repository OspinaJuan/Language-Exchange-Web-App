const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

app.post("/profile", async(req, res) => {
	try {
		const { native_language, target_language } = req.body;
		console.log(target_language);
		const newProfile = await pool.query(
			`INSERT INTO profiles (native_language, target_language) VALUES ($1, $2) RETURNING *`,
			[native_language, target_language]
		);

		res.json(newProfile.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});



app.listen(5000, () => {
	console.log("Server has started on port 5000")
});
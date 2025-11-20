const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(5000, () => {
	console.log("Server has started on port 5000")
});
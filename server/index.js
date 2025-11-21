const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());	
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const userLanguagesRoutes = require("./routes/userLanguages");
app.use("/userLanguages", userLanguagesRoutes);

app.listen(5000, () => {
	console.log("Server has started on port 5000")
});
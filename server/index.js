const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());	
app.use(express.json());

app.get("/ping", (req, res) => {
    console.log("Ping recibido!");
    res.send("PONG");
});
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

app.listen(3001, () => {
	console.log("Server has started on port 3001")
});
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
const PORT = process.PORT;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		useUniFiedTopology: true,
		// useFindAndModify: false,
	})
	.then(() => {
		console.log("connected");
	})
	.catch((error) => {
		console.log("not connected due to error...", error);
	});
const middleware = (req, res, next) => {
	console.log("hello  from middle ware...Mern App...");
	next();
};
// middleware();
app.get("/MernAboutus", middleware, (req, res) => {
	console.log("hello my about from mern app...");
	res.send("hello from about us...mern app.");
});

app.get("/", (req, res) => {
	res.send("hello from server...");
});

app.listen(PORT, (req, res) => {
	console.log("server is running at port ${PORT}");
});

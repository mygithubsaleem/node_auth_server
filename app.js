const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config.env" });
require("./Db/connection");
app.use(express.json());
//const User = require("./Model/userSchema");
const PORT = process.env.PORT;
app.use(require("./Router/auth"));

// app.get("/", (req, res) => {
// 	console.log("hello world from mern app.js ");
// 	res.send("hellow world from response mern app.js");
// });

// middleware();

// const middleware = (req, res, next) => {
// 	console.log("hello  from middle ware...Mern App...");
// 	next();
// };
// app.get("/MernSignup", middleware, (req, res) => {
// 	console.log("hello world from mern app.js sign up page.");
// 	res.send("hello from about us...mern Sign up page.");
// });

app.listen(PORT, (err) => {
	if (err) {
		return console.log.error("the error is from...server....", err);
	}
	{
		return console.log(`server is listining at port number ${PORT}`);
	}
});

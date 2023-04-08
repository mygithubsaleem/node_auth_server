const express = require("express");
const router = express.Router();
require("../Db/connection");
const User = require("../Model/userSchema");

// router.get("/", (req, res) => {
// 	console.log("hello world from  mern signup page router/router/router...");
// 	res.send("hellow from router router router js...");
// });

//promise return method start from here...
router.post("/MernSignup", (req, res) => {
	// console.log(req.body);
	// res.json({ message: req.body });
	const { name, email, phone, work, passwd, cpasswd } = req.body;
	// console.log(name);
	// console.log(email);
	// res.json({ message: email,name });
	if (!name || !email || !phone || !work || !passwd || !cpasswd) {
		return res.json({ messege: "please fill the required data..." });
	}
	console.log(req.body);
	User.findOne({ email: email })
		.then((emailExist) => {
			if (emailExist) {
				return res.status(422).json({ message: "user already exist." });
			}

			const adduser = new User({ name, email, phone, work, passwd, cpasswd });
			adduser
				.save()
				.then(() => {
					res.status(201).json({ message: "user registered successfully." });
					console.log("user registered successfully.");
				})
				.catch((error) => {
					res.status(500).json({ message: "registration failed", error });
					console.log("Registratin failed.", error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});
// router.post("./MernLogin", (req, res) => {
// 	const { name, email, phone, work, passwd, cpasswd } = req.body;
// 	if (!email || !passwd || !cpasswd) {
// 		return res.json({ rmessage: "please fill the empty field. " });
// 	}
// 	User.findOne({ email: email })
// 		.than()
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });
//promise return method ends  here...

module.exports = router;

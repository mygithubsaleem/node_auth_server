const express = require("express");
const router = express.Router();
require("../Db/connection");
const pwbcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userSchema");

// router.get("/", (req, res) => {
// 	console.log("hello world from  mern signup page router/router/router...");
// 	res.send("hellow from router router router js...");
// });

//promise return method start from here...
// router.post("/MernSignup", (req, res) => {
// 	const { name, email, phone, work, passwd, cpasswd } = req.body;
// 	if (!name || !email || !phone || !work || !passwd || !cpasswd) {
// 		return res.json({ messege: "please fill the required data..." });
// 	}
// 	console.log(req.body);
// 	User.findOne({ email: email })
// 		.then((emailExist) => {
// 			if (emailExist) {
// 				return res.status(422).json({ message: "user already exist." });
// 			}

// 			const adduser = new User({ name, email, phone, work, passwd, cpasswd });
// 			adduser
// 				.save()
// 				.then(() => {
// 					res.status(201).json({ message: "user registered successfully." });
// 					console.log("user registered successfully.");
// 				})
// 				.catch((error) => {
// 					res.status(500).json({ message: "registration failed", error });
// 					console.log("Registratin failed.", error);
// 				});
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });

//promise return method ends  here...

// async method starts from here......

router.post("/MernSignup", async (req, res) => {
	const { name, email, phone, work, passwd, cpasswd } = req.body;

	try {
		const emailExist = await User.findOne({ email: email });
		if (emailExist) {
			console.log("you are already registered...server..");
			return res.status(422).json({ message: "email alredy exist...from server..." });
		} else if (passwd != cpasswd) {
			return console.log("password ansd confirm password are not same ...from server...");
		} else {
			const newuser = new User({ name, email, phone, work, passwd, cpasswd });

			const registerUser = await newuser.save();
			res.status(201).json({ message: "registration successful....from server..." });
			console.log(`${newuser}   registration successful...from server...`);
		}
	} catch {
		(error) => {
			console.log("registration failed. response from server. router post failed..", error);
		};
	}
});

// async signup component  ends here......

router.post("/MernLogin", async (req, res) => {
	try {
		const { email, passwd } = req.body;

		const dbUser = await User.findOne({ email: email });
		if (!dbUser) {
			return res.status(403).json({ message: "user not found" });
		} else {
			const isMatchPwd = await pwbcrypt.compare(passwd, dbUser.passwd);
			if (isMatchPwd) {
				const token = await dbUser.generateAuthToken();
				return res.status(200).json({ user: dbUser, authToken: token });
			} else {
				return res.status(403).json({ message: "invalid credentials" });
			}
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: "some exception has occured during this operation from server...", err });
		console.log(err);
	}
});

module.exports = router;

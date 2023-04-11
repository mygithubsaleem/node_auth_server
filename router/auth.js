const express = require("express");
const router = express.Router();
require("../Db/connection");
const pwbcrypt = require("bcryptjs");

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
	console.log("response from server auth", req.body);

	const { name, email, phone, work, passwd, cpasswd } = req.body;

	if (!name || !email || !phone || !work || !passwd || !cpasswd) {
		return res.json({ message: "fill the empty field please..." });
	}
	try {
		const emailExist = await User.findOne({ email: email });
		if (emailExist) {
			return res.status(422).json({ message: "email alredy exist." });
		} else if (passwd != cpasswd) {
			console.log("password ansd confirm password are not same");
			return res.json({ err: "password and confirm password are not same" });
		} else {
			const user = new User({ name, email, phone, work, passwd, cpasswd });

			const registerUser = await user.save();
			res.status(201).json({ message: "registration successful." });
			console.log(`${user}   registration successful.`);
			console.log(registerUser);
		}
	} catch {
		(error) => {
			console.log(error);
		};
	}
});

// async signup component  ends here......

router.post("/MernLogin", async (req, res) => {
	const { email, passwd } = req.body;

	if (!email || !passwd) {
		return res.status(400).json({ err: "please enter email or password first..." });
	}

	try {
		const dbUser = await User.findOne({ email: email });
		let response = null;
		if (dbUser) {
			const isMatchPwd = await pwbcrypt.compare(passwd, dbUser.passwd);
			response = isMatchPwd ? "user loged in successfully" : "Invalid Password";
		} else {
			response = "User not found";
		}

		return res.status(200).json({ message: response });
	} catch (err) {
		res
			.status(500)
			.json({ message: "some exception has occured during this operation", err })
			.log(err);
	}
});

module.exports = router;

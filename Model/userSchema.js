const mongoose = require("mongoose");
const pwbcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	phone: { type: String, require: true },
	work: { type: String, require: true },
	passwd: { type: String, require: true },
	cpasswd: { type: String, require: true },
	tokens: [{ token: { type: String, require: true } }],
});

userSchema.pre("save", async function (next) {
	if (this.isModified("passwd")) {
		this.passwd = await pwbcrypt.hash(this.passwd, 12);
		this.cpasswd = await pwbcrypt.hash(this.cpasswd, 12);
	}
	next();
});

userSchema.methods.generateAuthToken = async function () {
	try {
		let loginToken = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
		this.tokens = this.tokens.concat({ token: loginToken });
		this.tokens = this.tokens.concat({ token: loginToken });

		await this.save();
		//return token;
		return loginToken;
	} catch (err) {
		console.log(err);
	}
};

const User = mongoose.model("USER", userSchema);
module.exports = User;

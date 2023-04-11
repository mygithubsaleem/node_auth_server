const mongoose = require("mongoose");
const pwbcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	phone: { type: String, require: true },
	work: { type: String, require: true },
	passwd: { type: String, require: true },
	cpasswd: { type: String, require: true },
});

userSchema.pre("save", async function (next) {
	if (this.isModified("passwd")) {
		this.passwd = await pwbcrypt.hash(this.passwd, 12);
		this.cpasswd = await pwbcrypt.hash(this.cpasswd, 12);
	}
	next();
});

const User = mongoose.model("USER", userSchema);
module.exports = User;

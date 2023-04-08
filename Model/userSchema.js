const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	phone: { type: String, require: true },
	work: { type: String, require: true },
	passwd: { type: String, require: true },
	cpasswd: { type: String, require: true },
});
const User = mongoose.model("USER", userSchema);
module.exports = User;

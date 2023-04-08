const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		useUniFiedTopology: true,
		// useFindAndModify: false,
	})
	.then(() => {
		console.log(" connected to db");
	})
	.catch((error) => {
		console.log("not connected to db due to error...", error);
	});
//module.exports = DB;

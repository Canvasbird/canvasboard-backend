const mongoose = require("mongoose");

var config = require("../config/config");


mongoose
	.connect(config.db.DATABASE_HOST_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database Connected 🚀");
	})
	.catch((err) => {
		console.log("Database Connection Failed 💩");
		console.error(err);
		process.exit(1);
	});

mongoose.connection.on('error', function (err) {
	console.log("Mongoose connection has occured an error: " + err);
});

mongoose.connection.on('disconnected', function () {
	console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log("Mongoose default connection is disconnected due to application termination");
		process.exit(0)
	});
});


const db = {};

db.Users = require('./collections/user');
db.Boards = require('./collections/boards');
db.SharedFiles = require('./collections/sharedFiles');

db.mongoose = mongoose;

module.exports = db;
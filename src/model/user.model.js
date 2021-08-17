var dbConn = require("../../config/db.config");

var User = function (user) {
	this.user_id = user.user_id;
	this.email = user.email;
	this.name = user.name;
	this.password = user.password;
	this.active_status = user.active_status;
	this.create = user.image;
	this.emp_image = user.create;
	this.update = user.update;
	this.gid = user.gid;
	this.rem_token = user.rem_token;
};

// get user by id and password
User.validate = (data, result) => {
	dbConn.query(
		"SELECT * FROM user WHERE email= ? AND password= ?",
		[data.email, data.password],
		(err, res) => {
			if (err) {
				console.log("User not found");
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

User.checkUser = (user_id, result) => {
	dbConn.query(
		"SELECT * FROM user WHERE UserId LIKE ?",
		user_id + "%",
		(err, res) => {
			if (err) {
				console.log("Error while fetching user by id", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

// get all active users
User.getActiveUsers = (result) => {
	dbConn.query("SELECT * FROM user WHERE ActiveStatus LIKE 1", (err, res) => {
		if (err) {
			console.log("Error while fetching users", err);
			result(null, err);
		} else {
			console.log("Employees fetched succesfully", err);
			result(null, res);
		}
	});
};


// get all deactive users
User.getDeactiveUsers = (result) => {
	dbConn.query("SELECT * FROM user WHERE ActiveStatus LIKE 0", (err, res) => {
		if (err) {
			console.log("Error while fetching users", err);
			result(null, err);
		} else {
			console.log("Employees fetched succesfully", err);
			result(null, res);
		}
	});
};

module.exports = User;

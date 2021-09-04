var dbConn = require("../../config/db.config");

var Admin = function (admin) {
	this.admin_id = admin.admin_id;
	this.email = admin.email;
	this.fname = admin.fname;
	this.lname = admin.lname;
	this.password = admin.password;
};

// get user by id and password
Admin.validate = (data, result) => {
	dbConn.query(
		"SELECT * FROM admin WHERE AdminId= 1 AND password= ?",
		[data.oldpass],
		(err, res) => {
			if (err) {
				console.log("Admin not found");
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Admin.checkAdmin = (user_id, result) => {
	dbConn.query(
		"SELECT * FROM admin WHERE AdminId LIKE ?",
		user_id + "%",
		(err, res) => {
			if (err) {
				console.log("Error while fetching admin by id", err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};
Admin.getAdmin = (admin_id, result) => {
	dbConn.query('SELECT * FROM admin WHERE AdminId=1', admin_id, (err, res) => {
		if (err) {
			console.log('Error while fetching admin by id', err);
			result(null, err);
		} else {
			console.log('Admin fetch is succesful');
			result(null, res);
		}
	})
}

Admin.getCounts = (result) => {
	dbConn.query("SELECT (SELECT COUNT(user.UserId) FROM user ) AS usercnt, (SELECT (SELECT COUNT(cover.CoverId) FROM cover)+(SELECT COUNT(lyrics.LyricId) FROM lyrics))  AS posts", (err, res) => {
		if (err) {
			console.log("Error while fetching counts", err);
			result(null, err);
		} else {
			console.log("Counts fetched succesfully", err);
			result(null, res);
		}
	});
};

Admin.editDetails = (data, result) => {
	var email = data.email;
	var fname = data.fname;
	var lname = data.lname;

	if (email !== '') {
		if (fname !== '') {
			if (lname !== '') {
				var sql = "UPDATE admin SET Email='" + email + "' ,Fname='" + fname + "',Lname='" + lname + "' WHERE AdminId=1";
			}
			else {
				var sql = "UPDATE admin SET Email='" + email + "' ,Fname='" + fname + "' WHERE AdminId=1";
			}
		}

		else {
			if (lname !== '') {
				var sql = "UPDATE admin SET Email='" + email + "',Lname='" + lname + "' WHERE AdminId=1";
			}
			else {
				var sql = "UPDATE admin SET Email='" + email + "' WHERE AdminId=1";
			}
		}
	}

	else {
		if (fname !== '') {
			if (lname !== '') {
				var sql = "UPDATE admin SET Fname='" + fname + "',Lname='" + lname + "' WHERE AdminId=1";
			}
			else {
				var sql = "UPDATE admin SET Fname='" + fname + "' WHERE AdminId=1";
			}
		}

		else {
			if (lname !== '') {
				var sql = "UPDATE admin SET Lname='" + lname + "' WHERE AdminId=1";
			}
			else {
				var sql = "";
			}
		}
	}


	console.log(sql);
	dbConn.query(sql, function (err, res) {
		if (err) {
			console.log('Error while editing admin data');
			result(null, err);
		} else {
			console.log('edited successfully');
			result(null, res)
		}
	})
}

Admin.changePassword = (data, result) => {
	dbConn.query(
		"Update admin set password = ? where AdminId=1",
		[data.newpass],
		(err, res) => {
			if (err) {
				console.log("Password Change Failed");
				result(err, null);
			} else {
				result(null, res);
			}
		}
	);
};

Admin.getStats = (result) => {
	dbConn.query("SELECT (mon) AS month, COALESCE(U.ct, 0) AS users, COALESCE(L.ct, 0) AS lyric, COALESCE(C.ct, 0) AS covers FROM(SELECT EXTRACT(MONTH FROM CreatedAt) AS mon, COUNT(user.UserId) AS ct FROM   user GROUP  BY mon) U LEFT JOIN (SELECT EXTRACT(MONTH FROM CreatedAt) AS mon,  COUNT(lyrics.LyricId)  AS ct FROM lyrics GROUP  BY mon) L USING (mon) LEFT JOIN (SELECT EXTRACT(MONTH FROM CreatedAt) AS mon, COUNT(cover.CoverId) AS ct FROM cover GROUP  BY mon) C USING (mon) ORDER  BY mon", (err, res) => {
		if (err) {
			console.log("Error while fetching stats", err);
			result(null, err);
		} else {
			console.log("Stats fetched succesfully", err);
			result(null, res);
		}
	});
};


module.exports = Admin;

/*********************************************************
This model connects to the 'users' table in your database.
*********************************************************/

var	db = require('../db'), //This imports the database connection and makes it usable by this page.
  	sequelize = db.sequelize, //This imports the sequelize package to utilize in querying the database for information.
  	Sequelize = db.Sequelize; //This imports the Exact database connection information from db.jsatabase for information.

/*The following function creates the users table in the database if the table does not exist.  A data precautionary step.*/
var Users = sequelize.define('Users', {
	UserId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	UserName: Sequelize.STRING,
	Email: Sequelize.STRING,
	Password: Sequelize.STRING,
	logged_in: Sequelize.INTEGER
});

Users.sync({/*force:true*/}); //If you uncomment the force:true section then the users table in the database will be deleted and reset each time that the app is run.

exports.Users = Users; //This exports the data from the the users table in the database for use in controllers.

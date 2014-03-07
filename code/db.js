/*************************************************************************
You will need to fill out this file with Sequelize database connection 
information.  You will also need to rename this file db.js.  Make sure 
that you "export" (make externally available) the resources that you will
import (i.e., "require") and create in this file.  You should need no more \
than about 2 lines of code in this file.  You should read the 
documentation referenced on the lab specs before attempting to create this 
connection file.  If you took IT210A this will be similar to the database 
connection file you made for PHP in Lab 3.
**************************************************************************/

var database = "it210b";
var username = "lz114";
var password = "lz114";

var Sequelize = require('sequelize');
var sequelize = new Sequelize(database, username, password);

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
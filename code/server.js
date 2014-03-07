/****************************************************************
This file is the driver behind the entire Node JS application.
To start your application, navigate to the directory where this 
file is contained via a terminal (or command prompt) and type in 
the command "node server.js". 
****************************************************************/

//This imports the express packages and makes it available to this file.
var express = require('express'); 
//This imports the database connection and makes it usable by this page.
var db = require('./db');
//This creates a variable used for various parts of a Node JS app.
var path = require('path');
//This creates an empty array that keeps a record of clients that are connected to the server 
// so that can be updated when the database updates.
var connectionsArray = []; 
//This package is used for building out the views in your MVC
var engine = require('ejs-locals'); 
//This package is used for authentication.  This will be used in part 2 of the NOde JS lab.
var passport = require('passport'); 
//This creates a variable used for various parts of a Node JS app.
var util = require('util'); 
//This package is used for authentication.  This will be used in part 2 of the Node JS lab.
var GoogleStrategy = require('passport-google').Strategy;
//This is the time interval between polls on the database to check for any updates or changes.
var POLLING_INTERVAL = 3000; 
//This is a variable used in the polling to check for any updated information in the database.
var pollingTimer; 
// This imports the information from the table "Images" in the database.
var images = require('./model/images'); 
//This allows the informaiton from the Images table in the database to be used on this page.
var Images = images.Image_Info; 
// This imports the information from the table "Images" in the database.
var users = require('./model/users'); 
//This allows the informaiton from the Images table in the database to be used on this page.
var Users = users.Users; 
//This imports the the sequelieze package to ustilize in querying the database for informaiton.
var sequelize = db.sequelize; 
//This imports the the Exact database connection informaiton from db.jsatabase for informaiton.
var Sequelize = db.Sequelize; 
//This package allows for asyncronous calls function calls, 
// helping to streamline the the dataflow for this app.
var async = require('async');
//This imports the needed packages to create an http server. 
var http = require('http'); 
//This creates your instance of your app using the Node JS express.
var app = express(); 
//This creates the actual http server.
var server = http.createServer(app); 
//This creates a listener for socket connections.  
// This is used for real time updating.  You will use this in part 2 of the lab.
var io  = require('socket.io').listen(server); 

app.configure(function() {
  app.engine('ejs', engine);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/../../public'));
  app.use(express.static('assets', __dirname + '/assets'));
});

/*This starts the Node JS application and has it listening on port 1337.  
If you change the port you will have to navigate to a different port to view the website. 
Changing the port will also break the ability to access the page from nodejs.NETID.it.et.byu.edu */
server.listen(8888);  
console.log('Listening to port 8888');  //This prints out on the console (where the app is running) that the app has started and is listening

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://192.168.22.142:8888/auth/google/return', /*DO WORK HERE FOR PART 2, THE IP ADDRESS 
    NEEDS TO BE CHANGED FOR THE IP ADDRESS AND PORT OF YOUR SERVER!  You will need to modify this with your server information (IP Address and port).*/
    realm: 'http://192.168.22.142:8888/' /*DO WORK HERE FOR PART 2, THE IP ADDRESS 
    NEEDS TO BE CHANGED FOR THE IP ADDRESS AND PORT OF YOUR SERVER!  You will need to modify this with your server information (IP Address and port).*/
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

/*The following three lines define the controllers and allow you to create a new controller.  You shouldn't need to create new 
controllers, but if you do add a new element after 'memes', for example, add 'memes1' with comma seperation inside of the [] brackets.*/
['memes',].map(function(controllerName){
  var controller = require('./controllers/' + controllerName);
  controller.setup(app);
});

/*The following 'app.get' function redirects to / after logging in, 
if login fails then it redirects to the login page.  
THIS WILL BE USED IN PART 2 OF THE LAB, BUT YOU DON'T NEED TO MODIFY THIS FUNCTION.*/
app.get('/', function(req, res){
  res.render('index');
});

/*The following 'app.get' function redirects to /memes after logging in, 
if login fails then it redirects to the login page.  
THIS WILL BE USED IN PART 2 OF THE LAB, BUT YOU DON'T NEED TO MODIFY THIS FUNCTION.*/
app.get('/login', function(req, res){
  res.render('login');
  /*This function returns user information in an object named 'user' with parts accessible via 'user.'.  If no user is 
  logged in then this function returns a 1.*/
});

/*The following 'app.get' function redirects to /memes after logging in, 
if login fails then it redirects to the login page.  
THIS WILL BE USED IN PART 2 OF THE LAB, BUT YOU DON'T NEED TO MODIFY THIS FUNCTION.*/
app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),/*This function returns user information in an object named 'user' with parts accessible via 'user.'.  If no user is 
  logged in then this function returns a 1.*/
  function(req, res) {
    res.redirect('/memes/user');
  });

/*The following 'app.get' function redirects the user to the /memes page 
when a user logs out. THIS WILL BE USED IN PART 2 OF THE LAB, BUT YOU DON'T NEED TO MODIFY THIS FUNCTION.*/
app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),/*This function returns user information in an object named 'user' with parts accessible via 'user.'.  If no user is 
  logged in then this function returns a 1.*/
  function(req, res) {
    res.redirect('/memes/user');
  });

/*The following 'app.get' function redirects the / path to the login page.
THIS WILL BE USED IN PART 2 OF THE LAB, BUT YOU DON'T NEED TO MODIFY THIS FUNCTION.*/
app.get('/logout', function(req, res){
  res.redirect('/memes/logout');
});

/*The following function checks for authentication when trying access 
the web application.  To protect any page, just add 'ensureAuthenticated' 
is in a similar position as in App Function 6.*/
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

/*This function(socket.io.on) keeps a list of clients connected to this server.  
After a client connects it adds the client list, when a client disconnects it is 
removed from the client list.  Whenever new information should be pushed to the 
socket it is sent to all of the connected clients.
THIS WILL BE USED IN PART 2 OF THE LAB, BUT YOU DON'T NEED TO MODIFY THIS FUNCTION. */
io.set('log level', 1);
io.sockets.on( 'connection', function ( socket ) {
  console.log('Number of connections:' + connectionsArray.length);
  if (!connectionsArray.length) {
    pollingLoop();
  }

//This function is waiting for a signal form the client using the function 'disconnect'
  socket.on('disconnect', function () {  //when "disconnect" detected
    var socketIndex = connectionsArray.indexOf( socket );
    console.log('*******socket = ' + socketIndex + ' disconnected*****'); //print out in console
    if (socketIndex >= 0) {
      connectionsArray.splice( socketIndex, 1 );
    }
  });

//This function is waiting for a signal from the client using the function'button_click'.  This is listening for a socket.io.emit from the client with the 'button_click' tag.
  socket.on('button_click', function (data, id){
    var count;
    Images.find({ where: {image_id: data}})
    .success(function(image){
      count = image.numLikes + 1 
      Images.update({numLikes:count},{image_id:data})
      .success(function(){
        Images.find({ where: {image_id: data}})
        .success(function(newImage){
          connectionsArray.forEach(function(tmpSocket){
            tmpSocket.volatile.emit('return_click' , newImage, id ); //Send the updated information to all clients with the 'return_click' function ID.
          });
        })
        .error(function(err){
          console.log("*******Did not return correct Image Info for updating HTML ********");
          callback(err);
        });
      })
      .error(function(err){
        console.log("*******Did not return Correct Image Info ********");
        callback(err);
      });
    })
    .error(function(err){
      console.log("*******Did not find the correct Image Info ********");
      callback(err);
    });
  })
  console.log('****A new socket is connected!*****');
  connectionsArray.push( socket );//pushes the updates to all clients.
});

/*This function checks for new information from the database.  When there is 
new information it is passed to all of the clients.  THIS WILL BE USED IN PART 2 OF THE LAB. YOU SHOULDN'T HAVE TO CHANGE ANYTHING HERE.*/
var pollingLoop = function () {
  var query = Images.all(),
    images = [];
  query.on('error', function(err){
    console.log("**"+ err +"**");
    updateSockets( err );
  }) 
  .on('success', function(image){
    for (i=0; i<image.length; i++){
      images.push( image[i] );  
    }
      var query2 = Users.all(),
        users = [];
      query2.on('error', function(err){
        console.log("**"+ err +"**");
        updateSockets( err );
      })
      .on('success', function(user){
        for (i=0; i<user.length; i++){
          users.push( user[i] );
        }
        if(connectionsArray.length) {
          pollingTimer = setTimeout( pollingLoop, POLLING_INTERVAL );
          updateSockets({images:images, users:users});
        }
      });
    });
};

/*The following function updates the time and connections  */
var updateSockets = function ( data ) {
  data.time = new Date();
  connectionsArray.forEach(function( tmpSocket ){
    tmpSocket.volatile.emit( 'notification' , data );
  });
};
// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000; 				// set the port
var config = require('./config'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');
var path = require('path');

// configuration ===============================================================
mongoose.connect(config.databaseUrl); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
//require('./routes/routes.js')(app);

var indexRoutes = require('./routes/index');
var productRouters = require('./routes/product');
app.use('/', indexRoutes);
app.use('/product', productRouters);


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

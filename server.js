//Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

// Setup express
var app = express();

// set port
var PORT = process.env.PORT || 3000;

// express middleware needed for serving static files. For more details
// see here: http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

/// bodyparsers 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// Setup Handlebars.
var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// now import the routes
var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

// Initiate the listener.
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
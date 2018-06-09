// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require('mongoose');
var logger = require("morgan");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var axios = require("axios");
var path = require("path");

// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

//require all models
var db = require("./models");


var PORT = 3000;

// Initialize Express
var app = express();

//Configure middlewar
app.use(logger("dev"));

//Use body-parser for form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Use express.static to serve as  a static directory
app.use(express.static(path.join(__dirname, "/public")));

//set views to handlebars
app.engine("handlebars", exphbs({ 
  extname: ".handlebars",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, '/views/layouts')
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, '/views'));
//setting mongoose to use .then promises instead of default callbacks
mongoose.Promise = Promise;

//connect to mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI);

//Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

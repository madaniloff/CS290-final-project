var express = require('express');
var exphbs = require('handlebars-express');

// default port 7000
var port = process.env.PORT || 7000;
var app = express();

// establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// link public folder
app.use(express.static('public'));


// fill in stuff here

//Home page
app.get("/", function (req, res, next) {

})

app.get("/home", function (req, res, next) {

})

//Locations
app.get("/locations", function (req, res, next) {

})

//Encounters
app.get("/encounters", function(req, res, next) {

})

//Items
app.get("/items", function (req, res, next) {

})

//Characters
app.get("/characters", function (req, res, next) {

})

//Creatures
app.get("/creatures", function (req, res, next) {

})

//Classes
app.get("/classes", function (req, res, next) {

})

//Music
app.get("/music", function (req, res, next) {

})



// catch all middleware function
app.get("*", function (req, res, next) {
    res.status(404).render('404', {
        path: req.url
    })
});

// listen on port 
app.listen(port, function(err) {
    if(err) {
        throw err;
    }
    console.log("Listenning on port", port);
});







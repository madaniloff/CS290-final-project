var express = require('express');
var exphbs = require('express-handlebars');
var pageData = require(''); // DOM FILE

// NEED TO INCLUDE DOM FILES

// default port 7000
var port = process.env.PORT || 7000;
var app = express();

// establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: null}));
app.set('view engine', 'handlebars');

// link public folder
app.use(express.static('public'));

var page_type

// fill in stuff here

//Home page
app.get("/", function (req, res, next) {
    res.status(200).render('homePage');
    next();
})

app.get("/home", function (req, res, next) {
    res.status(200).render('homePage');
    next();
})

//Locations
app.get("/locations", function (req, res, next) {
    page_type = 'locations';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
})

//Encounters
app.get("/encounters", function(req, res, next) {
    page_type = 'encounters';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
})

//Items
app.get("/items", function (req, res, next) {
    page_type = 'items';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
})

//Characters
app.get("/characters", function (req, res, next) {
    page_type = 'characters';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
})

//Creatures
app.get("/creatures", function (req, res, next) {
    page_type = 'creatures';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
})

//Classes
app.get("/classes", function (req, res, next) {
    page_type = 'classes';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
})

//Music https://cephanox.bandcamp.com/
app.get("/music", function (req, res, next) {
    page_type = 'music';
    res.status(200).render('contentPage', {
        type: page_type
    });
    next();
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







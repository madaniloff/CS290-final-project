var express = require('express');
var exphbs = require('express-handlebars');
var pageData = require('./postData.json'); // DOM FILE

// NEED TO INCLUDE DOM FILES

// default port 7000
var port = process.env.PORT || 7000;
var app = express();

// establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: null}));
app.set('view engine', 'handlebars');

// link public folder
app.use(express.static('public'));

var pageType
var exists = 0

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
    pageType = 'locations';
    res.status(200).render('contentPage', {
        pageData,
        pageType
        });
    next();
})

//Locations specific
app.get("/locations/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'locations';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'locations'){
            exists = 1;
        }
    });
    
    if(exists === 1){
         res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }

    next();
})

//Encounters
app.get("/encounters", function(req, res, next) {
    pageType = 'encounters';
    res.status(200).render('contentPage', {
        pageData,
        pageType
    });
    next();
})

//Encounters specific
app.get("/encounters/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'encounters';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'encounters'){
            exists = 1;
        }
    });
    if(exists === 1 ){
        res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        }); 
    }
    next();
})

//Items
app.get("/items", function (req, res, next) {
    pageType = 'items';
    res.status(200).render('contentPage', {
        pageData,
        pageType
    });
    next();
})

//items specific
app.get("/items/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'items';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'items'){
            exists = 1;
        }
    });
    if(exists === 1){
        res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }
    next();
})

//Characters
app.get("/characters", function (req, res, next) {
    pageType = 'characters';
    res.status(200).render('contentPage', {
        pageData,
        pageType
    });
    next();
})

//characters specific
app.get("/characters/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'characters';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'characters'){
            exists = 1;
        }
    });
    if(exists === 1){
        res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }
    next();
})

//Creatures
app.get("/creatures", function (req, res, next) {
    pageType = 'creatures';
    res.status(200).render('contentPage', {
        pageData,
        pageType
    });
    next();
})

//creatures specific
app.get("/creatures/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'creatures';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'creatures'){
            exists = 1;
        }
    });
    if(exists === 1){
        res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }
    next();
})

//Classes
app.get("/classes", function (req, res, next) {
    pageType = 'classes';
    res.status(200).render('contentPage', {
        pageData,
        pageType
    });
    next();
})

//Classes specific
app.get("/classes/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'classes';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'classes'){
            exists = 1;
        }
    });
    if(exists === 1){
        res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }
    next();
})

//Music
app.get("/music", function (req, res, next) {
    pageType = 'music';
    res.status(200).render('contentPage', {
        pageData,
        pageType
    });
    next();
})

//Music specific
app.get("/music/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'music';
    pageData.forEach(function(element){
        if(element.title === post && element.typ === 'music'){
            exists = 1;
        }
    });
    if(exists === 1){
        res.status(200).render('contentPage', {
            pageData, 
            post,
            pageType
        });
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }
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







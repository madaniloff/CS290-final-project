var express = require('express');
var exphbs = require('express-handlebars');
var pageData = require('./postData.json'); // DOM FILE

// NEED TO INCLUDE DOM FILES

// default port 7000
var port = process.env.PORT || 7000;
var app = express();

// establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// link public folder
//app.use('/public', express.static('public'));
app.use(express.static('public'));

//Content Page
app.get("/", function (req, res) {
    res.status(200).render('page', {
        pageData: pageData[0],
        stats: pageData[0].content2,
        typelocation: true
    });
})

//Home
app.get("/home", function (req, res) {
    res.status(200).render('page', {
        pageData: pageData[0],
        stats: pageData[0].content2,
        typelocation: true
    });
})

//Locations
app.get("/location", function (req, res, next) {
    var locationsArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'location') {
            locationsArray.push(pageData[i])
        }
    }
    pageType = 'location'
    res.status(200).render('list', {
        listArray: locationsArray,
        type: pageType
    })
})
//Locations specific
app.get("/location/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'location';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'location'){
            exists = 1;
        }
    });

    if(exists === 1){
         res.status(200).render('page', {
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
app.get("/encounter", function(req, res, next) {
    var encountersArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'encounter') {
            encountersArray.push(pageData[i])
        }
    }
    pageType = 'encounter';
    res.status(200).render('list', {
        listArray: encountersArray,
        type: pageType
    });
})

//Encounters specific
app.get("/encounter/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'encounters';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'encounter'){
            exists = 1;
        }
    });
    if(exists === 1 ){
        res.status(200).render('page', {
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
app.get("/item", function (req, res, next) {
    var itemsArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'item') {
            itemsArray.push(pageData[i])
        }
    }
    pageType = 'item';
    res.status(200).render('list', {
        listArray: itemsArray,
        type: pageType
    });
})

//items specific
app.get("/items/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'items';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'item'){
            exists = 1;
        }
    });
    if(exists === 1){
        res.status(200).render('page', {
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
app.get("/creature", function (req, res, next) {
    var creaturesArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'creature') {
            creaturesArray.push(pageData[i])
        }
    }
    pageType = 'creature'
    res.status(200).render('list', {
        listArray: creaturesArray,
        type: pageType
    }); 
})

//Creatures specific
app.get("/creature/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'creatures';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'creature'){
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
app.get("/class", function (req, res, next) {
    var classArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'class') {
            classArray.push(pageData[i])
        }
    }
    pageType = 'class';
    res.status(200).render('list', {
        listArray: classArray,
        type: pageType
    });
})

//Classes specific
app.get("/classes/:post", function (req, res, next) {
    var post = req.params.post.toLowerCase();
    pageType = 'class';
    pageData.forEach(function(element){
        if(element.title === post && element.type === 'class'){
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
    res.status(200).redirect('https://cephanox.bandcamp.com/')
})

// listen on port 
app.listen(port, function(err) {
    if(err) {
        throw err;
    }
    console.log("Listenning on port", port);
});



























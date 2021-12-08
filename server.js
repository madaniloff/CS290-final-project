var express = require('express');
var exphbs = require('express-handlebars');
var pageData = require('./postData.json'); // DOM FILE
const path = require('path');

// default port 7000
var port = process.env.PORT || 7000;
var app = express();

// establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// link public folder
//app.use(express.static(__dirname + '/public/'));
app.use('/', express.static(path.join(__dirname, '/public')));
//app.use(express.static(path.join(__dirname,'public')))

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
    var exists
    var post = req.params.post
    pageType = 'location';
    //Check to make sure link exists
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].link === post && pageData[i].type === 'location') {
            exists = true
            var index = i
        }
    }
    if (exists === true) {
         res.status(200).render('page', {
            pageData: pageData[index],
            stats: pageData[index].content2,
            typelocation: true
        });
    }
    else {
        res.status(404).render('404', {
            path: req.url
        });
    }
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
    var exists
    var post = req.params.post
    pageType = 'encounter';
    //Check to make sure link exists
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].link === post && pageData[i].type === 'encounter') {
            exists = true
            var index = i
        }
    }
    if (exists === true) {
         res.status(200).render('page', {
            pageData: pageData[index],
            stats: pageData[index].content2,
        });
    }
    else {
        res.status(404).render('404', {
            path: req.url
        });
    }    
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

//Items specific
app.get("/item/:post", function (req, res, next) {
    var exists
    var post = req.params.post
    pageType = 'item';
    //Check to make sure link exists
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].link === post && pageData[i].type === 'item') {
            exists = true
            var index = i
        }
    }
    if (exists === true) {
         res.status(200).render('page', {
            pageData: pageData[index],
            stats: pageData[index].content2,
        });
    }
    else {
        res.status(404).render('404', {
            path: req.url
        });
    }
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
    var exists
    var post = req.params.post
    pageType = 'creature';
    //Check to make sure link exists
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].link === post && pageData[i].type === 'creature') {
            exists = true
            var index = i
        }
    }
    if (exists === true) {
         res.status(200).render('page', {
            pageData: pageData[index],
            stats: pageData[index].content2,
        });
    }
    else {
        res.status(404).render('404', {
            path: req.url
        });
    }
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
app.get("/class/:post", function (req, res, next) {
    var exists
    var post = req.params.post
    pageType = 'class';
    //Check to make sure link exists
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].link === post && pageData[i].type === 'class') {
            exists = true
            var index = i
        }
    }
    if (exists === true) {
         res.status(200).render('page', {
            pageData: pageData[index],
            stats: pageData[index].content2,
        });
    }
    else {
        res.status(404).render('404', {
            path: req.url
        });
    }
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
    console.log("Listening on port", port);
});



























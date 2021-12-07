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
app.use(express.static('public'));

//Content Page
app.get("/", function (req, res) {
    res.status(200).render('page', {
        pageData: pageData[0],
        stats: pageData[0].content2,
        typelocation: true
    });
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







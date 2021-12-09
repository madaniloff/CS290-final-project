var express = require('express');
var exphbs = require('express-handlebars');
var pageData = require('./postData.json'); 
var suggestionData = require('./suggestionData.json');
const path = require('path');
const fs = require('fs');

//Default port 7000
var port = process.env.PORT || 7000;
var app = express();

//Establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Link public folder
app.use('/', express.static(path.join(__dirname, '/public')));

app.use(express.json());

//Post suggestion
app.post("/suggestion/add", function(req, res, next){
    var suggestion = req.body.content
    var title = req.body.description
    if(suggestion && title){
        suggestionData.push({
            type: req.body.type,
            link: "suggestion/" + title,
            description: title,
            content: suggestion
        })

        fs.writeFile(
            __dirname + '/suggestionData.json',
            JSON.stringify(suggestionData, null, 2), function(err){
                if(!err){
                    res.status(200).send("Suggestion uploaded successfully");
                }
                else{
                    console.log(err)
                    res.status(500).send("Error uploading suggestion");
                }
            }
        )
    }
    else{
        res.status(400).send("Please enter suggestion content.");
    } 
})

//Content Page
app.get("/", function (req, res) {
    res.status(200).render('page', {
        pageData: pageData[0],
        stats: pageData[0].content2,
        typeLocation: true
    });
})

//Home
app.get("/home", function (req, res) {
    res.status(200).render('page', {
        pageData: pageData[0],
        stats: pageData[0].content2,
        typeLocation: true
    });
})

//Locations
app.get("/location", function (req, res, next) {
    var locationsArray = []
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'location') {
            locationsArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === 'location'){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = 'location'
    res.status(200).render('list', {
        listArray: locationsArray,
        type: pageType,
        suggestions: suggestionArray
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
            typeLocation: true
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
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'encounter') {
            encountersArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === 'encounter'){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = 'encounter';
    res.status(200).render('list', {
        listArray: encountersArray,
        type: pageType,
        suggestions: suggestionArray
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
            typeEncounter: true
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
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'item') {
            itemsArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === 'item'){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = 'item';
    res.status(200).render('list', {
        listArray: itemsArray,
        type: pageType,
        suggestions: suggestionArray
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
            typeItem: true
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
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'creature') {
            creaturesArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === 'creature'){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = 'creature'
    res.status(200).render('list', {
        listArray: creaturesArray,
        type: pageType,
        suggestions: suggestionArray
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
            typeCreature: true
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
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === 'class') {
            classArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === 'class'){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = 'class';
    res.status(200).render('list', {
        listArray: classArray,
        type: pageType,
        suggestions: suggestionArray
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
            typeClass: true
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

//Suggestion
app.get('/:type/suggestion/:post', function(req, res, next){
    var post = req.params.post
    var type = req.params.type
    for(var i = 0; i < suggestionData.length; i++){
        if(suggestionData[i].description === post && suggestionData[i].type === type){
            var suggestion = suggestionData[i]
        }
    }
    if(suggestion){
        res.status(200).render('suggestion', suggestion)
    }
    else{
        res.status(404).render('404', {
            path: req.url
        });
    }
})


//Listen on port 
app.listen(port, function(err) {
    if(err) {
        throw err;
    }
    console.log("Listening on port", port);
});


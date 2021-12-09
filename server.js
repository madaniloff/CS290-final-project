var express = require("express");
var exphbs = require("express-handlebars");
var pageData = require("./postData.json"); 
var suggestionData = require("./suggestionData.json");
const path = require("path");
const fs = require("fs");

//Default port 7000
var port = process.env.PORT || 7000;
var app = express();

//Establish handlebars dependencies
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Link public folder
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json());

//Content Page

app.get("/", function(req, res) {
    res.status(200).render("page", {
        pageData: pageData[0]
    });
})

app.get("/:path1/:path2", function(req, res) {
    var path2 = req.params.path2;
    var index = -1;

    for (var i = 0; i < pageData.length; i++)
        if (pageData[i].link === path2)
            var index = i;

    if (index != -1) {
        if (pageData[index].type === "creature")
            var typeCreature = true;
        else
            var typeCreature = false;

        res.status(200).render("page", {
            pageData: pageData[index],
            typeCreature: typeCreature
        });
    }
    else
        res.status(404).render("404", {
            path: req.url
        });
})

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
            __dirname + "/suggestionData.json",
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

//Creatures
app.get("/creature", function (req, res) {
    var creaturesArray = [];
    var suggestionArray = [];

    for (var i = 0; i < pageData.length; i++)
        if (pageData[i].type === "creature")
            creaturesArray.push(pageData[i])

    for(var j = 0; j < suggestionData.length; j++)
        if(suggestionData[j].type === "creature")
            suggestionArray.push(suggestionData[j])

    pageType = "Creatures";

    res.status(200).render("list", {
        type: pageType,
        listArray: creaturesArray,
        suggestions: suggestionArray,
    }); 
})

//Locations
app.get("/location", function (req, res, next) {
    var locationsArray = []
    var suggestionArray = []

    for (var i = 0; i < pageData.length; i++)
        if (pageData[i].type === "location")
            locationsArray.push(pageData[i])

    for(var j = 0; j < suggestionData.length; j++)
        if(suggestionData[j].type === "location")
            suggestionArray.push(suggestionData[j])

    pageType = "Locations"
    res.status(200).render("list", {
        listArray: locationsArray,
        type: pageType,
        suggestions: suggestionArray
    })
})

//Encounters
app.get("/encounter", function(req, res, next) {
    var encountersArray = []
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === "encounter") {
            encountersArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === "encounter"){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = "Encounters";
    res.status(200).render("list", {
        listArray: encountersArray,
        type: pageType,
        suggestions: suggestionArray
    });
})

//Items
app.get("/item", function (req, res, next) {
    var itemsArray = []
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === "item") {
            itemsArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === "item"){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = "Items";
    res.status(200).render("list", {
        listArray: itemsArray,
        type: pageType,
        suggestions: suggestionArray
    });
})

//Classes
app.get("/class", function (req, res, next) {
    var classArray = []
    var suggestionArray = []
    for (var i = 0; i < pageData.length; i++) {
        if (pageData[i].type === "class") {
            classArray.push(pageData[i])
        }
    }
    for(var j = 0; j < suggestionData.length; j++){
        if(suggestionData[j].type === "class"){
            suggestionArray.push(suggestionData[j])
        }
    }
    pageType = "Classes";
    res.status(200).render("list", {
        listArray: classArray,
        type: pageType,
        suggestions: suggestionArray
    });
})

//Music
app.get("/music", function (req, res, next) {
    res.status(200).redirect("https://cephanox.bandcamp.com/")
})

//Suggestion
app.get("/:type/suggestion/:post", function(req, res, next){
    var post = req.params.post
    var type = req.params.type
    for(var i = 0; i < suggestionData.length; i++){
        if(suggestionData[i].description === post && suggestionData[i].type === type){
            var suggestion = suggestionData[i]
        }
    }
    if(suggestion){
        res.status(200).render("suggestion", suggestion)
    }
    else{
        res.status(404).render("404", {
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


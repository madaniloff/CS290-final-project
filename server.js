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

app.get("/:type/:path", function(req, res, next) {
    var type = req.params.type;
    var path = req.params.path;
    var index = -1;

    for (var i = 0; i < pageData.length; i++)
        if (pageData[i].type === type && pageData[i].link === path)
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
        next()
})

//Creatures
app.get("/creature", function (req, res) {
    var creaturesArray = [];
    var suggestionArray = [];

    for (var i = 0; i < pageData.length; i++)
        if (pageData[i].type === "creature")
            creaturesArray.push(pageData[i])

    for(var j = 0; j < suggestionData.length; j++)
        if (suggestionData[j].type === "creature")
            suggestionArray.push(suggestionData[j])

    pageType = "Creatures";

    res.status(200).render("list", {
        type: pageType,
        listArray: creaturesArray,
        suggestions: suggestionArray,
    }); 
})

//Locations
app.get("/location", function (req, res) {
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
app.get("/encounter", function(req, res) {
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
app.get("/item", function (req, res) {
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
app.get("/class", function (req, res) {
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
app.get("/music", function (req, res) {
    res.status(200).redirect("https://cephanox.bandcamp.com/")
})

//Suggestion
app.get("/:type/suggestion/:post", function(req, res) {
    var type = req.params.type;
    var path = req.params.post;

    for (let i = 0; i < suggestionData.length; i++)
        if (suggestionData[i].type === type && suggestionData[i].link === path)
            var suggestion = suggestionData[i]

    if (suggestion)
        res.status(200).render("suggestion", suggestion)
    else
        res.status(404).render("404", {
            path: req.url
        });
})

//Add suggestion
app.post("/*/add", function(req, res) {
    var type = req.body.type;
    var title = req.body.title;
    var link = req.body.link;
    var content = req.body.content;

    if (type && title && link && content) {
        suggestionData.push({
            type: type,
            title: title,
            link: link,
            content: content
        })

        fs.writeFile(__dirname + "/suggestionData.json",
            JSON.stringify(suggestionData, null, 2), function(err) {
                if (!err)
                    res.status(200).send("Suggestion uploaded successfully");
                else {
                    console.log(err);
                    res.status(500).send("Error uploading suggestion");
                }
            }
        )
    }
    else
        res.status(400).send("Please enter suggestion content.");
})

//Search
app.get("/search/:term", function(req, res) {
    var term = req.params.term.toLowerCase();

    var pageArray = [];
    var suggestionArray = [];

    for (let i = 0; i < pageData.length; i++)
        pageArray.push(pageData[i]);
    
    for (let i = 0; i < suggestionData.length; i++)
        suggestionArray.push(suggestionData[i]);

    searchSort(pageArray, term);
    searchSort(suggestionArray, term);

    pageType = "Search Results"
    res.status(200).render("search", {
        listArray: pageArray,
        suggestions: suggestionArray,
        type: pageType
    })
})

function searchSort(array, term) {
    array.sort(function(a, b) {
        a_score = searchEvaluate(a, term);
        b_score = searchEvaluate(b, term);

        if (a_score > b_score)
            return -1;
        else if (b_score > a_score)
            return 1;
        else
            return 0;
    });

    searchFilter(array, term);
}

function searchEvaluate(post, term) {
    var score = 0;
    var title = post.title.toLowerCase();

    //If the title matches the term exactly
    if (title == term)
        score += 100;
    
    //If the title starts with the term
    if (title.substring(0, term.length) == term)
        score += 50;

    //If the title contains the term multiple times
    var expression = new RegExp(term, "gi");
    var occurrences = title.match(expression);

    if (occurrences) {
        occurrences = occurrences.length;
        score += occurrences * 50;
    }

    return score;
}

function searchFilter(array, term) {
    for (let i = 0; i < array.length; i++)
        if (searchEvaluate(array[i], term) < 50) {
            array.splice(i, 1);
            i--;
        }
}

//404
app.get("*", function(req, res) {
    res.status(404).render("404", {
        path: req.url
    });
})

//Listen on port 
app.listen(port, function(err) {
    if (err) {
        console.log("Error starting server");
        throw err;
    }
    else
        console.log("Listening on port", port);
});


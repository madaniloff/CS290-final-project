var express = require('express');
var exphbs = require('handlebars-express');

// default port 7000
var port = process.env.PORT || 7000;
var app = express();

// establish handlebars dependencies
app.engine('handlebars', exphbs.engine({defaultLayout: null}));
app.set('view engine', 'handlebars');

// link public folder
app.use(express.static('public'));


// fill in stuff here




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







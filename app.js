var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=c2465077&s=," + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode ==200){
            var data = JSON.parse(body);
            data
            .Search
            .sort((a,b) => {
                return b.Year - a.Year;
            })
            res.render("results", {data});
            console.log(data);
        }
    });
});

app.listen(3000, '127.0.0.1', function(){
    console.log("Movie App has started!!!");
});

// var x = {something: 12345}
// var y =[x]
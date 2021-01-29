const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var request = require("request")

    app.get("/movies/search", (req,res) => {
        var search = ""
    if (req.body.s) {
        search = req.body.s
    } else {
        search = ""
    }
    var jar = request.jar()
    jar.setCookie(request.cookie("__cfduid=dd487ea2fb4795217273a57cbe65d98981611844441"), "https://www.omdbapi.com/")

        var options = {
            method: "GET",
            url: "https://www.omdbapi.com/",
            qs: { s: search, apikey: "e877223" },
            headers: { "content-type": "application/json" },
            jar: "JAR"
        }
    
        request(options, function (error, response, body) {
            if (error) throw new Error(error)
            var abc = JSON.parse(body)
            if (abc.Error == "Incorrect IMDb ID.") {
                res.send("Incorrect IMDb ID.")
            } else {
                res.send(abc)
            }
        })
   
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(4000, () => console.log("server up and runing on port 4000!"));

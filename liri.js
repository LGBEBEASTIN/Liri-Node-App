require("dotenv").config();

//Sets Requires
let fs = require("fs");
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let nodeSpotify = require("node-spotify-api");

//Grabs Commands
let action = process.argv[2];
let mediaName = process.argv.slice(3).join(" ");

//Different Actions
if (action === "movie-this") {
    if (process.argv[3] === undefined) {
        showMovie("Mr.+Nobody");
    }
    else {
        showMovie(mediaName);
    }
}
else if (action === "concert-this") {
    showConert(mediaName);
};

function showConert(mediaName){

    axios
        .get("https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=codingbootcamp")
        .then(function (concert) {
            console.log("Concert information for " + mediaName);
            console.log("Venue: " + concert.venue.name);
            console.log("Location: " + concert.venue.city + ", " + concert.venue.region + ", " + concert.venue.country);
            console.log("Date of Event: " + moment(concert.datetime).format("MM/DD/YYYY"));
        })
        .catch(function err() {
            console.log(err);
        });
};

function showMovie(mediaName) {

    axios
        .get("http://www.omdbapi.com/?t=" + mediaName + "&y=&plot=short&tomatoes=true&apikey=trilogy")
        .then(function (movie) {
            console.log("Title: " + movie.data.Title);
            console.log("Year: " + movie.data.Year);
            console.log("IMDB Rating: " + movie.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.data.tomatoRating);
            console.log("Country: " + movie.data.Country);
            console.log("Language: " + movie.data.Language);
            console.log("Plot: " + movie.data.Plot);
            console.log("Actors: " + movie.data.Actors);
        })
        .catch(function err() {
            console.log(err);
        });

};
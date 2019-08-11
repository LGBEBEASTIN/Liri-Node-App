require("dotenv").config();

//Sets Requires
let fs = require("fs");
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

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
    if (process.argv[3] === undefined) {
        showConert("Khalid");
    }
    else {
        showConert(mediaName);
    }
}
else if (action === "spotify-this-song") {
    if (process.argv[3] === undefined){
        showSong("Private Eyes")
    }
    else{
    showSong(mediaName);
    }
};



function showSong(mediaName) {
    spotify.search({ type: "track", query: mediaName},
        function (err, data) {
            if (err) {
                console.log(err);
            }
            let Song = data.tracks.items;
            console.log("Artist: " + Song[0].artists[0].name);
            console.log("Song: " + Song[0].name);
            console.log("Preview: " + Song[0].preview_url);
            console.log("Album: " + Song[0].album.name);
            console.log("----------");
            console.log("----------");
        });
};

function showConert(mediaName) {

    axios
        .get("https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (concert) {
            for (let i = 0; i < concert.data.length; i++) {
                console.log("Information For: " + mediaName)
                let Concert = concert.data[i];
                console.log("Venue: " + Concert.venue.name);
                console.log("Location: " + Concert.venue.city + ", " + Concert.venue.country);
                console.log("Date: " + moment(Concert.datetime).format("MM/DD/YYYY hh:00 A"));
                console.log("----------");
                console.log("----------");
            }
        })
        .catch(function err() {
            console.log(err);
        });
};

function showMovie(mediaName) {

    axios
        .get("http://www.omdbapi.com/?t=" + mediaName + "&y=&plot=short&tomatoes=true&apikey=trilogy")
        .then(function (movie) {
            let Movie = movie.data;
            console.log("Title: " + Movie.Title);
            console.log("Year: " + Movie.Year);
            console.log("IMDB Rating: " + Movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + Movie.tomatoRating);
            console.log("Country: " + Movie.Country);
            console.log("Language: " + Movie.Language);
            console.log("Plot: " + Movie.Plot);
            console.log("Actors: " + Movie.Actors);
            console.log("----------");
            console.log("----------");
        })
        .catch(function err() {
            console.log(err);
        });

};
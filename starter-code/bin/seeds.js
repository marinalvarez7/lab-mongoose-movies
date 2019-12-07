const mongoose = require ("mongoose");
const Star = require ("../models/star");
const Movie = require("../models/movie");

const stars = [
    {name : "Grumpy Cat",
    occupation : "grincheux",
    catchphrase : "I hate this"},
    {name : "Lil BUB",
    occupation : "Dead",
    catchphrase : "Bub bub bub"},
    {name : "Felix the Cat",
    occupation : "Movie star",
    catchphrase : "Let's do this"}

]

const castIds = stars.map(star => star.id);

const movies = []

const allMovies = movies.map((movie, i) => {
    movie.cast = castIds[i];
    return movie;
})

var dbName = "star";
mongoose.connect(`mongodb://localhost/${dbName}`);

Star.create(stars, (err) => {
    if(err) {throw(err) }
    console.log(`Created ${stars.length} stars`);
    mongoose.connection.close();
})


Movie.create(allMovies, (err) => {
    if(err) {throw(err) }
    console.log(`Created ${movies.length} movies`);
    mongoose.connection.close();
})
const express = require('express');
const router  = express.Router();
const Movie = require ("../models/movie");
const Star = require ("../models/star");

router.get("/", (req, res, next) => {
  Movie.find()
    .then(movie => res.render("movies/index",{movie}))
    .catch(error => next(error))
});

router.get("/new", (req, res, next) => {
    Star.find()
    .then(star => {
        console.log('star', star)
        res.render("movies/new",{star})
    })
    .catch(error => next(error))
});

router.post("/new", (req, res, next) => {
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
    
    // créer un nouveau document avec les données
  
    Movie.create({
      title: title,
      genre: genre,
      plot: plot,
      cast: cast
    }).then(function() {
      // le nouveau film est crée
      res.redirect("/movies");
    }).catch(function(err){
      console.error(err);
      next(err);
    })
});

router.post("/:movieid/delete", (req, res, next) => {
    Movie.findByIdAndRemove({'_id':req.params.movieid})
      .then(function() {
        res.redirect("/movies");})
      .catch(error => next(error))
});

router.get("/edit", (req, res, next) => {
    Movie.findById(req.query.movieid)
      .then(movie => res.render("movies/edit",{movie}))
      .catch(error => next(error))
});

router.post("/edit", (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.update({'_id':req.query.movieid}, {$set: {title, genre, plot, cast}}, {new : true})
      .then(function() {
        res.redirect("/movies");})
      .catch(error => next(error))
});

router.get("/:movieid", (req, res, next) => {
    Movie.findById(req.params.movieid)
        .populate("cast")
        .then(movie => res.render("movie/show",{movie}))
        .catch(error => next(error))
});

module.exports = router;
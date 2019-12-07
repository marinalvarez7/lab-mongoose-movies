const express = require('express');
const router  = express.Router();
const Star = require ("../models/star");


router.get("/", (req, res, next) => {
  Star.find()
    .then(star => res.render("stars/index",{star}))
    .catch(error => next(error))
});

router.get("/new", (req, res, next) => {
    res.render("stars/new")
});

router.post("/new", (req, res, next) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    const catchphrase = req.body.catchphrase;
    
    //2. créer un nouveau document avec les données
  
    Star.create({
      name: name,
      occupation: occupation,
      catchphrase: catchphrase,
    }).then(function() {
      // le nouveau star est crée
      res.redirect("/stars");
    }).catch(function(err){
      console.error(err);
      next(err);
    })
});

router.post("/:starid/delete", (req, res, next) => {
    Star.findByIdAndRemove({'_id':req.params.starid})
      .then(function() {
        res.redirect("/stars");})
      .catch(error => next(error))
});

router.get("/edit", (req, res, next) => {
    Star.findById(req.query.starid)
      .then(star => res.render("stars/edit",{star}))
      .catch(error => next(error))
});

router.post("/edit", (req, res, next) => {
    const {name, occupation, catchphrase} = req.body;
    Star.update({'_id':req.query.starid}, {$set: {name, occupation, catchphrase}}, {new : true})
      .then(function() {
        res.redirect("/stars");})
      .catch(error => next(error))
});

router.get("/:starid", (req, res, next) => {
    Star.findById(req.params.starid)
      .then(star => res.render("stars/show",{star}))
      .catch(error => next(error))
});






  

module.exports = router;
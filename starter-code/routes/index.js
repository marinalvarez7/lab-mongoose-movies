const express = require('express');
const router  = express.Router();
const Star = require ("../models/star");
const Movie = require("../models/movie");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;

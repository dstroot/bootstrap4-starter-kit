'use strict';

/**
 * Route Dependencies
 */

var router    = require('express').Router();

/**
 * Main Route
 */

router.get('/', function (req, res, next) {
  res.render('index/index', {
    url: req.url
  });
});

module.exports = router;

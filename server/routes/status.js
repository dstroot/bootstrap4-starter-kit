'use strict';

/**
 * Route Dependencies
 */

var router    = require('express').Router();

/**
 * Main Route
 */

router.get('/', function (req, res, next) {
  res.render('status/status', {
    url: req.url
  });
});

module.exports = router;

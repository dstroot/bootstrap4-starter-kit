'use strict';

/**
 * Route Dependencies
 */

var router    = require('express').Router();

/**
 * Health Check Route
 */

router.get('/', function (req, res, next) {
  res.status(200).json({ message: 'ok' });
});

module.exports = router;

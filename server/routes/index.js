/**
 * Route Dependencies
 */

const router = require('express').Router();

/**
 * Main Route
 */

router.get('/', (req, res) => {
  res.render('index/index', {
    url: req.url,
  });
});

module.exports = router;

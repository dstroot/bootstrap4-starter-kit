/**
 * Model Dependencies
 */

const router = require('express').Router();

/**
* Examples Routes
*/

router.get('/pricing', (req, res) => {
  res.render('examples/pricing', {
    url: req.url,
  });
});

module.exports = router;

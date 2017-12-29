'use strict';

/**
 * Model Dependencies
 */

var router    = require('express').Router();

/**
* Error Routes
*
* NOTE: These routes only exist to test message functionality.
* They are not used under normal circumstances.
*/

router.get('/', function (req, res, next) {
  req.flash('error', "That didn't work! Please recheck your information.");
  req.flash('warning', "Please recheck your information.");
  req.flash('info', "Please recheck your information.");
  req.flash('success', "Awesome! You Rock!");
  res.render('messages/messages', {
    url: req.url
  });
});

module.exports = router;

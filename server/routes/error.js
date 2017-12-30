/**
 * Model Dependencies
 */

const router = require('express').Router();

/**
* Error Routes
*
* NOTE: These routes only exist to test error functionality.
* They are not used under normal circumstances.
*/

// Trigger a 404:
router.get('/404', (req, res, next) => {
  // Since no other middleware will match route /404
  // after this one (and we're not responding here!)
  next();
});

// Trigger a 403 error:
router.get('/403', (req, res, next) => {
  const err = new Error('That is not allowed!');
  err.status = 403;
  next(err);
});

// Trigger a 413 error:
router.get('/413', (req, res, next) => {
  const err = new Error('You sent too much data!');
  err.status = 413;
  next(err);
});

// Trigger a generic (500) error:
router.get('/500', (req, res, next) => {
  const err = new Error('Testing 1, 2, 3!');
  err.status = 500;
  next(err);
});

module.exports = router;

/**
 * Route Dependencies
 */

const router    = require('express').Router();

/**
 * Health Check Route
 */

router.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

module.exports = router;

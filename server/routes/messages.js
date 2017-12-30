/**
 * Model Dependencies
 */

const router = require('express').Router();

/**
* Error Routes
*
* NOTE: These routes only exist to test message functionality.
* They are not used under normal circumstances.
*/

router.get('/', (req, res) => {
  req.flash('error', 'That did not work! Please recheck your information.');
  req.flash('warning', 'Please recheck your information.');
  req.flash('info', 'Please recheck your information.');
  req.flash('success', 'Awesome! You Rock!');

  res.render('messages/messages', {
    url: req.url,
  });
});

module.exports = router;

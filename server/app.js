/**
 * Module Dependencies
 */

require('dotenv').config();                       // https://www.npmjs.com/package/dotenv

// Node Modules
const path = require('path');               // http://nodejs.org/docs/v0.10.25/api/path.html

// Configuration and debugging
const pkg = require('../package.json');
const debug = require('debug')(`${pkg.name}:app`);  // always use app name and name of .js file

// Express 4.x Modules
const csrf       = require('csurf');              // https://github.com/expressjs/csurf
const morgan     = require('morgan');             // https://github.com/expressjs/morgan
const express    = require('express');            // https://npmjs.org/package/express
const favicon    = require('serve-favicon');      // https://github.com/expressjs/favicon
const session    = require('express-session');    // https://github.com/expressjs/session
const compress   = require('compression');        // https://github.com/expressjs/compression
const bodyParser = require('body-parser');        // https://github.com/expressjs/body-parser

// Third Party Modules
const flash      = require('express-flash');      // https://npmjs.org/package/express-flash
const helmet     = require('helmet');             // https://github.com/evilpacket/helmet
const enforce    = require('express-sslify');     // https://github.com/florianheinemann/express-sslify

/**
 * Constants
 */

// time in milliseconds...
const minute  = 1000 * 60;     //      60000
const hour    = (minute * 60); //    3600000
const day     = (hour * 24);   //   86400000
const week    = (day * 7);     //  604800000
const month   = (day * 30);    // 2419200000

/**
 * Session Configuration
 */

const mySession = {
  name: 'sid',    // Generic - don't leak information
  proxy: false,   // Trust the reverse proxy for HTTPS/SSL
  resave: false,  // Forces session to be saved even when unmodified
  secret: process.env.SESSION_SECRET || 'my big secret',
  saveUninitialized: true, // forces a session that is "uninitialized" to be saved to the store
};

mySession.cookie = {
  secure: false,   // Cookies via HTTPS/SSL
  maxAge: hour,
  httpOnly: true,  // Reduce XSS attack vector
};

// // Redis for session storage
// var strategy;
//
// if (process.env.NODE_ENV === 'production') {
//   strategy = function (times) {
//     var delay = Math.min(times * 2, 2000);
//     return delay;
//   };
// } else {
//   strategy = function (times) {
//     if (times < 5) {
//       return 200;
//     }
//   };
// }
//
// var redis = new Redis(process.env.REDIS_URI, {
//   showFriendlyErrorStack: true,
//   retryStrategy: strategy
// });
//
// mySession.store = new RedisStore({
//   client: redis
// });
//
// redis.on('end', function () {
//   debug('Cannot connect to Redis!'.red.bold);
//   process.exit(1);
// });
//
// /**
//  * Configure Database
//  */
//
// // Mongoose for MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/' + pkg.name, function (err) {
//   if (err) {
//     debug('Cannot connect to Mongo!'.red.bold);
//     process.exit(1);
//   }
// });

/**
 * Create Express App
 */

const app = express();

/**
 * Express Configuration and Setup
 */

// Application local variables are provided to *all* templates
// rendered within the application. (personally I would have called
// them "app.globals") They are useful for providing helper
// functions to templates, as well as global app-level data.

// NOTE: you must *not* reuse existing (native) named properties
// for your own variable names, such as name, apply, bind, call,
// arguments, length, and constructor.
app.locals.application  = pkg.name;
app.locals.version      = pkg.version;
app.locals.description  = pkg.description;
app.locals.author       = pkg.author;
app.locals.keywords     = pkg.keywords;
app.locals.ga           = process.env.GOOGLE_ANALYTICS || 'UA-XXXXX-X';

// Format dates/times in jade templates
// Use moment anywhere within a jade template like this:
// p #{moment(Date.now()).format('MM/DD/YYYY')}
// http://momentjs.com/
// Good for an evergreen copyright ;)
app.locals.moment = require('moment');

// Format numbers in jade templates:
// Use numeral anywhere within a jade template like this:
// #{numeral('123456').format('$0,0.00')}
// http://numeraljs.com/
app.locals.numeral = require('numeral');

if (app.get('env') === 'development') {
  // Jade options: Don't minify html, debug intrumentation
  app.locals.pretty = true;
  app.locals.compileDebug = true;

  // Turn on console logging in development
  app.use(morgan('dev'));

  // Turn off caching in development
  // This sets the Cache-Control HTTP header to no-store, no-cache,
  // which tells browsers not to cache anything.
  app.use(helmet.noCache());
}

if (app.get('env') === 'production') {
  // Jade options: minify html, no debug intrumentation
  app.locals.pretty = false;
  app.locals.compileDebug = false;

  // Enable If behind nginx, proxy, or a load balancer (e.g. Heroku, Nodejitsu)
  app.enable('trust proxy', 1);  // trust first proxy

  // In case of a non-encrypted HTTP request, enforce.HTTPS() automatically
  // redirects to an HTTPS address using a 301 permanent redirect. BE VERY
  // CAREFUL with this! 301 redirects are cached by browsers and should be
  // considered permanent.

  // NOTE: Use `enforce.HTTPS(true)` if you are behind a proxy or load
  // balancer that terminates SSL for you (e.g. Heroku, Nodejitsu).
  app.use(enforce.HTTPS(true));

  // This middleware adds the Strict-Transport-Security header to the
  // response. This tells browsers, "hey, only use HTTPS for the next
  // period of time".

  // NOTE: Chrome lets you submit your site for baked-into-Chrome HSTS by adding
  // preload to the header. You can add that with the following code, and
  // then submit your site to the Chrome team at hstspreload.appspot.com.

  // Limitations: This only works if your site actually has HTTPS. It won't
  // tell users on HTTP to switch to HTTPS, it will just tell HTTPS users
  // to continue to use it.
  app.use(helmet.hsts({
    maxAge: month * 12, // Must be at least 18 weeks to be approved by Google
    includeSubdomains: true, // Must be enabled to be approved by Google
    force: true,
    preload: true,
  }));

  // Public Key Pinning: HPKP

  // Trying to prevent: HTTPS certificates can be forged, allowing
  // man-in-the middle attacks. HTTP Public Key Pinning aims to help that.

  // How to use Helmet to mitigate this: Pass the "Public-Key-Pins"
  // header to better assert your SSL certificates.
  // https://tools.ietf.org/html/draft-ietf-websec-key-pinning-21

  // Limitations: Don't let these get out of sync with your certs!
  // app.use(helmet.publicKeyPins({
  //   maxAge: month * 3,
  //   sha256s: ['AbCdEf123=', 'ZyXwVu456='],
  //   includeSubdomains: true,         // optional
  //   reportUri: 'http://example.com'  // optional
  // }));

  // Turn on HTTPS/SSL cookies
  mySession.proxy = true;
  mySession.cookie.secure = true;
}

// Favicon - This middleware should come very early in your stack
// (maybe even first) to avoid processing any other middleware
// if we already know the request is for favicon.ico
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Report CSP violations (also high the middleware stack)
// Browsers will post violations to this route
// https://mathiasbynens.be/notes/csp-reports
app.post('/csp', bodyParser.json(), (req, res) => {
  const err = new Error(`CSP Violation: ${JSON.stringify(req.body)}`);
  if (app.get('env') === 'production') {
    debug(err);
  } else {
    debug(err);
  }
  res.status(204).end();
});

// Setup the view engine (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Compress response data with gzip / deflate.
// This middleware should be placed "high" within
// the stack to ensure all responses are compressed.
app.use(compress());

// http://en.wikipedia.org/wiki/HTTP_ETag
// Google has a nice article about "strong" and "weak" caching.
// It's worth a quick read if you don't know what that means.
// https://developers.google.com/speed/docs/best-practices/caching
app.set('etag', true);  // other values 'weak', 'strong'

// // Use sessions
// // NOTE: cookie-parser not needed with express-session > v1.5
app.use(session(mySession));

/* Thoughts on logging:

** DEVELOPMENT **

In development we can use the standard logger (morgan) and
debug (https://github.com/visionmedia/debug) for console output

Debug has an advantage over `console.log` because it only
outputs when you specifically start node with it enabled.

** PRODUCTION **

Personally I prefer to stream Express logging to a service
like Loggly or Papertrail.  That way I don't worry about
the file system, log shipping/rotating, etc.  Plus these
have useful features for analyzing the data.

If you want to log to a file in production you can do
as follows. (Be careful however because this can fill up
your file system unless you handle it properly.) Probably
best to use a tool like Winston.  But the easy way is
to send the morgan log stream to ./myLogFile.log:

// use {flags: 'w'} to open in write mode, 'a' = append
var logFile = fs.createWriteStream('./myLogFile.log', { flags: 'a' });
app.use(morgan('combined', { stream: logFile }));
*/

// TODO Needs production logging

// Security Settings
app.disable('x-powered-by');          // Don't advertise our server type
app.use(csrf());                      // Prevent Cross-Site Request Forgery
app.use(helmet.ieNoOpen());           // X-Download-Options for IE8+
app.use(helmet.noSniff());            // Sets X-Content-Type-Options to nosniff
app.use(helmet.xssFilter());          // sets the X-XSS-Protection header
app.use(helmet.frameguard({ action: 'deny' })); // Prevent iframe clickjacking
app.use(helmet.dnsPrefetchControl()); // Sets "X-DNS-Prefetch-Control: off".

// Content Security Policy:
//   http://content-security-policy.com/
//   http://www.html5rocks.com/en/tutorials/security/content-security-policy/
//   http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
//
//   NOTE: Set to report only during development.

app.use(helmet.contentSecurityPolicy({
  // Specify directives as normal.
  directives: {
    defaultSrc: [
      '\'self\'',
    ],
    scriptSrc: [
      '\'self\'',

      // "'unsafe-eval'",
      '\'unsafe-inline\'',
      'http://ajax.googleapis.com',
      'https://ajax.googleapis.com',
      'http://www.google-analytics.com',
      'https://www.google-analytics.com',
      'https://code.jquery.com',
      'https://use.fontawesome.com',
    ],
    styleSrc: [
      '\'self\'',

      '\'unsafe-inline\'',
      'http://fonts.googleapis.com',
      'https://fonts.googleapis.com',
    ],
    fontSrc: [
      '\'self\'',
      'http://fonts.googleapis.com',
      'https://fonts.googleapis.com',
      'http://fonts.gstatic.com',
      'https://fonts.gstatic.com',
      'htp://themes.googleusercontent.com',
      'https://themes.googleusercontent.com',
    ],
    imgSrc: [
      '\'self\'',
      'data:',
      'http://chart.googleapis.com',
      'https://chart.googleapis.com',
      'http://www.google-analytics.com',
      'https://www.google-analytics.com',
      'https://d1ir1l1v07ijd0.cloudfront.net/img/ico/favicon.png',
      'https://cdnl.tblsft.com',
    ],
    mediaSrc: [
      '\'self\'',
    ],
    connectSrc: [
      '\'self\'', // limit the origins (via XHR, WebSockets, and EventSource)
      'ws://127.0.0.1:35729/livereload',
    ],
    frameSrc: [
      '\'none\'',
    ],
    sandbox: [
      'allow-same-origin',
      'allow-forms',
      'allow-scripts',
    ],
    objectSrc: ['\'none\''], // An empty array allows nothing through
    reportUri: '/csp',
  },

  // Set to true if you only want browsers to report errors, not block them
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,
}));

// Keep csrf token and config available
app.use((req, res, next) => {
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["res"] }] */
  res.locals._csrf = req.csrfToken();
  next();
});

// Flash messages
app.use(flash());

/**
 * Serve static files
 */

app.use(express.static(path.join(__dirname, '../public'), { maxAge: week }));

/**
 * Routing
 */

app.use('/', require('./routes/index'));
app.use('/status', require('./routes/status'));
app.use('/error', require('./routes/error'));
app.use('/health', require('./routes/health'));
app.use('/messages', require('./routes/messages'));
app.use('/examples', require('./routes/examples'));

/**
 * Error Handling
 */

// Catch 404 and forward to error handlers
// Its a 404 if nothing else responded above!
app.use((req, res, next) => {
  const err = new Error('Page Not Found!');
  err.status = 404;
  next(err);
});

// Main error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  debug(`Error: ${(err.status || 500).toString()} ${err}`);

  if (app.get('env') === 'production') {
    /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["err"] }] */
    delete err.stack; // don't leak information in production!
  }

  res.render('error/error', {
    url: req.url,
    error: err,
  });
});

module.exports = app;

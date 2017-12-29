## Starter Kit

[![Build status][build-badge]][build-url]
[![Coverage][coverage-badge]][coverage-url]
[![Dependency status][dependency-badge]][dependency-url]
[![DevDependency status][dev-dep-badge]][dev-dep-url]

[![Release][release-badge]][release-url]
[![Licensing][license-badge]][license-url]
[![Issue tracking][issues-badge]][issues-url]

[build-badge]: https://img.shields.io/travis/dstroot/bootstrap4-starter-kit.svg
[build-url]: https://travis-ci.org/dstroot/bootstrap4-starter-kit

[coverage-badge]: https://img.shields.io/coveralls/dstroot/bootstrap4-starter-kit/master.svg
[coverage-url]: https://coveralls.io/r/dstroot/bootstrap4-starter-kit?branch=master

[dependency-badge]: https://img.shields.io/david/dstroot/bootstrap4-starter-kit.svg
[dependency-url]: https://david-dm.org/dstroot/bootstrap4-starter-kit

[dev-dep-badge]: https://img.shields.io/david/dev/dstroot/bootstrap4-starter-kit.svg
[dev-dep-url]: https://david-dm.org/dstroot/bootstrap4-starter-kit#info=devDependencies

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: #license

[release-badge]: https://img.shields.io/github/release/dstroot/bootstrap4-starter-kit.svg
[release-url]: https://github.com/dstroot/bootstrap4-starter-kit/releases

[issues-badge]: https://img.shields.io/github/issues/dstroot/bootstrap4-starter-kit.svg
[issues-url]: https://github.com/dstroot/bootstrap4-starter-kit/issues


This is a basic website template with all the bells and whistles.

## Components

* [Bootstrap 4](http://getbootstrap.com/)
* [Font Awesome 5](https://fontawesome.com/)
* [ESLint](https://eslint.org)


## Quick Start

1. Download - `git clone ...`
1. Install the dependencies - `cd ... && npm install`
1. edit `env.example` and save as `.env` using your environment
1. Run the app: `npm start` or `gulp`

## Tests

1. Run - `gulp test` and/or `istanbul cover _mocha -- -R spec`

## How to Add a New Page

1. Run `mocha` (our test runner) and confirm everything works.
1. Are you adding a view to an existing router or creating a new router?
   * Routers are good for organizing a collection of routes. They are conceptually similar to controllers in MVC.
     * /api
     * /auth
     * /error
     * /taxpayer
     * /etc.
1. Let's keep it simple and assume you are adding a new view (page) to an existing router. First, add the test for the route in the appropriate test script. The scripts are located in `test` and are named by router. For example the routers live in `server/routes`. The index route is in `server/routes/index.js` and the associated tests are in `test/index.js`. The code to test a basic view looks like this:

  ```js
  /**
   * Test Index Route
   */

  describe('Test index.js routes', function () {

    describe('GET /newpage', function () {
      it('should return newpage.html', function (done) {
        request(app)
          .get('/newpage')
          .end(function (err, res) {
            expect(err).to.not.exist;
            expect(res).to.have.status(200);
            expect(res.type).to.equal('text/html');
            expect(res.text).to.contain('<h1>New Page!</h1>');
            done();
          });
      });
    });

  });
  ```

1. Now run `mocha` (our test runner) and confirm just this test is failing.
1. OK good.  Now open up `server/route/index.js` and add the route handler. It should look like this:

  ```js
  router.get('/newpage', function (req, res, next) { // when this route is called
    res.render('index/newpage'); // render this view
  });
  ```

1. Now add the view to render.  Views are in `server/views` and all views for the `index.js` route should be in the directory `server/views/index`. Go ahead and create a new file called `newpage.jade`. The basic template looks like this:
  ```jade
  extends ../layouts/layout

  block head
    title #{application} &middot; New Page

  block styles

  block content
    h1 New Page!

  block scripts
  ```
1. Now run `mocha` and confirm the test is passing.
1. Fire it up with `gulp` and try it out. Go to `http://localhost:3000/newpage`.
1. We will add the navigation later...
1. Pop a cold one.

## Todo

1. Hmmm...

## Built With

**THE BASICS**
* [GitHub](https://github.com/) Powerful collaboration, code review, and code management for open source and private projects.
* [io.js](https://iojs.org/en/index.html) io.js is an npm compatible platform originally based on Node.js™.
* [Express](http://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
* [HTML5 ★ BOILERPLATE](https://html5boilerplate.com/) HTML5 Boilerplate helps you build fast, robust, and adaptable web apps or sites. Kick-start your project with the combined knowledge and effort of 100s of developers, all in one little package.
* [Bootstrap](http://getbootstrap.com/) Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.
* [jQuery](https://jquery.com/) jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
* [JADE](http://jade-lang.com/) Jade is a clean, whitespace sensitive syntax for writing html. NEVER write closing tags again!
* [{less}](http://lesscss.org/) Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themable and extendable.

**UI CANDY**
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/) Font Awesome gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.
* [Animate.css](http://daneden.github.io/animate.css/) Super easy CSS animation.
* [Fastclick](https://github.com/ftlabs/fastclick) FastClick is a simple, easy-to-use library for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers. The aim is to make your application feel less laggy and more responsive while avoiding any interference with your current logic.

**PACKAGING / PACKAGE MANAGERS**
* [NPM](https://www.npmjs.com/) npm is the package manager for javascript.
* [Bower](http://bower.io/) Web sites are made of lots of things — frameworks, libraries, assets, utilities, and rainbows. Bower manages all these things for you.

**SECURITY**
* [Helmet](https://github.com/helmetjs/helmet) Helmet helps you secure your Express apps.
* [csurf](https://github.com/expressjs/csurf) CSRF protection. This middleware adds a req.csrfToken() function to make a token which should be added to requests which mutate state, within a hidden form field, query-string etc. This token is validated against the visitor's session.

**TESTING**
* [Mocha](http://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on node.js and the browser, making asynchronous testing simple and fun.
* [Istanbul](https://gotwarlost.github.io/istanbul/) A Javascript code coverage tool written in JS.
* [Coveralls](https://coveralls.io/) We help developers deliver code confidently by showing which parts of your code aren’t covered by your test suite. Free for open source.
* [TravisCI](https://travis-ci.org/) Travis CI is a hosted continuous integration service. It is integrated with GitHub.

## Changelog

1. 05/02/2015 - Initial Commit

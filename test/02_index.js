'use strict';
/* jshint -W030 */
/* global describe */
/* global it */

/**
 * Module Dependencies
 */

var app      = require('../server/app');
var chai     = require('chai');      // http://chaijs.com
var expect   = chai.expect;          // http://chaijs.com/guide/styles/#expect
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

/**
 * Test Index Route
 */

describe('Test index.js routes', function () {

  describe('GET /', function () {
    it('should return index.html', function (done) {
      chai.request(app)
        .get('/')
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('Bootstrap is the most popular HTML, CSS, and JS framework in the world for building responsive, mobile-first projects on the web.');
          done();
        });
    });
  });

});

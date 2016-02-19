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
 * Test Error Routes
 */

describe('Test error.js routes', function () {

  describe('GET /error/404', function () {
    it('should return a 404 error', function (done) {
      chai.request(app)
        .get('/error/404')
        .end(function (err, res) {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(404);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">Page Not Found!</span>');
          done();
        });
    });
  });

  describe('GET /error/403', function () {
    it('should return a 403 error', function (done) {
      chai.request(app)
        .get('/error/403')
        .end(function (err, res) {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(403);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">That is not allowed!</span>');
          done();
        });
    });
  });

  describe('GET /error/413', function () {
    it('should return a 413 error', function (done) {
      chai.request(app)
        .get('/error/413')
        .end(function (err, res) {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(413);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">You sent too much data!</span>');
          done();
        });
    });
  });

  describe('GET /error/500', function () {
    it('should return a 500 error', function (done) {
      chai.request(app)
        .get('/error/500')
        .end(function (err, res) {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(500);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">Testing 1, 2, 3!</span>');
          done();
        });
    });
  });

});

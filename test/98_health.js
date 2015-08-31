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
 * Test Health Route
 */

describe('Test health.js routes', function () {

  describe('GET /health', function () {
    it('should return an OK message', function (done) {
      chai.request(app)
        .get('/health')
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          expect(res.type).to.equal('application/json');
          expect(res.text).to.contain('{"message":"ok"}');
          done();
        });
    });
  });

});

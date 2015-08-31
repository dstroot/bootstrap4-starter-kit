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
 * Test CSP Route
 */

describe('Test CSP route', function () {

  describe('POST /csp', function () {
    it('should return a 204', function (done) {
      chai.request(app)
        .post('/csp')
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.have.status(204);
          done();
        });
    });
  });

});

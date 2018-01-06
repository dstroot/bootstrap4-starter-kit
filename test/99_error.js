/* global describe */
/* global it */

/**
 * Module Dependencies
 */

const app = require('../server/app');
const chai = require('chai'); // http://chaijs.com
const chaiHttp = require('chai-http');

const { expect } = chai; // http://chaijs.com/guide/styles/#expect

chai.use(chaiHttp);

/**
 * Test Error Routes
 */

describe('Test error.js routes', () => {
  describe('GET /error/404', () => {
    it('should return a 404 error', done => {
      chai
        .request(app)
        .get('/error/404')
        .end((err, res) => {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(404);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">Page Not Found!</span>');
          done();
        });
    });
  });

  describe('GET /error/403', () => {
    it('should return a 403 error', done => {
      chai
        .request(app)
        .get('/error/403')
        .end((err, res) => {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(403);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">That is not allowed!</span>');
          done();
        });
    });
  });

  describe('GET /error/413', () => {
    it('should return a 413 error', done => {
      chai
        .request(app)
        .get('/error/413')
        .end((err, res) => {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(413);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">You sent too much data!</span>');
          done();
        });
    });
  });

  describe('GET /error/500', () => {
    it('should return a 500 error', done => {
      chai
        .request(app)
        .get('/error/500')
        .end((err, res) => {
          // expect(err).to.not.be.ok;
          expect(res).to.have.status(500);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('<span class="red">Testing 1, 2, 3!</span>');
          done();
        });
    });
  });
});

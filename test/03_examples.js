/* jshint -W030 */
/* global describe */
/* global it */

/**
 * Module Dependencies
 */

const app = require('../server/app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai; // http://chaijs.com/guide/styles/#expect
const should = chai.should();

chai.use(chaiHttp);

/**
 * Test Index Route
 */

describe('Test examples.js routes', () => {
  describe('GET /examples/pricing', () => {
    it('should return pricing.html', done => {
      chai
        .request(app)
        .get('/examples/pricing')
        .end((err, res) => {
          expect(err).to.not.exist;
          should.not.exist(err);
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain(
            'Quickly build an effective pricing table for your potential customers with this Bootstrap example'
          );
          done();
        });
    });
  });

  describe('GET /examples/landing', () => {
    it('should return landing.html', done => {
      chai
        .request(app)
        .get('/examples/landing')
        .end((err, res) => {
          expect(err).to.not.exist;
          should.not.exist(err);
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain(
            'Tableau helps the world’s largest organizations unleash the power of their most valuable assets: their data'
          );
          done();
        });
    });
  });
});

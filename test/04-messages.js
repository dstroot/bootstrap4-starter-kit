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

describe('Test messages.js routes', () => {
  describe('GET /messages', () => {
    it('should return messages.html', done => {
      chai
        .request(app)
        .get('/messages')
        .end((err, res) => {
          expect(err).to.not.exist;
          should.not.exist(err);
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('That did not work! Please recheck your information.');
          expect(res.text).to.contain('Please recheck your information.');
          expect(res.text).to.contain('An event happened. Now you know.');
          expect(res.text).to.contain('Awesome! You Rock!');
          done();
        });
    });
  });
});

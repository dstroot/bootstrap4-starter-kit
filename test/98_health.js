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
 * Test Health Route
 */

describe('Test health.js routes', () => {
  describe('GET /health', () => {
    it('should return an OK message', done => {
      chai
        .request(app)
        .get('/health')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          expect(res.type).to.equal('application/json');
          expect(res.text).to.contain('{"message":"ok"}');
          done();
        });
    });
  });
});

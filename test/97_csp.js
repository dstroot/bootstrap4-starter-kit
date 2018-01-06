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
 * Test CSP Route
 */

describe('Test CSP route', () => {
  describe('POST /csp', () => {
    it('should return a 204', done => {
      chai
        .request(app)
        .post('/csp')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});

/* jshint -W030 */
/* global describe */
/* global it */

/**
 * Module Dependencies
 */

const app = require('../server/app');
const chai = require('chai');      // http://chaijs.com
const chaiHttp = require('chai-http');

const { expect } = chai;          // http://chaijs.com/guide/styles/#expect

chai.use(chaiHttp);

/**
 * Test Index Route
 */

describe('Test index.js routes', () => {
  describe('GET /', () => {
    it('should return index.html', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          expect(res.text).to.contain('mobile-first projects on the web with the world\'s most popular front-end component library');
          done();
        });
    });
  });
});

'use strict';
/* jshint -W030 */
/* jshint unused: false */
/* global describe */
/* global it */

/**
 * Module Dependencies
 */
var pkg     = require('../package.json');
var chai    = require('chai');  // http://chaijs.com
var expect  = chai.expect;      // http://chaijs.com/guide/styles/#expect
var assert  = chai.assert;      // http://chaijs.com/guide/styles/#assert
var should  = chai.should();    // http://chaijs.com/guide/styles/#should

/*

Test Driven Development (TDD)

The basic idea of Test Driven Development is first the developer writes an (initially failing) automated test case that defines a desired improvement or new function, then produces the minimum amount of code to pass that test, and finally refactors the new code to acceptable standards.

The gotcha with TDD is that too many developers focused on the "How" when writing their unit tests, so they ended up with very brittle tests that did nothing more than confirm that the system does what it does.

Behavior Driven Development (BDD)

Behavior Driven Development is an extension/revision of Test Driven Development. Its purpose is to help the folks devising the system (i.e., the stakeholders) identify appropriate tests to write -- that is, tests that reflect the behavior desired by the stakeholders. The effect ends up being the same -- develop the test and then develop the code/system that passes the test. The hope in BDD is that the tests are actually useful in showing that the system meets requirements.

Summary:

There is little difference between BDD and TDD. BDD is TDD done right. TDD done right is BDD. The problem is that doing TDD right is hard, or more precisely learning how to do TDD right is hard. BDD basically is just TDD with all the testing terminology replaced with behavioral examples terminology.

 */

process.env.NODE_ENV = 'test';

// Test environment
describe('Test app environment', function () {
  it('should be "test"', function (done) {

    // Let's use examples for all styles - we will see
    // all tests pass and are functionally equivalent
    // NOTE: Chai provides all three styles of testing

    // -- TDD Style --

    // examples of "assert" testing approach
    assert.equal(process.env.NODE_ENV, 'test');
    assert.notEqual(process.env.NODE_ENV, 'development');
    assert.notEqual(process.env.NODE_ENV, 'stage');
    assert.notEqual(process.env.NODE_ENV, 'production');

    // -- BDD Style --

    // examples of "expect" testing approach
    expect(process.env.NODE_ENV).to.equal('test');
    expect(process.env.NODE_ENV).to.not.equal('development');
    expect(process.env.NODE_ENV).to.not.equal('stage');
    expect(process.env.NODE_ENV).to.not.equal('production');

    // examples of "should" testing approach
    (process.env.NODE_ENV).should.equal('test');
    (process.env.NODE_ENV).should.not.equal('development');
    (process.env.NODE_ENV).should.not.equal('stage');
    (process.env.NODE_ENV).should.not.equal('production');

    done();
  });
});

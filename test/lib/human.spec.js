/*eslint-env node, mocha*/
const expect    = require('chai').expect;
const human     = require('../../lib/human');
const PropCheck = require('../../index');


describe('props-check/lib/human.js', () => {

    const spec = {
    apple: 'Object'
  , orange: 'Number'
  , banana: 'Function'
  , kiwi: '[Function]'
  , mango: 'Boolean'
  };

  const good_test = {
    apple: {}
  , orange: 10
  , banana: () => null
  , kiwi: [ () => null ]
  , mango: true
  };


  it('should be a function with an arity of 2', () => {

    expect(human({})).to.be.a('function');
    expect(human({}).length).to.equal(2);

  });


  it('should return null if all properties pass the check', () => {

    const actual = human({})(spec, PropCheck(spec, good_test));

    expect(actual).to.be.null;

  });


  it('should return a string if 1 or more properties fail the check', () => {

    const bad_test1 = {
      appel: {}
    , orage: 10
    , nbaana: () => null
    , kiwi: [ () => null ]
    , watermelon: false
    };

    const bad_test2 = {
      watermelon: false
    };

    const bad_test3 = { };

    const actual1 = human({})(spec, PropCheck(spec, bad_test1));
    expect(actual1).to.be.a('String');

    const actual2 = human({})(spec, PropCheck(spec, bad_test2));
    expect(actual2).to.be.a('String');

    const actual3 = human({})(spec, PropCheck(spec, bad_test3));
    expect(actual3).to.be.a('String');

  });

});
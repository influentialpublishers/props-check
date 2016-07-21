/*eslint-env node, mocha*/
const expect    = require('chai').expect;
const Suggest = require('../../lib/suggest');
const DL = require('../../lib/damerau-levenshtein');


describe('props-check/lib/suggest.js', () => {


  it('should be a function with an arity of 3', () => {

    expect(Suggest).to.be.a('function');
    expect(Suggest.length).to.eql(3);

  });


  it('should throw a TypeError if the first argument is not a function',
  () => {

    const test_cases = [
      'foo',
      123,
      [],
      {}
    ];

    test_cases.map((test_case, index) => {

      const test = () => Suggest(test_case, [ 'foo' ], 'bar');

      expect(test).to.throw(
        TypeError
      , 'Compare parameter must be a function with an arity of 2'
      , `Test: ${test_case}, Index: ${index}`
      );

    });

  });


  it('should throw a TypeError if the first argument is not a function with ' +
  'an arity of two', () => {

    const test = () => Suggest((x) => x, [ 'foo' ], 'bar');
    expect(test).to.throw(
      TypeError
      , 'Compare parameter must be a function with an arity of 2'
    );



  });


  it('should throw a TypeError if the second argument is not an array', () => {

    const comparator = (a, b) => a < b;
    const test_cases = [
      'foo',
      123,
      {},
      (x) => x
    ];

    test_cases.map((test_case, index) => {

      const test = () => Suggest(comparator, test_case, 'bar');
      expect(test).to.throw(
        TypeError
        , 'Possibilities parameter must be a non-empty array.'
        , `Test: ${test_case}, Index: ${index}`
      )
    });

  });


  it('should throw a TypeError if the second argument is an empty array',
  () => {
    const comparator = (a, b) => a < b;
    const test = () => Suggest(comparator, [], 'bar');

    expect(test).to.throw(
      TypeError
    , 'Possibilities parameter must be a non-empty array.'
    );

  });
  

  it('should be a curried function', () => {

    const compare       = (x, y) => x < y ? -1 : 1;
    const possibilities = [ 'foo', 'bar' ];

    expect(Suggest(compare)).to.be.a('function');
    expect(Suggest(compare)(possibilities)).to.be.a('function');


  });


  it('should return a list of possibilities', () => {

    const possibilities = [ 'read', 'sanitize', 'validate', 'normalize' ];
    const target = 'santize';
    const expected = [ 'sanitize' ];
    const actual = Suggest(DL, possibilities, target);

    expect(actual).to.deep.eql(expected);

  });


});

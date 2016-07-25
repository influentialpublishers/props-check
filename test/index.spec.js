/*eslint-env node, mocha*/
const expect    = require('chai').expect;
const PropCheck = require('../index');


describe('prop-check/index.js', () => {

  it('should be a function with an arity of 2', () => {

    expect(PropCheck).to.be.a('function');
    expect(PropCheck.length).to.eql(2);

  });


  it('should be a curried function', () => {

    expect(PropCheck({})).to.be.a('function');

  });


  it('should return a map with a list of possible corrections ' +
  'if the key is not in the spec', () => {

    const spec = {
      read: 'Function'
    , sanitize: '[Function]'
    , validate: '[Function]'
    , normalize: '[Function]'
    , normalized: '[Function]'
    };

    const test = {
      raed: () => null
    , santize: [ () => null ]
    , alvidate: [ () => null ]
    , normalize: [ () => null ]
    , normalized: [ () => null ]
    };

    const actual = PropCheck(spec, test);

    expect(actual.raed).to.deep.eql([ 'read' ]);
    expect(actual.santize).to.deep.eql([ 'sanitize' ]);
    expect(actual.alvidate).to.deep.eql([ 'validate' ]);
    expect(actual.normalize).to.deep.eql([]);
    expect(actual.normalized).to.deep.eql([]);

  });


  describe('::custom', () => {

    it('should be a function with an arity of 1', () => {

      expect(PropCheck.custom).to.be.a('function');
      expect(PropCheck.custom.length).to.eql(1);

    });


    it('should be a function that return a function with an arity of 2', () => {

      expect(PropCheck.custom(() => {})).to.be.a('function');
      expect(PropCheck.custom(() => {}).length).to.eql(2);

    });


    it('should be a function that returns a curried function', () => {

      expect(PropCheck.custom(() => {})).to.be.a('function');
      expect(PropCheck.custom(() => {})({})).to.be.a('function');

    });


    it('should use the custom comparator and return a map with ' +
    'a list of possible corrections if the key is not in the spec', () => {

      const spec = {
        apple: 'Function'
      , orange: '[Function]'
      , banana: '[Function]'
      , kiwi: '[Function]'
      };

      const test = {
        appel: () => null
      , orage: [ () => null ]
      , nbaana: [ () => null ]
      , kiwi: [ () => null ]
      };

      const comparator1 = (a, b) => {
        if (a === b) return 0
        else return -1;
      }

      const comparator2 = (a, b) => {
        if (a === b) return 0
        else return 1;
      }

      const actual1 = PropCheck.custom(comparator1)(spec, test);
      const actual2 = PropCheck.custom(comparator2)(spec, test);

      expect(actual1.appel).to.deep.eql([ ]);
      expect(actual1.orage).to.deep.eql([ ]);
      expect(actual1.nbaana).to.deep.eql([ ]);
      expect(actual1.kiwi).to.deep.eql([ ]);

      expect(actual2.appel).to.deep.eql([ "apple", "orange", "banana", "kiwi" ]);
      expect(actual2.orage).to.deep.eql([ "apple", "orange", "banana", "kiwi" ]);
      expect(actual2.nbaana).to.deep.eql([ "apple", "orange", "banana", "kiwi" ]);
      expect(actual2.kiwi).to.deep.eql([ ]);

    });

  });


  describe('::human', () => {

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

    const bad_test1 = {
      appel: {}
    , orage: 10
    , nbaana: () => null
    , kiwi: [ () => null ]
    };

    const bad_test2 = { };

    const bad_test3 = {
      appel: {}
    , orage: 10
    , nbaana: () => null
    , kiwi: [ () => null ]
    };

    const bad_test4 = {
      appel: {}
    , orage: 10
    , nbaana: () => null
    , kiwi: [ () => null ]
    };

    it('should be a function with an arity of 2', () => {

      expect(PropCheck.human).to.be.a('function');
      expect(PropCheck.human.length).to.equal(2);

    });


    it('should be a curried function', () => {

      expect(PropCheck.human({})).to.be.a('function');

    });


    it('should return null if all properties pass the check', () => {

      const actual = PropCheck.human(spec, good_test);

      expect(actual).to.be.null;

    });


    it('should return a string if 1 or more properties fail the check', () => {

      const test = {
        appel: {}
      , orage: 10
      , nbaana: () => null
      , kiwi: [ () => null ]
      };

      const actual1 = PropCheck.human(spec, bad_test1);
      expect(actual1).to.be.a('String');

      console.log(actual1);

      const actual2 = PropCheck.human(spec, bad_test2);
      expect(actual2).to.be.a('String');

    });


  });

});

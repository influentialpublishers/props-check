/*eslint-env node, mocha*/
const expect    = require('chai').expect;
const PropCheck = require('../index');


describe('prop-check/index.js', () => {

  it('should be a function with an arity of 2', () => {

    expect(PropCheck).to.be.a('function');
    expect(PropCheck.length).to.eql(2);

  });


  it('should return a map with a list of possible corrections ' +
  'if the key is not in the spec', () => {

    const spec = {
      read: 'Function'
    , sanitize: '[Function]'
    , validate: '[Function]'
    , normalize: '[Function]'
    };

    const test = {
      raed: () => null
    , santize: [ () => null ]
    , alvidate: [ () => null ]
    , normalize: [ () => null ]
    };

    const actual = PropCheck(spec, test);

    expect(actual.raed).to.deep.eql([ 'read' ]);
    expect(actual.santize).to.deep.eql([ 'sanitize' ]);
    expect(actual.alvidate).to.deep.eql([ 'validate' ]);
    expect(actual.normalize).to.deep.eql([]);

  });

});

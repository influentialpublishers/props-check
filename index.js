const _       = require('ramda');
const suggest = require('./lib/suggest');
const human   = require('./lib/human');
const DL      = require('./lib/damerau-levenshtein');


const run = (comparator, spec, target) => {

  const run = suggest(comparator, _.keys(spec));
  const reducer = (acc, x) => _.assoc(x, run(x), acc);

  return _.reduce(reducer, {}, _.keys(target));
};


const PropCheck = _.curry((spec, target) => run(DL, spec, target));


PropCheck.custom = (comparator) => _.curry((spec, target) =>
  run(comparator, spec, target)
);


PropCheck.customHuman = (custom_messages) => _.curry((spec, target) => {
  return human(custom_messages)(spec, PropCheck(spec, target));
});


PropCheck.human = PropCheck.customHuman({});


module.exports = PropCheck;

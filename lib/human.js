_ = require('ramda');


// notNullOrEmpty :: * -> Boolean
const notNullOrEmpty = _.compose(
  _.not
, _.either(
    _.isNil
  , _.isEmpty
  )
);


// nothingIsWrong :: ( Spec, PropCheckResult ) -> Boolean
const nothingIsWrong = (spec, result) => {
  return _.isEmpty(_.difference(_.keys(spec), _.keys(result)));
};


const formattedInput = (spec, result) => {

  var keys = [];
  for (const key of _.keys(result)) {
    keys.push('\n      ' + key + ': …');
  }

  if (_.isEmpty(keys)) return null;

  return '  You gave me this:\n\n    {'
    + keys.join(',')
    + '\n    }';
};


const formattedIncorrectInput = (spec, result) => {

  var keys = [];
  for (const key of _.keys(result)) {
    if (notNullOrEmpty(result[key])) {
      keys.push(key + ': …');
    }
  }

  if (_.isEmpty(keys)) return null;

  return '  I wasn\'t expecting:\n\n    { '
    + keys.join(', ')
    + ' }';
};


const formattedExpectedInput = (spec, result) => {

  const missing_keys = _.difference(_.keys(spec), _.keys(result));

  var keys = [];
  for (const key of missing_keys) {
    keys.push(key + ': …');
  }

  if (_.isEmpty(keys)) return null;

  return '  You didn\'t give me:\n\n    { '
    + keys.join(', ')
    + ' }';
};


const formattedCorrection = (spec, result) => {

  var suggested_corrections = [];
  for (const key of _.keys(result)) {
    if (notNullOrEmpty(result[key])) {
      suggested_corrections.push(
        '    ' + key + ' <-> ' + result[key].join(' or ')
      );
    }
  }

  if (_.isEmpty(suggested_corrections)) return null;

  return '  You fu*ked up, here\'s how to fix it:\n\n'
    + suggested_corrections.join('\n');
};


const readableMessage = (spec, result) => {
  return _.compose(
    _.join('\n\n')
  , _.filter(notNullOrEmpty)
  )([
    formattedInput(spec, result)
  , formattedIncorrectInput(spec, result)
  , formattedExpectedInput(spec, result)
  , formattedCorrection(spec, result)
  ]);
};


const human = (spec, result) => {

  if (nothingIsWrong(spec, result)) return null;

  return readableMessage(spec, result);
};


module.exports = human;

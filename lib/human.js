_ = require('ramda');


const hasNoValues = _.compose(
  _.isEmpty
, _.flatten
, _.values
);


const formattedInput = (spec, result) => {

  var formatted = '  You gave me this:\n\n    {';

  var keys = [];
  for (const key of _.keys(result)) {
    keys.push('\n      ' + key + ': …');
  }
  formatted += keys.join(',');

  formatted += '\n    }';

  return formatted;
}


const formattedIncorrectInput = (spec, result) => {

  var formatted = '  I wasn\'t expecting:\n\n    { ';

  var keys = [];
  for (const key of _.keys(result)) {
    if (_.not(_.isEmpty(result[key]))) {
      keys.push(key + ': …');
    }
  }
  formatted += keys.join(', ');

  formatted += ' }';

  return formatted;
}


const formattedExpectedInput = (spec, result) => {
  // @TODO: dynamically generate this
  return '  You didn\'t give me:\n\n    { apple: …, orange: …, banana: … }';
}


const formattedCorrection = (spec, result) => {
  // @TODO: dynamically generate this
  return '  You fu*ked up, here\'s how to fix it:\n\n'
    + 'appel <-> apple\norage <-> orange\nnbaana <-> banana';
}


const readableMessage = (spec, result) => {
  return formattedInput(spec, result) +
    '\n\n' +
    formattedIncorrectInput(spec, result) +
    '\n\n' +
    formattedExpectedInput(spec, result) +
    '\n\n' +
    formattedCorrection(spec, result);
}


const human = (spec, result) => {

  if (hasNoValues(result)) return null;

  return readableMessage(spec, result);
};


module.exports = human;

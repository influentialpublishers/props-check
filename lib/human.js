_ = require('ramda');


const hasNoValues = _.compose(
  _.isEmpty
, _.flatten
, _.values
);


const formattedInput = (result) => {

  const keys = _.keys(result);

  var formatted = '  You gave me this:\n\n    {';

  for (var i = 0; i < keys.length; ++i) {
    const key = keys[i];
    formatted += '\n      ' + key + ': …';
    if (i !== keys.length-1) { formatted += `,`; }
  }

  formatted += '\n    }';

  return formatted;
}


const formattedIncorrectInput = (result) => {
  // @TODO: dynamically generate this
  return '  I wasn\'t expecting:\n\n    { appel: …, orage: …, nbaana: … }';
}


const formattedExpectedInput = (result) => {
  // @TODO: dynamically generate this
  return '  You didn\'t give me:\n\n    { apple: …, orange: …, banana: … }';
}


const formattedCorrection = (result) => {
  // @TODO: dynamically generate this
  return '  You fu*ked up, here\'s how to fix it:\n\n'
    + 'appel <-> apple\norage <-> orange\nnbaana <-> banana';
}


const readableMessage = (result) => {
  return formattedInput(result) +
    '\n\n' +
    formattedIncorrectInput(result) +
    '\n\n' +
    formattedExpectedInput(result) +
    '\n\n' +
    formattedCorrection(result);
}


const human = (result) => {

  if (hasNoValues(result)) return null;

  return readableMessage(result);
};


module.exports = human;

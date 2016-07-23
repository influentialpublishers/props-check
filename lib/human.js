_ = require('ramda');


const hasNoValues = _.compose(
  _.isEmpty
, _.flatten
, _.values
);


const formattedInput = (result) => {
  return `
    You gave me this:
    
      {
        appel: …,
        orage: …,
        nbaana: …,
        kiwi: …
      }
  `
}


const formattedIncorrectInput = (result) => {
  return `
    I wasn't expecting:

      { appel: …, orage: …, nbaana: … }
  `
}


const formattedExpectedInput = (result) => {
  return `
    You didn't give me:

      { apple: …, orange: …, banana: … }
  `
}


const formattedCorrection = (result) => {
  return `
    You f*cked up, here’s how to fix it:

      appel <-> apple
      orage <-> orange
      nbaana <-> banana
  `
}


const readableMessage = (result) => {
  return formattedInput(result) +
    formattedIncorrectInput(result) +
    '\n' +
    formattedExpectedInput(result) +
    '\n' +
    formattedCorrection(result);
}


const human = (result) => {

  if (hasNoValues(result)) return null;

  return readableMessage(result);
};


module.exports = human;

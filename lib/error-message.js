
_ = require('ramda');


const ERROR_MESSAGES = {

  given: [
    'You gave me this:'
  , 'wtf!'
  , 'dude!'
  , 'pussy!'
  , 'nvm!'
  ]

, unexpected: [
    'I wasn\'t expecting:'
  ]

, missing: [
    'You didn\'t give me:'
  ]

, conclusion: [
    'Here\'s how to fix it:'
  ]

};


const isNotArray = _.compose(_.not, _.is(Array));


const nullOrEmpty = _.either( _.isNil, _.isEmpty );


const given = (error_messages) => {
  const index = Math.floor(Math.random() * error_messages.length);
  return error_messages[index];
};


const unexpected = (error_messages) => {
  const index = Math.floor(Math.random() * error_messages.length);
  return error_messages[index];
};


const missing = (error_messages) => {
  const index = Math.floor(Math.random() * error_messages.length);
  return error_messages[index];
};


const conclusion = (error_messages) => {
  const index = Math.floor(Math.random() * error_messages.length);
  return error_messages[index];
};


const getErrorMessages = (key, custom) => {
  return _.ifElse(
    _.either(nullOrEmpty, isNotArray)
  , _.always(_.prop(key, ERROR_MESSAGES))
  , _.identity
  )(_.prop(key, custom));
}


const errorMessage = (custom) => {
  return {
    given: given(getErrorMessages('given', custom))
  , unexpected: unexpected(getErrorMessages('unexpected', custom))
  , missing: missing(getErrorMessages('missing', custom))
  , conclusion: conclusion(getErrorMessages('conclusion', custom))
  };
};

module.exports = errorMessage;

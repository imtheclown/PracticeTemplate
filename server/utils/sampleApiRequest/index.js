'use strict';

const asyncUtilSample = require('./asyncUtilSample');
const sampleMongoQuery = require('./sampleMongoQuery');

// Do all your processing logic here, or within the utility files. The main
// utility file, index.js, should give you an overview of what the flow of the
// processing logic is
module.exports = async ({ query }) => {
  // A sample async-await inside the utility file
  const asyncResponse = await asyncUtilSample({
    duration: Math.floor(Math.random() * 1000)
  });
  const poji = await sampleMongoQuery({
    name: 'Hardcoded Poji'
  });

  return {
    additionalMessage: 'Heyoooo you called?',
    query,
    asyncResponse,
    poji
  };
};

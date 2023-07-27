'use strict';

// Import the main utility file that will handle the processing logic for this
// controller file
const sampleApiRequest = require('../../utils/sampleApiRequest');

// Most of the surface level checkers should be contained w/in the controller
// file, so as to relieve the utility file of initial checking for variable
// existence and other easily checked user inputs
module.exports = (req, res, next) => {
  if (!req.query || !Object.keys(req.query).length) {
    // If the request does not have any request queries, return an error
    req.responseData = {
      statusCode: 400,
      body: { error: 'No request query found' }
    };
    // Go to next middleware
    return next();
  } else {
    // Use else block to catch all cases (e.g. so that request would not be
    // stuck in this middleware)

    // Wrap async function in promise to catch all errors inside async function,
    // even without try-catch blocks
    sampleApiRequest({ query: req.query })
      .then(response => {
        req.responseData = {
          statusCode: 200,
          body: { data: response }
        };
        // Go to next middleware
        return next();
      })
      .catch(err => {
        req.responseData = {
          statusCode: err.statusCode || 404,
          body: { error: err.message || err }
        };
        // Go to next middleware
        return next();
      });
  }
};

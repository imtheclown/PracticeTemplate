'use strict';

const SampleController = require('../../controllers/SampleController');

/**
 * ** Adds sample api request route to the server **
 *
 * @param {*} router - is the express router object that we append our routes to
 *
 * @author Andrew Dagdag
 * @version 1.0.0
 */
module.exports = router => {
  router.get('/sampleApiRequest', SampleController.sampleApiRequest);
};

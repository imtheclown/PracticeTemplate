'use strict';

const path = require('path');

/**
 * <Badge text="Core Module"/>
 * <Badge text="Custom Middleware" type="warn"/>
 * <Badge text="Template File" type="error"/>
 *
 * **Load API endpoints via `/server/routes/api/index.js`**
 *
 * Routes created via the Express router will be returned for all `/api`
 * routes.
 * @module express/addApiEndpoints
 *
 * @param {any} app - Express app
 *
 * @example
 * // This is how the module is used in `/server/core/express/initRoutes.js`
 * // Just require the file and pass the Express app as a parameter
 * require('./custom-middleware/addApiEndpoints')(app);
 *
 * @author Andrew Dagdag
 * @version 2.0.0
 * @copyright &copy; Itemhound Corp. All rights reserved.
 */
module.exports = app => {
  // Wrap in try-catch to handle errors in loading of the file
  try {
    // Location relative to root directory should be `project-folder/server/routes/api`
    const router = require(path.join(
      __dirname,
      '../',
      '../',
      '../',
      'server',
      'routes',
      'api'
    ));

    // Router will use `/api` prefixes when calling the routes, i.e. in your
    // routes file if it starts with `/sampleRouteHere`, it will be accessed via
    // `http://localhost:3000/api/sampleRouteHere`
    app.use('/api', router);
  } catch (e) {
    console.error('Unable to load api.js in the routes folder.');
    console.error(e.message || e);
    console.info({});
  }
};

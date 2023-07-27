'use strict';

const express = require('express');

/**
 * <Badge text="Core Module"/>
 * <Badge text="Template File" type="error"/>
 *
 * **Express middleware configuration module**
 *
 * `express.js` template patterned after:
 * https://github.com/icebob/vue-express-mongo-boilerplate/blob/master/server/core/express.js
 *
 * ::: warning MIDDLEWARE STACK
 *
 * For more details on the configuration of the middleware in Express, visit the
 * **Express Middleware** section in the
 * [Core Modules](https://docs.itemhound.com/devs/templates/mevn-boilerplate/core-modules.html#express-middleware) page.
 * @module express/index.js
 *
 * @example
 * // This is how the module is used in the `setupApp` function of the
 * // `/server/index.js` file
 * const app = require('./core/express')();
 *
 * app.listen(config.port, () => {
 *   // Additional code here (to log details)
 * });
 *
 * @returns {any} The http server created via Express
 *
 * @author Gary Villame, Andrew Dagdag
 * @version 2.0.0
 * @copyright &copy; Itemhound Corp. All rights reserved.
 */
module.exports = () => {
  // Create express app
  let app = express();

  // Initialize routes for the app
  require('./initRoutes')(app);
  // Then add a response handler which will handle formatting the
  // `res.status().send()` for us
  require('./generateApiResponse')(app);

  // Return http server
  const server = require('http').createServer(app);
  return server;
};

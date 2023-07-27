'use strict';

const chalk = require('chalk');

/**
 * <Badge text="Core Module"/>
 * <Badge text="Custom Middleware" type="warn"/>
 * <Badge text="Template File" type="error"/>
 *
 * **Generate response for API endpoints of microservice apps**
 *
 * For API endpoints using this template, they do not immmediately pass their
 * response back to the client (e.g. they do not call `res.send()`). Instead,
 * these API endpoints save their response to `req.responseData` in Express so
 * that it can be accessed by the next middleware (e.g. for logging).
 *
 * The middleware in this module is usually placed in the last part of the
 * middleware stack (e.g. after all data processing and logging have been
 * completed) since this module is the one that issues the `res.send()` command.
 * @module generateApiResponse
 *
 * @param {any} app - Express app
 *
 * @example
 * // This is how the module is used in `/server/core/express/initRoutes.js`
 * // Just require the file and pass the Express app as a parameter
 * require('./custom-middleware/generateApiResponse')(app);
 *
 * @author Gary Villame
 * @version 2.0.0
 * @copyright &copy; Itemhound Corp. All rights reserved.
 */
module.exports = app => {
  // If middleware reaches this point, it means that data hasn't been returned
  // yet (e.g. request was also passed to other middleware for logging)
  app.use((req, res, next) => {
    // Data to be returned should be saved in `req.responseData`.

    // If not found, skip and go to the next middleware (e.g. maybe there is
    // an error in processing of the request so pass it to the error handler
    // middleware)
    if (!req.responseData) {
      return next();
    } else {
      console.log(
        (req.responseData.statusCode === 200
          ? chalk.green.bold(req.responseData.statusCode)
          : chalk.red.bold(req.responseData.statusCode)) +
          ' - ' +
          req.route.path
      );

      // If `req.responseData` does not contain a body, just return status code
      if (!req.responseData.body) {
        // Set default status code to 202, if status code is not found
        return res.sendStatus(req.responseData.statusCode || 202);
      } else {
        // Otherwise, return req.responseData.body
        // Also set default status code to 202, if status code is not found
        return res
          .status(req.responseData.statusCode || 202)
          .send(req.responseData.body);
      }
    }
  });
};

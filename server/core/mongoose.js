'use strict';

const config = require('../config');

const mongoose = require('mongoose');
const chalk = require('chalk');

/**
 * <Badge text="Core Module"/>
 * <Badge text="Template File" type="error"/>
 *
 * **Mongoose connection configuration module**
 *
 * Attempt connection to MongoDb database and return connection details, if
 * successfully connected to the database.
 *
 * For more details on the configuration of the mongoose module, visit the
 * **MongoDB Configuration via Mongoose** section in the
 * [Core Modules](https://docs.itemhound.com/devs/templates/mevn-boilerplate/core-modules.html#mongodb-configuration-via-mongoose) page.
 * @module core/mongoose
 *
 * @example
 * // This is how the module is used in the `initializeServer` function of the
 * // `/server/index.js` file
 * require('./core/mongoose')()
 *   .then(function(dbConnection) {
 *     // Only setup app, once connected to db
 *     setupApp(dbConnection);
 *   })
 *   .catch(function(error) {
 *     logger.error(chalk.red.bold('Unable to connect to database.'));
 *     logger.error(chalk.red.bold(error));
 *     process.exit(0);
 *   });
 *
 * @returns {any} `mongoose.connection` parameter of the MongoDb connection
 *
 * @author Gary Villame
 * @version 2.0.0
 * @copyright &copy; Itemhound Corp. All rights reserved.
 */
module.exports = () => {
  // Return promise so that the `mongoose.connection` parameter will only be
  // returned after establishing successful connection. This will delay app
  // configuration (e.g. through Express) until db connection is established
  return new Promise(resolve => {
    // Bootstrap db connection
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);

    // Check if connection has already been established (to avoid connecting
    // multiple times due to multiple importing of this script)
    if (mongoose.connection.readyState !== 1) {
      console.info('Connecting to MongoDB...');

      mongoose.connect(
        config.dbUri,
        // Combine dbCredentials and dbOptions in the mongoose options parameter
        { ...config.dbCredentials, keepAlive: 1, useNewUrlParser: true }
      );
      const dbConnection = mongoose.connection;

      /**
       * - On **error** status in the database connection, log error and
       *    **exit program**.
       * - If the app is deployed via pm2, app will automatically restart after
       *    exiting, and subsequently connect to the database again after
       *    app restart.
       * @alias dbConnection/error
       */
      dbConnection.on('error', function() {
        console.error(chalk.red.bold('Could not connect to MongoDB!'));
        console.error(chalk.red.bold('Will not run server.'));
        process.exit(0);
        // No need to `reject()` promise, since program will exit
      });

      /**
       * - On **disconnected** status in the database connection, log error and
       *    **exit program**.
       * - If the app is deployed via pm2, app will automatically restart after
       *    exiting, and subsequently connect to the database again after
       *    app restart.
       *
       * ::: warning MONGOOSE DISCONNECTED STATUS
       *
       * Restart app if disconnected from mongodb since previous mongoose
       * versions have bugs in reconnecting
       * - https://github.com/Automattic/mongoose/issues/4660
       * - https://stackoverflow.com/q/35951957
       *
       * :::
       * @alias dbConnection/disconnected
       */
      dbConnection.on('disconnected', function() {
        console.error(chalk.red.bold('Disconnected from MongoDB!'));
        console.error(chalk.red.bold('Need to restart server.'));
        process.exit(0);
        // No need to `reject()` promise, since program will exit
      });

      /**
       * - On **connected** status in the database connection, log successful
       *    connection to the mongoose db.
       * - Return the `mongoose.connection` parameter so that it can be used
       *    in initializing the app (e.g. use it for sessions via express).
       * @alias dbConnection/connected
       */
      dbConnection.on('connected', function() {
        console.info();
        console.info(chalk.yellow.bold('Connected to MongoDB successfully!'));
        console.info();
        // Return `mongoose.connection` after successful connection
        resolve(dbConnection);
      });
    } else {
      console.info('Mongo already connected.');
    }
  });
};

'use strict';

const config = require('./config');
const chalk = require('chalk');

const logServerBootup = () => {
  console.info(
    chalk.green.bold(
      '--------------------------[ Starting server ]--------------------------'
    )
  );
  console.info(chalk.bold('Application root path: ') + __dirname);
};

/**
 * **General flow to run the app:**
 * https://docs.itemhound.com/devs/templates/mevn-boilerplate/usage.html#running-the-web-server
 *
 * - Load and check validity of the config files.
 * - Connect to the database, if applicable.
 * - Run the web server using Express.
 *    - For crawler apps, the job scheduling tool via agenda is initiated,
 *      instead of the web server via express.
 *
 * @example
 * setupDataStorage(); // no parameters needed for this function
 *
 * @author Gary Villame
 * @version 2.0.0
 * @copyright &copy; Itemhound Corp. All rights reserved.
 */
const setupDataStorage = async () => {
  // If error is encountered, log error and exit program
  if (!config.dbUri || !config.dbCredentials) {
    console.error(chalk.red.bold('No db connections and credentials found!'));
    process.exit(0);
  } else {
    // Connect to db, if `config.dbUri` and `config.dbOptions` are available
    const dbConnection = await require('./core/mongoose')();
    // Return database connection and redis connection
    return { dbConnection };
  }
};

const setupApp = dbConnection => {
  // Otherwise, setup express app
  const app = require('./core/express')(dbConnection);

  app.listen(config.port, () => {
    console.info('Application started!');
    console.info('----------------------------------------------');
    console.info(
      'Environment:\t' +
        chalk.underline.bold(process.env.NODE_ENV || 'development')
    );
    console.info('Port:\t' + config.port);
    console.info('----------------------------------------------');
    console.log('');
  });
};

// Log server details upon bootup
logServerBootup();

// Initialize server
// Wrap async function in promise to catch all errors inside async function,
// even without try-catch blocks (e.g. setting up of db)
setupDataStorage()
  .then(({ dbConnection }) => {
    // Only setup app, once connected to the database
    setupApp(dbConnection);
  })
  .catch(error => {
    // If error is encountered, log error and exit program
    console.error(chalk.red.bold(error));
    process.exit(0);
  });

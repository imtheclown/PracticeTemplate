'use strict';

// Load initial Express router
const router = require('express').Router();

// Initialize routes in the router by loading the corresponding modules
// Sample API Endpoint for the template repository
require('./sampleApiRequest')(router);
// Add additional API endpoints below
require(`./Part1Router`)(router);

module.exports = router;

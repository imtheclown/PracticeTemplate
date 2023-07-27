'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Add your models here and how you would like to import them, as seen at the
// bottom of this file
const models = {
  SampleModel: require('./sampleModel'),
  // province model
  Province: require(`./Province`),
  // barangay model
  Barangay: require(`./Barangay`),
  // municipality model
  Municipality: require(`./Municipality`)
};

// Create object for export. Only the `exportModels` object will be
// exported, instead of exporting a function, so that loading of the Mongoose
// models will only be performed once (e.g. during first call of the
// module), instead of performing the loading of the models each time the
// module is called (e.g. if a function is exported instead of just an object)
let exportModels = {};

// Load each model in the `mongoose.model` by executing the corresponding
// function returned and passing the `mongoose` and `Schema` variables
for (const fileName in models) {
  // Only add new model to `exportModels`, if it has not been initialized
  try {
    // This will throw an error if the model is still not defined
    exportModels[fileName] = mongoose.model(models[fileName]);
  } catch (e) {
    // Call function to load in `mongoose.model` and add to `exportModels`
    exportModels[fileName] = models[fileName](mongoose, Schema);
  }
}

/**
 * <Badge text="MongoDb Schema"/>
 * <Badge text="Template File" type="error"/>
 *
 * @module models/index
 *
 * @example
 * // Sample usage - just require the file and the corresponding name of the
 * // exported model
 * const SampleModel = require('../models').SampleModel;
 *
 * @returns {Object} - Object of Mongoose schema
 *
 * @author Gary Villame
 * @version 2.0.0
 * @copyright &copy; Itemhound Corp. All rights reserved.
 */
module.exports = exportModels;

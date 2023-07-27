'use strict';

const SampleModel = require('../../models').SampleModel;

module.exports = ({ name }) => {
  return new Promise(resolve => {
    SampleModel.create({ name }, () => {
      resolve(name + ' added to mongodb');
    });
  });
};

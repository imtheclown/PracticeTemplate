`use strict`;
// import model
const ProvinceModel = require('../../models').Province;
// method to retrieve data from the database (province collection)
module.exports = params => {
  return new Promise((resolve, reject) => {
    ProvinceModel.find(params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

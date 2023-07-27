`use strict`;
// import model
const MunicipalityModel = require(`../../models`).Municipality;
//method to retrieve data from the database (municipality collection)
module.exports = params => {
  return new Promise((resolve, reject) => {
    MunicipalityModel.find(params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

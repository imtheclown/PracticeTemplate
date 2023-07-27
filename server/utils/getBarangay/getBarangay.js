`use strict`;
// import model
const BarangayModel = require(`../../models`).Barangay;
//mongo query that retrieves data from the database (barangay collection)
module.exports = params => {
  return new Promise((resolve, reject) => {
    BarangayModel.find(params)
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

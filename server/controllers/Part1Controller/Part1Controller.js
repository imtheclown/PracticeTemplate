`use strict`;
// mongo query to retrieve province/s
const getProvince = require(`../../utils/getProvince`);
// mongo query to get barangay/s
const getBarangay = require(`../../utils/getBarangay`);
// mongo query to get municipality/ies
const getMunicipality = require(`../../utils/getMunicipality`);

module.exports = async (req, res, next) => {
  // if no router parameters are passed in the url
  if (!req.query || !Object.keys(req.query).length) {
    // get provinces
    try {
      getProvince().then(response => {
        returnData(req, next, response.asyncResponse);
      });
    } catch (error) {
      // display error
      errorCatchAll(req, next, error);
    }
  } else {
    // province and municipality are both present
    if (req.query.province && req.query.municipality) {
      const { province, municipality } = req.query;
      let province_id;
      let municipality_id;
      let barangayList;
      // get province_id
      let regex = new RegExp(`${province}`, 'ig');
      try {
        province_id = await getProvince({ name: regex });
        if (
          province_id.asyncResponse &&
          province_id.asyncResponse[0] &&
          province_id.asyncResponse[0]._id
        ) {
          province_id = province_id.asyncResponse[0]._id.toString();
        }
        //   display error
      } catch (err) {
        errorCatchAll(req, next, err);
      }
      regex = new RegExp(`${municipality}`, 'ig');
      // get municipality id
      try {
        municipality_id = await getMunicipality({
          name: regex
        });
        if (
          municipality_id.asyncResponse &&
          municipality_id.asyncResponse[0] &&
          municipality_id.asyncResponse[0]._id
        ) {
          municipality_id = municipality_id.asyncResponse[0]._id.toString();
        }
        //   display error
      } catch (err) {
        errorCatchAll(req, next, err);
      }
      // get barangays
      try {
        console.log(`${province_id} ${municipality_id}`);
        barangayList = await getBarangay({
          province_id: province_id,
          municipality_id: municipality_id
        });
        if (barangayList.asyncResponse) {
          barangayList = barangayList.asyncResponse;
        }
        returnData(req, next, barangayList);
        //   display error
      } catch (error) {
        errorCatchAll(req, next, error);
      }
      //   incomplete parameter
      //   either municipality or province is missing
    } else if (req.query.province) {
      let province_id;
      let regex = new RegExp(`${req.query.province}`, 'ig');
      try {
        province_id = await getProvince({
          name: regex
        }).then(response => {
          return response.asyncResponse[0]._id;
        });
      } catch (error) {
        errorCatchAll(req, next, error.message);
      }
      let municipalityList;
      try {
        municipalityList = await getMunicipality({
          province_id: province_id
        }).then(response => {
          return response.asyncResponse;
        });
      } catch (error) {
        errorCatchAll(req, next, error.message);
      }
      returnData(req, next, municipalityList);
    } else {
      errorCatchAll(req, next, 'Missing "province" parameter');
    }
  }
};

function errorCatchAll(req, next, response) {
  req.responseData = {
    statusCode: 400,
    body: {
      error: response
    }
  };
  return next();
}

function returnData(req, next, data) {
  req.responseData = {
    statusCode: 200,
    body: {
      data: data
    }
  };
  return next();
}

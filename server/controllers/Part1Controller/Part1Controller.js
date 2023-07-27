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
        req.responseData = {
          statusCode: 200,
          body: {
            data: response
          }
        };
        return next();
      });
    } catch (error) {
      // display error
      req.responseData = {
        statusCode: 400,
        body: {
          data: error
        }
      };
    }
  } else {
    // province and municipality are both present
    if (req.query.province && req.query.municipality) {
      const { province, municipality } = req.query;
      let province_id;
      let municipality_id;
      let barangayList;
      // get province_id
      try {
        province_id = await getProvince({ name: province });
        if (
          province_id.asyncResponse &&
          province_id.asyncResponse[0] &&
          province_id.asyncResponse[0]._id
        ) {
          province_id = province_id.asyncResponse[0]._id.toString();
        }
        //   display error
      } catch (err) {
        req.responseData = {
          statusCode: 400,
          error: {
            data: err
          }
        };
        return next();
      }
      // get municipality id
      try {
        municipality_id = await getMunicipality({
          name: municipality
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
        req.responseData = {
          statusCode: 400,
          body: {
            error: err
          }
        };
        return next();
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
        req.responseData = {
          statusCode: 200,
          body: {
            data: barangayList
          }
        };
        return next();
        //   display error
      } catch (error) {
        req.responseData = {
          statusCode: 400,
          error: {
            data: error
          }
        };
        return next();
      }
      //   incomplete parameter
      //   either municipality or province is missing
    } else {
      req.responseData = {
        statusCode: 400,
        body: {
          error: 'Missing parameter'
        }
      };
      return next();
    }
  }
};

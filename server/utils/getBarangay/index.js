`use strict`;

const getBarangay = require(`./getBarangay`);
module.exports = async params => {
  const asyncResponse = await getBarangay(params);
  return {
    asyncResponse: asyncResponse
  };
};

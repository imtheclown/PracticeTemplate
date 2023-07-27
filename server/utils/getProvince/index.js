`use strict`;

const getProvince = require(`./getProvince`);

module.exports = async params => {
  const asyncResponse = await getProvince(params);
  return {
    asyncResponse: asyncResponse
  };
};

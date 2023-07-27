`use strict`;

const getMunicipality = require(`./getMunicipality`);

module.exports = async params => {
  const asyncResponse = await getMunicipality(params);
  return {
    asyncResponse: asyncResponse
  };
};

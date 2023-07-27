`use strict`;
// controller
const { getProvince } = require(`../../controllers/Part1Controller`);
// router
module.exports = router => {
  router.get(`/testing`, getProvince);
};

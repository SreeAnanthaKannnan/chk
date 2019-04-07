var building = require("../daos/buildingDao.js");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");
module.exports = {
  buildings: buildings
};
function buildings(buildingobject, token, email_id) {
  logger.fatal(buildingobject, "buildingobject");
  return new Promise(async (resolve, reject) => {
    var responseObj = {};
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      var user = building
        .building(buildingobject, email_id)
        .then(data => {
          logger.fatal(user, "user");
          responseObj.data = data;
          responseObj.errors = [];
          responseObj.meta = {};

          resolve(responseObj);
        })
        .catch(error => {
          responseObj.data = [];
          responseObj.errors = [error];
          responseObj.meta = {};
        });
    }
  });
}
//=======================================code End==============================================================//

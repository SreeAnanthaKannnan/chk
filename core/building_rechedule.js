var reschedule = require("../daos/RescheduleDao");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");

module.exports = {
  building_reschedule: building_reschedule
};
//===============Fetching the details from the Daos both building and schedule information=========================================//
function building_reschedule(time_slot,reschedule_date,schedule_id, token) {
  return new Promise(async (resolve, reject) => {
    var verifytoken = await checktoken.checkToken(token);
    console.log(verifytoken);
        if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message,
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      var result = await reschedule.building_reschedule(time_slot,reschedule_date,schedule_id);
      console.log("result in core file", result);
      if (result) {
        resolve({
          status: 200,
          result: "Successfully rescheduled",
          message:"Details"
        });
      }
      reject({
        message: "no requests available"
      });
    }
  });
}
//===============Code End===============================================================================================================//

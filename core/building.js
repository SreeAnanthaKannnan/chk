var building = require("../daos/buildingDao.js");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");
module.exports = {
  buildings: buildings,
  buildingsbymail:buildingsbymail
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
function buildingsbymail(email_id, token) {
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
   
                  var info = [];
                  console.log("after");
                  var result = await building.buildingbyemail(email_id);
                  console.log(result, "result in 34")
                 for (var i = 0; i < result.result.length; i++) {
                      console.log("in loop");
                      var first = result.result[i].address.split("||");
                      var Building_no = first[0];
                      console.log(Building_no)
                      result.result[i].Building_no = Building_no;
                      var address = first[1]
                      console.log(address);
                      result.result[i].address = address;
                      var plot_no = first[2];
                      result.result[i].plot_no = plot_no;
                      //delete result.result[i]["address"];
                  }
                  console.log("result", result);
                  info.push(result);
              }
              resolve({
                  status: 200,
                  result: info
              })
          })
      }
 
//=======================================code End==============================================================//

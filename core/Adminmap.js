var asser = require("../daos/AdminmapDao");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");
module.exports = {
  Adminmap: Adminmap,
  Adminmapactive: Adminmapactive
};
function Adminmap(token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    //     if (verifytoken.status == 405) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message,
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else {
    var result = await asser.Adminmap_get();
    console.log("result in core file", result);
    if (result) {
      resolve({
        status: 200,
        result: result.result,
        message: "Details"
      });
    }
    reject({
      message: "no requests available"
    });
    // }
  });
}

function Adminmapactive(token) {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 405) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else {
    var result = await asser.Adminmapactive_get();
    console.log("result in core file", result);
    if (result) {
      resolve({
        status: 200,
        result: result.result,
        message: "Details"
      });
    }
    reject({
      message: "no requests available"
    });
    // }
  });
}

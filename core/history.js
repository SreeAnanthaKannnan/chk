var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");
var bcSdk = require('../fabcar/javascript/query')
exports.getHistory = (object,token) => {
  return new Promise(async (resolve, reject) => {
    //var id = "{\"selector\":{\"name\":\"" +email+"\"}}";
    console.log("object",object);
    if(object.address){
      var id = "{\"selector\":{\"Buildingdetails.address\": \""+ object.address +"\"}}";
    }
    else if(object.name)
    {
      var id = "{\"selector\":{\"name\":\"" +object.name+"\"}}"
    }
    else if(object.buildingname){
      
      var id = "{\"selector\":{\"Buildingdetails.buildingname\": \""+ object.buildingname +"\"}}";
    }
    //var id ="sharjah"
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
    } else 
    {
      var fun = "queryHistory";
      //Retrieve data from block chain
      bcSdk
        .queryrecord(fun, id)
        .then(docs => {
          var len = docs.length;
          logger.fatal("length of data from Blockchain" + len);
          return resolve({
            status: 201,
            docs: docs
          });
        })
        .catch(err => {
          logger.fatal(
            "error occurred while fetching data from Block chain" + err
          );
          return reject({
            status: 500,
            message: "Internal Server Error!"
          });
        });
    }
  });
};
exports.getHistory1 = (id) => {
  return new Promise(async (resolve, reject) => {
   // var id = "{\"selector\":{\"name\":\"" +email+"\"}}"
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
    } else 
    {
      var fun = "queryHistory2";
      //Retrieve data from block chain
      bcSdk
        .queryrecord(fun, id)
        .then(docs => {
          var len = docs.length;
          logger.fatal("length of data from Blockchain" + len);
          return resolve({
            status: 201,
            docs: docs
          });
        })
        .catch(err => {
          logger.fatal(
            "error occurred while fetching data from Block chain" + err
          );
          return reject({
            status: 500,
            message: "Internal Server Error !"
          });
        });
    }
  });
};
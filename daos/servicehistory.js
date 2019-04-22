const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
async function historyget(email_id) {
  return new Promise((resolve, reject) => {

    //================
    mysqlConnection
      .query_execute(query.servicehistory, email_id)
      .then(function (result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log("result=====>DAO==>", result);
          return resolve({ status: 200, message: result });
        }
      });
  })
}
module.exports = {
  historyget: historyget
}
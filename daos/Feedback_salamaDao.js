const con = require("../mysql_connection/dbConfig");
var log4js = require('log4js');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
const logger = log4js.getLogger("SPSA_project");


function feedback_insert(data) {
  return new Promise(function (resolve, reject) {

    var params = data;
    console.log("daoooooooooooooo", params)

    // let qry =
    //   "INSERT INTO Feedback(Company_Email,comments_en,comments_ar,created_at) VALUES ? ";
    // con.query(qry, values, function (err, result) {
    //   if (err) {
    //     console.log("something", err);
    //     return reject({
    //       status: 400,
    //       body: "Cannot insert the data"
    //     });
    //   } else {
    //     return resolve({ result });
    //   }
    // });
    mysqlConnection.insert_query(query.feedback, params)
      .then(function (result, err) {
        if (err) {
          logger.fatal(err, "db error while updating the otp for the registered user")
          return resolve({ status: 400, err: err });
        } else {
          console.log("res==========da0===>", result)
          return resolve({ status: 200, message: result });
        }
      });
  });
}


module.exports = {
  feedback_insert: feedback_insert
};
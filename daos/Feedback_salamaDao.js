const con = require("../mysql_connection/dbConfig");
var log4js = require('log4js');

const logger = log4js.getLogger("SPSA_project");


function feedback_insert(values) {
  return new Promise(function(resolve, reject) {
    values = [values];
    let qry =
      "INSERT INTO Feedback(Company_Email,comments_en,comments_ar,created_at) VALUES ? ";
    con.query(qry, [values], function(err, result) {
      if (err) {
        console.log("something", err);
        return reject({
          status: 400,
          body: "Cannot insert the data"
        });
      } else {
        return resolve({ result });
      }
    });
  });
}

module.exports = {
  feedback_insert: feedback_insert
};

const con = require("../mysql_connection/dbConfig");

function feedback_insert(values) {
  return new Promise(function(resolve, reject) {
    values = [values];
    let qry = "INSERT INTO Feedback(Company_Email,comments) VALUES ? ";
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

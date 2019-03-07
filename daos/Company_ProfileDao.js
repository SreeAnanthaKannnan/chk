const con = require("../mysql_connection/dbConfig");
const moment = require("moment");

function Company_profile_insert(param) {
  return new Promise(async function(resolve, reject) {
    console.log("hiiiii", param);
    param = [param];
    //  param = moment(param).format("YYYY-MM-DD")
    //  console.log(param,"date")

    sql =
      "INSERT INTO Company_Profile (Company_Trade_License_No,Mandatory_Training_Percentage,Category,Company_Email,Number_of_employees) VALUES ?";
    await con.query(sql, [param], function(err, result) {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result);
        return resolve({ result: result });
      }
    });
  });
}

function company_trading_license(param) {
  return new Promise(async function(resolve, reject) {
    console.log("hiiiii", param);
    //  param = moment(param).format("YYYY-MM-DD")
    //  console.log(param,"date")

    await con.query(
      "SELECT Company_Trade_License_No FROM Company_Profile where Company_Email ='" +
        param +
        "'",
      (err, result) => {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result,"<=======result");
          return resolve({ result: result });
        }
      }
    );
  });
}
module.exports = {
  Company_profile_insert: Company_profile_insert,
  company_trading_license: company_trading_license
};

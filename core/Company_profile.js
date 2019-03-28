const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const CompanyDao = require("../daos/Company_ProfileDao");
const moment = require("moment");
const mysqlConnection = require("../mysql_connection/config_test");
const query = require("../mysql_connection/queries");
const checktoken = require("../utils/checkToken");

exports.company_profile = (data, token, lang) =>
  new Promise(async (resolve, reject) => {
    let Company_Trade_License_No = data.company_trade_lincense_no;
    console.log(Company_Trade_License_No, "licenceNo");
    let Mandatory_Training_Percentage = data.Mandatory_Training_Percentage;
    let Category = data.Category;
    let Company_Email = data.company_email;
    console.log("company_Email=====>", Company_Email);
    let Number_of_employees = data.Number_of_employees;
    /*=================token validation======================================*/
    console.log(token, "token");
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
      let query_value = [
        Company_Trade_License_No,
        Mandatory_Training_Percentage,
        Category,
        Company_Email,
        Number_of_employees
      ];
      /*====================Checking company already exists or not============*/
      await CompanyDao.company_trading_license(Company_Email)
        .then(async function(result) {
          console.log("already exits=====>", result.result.data.length);
          if (result.result.data.length != 0) {
            return resolve({
              status: 401,
              message: "Company Profile is already exists"
            });
          } else {
            /*=================company values insertion into company profile table======*/
            await CompanyDao.Company_profile_insert(query_value).then(
              async function(result) {
                console.log("already exits insert=====>", result);
                if (result.result.data.affectedRows == 1) {
                  return resolve({
                    status: 200,
                    message: "Company Profile is added successfully"
                  });
                }
              }
            );
          }
        })

        .catch(async function(err) {
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        });
    }
  });
/**********************************Code Ends*********************************************/

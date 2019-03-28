const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const CompanyDao = require("../daos/Company_ProfileDao");
const checktoken = require("../utils/checkToken");

exports.company_trading_license = (data, token, lang) =>
  new Promise(async (resolve, reject) => {
    let Company_Email = data.company_email;
    console.log("core_companytrade_licence", Company_Email);

    /*============================token validation==========================*/
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
      /*=======================checking whether company already exists or not=================*/
      await CompanyDao.company_trading_license(Company_Email)
        .then(async function(result) {
          console.log("result===>", result);
          if (result.result.data.length != 0) {
            return resolve({
              status: 200,
              message: result
            });
          } else {
            return resolve({
              status: 402,
              message: "Please add your company profile in the profile page"
            });
          }
        })
        /*=========Error Capturing===========*/
        .catch(async function(err) {
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        });
    }
  });
/************************************Code Ends**********************************************/

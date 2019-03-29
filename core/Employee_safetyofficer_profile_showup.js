const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
var base64ToImage = require("base64-to-image");
const ab2str = require("arraybuffer-to-string");
const message = require("../utils/messages");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const fs = require("fs");
const checktoken = require("../utils/checkToken");

exports.safety_officer_details = (request, token) =>
  new Promise(async (resolve, reject) => {
    let Company_Trade_Lincense_No = request.company_trade_lincense_no;
    let language = request.language;
    let Category = "Safety_officer";
    console.log(token, "token");
    /*==============token vaidation================*/

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
      console.log(Category, "Category");
      let query_value = [Company_Trade_Lincense_No, Category];
      /*=======================Fetching safety officer details baed on category====================*/
      await Employee_profileDao.Safety_officer_details(query_value)

        .then(async function(result, err) {
          console.log("result======>", result);
          if (result.result.data.length != 0) {
            return resolve({
              status: 200,
              message: result.result.data
            });
          }
        })
        .catch(async function(err) {
          var messagevalue = await message.getmessage(language, "E01");

          return resolve({
            status: 400,
            message: messagevalue
          });
        });
    }
  });
/*********************************Code Ends******************************************/

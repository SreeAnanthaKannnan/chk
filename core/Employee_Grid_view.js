const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const message = require("../utils/messages");
let date = require("date-and-time");
var datetime = require("node-datetime");
var pay = require("../daos/Payment_salamaDao");
let moment = require("moment");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const fs = require("fs");
const checktoken = require("../utils/checkToken")
exports.Employee_grid_view = (
    token, language,
) =>
    new Promise(async (resolve, reject) => {
        console.log("language===>", language)
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
        /*==================Checking whether employee already exists or not==============*/
        await Employee_profileDao.Employee_grid_view()
            //console.log("hello")
            .then(async function (result, err) {
                console.log("result======>", result);
               
                if (result) {



                    return resolve({
                        status: 200,
                        message: result
                    });
                }

            
            })
            

        



            /*==============Error Capturing================*/

            .catch(async function (err) {
                var messagevalue = await message.getmessage(language, "E01")

                // return resolve({ status: 400, message:messagevalue });
                return resolve({ status: 400, message: err })
            });



         }

        // }
    });
  /************************************Code Ends**********************************************/
const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const message = require("../utils/messages");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const checktoken = require("../utils/checkToken");

exports.number_validation_schedule = (data, request, token) =>
  new Promise(async (resolve, reject) => {
    let Company_Trade_Lincense_No = request.company_trade_lincense_no;
    let no_of_seats_selected = data.no_of_seats_selected;
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
      /*=====================Checking number of untrained employees to the selected count======*/
      await Employee_profileDao.number_validation_schedule(
        Company_Trade_Lincense_No
      )
        .then(async function(result, err) {
          console.log("result======>", result.result[0].count);
          console.log(result.result[0].count, "<+++++++++count");
          console.log("DFFFFFFFFFFFff");
          let count = result.result[0].count;

          if (count < no_of_seats_selected) {
            let count = result.result[0].count;

            return resolve({
              status: 400,
              message:
                "Only" +
                " " +
                count +
                " " +
                "untrained employees available.Please provide maximum" +
                " " +
                count +
                " " +
                "count"
            });
          } else {
            return resolve({
              status: 200,
              message: "sucess"
            });
          }
        })
        /*==================Error capturing=================*/

        .catch(async function(err) {
          return resolve({
            status: 400,
            message: "Something went wrong"
          });
        });
    }
  });
/****************************************Code Ends************************************/

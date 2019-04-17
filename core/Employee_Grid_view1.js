const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const message = require("../utils/messages");
let date = require("date-and-time");
var datetime = require("node-datetime");
let moment = require("moment");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const fs = require("fs");

exports.Employee_grid_view1 = (
     order_id,token, language,
) =>
    new Promise(async (resolve, reject) => {
        console.log("language===>", language)
        console.log("order_id_core", order_id)

        var date = new Date()
        date = moment(date).format("YYYY-MM-DD")
        console.log(date, "dateraised")

        /*============token validation===================*/
        //console.log(token, "test");
        let query = await SessionDao.Session_select(token);
        // if (query.length == 0) {
        //     resolve({
        //         status: 402,
        //         message: "Invalid token"
        //     });
        // } else {
        //     /*===================Session validation======================*/
        //     console.log(query[0].session_created_at);
        //     let Name_ar, Name_en, query_value;
        //     let now = new Date();

        //     let Db_time = query[0].session_created_at;
        //     let time_difference_minutes = await session_time.Session_time_difference(
        //         Db_time,
        //         now
        //     );
        //     console.log(time_difference_minutes, "session time difference");
        //     if (time_difference_minutes <= "01:00") {
        //         return resolve({
        //             status: 440,
        //             message: "session expired"
        //         });
        //     } else {

        /*==================Checking whether employee already exists or not==============*/
        await Employee_profileDao.Employee_grid_view1(order_id)
            .then(async function (result,err) {
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
               logger.fatal(err,"core error while getting details of employee for grid")
                // return resolve({ status: 400, message:messagevalue });
                return resolve({ status: 400, message: err })
            });



        //     }

        // }
    });
  /************************************Code Ends**********************************************/
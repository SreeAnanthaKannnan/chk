const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
var base64ToImage = require("base64-to-image");
const ab2str = require("arraybuffer-to-string");

const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const fs = require("fs");

exports.safety_officer_details = (request, token) =>
    new Promise(async (resolve, reject) => {
        let Company_Trade_Lincense_No = request.company_trade_lincense_no;
        let language = request.language;
        let Category = "Safety_officer"
        console.log(token, "token");
        /*==============token vaidation================*/

        let query = await SessionDao.Session_select(token);
        console.log(query, "testinggggggggg");
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            });
        } else {
            console.log(query[0].session_created_at);
            let Name_ar, Name_en, query_value;
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(
                Db_time,
                now
            );
            /*======================Session validation=====================================*/

            if (time_difference_minutes <= "01:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                console.log(Category, "Category");
                let query_value = [Company_Trade_Lincense_No,
                    Category
                ];
                /*=======================Fetching safety officer details baed on category====================*/
                let safety_officer_details = await Employee_profileDao.Safety_officer_details(
                    query_value
                );
                let result = safety_officer_details[0];
                console.log(result, "result");

                return resolve({
                    status: 200,
                    message: safety_officer_details
                });
            }
        }
    });
/*********************************Code Ends******************************************/
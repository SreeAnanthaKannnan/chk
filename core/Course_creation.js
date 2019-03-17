const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const token_gen = require("../utils/token");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const CourseDao = require("../daos/CourseDao");
const message = require("../utils/messages");
const moment = require("moment");

exports.course_creation = (data, token, language) =>
    new Promise(async (resolve, reject) => {
        let name = data.name;
        let amount_exam = data.amount_exam;
        let amount_training = data.amount_training;
        let duration = data.duration;
        /*==============token validation=======================*/
        let query = await SessionDao.Session_select(token);

        console.log(query, "token");
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            });
        } else {
          /*=======================Session validation=======================*/
            console.log(query[0].session_created_at);
            let Name_ar, Name_en, query_value;
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(
                Db_time,
                now
            );
            console.log(time_difference_minutes, "function");

            console.log(time_difference_minutes <= "01:00", "session time difference validation");

            if (time_difference_minutes <= "01:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
              /*====================Transaltion for arabic to english and vice versa===========*/

                if (language == "en") {
                    let temp = await translate.translate_ar(name);
                    console.log(temp, "arabic value");
                    name_ar = temp.result;
                    name_en = name;
                } else {
                    name_ar = name;
                    let temp = await translate.translate_en(name);
                    name_en = temp.result;
                }

                let query_value = [
                    name_ar,
                    name_en,
                    amount_exam,
                    amount_training,
                    duration
                ];
                /*==================Checking whether course is already exists or not=============*/
                await CourseDao.Course_select(name_en)
                    .then(async function(result) {
                        console.log("result<======", result);
                        if (result.result.length !== 0) {
                            return resolve({
                                status: 401,
                                message: "course already exists"
                            })

                        } else {
          /*======================Inserting the query value into coure table=============*/
                            await CourseDao.Course_insert(query_value)
                                .then(async function(result) {
                                    console.log("result===>", result);
                                    return resolve({
                                        status: 200,
                                        message: "course created successfully"
                                    })

                                })
                          }
                    })
        /*=========Error Capturing===========*/
                   
                    .catch(async function(err) {
                        var messagevalue = await message.getmessage(language.result, "E01");
                        return resolve({
                            status: 400,
                            message: err
                        });
                    });
            }
        }
    });
    /******************************Code Ends******************************************/
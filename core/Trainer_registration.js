const SessionDao = require("../daos/SessionDao");
const TrainerDao = require("../daos/TrainerDao");
const session_time = require("../utils/session_time_difference");

let date = require("date-and-time");
var datetime = require("node-datetime");
let moment = require("moment");
const translate = require("../utils/translate");
const message = require("../utils/messages");

exports.trainer_account = (data, token, language) =>
    new Promise(async (resolve, reject) => {
        let trainer_email_id = data.trainer_email_id;
        console.log("data", data);
        let Name = data.name;
        let password = data.password;
        let course_name = data.course_name;
        let otp = "null";
        let reg_date = moment(Date.now()).format("YYYY-MM-DD 00:00:00");
        let Trainer_id = data.trainer_id;
        /*=============token validation===================*/

        let query = await SessionDao.Session_select(token);
        if (query.length == 0) {
            resolve({
                status: 400,
                message: "Invalid token"
            });
        } else {
            /*=====================Session validation==========================*/
            console.log(query[0].session_created_at);
            let Name_ar, Name_en, query_value;
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(
                Db_time,
                now
            );


            if (time_difference_minutes <= "01:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                /*======================translating from arabic to english and vice versa=================*/
                console.log(language, "language");
                if (language == "en") {
                    let temp = await translate.translate_ar(Name);
                    console.log(temp);
                    Name_ar = temp.result;
                    console.log(Name_ar);
                    Name_en = Name;
                } else {
                    Name_ar = Name;
                    let temp = await translate.translate_en(Name);
                    Name_en = temp.result;
                }
                if (language == "en") {
                    let temp = await translate.translate_ar(course_name);
                    console.log(temp);
                    course_name_ar = temp.result;
                    console.log(course_name_ar);
                    course_name_en = course_name;
                } else {
                    course_name_ar = course_name;
                    let temp = await translate.translate_en(course_name);
                    course_name_en = temp.result;
                }

                let query_value = [
                    Name_en,
                    Name_ar,
                    trainer_email_id,
                    password,
                    reg_date,
                    course_name_en,
                    course_name_ar,
                    otp,
                    Trainer_id
                ];
                /*=============checking whether trainer is already exists or not==============*/
                await TrainerDao.Trainer_information(trainer_email_id)
                    .then(async function(result) {
                        console.log("result", result);

                        if (result.result.length != 0) {
                            var messagevalue = await message.getmessage(
                                language.result,
                                "S05"
                            );

                            return resolve({
                                status: 200,
                                message: messagevalue
                            });
                        } else {
                            /*==================Inserting trainer information into trainer table==========*/
                            await TrainerDao.Trainer_insert(query_value).then(async function(
                                result
                            ) {
                                console.log("result", result);

                                var messagevalue = await message.getmessage(
                                    language.result,
                                    "S06"
                                );

                                return resolve({
                                    status: 200,
                                    message: messagevalue
                                });
                            });
                        }
                    })

                    /*=======================Error capturing========================*/

                    .catch(async function(err) {
                        var messagevalue = await message.getmessage(language.result, "E01");
                        return resolve({
                            status: 400,
                            message: messagevalue
                        });
                    });
            }
        }
    });
/***********************************Code Ends*********************************************/
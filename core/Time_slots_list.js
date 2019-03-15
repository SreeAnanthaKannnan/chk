const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const token_gen = require("../utils/token");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const ClassroomDao = require("../daos/ClassroomDao");
const message = require("../utils/messages");
const moment = require("moment");
const TrainerDao = require("../daos/TrainerDao");

exports.time_slots_list = (data, token, language) =>
    new Promise(async (resolve, reject) => {
        let available_date = data.available_date;
        let trainer_name = data.trainer_name;

        /*=================Token validation=======================*/

        let query = await SessionDao.Session_select(token);
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            });
        } else {
            /*=============session validation=============*/
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
                /*==================fetching the trainer id from the trainer table who is selected=======*/
                await TrainerDao.Trainer_id_select(trainer_name, language)
                    .then(async function(result) {
                        console.log("result", result.result[0].id);
                        let trainer_id = result.result[0].id;
                        /*================fetching the time slots for the selected trainer and the available date=======*/
                        await ClassroomDao.time_slots_lists(
                            available_date,
                            trainer_id
                        ).then(async function(result) {

                            if (result.result.length != 0) {
                                return resolve({
                                    status: 200,
                                    message: result
                                });
                            }
                        });
                    })
                    /*====================Error Capturing======================*/
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
/*****************************Code Ends*************************************************** */
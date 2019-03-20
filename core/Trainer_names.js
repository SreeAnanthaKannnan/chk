const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const message = require('../utils/messages')
const TrainerDao = require('../daos/TrainerDao')

exports.trainer_names = (token, language) =>
    new Promise(async (resolve, reject) => {
        /*==============token validation===============*/
        let query = await SessionDao.Session_select(token);
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            });
        } else {
            /*===================session validation===============*/
            console.log(query[0].session_created_at);
            let Name_ar, Name_en, query_value;
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(
                Db_time,
                now
            );

            if (time_difference_minutes >= "00:30:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                /*================fetching available trainer names from the trainer table========*/
                await TrainerDao.Trainer_names_display(language)
                    .then(async function (result) {
                        console.log("result", result);

                        return resolve({
                            status: 200,
                            message: result.result
                        });

                    })
                    /*===================Error Capturing========================*/
                    .catch(async function (err) {

                        return resolve({
                            status: 400,
                            message: "Something Went Wrong"
                        });
                    });
            }
        }
    });
/*****************************Code Ends*************************************************** */
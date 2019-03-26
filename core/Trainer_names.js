const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const message = require('../utils/messages')
const TrainerDao = require('../daos/TrainerDao')
const checktoken = require("../utils/checkToken")

exports.trainer_names = (token, language) =>
    new Promise(async (resolve, reject) => {
        /*==============token validation===============*/
        var verifytoken = await checktoken.checkToken(token)
        if (verifytoken.status == 402) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
        } else if (verifytoken.status == 403) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
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

    });
/*****************************Code Ends*************************************************** */
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const token_gen = require("../utils/token");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const ClassroomDao = require("../daos/ClassroomDao");
const message = require("../utils/messages");
const moment = require("moment");
const TrainerDao = require("../daos/TrainerDao");
const checktoken = require("../utils/checkToken");

exports.time_slots_list = (data, token, language) =>
  new Promise(async (resolve, reject) => {
    let available_date = data.available_date;
    let trainer_name = data.trainer_name;

    /*=================Token validation=======================*/

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
      /*==================fetching the trainer id from the trainer table who is selected=======*/
      await TrainerDao.Trainer_id_select(trainer_name, language)
        .then(async function(result) {
          console.log("result", result.result[0].id);
          let trainer_id = result.result[0].id;
          /*================fetching the time slots for the selected trainer and the available date=======*/
          await ClassroomDao.time_slots_lists(available_date, trainer_id).then(
            async function(result) {
              if (result.result.length != 0) {
                return resolve({
                  status: 200,
                  message: result
                });
              }
            }
          );
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
  });
/*****************************Code Ends*************************************************** */

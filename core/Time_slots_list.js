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
      console.log(time_difference_minutes, "function");

      console.log(time_difference_minutes <= "01:00", "wwwwwwwwwwwwwwwwwwww");

      if (time_difference_minutes <= "01:00") {
        return resolve({
          status: 440,
          message: "session expired"
        });
      } else {
        //  let query_value =[name_ar,name_en,amount_exam,amount_training,duration]
        await TrainerDao.Trainer_id_select(trainer_name, language)
          .then(async function(result) {
            console.log("result", result.result[0].id);
            let trainer_id = result.result[0].id;
            await ClassroomDao.time_slots_lists(
              available_date,
              trainer_id
            ).then(async function(result) {
              //  var messagevalue = await  message.getmessage(language.result,"S04")

              if (result.result.length != 0) {
                return resolve({ status: 200, message: result });
              }
            });
          })
          .catch(async function(err) {
            var messagevalue = await message.getmessage(language.result, "E01");
            return resolve({ status: 400, message: messagevalue });
          });
      }
    }
  });

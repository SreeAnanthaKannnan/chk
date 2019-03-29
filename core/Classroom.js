const classroomDao = require("../daos/ClassroomDao");
const date = require("date-and-time");
const moment = require("moment");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const TrainerDao = require("../daos/TrainerDao");
const CourseDao = require("../daos/CourseDao");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const checktoken = require("../utils/checkToken");

exports.classroom = (data, token, language) =>
  new Promise(async (resolve, reject) => {
    let classroom_id = data.classroom_id;
    let trainer_name = data.trainer_name;
    let address = data.address;
    let number_of_seats = data.number_of_seats;
    let start_time = data.start_time;
    let end_time = data.end_time;
    let course_name = data.course_name;
    let address_ar, address_en, number_of_available_seats;
    let available_date = data.available_date;
    available_date = moment(available_date).format("YYYY-MM-DD 00:00:00");
    console.log("avaibale_date===========>", available_date);
    console.log(token, "token");
    /*========================token validation======================*/
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
      /*=================translation arabic to english and vice versa==================*/
      console.log(language, "language");
      if (language == "en") {
        let temp = await translate.translate_ar(address);
        console.log(temp);
        address_ar = temp.result;
        address_en = address;
        console.log(address_en, "address_en");
      } else {
        address_ar = address;
        let temp = await translate.translate_en(address);
        address_en = temp.result;
      }
      /*==================trainer id selection for particular trainer name=============*/
      await TrainerDao.Trainer_id_select(trainer_name, language)
        .then(async function(result) {
          console.log("result", result.result[0].id);
          let trainer_id = result.result[0].id;
          /*==================course id selection for particular course===============*/
          await CourseDao.Course_id_select(course_name, language).then(
            async function(result) {
              let course_id = result.result[0].course_id;
              let duration = result.result[0].duration;
              console.log("course duration", duration);
              /*====================query value for the classroom inser==================*/
              let query_value = [
                classroom_id,
                trainer_id,
                address_en,
                address_ar,
                number_of_seats,
                number_of_available_seats,
                available_date,
                start_time,
                end_time,
                course_id
              ];
              /*=================calulating the number of classroom cration based on the duration of the course========*/
              await classroomDao
                .insert_count(start_time, end_time, duration)
                .then(async function(result) {
                  let insert_count = result.result;
                  console.log(insert_count, "insert_count");
                  /*=====================query value inserting into class room(auto allocation)===========*/
                  await classroomDao
                    .Classroom_insert(query_value, duration, insert_count)
                    .then(async function(result) {
                      return resolve({
                        status: 200,
                        message: "Class is assigned successfully"
                      });
                    });
                });
            }
          );
        })
        /*========================Error capturing==============================*/
        .catch(async function(err) {
          console.log(err);
          return resolve({
            status: 400,
            message: "something went wrong"
          });
        });
    }
  });
/**********************************Code Ends*********************************************/

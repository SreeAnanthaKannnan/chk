const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const token_gen = require("../utils/token");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const CourseDao = require("../daos/CourseDao");
const message = require("../utils/messages");
const moment = require("moment");
const checktoken = require("../utils/checkToken");

exports.course_creation = (data, token, language) =>
  new Promise(async (resolve, reject) => {
    let name = data.name;
    let amount_exam = data.amount_exam;
    let amount_training = data.amount_training;
    let duration = data.duration;
    /*==============token validation=======================*/
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
            });
          } else {
            /*======================Inserting the query value into coure table=============*/
            await CourseDao.Course_insert(query_value).then(async function(
              result
            ) {
              console.log("result===>", result);
              return resolve({
                status: 200,
                message: "course created successfully"
              });
            });
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
  });
/******************************Code Ends******************************************/

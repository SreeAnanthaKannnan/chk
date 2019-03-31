const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const message = require("../utils/messages");
const CourseDao = require("../daos/CourseDao");
const checktoken = require("../utils/checkToken");

exports.course_view = (token, language) =>
  new Promise(async (resolve, reject) => {
    console.log(token, "token");
    /*=============Token validation===============*/
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
        /*====================Displaying the course names in english====================*/
        await CourseDao.Course_display()
          .then(async function(result, err) {
            if (result) {
              console.log("result", result);

              return resolve({
                status: 200,
                message: result.result
              });
            }
          })
          /*============Error Capturing===============*/
          .catch(async function(err) {
            return resolve({
              status: 400,
              message: "Something Went Wrong"
            });
          });
      } else {
        /*=================Displaying the course names in arabic===========================*/
        await CourseDao.Course_display_arabic()
          .then(async function(result) {
            console.log("result", result);

            return resolve({
              status: 200,
              message: result.result
            });
          })
          /*============Error Capturing===============*/

          .catch(async function(err) {
            return resolve({
              status: 400,
              message: "Something Went Wrong"
            });
          });
      }
    }
  });
/************************************Code Ends**********************************************/

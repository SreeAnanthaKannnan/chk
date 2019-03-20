const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const message = require('../utils/messages')
const CourseDao = require('../daos/CourseDao')

exports.course_view = (token, language) =>
    new Promise(async (resolve, reject) => {
        console.log(token, "token");
        /*=============Token validation===============*/
        let query = await SessionDao.Session_select(token);
        console.log(query, "token");
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            });
        } else {
            /*===================Session validation======================*/
            console.log(query[0].session_created_at);
            let Name_ar, Name_en, query_value;
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(
                Db_time,
                now
            );
            console.log(time_difference_minutes, "function");

            if (time_difference_minutes >= "00:30:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                /*====================Transaltion for arabic to english and vice versa===========*/

                if (language == "en") {
                    /*====================Displaying the course names in english====================*/
                    await CourseDao.Course_display()
                        .then(async function (result, err) {
                            if (result) {
                                console.log("result", result);

                                return resolve({
                                    status: 200,
                                    message: result.result
                                });
                            }

                        })
                        /*============Error Capturing===============*/
                        .catch(async function (err) {

                            return resolve({
                                status: 400,
                                message: "Something Went Wrong"
                            });
                        });
                } else {
                    /*=================Displaying the course names in arabic===========================*/
                    await CourseDao.Course_display_arabic()
                        .then(async function (result) {
                            console.log("result", result);

                            return resolve({
                                status: 200,
                                message: result.result
                            });

                        })
                        /*============Error Capturing===============*/

                        .catch(async function (err) {

                            return resolve({
                                status: 400,
                                message: "Something Went Wrong"
                            });
                        });



                }
            }
        }
    });
/************************************Code Ends**********************************************/
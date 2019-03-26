const SessionDao = require('../daos/SessionDao')
const ClassroomDao = require('../daos/ClassroomDao')
const session_time = require('../utils/session_time_difference')
const TrainerDao = require('../daos/TrainerDao')
const CourseDao = require('../daos/CourseDao')
const checktoken = require("../utils/checkToken")



exports.available_date1 = (token, data, language) => new Promise(async (resolve, reject) => {

    console.log(token, "token")
    console.log(language, "language")
    let no_of_seats_selected = data.no_of_seats_selected;
    let trainer_name = data.trainer_name;
    let course_name = data.course_name;
    console.log(trainer_name, "trainer_name========>")
    console.log(course_name, "course_name=====>")
    /*==========================Selecting token from session table======================*/
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
        /*======================selecting Trainer id from the given trainer_name===================================*/
        await TrainerDao.Trainer_id_select(trainer_name, language)
            .then(async function (result) {
                console.log("result_trainerid", result.result);
                let trainer_id = result.result[0].id
                console.log(trainer_id, "trainer_id")
                /*======================selecting course id from the given course_name===================================*/

                await CourseDao.Course_id_select(course_name, language)
                    .then(async function (result) {
                        console.log("result", result);
                        let course_id = result.result[0].course_id
                        console.log(course_id, "course_id")


                        /*============================selecting the classroom available date============*/

                        await ClassroomDao.Availability_Date(no_of_seats_selected, trainer_id, course_id)
                            .then(async function (result) {
                                console.log("result", result);
                                if (result.message.length != 0) {
                                    return resolve({
                                        status: 200,
                                        message: result.message
                                    });
                                }
                            })
                    })
            })
            /*=========================Error capturing==============================*/
            .catch(async function (err) {
                return resolve({
                    status: 400,
                    message: err
                    // message:err

                });
            });
    }


})
/***********************************Code Ends***************************************************/
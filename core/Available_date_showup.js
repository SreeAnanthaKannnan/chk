const SessionDao = require('../daos/SessionDao')
const ClassroomDao = require('../daos/ClassroomDao')
const session_time = require('../utils/session_time_difference')
const TrainerDao = require('../daos/TrainerDao')
const CourseDao = require('../daos/CourseDao')


exports.available_date1 = (token, data, language) => new Promise(async (resolve, reject) => {

    console.log(token, "token")
    console.log(language, "language")
    let no_of_seats_selected = data.no_of_seats_selected;
    let trainer_name = data.trainer_name;
    let course_name = data.course_name;
    console.log(trainer_name, "trainer_name========>")
    console.log(course_name, "course_name=====>")
   /*==========================Selecting token from session table======================*/
    let query = await SessionDao.Session_select(token)
    console.log(query, "token-reult")
    if (query.length == 0) {
        resolve({
            status: 402,
            message: "Invalid token"
        })
    } else {

      /*==============================Session time checking==============================*/
        console.log(query[0].session_created_at,"session created time<=====")
        let now = new Date();
        let Db_time = query[0].session_created_at;
        let time_difference_minutes = await session_time.Session_time_difference(Db_time, now)
        console.log(time_difference_minutes, "function")

        console.log(time_difference_minutes <= "01:00", "session difference")


        if (time_difference_minutes <= "01:00") {
            return resolve({
                status: 440,
                message: "session expired"
            })
        } else {
          /*======================selecting Trainer id from the given trainer_name===================================*/
            await TrainerDao.Trainer_id_select(trainer_name, language)
                .then(async function(result) {
                    console.log("result_trainerid", result.result);
                    let trainer_id = result.result[0].id
                    console.log(trainer_id, "trainer_id")
          /*======================selecting course id from the given course_name===================================*/

                    await CourseDao.Course_id_select(course_name, language)
                        .then(async function(result) {
                            console.log("result", result);
                            let course_id = result.result[0].course_id
                            console.log(course_id, "course_id")


          /*============================selecting the classroom available date============*/

                            await ClassroomDao.Availability_Date(no_of_seats_selected, trainer_id, course_id)
                                .then(async function(result) {
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
                .catch(async function(err) {
                    return resolve({
                        status: 400,
                         message: err
                        // message:err
                        
                    });
                });
        }
    }

})
/***********************************Code Ends***************************************************/
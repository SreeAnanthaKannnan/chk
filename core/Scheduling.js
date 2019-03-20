const scheduleDao = require('../daos/SchedulingDao')
const ClassroomDao = require('../daos/ClassroomDao')
const Employee_profileDao = require('../daos/Employee_profileDao')
const CourseDao = require('../daos/CourseDao')
const TrainerDao = require('../daos/TrainerDao')
const date = require('date-and-time');
const SessionDao = require('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')
const moment = require('moment')
const now = new Date();

exports.scheduling = (data, request) => new Promise(async (resolve, reject) => {
    let Emirates_id = request.emirates_id
    console.log(Emirates_id, "Employee_ID")
    let start_time = request.start_time;
    let end_time = request.end_time;
    let classroom_id = request.classroom_id;
    let course_name = request.course_name;
    let trainer_name = request.trainer_name;
    let token = data.token;
    let language = data.language;
    let Company_Trade_Lincense_No = data.company_trade_lincense_no
    let number_of_seats_selected = request.number_of_seats_selected;
    let scheduled_date = request.date;
    let payment_status = "pending";
    let status = "Booked";
    /*=============token validation===================*/
    let query = await SessionDao.Session_select(token);
    if (query.length == 0) {
        resolve({
            status: 400,
            message: "Invalid token"
        });
    } else {
        /*==============Session validation======================*/
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

            console.log(scheduled_date, "scheduled_date")

            let scheduling_date = moment(now).format("YYYY-MM-DD")
            console.log(scheduling_date, "scheduling_date")
            scheduled_date = moment(scheduled_date).format("YYYY-MM-DD")
            console.log(scheduled_date)
            /*=============Updating the Employees as booked in the employee_profile table======*/

            await Employee_profileDao.Employee_update(Emirates_id, Company_Trade_Lincense_No, language)
                .then(async function (result) {
                    console.log("result", result);
                    /*================selecting the courseid based on course name from course table==================*/
                    await CourseDao.Course_id_select(course_name, language)
                        .then(async function (result) {
                            console.log("result", result.result[0].course_id);
                            let course_id = result.result[0].course_id;

                            /*===============fetching the training fees from course table===============*/
                            await CourseDao.Course_amount(course_id, language)
                                .then(async function (result) {
                                    console.log("result", result.result[0].training_amount);
                                    let amount = result.result[0].training_amount;
                                    /*==============fetching the trainer id from trainer table====================*/
                                    await TrainerDao.Trainer_id_select(trainer_name, language)


                                        .then(async function (result) {
                                            console.log("result===trainer", result);
                                            let trainer_id = result.result[0].id
                                            await ClassroomDao.Classroom_num(classroom_id, language)
                                                .then(async function (result) {
                                                    console.log("result<=====================", result);
                                                    classroom_id = result.result[0].classnum;
                                                    var query_value = [classroom_id,
                                                        Emirates_id,
                                                        start_time,
                                                        end_time,
                                                        course_id,
                                                        trainer_id,
                                                        Company_Trade_Lincense_No,
                                                        number_of_seats_selected,
                                                        scheduling_date,
                                                        scheduled_date,
                                                        payment_status,
                                                        amount,
                                                        status
                                                    ]
                                                    /*===================validating whether the selected employee already scheduled or not==========*/
                                                    await scheduleDao.Schedule_select(classroom_id, Emirates_id, Company_Trade_Lincense_No)
                                                        .then(async function (result) {
                                                            console.log(result.result != "")
                                                            if (result.result != "") {
                                                                return resolve({
                                                                    status: 400,
                                                                    message: "Employee Already Scheduled"
                                                                });
                                                            } else {

                                                                /*=======================inserting the selected employees in the schedule table========*/
                                                                await scheduleDao.Schedule(query_value)
                                                                    .then(async function (result) {
                                                                        console.log("result", result);
                                                                        if (result.result.length != 0) {
                                                                            return resolve({
                                                                                status: 200,
                                                                                message: " Scheduled successfully"
                                                                            });
                                                                        }

                                                                    })


                                                            }
                                                        })
                                                })
                                        })
                                })
                        })
                })

                /*=======================Error Capturing===============================*/

                .catch(async function (err) {
                    return resolve({
                        status: 400,
                        message: err
                    });
                });
        }
    }


})
/*****************************Code Ends*************************************************** */
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const ScheduleDao = require("../daos/SchedulingDao");
const TrainerDao = require("../daos/TrainerDao");
const CourseDao = require("../daos/CourseDao");
const Employee_ProfileDao = require("../daos/Employee_profileDao");

exports.schedule_summary = request =>
    new Promise(async (resolve, reject) => {
        let Company_Trade_Lincense_No = request.company_trade_lincense_no;
        let token = request.token;
        let language = request.language;
        let status = "Booked";

        /*====================Token validation======================*/
        let query = await SessionDao.Session_select(token);
        if (query.length == 0) {
            resolve({
                status: 400,
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
            /*****************Session Validation****************************/

            if (time_difference_minutes <= "01:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                /*******************fetching the number of employees in the schedule table*************/
                await ScheduleDao.schedule_summary_value(
                        Company_Trade_Lincense_No,
                        language,
                        status
                    )
                    .then(async function(result) {
                        console.log("result", result.result.data.length);
                        if (result.result.data.length == 0) {
                            return resolve({
                                status: 400,
                                message: "Nobody are booked"
                            });
                        } else {
                            var value = [];
                            var obj = {};
                            var schedule_result = result.result.data;
                            /*===================taking trainer_id, emirates_id from the scheduled employees===========*/
                            console.log(schedule_result[0].trainer_id, "scheduleresult");
                            console.log(result.result.data[0].National_Id, "length");
                            /*=============================push the employees emirates id in the value array=============*/
                            for (i = 0; i < result.result.data.length; i++) {
                                value.push(result.result.data[i].National_Id);
                            }
                            console.log(value, "value");
                            /*=================================fetching scheduled employees from employee profile table=================================================*/

                            await Employee_ProfileDao.Employee_name_schedule(
                                value,
                                language
                            ).then(async function(result) {
                                let final_array = [];
                                let final_array1 = [];
                                /*========pusing the scheduled summary in the final_arry if the language is arabic==============*/
                                if (language == "ar") {
                                    for (i = 0; i < result.result.length; i++) {
                                        console.log(
                                            schedule_result[i],
                                            "schedule_Result[i]"
                                        );
                                        /*============fetching the trainer_names from the trainer name who is scheduled=========*/

                                        let trainer_Name = await TrainerDao.trainer_name_schedule(
                                            schedule_result[i].trainer_id,
                                            language
                                        );
                                        console.log(
                                            trainer_Name,
                                            "testing============================="
                                        );
                                        /*============fetching the course_names from the trainer name who is scheduled=========*/

                                        let course_Name = await CourseDao.course_name_schedule(
                                            schedule_result[i].course_id,
                                            language
                                        );
                                        console.log(
                                            course_Name,
                                            "testing1============================="
                                        );

                                        let start_time = schedule_result[i].start_time;
                                        let end_time = schedule_result[i].end_time;
                                        let amount = schedule_result[i].amount;
                                        let Emirates_ID = schedule_result[i].National_Id;
                                        let trainer_name = trainer_Name.result[0].Name_ar;
                                        let course_name = course_Name.result[0].name_ar;
                                        let Employee_name = result.result[i];
                                        let classroom_id = schedule_result[i].classroom_id;
                                        obj = {
                                            start_time: start_time,
                                            end_time: end_time,
                                            amount: amount,
                                            Emirates_ID: Emirates_ID,
                                            Employee_name: Employee_name,
                                            course_name: course_name,
                                            trainer_name: trainer_name,
                                            classroom_id: classroom_id
                                        };

                                        final_array.push(obj);
                                    }
                                    return resolve({
                                        status: 200,
                                        message: final_array
                                    });
                                }
                                /*=========================Pushing the scheduled summary in the final_arry1 if the language is english=======*/
                                if (language == "en") {
                                    for (i = 0; i < result.result.length; i++) {
                                        console.log(
                                            schedule_result[i],
                                            "myyyyyyyyyyyyyyyyyyyyyyyyyyy"
                                        );

                                        let trainer_Name = await TrainerDao.trainer_name_schedule(
                                            schedule_result[i].trainer_id,
                                            language
                                        );
                                        console.log(
                                            trainer_Name,
                                            "testing============================="
                                        );
                                        let course_Name = await CourseDao.course_name_schedule(
                                            schedule_result[i].course_id,
                                            language
                                        );
                                        console.log(
                                            course_Name,
                                            "testing1============================="
                                        );

                                        let start_time = schedule_result[i].start_time;
                                        let end_time = schedule_result[i].end_time;
                                        let amount = schedule_result[i].amount;
                                        let Emirates_ID = schedule_result[i].National_Id;
                                        let trainer_name = trainer_Name.result[0].Name_en;
                                        let course_name = course_Name.result[0].name_en;
                                        let Employee_name = result.result[i];
                                        let classroom_id = schedule_result[i].classroom_id;
                                        obj = {
                                            start_time: start_time,
                                            end_time: end_time,
                                            amount: amount,
                                            Emirates_ID: Emirates_ID,
                                            Employee_name: Employee_name,
                                            course_name: course_name,
                                            trainer_name: trainer_name,
                                            classroom_id: classroom_id
                                        };

                                        final_array1.push(obj);
                                    }
                                    return resolve({
                                        status: 200,
                                        message: final_array1
                                    });
                                }
                            });
                        }

                    })
                    /*=======================Error Capturing==========================================*/
                    .catch(async function(err) {
                        console.log(err, "err");
                        return resolve({
                            status: 400,
                            message: "something went wrong"
                        });
                    });
            }
        }
    });
/********************************Code Ends*********************************************/
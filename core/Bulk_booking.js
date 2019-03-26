const SessionDao = require('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')
const ScheduleDao = require('../daos/SchedulingDao')
const classroomDao = require('../daos/ClassroomDao')
const CourseDao = require('../daos/CourseDao')

const Employee_ProfileDao = require('../daos/Employee_profileDao')
let moment = require("moment");
const now = new Date();
const checktoken = require("../utils/checkToken")


exports.bulk_booking = (request, data) => new Promise(async (resolve, reject) => {
    let course_name = data.course_name;
    let token = request.authorization;
    let language = request.language;
    let Company_Trade_Lincense_No = request.company_trade_lincense_no;
    console.log(Company_Trade_Lincense_No, "test")
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
    }
    /*==============================selecting untrained Employees for schedule=====================*/
    await Employee_ProfileDao.Untrained_Employees_schedule(Company_Trade_Lincense_No, language)
        .then(async function (result) {
            console.log("untrained employee result", result);

            let Emirates_array = []
            for (i = 0; i < result.result.length; i++) {
                /*=================Emirates ID array==============*/
                let Emirates_value = result.result[i].National_Id
                Emirates_array.push(Emirates_value)


            }
            let Emirates_ID = Emirates_array;
            let no_of_Seats_selected = Emirates_ID.length;
            console.log(Emirates_ID, "Emirates_ID")
            /*===============selecting Course_id based on course_name========*/
            await CourseDao.Course_id_select(course_name, language)
                .then(async function (result) {
                    console.log("result", result.result[0].course_id);
                    let course_id = result.result[0].course_id;
                    /*===============selecting training amount from course table====*/
                    await CourseDao.Course_amount(course_id, language)
                        .then(async function (result) {
                            console.log("result", result.result[0].training_amount);
                            let amount = result.result[0].training_amount;
                            /*====================Entering into bulk booking logic========================*/
                            await classroomDao.bulk_booking(course_id, no_of_Seats_selected, language, Emirates_ID, Company_Trade_Lincense_No, scheduling_date, amount)
                                .then(async function (result) {

                                    console.log("Result", result.result.affectedRows == 1)
                                    if (result.result.affectedRows == 1) {
                                        return resolve({
                                            status: 200,
                                            message: "Scheduled Successfully"
                                        });
                                    } else {
                                        return resolve({
                                            status: 400,
                                            message: "something went wrong"
                                        })
                                    }

                                })
                        })
                })
        })







})
/*====================================code Ends=======================================*/
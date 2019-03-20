const SessionDao = require('../daos/SessionDao')
const Employee_profileDao = require('../daos/Employee_profileDao')
const session_time = require('../utils/session_time_difference')
var base64ToImage = require('base64-to-image');
const ab2str = require('arraybuffer-to-string')
const language_detect = require('../utils/language_detect')
const translate = require('../utils/translate')
const fs = require("fs")



exports.Untrained_Employees_schedule = (data, token, language) => new Promise(async (resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No;
    /*==================token validation===============================*/
    let query = await SessionDao.Session_select(token)
    if (query.length == 0) {
        resolve({
            status: 402,
            message: "Invalid token"
        })
    } else {
        /*===================Session validation=========================*/
        console.log(query[0].session_created_at)
        let Name_ar, Name_en, query_value
        let now = new Date();

        let Db_time = query[0].session_created_at;
        /*===========================fetching the time difference=============*/
        let time_difference_minutes = await session_time.Session_time_difference(Db_time, now)

        if (time_difference_minutes >= "00:30:00") {
            return resolve({
                status: 440,
                message: "session expired"
            })
        } else {
            /*=======================fetching the employee list from employee profile who are not passed in the result table======*/
            let Untrained_Employees = await Employee_profileDao.Untrained_Employees_schedule(Company_Trade_Lincense_No, language)
            let result = Untrained_Employees
            console.log(Untrained_Employees.result, "<====================result")
            let total_length = Untrained_Employees.result
            let value = [];
            let obj = {}
            /*=======================pushing the employee list object from the above result into value array for arbaic language selection========*/
            if (language == "ar") {
                for (i = 0; i < total_length.length; i++) {
                    obj = {
                        Employee_ID: total_length[i].Employee_ID,
                        Name_ar: total_length[i].Name_ar,
                        Position: total_length[i].Position,
                        National_Id: total_length[i].National_Id,
                        Company_Trade_Lincense_No: total_length[i].Company_Trade_Lincense_No,
                        assigned_for_training: total_length[i].assigned_for_training
                    }
                    value.push(obj)


                }
                console.log(value, "=============value")
                return resolve({
                    status: 200,
                    message: value
                })
            }
            /*=======================pushing the employee list object from the above result into value array for arbaic language selection========*/

            if (language == "en") {
                for (i = 0; i < total_length.length; i++) {
                    obj = {
                        Employee_ID: total_length[i].Employee_ID,
                        Name_en: total_length[i].Name_en,
                        Position: total_length[i].Position,
                        National_Id: total_length[i].National_Id,
                        Company_Trade_Lincense_No: total_length[i].Company_Trade_Lincense_No,
                        assigned_for_training: total_length[i].assigned_for_training
                    }
                    value.push(obj)


                }
                return resolve({
                    status: 200,
                    message: value
                })
            }



        }

    }

})
/************************************Code Ends**********************************************/
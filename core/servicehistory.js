var asser = require('../daos/servicehistory');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
module.exports = {
    bookservice: bookservice
}

function bookservice(email_id, token) {
    return new Promise(async (resolve, reject) => {
        //Fetching the Data from Dao by passing the email of the User
        let query = await SessionDao.Session_select(token)
        console.log(query, "token")
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            })
        } else {
            /*===================session validation=======================*/
            console.log(query[0].session_created_at)
            let Name_ar, Name_en, query_value
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(Db_time, now)
            console.log(time_difference_minutes, "function")

            console.log(time_difference_minutes >= "00:30:00", "session durationchecking")


            if (time_difference_minutes >= "00:30:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                })
            } else {
                var result = await asser.historyget(email_id)
                logger.fatal("result in core", result)
                if (result) {
                    resolve({
                        status: 200,
                        result: result
                    })
                }
                reject({
                    message: "no requests available"
                })
            }
        }

    })
}
//==============================================================Code End==============================================================================//
var building = require('../daos/buildingDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
module.exports = {
    buildings: buildings
}

function buildings(buildingobject, token, email_id) {
    logger.fatal(buildingobject, "buildingobject")
    return new Promise(async (resolve, reject) => {
        var responseObj = {};
        //passing values to Dao to store the Building details   
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


            if (time_difference_minutes <= "00:30:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                })
            } else {
                var user = building.building(buildingobject, email_id).then((data) => {
                    logger.fatal(user, "user")
                    responseObj.data = data;
                    responseObj.errors = [];
                    responseObj.meta = {};

                    resolve(responseObj);
                }).catch((error) => {
                    responseObj.data = [];
                    responseObj.errors = [error];
                    responseObj.meta = {};
                });
            }
        }
    })
}
//=======================================code End==============================================================//
var updatedao = require('../daos/updatedao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports = {
    update: update
}

function update(installation, token) {
    logger.fatal(installation, "installation")
    return new Promise(async (resolve, reject) => {
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

            if (time_difference_minutes >= "00:30:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                var responseObj = {};
                //updatin
                var user = updatedao.updatedao(installation).then((data) => {
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
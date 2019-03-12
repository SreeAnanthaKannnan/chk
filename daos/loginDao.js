var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

function login(loginobject) {
    return new Promise(function (resolve, reject) {
        var email_id = loginobject.email;
        logger.fatal("in dao", email_id);
        var sql = "SELECT email_id,password,user_type FROM citizens where email_id ='" + email_id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                logger.fatal("something", err)
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                logger.fatal(result, "achieved")
                return resolve({ result });
            }
        });
    })
}
module.exports = {
    login: login,

}
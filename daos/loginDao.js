var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");

function login(loginobject) {
    return new Promise(function(resolve, reject) {
        var email_id = loginobject.email;
//====================================================Get Login Information form Citizens Table==================================================================//       
        mysqlConnection
            .query_execute(query.getlogindetails, email_id)
            .then(function(err,result) {

                if (err) {
                    logger.fatal("db error while checking the login in table", err)
                    return reject({
                        "status": 400,
                        "body": 'Cannot insert the data'
                    })
                } else {
                    console.log(result.data[0], "achieved")
                    return resolve({
                        result: result.data[0]
                    });
                }
            })

    })
}
module.exports = {
    login: login,
}
//====================================================Code End==================================================================//       
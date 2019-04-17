var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');



// =============================================================================================================================================== 

function adminapproved(
    status,
    emirates_id) {
    return new Promise(async function (resolve, reject) {
        var param = [status, emirates_id,]
        console.log("DAO_reg", param)

        // -----
        var res = await mysqlConnection.query_execute(
            query.updatestatuslist,
            param
        );
        console.log("response", res)
        if (res.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            });
        } else {
            console.log("result_dao===========>", res)
            return resolve({
                status: 200,
                message: res
            });
        }
    });
}


module.exports = {

    adminapproved: adminapproved
}
//====================================================Code End==================================================================//
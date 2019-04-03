// var con = require('../mysql_connection/dbConfig.js');
// var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
//Here the Data from UI is separated and stored in DATA BASE
function delbuilding(buildingobject) {
    return new Promise(async (resolve, reject) => {

        logger.fatal(buildingobject, "=>buildingobject");
        var params = [buildingobject.id]
        mysqlConnection
            .query_execute(query.deleteBuilding, params)
            .then(function(result, err) {
                if (err) {
                    console.log("something", err);
                    return resolve({
                        status: 400,
                        err: err
                    });
                } else {
                    console.log(result);
                    return resolve({
                        status: 200,
                        message: result
                    });
                }
            });
    })
}

module.exports = {
    delbuilding: delbuilding
}
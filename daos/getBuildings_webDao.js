const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

//Here we fetch the Building details of the user
function buildings(buildingobject) {
    return new Promise((resolve, reject) => {
        console.log(buildingobject, "=>buildingobject");
        mysqlConnection
        .query_execute(query.getbuildings_web,buildingobject)
        .then(function (result, err) {
          
            if (err) {
                logger.fatal("something", err)
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                console.log(result, "achieved")
                return resolve({ status:200, result:result.data});
            }
        })
    })
}
module.exports = {
    buildings: buildings

}
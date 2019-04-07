const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');

//Here we fetch the Building details of the user
function buildings(buildingobject) {
    return new Promise((resolve, reject) => {
        console.log(buildingobject, "=>buildingobject");
        mysqlConnection
        .query_execute(query.getbuildings_web,buildingobject)
        .then(function (err,result) {
          
            if (err) {
                logger.fatal(err,"db error while inerting the building details into the building table")
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
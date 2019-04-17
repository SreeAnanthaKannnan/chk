const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');

//Here we fetch the Building details of the user
 function buildings() {
    return new Promise((resolve, reject) => {
        mysqlConnection
        .query_execute(query.allbuildings)
        .then(function (result, err) {
          
            if (err) {
                logger.fatal(err,"db error while getting building details from the building table")
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                return resolve({ status:200, result:result.data});
            }
        })
    })
}
module.exports = {
    buildings: buildings
   
}
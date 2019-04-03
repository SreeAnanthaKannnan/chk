var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

//Here we fetch the Building details of the user
function buildings(buildingobject) {
    return new Promise((resolve, reject) => {
        console.log(buildingobject, "=>buildingobject");
        // var sql = "SELECT  * FROM Buildings INNER JOIN payment ON payment.email_id=Buildings.email_id AND Buildings.email_id= '" + buildingobject + "'";

        //var sql = "SELECT  * FROM Buildings inner join citizens on Buildings.email_id=citizens.email_id AND Buildings.email_id= '" + buildingobject + "'";
        var sql = "SELECT Buildingname, address, preschedule,  REPLACE(alternumber,'||',', ') AS alternumber, installeddate,preschedule from Buildings where orderid='" + buildingobject + "'";
        con.query(sql, function (err, result) {
            console.log("result", result)
            if (err) throw err;
            dbFunc.connectionRelease;
            logger.fatal("DataBase ERR:", err)
            logger.fatal(result, "inserted.......")
            resolve({
                Message: "get Buildings done",
                result: result
            })
        })
    })
}
module.exports = {
    buildings: buildings

}
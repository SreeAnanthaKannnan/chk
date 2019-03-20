const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");



function Appeal_insert(param) {
    return new Promise(async function(resolve, reject) {
        /*============================Getting row count for compliance number===============*/
        var res = await mysqlConnection.query_execute(query.appealidcount, [])
        console.log(res.data[0].count, "count result")
        console.log(JSON.parse(param[5]), "param")
        /*=========================changing the json value to number abd increase the row count by one========================*/
        var Compliant_NO = Number(param[5] + (res.data[0].count + 1))
        console.log(Compliant_NO, "compliance no")
        let service = param[0];
        let service_ar = param[1];
        let description = param[2]
        let description_ar = param[3]
        let Appeal_date = param[4]
        query_Value = [
            service,
            service_ar,
            description,
            description_ar,
            Appeal_date,
            Compliant_NO

        ]
        if (res.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }

        /*=======================Inserting Appeal values in the db========================*/
        let res1 = await mysqlConnection
            .insert_query(query.Appeal, query_Value)
        console.log(res1, "dbresult")
        if (res1.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        } else {
            /*=======sending Compliant_NO to the Appeal.js======*/
            return resolve({
                status: 200,
                result: Compliant_NO
            });

        }


    })
}
/*=====================================Exporting the modules============================*/

module.exports = {
    Appeal_insert: Appeal_insert
}
/*=====================================Code Ends=========================================*/
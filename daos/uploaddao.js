const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/connection");

const query = require("../mysql_connection/queries");

function Building_insert(params) {
    return new Promise(async function (resolve, reject) {
        /*====================inserting employee's data into employee_Profile table========*/
        var res1 = await mysqlConnection
            .insert_query(query.insertbulkbuilding, params)
        console.log(res1, "err===>")
        /*==========db error capturing================*/
        if (res1.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            // console.log(result);
            return resolve({
                status: 200,
                message: res1
            });
        }

    });
}
module.exports = {
    Building_insert: Building_insert
}
// var log4js = require('log4js');
// const logger = log4js.getLogger('Aman_project');
// const mysqlConnection = require("../config/Connection");
// const query = require("../mysql_connection/queries");
//Here the Data from UI is separated and stored in DATA BASE
const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/connection");

const query = require("../mysql_connection/queries");

function payment(param) {
    return new Promise(async function (resolve, reject) {
        var params = [param.email_id, param.paymenttype, param.trnxReference, param.Amount, param.Status]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .insert_query(query.payment, params)
            /*==========db error capturing================*/
            .then(function (result, err) {
                if (err) {
                    console.log("something", err);
                    return resolve({ status: 400, err: err });
                } else {
                    console.log(result);
                    return resolve({ status: 200, message: result });
                }
            });

    });
}
//==================================Trainer_attendance =============================================================//


module.exports = {
    payment: payment

};
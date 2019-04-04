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
        var params = [param.payment_type, param.Amount, param.trnx, param.order_status, param.certificate_status, param.order_id,]
        // console.log("amount", param.Amount)
        // console.log("tran", param.trnx)
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.Payment, params)
            /*==========db error capturing================*/
            .then(function (result, err) {
                if (err) {
                    console.log("something", err);
                    return resolve({ status: 400, err: err });
                } else {
                    console.log(result, "result====>")
                    console.log(result);
                    return resolve({ status: 200, message: result });
                }
            });

    });
}
function payment_aman(param) {
    return new Promise(async function (resolve, reject) {
        var params = [param.paymenttype, param.trnx, param.Amount, param.status, param.orderid,]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payment_aman, params)
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
function payment_aman_install(param) {
    console.log("in dao", param);
    return new Promise(async function (resolve, reject) {
        var params = [param.installeddate, param.email_id, param.Buildingname]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payment_aman_install, params)
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
    payment: payment,
    payment_aman: payment_aman,
    payment_aman_install: payment_aman_install

};
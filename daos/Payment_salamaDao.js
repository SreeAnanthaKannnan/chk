// var log4js = require('log4js');
// const logger = log4js.getLogger('Aman_project');
// const mysqlConnection = require("../config/Connection");
// const query = require("../mysql_connection/queries");
//Here the Data from UI is separated and stored in DATA BASE
const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/connection");
var log4js = require('log4js');
const logger = log4js.getLogger("SPSA_project");


const query = require("../mysql_connection/queries");

function payment(param) {
    return new Promise(async function (resolve, reject) {
        var params = [param.payment_type, param.trnx, param.Amount, param.order_status, param.certificate_status, param.order_id]
        /*====================inserting employee's data into employee_Profile table========*/
        var res1 = await mysqlConnection
            .insert_query(query.payupdate, params)
        console.log(res1, "res1======>")
        /*==========db error capturing================*/
        if (res.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            })
        }

    });
}
function payselect(param) {
    return new Promise(async function (resolve, reject) {
        var params = [param]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payselect, params)
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
function payselect1(param) {
    return new Promise(async function (resolve, reject) {
        var params = [param]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payselect1, params)
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
function payupdate(param) {
    return new Promise(async function (resolve, reject) {
        var params = [param.payment_type, param.trnx, param.Amount, param.order_status, param.order_id]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payupdate, params)
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
    payselect: payselect,
    payupdate: payupdate,
    payselect1: payselect1

};
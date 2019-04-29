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
        var params = [param.payment_type, param.Amount, param.trnx, param.order_status, param.certificate_status, param.order_id,]
        // console.log("amount", param.Amount)
        // console.log("tran", param.trnx)
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.Payment, params)
            /*==========db error capturing================*/
            .then(function (result, err) {
                if (err) {
                    logger.fatal(err,"db error while updating payment")
                    return resolve({ status: 400, err: err });
                } else {
                    
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
                      logger.fatal(err,"db error while updating payment details")
                    return reject({ status: 400, message: "something went wrong" });
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
                    logger.fatal(err,"Db error while update the payment details for aman order book")
                    return resolve({ status: 400, err: err });
                } else {
                    console.log(result);
                    return resolve({ status: 200, message: result });
                }
            });

    });
}
function payment_aman_statusdao(param) {
    console.log("in dao", param);
    return new Promise(async function (resolve, reject) {
        var params = [param.status, param.orderid]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payment_aman_status, params)
            /*==========db error capturing================*/
            .then(function (result, err) {
                if (err) {
                    logger.fatal(err,"Db error while update the payment details for aman order book")
                    return resolve({ status: 400, err: err });
                } else {
                    console.log(result);
                    return resolve({ status: 200, message: result });
                }
            });

    });
}
//==================================Trainer_attendance =============================================================//
function pay_verify(params) {
    return new Promise(async function (resolve, reject) {
        // console.log("amount", param.Amount)
        // console.log("tran", param.trnx)
        /*====================inserting employee's data into employee_Profile table========*/
       var res= await mysqlConnection
            .query_execute(query.pay_verify, [params])
            /*==========db error capturing================*/
            if (res.data.errno)  {
                    logger.fatal(res.data.sqlMessage,"db error while updating payment")
                    return resolve({
                        status:400,
                        message:res.data.sqlMessage
                    })
                } else {
                    
                    return resolve({ status: 200, message: res.data[0]});
                }
            

    });
}
function pay_verify_status(params) {
    return new Promise(async function (resolve, reject) {
        // console.log("amount", param.Amount)
        // console.log("tran", param.trnx)
        /*====================inserting employee's data into employee_Profile table========*/
       var res= await mysqlConnection
            .query_execute(query.pay_verify_status, [params])
            /*==========db error capturing================*/
            if (res.data.errno)  {
                    logger.fatal(res.data.sqlMessage,"db error while updating payment")
                    return resolve({
                        status:400,
                        message:res.data.sqlMessage
                    })
                } else {
                    
                    return resolve({ status: 200, message: res.data[0]});
                }
            

    });
}
function payment_aman_pref(param,pushcount) {
    console.log("in dao", param);
    return new Promise(async function (resolve, reject) {
        var params = [param.preschedule, pushcount,param.email_id, param.Buildingname]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.payment_aman_pref, params)
            /*==========db error capturing================*/
            .then(function (result, err) {
                if (err) {
                    logger.fatal(err,"Db error while update the payment details for aman order book")
                    return resolve({ status: 400, err: err });
                } else {
                    console.log(result);
                    return resolve({ status: 200, message: result });
                }
            });

    });
}
function pushnotifycount(param) {
    console.log("in dao", param);
    return new Promise(async function (resolve, reject) {
        var params = [param.email_id]
        /*====================inserting employee's data into employee_Profile table========*/
        mysqlConnection
            .query_execute(query.pushnotifycount, params)
            /*==========db error capturing================*/
            .then(function (result, err) {
                if (err) {
                    logger.fatal(err,"Db error while update the payment details for aman order book")
                    return resolve({ status: 400, err: err });
                } else {
                    console.log(result);
                    return resolve({ status: 200, message: result });
                }
            });

    });
}

module.exports = {
    payment: payment,
    payment_aman: payment_aman,
    payment_aman_install: payment_aman_install,
    pay_verify : pay_verify,
    payment_aman_statusdao:payment_aman_statusdao,
    pay_verify_status:pay_verify_status,
    payment_aman_pref:payment_aman_pref,
    pushnotifycount:pushnotifycount
  

};
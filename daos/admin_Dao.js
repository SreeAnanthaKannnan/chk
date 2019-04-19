var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');



// =============================================================================================================================================== 

function adminapproved(
    status,
    emirates_id) {
    return new Promise(async function (resolve, reject) {
        var param = [status, emirates_id,]
        console.log("DAO_reg", param)

        // -----
        var res = await mysqlConnection.query_execute(
            query.updatestatuslist,
            param
        );
        console.log("response", res)
        if (res.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            });
        } else {
            console.log("result_dao===========>", res)
            return resolve({
                status: 200,
                message: res
            });
        }
    });
}
function getavgbuildings() {
    return new Promise((resolve, reject) => {
        mysqlConnection
            .query_execute(query.getavgbuildings)
            .then(function (result, err) {

                if (err) {
                    logger.fatal(err, "db error while getting building details from the building table")
                    return reject({ "status": 400, "body": 'Cannot insert the data' })
                }
                else {
                    return resolve({ status: 200, result: result.data });
                }
            })
    })
}
function getavgorder() {
    return new Promise((resolve, reject) => {
        mysqlConnection
            .query_execute(query.getavgorder)
            .then(function (result, err) {

                if (err) {
                    logger.fatal(err, "db error while getting building details from the building table")
                    return reject({ "status": 400, "body": 'Cannot insert the data' })
                }
                else {
                    return resolve({ status: 200, result: result.data });
                }
            })
    })
}

function getbuildingsmonth(buildingmonth, buildingyear) {
    // const params = [date.startDate, date.toDate];
    return new Promise(async function (resolve, reject) {
        const response = [];
        var res = await mysqlConnection.query_execute(
            query.getbuildingsDetailsForDashBoard,
            [buildingmonth, buildingyear]
        );
        console.log('data from sql', res);

        if (res.status != 200) {
            return reject({
                status: res.status,
                message: 'Cant able to fetch the data'
            })
        } else {
            return resolve({
                status: res.status,
                data: res.data,
            })
        }


    })
}

function getOrdersMonth(ordermonth, orderyear) {
    // const params = [date.startDate, date.toDate];
    return new Promise(async function (resolve, reject) {
        const response = [];
        var res = await mysqlConnection.query_execute(
            query.getOrderDetailsForDashBoard,
            [ordermonth, orderyear]
        );
        console.log('data from sql', res);

        if (res.status != 200) {
            return reject({
                status: res.status,
                message: 'Cant able to fetch the data'
            })
        } else {
            return resolve({
                status: res.status,
                data: res.data,
            })
        }


    })
}

function getadmin_month(adminmonth_list, adminyear) {
    // const params = [date.startDate, date.toDate];
    return new Promise(async function (resolve, reject) {
        const response = [];
        var res = await mysqlConnection.query_execute(
            query.getadminDetailsseperateForDashBoard,
            [adminmonth_list, adminyear]
        );
        console.log('data from sql', res);

        if (res.status != 200) {
            return reject({
                status: res.status,
                message: 'Cant able to fetch the data'
            })
        } else {
            return resolve({
                status: res.status,
                data: res.data,
            })
        }


    })
}
function getavgadmin() {
    return new Promise((resolve, reject) => {
        mysqlConnection
            .query_execute(query.getavgadmin)
            .then(function (result, err) {

                if (err) {
                    logger.fatal(err, "db error while getting building details from the building table")
                    return reject({ "status": 400, "body": 'Cannot insert the data' })
                }
                else {
                    return resolve({ status: 200, result: result.data });
                }
            })
    })
}

module.exports = {

    adminapproved: adminapproved,
    getavgbuildings: getavgbuildings,
    getbuildingsmonth: getbuildingsmonth,
    getavgorder: getavgorder,
    getOrdersMonth: getOrdersMonth,
    getadmin_month: getadmin_month,
    getavgadmin: getavgadmin

}
//====================================================Code End==================================================================//
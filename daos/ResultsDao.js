/**
 * @author: Manoj V
 * @version: 1.0.0
 * @date: March 05, 2019
 * @description: This would be the DAO file where all the mysql queries will be executed for result insertion and fetch.
 */
const con = require("../mysql_connection/dbConfig");
const log4js = require("log4js");
const logger = log4js.getLogger("Salama_project");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");

//====Inserting the results in result table====//
async function Result_insert(params) {
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection.insert_query(
      query.insertemployeeResults,
      params
    );
    console.log("response", res)
    if (res.data.errno) {
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {

      return resolve({
        status: 200,
        message: res.data
      });
    }
  });
}
//====Fetching the result from the result table by passing parameter national_id====//
async function Result_select(params) {
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection.query_execute(query.findemployeeResults, [
      params
    ]);
    

    if (res.data.errno) {
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      return resolve({
        status: 200,
        message: res.data
      });
    }
  });
}
//====Fetching the records from the attendance table by passing parameter trainer_id====//
async function Attendance_select(params) {
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection.query_execute(query.findemployeeAttendance, [
      params
    ]);

    if (res.data.errno) {
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      return resolve({
        status: 200,
        message: res.data
      });
    }

  });
}
async function Attendance_delete(params) {
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection
      .query_execute(query.deleteattendance, [params])
    console.log("res", res)
    if (res.data.errno) {
      return reject({
        status: 400,
        message: "something went wrong"
      })
    } else {

      return resolve({
        status: 200,
        message: res.data
      });
    }
  });

}

async function result_national_id(params,language) {
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection
      .query_execute(query.getcoursename, [params])
console.log("res=====>",res)
    if (res.data.errno) {
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      return resolve(res.data);
    }
  });

}

module.exports = {
  Result_insert: Result_insert,
  Result_select: Result_select,
  Attendance_select: Attendance_select,
  Attendance_delete: Attendance_delete,
  result_national_id: result_national_id
};
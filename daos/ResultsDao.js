const con = require("../mysql_connection/dbConfig");
const log4js = require("log4js");
const logger = log4js.getLogger("Salama_project");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
// const Promise = require('bluebird')

async function Result_insert(params) {
  return new Promise(function(resolve, reject) {
    // console.log("hiiiii", params);
    // params = [params];
    // sql =
    //   "INSERT INTO Results (date_attended,employee_id,attendance_id,score,result_en,result_ar,certificate,emirates_id) VALUES ? ";
    // con.query(sql, [params], function(err, result) {
    //   if (err) {
    //     logger.fatal(err);
    //     console.log(err);
    //     return resolve(err);
    //   }
    //   return resolve(result);
    // });
    mysqlConnection
      .insert_query(query.insertemployeeResults, params)
      .then(function(result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, message: result });
        }
      });
  });
}
async function Result_select(params) {
  return new Promise(async function(resolve, reject) {
    // await con.query(
    //   "SELECT * FROM Results where emirates_id ='" + params + "'",
    //   (err, result) => {
    //     if (err) {
    //       //  console.log(result,"achieved")
    //       console.log("something", err);
    //       return resolve({ status: 400, err: err });
    //     } else {
    //       console.log(result);
    //       return resolve({ status: 200, message: result });
    //     }
    //   }
    // );
    mysqlConnection
      .query_execute(query.findemployeeResults, [params])
      .then(function(result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, message: result });
        }
      });
  });
}
async function Attendance_select(params) {
  return new Promise(async function(resolve, reject) {
    await con.query(
      "SELECT * FROM Attendance where trainer_id ='" +
        params +
        "' AND attendance_status='Present'",
      (err, result) => {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          // console.log(result);
          return resolve({ status: 200, message: result });
        }
      }
    );
  });
}
async function Attendance_delete(params) {
  return new Promise(async function(resolve, reject) {
    mysqlConnection
      .query_execute(query.deleteattendance, [params])
      .then(function(result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, message: result });
        }
      });
  });
}

async function result_national_id(params) {
  return new Promise(async function(resolve, reject) {
    mysqlConnection
      .query_execute(query.getcoursename, [params])
      .then(function(result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({  result });
        }
      });
  });
}

module.exports = {
  Result_insert: Result_insert,
  Result_select: Result_select,
  Attendance_select: Attendance_select,
  Attendance_delete: Attendance_delete,
  result_national_id:result_national_id
};

const mysqlConnection = require("../mysql_connection/connection");
const query = require("../mysql_connection/queries");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");

function Session_insert(params) {
  return new Promise(async function (resolve, reject) {
    // params =[params]
    var res1 = await mysqlConnection.insert_query(query.sessioninsert, params);

    /*========if the affectedRows ==1 means it is inserted into the db==========*/
    if (res1.data.affectedRows == 1) {
      return resolve({
        result: res1
      });
    } else {
      /*=============db error===================*/
      logger.fatal(res1.data.sqlMessage,"db error while inerting session into session table")
      return resolve({
        err: "Something Went Wrong"
      });
    }
  });
}
/*========================Session select ====================================8*/
async function Session_select(params) {
  return new Promise(async function (resolve, reject) {
    var res1 = await mysqlConnection.query_execute(query.session, [params]);
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage, "db error while selecting session from session table")

      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      console.log("res1 in line 41 ", res1);
      return resolve(res1.data);
    }
  });
}
/*================Session update============================*/
async function Session_update(params) {
  return new Promise(async function (resolve, reject) {
    // logger.fatal("achie")
    var res1 = await mysqlConnection.query_execute(query.sessionupdate, params);
    console.log("update record", res1);
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while updating session")
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      return resolve(res1.data);
    }
  });
}
async function check_token(params) {
  return new Promise(async function (resolve, reject) {
    // logger.fatal("achie")
    var res1 = await mysqlConnection.query_execute(query.checktoken, params);
    console.log("update record", res1);
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while check the token")
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      return resolve(res1.data);
    }
  });
}
async function session_delete(params) {
  return new Promise(async function (resolve, reject) {
    // logger.fatal("achie")
    var res1 = await mysqlConnection.query_execute(query.deletetoken, params);
    console.log("update record", res1);
    if (res1.data.errno) {
      logger.fatal(res1.data.sqlMessage,"db error while deleting session from session table")
      return reject({
        status: 400,
        message: "something went wrong"
      });
    } else {
      return resolve(res1.data);
    }
  });
}

module.exports = {
  Session_insert: Session_insert,
  Session_select: Session_select,
  Session_update: Session_update,
  check_token: check_token,
  session_delete: session_delete
};



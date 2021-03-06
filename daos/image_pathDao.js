var con = require("../mysql_connection/dbConfig.js");
var dbFunc = require("../mysql_connection/connection.js");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");

async function image_path(filepath, id) {
  console.log("in dao", filepath, id);
  return new Promise(async function(resolve, reject) {
    var params = [filepath, id];
    console.log(params, "in line 12");
    //====================================================Insert pdf file path into Buildings Table====================================================//
    mysqlConnection
      .query_execute(query.imagepdf, params)
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
async function receipt_path(filepath, order_id) {
  console.log("in dao", filepath, order_id);
  return new Promise(async function(resolve, reject) {
    var params = [filepath, order_id];
    console.log(params, "in line 12");
    //====================================================Insert pdf file path into Buildings Table====================================================//
    mysqlConnection
      .query_execute(query.receipt, params)
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






async function image_path_pdfinsert(filepath,email_id) {
  console.log("in dao",filepath,email_id)
 return new Promise( async function (resolve,reject){
  var params=[filepath,email_id]
   console.log(params,"in line 12")
//====================================================Insert pdf file path into Appeal Table====================================================//   
  mysqlConnection
  .insert_query(query.appealpdfinsert,params)
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
 })
}
async function image_path_appeal(filepath,email_id) {
  console.log("in dao",filepath,email_id)
 return new Promise( async function (resolve,reject){
  var params=[filepath,email_id]
   console.log(params,"in line 12")
//====================================================Insert pdf file path into Buildings Table====================================================//   
  mysqlConnection
  .query_execute(query.appealpdf,params)
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
 })
}
async function image_path_appealcheck(id) {
  //console.log("in dao",filepath,id)
 return new Promise( async function (resolve,reject){
  //var params=[id]
 //  console.log(params,"in line 12")
//====================================================Insert pdf file path into Buildings Table====================================================//   
  mysqlConnection
  .query_execute(query.appealpdfcheck,id)
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
 })
}

module.exports = {
  image_path: image_path,
  receipt_path: receipt_path,
  image_path_appeal:image_path_appeal,
  image_path_pdfinsert:image_path_pdfinsert,
  image_path_appealcheck:image_path_appealcheck
};
//====================================================Code End====================================================//

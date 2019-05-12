var image_path = require("../daos/image_pathDao.js");
var log4js = require("log4js");
const checktoken = require("../utils/checkToken");
var receipt_path = require("../daos/image_pathDao.js");

module.exports = {
  image_upload: image_upload,
  receipt_upload: receipt_upload,
  image_upload_Appeal:image_upload_Appeal
};

async function image_upload(filepath, id, token) {
  return new Promise(async (resolve, reject) => {
    //===============================================Set the Image path for storing Image=================================//
    console.log("in core", filepath, id);
    var responseObj = {};
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    }
    await image_path
      .image_path(filepath, id)
      .then(data => {
        responseObj.data = data;
        responseObj.errors = [];
        responseObj.meta = {};

        return resolve(data);
      })
      .catch(error => {
        responseObj.data = [];
        responseObj.errors = [error];
        responseObj.meta = {};
      });
  });
}

async function receipt_upload(filepath, order_id, token) {
  return new Promise(async (resolve, reject) => {
    //===============================================Set the Image path for storing Image=================================//
    console.log("in core", filepath, order_id);
    var responseObj = {};
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    }
    var result = await receipt_path.receipt_path(filepath, order_id);
    console.log(result);
    if (result.message.data.affectedRows == 1) {
      return resolve({ status: 200, message: "Receipt successfully Uploaded" });
    } else {
      return resolve({ status: 400, message: "Receipt not uploaded" });
    }
  });
}
async function image_upload_Appeal(filepath, email_id) {
  return new Promise(async (resolve, reject) => {
    //===============================================Set the Image path for storing Image=================================//
    console.log("in core", filepath, email_id);
    var responseObj = {};
    var res2,res3=null;
    // var verifytoken = await checktoken.checkToken(token);
    // if (verifytoken.status == 405) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // }
    // var res1 = await image_path
    // .image_path_appealcheck(filepath, email_id);
    // console.log(res1.message.data[0],"res1");
//     if(!res1.message.data[0]){
//        res2 = await image_path.
//       image_path_pdfinsert(filepath, email_id);
//       console.log(res2,"res2");
//     }
//  else
 {
  res3 = await image_path
  .image_path_appeal(filepath, email_id);
  console.log(res3,"res3");
 }

//  if(!res3 && res2.status==200){
//   return resolve({
//     result:"appeal done"
//   })
// }
// else 
if(!res2 && res3.status==200){
  return resolve({
    result:"appeal done"
  })
}
 else{
  return reject({
    result:"internal server error!"
  })
   
 }
      
  });
}
//============================================================Code End===================================================//

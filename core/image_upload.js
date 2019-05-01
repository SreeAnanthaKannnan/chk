var image_path = require("../daos/image_pathDao.js");
var log4js = require("log4js");
const checktoken = require("../utils/checkToken");
var receipt_path = require("../daos/image_pathDao.js");

module.exports = {
  image_upload: image_upload,
  receipt_upload: receipt_upload
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
    await receipt_path
      .receipt_path(filepath, order_id)
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
//============================================================Code End===================================================//

var image_path = require('../daos/image_pathDao.js');
var log4js = require('log4js');
module.exports={
   image_upload:image_upload
}
async function image_upload(filepath,id) {

  return new Promise(async (resolve, reject) => {
    console.log("in core",filepath,id)
   var responseObj = {};

      await image_path.image_path(filepath,id).then((data) => {
        
          responseObj.data = data;
          responseObj.errors = [];
          responseObj.meta = {};

          return resolve(data);
      }).catch((error) => {
          responseObj.data = [];
          responseObj.errors = [error];
          responseObj.meta = {};
      });

  })
}
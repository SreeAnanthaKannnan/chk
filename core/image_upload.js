var image_path = require('../daos/image_pathDao.js');
var log4js = require('log4js');
module.exports={
    image_upload:image_upload
}
function image_upload(filepath,id) {
   
   return new Promise(async (resolve, reject) => {
   
    var responseObj = {};

       var user = image_path.image_path(filepath,id).then((data) => {
           console.log(user, "user")
           responseObj.data = data;
           responseObj.errors = [];
           responseObj.meta = {};

           resolve(responseObj);
       }).catch((error) => {
           responseObj.data = [];
           responseObj.errors = [error];
           responseObj.meta = {};
       });
    
   })
}
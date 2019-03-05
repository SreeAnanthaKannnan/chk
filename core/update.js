var updatedao = require('../daos/updatedao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
    update:update
}
function update(installation) {
    logger.fatal(installation,"installation")
   return new Promise(async (resolve, reject) => {
       var responseObj = {};

       var user = updatedao.updatedao(installation).then((data) => {
           logger.fatal(user, "user")
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

var consent = require('../daos/consentformDao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
    consentform:consentform
}
function consentform(consentformobject) {
    logger.fatal(consentformobject,"consentformobject")
   return new Promise(async (resolve, reject) => {
       var responseObj = {};

       var user = consent.consent(consentformobject).then((data) => {
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

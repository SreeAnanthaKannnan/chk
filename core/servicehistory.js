var asser = require('../daos/servicehistory');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
    bookservice:bookservice
}
function bookservice(email_id){
    return new Promise(async (resolve, reject) => {
//Fetching the Data from Dao by passing the email of the User
    var result = await asser.historyget(email_id)
    logger.fatal("result in core",result)
    if(result){
        resolve({
            status:200,
            result:result
        })
    }
    reject({
        message:"no requests available"
    })
    
    })

}
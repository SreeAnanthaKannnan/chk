var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var assessment = require('../daos/assessmentDao.js');
let insertquery = require('../daos/assessmentDao');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
var bcSdk = require('../fabric_SDK/invoke')
    return new Promise( async (resolve, reject)=>{
        exports.assessment =(id,status) =>{
            return new Promise(async(resolve, reject) => {
            let data =[status,id]
            logger.fatal(id,"query")
            logger.fatal(data,"assessment")
            let query= await insertquery.assessment_insert(data)
               logger.fatal(query !=0,"data updated in Mysql ")
               var data1={
                   "userId":id,
            "transactionstring":status       
        }
        logger.fatal(data1,"This data is stored in Blockchain")
        bcSdk.savetransaction({ TransactionDetails: data1})
return  resolve({
                status: 200,
                message:"Schedule details saved",
                
                
            })
        })
                   };
                })
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
            
            //  let schedule_time = scheduleobject.schedule_time;
            // let requestdate = scheduleobject.requestdate;
        //     let today = new Date();
        //    let schedule_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
            let data ={id,status}

            console.log(id,"query")
            console.log(data,"assessment")
            let query= await insertquery.assessment_insert(data)
               console.log(query !=0,"data inserted")
               var data1={
                   "userId":id,
            "transactionstring":status       
        }
        console.log(data1,"data1")
        bcSdk.savetransaction({ TransactionDetails: data1})

            
        
             
               return  resolve({
                status: 200,
                message:"Schedule details saved",
                
                
            })
        })
                   };
                })
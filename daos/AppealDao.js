const con = require('../mysql_connection/dbConfig');

var log4js = require('log4js');

const logger = log4js.getLogger('Aman_project');

function Appeal_insert(params) {
    return new Promise( function (resolve,reject){
        params =[params]
        sql= "INSERT INTO Appeal1 (service,Description) VALUES ? ";
       con.query(sql,[params] ,function(err,result){
        if(err) { logger.fatal("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                
            return resolve({ result});
            }
            }); 
    })
}

function Appeal_insert_salama(params) {
    return new Promise( async function (resolve,reject){
        // console.log("hiiiii",params)
        params =[params]
        sql= "INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date) VALUES ? ";
      await con.query(sql,  [params] ,async function(err,result){
        if(err) { 
            //  console.log(result,"achieved")
            console.log("something",err)
            return resolve({ status: 400, err: err })
    }
    else{
        console.log(result)
        return resolve({ status: 200, message: result});
        }
        
    }); 
})
}

module.exports={
    Appeal_insert : Appeal_insert
}
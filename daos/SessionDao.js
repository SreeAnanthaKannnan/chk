const con = require('../mysql_connection/dbConfig');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");


function Session_insert(params) {

    return new Promise( function (resolve,reject){
        logger.fatal("hiiiii",params)
        params =[params]
        sql= "INSERT INTO Session (user_ID,token,session_created_at) VALUES ? ";
       con.query(sql,  [params] ,function(err,result){
        if(err) { logger.fatal("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                //  logger.fatal(result,"achieved")
            return resolve({ result});
            }
            
        }); 
    })
}
async function Session_select(params){
    return  new Promise( async function (resolve,reject){

     logger.fatal("achie",params)
     var res1= await mysqlConnection
        .query_execute(query.session,[params])
        if(res1.data.errno){
            return reject("something went wrong")
        }
      
        else{
        return resolve (res1.data);
        }
        
    });
//})

}
async function Session_update(params){
    return  new Promise( function (resolve,reject){

    // logger.fatal("achie")
    con.query("SELECT * FROM Session where token ='" + params + "'", (err, result) => {
        if(err) { return resolve (err)}
      
        else{
        return resolve (result);
        }
        
    });
})

}


module.exports={
    Session_insert : Session_insert,
    Session_select : Session_select,
    Session_update : Session_update
}
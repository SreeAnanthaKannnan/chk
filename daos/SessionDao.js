const mysqlConnection = require("../mysql_connection/connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');


function Session_insert(params) {

    return new Promise( async function (resolve,reject){
       // params =[params]
        var res1 = await mysqlConnection.insert_query(
            query.sessioninsert, params
        );
    
    /*========if the affectedRows ==1 means it is inserted into the db==========*/
    if (res1.data.affectedRows == 1) {
        return resolve({
            result: res1
        });
    }
    /*=============db error===================*/
    else {
        return resolve({
            err: "Something Went Wrong"
        });
    }
});
}
/*========================Session select ====================================8*/
async function Session_select(params){
    return  new Promise( async function (resolve,reject){

     console.log("achie",params)
     var res1= await mysqlConnection
        .query_execute(query.session,[params])
        if(res1.data.errno){
            return reject("something went wrong")
        }
      
        else{
            console.log("res1 in line 41 ",res1)
        return resolve (res1.data);
        }
        
    });

}
/*================Session update============================*/
async function Session_update(params){
    return  new Promise(async function (resolve,reject){

    // logger.fatal("achie")
    var res1= await mysqlConnection
        .query_execute(query.sessiondelete,[params])
        if(res1.data.errno){
            return reject("something went wrong")
        }
      
        else{
        return resolve (res1.data);
        }
        
    });


}


module.exports={
    Session_insert : Session_insert,
    Session_select : Session_select,
    Session_update : Session_update
}
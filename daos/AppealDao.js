
var log4js = require('log4js');

const logger = log4js.getLogger('Aman_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");



function Appeal_insert(param) {
    return new Promise( async function (resolve,reject){
        // console.log("hiiiii",params)
        let res1=  await mysqlConnection
        .insert_query(query.Appeal, param)
      console.log(res1,"dbresult")
      if(res1.data.errno){
          return reject("something went wrong")
      }
      else{
        return resolve({ status: 200, result: res1.data});

      }
        
     
})
}

module.exports={
    Appeal_insert : Appeal_insert
}
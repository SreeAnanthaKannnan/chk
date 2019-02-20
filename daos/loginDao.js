
var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

function login(loginobject) {

  return new Promise( function (resolve,reject){
      // console.log("hiiiii",params)
     var email_id=loginobject.email;
     console.log("in dao",email_id);
      //var password=loginobject.password;
      //var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
    // var sql1="SELECT * FROM Residents UNION SELECT * FROM admin where email_id ='" + email_id + "'";
    var sql="SELECT email_id,password,user_type FROM Residents where email_id ='"+ email_id+"' UNION SELECT email_id,password,user_type FROM admin where email_id ='"+ email_id+"'";
 
    con.query(sql,function(err,result){
      if(err) { logger.fatal("something",err)
          return reject({ "status": 400, "body": 'Cannot insert the data' })}
          else{
                console.log(result,"achieved")
          return resolve({ result});
          }
          
      }); 
  })
}
// function loginadmin(loginobject) {

//     return new Promise( function (resolve,reject){
//         // console.log("hiiiii",params)
//        var email_id=loginobject.email;
//        console.log("in dao",email_id);
//         //var password=loginobject.password;
//         var sql = "SELECT  * FROM admin where email_id ='" + email_id + "'";
//       // var sql1="SELECT * FROM Residents UNION SELECT * FROM admin where email_id ='" + email_id + "'";
//        con.query(sql,function(err,result){
//         if(err) { logger.fatal("something",err)
//             return reject({ "status": 400, "body": 'Cannot insert the data' })}
//             else{
//                   console.log(result,"achieved")
//             return resolve({ result});
//             }
            
//         }); 
//     })
//   }
module.exports={
    login:login,
   
}
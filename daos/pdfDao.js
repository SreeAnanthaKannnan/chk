var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');


function pdf_insert(path,email) {

    return new Promise( function (resolve,reject){
       
        var owner_id=email
        console.log(owner_id,"email id in pdfDao file")
        console.log(path,"path")
//========================================Using Buildings id get for corresponding pdf information===========================================//     
        var sql = "SELECT * FROM Buildings where email_id ='" + owner_id + "'";
    
        con.query(sql,function(err,result){
         if(err){
             throw err;
             
         } 
            console.log(!result[0].path)
             if(result[0].path==null){
                 console.log("line 25")
                   var sql= "UPDATE Buildings SET path ='"+path+"' where email_id='"+owner_id+"'";
       con.query(sql,function(err,result)
       {
        if(err) { console.log("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                //  console.log(result,"achieved")
            return resolve({ result});

            }
        }); 
        console.log(result,"in first function")

    }
   else if(result[0].path1==null) {
       console.log("line in 41")
 //=========================================================Update pdf information for Assessment Building details using condition=================================================================//    
    var sql= "UPDATE Buildings SET path1 ='"+path+"' where email_id='"+owner_id+"'";
    con.query(sql, result[0].path1 ,function(err,result){
     if(err) { console.log("something",err)
         return reject({ "status": 400, "body": 'Cannot insert the data' })}
         else{
             //  console.log(result,"achieved")
         return resolve({ result});
         }
     
     }); 

   }
 //=========================================================Update pdf information for Assessment Building details using condition=================================================================//    

   else if(result[0].path2==null) {
    console.log("line in 55")
    var sql= "UPDATE Buildings SET path2 ='"+path+"' where email_id='"+owner_id+"'";
    con.query(sql,result[0].path2 ,function(err,result){
     if(err) { console.log("something",err)
         return reject({ "status": 400, "body": 'Cannot insert the data' })}
         else{
             //  console.log(result,"achieved")
         return resolve({ result});
         }
     
     }); 

   }
   else{
       console.log("in 69");
       return resolve( 0 );
   }
         //}
})
    })
}
module.exports={
    pdf_insert : pdf_insert
}
//=====================================================================Code End================================================================//
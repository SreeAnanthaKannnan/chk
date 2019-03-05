var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');


function pdf_insert(path,email) {

    return new Promise( function (resolve,reject){
        // logger.fatal("hiiiii",params)
        // logger.fatal(params,"pdfewrere")
        var owner_id=email
        logger.fatal(owner_id,"djfjdj")
        logger.fatal(path,"path")
        var sql = "SELECT * FROM Buildings where email_id ='" + owner_id + "'";
    
        con.query(sql,function(err,result){
         if(err){
             throw err;
             
         } //{ logger.fatal("something",err)
            //  return reject({ "status": 400, "body": 'Cannot insert the data' })}
            //  else{
            //        logger.fatal(result,"achieved")
            //  return resolve({ result});
            logger.fatal(!result[0].path)
             if(result[0].path=="null"){
                 logger.fatal("line 25")
                   var sql= "UPDATE Buildings SET path ='"+path+"' where email_id='"+owner_id+"'";
       con.query(sql,function(err,result)
       {
        if(err) { logger.fatal("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                //  logger.fatal(result,"achieved")
            return resolve({ result});

            }
        }); 
        logger.fatal(result,"pbppb")

    }
   else if(result[0].path1==null) {
       logger.fatal("line in 41")
    var sql= "UPDATE Buildings SET path1 ='"+path+"' where email_id='"+owner_id+"'";
    con.query(sql, result[0].path1 ,function(err,result){
     if(err) { logger.fatal("something",err)
         return reject({ "status": 400, "body": 'Cannot insert the data' })}
         else{
             //  logger.fatal(result,"achieved")
         return resolve({ result});
         }
     
     }); 

   }
   else if(result[0].path2==null) {
    logger.fatal("line in 55")
    var sql= "UPDATE Buildings SET path2 ='"+path+"' where email_id='"+owner_id+"'";
    con.query(sql,result[0].path2 ,function(err,result){
     if(err) { logger.fatal("something",err)
         return reject({ "status": 400, "body": 'Cannot insert the data' })}
         else{
             //  logger.fatal(result,"achieved")
         return resolve({ result});
         }
     
     }); 

   }
   else{
       logger.fatal("in 69");
       return resolve( 0 );
   }
         //}
})
    })
}
module.exports={
    pdf_insert : pdf_insert
}
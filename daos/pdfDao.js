var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");



//=================================================================
function pdf_insert(path,email,checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,checked10) {

    return new Promise( function (resolve,reject){
       console.log("checked1",checked1)
        var owner_id=email
       var Flag=0;
        console.log(owner_id,"djfjdj")
        console.log(path,"path")
        var sql = "SELECT * FROM Buildings where email_id ='" + owner_id + "'";
    
        con.query(sql,function(err,result){
         if(err){
             throw err;
             
         } 
    

if(result[0].P220V ==null && result[0].FASA==null && result[0].FARS==null && result[0].FAFS==null && result[0].TAMS==null && result[0].FPPS==null && result[0].FPFS==null && result[0].SIM==null && result[0].TLA==null && result[0].FACR==null && result[0].Assessment1==null){
         var sql= "UPDATE Buildings SET P220V ='"+checked1+"', FASA='"+checked2+"', FARS='"+checked3+"',FAFS='"+checked4+"',TAMS='"+checked5+"', FPPS='"+checked6+"', FPFS='"+checked7+"',SIM='"+checked8+"',TLA='"+checked9+"', FACR='"+checked10+"',Assessment1='yes',Flag='1' where email_id='"+owner_id+"'";
         con.query(sql,function(err,result)
         {
          if(err) { console.log("something",err)
              return reject({ "status": 400, "body": 'Cannot insert the data' })}
              else{
              return resolve({ result});
  
              }
          }); 
          console.log(result,"kllklkl")
  
        }
        // else if(result[0].A2P220V ==null && result[0].A2FASA==null && result[0].A2FARS==null && result[0].A2FAFS==null && result[0].A2TAMS==null && result[0].A2FPPS==null && result[0].A2FPFS==null && result[0].A2SIM==null && result[0].A2TLA==null && result[0].A2FACR==null && result[0].Assessment2==null){
        else{    
        var sql= "UPDATE Buildings SET P220V ='"+checked1+"', FASA='"+checked2+"', FARS='"+checked3+"',FAFS='"+checked4+"',TAMS='"+checked5+"', FPPS='"+checked6+"', FPFS='"+checked7+"',SIM='"+checked8+"',TLA='"+checked9+"', FACR='"+checked10+"',Assessment2='yes',Flag='2' where email_id='"+owner_id+"'";
           // var sql= "UPDATE Buildings SET A2P220V ='"+checked1+"', A2FASA='"+checked2+"', A2FARS='"+checked3+"',A2FAFS='"+checked4+"',A2TAMS='"+checked5+"', A2FPPS='"+checked6+"', A2FPFS='"+checked7+"',A2SIM='"+checked8+"',A2TLA='"+checked9+"', A2FACR='"+checked10+"',Assessment2='yes',Flag='2' where email_id='"+owner_id+"'";
            con.query(sql,function(err,result)
            {
             if(err) { console.log("something",err)
                 return reject({ "status": 400, "body": 'Cannot insert the data' })}
                 else{
                 return resolve({ result});
     
                 }
             }); 
             console.log(result,"55555555555")
     
           }
        //    else if(result[0].A3P220V ==null && result[0].A3FASA==null && result[0].A3FARS==null && result[0].A3FAFS==null && result[0].A3TAMS==null && result[0].A3FPPS==null && result[0].A3FPFS==null && result[0].A3SIM==null && result[0].A3TLA==null && result[0].A3FACR==null && result[0].Assessment3==null){
            // var sql= "UPDATE Buildings SET A3P220V ='"+checked1+"', A3FASA='"+checked2+"', A3FARS='"+checked3+"',A3FAFS='"+checked4+"',A3TAMS='"+checked5+"', A3FPPS='"+checked6+"', A3FPFS='"+checked7+"',A3SIM='"+checked8+"',A3TLA='"+checked9+"', A3FACR='"+checked10+"',Assessment3='yes',Flag='3' where email_id='"+owner_id+"'";
            var sql= "UPDATE Buildings SET P220V ='"+checked1+"', FASA='"+checked2+"', FARS='"+checked3+"',FAFS='"+checked4+"',TAMS='"+checked5+"', FPPS='"+checked6+"', FPFS='"+checked7+"',SIM='"+checked8+"',TLA='"+checked9+"', FACR='"+checked10+"',Assessment3='yes',Flag='3' where email_id='"+owner_id+"'";
            con.query(sql,function(err,result)
            {
             if(err) { console.log("something",err)
                 return reject({ "status": 400, "body": 'Cannot insert the data' })}
                 else{
                 return resolve({ result});
     
                 }
             }); 
             console.log(result,"rttuyiy")
     
        //    }
        //})
            console.log(!result[0].path)
             if(result[0].path==null){
                 console.log("line 25")
                   var sql= "UPDATE Buildings SET path ='"+path+"' where email_id='"+owner_id+"'";
       con.query(sql,function(err,result)
       {
        if(err) { console.log("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
            return resolve({ result});

            }
        }); 
        console.log(result,"pbppb")

    }
   else if(result[0].path1==null) {
       console.log("line in 41")
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
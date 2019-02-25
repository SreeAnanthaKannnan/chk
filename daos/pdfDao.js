const con = require('../Mysql_config/DBConfig');


function pdf_insert(path,email) {

    return new Promise( function (resolve,reject){
        // console.log("hiiiii",params)
        // console.log(params,"pdfewrere")
        var owner_id=email
        console.log(owner_id,"djfjdj")
        console.log(path,"path")
        var sql = "SELECT * FROM Buildings where owner_id ='" + owner_id + "'";
    
        con.query(sql,function(err,result){
         if(err){
             throw err;
             
         } //{ console.log("something",err)
            //  return reject({ "status": 400, "body": 'Cannot insert the data' })}
            //  else{
            //        console.log(result,"achieved")
            //  return resolve({ result});
            console.log(!result[0].path)
             if(result[0].path=="null"){
                 console.log("line 25")
                   var sql= "UPDATE Buildings SET path ='"+path+"' where owner_id='"+owner_id+"'";
       con.query(sql,function(err,result)
       {
        if(err) { console.log("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                //  console.log(result,"achieved")
            return resolve({ result});

            }
        }); 
        console.log(result,"pbppb")

    }
   else if(result[0].path1==null) {
       console.log("line in 41")
    var sql= "UPDATE Buildings SET path1 ='"+path+"' where owner_id='"+owner_id+"'";
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
    var sql= "UPDATE Buildings SET path2 ='"+path+"' where owner_id='"+owner_id+"'";
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
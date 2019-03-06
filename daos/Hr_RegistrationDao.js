const con = require('../mysql_connection/dbConfig');
const log4js = require('log4js')
const logger = log4js.getLogger('Salama_project');
// const Promise = require('bluebird')



 async function Hr_insert(params) {

    return  new Promise( function (resolve,reject){
         console.log("hiiiii",params)
         params =[params]
        sql= "INSERT INTO Hr_Registration (CompanyName,Company_Email,Address1,Address2,Address3,City,PhoneNumber,Contact_Number,Contact_Name,Contact_Mobile,Password,otp,reg_date) VALUES ? ";
       con.query(sql,  [params] ,function(err,result){
        if(err) { 
            logger.fatal(err)
            console.log(err)
             return resolve(err);
        
            }
            return resolve(result);
        }); 

    })



   
}
async function Hr_select(params){
        return  new Promise( function (resolve,reject){

        // console.log("achie")
        con.query("SELECT * FROM Hr_Registration where Company_Email ='" + params + "'", (err, result) => {
            if(err) { return resolve (err)}
          
            else{
            return resolve (result);
            }
            
        });
    })
    
}
async function Hr_email_otp_verification(params){
    return  new Promise( function (resolve,reject){

    // console.log("achie")
    con.query("SELECT * FROM Hr_Registration where otp ='" + params + "'", (err, result) => {
        if(err) { return resolve (err)}
      
        else{
        return resolve (result);
        }
        
    });
})
}
function email_otp_update(params1,params2) {
    console.log(params1,"params1")
    console.log(params2,"params2")


    return new Promise( function (resolve,reject){
        var verify_email = "Y"
        // var sql ="UPDATE Residents SET verify_email = '" + verify_email + "' WHERE email_id = '" + params + "'";
        var sql ="UPDATE Hr_Registration SET otp = '" + params1 + "' WHERE Company_Email = '" + params2 + "'";
        con.query(sql,function(err,result){
            if(err) { console.log("something",err)
                return reject({ "status": 400, "body": 'Cannot update the data' })}
                // callback(false, results);
                else{
                    //  console.log(result,"achieved")
                return resolve({ result});
                }
                
            });
         
    })
}

function password_update(params1,params2) {
    console.log(params1,"params1")
    console.log(params2,"params2")


    return new Promise( function (resolve,reject){
        var sql ="UPDATE Hr_Registration SET Password = '" + params1 + "' WHERE otp = '" + params2 + "'";
        con.query(sql,function(err,result){
            if(err) { console.log("something",err)
                return reject({ "status": 400, "body": 'Cannot update the data' })}
                // callback(false, results);
                else{
                    //  console.log(result,"achieved")
                return resolve({ result});
                }
                
            });
         
    })
}



module.exports={
    Hr_insert : Hr_insert,
    Hr_select : Hr_select,
    Hr_email_otp_verification : Hr_email_otp_verification,
    email_otp_update : email_otp_update,
    password_update : password_update
}
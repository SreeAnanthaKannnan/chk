const  TrainerDao = require ('../daos/TrainerDao')
const util = require('../utils/otp_generation')
const emailOTP = require('../utils/email_otp_generation')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


exports.trainer_forget_password = (request) => new Promise(async(resolve, reject) => {
     console.log(request,"request")
    let Email_ID= request.email_id;
    console.log(Email_ID)
    let confirmpassword = request.confirmpassword;
    let Password = request.password;
    if(!Email_ID || !Password || !confirmpassword)
    {
        // var messagevalue = await  message.getmessage("en","E10")
        // console.log(messagevalue,"last")
    
    
        return  resolve({
          statuscode: "E10",
          status:200,
          message:"Please fill all the fields",
          
          
      })
    }
    else{
        
        var query= await TrainerDao.Trainer_information(Email_ID)
        console.log(query,"forgotquery")
              if(query.length == 0){
                    // var messagevalue = await  message.getmessage("en","E11")
                    // console.log(messagevalue,"last")
                
                
                    return  resolve({
                      statuscode: "E11",
                      status:400,
                      message:"Invalid Email_id",
                      
                      
                  })
                  }
                  else{
                    if(Password !=confirmpassword){
                        // var messagevalue = await  message.getmessage("en","E12")
                        // console.log(messagevalue,"last")
                    
                    
                        return  resolve({
                          statuscode: "E12",
                          status:400,
                          message:"Password Doesn't Match",
                          
                          
                      })

                    }
                    else{  
                      
                                                
                               if(cryptr.decrypt(query[0].Password) == Password ){
             
                                // var messagevalue = await  message.getmessage("en","E13")
                                // console.log(messagevalue,"last")
                            
                            
                                return  resolve({
                                  statuscode: "E13",
                                  status:400,
                                  message:"Password Shouldn't be Previously Used One",
                                  
                                  
                              })
                           }
                           else{
                            let otp = await util.otp_generation()
                            console.log(otp,"testing") 
        
                            let emailotp = await emailOTP.email_otp(otp,Email_ID)                  

            var update_query= await TrainerDao.email_otp_update(otp,Email_ID)

            // var messagevalue = await  message.getmessage("en","E03")
            // console.log(messagevalue,"last")
        
        
            return  resolve({
              statuscode: "E03",
              status:200,
              message:"Please Check Your Email for One Time Password",
              
              
          })
         
          }
          }
      }
      
         
    }
});
                        
                    
                
                





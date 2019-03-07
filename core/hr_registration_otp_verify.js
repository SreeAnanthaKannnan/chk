
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const  hr_registrationDao = require ('../daos/Hr_RegistrationDao')



exports.hr_registration_otp_verify = (request) => new Promise(async(resolve, reject) => {

    var otp = request.otp;
    console.log("otp------>",otp)
    // var Password = cryptr.encrypt(request.password)
    var query= await hr_registrationDao.Hr_email_otp_verification(otp)
    console.log(query.length,"querylength")
    if (query.length > 0) {
        if (query[0].otp == otp) {
            console.log(otp);
            // results[0].verify_email = "Y"
            // console.log(results[0].uid);
            // var query= await hr_registrationDao.password_update(Password,otp)
            // var messagevalue = await  message.getmessage("en","E14")
            // console.log(messagevalue,"last")
        
        
            return  resolve({
              statuscode: "E14",
              status:200,
              message:"Registration is successful",
              
              
          })
        }
    }
        

          else {
            // var messagevalue = await  message.getmessage("en","E15")
            // console.log(messagevalue,"last")
        
        
            return  resolve({
              statuscode: "E15",
              status:400,
              message:"Invalid Otp",
              
              
          })
        }
        //} 
     
    








})
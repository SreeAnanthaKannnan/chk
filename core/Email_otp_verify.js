const  hr_registrationDao = require ('../daos/Hr_RegistrationDao')
const email_otp_verification = require('../utils/email_otp_verification')


exports.email_otp_verify = (request) => new Promise(async(resolve, reject) => {
    var Entered_otp = request.otp;
    let Db,email_service,CompanyName,Company_Email,Contact_Name;
    console.log(Entered_otp)
    var result = await hr_registrationDao.Hr_email_otp_verification(Entered_otp)
    console.log(result,"select query")
    if (result.length != 0) {
        console.log("hi");
        Db = result[0]
        console.log(Db,"Db")
       Db_otp = Db.otp;
          if (Db_otp == Entered_otp) {
              
             Company_Email = Db.Company_Email;
             Contact_Name  = Db.Contact_Name;
             CompanyName = Db.CompanyName
             email_service = await email_otp_verification.email_otp_verify(Company_Email,Contact_Name,CompanyName)
       
                       
               return  resolve({
                status: 200,
                message:"Registration Successfull",
                
                
            })
    }} else {
        var messagevalue = await  message.getmessage("en","E05")
              console.log(messagevalue,"last")
          
          
              return  resolve({
                status: 200,
                message:"Invalid otp",
              })
    }
    
    
    
    
          
        
    
    
    
    
    
    })
    



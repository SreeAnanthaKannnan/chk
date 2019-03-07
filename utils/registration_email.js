
const nodemailer = require('nodemailer')

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
async function email_otp(param1,param2) {
  console.log(param2,"params2")
   
     


         var remoteHost = "127.0.0.1";
      
        var encodedMail = cryptr.encrypt(param2);
        console.log("code",encodedMail);
      //var 	emailtosend = email;
        var transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: "sanedservices2019@gmail.com",
            pass: "Sanedwebservices1!"
          }
        });
      
        var link = "http://" + remoteHost + "/salama/user/verify?mail=" + encodedMail;       
      var mailOptions = {
        transport: transporter,
        from: "Salama Services" + "<sanedservices2019@gmail.com>",
        to: param2,
        subject: 'Email_Account_Verification',
      
        html: "Email confirmation from Salama services,<br> Your one time password is.<br> " + param1 + "<br>" +
        "تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your One time password is. <br>" + param1
    
    
      };
      transporter.sendMail(mailOptions, (error, info) => {
        console.log(error)
        
        if (error) {
             //return resolve({status: 409, message: 'Some thing went wrong'});
             return error;
        }
      })
    //})
}

module.exports ={
  email_otp : email_otp
}
     
        

     
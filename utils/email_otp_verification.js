const nodemailer = require('nodemailer')

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
async function email_otp_verify(Company_Email,Contact_Name,CompanyName) {
   
     


         var remoteHost = "127.0.0.1";
      
        var encodedMail = cryptr.encrypt(Company_Email);
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
        to: Company_Email,
        subject: 'Email_Account_Verification',
      
        html: "Dear "+ Contact_Name +"<br>Thank you for registering your company," + CompanyName + "  with SANED for training.  SANED will be rolling out new services for employees."+"<br><br>" + "We will contact you for further information.<br><br><br>"+"Best Regards,<br>"+"SANED Team."

    
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
  email_otp_verify : email_otp_verify
}

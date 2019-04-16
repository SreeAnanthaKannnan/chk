
const nodemailer = require('nodemailer');
function emailotp(email,otp){
   // return new Promise((resolve,reject)=>{
var encodedMail = new Buffer(email).toString('base64');
     console.log("in email.js")
     console.log(email,"email");
     console.log(otp,"otp");
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "spsaservices@gmail.com",
    pass: "spsa2019"
  }
 });
var mailOptions = {
  transport: transporter,
  from: "SPSA Services" + "<spsaservices@gmail.com>",
  to: email,
  subject: 'SPSA Service-OTP Verification',

  html:"Email confirmation from SPSA services,<br> Your one time password is.<br> " + otp + "<br>" +
    "تأكيد بالبريد الإلكتروني من خدمات SPSA ، <br> كلمة المرور لمرة واحدة هي . <br>" + otp

};
console.log("after mail options");
 transporter.sendMail(mailOptions, (error, info) => {
  
  if (error) {
    
    console.log("Mail send error: ", error);
   // return reject({ "status": 400, "body": 'Cannot fetch the data' })}
  }
  else {
    console.log(result,"achieved")
//return resolve('success');
}

})
   // })
}

module.exports={
    emailotp:emailotp
}

       

const verifydao = require('../daos/otpverifydao');
   
  module.exports={
    verifyuser:verifyuser
  } 
async function verifyuser(otpobject){
    return new Promise(async (resolve, reject) => {
    var result = await verifydao.verifydao(otpobject);
    console.log(result.result.otp,"result");
    if (result.result.otp == otpobject.otp) {
        var result = await verifydao.updateotp(otpobject); 
        return resolve({
          status: 200,
          message: "You are successfully registered",
          الرسالة: "أنت مسجل بنجاح"
        });
      } else {
        return reject({
          status: 401,
          message: "Invalid one time password",
          رسالة: "كلمة مرور غير صالحة مرة واحدة"
        });
      }
 
    });

}  
   
   
     
    
       
      
    
  
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('244272APSziUwF95bd0480c');
function otp(params) {
    return new Promise((resolve,reject)=>{

        console.log(params,"kavitha")       

        var otp = "";
        var possible = "0123456789";
       
        for (var i = 0; i<4; i++)
            otp += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log("otp" + otp);
        //logger.fatal('OTP getting generate'+ '-->' +otp);
        sendOtp.send(params, "Readypolicy", otp, function (error, data, response) {
            console.log(data,"wow");
           // console.log("response",response)
            console.log(otp,"otp")
            var otptosend = 'your otp is ' + otp;
        console.log("your otp is",otp)
        sendOtp.setOtpExpiry('5');
       
         
          if(data.type == 'success') {
         resolve(otp)}
        if(data.type == 'error') {
            reject("OTP verification failed")}


        
        

        
                

        

                    
        
    })
    });
}
    //==============================================otp resssend===============================//
   
   
    module.exports={
        otp : otp
    }
                   
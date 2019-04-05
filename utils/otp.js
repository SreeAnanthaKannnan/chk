function otpgen() {
  return new Promise((resolve, reject) => {
    var otp = "";
    var possible = "123456789";
    for (var i = 0; i < 4; i++)
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log("otp generated in util" + otp);
    if (otp) {
      console.log("in if");
      resolve({ otp });
    } else {
      reject({ result: err });
    }
  });
}
module.exports = {
  otpgen: otpgen
};

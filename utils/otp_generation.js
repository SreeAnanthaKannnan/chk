function otp_generation() {
  return new Promise((resolve, reject) => {
    var otp = "";
    var possible = "123456789";

    for (var i = 0; i < 4; i++)
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log("otp" + otp);
    return resolve(otp);
  });
}
module.exports = {
  otp_generation: otp_generation
};

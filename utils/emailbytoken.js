let jwt = require('jsonwebtoken');
let secret = 'rapidqubepvtltd';
async function checkToken(req,res) {
  return new Promise((resolve,reject)=>{
  const token = req.headers['authorization'];
  console.log(token,"token");
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("in not valid");
        return resolve({
          status: 400,
          message: 'Token not valid'
        });
      } else {
        return resolve({
          result:decoded.email_id
        })
       }
    });
  } else {
    return resolve({
      status: 403,
      message: 'Auth token is not supplied'
    });
  }
});
}
module.exports = {
  checkToken: checkToken
}
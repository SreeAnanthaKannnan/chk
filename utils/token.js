
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

function token(params) {
    return new Promise((resolve,reject)=>{
        const payload = {params};

const token = jwt.sign(payload, secret, {
    expiresIn: '1h'
  });
  console.log("token ==>",token);

  return resolve ({result:token})

  
})
}
module.exports ={
    token : token
}



let trainer_login_core = require('./Core/trainer_login')
exports.trainer_login = (trainer_login_Object) => new Promise(async(resolve, reject) => {
    console.log(trainer_login_Object,"validation")
    trainer_login_core.trainer_login(trainer_login_Object).then((result)=>{
    email_id = trainer_login_Object.email_id
    password = trainer_login_Object.password
    if(!email_id || !password)

     resolve ({
        StatusCode :E01,
        Status :401,
        Message : "Please fill all fields"
    })
})
})
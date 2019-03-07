
const con = require('../mysql_connection/dbConfig');
async function general_information(params) {
    return new Promise(function (resolve, reject) {

        console.log("Enter in to the General DAO", params)
        con.query("SELECT * FROM General_Registration where Email_ID ='" + params + "'", (err, result) => {
            if (err) { return resolve(err) }

            else {
                return resolve(result);
            }

        });
    })

}









function email_otp_update(params1, params2) {
    console.log(params1, "params1")
    console.log(params2, "params2")


    return new Promise(function (resolve, reject) {
        var verify_email = "Y"
        // var sql ="UPDATE Residents SET verify_email = '" + verify_email + "' WHERE email_id = '" + params + "'";
        var sql = "UPDATE General_Registration SET otp = '" + params1 + "' WHERE Trainer_emailid = '" + params2 + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("something", err)
                return reject({ "status": 400, "body": 'Cannot update the data' })
            }
            // callback(false, results);
            else {
                //  console.log(result,"achieved")
                return resolve({ result });
            }

        });

    })
}
async function general_email_otp_verification(params) {
    return new Promise(function (resolve, reject) {

        // console.log("achie")
        con.query("SELECT * FROM General_Registration where otp ='" + params + "'", (err, result) => {
            if (err) { return resolve(err) }

            else {
                return resolve(result);
            }

        });
    })
}
function password_update(params1, params2) {
    console.log(params1, "params1")
    console.log(params2, "params2")


    return new Promise(function (resolve, reject) {
        var sql = "UPDATE General_Registration SET Password = '" + params1 + "' WHERE otp = '" + params2 + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("something", err)
                return reject({ "status": 400, "body": 'Cannot update the data' })
            }
            // callback(false, results);
            else {
                //  console.log(result,"achieved")
                return resolve({ result });
            }

        });

    })
}



module.exports = {
    general_information: general_information,
    email_otp_update: email_otp_update,
    general_email_otp_verification: general_email_otp_verification,
    password_update: password_update

}

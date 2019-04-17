const con = require('../mysql_connection/dbConfig');
const log4js = require('log4js')
const logger = log4js.getLogger("SPSA_project");
// const Promise = require('bluebird')



async function Tr_insert(params) {

    return new Promise(function (resolve, reject) {
        console.log("Enter in to the DAO", params)
        params = [params]
        sql = "INSERT INTO Trainer_Profile (Trainer_name, Trainer_emailid, Password, Trainer_id) VALUES ? ";
        con.query(sql, [params], function (err, result) {
            if (err) {
                logger.fatal(err)
                console.log(err)
                return resolve(err);

            }
            return resolve(result);
        });

    })




}
async function Tr_select(params) {
    return new Promise(function (resolve, reject) {

        // console.log("achie")
        con.query("SELECT * FROM Trainer_Profile where Trainer_emailid ='" + params + "'", (err, result) => {
            if (err) { return resolve(err) }

            else {
                return resolve(result);
            }

        });
    })

}
async function Tr_select(params) {
    return new Promise(function (resolve, reject) {

        // console.log("achie")
        con.query("SELECT * FROM Trainer_Profile where otp ='" + params + "'", (err, result) => {
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
        var sql = "UPDATE Trainer_Profile SET otp = '" + params1 + "' WHERE Trainer_emailid = '" + params2 + "'";
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

async function Tr_email_otp_verification(params) {
    return new Promise(function (resolve, reject) {

        // console.log("achie")
        con.query("SELECT * FROM Trainer_Profile where otp ='" + params + "'", (err, result) => {
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
        var sql = "UPDATE Trainer_Profile SET Password = '" + params1 + "' WHERE otp = '" + params2 + "'";
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
    Tr_insert: Tr_insert,
    Tr_select: Tr_select,
    Tr_email_otp_verification: Tr_email_otp_verification,
    email_otp_update: email_otp_update,
    password_update: password_update
}
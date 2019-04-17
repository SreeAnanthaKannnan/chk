var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
function login(loginobject) {
    return new Promise(function (resolve, reject) {
        var email_id = loginobject.email;
        //====================================================Get Login Information form Citizens Table==================================================================//       
        mysqlConnection
            .query_execute(query.getlogindetails, email_id)
            .then(function (result, err) {

                if (err) {
                    logger.fatal("db error while checking the login in table", err)
                    return reject({
                        "status": 400,
                        "body": 'Cannot insert the data'
                    })
                } else {
                    console.log(result.data[0], "achieved")
                    return resolve({
                        result: result.data[0]
                    });
                }
            })

    })
}



// =============================================================================================================================================== 
function citizendao(email) {

    return new Promise(function (resolve, reject) {
        // console.log("hiiiii",params)
        var email_id = email;
        console.log("in dao", email_id);
        //var password=loginobject.password;
        //var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
        var sql = "SELECT citizens.mobile_number,Buildings.Buildingname,Buildings.lat,Buildings.lon,Buildings.plotno,Buildings.location,Buildings.simnumber,Buildings.NSP,Buildings.SPCN,Buildings.FAC FROM citizens inner join Buildings on Buildings.email_id = citizens.email_id And Buildings.email_id='" + email_id + "'";
        //var sql="SELECT citizens.mobile_number,Buildings.lat,Buildings.lon FROM citizens,Buildings where Buildins.email_id ='"+ email_id+"'";
        //var sql = "select * from citizens where email_id ='"+ email_id +"'";
        con.query(sql, function (err, result) {
            if (err) {
                logger.fatal("something", err)
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                console.log(result, "achieved")
                return resolve({ result });
            }

        });
    })
}
async function service(email) {

    return new Promise(async function (resolve, reject) {
        // console.log("hiiiii",params)
        var email_id = email;
        var Flag = 0;
        console.log("in dao", email_id);
        //var password=loginobject.password;
        //var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
        var sql = "SELECT citizens.mobile_number,Buildings.Buildingname,Buildings.lat,Buildings.lon,Buildings.plotno,Buildings.location,Buildings.simnumber,Buildings.NSP,Buildings.SPCN,Buildings.FAC,Buildings.P220V,Buildings.FASA,Buildings.FARS,Buildings.FAFS,Buildings.TAMS,Buildings.FPPS,Buildings.FPFS,Buildings.SIM,Buildings.TLA,Buildings.FACR,Buildings.Assessment1,Buildings.Assessment2,Buildings.Assessment3,Buildings.Flag,Schedules.FACP,Schedules.CSI,Schedules.BRAND,Schedules.status FROM citizens inner join Buildings on Buildings.email_id = citizens.email_id inner join Schedules on Schedules.email_id=Buildings.email_id And Buildings.email_id='" + email_id + "'";
        //var sql="SELECT citizens.mobile_number,Buildings.lat,Buildings.lon FROM citizens,Buildings where Buildins.email_id ='"+ email_id+"'";
        //var sql = "select * from citizens where email_id ='"+ email_id +"'";
        con.query(sql, function (err, result) {
            if (err) {
                logger.fatal("something", err)
                return reject({ "status": 400, "body": 'Cannot insert the data' })
            }
            else {
                console.log(result, "achievedfdfdfdfdfd")
                return resolve({ result: result });

            }

        });

        console.log("eruoeuoewu")


        var sql = "SELECT Assessment1,Assessment2,Assessment3 FROM Buildings WHERE email_id='" + email_id + "'";
        //var sql="SELECT citizens.mobile_number,Buildings.lat,Buildings.lon FROM citizens,Buildings where Buildins.email_id ='"+ email_id+"'";
        //var sql = "select * from citizens where email_id ='"+ email_id +"'";
        con.query(sql, function (err, result) {
            if (err) {
                throw err;

            }

            if (result[0].Assessment1 == 'yes' && result[0].Flag == '1') {
                var sql = "SELECT citizens.mobile_number,Buildings.Buildingname,Buildings.lat,Buildings.lon,Buildings.plotno,Buildings.location,Buildings.simnumber,Buildings.NSP,Buildings.SPCN,Buildings.FAC,Buildings.P220V,Buildings.FASA,Buildings.FARS,Buildings.FAFS,Buildings.TAMS,Buildings.FPPS,Buildings.FPFS,Buildings.SIM,Buildings.TLA,Buildings.FACR,Buildings.Assessment1,Buildings.Flag FROM citizens inner join Buildings on Buildings.email_id = citizens.email_id And Buildings.email_id='" + email_id + "'";
                //var sql="SELECT citizens.mobile_number,Buildings.lat,Buildings.lon FROM citizens,Buildings where Buildins.email_id ='"+ email_id+"'";
                //var sql = "select * from citizens where email_id ='"+ email_id +"'";
                con.query(sql, function (err, result) {
                    if (err) {
                        logger.fatal("something", err)
                        return reject({ "status": 400, "body": 'Cannot insert the data' })
                    }
                    else {
                        console.log(result, "assssssss")
                        return resolve({ result });
                    }

                });

            }
            else if (result[0].Assessment2 == 'yes' && result[0].Flag == '2') {
                var sql = "SELECT citizens.mobile_number,Buildings.Buildingname,Buildings.lat,Buildings.lon,Buildings.plotno,Buildings.location,Buildings.simnumber,Buildings.NSP,Buildings.SPCN,Buildings.FAC,Buildings.P220V,Buildings.FASA,Buildings.FARS,Buildings.FAFS,Buildings.TAMS,Buildings.FPPS,Buildings.FPFS,Buildings.SIM,Buildings.TLA,Buildings.FACR,Buildings.Assessment2,Buildings.Flag FROM citizens inner join Buildings on Buildings.email_id = citizens.email_id And Buildings.email_id='" + email_id + "'";
                //var sql="SELECT citizens.mobile_number,Buildings.lat,Buildings.lon FROM citizens,Buildings where Buildins.email_id ='"+ email_id+"'";
                //var sql = "select * from citizens where email_id ='"+ email_id +"'";
                con.query(sql, function (err, result) {
                    if (err) {
                        logger.fatal("something", err)
                        return reject({ "status": 400, "body": 'Cannot insert the data' })
                    }
                    else {
                        console.log(result, "achieved")
                        return resolve({ result });
                    }

                });

            }
            else if (result[0].Assessment3 == 'yes' && result[0].Flag == '3') {
                var sql = "SELECT citizens.mobile_number,Buildings.Buildingname,Buildings.lat,Buildings.lon,Buildings.plotno,Buildings.location,Buildings.simnumber,Buildings.NSP,Buildings.SPCN,Buildings.FAC,Buildings.P220V,Buildings.FASA,Buildings.FARS,Buildings.FAFS,Buildings.TAMS,Buildings.FPPS,Buildings.FPFS,Buildings.SIM,Buildings.TLA,Buildings.FACR,Buildings.Assessment3,Buildings.Flag FROM citizens inner join Buildings on Buildings.email_id = citizens.email_id And Buildings.email_id='" + email_id + "'";
                //var sql="SELECT citizens.mobile_number,Buildings.lat,Buildings.lon FROM citizens,Buildings where Buildins.email_id ='"+ email_id+"'";
                //var sql = "select * from citizens where email_id ='"+ email_id +"'";
                con.query(sql, function (err, result) {
                    if (err) {
                        logger.fatal("something", err)
                        return reject({ "status": 400, "body": 'Cannot insert the data' })
                    }
                    else {
                        console.log(result, "achieved")
                        return resolve({ result });
                    }

                });


            }


        });

    });

}

function installer_employees_list(installer_employees_details) {
    return new Promise(async function (resolve, reject) {
        var param = installer_employees_details
        console.log("DAO_reg", param)

        // -----
        var res = await mysqlConnection.insert_query(
            query.getinstalleremployeelist,
            param
        );
        console.log("response", res)
        if (res.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            });
        } else {
            console.log("result_dao===========>", res)
            return resolve({
                status: 200,
                message: res
            });
        }
    });
}


module.exports = {
    login: login,
    citizendao: citizendao,
    service: service,
    installer_employees_list: installer_employees_list
}
//====================================================Code End==================================================================//
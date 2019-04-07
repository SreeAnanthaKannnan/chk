const con = require("../mysql_connection/dbConfig");
const moment = require("moment");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger("SPSA_project");

/*============Inserting data into compmay_profile table========*/
function Company_profile_insert(param) {
    return new Promise(async function (resolve, reject) {
        console.log("param", param);
        let res1 = await mysqlConnection
            .insert_query(query.companyprofileinsert, param)
        console.log(res1, "dbresult")
        /*========IF db error exists throw the message as something went wrong====*/
        if (res1.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            return resolve({
                result: res1
            });
        }
    });

}
/*=========checking whether the compnay email is already exits or not======*/
function company_trading_license(param) {
    return new Promise(async function (resolve, reject) {
        console.log("Company_TRAde_licence_DAO", param);

        /*======selecting company profile data for the given email id======*/
        let res1 = await mysqlConnection
            .query_execute(query.companyprofileselect, [param])
        console.log(res1, "dbresult")
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"db error while inserting company details into company_Profile table")
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            console.log("<=======result", res1.data);
            return resolve({
                result: res1
            });
        }


    });
}
async function salama_order(
    params,
    params1,
    params2,

) {
    return new Promise(async function (resolve, reject) {
        console.log("params2", params2)
        var values = [
            params,
            params1,
            params2,


        ];

        var res = await mysqlConnection
            .insert_query(query.insertsalamaorder, values)
        console.log("Res========>>", res)
        if (res.data.errno) {
            //console.log("something", err);
            return reject({ status: 400, message: "something went wrong" });
        } else if (res) {
            //console.log(result);
            return resolve({ status: 200, message: res });
        } else {
            return resolve({ status: 401, message: res });
        }

    });
}

module.exports = {
    Company_profile_insert: Company_profile_insert,
    company_trading_license: company_trading_license,
    salama_order: salama_order
};
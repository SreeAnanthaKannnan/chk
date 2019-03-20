const con = require("../mysql_connection/dbConfig");
const moment = require("moment");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
/*============Inserting data into compmay_profile table========*/
function Company_profile_insert(param) {
    return new Promise(async function(resolve, reject) {
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
    return new Promise(async function(resolve, reject) {
        console.log("Company_TRAde_licence_DAO", param);

        /*======selecting company profile data for the given email id======*/
        let res1 = await mysqlConnection
            .query_execute(query.companyprofileselect, [param])
        console.log(res1, "dbresult")
        if (res1.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        } else {
            console.log("<=======result", res1.data);
            return resolve({
                result: res1
            });
        }


    });
}
module.exports = {
    Company_profile_insert: Company_profile_insert,
    company_trading_license: company_trading_license
};
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var translate = require('../utils/translate.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const langdetect = require('../utils/languagedetect');
let now = new Date();
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
module.exports = {
    verify_user: verify_user,
    insert_user: insert_user,
    owner_details_name: owner_details_name,
    hr_details_name: hr_details_name,
    add_admin: add_admin

}
//Here verify the user already exits or not, if exits through error
function verify_user(registerobject) {
    return new Promise(async function (resolve, reject) {
        var email_id = registerobject.email;
        var param = [email_id]
        mysqlConnection
            .query_execute(query.getlogindetails, param)
            .then(function (result, err) {
                if (err) {
                    logger.fatal(err, "db error to verify the user while registering")
                    return resolve({
                        status: 400,
                        err: err
                    });
                } else {
                    console.log(result, "in  dao 33");
                    return resolve({
                        status: 200,
                        result: result
                    });
                }
            });
    })
}

//=========================================================
function owner_details_name(employee_name, email_id) {
    return new Promise(async function (resolve, reject) {
        var param = [employee_name, email_id]
        console.log("DAO_reg", param)

        // -----
        var res = await mysqlConnection.query_execute(
            query.getownerdetails,
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
//===================================================================================
function hr_details_name(email_id) {
    return new Promise(async function (resolve, reject) {
        var param = [email_id]
        console.log("DAO_reg", param)

        // -----
        var res = await mysqlConnection.query_execute(
            query.gethrdetails,
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

//===================================================================================
function add_admin(select_query) {
    return new Promise(async function (resolve, reject) {
        var param = select_query
        console.log("DAO_reg", param)

        // -----
        var res = await mysqlConnection.insert_query(
            query.registeradmin,
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
                message: "Detail saved sucessfully"
            });
        }
    });
}



//if new user insert the data into DataBase
function insert_user(registerobject, otp) {
    return new Promise(async function (resolve, reject) {
        var email_id = registerobject.email;
        var firstname = registerobject.firstname;
        var lastname = registerobject.lastname;
        var company = registerobject.company;
        var nationality = registerobject.nationality.value;
        var alter_number = registerobject.phone;
        var mobile_number = registerobject.mobile;
        var address = registerobject.address;
        var po_box = registerobject.po_box;
        var language = registerobject.language;
        var emirates_id = registerobject.emirates_id;
        var newsletter = "N";
        var user_type = registerobject.user_type;
        var type_description = registerobject.typedescription;
        var firstname_ar, firstname_en, lastname_ar, lastname_en, company_ar, company_en, nationality_ar, nationality_en, address_ar, address_en;
        var value;
        var verify_email = "N";
        var verify_mobile = "N";
        var user_type = "residence";
        var countvalue = 0;
        var password = cryptr.encrypt(registerobject.password);
        var reg_date = now;
        if (nationality == undefined) {
            var nationality = "united arab emirates"
        } else {
            var nationality = registerobject.nationality.value;
        }
        //Here the Registration Details converted into both arabic and english languages and stored in Data Base
        value = await langdetect.languageDetect(firstname)
        language = value.result;
        if (firstname == "") {
            firstname_ar = firstname;
            firstname_en = firstname;
        } else {
            if (value.result == "ar") {
                var temp = await translate.translate_en(firstname)
                firstname_en = temp.result;
                firstname_ar = firstname
            } else {
                firstname_en = firstname
                var temp = await translate.translate_ar(firstname)
                firstname_ar = temp.result
            }
        }
        if (lastname == "") {
            lastname_ar = lastname;
            lastname_en = lastname;
        } else {
            if (value.result == "ar") {
                var temp = await translate.translate_en(lastname)
                lastname_en = temp.result;
                lastname_ar = lastname
            } else {
                lastname_en = lastname
                var temp = await translate.translate_ar(lastname)
                lastname_ar = temp.result
            }
        }
        if (address == "") {
            address_en = address;
            address_ar = address;
        } else {
            if (value.result == "ar") {
                var temp = await translate.translate_en(address)
                address_en = temp.result
                address_ar = address;
            } else {
                address_en = address
                var temp = await translate.translate_ar(address)
                address_ar = temp.result
            }
        }
        if (company == "") {
            company_ar = company;
            company_en = company;
        } else {
            if (value.result == "ar") {
                var temp = await translate.translate_en(company)
                company_en = temp.result
            } else {
                company_en = company
                var temp = await translate.translate_ar(company)
                company_ar = temp.result
            }
        }
        if (nationality == "") {
            nationality_ar = nationality;
            nationality_en = nationality
        } else {
            if (value.result == "ar") {
                var temp = await translate.translate_en(nationality)
                nationality_en = temp.result;
                nationality_ar = nationality
            } else {
                nationality_en = nationality
                var temp = await translate.translate_ar(nationality)
                nationality_ar = temp.result
            }
        }
        console.log(user_type, "user_type=====>")
        var params = [firstname_en, firstname_ar, lastname_en, lastname_ar, company_en, company_ar, nationality_en, nationality_ar, alter_number, address_en, address_ar, emirates_id, po_box, mobile_number, email_id, password, verify_mobile, verify_email, language, newsletter, user_type, reg_date, otp,countvalue]
        console.log("params=====>", params)
        await mysqlConnection
            .insert_query(query.resgister, params)
            .then(function (result, err) {
                if (err) {
                    logger.fatal(err, "db error while intering the data into the citizen table while registering")
                    return resolve({
                        status: 400,
                        err: err
                    });
                } else {
                    logger.fatal("query executed successfully");
                    console.log(result, "result")
                    return resolve({
                        status: 200,
                        message: result
                    });
                }
            });
    })
}
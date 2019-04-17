var pay = require("../daos/Payment_salamaDao");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken");
var bc = require("../fabcar/javascript/invoke");
module.exports = {
    payment: payment
};

async function payment(payment1, token) {
    return new Promise(async (resolve, reject) => {
        var responseObj = {};
        
        

        await pay
            .payupdate(payment1)
            .then(data => {

                console.log(data, "user");
                responseObj.data = data;
                responseObj.errors = [];
                responseObj.meta = {};

                resolve(responseObj);
            })



            .catch(error => {
                responseObj.data = [];
                responseObj.errors = [error];
                responseObj.meta = {};
            });
    })

}
//=======================================code End
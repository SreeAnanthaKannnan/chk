// var certificate_issue = require("../daos/certificate_issueDao.js");
var certificate=require("../daos/Employee_profileDao.js")
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const checktoken = require("../utils/checkToken");
var bc = require("../fabcar/javascript/invoke");
module.exports = {
    certificate_issue: certificate_issue,
    //   payment_aman: payment_aman,
    //   payment_aman_install: payment_aman_install
};

function certificate_issue(certificate_issue1,certificate_status_emp,result, token, language) {
    logger.fatal(certificate_issue1, "certificate_issue");
    console.log(certificate_status_emp,"certificate_status")
    return new Promise(async (resolve, reject) => {
        var responseObj = {};

        {

            var user = certificate
                .Employee_grid_view2(certificate_issue1,certificate_status_emp,result)
                .then(data => {
                    console.log(user, "user");
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
        }
    });

}
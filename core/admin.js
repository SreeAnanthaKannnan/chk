var asser = require("../daos/assesserview");
var log4js = require("log4js");
const logger = log4js.getLogger("SPSA_project");
const checktoken = require("../utils/checkToken");
const admindao = require("../daos/admin_Dao")
module.exports = {
    adminapproveddetails: adminapproveddetails,
    adminRejectdetails: adminRejectdetails,
    adminFreezedetails: adminFreezedetails
};
//===============Fetching the details from the Daos both building and schedule information=========================================//
function adminapproveddetails(adminApproved, token) {
    return new Promise(async (resolve, reject) => {
        // var verifytoken = await checktoken.checkToken(token);
        // console.log(verifytoken);
        // if (verifytoken.status == 405) {
        //     return resolve({
        //         status: verifytoken.status,
        //         message: verifytoken.message,
        //     });
        // } else if (verifytoken.status == 403) {
        //     return resolve({
        //         status: verifytoken.status,
        //         message: verifytoken.message
        //     });
        // } else {
        var emirates_id = adminApproved.emirates_id
        console.log("emirates_id==core==>>", emirates_id)
        const status = "Approved"

        let owner_details_details = await admindao.adminapproved(

            status,
            emirates_id
        );
        console.log("owner_details_details_core===>", owner_details_details)
        return resolve({
            status: 200,
            message: owner_details_details
        });
        // }
    });
}
//===============Code End===============================================================================================================//
function adminRejectdetails(adminReject, token) {
    return new Promise(async (resolve, reject) => {
        // var verifytoken = await checktoken.checkToken(token);
        // console.log(verifytoken);
        // if (verifytoken.status == 405) {
        //     return resolve({
        //         status: verifytoken.status,
        //         message: verifytoken.message,
        //     });
        // } else if (verifytoken.status == 403) {
        //     return resolve({
        //         status: verifytoken.status,
        //         message: verifytoken.message
        //     });
        // } else {
        var emirates_id = adminReject.emirates_id
        console.log("emirates_id==core==>>", emirates_id)
        const status = "Reject"

        let owner_details_details = await admindao.adminapproved(

            status,
            emirates_id
        );
        console.log("owner_details_details_core===>", owner_details_details)
        return resolve({
            status: 200,
            message: owner_details_details
        });
        // }
    });
}
//===============Code End===============================================================================================================//
function adminFreezedetails(adminFreeze, token) {
    return new Promise(async (resolve, reject) => {
        // var verifytoken = await checktoken.checkToken(token);
        // console.log(verifytoken);
        // if (verifytoken.status == 405) {
        //     return resolve({
        //         status: verifytoken.status,
        //         message: verifytoken.message,
        //     });
        // } else if (verifytoken.status == 403) {
        //     return resolve({
        //         status: verifytoken.status,
        //         message: verifytoken.message
        //     });
        // } else {
        var emirates_id = adminFreeze.emirates_id
        console.log("emirates_id==core==>>", emirates_id)
        const status = "Freeze"

        let owner_details_details = await admindao.adminapproved(

            status,
            emirates_id
        );
        console.log("owner_details_details_core===>", owner_details_details)
        return resolve({
            status: 200,
            message: owner_details_details
        });
        // }
    });
}
//===============Code End===============================================================================================================//
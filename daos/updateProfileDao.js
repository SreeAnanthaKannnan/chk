var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");

function updateprofile(updateProf) {
    return new Promise(async (resolve, reject) => {
        // console.log("update prof core===>",updateprof.lastname_en, updateProf.company_en, updateProf.nationality_en, updateProf.address_en,updateProf.mobile_number,updateProf.alter_number,updateProf.email_id,updateProf.emirates_id)
        var params =[updateProf.firstname_en,updateProf.lastname_en,updateProf.alter_number,updateProf.emirates_id,updateProf.mobile_number,updateProf.email_id,updateProf.nationality_en,updateProf.address_en,updateProf.company_en,updateProf.email_id]
        console.log("params dao====>",params)
        logger.fatal(updateProf, "=>updateProf");
        mysqlConnection
            .query_execute(query.updateprofile, params)
            .then(function(result, err) {
                if (err) {
                    console.log("something", err);
                    return resolve({
                        status: 400,
                        err: err
                    });
                } else {
                    console.log(result);
                    return resolve({
                        status: 200,
                        message: result
                    });
                }
            });
    })
}


module.exports = {
    updateprofile: updateprofile
   
}
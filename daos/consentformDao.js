var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
function consent(consentformobject){
    return new Promise((resolve, reject)=>{
        logger.fatal(consentformobject,"=>consentformobject");
        var consent_id= consentformobject.consent_id;
        var facp_working_condition = consentformobject.facp_working_condition
        var facp_readiness =consentformobject.facp_readiness;
        var annual_maintenance_contract =consentformobject.annual_maintenance_contract;
        var sql = "INSERT INTO Consentform(consent_id, facp_working_condition,facp_readiness,annual_maintenance_contract) VALUES ('" + consent_id + "','" + facp_working_condition + "','" +facp_readiness + "','" + annual_maintenance_contract + "')";
        con.query(sql, function (err, result) {
        if (err) throw err;
        dbFunc.connectionRelease;
        logger.fatal("DataBase ERR:",err)
        logger.fatal(result,"inserted.......")
       resolve({
            Message: "consent done",
                  })
        })
    })
}
module.exports={
    consent:consent
}
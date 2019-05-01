const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/connection");

const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger("SPSA_project");


function Building_insert(params) {
    return new Promise(async function (resolve, reject) {
        /*====================inserting Building's data into building table========*/
        var res1 = await mysqlConnection
            .insert_query(query.insertbulkbuilding, params)
        console.log(res1, "err===>")
        /*==========db error capturing================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"db error while inserting building into builiding table")

            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            // console.log(result);
            return resolve({
                status: 200,
                message: res1
            });
        }

    });
}
insertBuildingOwner = async(params) => {
    return new Promise( async (resolve,reject) => {
        console.log('params===>',params);
    
        const response = {};
        const sql = "INSERT INTO Buildings(email_id ,type,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN,address,alternumber) VALUES ?";
        const result = await mysqlConnection.insert_query(sql,params);
        console.log(result);
        response['status'] = result.status;
        return resolve({
            response : response,
        })
        
        return response;



    });
}
module.exports = {
    Building_insert: Building_insert,
    insertBuildingOwner :insertBuildingOwner 
}
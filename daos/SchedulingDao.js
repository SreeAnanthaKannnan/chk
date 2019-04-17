const mysqlConnection = require("../mysql_connection/connection");
var log4js = require('log4js');
const logger = log4js.getLogger("SPSA_project");

const query = require("../mysql_connection/queries");
/*===================Schedule function=================================*/
function Schedule(query_value) {
    return new Promise(async function(resolve, reject) {
        /*============assigning the params in to concern variables==========*/
        let classroom_id = query_value[0];
        var Emirates_ID = query_value[1];
        let start_time = query_value[2];
        let end_time = query_value[3];
        let course_id = query_value[4];
        let trainer_id = query_value[5];
        let Company_Trade_Lincense_No = query_value[6];
        let number_of_seats_selected = query_value[7];
        let scheduling_date = query_value[8];
        let scheduled_date = query_value[9];
        let payment_status = query_value[10];
        let amount = query_value[11];
        let status = query_value[12];
        console.log(Emirates_ID, "testing");
        /*================Executing insertion of the data into schedule table up based on the given emirates id=====*/
        for (i = 0; i < Emirates_ID.length; i++) {
            console.log("Emirates_ID", Emirates_ID[i]);
            console.log(Emirates_ID[i], "Emirates_ID");
            query_value = [
                classroom_id,
                Emirates_ID[i],
                start_time,
                end_time,
                course_id,
                trainer_id,
                Company_Trade_Lincense_No,
                number_of_seats_selected,
                scheduling_date,
                scheduled_date,
                payment_status,
                amount,
                status
            ];
            console.log(query_value, "query_value");
            /*====================inserting the query value into schedule table=======================*/
            var res1 = await mysqlConnection.insert_query(
                query.scheduleinsertpartialbooking, query_value
            );
            console.log(res1, "result");
        }
        /*========if the affectedRows ==1 means it is inserted into the db==========*/
        if (res1.data.affectedRows == 1) {
            return resolve({
                result: res1
            });
        }
        /*=============db error===================*/
        else {
            return resolve({
                err: "Something Went Wrong"
            });
        }
    });
}

//========================================================================================================//
function schedule_summary_value(Company_Trade_Lincense_No, language, status) {
    return new Promise(async function(resolve, reject) {

        var res1 = await mysqlConnection
            .query_execute(
                query.schedulesummary, [Company_Trade_Lincense_No, status]
            )
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            } else {
            return resolve({
                result: res1
            });
        }


    });
}
//==================================================================================================//
function Schedule_select(classroom_id, Emirates_id, Company_Trade_Lincense_No) {
    return new Promise(async function(resolve, reject) {
        let value = [];
        /*=============calculating the number of employees as Emirates_id.length===========*/
        /*================selecting all the data from schedule table for the given Emirates_ID========*/
        for (i = 0; i < Emirates_id.length; i++) {
            let Emirates_ID = Emirates_id[i];
            query_value = [Company_Trade_Lincense_No, Emirates_ID, classroom_id];
            let res1 = await mysqlConnection.query_execute(
                "select * from Schedule where Company_Trade_Lincense_No=? and National_Id =? and classroom_id=? ",
                query_value
            );
            /*==================if the response contains data then returning the response into scheduling.js=======*/
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            } else {
                return resolve({
                    result: value
                });
            }


        }

    });
}
/*======================Exporting all the functions into core===========================*/
module.exports = {
    Schedule: Schedule,
    schedule_summary_value: schedule_summary_value,
    Schedule_select: Schedule_select
};
/*=========================code Ends=====================================================*/
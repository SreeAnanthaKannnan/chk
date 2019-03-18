const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const CompanyDao = require("../daos/Company_ProfileDao");
const moment = require("moment");
const mysqlConnection = require("../mysql_connection/config_test");
const query = require("../mysql_connection/queries");


exports.company_profile = (data, token) =>
    new Promise(async (resolve, reject) => {
        let Company_Trade_License_No = data.company_trade_lincense_no;
        console.log(Company_Trade_License_No,"licenceNo")
        let Mandatory_Training_Percentage = data.Mandatory_Training_Percentage;
        let Category = data.Category;
        let Company_Email = data.company_email;
        console.log("company_Email=====>",Company_Email)
        let Number_of_employees = data.Number_of_employees;
/*=================token validation======================================*/
        console.log(token, "token");
        let query = await SessionDao.Session_select(token);
        if (query.length == 0) {
            resolve({
                status: 402,
                message: "Invalid token"
            });
        } else {
  /*====================session validation=================================*/
            console.log(query[0].session_created_at);
            let Name_ar, Name_en, query_value;
            let now = new Date();

            let Db_time = query[0].session_created_at;
            let time_difference_minutes = await session_time.Session_time_difference(
                Db_time,
                now
            );
            console.log(time_difference_minutes, "function");


            if (time_difference_minutes <= "01:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
                });
            } else {
                let query_value = [
                    Company_Trade_License_No,
                    Mandatory_Training_Percentage,
                    Category,
                    Company_Email,
                    Number_of_employees
                ];
                /*====================Checking company already exists or not============*/
            await CompanyDao.company_trading_license(Company_Email)
            .then(async function(result) {
                console.log("already exits=====>",result.result.data.length)
                        if (result.result.data.length != 0) {
                            return resolve({
                                status: 200,
                                message: "Company Profile is already exists"
                            });
                        } else {

                /*=================company values insertion into company profile table======*/
                         await CompanyDao.Company_profile_insert(query_value)
                         .then(async function(result) {
                            console.log("already exits insert=====>",result)
                                    if (result.result.data.affectedRows==1) {
                                        return resolve({
                                            status: 200,
                                            message: "Company Profile is added successfully"
                                        });
                                    }
                                    
                                })
                              
                        }
                    
                
                    
                    
                   
                })
            
            
                .catch(async function(err) {
                  return resolve({ status: 400, message: "something went wrong" });
                });
            
            }
        }
    });
    /**********************************Code Ends*********************************************/
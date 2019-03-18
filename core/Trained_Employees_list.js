const  SessionDao = require ('../daos/SessionDao')
const  Employee_profileDao = require ('../daos/Employee_profileDao')
const session_time = require('../utils/session_time_difference')
const Result = require("../daos/ResultsDao");

/* Getting the Company trade license no. from UI */
exports.Trained_Employees = (data,token,language) => new Promise(async(resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No
    let status = "pass";
    /*==========Token validation=================*/
    let query = await SessionDao.Session_select(token)
    if(query.length ==0){
        resolve({
            status:402,
            message : "Invalid token"
        })
    }
    else{
        /*==========Session validation============*/
        console.log(query[0].session_created_at)
       let now = new Date();
    
        let Db_time = query[0].session_created_at;
        let time_difference_minutes = await session_time.Session_time_difference(Db_time,now)
         if(time_difference_minutes<="01:00")
              {
                       return resolve({
                                    status : 440,
                                    message : "session expired"
                                      })
             }

             else{
              /* Fetching the trained employee's National Id from "Employee_profile" table who are all passed in the "Results" table */ 
                 let Trained_Employees = await Employee_profileDao.Trained_Employees_list(Company_Trade_Lincense_No,language,status)
var data_val=[];
            for (i = 0; i < Trained_Employees.result.length; i++) {
                var result = Trained_Employees.result[i].National_Id
                let national_id = await Result.result_national_id(result)
data_val.push(national_id)
            }
                 return resolve({
                     status :200,
                     message : Trained_Employees  
                 })  
            }
            }      
})





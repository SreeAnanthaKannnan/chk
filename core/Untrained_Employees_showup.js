const  SessionDao = require ('../daos/SessionDao')
const  Employee_profileDao = require ('../daos/Employee_profileDao')
const session_time = require('../utils/session_time_difference')
 
// Getting the Company trade license no. from UI //
exports.Untrained_Employees = (data,token,language) => new Promise(async(resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No
      /*==========token validation=================*/
    let query = await SessionDao.Session_select(token)
    console.log(query,"testinggggggggg")
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
        console.log(time_difference_minutes,"function")
             
         console.log(time_difference_minutes<="01:00","wwwwwwwwwwwwwwwwwwww")
    
        
         if(time_difference_minutes<="01:00")
              {
                       return resolve({
                                    status : 440,
                                    message : "session expired"
                                      })
             }
             else{
                 /* Fetching the untrained employee's from "Employee_profile" table who are all not passed in the "Results" table*/
                 let Untrained_Employees = await Employee_profileDao.Untrained_Employees_list(Company_Trade_Lincense_No,language)

 return resolve({
                     status :200,
                     message : Untrained_Employees
                 })
                
            }
        
            }
            
})
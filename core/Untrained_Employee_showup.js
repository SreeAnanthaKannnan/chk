const  SessionDao = require ('../DAO/SessionDao')
const  Employee_profileDao = require ('../DAO/Employee_profileDao')
const session_time = require('../Util/session_time_difference')
var base64ToImage = require('base64-to-image');
const ab2str = require('arraybuffer-to-string')
const language_detect = require('../Util/language_detect')
const translate = require('../Util/translate')
 const fs = require("fs")
 


exports.Untrained_Employees = (data,token,language) => new Promise(async(resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No
   
    // let status = data.status;
    
    // let Safety_Officer = request.safety_officer;
    console.log(token,"test")
    let query = await SessionDao.Session_select(token)
    console.log(query,"testinggggggggg")
    if(query.length ==0){
        resolve({
            status:402,
            message : "Invalid token"
        })
    }
    else{
        console.log(query[0].session_created_at)
        let Name_ar,Name_en,query_value
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
                 let Untrained_Employees = await Employee_profileDao.Untrained_Employees_list(Company_Trade_Lincense_No,language)
            let result = Untrained_Employees[0]
console.log(result,"result")


                 return resolve({
                     status :200,
                     message : Untrained_Employees
                 })
                
            }
        
            }
            
})
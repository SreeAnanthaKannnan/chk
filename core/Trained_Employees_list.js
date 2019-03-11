const  SessionDao = require ('../daos/SessionDao')
const  Employee_profileDao = require ('../daos/Employee_profileDao')
const session_time = require('../utils/session_time_difference')
var base64ToImage = require('base64-to-image');
const ab2str = require('arraybuffer-to-string')

const Result = require("../daos/ResultsDao");


const language_detect = require('../utils/language_detect')
const translate = require('../utils/translate')
 const fs = require("fs")
 


exports.Trained_Employees = (data,token,language) => new Promise(async(resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No
   
    let status = "pass";
    
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
                 let Trained_Employees = await Employee_profileDao.Trained_Employees_list(Company_Trade_Lincense_No,language,status)
            console.log("trained_emp====>",Trained_Employees)


            console.log("length",Trained_Employees.result.length)
var data_val=[];
            for (i = 0; i < Trained_Employees.result.length; i++) {
                var result = Trained_Employees.result[i].National_Id
                console.log(result,"result<====")

                let national_id = await Result.result_national_id(result)
                console.log("result_national_core====>",national_id)

data_val.push(national_id)


            }
             console.log("data==========>",data_val)   
            
                 

                 return resolve({
                     status :200,
                     message : Trained_Employees
                     
                 })
                
            }
        
            }
            
})





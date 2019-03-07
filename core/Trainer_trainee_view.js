const  SessionDao = require ('../daos/SessionDao')
const  Employee_profileDao = require ('../daos/Employee_profileDao')
const session_time = require('../utils/session_time_difference')
const  classroomDao = require ('../daos/ClassroomDao')
exports.trainer_trainee_view = (data,token) => new Promise(async(resolve, reject) => {
            let trainer_email_id = data.trainer_email_id;
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
                 await Employee_profileDao.trainee_list(trainer_email_id)
                 .then(async function(result) {
                    console.log("result", result);
                    if(result.result.length !=0){
                    return resolve({status:200, message :result});}
                })
                    .catch(async function(err) {
                        return resolve({status : 400,message :"something went wrong"});
                    });




             }
            }
             



})

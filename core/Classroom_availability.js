
const  classroomDao = require ('../daos/ClassroomDao')
const moment = require('moment')
const  SessionDao = require ('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')

exports.availability = (data,token) => new Promise(async(resolve, reject) => {
    let available_date  = data.available_date

    // available_date = moment(available_date).format('YYYY-MM-DD');

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
    

    console.log(available_date,"date")
    available_date = moment(available_date).format("YYYY-MM-DD")

    await classroomDao.Availability(available_date)
    .then(async function(result) {
        console.log("result", result);
        if(result.message.length ==0){
        return resolve({status:200, message : "No classroom is available in the selected date"});}
        else{return resolve({status : 200, result :result})}

      })
    
      .catch(async function(err) {
        return resolve({status : 400,message :"something went wrong"});
      });
    //  .then(async function(result) {
    //      console.log(result,"good")
    //      if (result.result.length ==0 ){
    //         console.log("result", result);
    //         return resolve({status : 400, message : "No classroom is available in the selected date"});
    //      }
    //      else{
    //          return resolve({status : 200, message :result})
    //      }
    //       })
    //       .catch(function(err) {
    //         return resolve(err);
    //       }); 
    //     }
    }
}


})
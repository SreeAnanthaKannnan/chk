const  SessionDao = require ('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')
const  EmployeeDao = require ('../daos/Employee_profileDao')


exports.training_booking = (data,value) => new Promise(async(resolve, reject) => {
            let Employee_data = data.id;
            let no_of_seats_selected = value.no_of_seats_selected
            let token = value.token;
            let status = "Booked"

    console.log(Employee_data,"test")
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


                await EmployeeDao.Booking_for_training(Employee_data)
                .then(async function(result) {
                    console.log("result", result);
                    if(result.result.length !=0){
                    return resolve({status:200, message :"Assigned for training.Please schedule the date"});}
                })
                    .catch(async function(err) {
                        console.log(err,"err")
                        return resolve({status : 400,message :"something went wrong"});
                    });


             }
            }




})

const  SessionDao = require ('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')
const  ScheduleDao = require ('../daos/ScheduleDao')
const Employee_ProfileDao = require('../daos/Employee_profileDao')


exports.schedule_summary = (request) => new Promise(async(resolve, reject) => {
           let Company_Trade_Lincense_No = request.company_trade_lincense_no;
           let token = request.token;
           let language = request.language;
           let status = "Booked"
           

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

                
                await ScheduleDao.schedule_summary_value(Company_Trade_Lincense_No,language,status)
                .then(async function(result) {
                    console.log("result", result);
                    var value =[];
                    var obj ={}
                    var schedule_result=result.result.data
                    console.log(result.result.data[0].Emirates_ID,"length")
                    for(i=0;i<result.result.data.length;i++){
                        value.push(result.result.data[i].Emirates_ID)
                                       }
                                       console.log(value,"value")
                    await Employee_ProfileDao.Employee_name_schedule(value,language)
                       .then(async function(result){
                           console.log(result.result[0],"kavitha")
                           let final_array =[]

                           for(i=0;i<result.result.length;i++){
                               let start_time = schedule_result[i].start_time;
                               let end_time = schedule_result[i].end_time
                               let amount = schedule_result[i].amount
                               let Emirates_ID = schedule_result[i].Emirates_ID
                               let trainer_name = schedule_result[i].trainer_name
                               let course_name = schedule_result[i].course_name
                               let Employee_name = result.result[i]
                               let classroom_id = schedule_result[i].classroom_id
                               obj={start_time:start_time,
                                end_time:end_time,
                                amount:amount,
                                Emirates_ID:Emirates_ID,
                                Employee_name:Employee_name,
                                course_name:course_name,
                                trainer_name:trainer_name,
                            classroom_id:classroom_id}

                               final_array.push(obj)

                           }
                           return resolve({status : 200,message:final_array})
                       })
                    // if(result.result.length !=0){
                        
                    // return resolve({status:200, message :result});}
                })
                    .catch(async function(err) {
                        console.log(err,"err")
                        return resolve({status : 400,message :"something went wrong"});
                    });


             }
            }




})

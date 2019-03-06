const  SessionDao = require ('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')
const  ScheduleDao = require ('../daos/ScheduleDao')
const  classroomDao = require ('../daos/ClassroomDao')
const  CourseDao = require ('../daos/CourseDao')

const Employee_ProfileDao = require('../daos/Employee_profileDao')
let moment = require("moment");
const now = new Date();

exports.bulk_booking = (request,data) => new Promise(async(resolve, reject) => {
    // let Emirates_ID = data.emirates_id;
    let course_name = data.course_name;
    let token = request.token;
    let language = request.language;
    let Company_Trade_Lincense_No = request.company_trade_lincense_no;
    console.log(Company_Trade_Lincense_No,"test")
    let query = await SessionDao.Session_select(token);
    let scheduling_date = moment(now).format("YYYY-MM-DD")
    // let no_of_Seats_selected = Emirates_ID.length
    console.log(scheduling_date,"scheduling_date")
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
             await Employee_ProfileDao.Untrained_Employees_list(Company_Trade_Lincense_No,language)
             .then(async function(result) {
                 console.log("result", result);
                 
                     let Emirates_array =[]
                     for(i=0;i<result.result.length;i++){
                         let Emirates_value = result.result[i].National_ID
                         Emirates_array.push(Emirates_value)


                     }
                     let Emirates_ID = Emirates_array;
                     let no_of_Seats_selected = Emirates_ID.length;
                     console.log(Emirates_ID,"Emirates_ID")
                     await CourseDao.Course_id_select(course_name,language)
                     .then(async function(result) {
                         console.log("result", result.result[0].course_id);
                         let course_id = result.result[0].course_id;
                         await CourseDao.Course_amount(course_id,language)
    .then(async function(result) {
        console.log("result", result.result[0].training_amount);
        let amount = result.result[0].training_amount;
                     await classroomDao.bulk_booking(course_id,no_of_Seats_selected,language,Emirates_ID,Company_Trade_Lincense_No,scheduling_date,amount)
        .then(async function(result){

console.log("Result",result.result.affectedRows ==1)
if (result.result.affectedRows ==1){
                 return resolve({status:200, message : "Scheduled Successfully"});
}
else{
    return resolve({status:400,message:"something went wrong"})
}
         
               })
            })
            })
        })
             

    //          await classroomDao.bulk_booking(course_name,no_of_Seats_selected)
    // .then(async function(result) {
    //     console.log("result", result);
    //     if(result){
    //     return resolve({status:200, message : "No classroom is available in the selected date"});}
    //     else{return resolve({status : 200, result :result})}

    //   })





            }


})
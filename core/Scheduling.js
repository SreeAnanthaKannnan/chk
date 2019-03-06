const  scheduleDao = require ('../daos/ScheduleDao')
const  ClassroomDao = require ('../daos/ClassroomDao')
// const FeesdetailsDao = require('../DAO/FeesdetailsDao')
const Employee_profileDao = require('../daos/Employee_profileDao')
const CourseDao = require('../daos/CourseDao')
const TrainerDao = require('../daos/TrainerDao')



const date = require('date-and-time');
const moment = require('moment')
const now = new Date();

exports.scheduling = (data,request) => new Promise(async(resolve, reject) => {
     let Emirates_id = request.emirates_id
     console.log(Emirates_id,"Employee_ID")
     let start_time = request.start_time;
     let end_time = request.end_time;
     let classroom_id = request.classroom_id;
     let course_name = request.course_name;
     let trainer_name = request.trainer_name;
     let token = data.token;
     let language = data.language;    
     let Company_Trade_Lincense_No = data.company_trade_lincense_no
     let number_of_seats_selected = request.number_of_seats_selected;
     let scheduled_date = request.date;
     let payment_status = "pending";
     let status ="Booked"
  //   let scheduled_date = moment(data.scheduled_date).format("YYYY-MM-DD");
    console.log(scheduled_date,"scheduled_date")
  //   let payment_status = "Not Confirmed";
  //   let status = "Not Confirmed"
  //  var amount = await  FeesdetailsDao.Amount()
  //  amount = amount.result[0].training_fee * number_of_seats_selected
  //  console.log(amount,"=========>amount")
       

    // let scheduling_date = date.format(now, 'YYYY/MM/DD HH:mm:ss')
    let scheduling_date = moment(now).format("YYYY-MM-DD")
    console.log(scheduling_date,"scheduling_date")
    scheduled_date = moment(scheduled_date).format("YYYY-MM-DD")
    console.log(scheduled_date)

    await Employee_profileDao.Employee_update(Emirates_id,Company_Trade_Lincense_No,language)
    .then(async function(result) {
        console.log("result", result);
        // if(result.result.length !=0){
        // return resolve({status:200, message :result});}
    
    await CourseDao.Course_id_select(course_name,language)
    .then(async function(result) {
        console.log("result", result.result[0].course_id);
        let course_id = result.result[0].course_id;
        
    
    await CourseDao.Course_amount(course_id,language)
    .then(async function(result) {
        console.log("result", result.result[0].training_amount);
        let amount = result.result[0].training_amount;
        await TrainerDao.Trainer_id_select(trainer_name,language)
       
        
    .then(async function(result) {
        console.log("result===trainer", result);
        let trainer_id = result.result[0].id
        await ClassroomDao.Classroom_num(classroom_id,language)
        .then(async function(result) {
            console.log("result", result.result[0].Classnum);
             classroom_id = result.result[0].classnum;
      
        // var query_value = [scheduled_date,start_time,end_time,ctrainerlassroom_id,scheduling_date,course_name,number_of_seats_selected]
        var query_value =[classroom_id,Emirates_id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status]
        await scheduleDao.Schedule_select(classroom_id,Emirates_id,Company_Trade_Lincense_No)
        .then(async function(result) {
            console.log("result99999999", result.result);
            console.log(result.result !="")
            // for(i=0;i<result.result.length;i++){
            //   console.log("uuuuuu",result.result[i].Emirates_ID)
              if(result.result !=""){
                  return resolve({status:400, message :"Employee Already Scheduled"});}
                  

             // }
             else{
            
        
        await scheduleDao.Schedule(query_value)
    .then(async function(result) {
        console.log("result", result);
        if(result.result.length !=0){
        return resolve({status:200, message :" Scheduled successfully"});}
    
    })
  
  
  }
})
    })
})
})
})
    })
     
        .catch(async function(err) {
            return resolve({status : 400,message :err});
        });

   



})
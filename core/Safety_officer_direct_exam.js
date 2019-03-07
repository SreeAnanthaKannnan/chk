const  scheduleDao = require ('../daos/SchedulingDao')
const  classroomDao = require ('../daos/ClassroomDao')
const FeesdetailsDao = require('../daos/FeesdetailsDao')

const date = require('date-and-time');
const moment = require('moment')
const now = new Date();

exports.safety_officer = (data) => new Promise(async(resolve, reject) => {
    // let classroom_id = data.classroom_id;

    // let hr_email_id = data.trainer_email_id;
    let scheduled_date = data.scheduled_date;
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No
    let number_of_seats_selected = data.number_of_seats_selected
    var amount = await  FeesdetailsDao.Amount()
   amount = amount.result[0].exam_fee * number_of_seats_selected
   console.log(amount,"=========>amount")
       

    //let scheduling_date = date.format(now, 'YYYY/MM/DD HH:mm:ss')
    let scheduling_date = moment(now).format("YYYY-MM-DD")
    console.log(scheduling_date,"scheduling_date")
    var query_value = [scheduled_date]
   
   await classroomDao.classroom_for_exam(scheduled_date)
        .then(async function(result) {
        console.log(result,"selected classrooms")
       
            console.log(result,"result===========>")
            return resolve({status : 200,message :result,"amount":amount})
      

        })
        .catch(async function(err) {
          return resolve({status : 400,message :"something went wrong"});
        });

        // let time_slot = select.result[0].time_slot
        // console.log(time_slot,"====>timeslot")

   
    //  query_value = [classroom_id,time_slot,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status]
    //   await scheduleDao.Schedule(query_value)
    //   .then(async function(result) {
    //     console.log("result", result);
    //     if(result!=0){
    //     return resolve({status:200, message : "Class is scheduled Successfully"});}
    //     else{return resolve({status : 200, result :result})}

    //   })
    
    //   .catch(async function(err) {
    //     return resolve({status : 400,message :"something went wrong"});
    //   });
    

    
    // return resolve({
    //     status : 200,
    //     message :"success"
    // })
}) 
    
   
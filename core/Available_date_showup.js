const  SessionDao = require ('../daos/SessionDao')
const  ClassroomDao = require ('../daos/ClassroomDao')
const session_time = require('../utils/session_time_difference')
const TrainerDao = require ('../daos/TrainerDao')
const CourseDao = require ('../daos/CourseDao')


exports.available_date1 = (token,data) => new Promise(async(resolve, reject) => {

     console.log(token,"token")
     let no_of_seats_selected = data.no_of_seats_selected
     let trainer_name = data.trainer_name
     let course_name = data.course_name
     let language = "en"
     console.log(trainer_name,"trainer_name========>")
     console.log(course_name,"course_name=====>")

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
 let now = new Date();

  let Db_time = query[0].session_created_at;
  let time_difference_minutes = await session_time.Session_time_difference(Db_time,now)
  console.log(time_difference_minutes,"function")
  // console.log(session_time,"session_time")
  // let session_created_time = moment(session_time,"YYYY-MM-DD HH:mm:ss").format("LT")
  //  session_created_time = session_created_time.split(' ')[0]
  //  let Entry_time = moment(now,"YYYY-MM-DD HH:mm:ss").format("LT")
  //  Entry_time = Entry_time.split(' ')[0]
  //  var mins = moment.utc(moment(Entry_time, "HH:mm:ss").diff(moment(session_created_time, "HH:mm:ss"))).format("hh:mm")
       
   console.log(time_difference_minutes<="01:00","wwwwwwwwwwwwwwwwwwww")

  
   if(time_difference_minutes<="01:00")
        {
                 return resolve({
                              status : 440,
                              message : "session expired"
                                })
       }

       else{
        await TrainerDao.Trainer_id_select(trainer_name,language)
         .then(async function(result) {
          console.log("result", result);
          let trainer_id = result.result[0].id
          console.log(trainer_id,"trainer_id")
        
         await CourseDao.Course_id_select(course_name,language)
         .then(async function(result) {
          console.log("result", result);
          let course_id = result.result[0].course_id
          console.log(course_id,"course_id")
         

 

    await ClassroomDao.Availability_Date(no_of_seats_selected,trainer_id,course_id)
    .then(async function(result) {
        console.log("result", result);
        if(result.message.length !=0){
        return resolve({status:200, message :result.message});}
      })
    })
  })
      .catch(async function(err) {
        return resolve({status : 400,message :"something went wrong"});
      });
    }
  }

})

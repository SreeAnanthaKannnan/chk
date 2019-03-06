let insertquery = require('../daos/Feedback_salamaDao')
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
 let date = require('date-and-time');
 let moment = require('moment')



exports.feedback =(Company_Email,comments) =>{

    return new Promise(async(resolve, reject) => {
    
    //  let schedule_time = scheduleobject.schedule_time;
    // let requestdate = scheduleobject.requestdate;
//     let today = new Date();
//    let schedule_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
    let data =[Company_Email,comments]
    // console.log(data,"query")
    console.log(data,"feedback")
    let query= await insertquery.feedback_insert(data)
       console.log(query !=0,"data inserted")
     
       return  resolve({
        status: 200,
        message:"Feedback Done",
        
        
    })
})
           };
       
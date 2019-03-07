let insertquery = require('../daos/AppealDao');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const message = require('../utils/messages');
const language_detect = require('../utils/language_detect')
// let date = require('date-and-time');
//let moment = require('moment')
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
// let date = require('date-and-time');
const translate = require("../utils/translate");
let moment = require('moment')

exports.Appeal = (Appeal_Object) => new Promise(async(resolve, reject) => {
    let service = Appeal_Object.service;
    let Description = Appeal_Object.Description;
    let today = new Date();
    let Appeal_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
    console.log(token, "test");
    let query = await SessionDao.Session_select(token);
    console.log(query, "testinggggggggg");
    if (query.length == 0) {
      resolve({
        status: 402,
        message: "Invalid token"
      });
    } else {
      console.log(query[0].session_created_at);
      let Name_ar, Name_en, query_value;
      let now = new Date();

      let Db_time = query[0].session_created_at;
      let time_difference_minutes = await session_time.Session_time_difference(
        Db_time,
        now
      );
      console.log(time_difference_minutes, "function");
      // console.log(session_time,"session_time")
      // let session_created_time = moment(session_time,"YYYY-MM-DD HH:mm:ss").format("LT")
      //  session_created_time = session_created_time.split(' ')[0]
      //  let Entry_time = moment(now,"YYYY-MM-DD HH:mm:ss").format("LT")
      //  Entry_time = Entry_time.split(' ')[0]
      //  var mins = moment.utc(moment(Entry_time, "HH:mm:ss").diff(moment(session_created_time, "HH:mm:ss"))).format("hh:mm")

      console.log(time_difference_minutes <= "01:00", "wwwwwwwwwwwwwwwwwwww");

      if (time_difference_minutes <= "01:00") {
        return resolve({
          status: 440,
          message: "session expired"
        });
      } else {
        let language = await language_detect.languageDetect(Description);
        console.log(language.result, "language");
        if (language.result == "en") {
          let temp = await translate.translate_ar(Description);
          let temp1 = await translate.translate_ar(service)
          console.log(temp);
          console.log(temp1)
          Description_ar = temp.result;
          service_ar = temp1.result;
          Description_en = Description;
          service_en = service;
        } else {
          Description_ar = Description;
          service_ar = service;
          let temp = await translate.translate_en(Description);
          let temp1 =  await translate.translate_en(service); 
          Description_en = temp.result;
          service_en = temp1.result;
        }
      }
    }
    let query_value =[service,Description]
    logger.fatal(query_value,"query_value")
   // let query= await insertquery.Appeal_insert(query_value)
       logger.fatal(query !=0,"data inserted")
    // let language = await language_detect.languageDetect(service)
    // logger.fatal(language.result,"language")
    //  let messagevalue =  await  message.getmessage(language.result,"S01")
    //   logger.fatal(messagevalue,"last")
  
      return  resolve({
        status: 200,
        message:"Appeal Done", 
      })
    
    
})
const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const message = require("../utils/messages");
let date = require("date-and-time");
// let now = new Date();
var datetime = require("node-datetime");
let moment = require("moment");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const fs = require("fs");

exports.Employee_profile = (
  EmployeeProfile
  // filename_blob,
  // filename_url,
  // path
) =>
  new Promise(async (resolve, reject) => {
    let Employee_ID = EmployeeProfile.employee_id;
    // console.log(EmployeeProfile,"woowwwwwww")
    let Name = EmployeeProfile.name;
    let Position = EmployeeProfile.position;
    let Category = EmployeeProfile.category;
    let National_ID = EmployeeProfile.national_id;
    // let Safety_Officer = EmployeeProfile.safety_officer
    let Company_Trade_Lincense_No = EmployeeProfile.company_trade_lincense_no;
    let token = EmployeeProfile.token;
    let assigend_for_training ="NO"
    // let profile_photo_url = path;
    // let base64data = filename_blob.toString('base64');
    // console.log(base64data,"==============================>")
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
        let language = await language_detect.languageDetect(Name);
        console.log(language.result, "language");
        if (language.result == "en") {
          let temp = await translate.translate_ar(Name);
          console.log(temp);
          Name_ar = temp.result;
          Name_en = Name;
        } else {
          Name_ar = Name;
          let temp = await translate.translate_en(Name);
          Name_en = temp.result;
        }
        query_value = [
          Employee_ID,
          Name_en,
          Name_ar,
          Position,
          National_ID,
          Company_Trade_Lincense_No,
           assigend_for_training,
          // profile_photo_url,
          Category
        ];
        console.log(query_value, "query_value");
        await Employee_profileDao.Employee_select(National_ID)
          .then(async function (result,err) {
            console.log("result======>", result.message.data.length);
            if (result.message.data.length != 0) {
              var messagevalue = await  message.getmessage(language.result,"E02")

              return resolve({
                status: 200,
                message: messagevalue
              });
            } else {
              let query =  await Employee_profileDao.Employee_insert(query_value);
              var messagevalue = await  message.getmessage(language.result,"S02")
              console.log(query,"======>queryvalue")


              return resolve({
                status: 200,
                message: messagevalue
              });
            }
          })
        
          .catch(async function (err) {
            var messagevalue = await  message.getmessage(language.result,"E01")

            return resolve({ status: 400, message: messagevalue });
          });
        
      }
    }
  });
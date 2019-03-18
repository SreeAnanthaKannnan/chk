const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const message = require("../utils/messages");
let date = require("date-and-time");
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
    let Name = EmployeeProfile.name;
    let Position = EmployeeProfile.position;
    let Category = EmployeeProfile.category;
    let National_ID = EmployeeProfile.national_id;
    let Company_Trade_Lincense_No = EmployeeProfile.company_trade_lincense_no;
    let token = EmployeeProfile.token;
    let language = EmployeeProfile.language;
    let assigend_for_training ="NO"
   /*============token validation===================*/
    console.log(token, "test");
    let query = await SessionDao.Session_select(token);
    if (query.length == 0) {
      resolve({
        status: 402,
        message: "Invalid token"
      });
    } else {
      /*===================Session validation======================*/
      console.log(query[0].session_created_at);
      let Name_ar, Name_en, query_value;
      let now = new Date();

      let Db_time = query[0].session_created_at;
      let time_difference_minutes = await session_time.Session_time_difference(
        Db_time,
        now
      );
      console.log(time_difference_minutes, "session time difference");
      if (time_difference_minutes <= "01:00") {
        return resolve({
          status: 440,
          message: "session expired"
        });
      } else {
    /*================Translation form arabic to English and vice versa==============*/    
        console.log(language, "language");
        if (language == "en") {
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
  /*==================Checking whether employee already exists or not==============*/      
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
   /*=====================insering Employee details in the Employee_profile table=========*/           
               await Employee_profileDao.Employee_insert(query_value)
               .then(async function(result) {
                console.log("already exits insert=====>",result)
                        if (result.result.data.affectedRows==1) {
              var messagevalue = await  message.getmessage(language.result,"S02")


              return resolve({
                status: 200,
                message: messagevalue
              });
            }
          })
        }
        
        })
      
        
      
        
        
     /*==============Error Capturing================*/     
        
          .catch(async function (err) {
            var messagevalue = await  message.getmessage(language.result,"E01")

            return resolve({ status: 400, message: messagevalue });
          });
        
        
        
      }
    
    }
  });
  /************************************Code Ends**********************************************/
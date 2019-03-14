let AppealDAO = require('../daos/AppealDao')
const message = require('../utils/messages')
const language_detect = require('../utils/language_detect')
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
// let date = require('date-and-time');
const translate = require("../utils/translate");
let moment = require('moment')


exports.Appeal = (Appeal_Object,token,language) => new Promise(async(resolve, reject) => {
    let service = Appeal_Object.service;
    let Description = Appeal_Object.Description;
    let today = new Date();
    let Appeal_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
    console.log(token, "test");
     await SessionDao.Session_select(token)
     .then(async function(result) {
      console.log("result<======", result);
    console.log(result[0], "testinggggggggg");
    let query = result
    if (query.length == 0) {
      resolve({
        status: 402,
        message: "Invalid token"
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
        // let language = await language_detect.languageDetect(Description);
        console.log(language, "language");
        if (language == "en") {
         await translate.translate_ar(Description)
         .then(async function(result) {
          console.log("result_translate", result)
          temp=result
          Description_ar = temp.result;
          await translate.translate_ar(service)
          service_ar = result.result;
          Description_ar = result.result;
          Description_en = Description;
          service_en = service;
         })
         .catch(async function(err) {
          var messagevalue = await message.getmessage(language.result, "E01");
          return resolve({ status: 400, message: "somthing went wrong" });
        });

        }
       
       else {
          Description_ar = Description;
          service_ar = service;
          let temp = await translate.translate_en(Description);
          let temp1 =  await translate.translate_en(service); 
          Description_en = temp.result;
          service_en = temp1.result;
        }
      }

      let query_value = [service_en, service_ar, Description_en, Description_ar, Appeal_date]
      console.log(query_value, "query_value")
      await AppealDAO.Appeal_insert(query_value)
        .then(async function (result) {
          console.log("result", result);
          if (result.message.length != 0) {
            console.log(language.result, "inside the loop")

            var messagevalue = await message.getmessage(language.result, "S01")
            // return resolve({status:200,  message :"Appeal is Submitted Successfully"});}
            return resolve({ status: 200, statusCode: "S01", message: messagevalue });
          }

          // else{
          //   var messagevalue = await  message.getmessage("ar","S01")
          //   console.log(messagevalue,"arabic value")
          //   return resolve({status:200,  statusCode:"S01",message :messagevalue});


          // }

        })
        .catch(async function (err) {
          var messagevalue = await message.getmessage(language.result, "E01")


          return resolve({ status: 400, message: messagevalue });
        });





    }
    let query_value =[service_en,service_ar,Description_en,Description_ar,Appeal_date]
   await insertquery.Appeal_insert(query_value)
   .then(async function(result) {
    console.log("result===>", result);
  
      return  resolve({
        status: 200,
        message:"your appeal is submitted successfully", 
      })
    })

       })
     
     
         .catch(async function(err) {
           var messagevalue = await message.getmessage(language, "E01");
           return resolve({ status: 400, message: err });
         });
    
    
})
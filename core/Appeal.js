let AppealDAO = require("../daos/AppealDao");
const message = require("../utils/messages");
const language_detect = require("../utils/language_detect");
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const translate = require("../utils/translate");
let moment = require("moment");
const checktoken = require("../utils/checkToken");


// Contactus_comments
module.exports = {
  Appeal: Appeal,
  Contactus_comments: Contactus_comments
};

async function Appeal(Appeal_Object, token, language) {
  return new Promise(async (resolve, reject) => {
    let service = Appeal_Object.service;
    let Description = Appeal_Object.Description;
    let today = new Date();
    let Appeal_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
    let value = JSON.stringify(Appeal_date);
    console.log(value, "value");
    let compliance = value.slice(1, 5) + value.slice(6, 8) + value.slice(9, 11);
    console.log(compliance, "compliance");
    console.log(token, "test");
    /*============================Token checking========================================*/
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      //====================Translation from english to arabic vice versa================*/
      if (language == "en") {
        let temp = await translate.translate_ar(Description);
        let temp1 = await translate.translate_ar(service);
        console.log(temp);
        console.log(temp1);
        Description_ar = temp.result;
        service_ar = temp1.result;
        Description_en = Description;
        service_en = service;
      } else {
        console.log(language, "language");
        if (language == "en") {
          await translate
            .translate_ar(Description)
            .then(async function (result) {
              console.log("result_translate", result);
              temp = result;
              Description_ar = temp.result;
              await translate.translate_ar(service);
              service_ar = result.result;
              Description_ar = result.result;
              Description_en = Description;
              service_en = service;
            })
            .catch(async function (err) {
              var messagevalue = await message.getmessage(language, "E01");
              return resolve({
                status: 400,
                message: "somthing went wrong"
              });
            });
        } else {
          Description_ar = Description;
          service_ar = service;
          let temp = await translate.translate_en(Description);
          let temp1 = await translate.translate_en(service);
          Description_en = temp.result;
          service_en = temp1.result;
        }
      }
      /*========================value of the query to be passed in the db query================*/
      let query_value = [
        service_en,
        service_ar,
        Description_en,
        Description_ar,
        Appeal_date,
        compliance
      ];
      console.log(query_value, "query_value");
      await AppealDAO.Appeal_insert(query_value)
        .then(async function (result) {
          console.log("result=======>", result);

          /*==============================message value if it is arabic arabic message vice versa======*/
          var messagevalue = await message.getmessage(language, "S01");
          messagevalue = JSON.stringify(messagevalue.result);
          return resolve({
            status: 200,
            statusCode: "S01",
            message:
              messagevalue +
              "." +
              "  " +
              "your complaint no is:" +
              result.result
          });
        })
        .catch(async function (err) {
          var messagevalue = await message.getmessage(language, "E01");

          return resolve({
            status: 400,
            message: messagevalue
          });
        });
    }
  });
}


function Contactus_comments(contact_feedback) {
  return new Promise(async (resolve, reject) => {

    console.log("contact_feedback=======>")
    var fullname = contact_feedback.fullname;
    console.log("core_fullname", fullname);

    var email = contact_feedback.email;
    console.log("core_email", email);

    var mobile = contact_feedback.mobile;
    console.log("core_ mobile", mobile);


    var subject = contact_feedback.subject;
    console.log("core_ subject", subject);

    var comment = contact_feedback.comment;
    console.log("core_ comment", comment);


    //=====================Trainer_email send to trainer table ===start=====================
    var select_query_contucUs = await AppealDAO.contact_feedback(fullname, email, mobile, subject, comment);
    console.log("Core_selectQuery _Appeal_Table===>", select_query_contucUs);



    //==========Employee person values send to the attendance table
    //and store the wheather the person is present ====end============

    if (select_query_contucUs.message.data.affectedRows == 1) {

    } else {
      
      var select_query_contucUs = {
        status: 400,
        message: "Something went wrong while storing records"
      };
    }

    //====================getdata values comes for array ,here I have split
    //and get the employee_id,name_en,national_id=======end===============

    return resolve({
      statuscode: "E08",
      status: 200,
      //Token: token,
      message: select_query_contucUs,
      result: "Details saved sucessfully"
    });

  })


}

/*******************************Code Ends***********************************************/
function Contactus_comments_() {
  return new Promise(async (resolve, reject) => {
    // var verifytoken = await checktoken.checkToken(token);
    // console.log(verifytoken);
    // if (verifytoken.status == 402) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else if (verifytoken.status == 403) {
    //   return resolve({
    //     status: verifytoken.status,
    //     message: verifytoken.message
    //   });
    // } else {
    console.log("contact_feedback=======>")
    var fullname = contact_feedback.fullname;
    console.log("core_fullname", fullname);

    var email = contact_feedback.email;
    console.log("core_email", email);

    var mobile = contact_feedback.mobile;
    console.log("core_ mobile", mobile);


    var subject = contact_feedback.subject;
    console.log("core_ subject", subject);

    var comment = contact_feedback.comment;
    console.log("core_ comment", comment);


    //=====================Trainer_email send to trainer table ===start=====================
    let select_query = await AppealDAO.contact_feedback(fullname, email, mobile, subject, comment);
    console.log("Core_selectQuery _Trainer_Table===>", select_query);



    //==========Employee person values send to the attendance table
    //and store the wheather the person is present ====end============

    if (select_query.message.data.affectedRows == 1) {
      var select_query = select_query;
    } else {
      var select_query = {
        status: 400,
        message: "Something went wrong while storing records"
      };
    }

    //====================getdata values comes for array ,here I have split
    //and get the employee_id,name_en,national_id=======end===============

    return resolve({
      statuscode: "E08",
      status: 200,
      //Token: token,
      message: select_query,
      result: "Details saved sucessfully"
    });

  });
}
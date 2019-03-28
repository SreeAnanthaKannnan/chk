let AppealDAO = require('../daos/AppealDao')
const message = require('../utils/messages')
const language_detect = require('../utils/language_detect')
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const translate = require("../utils/translate");
let moment = require('moment')


module.exports = {
    Appeal: Appeal,
    Contactus_comments: Contactus_comments
}

async function Appeal(Appeal_Object, token, language) {
    return new Promise(async (resolve, reject) => {
        let service = Appeal_Object.service;
        let Description = Appeal_Object.Description;
        let today = new Date();
        let Appeal_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
        let value = JSON.stringify(Appeal_date)
        console.log(value, "value")
        let compliance = value.slice(1, 5) + value.slice(6, 8) + value.slice(9, 11)
        console.log(compliance, "compliance")
        console.log(token, "test");
        /*============================Token checking========================================*/
        await SessionDao.Session_select(token)
            .then(async function (result) {
                console.log("token-result<======", result);
                console.log(result[0], "token");
                let query = result
                if (query.length == 0) {
                    resolve({
                        status: 402,
                        message: "Invalid token"
                    });
                } else {
                    //====================Translation from english to arabic vice versa================*/
                    if (language == "en") {
                        let temp = await translate.translate_ar(Description);
                        let temp1 = await translate.translate_ar(service)
                        console.log(temp);
                        console.log(temp1)
                        Description_ar = temp.result;
                        service_ar = temp1.result;
                        Description_en = Description;
                        service_en = service;
                    } else {
                        console.log(language, "language");
                        if (language == "en") {
                            await translate.translate_ar(Description)
                                .then(async function (result) {
                                    console.log("result_translate", result)
                                    temp = result
                                    Description_ar = temp.result;
                                    await translate.translate_ar(service)
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
                    let query_value = [service_en, service_ar, Description_en, Description_ar, Appeal_date, compliance]
                    console.log(query_value, "query_value")
                    await AppealDAO.Appeal_insert(query_value)
                        .then(async function (result) {
                            console.log("result=======>", result);

                            /*==============================message value if it is arabic arabic message vice versa======*/
                            var messagevalue = await message.getmessage(language, "S01")
                            messagevalue = JSON.stringify(messagevalue.result)
                            return resolve({
                                status: 200,
                                statusCode: "S01",
                                message: messagevalue +
                                    "." + "  " + "your complaint no is:" + result.result
                            });


                        })
                        .catch(async function (err) {
                            var messagevalue = await message.getmessage(language, "E01")


                            return resolve({
                                status: 400,
                                message: messagevalue
                            });
                        });
                }

            })

            /*===========================Error capture=======================================*/
            .catch(async function (err) {
                var messagevalue = await message.getmessage(language, "E01");
                return resolve({
                    status: 400,
                    message: err
                });
            });


    })
}
/*******************************Code Ends***********************************************/

//=====================Trainer select the employee absent  ===start===============================
async function Contactus_comments(
    contact_feedback,

) {
    return new Promise(async (resolve, reject) => {

        console.log("contact_feedback", contact_feedback);

        const fullname = contact_feedback.fullname;
        console.log("Core_fullname", fullname);

        const email = contact_feedback.email;
        console.log("Core_email", email);

        const mobile = contact_feedback.mobile;
        console.log("Core_mobile", mobile);

        const subject = contact_feedback.subject;
        console.log("Core_subject", subject);

        const comment = contact_feedback.comment;
        console.log("Core_comment", comment);




        var select_query = await AppealDAO.contact_feedback(
            fullname,
            email,
            mobile,
            subject,
            comment,

        );
        console.log("select_query==================>>>>", select_query);


        return resolve({
            statuscode: "E08",
            status: 200,
            //Token: token,
            message: select_query,
            result: "Details saved sucessfully"
        });
    });
}
  //=====================Trainer select the employee absent  ===end===============================
let AppealDAO = require('../daos/AppealDao')
const message = require('../utils/messages')
const language_detect = require('../utils/language_detect')
const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const translate = require("../utils/translate");
let moment = require('moment')


exports.Appeal = (Appeal_Object, token, language) => new Promise(async (resolve, reject) => {
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
                /*=====================Session validation==========================*/
                console.log(query[0].session_created_at);
                let Name_ar, Name_en, query_value;
                let now = new Date();

                let Db_time = query[0].session_created_at;
                let time_difference_minutes = await session_time.Session_time_difference(
                    Db_time,
                    now
                );
            }

            if (time_difference_minutes >= "00:30:00") {
                return resolve({
                    status: 440,
                    message: "session expired"
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
/*******************************Code Ends***********************************************/
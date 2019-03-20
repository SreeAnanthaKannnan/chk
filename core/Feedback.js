let insertquery = require('../daos/Feedback_salamaDao')
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
let date = require('date-and-time');
let moment = require('moment')



exports.feedback = (Company_Email, comments, token) => {

    return new Promise(async (resolve, reject) => {
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
                    //========================================Feedback Data information stored into Daos=================================================//
                    let data = [Company_Email, comments]
                    console.log(data, "feedback")
                    let query = await insertquery.feedback_insert(data)
                    console.log(query != 0, "data inserted")

                    return resolve({
                        status: 200,
                        message: "Feedback Done",


                    })
                }
            })
    })

};
//========================================Code End=================================================//
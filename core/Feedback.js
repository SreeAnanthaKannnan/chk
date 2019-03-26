let insertquery = require('../daos/Feedback_salamaDao')
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
let date = require('date-and-time');
let moment = require('moment')
const checktoken = require("../utils/checkToken")



exports.feedback = (Company_Email, comments, token) => {

    return new Promise(async (resolve, reject) => {
        var verifytoken = await checktoken.checkToken(token)
        if (verifytoken.status == 402) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
        } else if (verifytoken.status == 403) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            })
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
}

//========================================Code End=================================================//
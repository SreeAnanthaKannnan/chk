let insertquery = require('../daos/Feedback_salamaDao')
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
let date = require('date-and-time');
let moment = require('moment')



exports.feedback = (Company_Email, comments) => {

    return new Promise(async (resolve, reject) => {
//========================================Feedback Data information stored into Daos=================================================//
        let data = [Company_Email, comments]
        console.log(data, "feedback")
        let query = await insertquery.feedback_insert(data)
        console.log(query != 0, "data inserted")

        return resolve({
            status: 200,
            message: "Feedback Done",


        })
    })
};
//========================================Code End=================================================//
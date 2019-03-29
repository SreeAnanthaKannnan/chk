let insertquery = require("../daos/Feedback_salamaDao");
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
let date = require("date-and-time");
let moment = require("moment");
const checktoken = require("../utils/checkToken");
var translate = require("../utils/translate.js");
var comments_en, comments_ar;
exports.feedback = (Company_Email, comments, token, language) => {
  return new Promise(async (resolve, reject) => {
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      console.log("session expired");
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      //========================================Feedback Data information stored into Daos=================================================//
      if (language == "ar") {
        var temp = await translate.translate_en(comments);
        comments_en = temp.result;
        comments_ar = comments;
      } else {
        comments_en = comments;
        var temp = await translate.translate_ar(comments);
        comments_ar = temp.result;
      }
      var created_at = new Date();
      var date = moment(created_at).format("YYYY-MM-DD HH:mm:ss");
      let data = [Company_Email, comments_en, comments_ar, date];
      console.log(data, "feedback");
      let query = await insertquery.feedback_insert(data);
      console.log(query != 0, "data inserted");

      return resolve({
        status: 200,
        message: "Feedback Done"
      });
    }
  });
};

//========================================Code End=================================================//

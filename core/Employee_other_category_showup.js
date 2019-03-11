const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
var base64ToImage = require("base64-to-image");
const ab2str = require("arraybuffer-to-string");

const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const fs = require("fs");

exports.other_employee_details = (request, token) =>
  new Promise(async (resolve, reject) => {
    let Company_Trade_Lincense_No = request.company_trade_lincense_no;
    let language = request.language;
    let Category = request.category;
    // let token = request.token;
    let Safety_Officer = request.safety_officer;
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

      console.log(time_difference_minutes <= "01:00", "wwwwwwwwwwwwwwwwwwww");

      if (time_difference_minutes <= "01:00") {
        return resolve({
          status: 440,
          message: "session expired"
        });
      } else {
        console.log(Category, "Category");
        let query_value = [Company_Trade_Lincense_No, Category];
        let other_employee_details = await Employee_profileDao.Other_employee_details(
          query_value
        );

        return resolve({
          status: 200,
          message: other_employee_details
        });
      }
    }
  });
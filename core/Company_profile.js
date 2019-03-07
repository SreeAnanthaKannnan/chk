const SessionDao = require("../daos/SessionDao");
const session_time = require("../utils/session_time_difference");
const CompanyDao = require("../daos/Company_ProfileDao");
const moment = require("moment");

exports.company_profile = (data, token) =>
  new Promise(async (resolve, reject) => {
    let Company_Trade_License_No = data.company_trade_lincense_no;
    // var Company_Trade_License_No = JSON.stringify(Company_Trade_License);
    let Mandatory_Training_Percentage = data.Mandatory_Training_Percentage;
    let Category = data.Category;
    let Company_Email = data.company_email;
    let Number_of_employees = data.Number_of_employees;

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
        let query_value = [
          Company_Trade_License_No,
          Mandatory_Training_Percentage,
          Category,
          Company_Email,
          Number_of_employees
        ];
        await CompanyDao.company_trading_license(Company_Email)
        .then(async function(result) {
          console.log("already exits=====>",result)
          if(result.result.length!=0){
            return resolve({
              status: 200,
              message: "Company Profile is already exists"
            });
          }
          else{

        
          await CompanyDao.Company_profile_insert(query_value)
          .then(async function(result) {
            console.log("result", result);
            if (result.result.length != 0) {
              return resolve({
                status: 200,
                message: "Company Profile is added successfully"
              });
            }
          })
        }
        })
          .catch(async function(err) {
            return resolve({ status: 400, message: "something went wrong" });
          });
      }
    }
  });

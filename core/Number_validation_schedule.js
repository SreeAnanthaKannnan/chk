const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const message = require('../utils/messages')
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");

exports.number_validation_schedule= (
  data,request
  
) =>
  new Promise(async (resolve, reject) => {
    
    let Company_Trade_Lincense_No = request.company_trade_lincense_no;
    let no_of_seats_selected= data.no_of_seats_selected;
    let token = request.token
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
      // console.log(session_time,"session_time")
      // let session_created_time = moment(session_time,"YYYY-MM-DD HH:mm:ss").format("LT")
      //  session_created_time = session_created_time.split(' ')[0]
      //  let Entry_time = moment(now,"YYYY-MM-DD HH:mm:ss").format("LT")
      //  Entry_time = Entry_time.split(' ')[0]
      //  var mins = moment.utc(moment(Entry_time, "HH:mm:ss").diff(moment(session_created_time, "HH:mm:ss"))).format("hh:mm")

      console.log(time_difference_minutes <= "01:00", "wwwwwwwwwwwwwwwwwwww");

      if (time_difference_minutes <= "01:00") {
        return resolve({
          status: 440,
          message: "session expired"
        });
      } else {
        
       
        await Employee_profileDao.number_validation_schedule(Company_Trade_Lincense_No)
        .then(async function (result,err) {
            console.log("result======>", result.result[0].count)
            console.log(result.result[0].count,"<+++++++++count")
            console.log("DFFFFFFFFFFFff")
            let count =result.result[0].count

            if (count<no_of_seats_selected) {
                let count = result.result[0].count

              return resolve({
                status: 400,
                message:"Only"+" "+count+" "+"untrained employees available.Please provide maximum"+" "+count+" "+"count"
              });
            } else {
              
              return resolve({
                status: 200,
                message:"sucess"
              });
            }
          })
        
          .catch(async function (err) {

            return resolve({ status: 400, message: "" });
          });
        
      }
    }
  });

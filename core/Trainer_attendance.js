const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const TrainerDao = require("../daos/TrainerDao");
const SchedulerDao = require("../daos/TrainerDao");
// const EmployeeDao = require("../DAO/Employee_profile");
var moment = require("moment");
// const message = require('../Util/messages')
// const token_gen = require('../Util/token')
// const sessionDao = require ('../DAO/SessionDao')
// let date = require('date-and-time');
// let now = new Date();

module.exports = {
  trainer_attendance: trainer_attendance,
  get_employee_attendance: get_employee_attendance
};
async function trainer_attendance(Trainer_Email) {
  return new Promise(async (resolve, reject) => {
    //let Trainer_Email = Trainer_Email
    console.log("core_Trainer_Email", Trainer_Email);

    let select_query = await TrainerDao.Trainer_information(Trainer_Email);
    console.log("Core_selectQuery _Trainer_Table===>", select_query);
    if (select_query.result != 0) {
      let Trainer_id = select_query.result[0].Trainer_id;
      console.log("core_T_id===>", Trainer_id);

      // var date_testing = new Date(Date.now()).toLocaleString();
      // current_date = moment(date_testing).format("YYYY-MM-DD");
      // console.log("current_date", current_date);

      let select_query_scheduler = await SchedulerDao.Scheduler_information(
        Trainer_id
      );
      console.log("Core_selectQuery_scheduler===>", select_query_scheduler);
      for (i = 0; i < select_query_scheduler.result.length; i++) {
        var date = select_query_scheduler.result[i].scheduling_date + 1;
        var newdate = moment(date).format("YYYY/MM/DD");
        select_query_scheduler.result[i].scheduling_date = newdate;

        var date1 = select_query_scheduler.result[i].schdeuled_date + 1;
        var schedulleddate = moment(date1).format("YYYY/MM/DD");
        select_query_scheduler.result[i].schdeuled_date = schedulleddate;
      }

      return resolve({
        statuscode: "E08",
        status: 200,
        //Token: token,
        message: select_query_scheduler
      });
    } else {
      return resolve({
        statuscode: "E08",
        status: 400,
        //Token: token,
        message: "rows not found"
      });
    }
  });
}
async function get_employee_attendance(data) {
  return new Promise(async function(resolve, reject) {
    var schedulled_date = data.schedulled_date;
    console.log("schedulled_date", schedulled_date);
    var start_time = data.start_time;
    console.log("start_time", start_time);
    var end_time = data.end_time;
    console.log("start_time", end_time);
    var query_value = { schedulled_date, start_time, end_time };
    var get_data = await TrainerDao.get_employee_list(query_value);
    console.log("Core_selectQuery _Trainer_Table===>", get_data);

    return resolve({
      statuscode: "E08",
      status: 200,
      //Token: token,
      message: get_data
    });
  });
}

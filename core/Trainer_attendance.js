const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const TrainerDao = require("../daos/TrainerDao");
const SchedulerDao = require("../daos/TrainerDao");
const ClassroomDao = require("../daos/ClassroomDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const CourseDao = require("../daos/CourseDao")

// const EmployeeDao = require("../DAO/Employee_profile");
var moment = require("moment");
// const message = require('../Util/messages')
// const token_gen = require('../Util/token')
// const sessionDao = require ('../DAO/SessionDao')
// let date = require('date-and-time');
// let now = new Date();

module.exports = {
  trainer_attendance: trainer_attendance,

  trainer_date_select: trainer_date_select,
  trainer_attendance_list: trainer_attendance_list
};
async function trainer_attendance(Trainer_Email,language) {
  return new Promise(async (resolve, reject) => {
    //let Trainer_Email = Trainer_Email
    console.log("core_Trainer_Email", Trainer_Email);
    console.log(language,"arjjjjjjjjjjjjjjjjjj")

    let select_query = await TrainerDao.Trainer_information(Trainer_Email);
    console.log("Core_selectQuery _Trainer_Table===>", select_query);
    if (select_query.result != 0) {
      let Trainer_id = select_query.result[0].id;
      console.log("core_T_id===>", Trainer_id);

      // var date_testing = new Date(Date.now()).toLocaleString();
      // current_date = moment(date_testing).format("YYYY-MM-DD");
      // console.log("current_date", current_date);

      let select_query_scheduler = await SchedulerDao.Scheduler_information(
        Trainer_id
      );
      console.log("Core_selectQuery_scheduler===>", select_query_scheduler);
      if (select_query_scheduler.result != 0) {
        for (i = 0; i < select_query_scheduler.result.length; i++) {
          var date = select_query_scheduler.result[i].scheduling_date + 1;
          var newdate = moment(date).format("YYYY/MM/DD");
          select_query_scheduler.result[i].scheduling_date = newdate;

          var date1 = select_query_scheduler.result[i].scheduled_date + 1;
          var schedulleddate = moment(date1).format("YYYY/MM/DD");
          select_query_scheduler.result[i].scheduled_date = schedulleddate;
          console.log("schedulleddate=======>", schedulleddate);
        }
        console.log(
          "core testing select_query_scheduler",
          select_query_scheduler
        );
        let obj = {};
        let data = [];

        for (i = 0; i < select_query_scheduler.result.length; i++) {
          var select_query_scheduled_date =
            select_query_scheduler.result[i].scheduled_date;
          console.log(
            "select_query_scheduled_date",
            select_query_scheduled_date
          );

          var start_time = select_query_scheduler.result[i].start_time;
          console.log("select_query_scheduled_date", start_time);

          var end_time = select_query_scheduler.result[i].end_time;
          console.log("select_query_scheduled_date", end_time);

          // var course_name = select_query_scheduler.result[i].course_id;
          // console.log("select_query_scheduled_date", course_name);


        
          let course_Name = await CourseDao.course_name_schedule(
           select_query_scheduler.result[i].course_id,
            language
          );
          console.log(course_Name, "testing1=============================");

          obj = {
            name:
              select_query_scheduled_date +
              "" +
              "(" +
              start_time +
              "-" +
              end_time +
              ")",
            id: Trainer_id,
            course_name: course_Name.result[0].name_en
          };

          data.push(obj);
        }

        console.log("data", data);

        // for (i = 0; i < select_query_scheduler.result.length; i++) {
        //   var scheduled_date_val = select_query_scheduler.result[i].schdeuled_date
        //   data
        // }
        return resolve({
          statuscode: "E08",
          status: 200,
          //Token: token,
          message: data
        });
      } else {
        return resolve({
          status: 400,
          //Token: token,
          message: "Record not found"
        });
      }
    } else {
      return resolve({
        status: 400,
        //Token: token,
        message: "Record not found"
      });
    }
  });
}

async function trainer_date_select(
  Trainer_id,
  selected_date,
  start_time,
  end_time
) {
  return new Promise(async (resolve, reject) => {
    //let Trainer_Email = Trainer_Email
    //console.log("core_Trainer_Email", Trainer_Email);

    let select_query = await TrainerDao.Scheduler_date_select(
      Trainer_id,
      selected_date,
      start_time,
      end_time
    );
    console.log("schdule_table_date_select_query===>", select_query);

    //let select_query = await TrainerDao.Scheduler_date_select(Trainer_id, selected_date, start_time, end_time);

    var classroom_id = await select_query.result[0].classroom_id;
    console.log("classroom_id_core", classroom_id);

    var select_query_classroom_id = await ClassroomDao.classroom_id(
      classroom_id
    );
    if (select_query_classroom_id.result.length != 0) {
      var class_id = select_query_classroom_id.result.data[0].classroom_id;
      console.log("Core_selectQuery classroom_id===>", class_id);

      console.log("schedule_table_length", select_query.result);

      var data = [];
      for (var i = 0; i < select_query.result.length; i++) {
        console.log("i", i);
        var national_id = await select_query.result[i].National_Id;
        // console.log("national_id_core", national_id)

        // var select_query_national_id = await Employee_profileDao.national_id(national_id);
        // console.log("Core_selectQuery _emplyeeselect_Table===>", select_query_national_id.result.data[0]);

        data.push(national_id);
      }
      let Emirates_ID = data;
      var final_result = await Employee_profileDao.national_id(
        Emirates_ID,
        class_id
      );
      if (final_result.result.length != 0) {
        console.log(final_result, "Final result");

        //console.log("select_query_classroom_id============>>", select_query_classroom_id)

        return resolve({
          statuscode: "E08",
          status: 200,
          //Token: token,
          message: final_result
        });
      } else {
        return resolve({
          statuscode: "E08",
          status: 400,
          //Token: token,
          message: "Record not found"
        });
      }
    } else {
      return resolve({
        statuscode: "E08",
        status: 400,
        //Token: token,
        message: "Record not found"
      });
    }
  });
}
async function trainer_attendance_list(
  getdata,
  attendance_status,
  trainer_id,
  Attended_date,
  start_time,
  end_time,
  classroom,
  course_name
) {
  return new Promise(async (resolve, reject) => {
    // var select_query = [employee_id, attendance_status, National_id, Name_en, trainer_id, Attended_date, start_time, end_time, classroom, course_name]

    //let Trainer_Email = Trainer_Email
    //console.log("core_Trainer_Email", Trainer_Email);

    // let select_query = {employee_id, attendance_status, National_id, Name_en, trainer_id, Attended_date, start_time, end_time, classroom, course_name};
    // console.log("select_queryyyy===>", select_query);

    //let select_query = await TrainerDao.Scheduler_date_select(Trainer_id, selected_date, start_time, end_time);

    for (i = 0; i < getdata.length; i++) {
      var employee_id = getdata[i].data_value.Employee_ID;
      console.log("employee_id", employee_id);

      var Name_en = getdata[i].data_value.Name_en;
      console.log("Name_en", Name_en);

      var National_id = getdata[i].data_value.National_Id;
      console.log("National_ID", National_id);

      console.log("getdata===>", getdata);
      var select_query = await TrainerDao.Trainer_attendence_list(
        employee_id,
        attendance_status,
        National_id,
        Name_en,
        trainer_id,
        Attended_date,
        start_time,
        end_time,
        classroom,
        course_name
      );
      console.log("select_query==================>>>>", select_query);
      if (select_query.message.data.affectedRows == 1) {
        var select_query = select_query;
      } else {
        var select_query = {
          status: 400,
          message: "Something went wrong while storing records"
        };
      }
    }
    return resolve({
      statuscode: "E08",
      status: 200,
      //Token: token,
      message: select_query,
      result: "Details saved sucessfully"
    });
  });
}

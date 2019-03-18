const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const TrainerDao = require("../daos/TrainerDao");
const SchedulerDao = require("../daos/TrainerDao");
const ClassroomDao = require("../daos/ClassroomDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const CourseDao = require("../daos/CourseDao")
var moment = require("moment");


module.exports = {
  trainer_attendance: trainer_attendance,
  trainer_date_select: trainer_date_select,
  trainer_attendance_list: trainer_attendance_list
};

//===========================Getting date and time and shown to the attendance page ===start===============
async function trainer_attendance(trainer_data) {
  return new Promise(async (resolve, reject) => {

    var Trainer_Email = trainer_data.Trainer_emailid
    console.log("core_Trainer_Email", Trainer_Email);

    var language = trainer_data.language
    console.log("core_language", language)


    //=====================Trainer_email send to trainer table ===start=====================
    let select_query = await TrainerDao.Trainer_information(Trainer_Email);
    console.log("Core_selectQuery _Trainer_Table===>", select_query);

    //==============Error handling trainer table ===start===============
    if (select_query.message.length == 0) {
      var error = {
        status: 400,
        message: "Record not found"
      }
      callback(error)

    } else {

      if (select_query.message != 0) {
        let Trainer_id = select_query.message.data[0].id;
        console.log("core_Trainer_id===>", Trainer_id);
        //=====================Trainer_email send to trainer table ===end======================

        //====================Sending Trainer_id to scheduler table ===start===================
        let select_query_scheduler = await SchedulerDao.Scheduler_information(
          Trainer_id
        );
        console.log("core_select_query_scheduler_length===>>", select_query_scheduler.message.data.length)

        //====================Sending Trainer_id to scheduler table ===end====================================

        //=============================converting  date Table format to our format ===start===============================
        if (select_query_scheduler.message.data.length != 0) {
          for (i = 0; i < select_query_scheduler.message.data.length; i++) {
            console.log("Enter in to the for loop")
            var date = select_query_scheduler.message.data[i].scheduling_date + 1;
            var newdate = moment(date).format("YYYY/MM/DD");
            select_query_scheduler.message.data[i].scheduling_date = newdate;

            var date1 = select_query_scheduler.message.data[i].Scheduled_date + 1;
            var schedulleddate = moment(date1).format("YYYY/MM/DD");
            select_query_scheduler.message.data[i].scheduled_date = schedulleddate;
            console.log("schedulleddate=======>", schedulleddate);
          }
          console.log(
            "core  select_query_scheduler",
            select_query_scheduler
          );
          //=============================converting  date Table format to our format ===End===============================

          //==================Getting scheduled_date, start_time,end_time,course_id from Scheduler table 
          //, course_id send to the course table  and getting course name from the table and push in to the one array ==start======================== 
          let obj = {};
          let data = [];
          for (i = 0; i < select_query_scheduler.message.data.length; i++) {
            var select_query_scheduled_date =
              select_query_scheduler.message.data[i].scheduled_date;
            console.log(
              "select_query_scheduled_date",
              select_query_scheduled_date
            );

            var start_time = select_query_scheduler.message.data[i].start_time;
            console.log("Core_for_loop_select_query_start_time", start_time);

            var end_time = select_query_scheduler.message.data[i].end_time;
            console.log("Core_for_loop_select_query_end_time", end_time);

            var course_name = select_query_scheduler.message.data[i].course_id;
            console.log("Core_for_loop_select_query_coursename", course_name);

            let course_Name = await CourseDao.course_name_schedule(
              select_query_scheduler.message.data[i].course_id,
              language
            );
            console.log("core_couse_name", course_Name);

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

          console.log("Core_data", data);
          //==================Getting scheduled_date, start_time,end_time,course_id from Scheduler table 
          //, course_id send to the course table  and getting course name from the table and push in to the one array ==end======================== 


          return resolve({
            statuscode: "E08",
            status: 200,
            message: data
          });
        } else {
          return resolve({
            status: 400,
            message: "Record not found"
          });
        }
      } else {
        return resolve({
          status: 400,
          message: "Record not found"
        });
      }
    }
    //==============Error handling trainer table ===END===============


  });
}
//===========================Getting date and time and shown to the attendance page ===end===============

//==========================Trainer select the date ===start====================================
async function trainer_date_select(
  Trainer_selecting_date,

) {
  return new Promise(async (resolve, reject) => {
    const Trainer_id = Trainer_selecting_date.Trainer_id;
    console.log("core_TDS_Trainer_id", Trainer_id);

    const selected_date = Trainer_selecting_date.select_date;
    console.log("core_TDS_Company_selected_date", selected_date);

    const start_time = Trainer_selecting_date.start_time;
    console.log("core_TDS_start_time", start_time);

    const end_time = Trainer_selecting_date.end_time;
    console.log("Core_TDS_end_time", end_time);

    //===========================Sending the selected date and time and send to the schedule table ==start===============
    let select_query = await TrainerDao.Scheduler_date_select(
      Trainer_id,
      selected_date,
      start_time,
      end_time
    );
    console.log("core_TDS_select_query===>", select_query);

    //let select_query = await TrainerDao.Scheduler_date_select(Trainer_id, selected_date, start_time, end_time);

    var classroom_id = await select_query.message.data[0].classroom_id;
    console.log("core_TDS_classroom_id", classroom_id);


    //======sending classroom id to classroom table and get in to the entire list===start=============
    var select_query_classroom_id = await ClassroomDao.classroom_id(
      classroom_id
    );
    if (select_query_classroom_id.result.length != 0) {
      var class_id = select_query_classroom_id.result.data[0].classroom_id;
      console.log("core_TDS_classroom_id===>", class_id);

      console.log("core_TDS_select_query_result", select_query.message.data);

      var data = [];
      for (var i = 0; i < select_query.message.data.length; i++) {
        console.log("i", i);
        var national_id = await select_query.message.data[i].National_Id;
        console.log("core_emirates_id", national_id)
        data.push(national_id);
      }
      //======sending classroom id to classroom table and get in to the entire list===end=============


      //=====getting national id from classroom table and send to the emplyee_profile table ===start=============
      let Emirates_ID = data;
      console.log("core_emirates_id", Emirates_ID)
      var final_result = await Employee_profileDao.national_id(
        Emirates_ID,
        class_id
      );
      if (final_result.result.length != 0) {
        console.log("core_TDS_Final result", final_result);
        //=====getting national id from classroom table and send to the emplyee_profile table ===end=============


        return resolve({
          statuscode: "E08",
          status: 200,
          message: final_result
        });
      } else {
        return resolve({
          statuscode: "E08",
          status: 400,
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
//==========================Trainer select the date ===END====================================

//=====================Trainer select the employee  ===start===============================
async function trainer_attendance_list(
  Employee_attendance,

) {
  return new Promise(async (resolve, reject) => {

    console.log("Trainer_attendance_list", Employee_attendance);

    const getdata = Employee_attendance.getdata;
    console.log("Core_TDL_getdata", getdata);

    const attendance_status = "Present";
    console.log("Core_TDL_attendance_status", attendance_status);

    const trainer_id = Employee_attendance.Trainer_id;
    console.log("Core_TDL_trainer_id", trainer_id);

    const Attended_date_val = Employee_attendance.attended_date;

    var Attended_date = moment(Attended_date_val).format("YYYY/MM/DD");

    console.log("Core_TDL_Attended_date", Attended_date);

    const start_time = Employee_attendance.start_time;
    console.log("Core_TDL_start_time", start_time);

    const end_time = Employee_attendance.end_time;
    console.log("Core_TDL_end_time", end_time);

    const classroom = Employee_attendance.classroom_id;
    console.log("Core_TDL_classroom", classroom);

    const course_name = Employee_attendance.course_name;
    console.log("Core_TDL_course_name", course_name);


    //====================getdata values comes for array ,here I have split 
    //and get the employee_id,name_en,national_id=======start===============
    for (i = 0; i < getdata.length; i++) {
      var employee_id = getdata[i].data_value.Employee_ID;
      console.log("employee_id", employee_id);

      var Name_en = getdata[i].data_value.Name_en;
      console.log("Name_en", Name_en);

      var National_id = getdata[i].data_value.National_Id;
      console.log("National_ID", National_id);

      console.log("getdata===>", getdata);

      //==========Employee person values send to the attendance table 
      //and store the wheather the person is present ====start============
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

      //==========Employee person values send to the attendance table 
      //and store the wheather the person is present ====end============




      if (select_query.message.data.affectedRows == 1) {
        var select_query = select_query;
      } else {
        var select_query = {
          status: 400,
          message: "Something went wrong while storing records"
        };
      }

      //====================getdata values comes for array ,here I have split
      //and get the employee_id,name_en,national_id=======end===============

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
//=====================Trainer select the employee  ===end===============================
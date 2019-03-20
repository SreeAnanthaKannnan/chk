/**
 * @author: Manoj V
 * @version: 1.0.0
 * @date: March 05, 2019
 * @description: This would be the core file where all the API definitions and xertificates for the employee will be generated.
 */

const Util = require("../utils/language_detect");
const certificate = require("../utils/certificategenerate");
const Result = require("../daos/ResultsDao");
const language_detect = require("../utils/language_detect");
const translate = require("../utils/translate");
const moment = require("moment");

module.exports = {
  Certificate: Certificate,
  getCertificate: getCertificate,
  getAttendance: getAttendance
};

//====Certificate method will generate a pdf certificate for both english and arabic and it passes the employee_name and course name dynamically to the certificate and results,certificate will be stored in DB====//
async function Certificate(req, callback) {
  console.log(req.body);
  var date_attended = req.body.date_attended;
  date_attended = moment(date_attended).format("YYYY/MM/DD");
  var output = req.body.result;
  var language = req.headers.language;
  const token = req.headers.token;
  var course_name = req.body.course_name;
  var queryresult;
  console.log("outputlength........>>>>>>>>", output.length);
  let query = await SessionDao.Session_select(token);
  if (query.length == 0) {
    resolve({
      status: 402,
      message: "Invalid token"
    });
  } else {
    /*====================session validation=================================*/
    console.log(query[0].session_created_at);
    let Name_ar, Name_en, query_value;
    let now = new Date();

    let Db_time = query[0].session_created_at;
    let time_difference_minutes = await session_time.Session_time_difference(
      Db_time,
      now
    );
    console.log(time_difference_minutes, "function");


    if (time_difference_minutes >= "00:30:00") {
      return resolve({
        status: 440,
        message: "session expired"
      });
    } else {

      for (i = 0; i < output.length; i++) {
        var employee_id = output[i].employee_id;

        var employee_name = output[i].Name_en;

        var emirates_id = output[i].National_Id;

        var result = output[i].result;

        if (
          !employee_name ||
          !result ||
          !language ||
          !employee_id ||
          !date_attended ||
          !emirates_id
        ) {
          var err = {
            status: 400,
            message: "Fields should not be empty"
          };
          callback(err);
        } else {
          let result_ar, result_en;

          if (language == "en") {
            let temp = await translate.translate_ar(result);

            result_ar = temp.result;
            result_en = result;
          } else {
            result_ar = result;
            let temp = await translate.translate_en(result);
            result_en = temp.result;
          }

          var value = {
            employee_name: employee_name,

            course_name: course_name
          };

          if (result == "Pass") {
            let course_ar, course_en

            if (language == "en") {
              let temp = await translate.translate_ar(course_name);

              course_ar = temp.result;
              course_en = course_name;
            } else {
              course_ar = course_name;
              let temp = await translate.translate_en(course_name);

              course_en = temp.result;
            }
            var score = 50;
            console.log("value", value);
            if (lang == "English") {
              await certificate
                .Pdf(value.employee_name, value.course_name)
                .then(async function (result) {
                  var path = "/certificate" + employee_name + ".pdf";

                  var query_value = [
                    date_attended,
                    employee_id,
                    score,
                    result_en,
                    result_ar,
                    path,
                    emirates_id,
                    course_en,
                    course_ar
                  ];
                  await Result.Result_select(emirates_id).then(async function (
                    result
                  ) {
                    console.log(result)
                    if (result.message.length == 0) {
                      let query = await Result.Result_insert(query_value);

                      if (query.message.affectedRows == 1) {
                        queryresult = {
                          status: 200,
                          message: "Results has been successfully stored"
                        };
                        var deleteattendance = await Result.Attendance_delete(
                          emirates_id
                        );
                      }
                    } else if (result.message.length != 0) {
                      queryresult = {
                        status: 404,
                        message: "Results for this user is already exists."
                      };
                    }
                  });
                });
            } else if (lang == "Arabic") {
              let employee_ar;

              let temp = await translate.translate_ar(employee_name);

              employee_ar = temp.result;

              var value1 = {
                employee_ar: employee_ar,
                course_name_ar: course_ar
              };
              await certificate
                .Pdf(value1.employee_ar, value1.course_name_ar)
                .then(async function (result) {
                  var path = "/certificate" + employee_name + ".pdf";

                  var query_value = [
                    date_attended,
                    employee_id,
                    score,
                    result_en,
                    result_ar,
                    path,
                    emirates_id,
                    course_en,
                    course_ar
                  ];
                  await Result.Result_select(emirates_id).then(async function (
                    result
                  ) {
                    if (result.message.length == 0) {
                      let query = await Result.Result_insert(query_value);

                      if (query.message.affectedRows == 1) {
                        queryresult = {
                          status: 200,
                          message: "Results has been successfully stored"
                        };
                        var deleteattendance = await Result.Attendance_delete(
                          emirates_id
                        );
                      }
                    } else if (result.message.length != 0) {
                      queryresult = {
                        status: 404,
                        message: "Results for this user is already exists."
                      };
                    }
                  });
                });
            }
          } else if (result == "Fail") {
            var score = 20;
            var query_value = [
              date_attended,
              employee_id,

              score,
              result_en,
              result_ar,
              null,
              emirates_id
            ];
            await Result.Result_select(emirates_id).then(async function (result) {
              if (result.message.length == 0) {
                let query = await Result.Result_insert(query_value);

                if (query.message.affectedRows == 1) {
                  queryresult = {
                    status: 200,
                    message: "Results has been successfully stored"
                  };
                  var deleteattendance = await Result.Attendance_delete(
                    emirates_id
                  );
                }
              } else if (result.message.length != 0) {
                queryresult = {
                  status: 404,
                  message: "Results for this user is already exists."
                };
              }
            });
          }
        }
      }
      callback(queryresult);
    }
  }
}
//====getCertificate method is used to fetch the certificate path from DB and it sends to UI====//
async function getCertificate(req, callback) {
  var emirates_id = req.body.national_id;
  const token = req.headers.token;
  const language = req.headers.language;
  let query = await SessionDao.Session_select(token);
  if (query.length == 0) {
    resolve({
      status: 402,
      message: "Invalid token"
    });
  } else {
    /*====================session validation=================================*/
    console.log(query[0].session_created_at);
    let Name_ar, Name_en, query_value;
    let now = new Date();

    let Db_time = query[0].session_created_at;
    let time_difference_minutes = await session_time.Session_time_difference(
      Db_time,
      now
    );
    console.log(time_difference_minutes, "function");


    if (time_difference_minutes >= "00:30:00") {
      return resolve({
        status: 440,
        message: "session expired"
      });
    } else {
      if (!emirates_id) {
        var err = {
          status: 400,
          message: "Fields should not be empty"
        };
        callback(err);
      } else {
        var certificate = await Result.Result_select(emirates_id);

        if (certificate.message.data.length == 0) {
          var error = {
            status: 400,
            message: "Record not found"
          };
          callback(error);
        } else {
          var cert = certificate.message.data[0].certificate;

          var result = {
            status: 200,
            message: cert
          };
          callback(result);
        }
      }
    }
  }
}

//====getAttendance method will dtch the attendance list by providing trainer_id to DB====//
async function getAttendance(req, callback) {
  var trainer_id = req.body.trainer_id;
  const token = req.headers.token;
  const language = req.headers.language;
  let query = await SessionDao.Session_select(token);
  if (query.length == 0) {
    resolve({
      status: 402,
      message: "Invalid token"
    });
  } else {
    /*====================session validation=================================*/
    console.log(query[0].session_created_at);
    let Name_ar, Name_en, query_value;
    let now = new Date();

    let Db_time = query[0].session_created_at;
    let time_difference_minutes = await session_time.Session_time_difference(
      Db_time,
      now
    );
    console.log(time_difference_minutes, "function");


    if (time_difference_minutes >= "00:30:00") {
      return resolve({
        status: 440,
        message: "session expired"
      });
    } else {
      if (!trainer_id) {
        var err = {
          status: 400,
          message: "Fields should not be empty"
        };
        callback(err);
      } else {
        var Attendance = await Result.Attendance_select(trainer_id);

        if (Attendance.message.length == 0) {
          var error = {
            status: 400,
            message: "Record not found"
          };
          callback(error);
        } else {
          var date_attended;
          for (i = 0; i < Attendance.message.length; i++) {
            var cert = Attendance.message[i].Attended_date;
            date_attended = moment(cert).format("YYYY/MM/DD");
            Attendance.message[i].Attended_date = date_attended;
          }

          var result = {
            status: 200,
            message: Attendance
          };
          callback(result);
        }
      }
    }
  }
}
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
async function Certificate(req, callback) {
  console.log(req.body);
  var date_attended = req.body.date_attended;
  date_attended = moment(date_attended).format("YYYY/MM/DD");
  // var employee_id = req.body.employee_id;
  // var attendence_id = req.body.attendence_id;
  // var emirates_id = req.body.emirates_id;
  // var score = 50;
  var output = req.body.result;
  var lang = req.body.lang;
  
  // var employee_name = req.body.employee_name;
  var course_name = req.body.course_name;
  var queryresult;
  console.log("outputlength........>>>>>>>>", output.length);
  for (i = 0; i < output.length; i++) {
    var employee_id = output[i].employee_id;
    console.log("employee_id", employee_id);
    var employee_name = output[i].Name_en;
    console.log("employee_name", employee_name);
    var emirates_id = output[i].National_Id;
    console.log("employee_name", emirates_id);
    // var attendence_id = output[i].id;
    // console.log("attendence_id", attendence_id);
    var result = output[i].result;
    console.log("result", result);

    if (
      !employee_name ||
      !result ||
      !lang ||
      !employee_id ||
      !date_attended ||
      !emirates_id
    ) {
      console.log("ifcondition");
      var err = {
        status: 400,
        message: "Fields should not be empty"
      };
      callback(err);
    } else {
      let result_ar, result_en;
      let language = await language_detect.languageDetect(result);
      console.log(language.result, "language");
      if (language.result == "en") {
        let temp = await translate.translate_ar(result);
        console.log(temp);
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
        let course_ar, course_en;
        let language = await language_detect.languageDetect(course_name);
        console.log(language.result, "language");
        if (language.result == "en") {
          let temp = await translate.translate_ar(course_name);
          console.log(temp);
          course_ar = temp.result;
          course_en = course_name;
        } else {
          course_ar = course_name;
          let temp = await translate.translate_en(course_name);
          console.log(temp);
          course_en = temp.result;
        }
        var score = 50;
        console.log("value", value);
        if (lang == "English") {
          await certificate
            .Pdf(value.employee_name, value.course_name)
            .then(async function(result) {
              // console.log("result", result);
              var path = "/certificate" + employee_name + ".pdf";
              // callback("", result);
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
              await Result.Result_select(emirates_id).then(async function(
                result
              ) {
                console.log("dbresult.................>>>>>>>>>>", result);
                if (result.message.data.length == 0) {
                  let query = await Result.Result_insert(query_value);
                  console.log("queryinsert", query);
                  if (query.message.data.affectedRows == 1) {
                    queryresult = {
                      status: 200,
                      message: "Results has been successfully stored"
                    };
                    var deleteattendance = await Result.Attendance_delete(
                      emirates_id
                    );
                    console.log("deleteattendance", deleteattendance);
                  }
                } else if (result.message.data.length != 0) {
                  queryresult = {
                    status: 404,
                    message: "Results for this user is already exists."
                  };
                }
              });
            });
        } else if (lang == "Arabic") {
          let employee_ar;
          let language = await language_detect.languageDetect(employee_name);
          console.log(language.result, "language");
          let temp = await translate.translate_ar(employee_name);
          console.log(temp);
          employee_ar = temp.result;
          // employee_en = result;

          var value1 = {
            employee_ar: employee_ar,
            course_name_ar: course_ar
          };
          await certificate
            .Pdf(value1.employee_ar, value1.course_name_ar)
            .then(async function(result) {
              // console.log("result", result);
              var path = "/certificate" + employee_name + ".pdf";
              // callback("", result);
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
              await Result.Result_select(emirates_id).then(async function(
                result
              ) {
                console.log("dbresult.................>>>>>>>>>>", result);
                if (result.message.data.length == 0) {
                  let query = await Result.Result_insert(query_value);
                  console.log("queryinsert", query);
                  if (query.message.data.affectedRows == 1) {
                    queryresult = {
                      status: 200,
                      message: "Results has been successfully stored"
                    };
                    var deleteattendance = await Result.Attendance_delete(
                      emirates_id
                    );
                    console.log("deleteattendance", deleteattendance);
                  }
                } else if (result.message.data.length != 0) {
                  queryresult = {
                    status: 404,
                    message: "Results for this user is already exists."
                  };
                }
              });
            });
        }
      } else if (result == "Fail") {
        // var path =
        //   "/home/rpqb-desk-004/Dubai_project/certificate.pdf" + employee_name;
        var score = 20;
        var query_value = [
          date_attended,
          employee_id,
          attendence_id,
          score,
          result_en,
          result_ar,
          null,
          emirates_id
        ];
        await Result.Result_select(emirates_id).then(async function(result) {
          console.log("dbresult.................>>>>>>>>>>", result);
          if (result.message.data.length == 0) {
            let query = await Result.Result_insert(query_value);
            console.log("queryinsert", query);
            if (query.message.data.affectedRows == 1) {
              queryresult = {
                status: 200,
                message: "Results has been successfully stored"
              };
              var deleteattendance = await Result.Attendance_delete(
                emirates_id
              );
              console.log("deleteattendance", deleteattendance);
            }
          } else if (result.message.data.length != 0) {
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
async function getCertificate(req, callback) {
  var emirates_id = req.body.national_id;
  if (!emirates_id) {
    console.log("ifcondition");
    var err = {
      status: 400,
      message: "Fields should not be empty"
    };
    callback(err);
  } else {
    var certificate = await Result.Result_select(emirates_id);
    console.log("certificate", certificate);
    if (certificate.message.data.length == 0) {
      var error = {
        status: 400,
        message: "Record not found"
      };
      callback(error);
    } else {
      var cert = certificate.message.data[0].certificate;
      console.log("result", cert);
      var result = {
        status: 200,
        message: cert
      };
      callback(result);
    }
  }
}

async function getAttendance(req, callback) {
  var trainer_id = req.body.trainer_id;
  if (!trainer_id) {
    console.log("ifcondition");
    var err = {
      status: 400,
      message: "Fields should not be empty"
    };
    callback(err);
  } else {
    var Attendance = await Result.Attendance_select(trainer_id);
    console.log("Attendance", Attendance);
    if (Attendance.message.length == 0) {
      var error = {
        status: 400,
        message: "Record not found"
      };
      callback(error);
    } else {
      console.log("attendance", Attendance.message.length);

      var date_attended;
      for (i = 0; i < Attendance.message.length; i++) {
        // console.log("attendance", Attendance.length);
        var cert = Attendance.message[i].Attended_date;
        date_attended = moment(cert).format("YYYY/MM/DD");
        Attendance.message[i].Attended_date = date_attended;
        // var res = [];
        // await res.push(Attendance.message[i]);
        // console.log(res);
        // res[i]["Attended_date"] = date_attended;
        // console.log("date", res);``
        // console.log("result", cert);
      }

      var result = {
        status: 200,
        message: Attendance
      };
      callback(result);
    }
  }
}

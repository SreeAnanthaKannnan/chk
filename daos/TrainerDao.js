const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");



//===============Checking the trainer email in the trainer table===start======
async function Trainer_information(params) {
  console.log("DAO_Trainer_information_params======>", params);
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection
      .query_execute(query.verify_email, params)

    if (res.data.errno) {
      //console.log("something", err);
      return reject({ status: 400, message: "something went wrong" });
    } else {
      //console.log({ result: result });
      return resolve({ status: 200, message: res });
    }
  });

}
//===============Checking the trainer email in the trainer table===End======






function email_otp_update(params1, params2) {
  console.log(params1, "params1");
  console.log(params2, "params2");

  return new Promise(function (resolve, reject) {
    var verify_email = "Y";
    // var sql ="UPDATE Residents SET verify_email = '" + verify_email + "' WHERE email_id = '" + params + "'";
    var sql =
      "UPDATE Trainer SET otp = '" +
      params1 +
      "' WHERE Email_ID = '" +
      params2 +
      "'";
    con.query(sql, function (err, result) {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        //  console.log(result,"achieved")
        return resolve({ result });
      }
    });
  });
}
async function Trainer_email_otp_verification(params) {
  return new Promise(function (resolve, reject) {
    // console.log("achie")
    con.query(
      "SELECT * FROM Trainer_Profile where otp ='" + params + "'",
      (err, result) => {
        if (err) {
          return resolve(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
}
function password_update(params1, params2) {
  console.log(params1, "params1");
  console.log(params2, "params2");

  return new Promise(function (resolve, reject) {
    var sql =
      "UPDATE Trainer SET Password = '" +
      params1 +
      "' WHERE otp = '" +
      params2 +
      "'";
    con.query(sql, function (err, result) {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      }
      // callback(false, results);
      else {
        //  console.log(result,"achieved")
        return resolve({ result });
      }
    });
  });
}
//=================================================================================================//
function Trainer_names_display(language) {
  return new Promise(async function(resolve, reject) {
    console.log("language===>",language)

    if(language=="en"){
    await con.query("SELECT id,Name_en FROM Trainer ", (err, result) => {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result.length, "name");
        let value = [];
        let myobject = new Object();
        for (i = 0; i < result.length; i++) {
          //    let b= myobject[result[i].name] ;
          //     // value.push(myobject[result[i].name])
          //     console.log(b,"value===========>")
          //     value.push (b)
          var data = {};
          data = { id: result[i].id, name: result[i].Name_en };
          value.push(data);
        }
        console.log(value, "value");

        return resolve({ result: value });
      }
    });
  }
    //  param = moment(param).format("YYYY-MM-DD")
    //  console.log(param,"date")
  else{
    await con.query("SELECT id,Name_ar FROM Trainer ", (err, result) => {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result.length, "name");
        let value = [];
        let myobject = new Object();
        for (i = 0; i < result.length; i++) {
          //    let b= myobject[result[i].name] ;
          //     // value.push(myobject[result[i].name])
          //     console.log(b,"value===========>")
          //     value.push (b)
          var data = {};
          data = { id: result[i].id, name: result[i].Name_ar };
          value.push(data);
        }
        console.log(value, "value");

        return resolve({ result: value });
      }
    });
  }
  });

}
//===========================================================================================//
function employee_attendence(
  param,
  param1,
  param2,
  param3,
  param4,
  param5,
  param6,
  param7
) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", param);
    //  param = moment(param).format("YYYY-MM-DD")
    //  console.log(param,"date")
    console.log("param", param);
    param = [param, param1, param2, param3, param4, param5, param6, param7];

    sql =
      "INSERT INTO Trainer (employee_id,attendance_status,National_id,Name_en,trainer_id,Attended,time_slots,classroom) VALUES ?";
    await con.query(sql, [param], function (err, result) {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result);
        return resolve({ result: result });
      }
    });
  });
}
//=============================================================================================//
//===========================================================================================//
function Trainer_insert(param) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", param);
    //  param = moment(param).format("YYYY-MM-DD")
    //  console.log(param,"date")
    console.log("param", param);
    param = [param];

    sql =
      "INSERT INTO Trainer (Name_en,Name_ar,trainer_email_id,password,reg_date,course_name_en,course_name_ar,otp,Trainer_id) VALUES ?";
    await con.query(sql, [param], function (err, result) {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result);
        return resolve({ result: result });
      }
    });
  });
}
//=============================================================================================//
function Trainer_id_select(params, language) {
  return new Promise(async function (resolve, reject) {
    //  param = moment(param).format("YYYY-MM-DD")
    console.log(params, "date");
    if (language == "en") {
      var res1= await mysqlConnection
        .query_execute(query.trainerid,[params])
      console.log(res1,"dbresult")
      if(res1.data.errno){
          return reject("something went wrong")
      }
      else{
        return resolve({ status: 200, result: res1.data});
      }
    } else {
      
   
      var res1= await mysqlConnection
        .query_execute(query.trainerid_ar,[params])
      console.log(res1,"dbresult")
      if(res1.data.errno){
          return reject("something went wrong")
      }
      else{
        return resolve({ status: 200, result: res1.data});

      }
      
     
    }
  });
}


//==============================Trainer date select ===Start=============
async function Scheduler_date_select(params, params1, params2, params3) {
  console.log("DAO_params======>", params);
  console.log("DAO_params1======>", params1);
  console.log("DAO_params2======>", params2);
  console.log("DAO_params3======>", params3);
  var paramsval = [params, params1, params2, params3]

  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection
      .query_execute(query.getschedulerdateselect, paramsval)
    console.log("res===>>>", res)
    if (res.data.errno) {
      //console.log("something", err);
      return reject({ status: 400, message: "something went wrong" });
    } else {
      //console.log({ result: result });
      return resolve({ status: 200, message: res });
    }

  });

}
//==============================Trainer date select ===end=============


//==================================sending trainer ID to the scheduler table===start===========
async function Scheduler_information(params) {
  console.log("DAO_Scheduler_information_params======>", params);
  return new Promise(async function (resolve, reject) {
    var res = await mysqlConnection
      .query_execute(query.getschedule, params)

    if (res.data.errno) {
      return reject({ status: 400, message: "something went wrong" });
    } else {
      //console.log({ result: result });
      return resolve({ status: 200, message: res });
    }

  });

}
//==================================sending trainer ID to the scheduler table===END===========





function trainer_name_schedule(trainer_id, language) {
  return new Promise(async function (resolve, reject) {
    //  param = moment(param).format("YYYY-MM-DD")
    if (language == "en") {
      let sql = "SELECT Name_en FROM Trainer where id = ?";
      await con.query(sql, [trainer_id], function (err, result) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          return resolve({ result: result });
        }
      });
    } else {
      let sql = "SELECT Name_ar FROM Trainer where id = '" + trainer_id + "'";
      con.query(sql, function (err, result) {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          return resolve({ result: result });
        }
      });
    }
  });
}
async function get_employee_list(params) {
  return new Promise(async function (resolve, reject) {
    mysqlConnection
      .query_execute(query.getemployeedetails, [params])
      .then(function (result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, message: result });
        }
      });
  });
}

async function Trainer_attendence_list(
  params,
  params1,
  params2,
  params3,
  params4,
  params5,
  params6,
  params7,
  params8,
  params9
) {
  return new Promise(async function (resolve, reject) {
    var values = [
      params,
      params1,
      params2,
      params3,
      params4,
      params5,
      params6,
      params7,
      params8,
      params9
    ];

    var res = await mysqlConnection
      .insert_query(query.insertattendance, values)
    console.log("Res========>>", res)
    if (res.data.errno) {
      //console.log("something", err);
      return reject({ status: 400, message: "something went wrong" });
    } else if (res) {
      //console.log(result);
      return resolve({ status: 200, message: res });
    } else {
      return resolve({ status: 401, message: res });
    }

  });
}

module.exports = {
  Trainer_information: Trainer_information,
  email_otp_update: email_otp_update,
  Trainer_email_otp_verification: Trainer_email_otp_verification,
  password_update: password_update,
  Trainer_names_display: Trainer_names_display,
  Trainer_insert: Trainer_insert,
  Trainer_id_select: Trainer_id_select,
  Scheduler_information: Scheduler_information,
  Scheduler_date_select: Scheduler_date_select,
  get_employee_list: get_employee_list,
  employee_attendence: employee_attendence,
  Trainer_attendence_list: Trainer_attendence_list,
  trainer_name_schedule: trainer_name_schedule
};

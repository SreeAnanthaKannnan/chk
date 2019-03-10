// const con = require("../config/DBConfig");
const con = require("../mysql_connection/dbConfig");

// const mysqlConnection = require("../config/Connection");
const mysqlConnection = require("../mysql_connection/connection");

const query = require("../mysql_connection/queries");
// const mysqlConnection = require("../config/config_test");

function Employee_insert(params) {
  return new Promise(function(resolve, reject) {
    // console.log("hiiiii",params)
    mysqlConnection
      .insert_query(query.insertemployee, params)
      .then(function(result, err) {
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

function Safety_officer_details(params) {
  return new Promise(function(resolve, reject) {
    params = [params];
    con.query(
      "SELECT * FROM Employee_Profile where Company_Trade_Lincense_No ='" +
        params[0][0] +
        "'" +
        "and Category ='" +
        params[0][1] +
        "'",
      (err, result) => {
        console.log(result, "result");
        if (err) {
          return resolve(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
}
//===============================================================================================//
function Other_employee_details(params) {
  return new Promise(function(resolve, reject) {
    params = [params];
    con.query(
      "SELECT * FROM Employee_Profile where Company_Trade_Lincense_No ='" +
        params[0][0] +
        "'" +
        "and Category ='" +
        params[0][1] +
        "'",
      (err, result) => {
        console.log(result, "result");
        if (err) {
          return resolve(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
}

//===============================================================================================//
async function Employee_select(params) {
  return new Promise(async function(resolve, reject) {
    mysqlConnection
      .query_execute(query.findemployee, [params])
      .then(function(result, err) {
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
//===============================================================================================//

async function Photo_upload(params) {
  return new Promise(async function(resolve, reject) {
    params = [params];
    sql =
      "UPDATE Employee_Profile SET profile_photo_url ='" +
      params[0][0] +
      "' where Employee_ID ='" +
      params[0][1] +
      "'";
    await con.query(sql, [params], function(err, result) {
      if (!result) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result);
        return resolve({ status: 200, result: result });
      }
    });
  });
}
//================================trainee_list_for_training_trainer_view=========================//
async function trainee_list(params) {
  return new Promise(async function(resolve, reject) {
    await con.query(
      "SELECT * FROM Employee_Profile where Employee_ID ='" + params + "'",
      (err, result) => {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, message: result });
        }
      }
    );
  });
}
//============================================================================================//
async function Booking_for_training(Employee_data) {
  // Employee_data =[Employee_data]
  console.log(Employee_data.length, "Employee_Data");

  return new Promise(async function(resolve, reject) {
    for (i = 0; i < Employee_data.length; i++) {
      let sql =
        "UPDATE Employee_Profile SET  assigned_for_training='" +
        "Booked" +
        "' where Employee_ID ='" +
        Employee_data[i] +
        "'";
      // let sql = "UPDATE Employee_Profile SET  assigned_for_training=? where Employee_ID =?"
      console.log(Employee_data[i], "i the details");
      await con.query(sql, [Employee_data[i]], function(err, result) {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, result: result });
        }
      });
    }
  });
}
//==================================================================================================//

// function Trained_Employees_list(Company_Trade_Lincense_No, language, status) {
//   return new Promise(async function(resolve, reject) {
//     if (language == "en") {
//       console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
//       console.log(status,"status")

//       var res1 = await mysqlConnection.query_execute(
//         "select * from Employee_Profile where Company_Trade_Lincense_No=? and National_ID in (select emirates_id from Results where result_en=?) ",
//         [Company_Trade_Lincense_No, status]
//       );
//       console.log("res1===>", res1.data[0].Employee_ID);
//       return resolve({ result: res1.data });
//     } else {
//       console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

//       var res1 = await mysqlConnection.query_execute(
//         "select * from Employee_Profile where Company_Trade_Lincense_No=? and National_ID in (select emirates_id from Results where result_ar=?) ",
//         [Company_Trade_Lincense_No, status]
//       );
//       console.log("res1===>", res1);
//       return resolve({ result: res1.data });
//     }
//   });
// }
//=======================================================================================//
function Employee_update(Emirates_ID, Company_Trade_Lincense_No, language) {
  return new Promise(async function(resolve, reject) {
    if (language == "en") {
      console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
      console.log(Emirates_ID, "Emirates_ID");
      for (i = 0; i < Emirates_ID.length; i++) {
        var res1 = await mysqlConnection.query_execute(
          "update Employee_Profile set assigned_for_training =? where Company_Trade_Lincense_No = ? and National_Id =?",
          ["Booked", Company_Trade_Lincense_No, Emirates_ID[i]]
        );
        console.log("res1===>", res1.data);
      }
      return resolve({ result: res1.data });
    }
  });
}

//===========================================================================================
function Untrained_Employees_schedule(Company_Trade_Lincense_No, language) {
  return new Promise(async function(resolve, reject) {
    if (language == "en") {
      var res2 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ",
        ["pass","NO",Company_Trade_Lincense_No, "Others"]
      );
      console.log("kavitha", res2.data);
      return resolve({ result: res2.data });
    } else {
      console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

      var res2 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ",
        ["pass","NO",Company_Trade_Lincense_No, "Others"]
      );
      console.log("res1===>", res2);
      return resolve({ result: res2.data });
    }
  });
}
//================================Delete the employee=========================//
async function delete_Employee(params) {
  return new Promise(async function(resolve, reject) {
    mysqlConnection
      .query_execute(query.deleteemployee, [params])
      .then(function(result, err) {
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
//=================================================================================================//
function Employee_name_schedule(value, language) {
  return new Promise(async function(resolve, reject) {
    console.log(value, "<=============params_values");

    if (language == "en") {
      var myresult = [];
      console.log(value.length, "lengthhhhhhhhh");
      for (i = 0; i < value.length; i++) {
        Emirates_ID = value[i];

        await mysqlConnection
          .query_execute(
            "select Name_en from Employee_Profile where National_Id =?",
            [Emirates_ID]
          )
          .then(async function(result, err) {
            myresult.push(result.data[0].Name_en);
            console.log("kavitha1", result.data);
          })
          .catch(async function(err) {
            console.log(err, "err");
            return resolve({ status: 400, message: "something went wrong" });
          });
      }
      console.log(myresult, "<=========myresult");
      return resolve({ result: myresult });
    } else {
      var myresult = [];
      console.log(value.length, "lengthhhhhhhhh");
      for (i = 0; i < value.length; i++) {
        Emirates_ID = value[i];

        await mysqlConnection
          .query_execute(
            "select Name_ar from Employee_Profile where National_Id =?",
            [Emirates_ID]
          )
          .then(async function(result, err) {
            myresult.push(result.data[0].Name_ar);
            console.log("kavitha1", result.data);
          })
          .catch(async function(err) {
            console.log(err, "err");
            return resolve({ status: 400, message: "something went wrong" });
          });
      }
      console.log(myresult, "<=========myresult");
      return resolve({ result: myresult });
    }
  });
}
//==============================================================================================//
function trainer_id(trainer_name, language) {
  return new Promise(async function(resolve, reject) {
    if (language == "en") {
      var res2 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where  Company_Trade_Lincense_No=? and Category=? and  National_Id not in(select National_Id from Results where result_en=?) ",
        [Company_Trade_Lincense_No, "Others", "pass"]
      );
      console.log("kavitha", res2.data);
      return resolve({ result: res2.data });
    } else {
      console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

      var res1 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ",
        [Company_Trade_Lincense_No, status]
      );
      console.log("res1===>", res1);
      return resolve({ result: res1.data });
    }
  });
}
//===============================================================================================//
async function notbooked_employee_list() {
  return new Promise(async function(resolve, reject) {
    mysqlConnection
      .query_execute("SELECT * from Employee_Profile where Category=? and assigned_for_training <> ? ", ["Others","Booked"])
      .then(function(result, err) {
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
//=================================================================================================//
function Untrained_Employees_list(Company_Trade_Lincense_No, language) {
  return new Promise(async function(resolve, reject) {
    if (language == "en") {
      var res2 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ",
        ["pass","NO",Company_Trade_Lincense_No, "Others"]
      );
      console.log("kavitha", res2.data);
      return resolve({ result: res2.data });
    } else {
      console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

      var res1 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ",
        [Company_Trade_Lincense_No, status]
      );
      console.log("res1===>", res1);
      return resolve({ result: res1.data });
    }
  });
}
//===============================================================================================//
function Trained_Employees_list(Company_Trade_Lincense_No,language,status) {

  return new Promise( async function (resolve,reject){
      if (language == 'en'){  
    console.log("Company_Trade_Lincense_No",Company_Trade_Lincense_No)
  
              var res1= await mysqlConnection.query_execute("select * from Employee_Profile where Company_Trade_Lincense_No=? and National_Id in (select National_Id from Results where result_en=?) ",[Company_Trade_Lincense_No,status])
    console.log("res1===>",res1)
              return resolve({result:res1.data})
          }
           else{
              console.log("Company_Trade_Lincense_No",Company_Trade_Lincense_No)
  
              var res1= await mysqlConnection.query_execute("select * from Employee_Profile where Company_Trade_Lincense_No=? and National_Id in (select National_Id from Results where result_ar=?) ",[Company_Trade_Lincense_No,status])
    console.log("res1===>",res1)
              return resolve({result:res1.data})
           }
  })
  
}
function number_validation_schedule(Company_Trade_Lincense_No) {

  return new Promise( async function (resolve,reject){
      
    console.log("Company_Trade_Lincense_No",Company_Trade_Lincense_No)
  
    var res2 = await mysqlConnection.query_execute(
      "select count(National_Id) as count from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ",
      ["pass","NO",Company_Trade_Lincense_No, "Others"]
    );
              return resolve({result:res2.data})
          
          
              
           
  })
  
}

module.exports = {
  Employee_insert: Employee_insert,
  Safety_officer_details: Safety_officer_details,
  Other_employee_details: Other_employee_details,
  Employee_select: Employee_select,
  delete_Employee: delete_Employee,
  Booking_for_training: Booking_for_training,
  Trained_Employees_list: Trained_Employees_list,
  Untrained_Employees_schedule: Untrained_Employees_schedule,
  Employee_update: Employee_update,
  Employee_name_schedule: Employee_name_schedule,
  trainer_id : trainer_id,
  notbooked_employee_list : notbooked_employee_list,
  Untrained_Employees_list : Untrained_Employees_list
  //Photo_upload : Photo_upload
};

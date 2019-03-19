const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/connection");

const query = require("../mysql_connection/queries");

function Employee_insert(params) {
    return new Promise(async function(resolve, reject) {
        /*====================inserting employee's data into employee_Profile table========*/
        var res1 = await mysqlConnection
            .insert_query(query.insertemployee, params)
        /*==========db error capturing================*/
        if (res1.data.errno) {
            return reject("something went wrong")
        } else {
            // console.log(result);
            return resolve({
                status: 200,
                message: res1
            });
        }

    });
}
/*====================Safety officer details show up==============================*/
function Safety_officer_details(params) {
    return new Promise(async function(resolve, reject) {
        params = [params];
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.selectingemployeeprofile, [params[0][0], params[0][1]])

        /*======================db error catpturing===========================*/
        if (res1.data.errno) {
            return reject({
                err: "something went wrong"
            })
        } else {
            return resolve({
                result: res1
            });
        }
    });

}
//===============================================================================================//
async function Employee_select(params) {
    return new Promise(async function(resolve, reject) {
        /*==================Selecting employee data from employee_profile table=================*/
        var res1 = await mysqlConnection
            .query_execute(query.findemployee, [params])
        /*===================db error capturing====================*/
        if (res1.data.errno) {
            return resolve({
                status: 400,
                err: "Internal server Error"
            });

        } else {
            return resolve({
                status: 200,
                message: res1
            });
        }
        //});
    });
}

//=======================================================================================//
function Employee_update(Emirates_ID, Company_Trade_Lincense_No, language) {
    return new Promise(async function(resolve, reject) {
        if (language == "en") {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
            console.log(Emirates_ID, "Emirates_ID");
            for (i = 0; i < Emirates_ID.length; i++) {
                /*=================updating the employee table for specific emirates id for assigned for training  as booked =========*/
                var res1 = await mysqlConnection.query_execute(
                    query.employeeupdate, ["Booked", Company_Trade_Lincense_No, Emirates_ID[i]]
                );
                /*==============db error capture====================*/
                if (res1.data.errno) {
                    return resolve({
                        status: 400,
                        err: "Internal server Error"
                    });

                }
                console.log("res1===>", res1.data);
            }
            return resolve({
                result: res1.data
            });
        }
    });
}

//===========================================================================================
function Untrained_Employees_schedule(Company_Trade_Lincense_No, language) {
    return new Promise(async function(resolve, reject) {
        if (language == "en") {
            /*================selecting employees whoare not passed and assigned for training is NO=======*/
            var res2 = await mysqlConnection.query_execute(
                query.untrainedschedule, ["pass", "NO", Company_Trade_Lincense_No, "Others"]
            );
            return resolve({
                result: res2.data
            });
        }
        if (language == "ar") {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
            /*==================selecting employee list those are not passed and assigned for training is NO======*/
            var res2 = await mysqlConnection.query_execute(
                query.untrainedschedule, ["pass", "NO", Company_Trade_Lincense_No, "Others"]
            );
            console.log("res1===>", res2);
            return resolve({
                result: res2.data
            });
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
                    return resolve({
                        status: 400,
                        err: err
                    });
                } else {
                    console.log(result);
                    return resolve({
                        status: 200,
                        message: result
                    });
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
            /*=================Executes the for loop till the number of employee id from the core=========*/
            for (i = 0; i < value.length; i++) {
                /*===================assigning the value[i] which is the input employeeid from the core to Emirates_ID varaible=======*/
                Emirates_ID = value[i];
                /*==============selecting employee names for the particular emirates id=============*/
                var res1 = await mysqlConnection
                    .query_execute(
                        query.employeenameschedule, [Emirates_ID]
                    )
                /*=======================Db error capture====================*/
                if (res1.data.errno) {
                    return resolve({
                        status: 400,
                        err: "Internal server Error"
                    });
                } else {
                    /*================pusing the employee names in english in the array myresult=======*/
                    myresult.push(res1.data[0].Name_en);

                }

                console.log(myresult, "<=========myresult");
            }

            return resolve({
                result: myresult
            });

        }
        if (language == "ar") {
            var myresult = [];
            /*=================Executes the for loop till the number of employee id from the core=========*/

            for (i = 0; i < value.length; i++) {
                /*===================assigning the value[i] which is the input employeeid from the core to Emirates_ID varaible=======*/

                Emirates_ID = value[i];
                /*==============selecting employee names for the particular emirates id=============*/

                var res1 = await mysqlConnection
                    .query_execute(
                        query.employeenameschedulearabic, [Emirates_ID]
                    )
                /*================db error capture==================*/
                if (res1.data.errno) {
                    return resolve({
                        status: 400,
                        err: "Internal server Error"
                    });
                } else {
                    /*=================pushing the arabic names of the particular emirates id into the myresult array======*/

                    myresult.push(res1.data[0].Name_ar);

                }

                console.log(myresult, "<=========myresult");
            }
            return resolve({
                result: myresult
            });
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
            return resolve({
                result: res2.data
            });
        } else {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

            var res1 = await mysqlConnection.query_execute(
                "select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ",
                [Company_Trade_Lincense_No, status]
            );
            console.log("res1===>", res1);
            return resolve({
                result: res1.data
            });
        }
    });
}

//=================================================================================================//
function Untrained_Employees_list(Company_Trade_Lincense_No, language) {
    return new Promise(async function(resolve, reject) {
        if (language == "en") {
            var res2 = await mysqlConnection.query_execute(
                "select * from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ",
                ["pass", "NO", Company_Trade_Lincense_No, "Others"]
            );
            return resolve({
                result: res2.data
            });
        } else {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

      var res1 = await mysqlConnection.query_execute(
        query.untrained_employees,
        [Company_Trade_Lincense_No, status]
      );
      console.log("res1===>", res1);
      return resolve({ result: res1.data });
    }
  });
}
//===============================================================================================//
function Trained_Employees_list(Company_Trade_Lincense_No, language, status) {
  return new Promise(async function(resolve, reject) {
    /* Selecting the Company Trade License No. and National Id from "Employee_Profile" table and checking that same National Id from "Results" table */
    if (language == "en") {
      var res1 = await mysqlConnection.query_execute(
        query.trained_employees,
        [Company_Trade_Lincense_No, status]
      );
      // Result throwed 
      return resolve({ result: res1.data });
    } 
    if (language == "ar") {
      var res1 = await mysqlConnection.query_execute(
        "select * from Employee_Profile where Company_Trade_Lincense_No=? and National_Id in (select National_Id from Results where result_ar=?) ",
        [Company_Trade_Lincense_No, status]
      );
      return resolve({ result: res1.data });
    }
  });
}

//================================================================================================
function number_validation_schedule(Company_Trade_Lincense_No) {
    return new Promise(async function(resolve, reject) {
        console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
        /*=================count the number of employees who are not passed and assigned for training is NO========*/
        var res2 = await mysqlConnection.query_execute(
            query.numbervalidation, ["pass", "NO", Company_Trade_Lincense_No, "Others"]
        );
        /*=================db error capture==================*/
        if (res2.data.errno) {
            return resolve({
                status: 400,
                err: "Internal server Error"
            });

        } else {
            return resolve({
                result: res2.data
            });
        }
    });
}
//==================================Trainer_attendance =============================================================//

async function national_id(Emirates_ID, class_id) {
    return new Promise(async function(resolve, reject) {
        let length = Emirates_ID.length;
        var obj = {};
        var value = [];
        for (i = 0; i < length; i++) {
            let res = await mysqlConnection.query_execute(query.findemployee, [
                Emirates_ID[i]
            ]);
            console.log(res, "responsedao====>");
            obj = {
                classroomID: class_id,
                data_value: res.data[0]
            };
            value.push(obj);
        }
        return resolve({
            result: value
        });
    });
}

module.exports = {
    Employee_insert: Employee_insert,
    Safety_officer_details: Safety_officer_details,
    Employee_select: Employee_select,
    delete_Employee: delete_Employee,
    Trained_Employees_list: Trained_Employees_list,
    Untrained_Employees_schedule: Untrained_Employees_schedule,
    Employee_update: Employee_update,
    Employee_name_schedule: Employee_name_schedule,
    trainer_id: trainer_id,
    Untrained_Employees_list: Untrained_Employees_list,
    number_validation_schedule: number_validation_schedule,
    national_id: national_id

};
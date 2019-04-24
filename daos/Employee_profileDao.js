const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/connection");
var log4js = require('log4js');

const logger = log4js.getLogger("SPSA_project");

const query = require("../mysql_connection/queries");

function Employee_insert(params) {
    return new Promise(async function (resolve, reject) {
        /*====================inserting employee's data into employee_Profile table========*/
        var res1 = await mysqlConnection
            .insert_query(query.insertemployee, params)
        console.log(res1, "err===>")
        /*==========db error capturing================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"DB error while inserting employee data into the table")
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            // console.log(result);
            return resolve({
                status: 200,
                message: res1
            });
        }

    });
}
function emirates(params) {
    return new Promise(async function (resolve, reject) {
        /*====================inserting employee's data into employee_Profile table========*/
        var res1 = await mysqlConnection
            .insert_query(query.employeecheck, params)
        console.log(res1, "err===>")
        /*==========db error capturing================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"DB error while inserting employee data into the table")
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
             console.log(res1,"in 46 dao");
            return resolve({
                status: 200,
                message: res1.data
            });
        }

    });
}
/*====================Safety officer details show up==============================*/
function Safety_officer_details(params) {
    return new Promise(async function (resolve, reject) {
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
    return new Promise(async function (resolve, reject) {
        /*==================Selecting employee data from employee_profile table=================*/
        var res1 = await mysqlConnection
            .query_execute(query.findemployee, [params])
        /*===================db error capturing====================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"db error while existence of employee in the Employee_Profile table")
            return reject({
                status: 400,
                message: "something went wrong"
            })
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
    return new Promise(async function (resolve, reject) {
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
                    return reject({
                        status: 400,
                        message: "something went wrong"
                    })
                }
                console.log("res1===>", res1.data);
            }
            return resolve({
                result: res1.data
            });
        }
        if (language == "ar") {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
            console.log(Emirates_ID, "Emirates_ID");
            for (i = 0; i < Emirates_ID.length; i++) {
                /*=================updating the employee table for specific emirates id for assigned for training  as booked =========*/
                var res1 = await mysqlConnection.query_execute(
                    query.employeeupdate, ["Booked", Company_Trade_Lincense_No, Emirates_ID[i]]
                );
                /*==============db error capture====================*/
                if (res1.data.errno) {
                    return reject({
                        status: 400,
                        message: "something went wrong"
                    })
                }
                console.log("res1===>", res1.data);
            }
            return resolve({
                result: res1.data
            });
        }

    });
}
//============================================================================================
function Employeepay_update(Emirates_ID, Company_Trade_Lincense_No, language) {
    return new Promise(async function (resolve, reject) {
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
                    return reject({
                        status: 400,
                        message: "something went wrong"
                    })
                }
                console.log("res1===>", res1.data);
            }
            return resolve({
                result: res1.data
            });
        }
        if (language == "ar") {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
            console.log(Emirates_ID, "Emirates_ID");
            for (i = 0; i < Emirates_ID.length; i++) {
                /*=================updating the employee table for specific emirates id for assigned for training  as booked =========*/
                var res1 = await mysqlConnection.query_execute(
                    query.employeeupdate, ["Booked", Company_Trade_Lincense_No, Emirates_ID[i]]
                );
                /*==============db error capture====================*/
                if (res1.data.errno) {
                    return reject({
                        status: 400,
                        message: "something went wrong"
                    })
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
    return new Promise(async function (resolve, reject) {
        if (language == "en") {
            /*================selecting employees whoare not passed and assigned for training is NO=======*/
            var res2 = await mysqlConnection.query_execute(
                query.untrainedschedule, ["pass", "NO", Company_Trade_Lincense_No, "Others"]
            );
            if (res2.data.errno) {
                return reject({
                    status: 400,
                    message: "something went wrong"
                })
            }
            else {

                return resolve({
                    result: res2.data
                });
            }
        }
        if (language == "ar") {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
            /*==================selecting employee list those are not passed and assigned for training is NO======*/
            var res2 = await mysqlConnection.query_execute(
                query.untrainedschedule, ["pass", "NO", Company_Trade_Lincense_No, "Others"]
            );
            if (res2.data.errno) {
                return reject({
                    status: 400,
                    message: "something went wrong"
                })
            }
            else {
                console.log("res1===>", res2);
                return resolve({
                    result: res2.data
                });
            }
        }
    });
}
//================================Delete the employee=========================//
async function delete_Employee(params) {
    return new Promise(async function (resolve, reject) {
        mysqlConnection
            .query_execute(query.deleteemployee, [params])
            .then(function (result, err) {
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
    return new Promise(async function (resolve, reject) {
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

                    // }

                    console.log(myresult, "<=========myresult");
                }

                return resolve({
                    result: myresult
                });
            }

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
                    return reject({
                        status: 400,
                        message: "something went wrong"
                    })
                } else {
                    /*=================pushing the arabic names of the particular emirates id into the myresult array======*/

                    myresult.push(res1.data[0].Name_ar);

                    //}

                    console.log(myresult, "<=========myresult");
                }
                return resolve({
                    result: myresult
                });
            }
        }
    });
}
//==============================================================================================//
function trainer_id(trainer_name, language) {
    return new Promise(async function (resolve, reject) {
        if (language == "en") {
            var res2 = await mysqlConnection.query_execute(
                "select * from Employee_Profile where  Company_Trade_Lincense_No=? and Category=? and  National_Id not in(select National_Id from Results where result_en=?) ",
                [Company_Trade_Lincense_No, "Others", "pass"]
            );
            if (res1.data.errno) {
                return reject({
                    status: 400,
                    message: "something went wrong"
                })
            }
            else {
                return resolve({
                    result: res2.data
                });
            }
        }
        if (language == "ar") {
            console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);

            var res1 = await mysqlConnection.query_execute(
                "select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ",
                [Company_Trade_Lincense_No, status]
            );
            if (res1.data.errno) {
                return reject({
                    status: 400,
                    message: "something went wrong"
                })
            }
            else {
                console.log("res1===>", res1);
                return resolve({
                    result: res1.data
                });
            }
        }
    });
}
function order_id_select() {
    return new Promise(async function (resolve, reject) {
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.order_id_select, [])

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
async function not_interested() {
    return new Promise(async function (resolve, reject) {
        /*==================Selecting employee data from employee_profile table=================*/
        var res1 = await mysqlConnection
            .query_execute(query.not_interested, ["NoInterest"])
        /*===================db error capturing====================*/
        if (res1.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            return resolve({
                status: 200,
                message: res1
            });
        }
        //});
    });
}
async function update_order_id(order_id, national_id_array) {
    return new Promise(async function (resolve, reject) {
        /*===============selecting saftery officer category=====================*/
        for (i = 0; i < national_id_array.length; i++) {
            var res1 = await mysqlConnection
                .query_execute(query.update_order_id, [order_id, national_id_array[i]])
            console.log(res1, "database result")
        }

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

//=================================================================================================//
function Untrained_Employees_list(Company_Trade_Lincense_No, language) {
    return new Promise(async function (resolve, reject) {
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
    return new Promise(async function (resolve, reject) {
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
    return new Promise(async function (resolve, reject) {
        console.log("Company_Trade_Lincense_No", Company_Trade_Lincense_No);
        /*=================count the number of employees who are not passed and assigned for training is NO========*/
        var res2 = await mysqlConnection.query_execute(
            query.numbervalidation, ["pass", "NO", Company_Trade_Lincense_No, "Others"]
        );
        /*=================db error capture==================*/
        if (res2.data.errno) {
            return reject({
                status: 400,
                message: "something went wrong"
            })
        } else {
            return resolve({
                result: res2.data
            });
        }
    });
}
//==================================Trainer_attendance =============================================================//

async function national_id(Emirates_ID, class_id) {
    return new Promise(async function (resolve, reject) {
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
//===========================================================================================//
async function Employee_grid_view() {
    //console.log("id",id)
    return new Promise(async function (resolve, reject) {
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.employee_grid_view)
        console.log("res123====>", res1)
        /*======================db error catpturing===========================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"Db error while getting the employee details for data grid for calcenter salama")
            return reject({
                err: "something went wrong"
            })
        } else {
            console.log("res1========>", res1)
            return resolve({
                result: res1
            });
        }
    });

}
async function Employee_grid_view1(order_id) {
    console.log("order_id_DAO", order_id)
    return new Promise(async function (resolve, reject) {
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.employee_grid_view1, [order_id])
        console.log("res1============>>>", res1)
        /*======================db error catpturing===========================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"db error while selecting the employee detail based on order_id for data grid view")
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

async function Employee_grid_view2(national_id) {
    //console.log("id",id)
    return new Promise(async function (resolve, reject) {
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.employee_grid_view2)
        console.log("res123====>", res1)
        /*======================db error catpturing===========================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"db error while selecting the employee details for data grid view baed on the national_id")
            return reject({
                err: "something went wrong"
            })
        } else {
            console.log("res1========>", res1)
            return resolve({
                result: res1
            });
        }
    });

}
async function employeedetails(employeedetails) {
    console.log("DAO====>", employeedetails)
    return new Promise(async function (resolve, reject) {
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.find_employee, employeedetails)
        console.log("res=======>>>", res1)
        /*======================db error catpturing===========================*/
        if (res1.data.errno) {
            logger.fatal(res1.data.sqlMessage,"db error while fetching employee details for data grid view")
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
async function Employee_grid_view2(certificate_issue1,certificate_status_emp,result) {
    //console.log("id",id)
    return new Promise(async function (resolve, reject) {
        var params = [certificate_issue1]
        /*===============selecting saftery officer category=====================*/
        var res1 = await mysqlConnection
            .query_execute(query.employee_grid_view2,params)
        console.log("res1============>>>", res1)
        console.log("res2============>>>", res1.data[0].certificate_status_emp)

        
    //  if(res1.data[0]==null) 
         {
            console.log("lklkl======")
        var params = [certificate_status_emp,result,certificate_issue1]
         console.log(params,"uuuuuuuuuuuuu")
        
        var res1 = await mysqlConnection
            .query_execute(query.employee_grid_view3,params)
        console.log("res123====>", res1)

        /*======================db error catpturing===========================*/
        if (res1.data.errno) {
            return reject({
                err: "something went wrong"
            })
        } else {
            console.log("res1========>", res1)
            return resolve({
                result: res1
            });
        }
    }
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
    national_id: national_id,
    Employee_grid_view: Employee_grid_view,
    Employee_grid_view1: Employee_grid_view1,
    Employee_grid_view2: Employee_grid_view2,
    employeedetails: employeedetails,
    not_interested: not_interested,
    order_id_select: order_id_select,
    update_order_id: update_order_id,
    emirates:emirates


};

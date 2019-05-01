var fs = require("fs");
const uploaddao = require("../daos/uploaddao");
const checktoken = require("../utils/checkToken");
let moment = require("moment");
var dateFormat = require('dateformat');
function upload_aman_web(filename, token, email_id) {
    console.log("body ", token);
    return new Promise(async function (resolve, reject) {
        var verifytoken = await checktoken.checkToken(token);
        if (verifytoken.status == 405) {
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            });
        } else if (verifytoken.status == 403) {
            console.log("session expired");
            return resolve({
                status: verifytoken.status,
                message: verifytoken.message
            });
        } else {
            console.log(filename, "filename=====core===>");

            await fs.readFile(filename, { encoding: "utf-8" }, async function (
                err,
                data
            ) {
                if (err) {
                    throw err;
                }

                var XLSX = require("xlsx");
                var workbook = XLSX.readFile(filename);
                var sheet_name_list = workbook.SheetNames;
                console.log("sheet_name", sheet_name_list);
                sheet_name_list.forEach(async function (y) {
                    if (y == "Building Lists") {
                        var worksheet = workbook.Sheets[y];
                        var headers = {};
                        var data = [];
                        {
                            for (z in worksheet) {
                                if (z[0] === "!") continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                }
                                var col = z.substring(0, tt);
                                var row = parseInt(z.substring(tt));
                                var value = worksheet[z].v;

                                //store header names
                                if (row == 1 && value) {
                                    headers[col] = value;
                                    continue;
                                }

                                if (!data[row]) data[row] = {};
                                data[row][headers[col]] = value;
                            }
                            data.shift();
                            data.shift();


                            if (err) {
                                var error = {
                                    // statuscode: "E08",
                                    status: 500,
                                    message: "Something went wrong"
                                };
                                throw error;
                            } else if (data.length != 0) {
                                console.log("length", data.length);
                                var count = data.length
                                for (i = 0; i < data.length; i++) {
                                    console.log("data_select.......", data[i]);


                                    //   if (select_record.message.data.length == 0) {
                                    console.log(data[i]);


                                    var address = data[i]["Building No"] + "||" + data[i]["Building Street"] + "||" + data[i]["Plot No"];
                                    data[i].address = address;
                                    // data[0].name_ar = name_ar;
                                    delete data[i]["Building No"];
                                    delete data[i]["Building Street"];
                                    delete data[i]["Plot No"];
                                    var alternumber = data[i]["Alternate Contact Phone Number 1"] + "||" + data[i]["Alternate Contact Phone Number 2"];
                                    delete data[i]["Alternate Contact Phone Number 1"];
                                    delete data[i]["Alternate Contact Phone Number 2"];
                                    data[i].alternumber = alternumber;
                                    // data[i]["Preferred Schedule"] = ExcelDateToJSDate(
                                    //     data[i]["Preferred Schedule"]
                                    // );
                                    // if (data[i]["Preferred Schedule"] == "Invalid Date") {
                                    //     return reject({
                                    //         status: 400,
                                    //         message: "Please provide a valid date format in the preferred schedule"
                                    //     })
                                    // }
                                    // else {
                                    data[i]["email_id"] = email_id;
                                    var datecreated = dateFormat("yyyy-mm-dd");
                                    data[i].datecreated = datecreated;
                                    var test = Object.values(data[i]);

                                    console.log("test..........", test);
                                    if(test.length===6){
                                        var insert_employee = await uploaddao.Building_insert(
                                            test
                                        );

                                    }
                                    else{
                                        return resolve({
                                            status:400,
                                            "message":"Please Enter all the Details"
                                        })
                                    }

                                    // count = + insert_employee.message.data.affectedRows
                                    console.log(count, "count====>")

                                    // console.log(
                                    //   "insert",
                                    //   insert_employee.message.data.affectedRows
                                    // );
                                    // // count + 1;
                                    // if (insert_employee.message.data.affectedRows != 0) {
                                    //   count++;
                                    //   console.log("count numb======>", count);
                                    // }
                                    //}
                                    //}
                                }
                                return resolve({
                                    // statuscode: "E08",
                                    status: 200,
                                    message:
                                        count +
                                        + " " + "  Buildings record is captured and saved successfully"

                                });

                            } else {
                                return resolve({
                                    // statuscode: "E08",
                                    status: 400,
                                    message: "Records not found in Building List.xlsx File"
                                });
                            }
                        }
                    }

                    else if (y == "قوائم المبانى ") {
                        var worksheet = workbook.Sheets[y];
                        var headers = {};
                        var data = [];
                        {
                            for (z in worksheet) {
                                if (z[0] === "!") continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                }
                                var col = z.substring(0, tt);
                                var row = parseInt(z.substring(tt));
                                var value = worksheet[z].v;

                                //store header names
                                if (row == 1 && value) {
                                    headers[col] = value;
                                    continue;
                                }

                                if (!data[row]) data[row] = {};
                                data[row][headers[col]] = value;
                            }
                            data.shift();
                            data.shift();


                            if (err) {
                                var error = {
                                    // statuscode: "E08",
                                    status: 500,
                                    message: "Something went wrong"
                                };
                                throw error;
                            } else if (data.length != 0) {
                                console.log("length", data.length);
                                var count = data.length - 1;
                                for (i = 1; i < data.length; i++) {
                                    console.log("data_select.......", data[i]);


                                    //   if (select_record.message.data.length == 0) {
                                    console.log(data[i]);


                                    var address = data[i]["Building No"] + "||" + data[i]["Building Street"] + "||" + data[i]["Plot No"];
                                    data[i].address = address;
                                    // data[0].name_ar = name_ar;
                                    delete data[i]["Building No"];
                                    delete data[i]["Building Street"];
                                    delete data[i]["Plot No"];
                                    var alternumber = data[i]["Alternate Contact Phone Number 1"] + "||" + data[i]["Alternate Contact Phone Number 2"];
                                    delete data[i]["Alternate Contact Phone Number 1"];
                                    delete data[i]["Alternate Contact Phone Number 2"];
                                    data[i].alternumber = alternumber;
                                    // data[i]["Preferred Schedule"] = ExcelDateToJSDate(
                                    //     data[i]["Preferred Schedule"]
                                    // );
                                    // if (data[i]["Preferred Schedule"] == "Invalid Date") {
                                    //     return reject({
                                    //         status: 400,
                                    //         message: "Please provide a valid date format in the preferred schedule"
                                    //     })
                                    // }
                                    // else {
                                    data[i]["email_id"] = email_id;
                                    var datecreated = dateFormat("yyyy-mm-dd");
                                    data[i].datecreated = datecreated;
                                    var test = Object.values(data[i]);

                                    console.log("test..........", test.length);
                                    if(test.length===6){
                                        var insert_employee = await uploaddao.Building_insert(
                                            test
                                        );

                                    }
                                    else{
                                        return resolve({
                                            status:400,
                                            "message":"Please Enter all the Details"
                                        })
                                    }
                                   


                                    //}
                                }
                                return resolve({
                                    // statuscode: "E08",
                                    status: 200,
                                    message:
                                        count +
                                        +" " + " يتم التقاط سجل المبنى وحفظه بنجاح "

                                });

                            } else {

                                return resolve({
                                    // statuscode: "E08",
                                    status: 400,
                                    message: "السجلات غير موجودة في ملف بناء قائمة.xlsx"
                                });
                            }
                        }
                    }

                });

                count = 0;
                length = 0;
            });
        }
    });

}
function ExcelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(
        date_info.getFullYear(),
        date_info.getMonth(),
        date_info.getDate(),
        hours,
        minutes,
        seconds
    );
}
module.exports = {
    upload_aman_web: upload_aman_web
};

var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
var fs = require('fs');
const buildingDao = require("../daos/buildingDao");
var checktoken = require("../utils/checkToken")
function request_service_aman(filepath, email_id) {
    console.log("body ", email_id);
    return new Promise(async function (resolve, reject) {
        console.log("in core");
        {
            console.log("in core", filepath);
            var updateorder_id = await buildingDao.not_interested_aman()
            console.log(updateorder_id)
            await fs.readFile(filepath, { encoding: "utf-8" }, async function (
                err,
                data
            ) {
                if (err) {
                    logger.fatal(err,"while readind the data from xlsx file for aman")
                    throw err;
                }
                var XLSX = require('xlsx');
                var workbook = XLSX.readFile(filepath);
                var sheet_name_list = workbook.SheetNames;

                sheet_name_list.forEach(async function (y) {
                    if (y == "Building Lists") {
                        var worksheet = workbook.Sheets[y];
                        var headers = {};
                        var data = [];
                        {
                            for (z in worksheet) {
                                if (z[0] === '!') continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                };
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
                            var params = []

                            if (err) {
                                var error = {
                                    // statuscode: "E08",
                                    status: 500,
                                    message: "Something went wrong"
                                };
                                throw error;
                            } else if (data.length != 0) {
                                var email_id_array = []
                                console.log("length", data.length);
                                buildingDao.order_id_select_aman()
                                    .then(async function (result) {
                                        console.log(result.result.data[0], "order_id_select=====>")
                                        var orderid1 = result.result.data[0].num
                                        var orderid2 = result.result.data[1].num
                                        console.log(orderid1,orderid2,"1 and 2");
                                        var orderid = Math.max(orderid1,orderid2)                                        
                                        console.log(orderid, "ORDER")
                                        console.log(orderid == "null")
                                        if (orderid == "null" || orderid == "NULL" || orderid == "NoInterest") {
                                            orderid = "A0001"
                                        }
                                        else {
                                            console.log(orderid, "inside the loop")

                                            // orderid = Number(orderid) + 1
                                            console.log("orderid" + orderid)
                                            orderid = orderid + 1;
                                            console.log("orderid=====>" + orderid)

                                            orderid = orderid.toString()
                                            if (orderid.length == 1) {
                                                orderid = "A000" + orderid
                                            }
                                            else if (orderid.length == 2) {
                                                orderid = "A00" + orderid
                                            }
                                            else if (orderid.length == 3) {
                                                orderid = "A0" + orderid
                                            }

                                            else {
                                                orderid = "A" + orderid
                                            }
                                        }

                                        // console.log(national_id_array,"=======>national_id_array")
                                        await buildingDao.update_order_id_aman(orderid, email_id)
                                        return resolve({
                                            // statuscode: "E08",
                                            status: 200,
                                            message: {
                                                orderid: orderid
                                            }
                                        });

                                        //}
                                    })
                                    /*=========Error Capturing===========*/

                                    .catch(async function (err) {
                                        return resolve({
                                            status: 400,
                                            message: err
                                        });
                                    })


                            }
                        }
                    }
                    else if (y == "قوائم المبانى ") {
                        var worksheet = workbook.Sheets[y];
                        var headers = {};
                        var data = [];
                        {
                            for (z in worksheet) {
                                if (z[0] === '!') continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                };
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
                            var params = []

                            if (err) {
                                var error = {
                                    // statuscode: "E08",
                                    status: 500,
                                    message: "Something went wrong"
                                };
                                throw error;
                            } else if (data.length != 0) {
                                var email_id_array = []
                                console.log("length", data.length);
                                await buildingDao.order_id_select_aman()
                                    .then(async function (result) {
                                        console.log(result.result.data[0])
                                        var orderid1 = result.result.data[0].num
                                        var orderid2 = result.result.data[1].num
                                        console.log(orderid1,orderid2,"1 and 2");
                                        var orderid = Math.max(orderid1,orderid2) 
                                        console.log(orderid, "ORDER")
                                        console.log(orderid == "null")
                                        if (orderid == "null" || orderid == "NULL" || orderid == "NoInterest") {
                                            orderid = "A0001"
                                        }
                                        else {
                                            console.log(orderid, "inside the loop")

                                            orderid = Number(orderid) + 1
                                            console.log("orderid" + orderid)
                                            orderid = orderid.toString()
                                            if (orderid.length == 1) {
                                                orderid = "A000" + orderid
                                            }
                                            else if (orderid.length == 2) {
                                                orderid = "A00" + orderid
                                            }
                                            else if (orderid.length == 3) {
                                                orderid = "A0" + orderid
                                            }

                                            else {
                                                orderid = "A" + orderid
                                            }
                                        }

                                        // console.log(national_id_array,"=======>national_id_array")
                                        await buildingDao.update_order_id_aman(orderid, email_id)
                                        return resolve({
                                            // statuscode: "E08",
                                            status: 200,
                                            message: {
                                                orderid: orderid
                                            }
                                        });

                                        //}
                                    })
                                    /*=========Error Capturing===========*/

                                    .catch(async function (err) {
                                        return resolve({
                                            status: 400,
                                            message: err
                                        });
                                    })


                            }
                        }
                    }
                });

            });
        }
    }

    );
}

module.exports = {
    request_service_aman: request_service_aman
};

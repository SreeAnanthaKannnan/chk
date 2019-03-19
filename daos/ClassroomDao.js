const mysqlConnection = require("../config/Connection");
const moment = require("moment");
var TimeFormat = require("hh-mm-ss");
var start_time = "";
var groupArray = require("group-array");
const query = require("../mysql_connection/queries");
/*=================Insering the params into classroom table=================*/
function Classroom_insert(params, duration, insert_count) {
    return new Promise(async function(resolve, reject) {
        // console.log("hiiiii",params)
        params = [params];
        console.log(params[0][0], "classroom_id");
        console.log(params[0][4], "no_of_available_seats");
        console.log(duration, "inside the function");

        var ended_time = "";
        /*================Auto allocation based on the time difference between the start time and end time with the course duration(inert_count)======*/
        start_time = params[0][7];
        for (i = 0; i < insert_count; i++) {
            /*======adding the duration and the start time and saved as started_time=======*/
            var res = await mysqlConnection.query_execute(
                query.addtime,
                [duration, start_time]
            );
            console.log(res);
            /*==========assign the started_time to ended_time for next class room end time===*/
            ended_time = res.data[0].started_time;
            console.log(ended_time, "ended_time");
            /*=======================Inserting the classroom information into classroom table========*/
            var res1 = await mysqlConnection.insert_query(
                query.classroominsert, [
                    params[0][0],
                    params[0][1],
                    params[0][2],
                    params[0][3],
                    params[0][4],
                    params[0][4],
                    params[0][6],
                    start_time,
                    ended_time,
                    params[0][9]
                ]
            );
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            } else{

            console.log("start_time", res1);
            /*============next class starting time is the previous class ended time======*/
            start_time = ended_time;
            console.log("startTIme", start_time);
        }
        /*==================returning the value returned from db to the classroom.js function======*/
        return resolve({
            result: res1.data[0]
        });
    }
    });

}


//================================================================================================//
function Availability_Date(no_of_seats_selected, trainer_id, course_id) {
    return new Promise(async function(resolve, reject) {
        /*================fetching distinct available dates from classroom with respect to particular trainer and the course=======*/
        var res1 = await mysqlConnection.query_execute(query.availabledate,
            ["0", trainer_id, course_id]
        );
        console.log(res1, "res1====>");
        if (res1.data.errno) {
            return reject({
                status: 400,
                message:"something went wrong"
            });
        } else {
            let result = res1.data;
            var value = [];
            var result1 = "";

            for (i = 0; i < result.length; i++) {
                console.log(result[i].available_date, "available_Date in loop");
                var date = result[i].available_date;
                // console.log(date,"success")
                var value1 = date + 1;
                let result2 = value1
                    .split(" ")
                    .slice(0, 4)
                    .join(" ");
                result1 = moment(JSON.stringify(result2)).format("YYYY-MM-DD");

                value.push(result1);
            }
            console.log(value, "wow");


            return resolve({
                message: value
            });
        }

        //});
    });
}
//===============================selecting timeslots for partial booking====================================================================//
function time_slots_lists(available_date, trainer_id) {
    return new Promise(async function(resolve, reject) {

        var value = [];
        var value1 = [];
        var obj = {};
        var obj_id = "";
        /*==========selecting classroom id for given available_date and trainer_id=========*/
        var res = await mysqlConnection.query_execute(
            query.classroomidselect, [available_date, trainer_id]
        );
        if (res.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }
        else{
        console.log(res, "res");
        /*==========assigning the objects in the array of res.data in a variable categories====*/
        const categories = [...new Set(res.data.map(bill => bill.classroom_id))];
        console.log(categories, "test");
        for (i = 0; i < categories.length; i++) {
            /*===============selectind classroom for the given classroom id's=====*/
            var res1 = await mysqlConnection.query_execute(
                query.classroomdataselect, [categories[i]]
            );
            obj_id = categories[i];

            for (j = 0; j < res1.data.length; j++) {
                /*======formating the startime as am pm format ========*/
                var res_start_time = await mysqlConnection.query_execute(
                    query.starttimeformat, [res1.data[j].start_time]
                );
                /*======formating the endtime as am pm format ========*/

                var res_end_time = await mysqlConnection.query_execute(
                    query.endtimeformat, [res1.data[j].end_time]
                );
                let no_of_available_seats = res1.data[j].number_of_available_seats;
                console.log(res_start_time, "start_time");
                /*=======creating an object as the variale name object_value=========*/
                object_value = {
                    classroom_id: categories[i],
                    no_of_available_seats: no_of_available_seats,
                    start_time: res_start_time.data[0].start_time,
                    end_time: res_end_time.data[0].end_time
                };
                /*=========pushing the above object into an array variable value=======*/

                value.push(object_value);
            }

        }
        return resolve({
            result: value
        });
    }


    });
}

//================================================================================================//
function Classroom_num(classroom_id, language) {
    return new Promise(async function(resolve, reject) {

        if (language == "en") {
            /*=============selecting all classroom data for the given classroom_id and assign the result to res1======*/
            var res1 = await mysqlConnection.query_execute(
                query.alldatafromclassroom, [classroom_id]
            );
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            }
            else{

            console.log("res1===>", res1.data);
            return resolve({
                result: res1.data
            });
        }
        } 
        if(language =="ar") {
            /*========selecting the courseid from the course table for the given course_name and assign to res1 variable=====*/
            var res1 = await mysqlConnection.query_execute(
                query.courseidselect, [course_name]
            );
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            }
            else{

            console.log("res1===>", res1.data);
            /*======returning the course_id array which is the res1.data array to core=====*/
            return resolve({
                result: res1.data
            });
        }
    }
    });
}


//===============================================================================================//
function insert_count(start_time, end_time, duration) {
    return new Promise(async function(resolve, reject) {
        /*========adding the time end_time and start_time using select query========*/
        var res = await mysqlConnection.query_execute(
            query.timedifference,
            [end_time, start_time]
        );
        /*=====throw the db error if error exists=========*/
        if (res.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        } else {
            /*======assing the *=====*/

            let time_diff = res.data[0].starting_time;
            console.log(res.data[0].starting_time, "staring_time from result");
            /*=======changing the time difference into seconds and saved as the variable name minutes====*/
            let minutes = TimeFormat.toS(time_diff);
            /*=====changint the duration into seconds using timeformat npm and store it into duration_s====*/
            let duration_s = TimeFormat.toS(duration);
            console.log(duration_s, "duration");
            /*=======dividing the seonds for time_diff and duration seconds and store it into a variable result=====*/
            console.log(minutes / duration_s, "minutes=====>");
            result = minutes / duration_s;
            console.log(result, "result=========>");
            /*======returning the count to core function======*/
            return resolve({
                result: result
            });
        }

    });
}
//==============================================================================================//

//============================Entering into bulk booking=========================================================//
function bulk_booking(
    course_id,
    no_of_seats_selected,
    language,
    Emirates_ID,
    Company_Trade_Lincense_No,
    scheduling_date,
    amount
) {
    return new Promise(async function(resolve, reject) {

        console.log(Emirates_ID.length, "length of the employees");
        /*=====selecting classroom data for the given course_id in the classroom table======*/
        var res_value = await mysqlConnection.query_execute(
            query.classroomdataforbulkbooking, [course_id]
        );
        if (res_value.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }
        else{
        console.log("query length", res_value.data.length);
        var classroom_id;
        /*======taking the query result array into a variable classrooms=====*/
        let classrooms = res_value.data;
        let classroom_array = [];
        /*=======taking the classrooms array length and assign into noOfClassRooms varaible=====*/
        let noOfClassRooms = classrooms.length;
        /*=====Assign the total_Seats as zero in initial===*/
        var total_seats = 0;
        /*=========taking the no of available seats from the classroom and assign into total_Seats for all classrooms===*/
        for (i = 0; i < noOfClassRooms; i++) {
            console.log(classrooms[i].number_of_available_seats, "tesing");
            total_seats = total_seats + classrooms[i].number_of_available_seats;
            console.log(total_seats, " in loop");
        }
        console.log(total_seats, "totalseats");
        /*=====checking the classroom avaiable seats are less or more than the total seats selected for bulk booking====*/
        if (total_seats < no_of_seats_selected) {
            return resolve({
                result: "Booking Slots are not available"
            });
        }

        var employees = Emirates_ID;

        var seats = [];
        /*=======push the eact seat of the classroom available seats into seat array====*/
        for (classroom of classrooms) {
            for (i = 0; i < classroom.number_of_available_seats; i++) {
                seats.push(classroom);
            }
        }
        console.log(seats.length, "total seats");

        var counter = 0;
        var final_list = {};
        var final_array = [];
        /*======Allocating each employee to the particular seat=======*/
        for (i = 0; i < Emirates_ID.length; i++) {

            console.log(
                "employee " + Emirates_ID[i] + " allocated to seat " + seats[counter++]
            );
        }
        /*======using for for loop upto total employee count insert the all data to the schedule====*/
        for (i = 0; i < Emirates_ID.length; i++) {
            let classroom_id = seats[i].classnum;
            let start_time = seats[i].start_time;
            let end_time = seats[i].end_time;

            let trainer_id = seats[i].trainer_id;

            let scheduled_date = seats[i].available_date;


            let query_values = [
                classroom_id,
                Emirates_ID[i],
                start_time,
                end_time,
                course_id,
                trainer_id,
                Company_Trade_Lincense_No,
                Emirates_ID.length,
                scheduling_date,
                scheduled_date,
                "Pending",
                amount,
                "Booked"
            ];
            final_array.push(query_values);
            console.log(query_values, "query__________________value");
            /*==========inserting the query value into schedule table =========*/
            var res2 = await mysqlConnection.insert_query(
                query.scheduleinsertbulkbooking, query_values
            );
            if (res2.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            }else{
            console.log("resvalue=========>res2", res2);
            /*=======updating the employees as booked those are scheduled=======*/
            var Employee_update = await mysqlConnection.query_execute(
                query.updateemployeetablebulkbooking, ["Booked", Emirates_ID[i]]
            );
            if (Employee_update.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            }
            
        else{
        return resolve({
            result: res2.data
        });
    }
}
}
        }
    });
}
//===============================================================================================/ /
async function classroom_id(params) {
    return new Promise(async function(resolve, reject) {
        /*======selecting classroom_id from the classroom=======*/
        mysqlConnection
            .query_execute(query.getclassroom, [params])
            .then(function(result, err) {
                if (err) {
                    console.log("err", err);
                    return resolve({
                        status: 400,
                        err: err
                    });
                } else {
                    console.log(result);
                    return resolve({
                        result
                    });
                }
            });
    });
}
module.exports = {
    Classroom_insert: Classroom_insert,
    Availability_Date: Availability_Date,
    insert_count: insert_count,
    time_slots_lists: time_slots_lists,
    bulk_booking: bulk_booking,
    Classroom_num: Classroom_num,
    classroom_id: classroom_id
};
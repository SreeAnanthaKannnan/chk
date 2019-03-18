const con = require("../mysql_connection/dbConfig");
const mysqlConnection = require("../mysql_connection/config_test");
const moment = require("moment");
var TimeFormat = require("hh-mm-ss");
var start_time = "";
var groupArray = require("group-array");
const query = require("../mysql_connection/queries");
// const mysqlConnection = require("../config/Connection");
function Classroom_insert(params, duration, insert_count) {
  return new Promise(async function (resolve, reject) {
    // console.log("hiiiii",params)
    params = [params];
    console.log(params[0][0], "classroom_id");
    console.log(params[0][4], "no_of_available_seats");
    console.log(duration, "inside the function");

    var ended_time = "";

    start_time = params[0][7];
    for (i = 0; i < insert_count; i++) {
      var res = await mysqlConnection.query_execute(
        "SELECT ADDTIME( '" +
        duration +
        "' , '" +
        start_time +
        "') as started_time",
        []
      );
      // if (res.data.length == 0) {
      //     return false
      // }
      // return res
      console.log(res);
      ended_time = res.data[0].started_time;
      console.log(ended_time, "ended_time");

      var res1 = await mysqlConnection.insert_query(
        "INSERT INTO Classroom (classroom_id,trainer_id,address_en,address_ar,number_of_seats,number_of_available_seats,available_date,start_time,end_time,course_id)Values ?",
        [
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

      console.log("start_time", res1);
      start_time = ended_time;
      console.log("startTIme123456", start_time);
    }
    return resolve({ result: res1.data[0] });
  });
}

//=============================================================================================//
function trainer_update(param1, param2) {
  return new Promise(async function (resolve, reject) {
    await con.query(
      "UPDATE Trainer SET classroom_id ='" +
      param2 +
      "' where trainer_email_id ='" +
      param1 +
      "'",
      (err, result) => {
        //  await con.query(sql,  [params] ,function(err,result){
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({
            status: 200,
            message: "Class is assigned successfully"
          });
        }
      }
    );
  });
}
function Classroom_select(param1, param2, param3) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", param2);
    param2 = moment(param2).format("YYYY-MM-DD");
    console.log(param2);

    await con.query(
      "SELECT classroom_id FROM Classroom where (classroom_id ='" +
      param1 +
      "')AND (available_date ='" +
      param2 +
      "')AND (time_slot = '" +
      param3 +
      "')",
      (err, result) => {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ status: 200, result: result });
        }
      }
    );
  });
}
function Availability(classroom_id, available_date, start_time, end_time) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", classroom);
    // params =[params]
    await con.query(
      "SELECT * FROM Classroom where available_date ='" +
      available_date +
      "' and start_time ='" +
      start_time +
      "' and end_time = '" +
      end_time +
      "' and classroom_id = '" +
      classroom_id +
      "' ",
      (err, result) => {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ message: result });
        }
      }
    );
  });
}
//================================================================================================//
function Availability_Date(no_of_seats_selected, trainer_id, course_id) {
  return new Promise(async function (resolve, reject) {
    //  console.log("hiiiii",params)
    // params =[params]
    var res1 = await mysqlConnection.query_execute(
      "SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?",
      ["0", trainer_id, course_id]
    );
    console.log(res1, "res1====>");

    // await con.query("SELECT  available_date FROM Classroom where no_of_available_seats >='" + param + "'" , (err, result) => {

    if (res1.data.errno == 1054) {
      //  console.log(result,"achieved")
      return resolve({ status: 400, err: "Internal server Error" });
    } else {
      console.log("message", res1.data);
      let result = res1.data;
      console.log(result.length, "testing");
      var value = [];
      var result1 = "";

      for (i = 0; i < result.length; i++) {
        console.log(result[i].available_date, "kavitha");
        var date = result[i].available_date;
        // console.log(date,"success")
        var value1 = date + 1;
        let result2 = value1
          .split(" ")
          .slice(0, 4)
          .join(" ");
        result1 = moment(JSON.stringify(result2)).format("YYYY-MM-DD");

        value.push(result1);
        // console.log(result1,"tes")
      }
      console.log(value, "wow");

      //console.log("result",result.split(' ').slice(0, 4).join(' '))
      // return resolve({  message: result.split(' ').slice(0, 4).join(' ')});
      return resolve({ message: value });
    }

    //});
  });
}
//===================================================================================================//
function time_slots_lists(available_date, trainer_id) {
  return new Promise(async function (resolve, reject) {
    //  console.log("hiiiii",params)
    // params =[params]
    var value = [];
    var value1 = [];
    var obj = {};
    var obj_id = "";
    var res = await mysqlConnection.query_execute(
      "SELECT classroom_id FROM Classroom where available_date =? and trainer_id=? ",
      [available_date, trainer_id]
    );
    console.log(res, "res");
    const categories = [...new Set(res.data.map(bill => bill.classroom_id))];
    console.log(categories, "test");
    for (i = 0; i < categories.length; i++) {
      var res1 = await mysqlConnection.query_execute(
        "SELECT start_time,end_time,number_of_available_seats FROM Classroom where classroom_id =?",
        [categories[i]]
      );
      console.log(res1.data.length, "kavitha");
      obj_id = categories[i];

      for (j = 0; j < res1.data.length; j++) {
        var res_start_time = await mysqlConnection.query_execute(
          "SELECT TIME_FORMAT(?, '%h:%i %p') as start_time",
          [res1.data[j].start_time]
        );
        var res_end_time = await mysqlConnection.query_execute(
          "SELECT TIME_FORMAT(?, '%h:%i %p') as end_time",
          [res1.data[j].end_time]
        );
        let no_of_available_seats = res1.data[j].number_of_available_seats;
        console.log(res_start_time, "start_time");
        object_value = {
          classroom_id: categories[i],
          no_of_available_seats: no_of_available_seats,
          start_time: res_start_time.data[0].start_time,
          end_time: res_end_time.data[0].end_time
        };

        value.push(object_value);
      }

      //  obj[obj_id]=value

      //  value = []
    }
    return resolve({ result: value });

    //     var res1=await mysqlConnection.query_execute("SELECT start_time,end_time,number_of_available_seats FROM Classroom where classroom_id =?",[res.data[0].classroom_id])
    //         console.log(res1,"res1====>")

    //    // await con.query("SELECT  available_date FROM Classroom where no_of_available_seats >='" + param + "'" , (err, result) => {

    //     if(res1.status !=200) {
    //         //  console.log(result,"achieved")
    //         return resolve({ status: 400, err: "Internal server Error" })
    // }

    // else{
    //     let result = res1.data;
    //     var value = [];
    //     var count = result.length;
    //     for(i=0;i<result.length;i++){
    //    let starting_time = result[i].start_time
    //    let no_of_available_seats = result[i].number_of_available_seats
    //    let ending_time = result[i].end_time
    //    let classroom_id = result[i].classroom_id
    //     var res_start_time=await mysqlConnection.query_execute("SELECT TIME_FORMAT(?, '%h:%i %p') as start_time",
    //     [starting_time]);
    //     var res_end_time=await mysqlConnection.query_execute("SELECT TIME_FORMAT(?, '%h:%i %p') as end_time",
    //     [ending_time]);

    //     console.log(res_start_time.start_time)
    //     console.log(res_end_time)
    //     // var data = {}
    //     // value.push(classroom_id,no_of_available_seats,res_start_time.data[0].start_time,res_end_time.data[0].end_time)

    //     object_value = {no_of_available_seats : no_of_available_seats,start_time:res_start_time.data[0].start_time , end_time :res_end_time.data[0].end_time,classroom_id:classroom_id}

    //     value.push(object_value)

    //     }

    //     let object_length = Object.keys(groupArray(value,"classroom_id")).length
    //     for(i=0;i<count;i++){
    //     // console.log(Object.keys(groupArray(value,"classroom_id"))[i])
    //     // console.log(classrooms[0].classroom_id)
    //     // if(classrooms[i].classroom_id = Object.keys(groupArray(value,"classroom_id"))[i] )
    //     // {
    //       for(i=1;i<count;i++){
    //          delete classrooms["classroom_id"]
    //       }
    //     //}
    //     // console.log(Object.keys(groupArray(value,"classroom_id")),"test")
    //     }

    //     // returns ['a', 1, 2, '1']

    //     // return resolve({status :200,result:groupArray(value,"classroom_id")})
    //     return resolve({status :200,result:value})

    //}

    //});
  });
}
//================================================================================================//
function Seat_count(param) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", param);
    param = moment(param).format("YYYY-MM-DD");
    console.log(param, "date");

    await con.query(
      "SELECT SUM(number_of_available_seats) as no_of_available_seats FROM Classroom where available_date ='" +
      param +
      "' and status ='" +
      "not filled" +
      "'",
      (err, result) => {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ result: result });
        }
      }
    );
  });
}
//=================================================================================================//

function auto_allocation(param) {
  return new Promise(async function (resolve, reject) {
    console.log("params=====>", param);
    param = [param];
    console.log("params============>", param[0][1]);

    await con.query(
      "SELECT classroom_id,no_of_available_seats FROM Classroom where (available_date='" +
      param[0][0] +
      "')AND (no_of_available_seats !=0)",
      (err, result) => {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result.length, "no of classrooms");
          // let i =0;
          //   for(i=0;i<=result.length;i++) {
          let data = [];
          console.log(param[0][1], "inside the loop");
          console.log(result[0].no_of_available_seats, "testing");
          console.log(param[0][1] <= result[0].no_available_seats, "wow");
          if (param[0][1] <= result[0].no_available_seats) {
            return resolve({ result: data.push(result[0].classroom_id) });
          } else {
            console.log(param[0][1], "parms");
            let value = [];
            for (j = 0; param[0][1] > 0; j++) {
              console.log(result[1], "working");
              //   if(param[0][1]<=result[j].no_available_seats){value.push(result[j].classroom_id)}

              console.log(result[j].no_of_available_seats, "goood");
              console.log(param[0][1], "paramssssssssssss");
              value.push(result[j].classroom_id);
              param[0][1] = param[0][1] - result[j].no_of_available_seats;
              console.log(param[0][1], "welldone");
            }
            return resolve({ result: value });
          }
        }
        // return resolve({ result:result});
        // }
      }
    );
  });
}
//================================================================================================//
function Classroom_num(classroom_id, language) {
  return new Promise(async function (resolve, reject) {
    //  param = moment(param).format("YYYY-MM-DD")

    if (language == "en") {
      var res1 = await mysqlConnection.query_execute(
        "SELECT * FROM Classroom where classroom_id=?",
        [classroom_id]
      );

      console.log("res1===>", res1.data);
      return resolve({ result: res1.data });
    } else {
      var res1 = await mysqlConnection.query_execute(
        "SELECT course_id FROM Course where name_ar =?",
        [course_name]
      );

      console.log("res1===>", res1.data);
      return resolve({ result: res1.data });
    }
  });
}

//==================================================================================================//
async function classroom_details_for_training(params) {
  console.log("params===========>", params);
  params = params.result;

  //  let retArr = [];
  return new Promise(async function (resolve, reject) {
    var value = [];
    var length = params.length;
    console.log(length, "length");
    for (let i = 0; i < length; i++) {
      //  sql ="SELECT * FROM Classroom where classroom_id = ?",
      // await con.query(sql,  [params[i]] ,async function(err,result){

      await con.query(
        "SELECT * FROM Classroom where classroom_id = '" + params[i] + "'",
        async function (err, result) {
          if (err) {
            //  console.log(result,"achieved")
            console.log("something", err);
            return resolve({ status: 400, err: err });
          } else {
            console.log(result, "result of i");
            console.log(result[0].classroom_id, "value");

            let classroom_id = result[0].classroom_id;
            value.push(result);

            console.log("output", value);
            if (value.length >= length) {
              return resolve({ result: value });
            }
          }
        }
      );
    }
  });
}
function classroom_for_exam(param) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", param);
    date1 = moment(param).format("YYYY-MM-DD");
    console.log(date1, "date");

    await con.query(
      "SELECT address,available_date,time_slot FROM Classroom where available_date ='" +
      date1 +
      "'",
      (err, result) => {
        if (!result) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result.length, "no of classrooms");
          var date = result[0].available_date;
          // console.log(date,"success")
          var value1 = date + 1;
          let result2 = value1
            .split(" ")
            .slice(0, 4)
            .join(" ");
          availableDate = moment(JSON.stringify(result2)).format("YYYY-MM-DD");
          let time = result[0].time_slot;
          return resolve({ address: result[0].address, availableDate, time });
        }
      }
    );
  });
}
function seat_update(param) {
  console.log(param, "param<====");

  //     return new Promise( async function (resolve,reject){
  // await con.query("UPDATE Trainer SET classroom_id ='" + param2 + "' where trainer_email_id ='" + param1 + "'", (err, result) => {
  //     //  await con.query(sql,  [params] ,function(err,result){
  //         if(!result) {
  //                 //  console.log(result,"achieved")
  //                 console.log("something",err)
  //                 return resolve({ status: 400, err : err })
  //         }

  //         else{
  //             console.log(result)
  //             return resolve({ status: 200, message: "Class is assigned successfully"});
  //             }

  //         });

  //})
}
//===============================================================================================//
function insert_count(start_time, end_time, duration) {
  return new Promise(async function (resolve, reject) {
    console.log("hiiiii", start_time);
    let sql =
      "SELECT TIMEDIFF( '" +
      end_time +
      "' , '" +
      start_time +
      "') as starting_time";

    console.log(sql);

    await con.query(sql, function (err, result) {
      if (err) {
        return resolve({ status: 400, err: err });
      }

      let time_diff = result[0].starting_time;
      console.log(result[0].starting_time, "kavithaaaaaaaaaaaaaaaa");
      let minutes = TimeFormat.toS(time_diff);
      let duration_s = TimeFormat.toS(duration);
      console.log(duration_s, "duration");
      console.log(minutes / duration_s, "minutes=====>");
      result = minutes / duration_s;
      console.log(result, "result=========>");
      return resolve({ result: result });
    });
  });
}
//==============================================================================================//
function bulk_booking1(
  course_id,
  no_of_seats_selected,
  language,
  Emirates_ID,
  Company_Trade_Lincense_No,
  scheduling_date,
  amount
) {
  return new Promise(async function (resolve, reject) {
    // if (language == 'en'){
    console.log(Emirates_ID.length, "length of the employees");

    var res_value = await mysqlConnection.query_execute(
      "select * from Classroom where number_of_available_seats <> 0 and course_id=? order by available_date asc",
      [course_id]
    );
    console.log("kavitha_res_value", res_value.data);
    var classroom_id;
    let classrooms = res_value.data;
    let classroom_array = [];
    let noOfClassRooms = classrooms.length;
    var total_seats = 0;
    for (i = 0; i < noOfClassRooms; i++) {
      console.log(classrooms[i].number_of_available_seats, "tesing");
      total_seats = total_seats + classrooms[i].number_of_available_seats;
      console.log(total_seats, " in loop");
    }
    console.log(total_seats, "totalseats");
    if (total_seats < no_of_seats_selected) {
      return resolve({ result: "Booking Slots are not available" });
    } else {
      if (classrooms[0].number_of_available_seats >= no_of_seats_selected) {
        classroom_array.push(classrooms[0].classroom_id);
        return resolve({ result: classroom_array });
      } else {
        var obj = {};
        var obj2 = {};
        //    while(no_of_seats_selected =0){
        //        for(i=0;i<length;i++){
        //            obj ={classroom_id:classrooms[i].classroom_id,no_available_seats:classrooms[i].number_of_available_seats}
        //            classroom_array.push(obj)
        //             no_of_seats_selected=no_of_seats_selected-classrooms[i].number_of_available_seats
        //             console.log(no_of_seats_selected,"weldone")

        //        }
        //    }

        for (i of classrooms) {
        }
        for (j = 0; no_of_seats_selected > 0; j++) {
          console.log(no_of_seats_selected, "working");
          //   if(param[0][1]<=result[j].no_available_seats){value.push(result[j].classroom_id)}

          console.log(classrooms[j].number_of_available_seats, "goood");
          console.log(no_of_seats_selected, "paramssssssssssss");
          obj = {
            classroom_id: classrooms[j].classroom_id,
            no_available_seats: classrooms[j].number_of_available_seats,
            start_time: classrooms[j].start_time,
            end_time: classrooms[j].end_time,
            trainer_id: classrooms[j].trainer_id,
            course_id: classrooms[j].course_id
          };
          //   for(i=0;i<classrooms[j].number_of_available_seats;i++){
          //   query_value=[
          //       classrooms[j].classroom_id,
          //       Emirates_ID[i],
          //       classrooms[j].start_time,
          //       classrooms[j].end_time,
          //       classrooms[j].course_id,
          //       classrooms[j].trainer_id,
          //       Company_Trade_Lincense_No,
          //       classrooms[j].number_of_available_seats,
          //       scheduling_date,
          //       classrooms[j].available_date,
          //       "pending",
          //       amount,
          //       "Booked"

          //   ]
          //   var res2= await mysqlConnection.insert_query("INSERT INTO Schedule(classroom_id,Emirates_ID,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?",query_value)
          //      console.log("resvalue=========>res2",res2)
          // }

          classroom_array.push(obj);
          no_of_seats_selected =
            no_of_seats_selected - classrooms[j].number_of_available_seats;
          console.log(no_of_seats_selected, "welldone");
          if (j != 0) {
            if (no_of_seats_selected != 0) {
              if (
                no_of_seats_selected <
                classrooms[j - 1].number_of_available_seats
              ) {
                obj2 = {
                  classroom_id: classrooms[j - 1].classroom_id,
                  no_available_seats: no_of_seats_selected
                };

                classroom_array.push(obj2);
                no_of_seats_selected = 0;
              }
            }
          }
        }
        return resolve({ result: classroom_array });

        return resolve({ result: classroom_array });
      }
      //            for(i=0;i<length;i++){
      //                console.log(classrooms[i].number_of_available_seats,"tesing")
      //                total_seats = total_seats + classrooms[i].number_of_available_seats;
      //                console.log(total_seats," in loop")
      //            }
      //            console.log(total_seats,"totalseats")
      //            if(value){
      //            for(i=0;i<length;i++){
      //                if(classrooms[i].number_of_available_seats >=no_of_seats_selected){
      //                    classroom_array.push(classrooms[i].classroom_id)
      //                }
      //                console.log(classroom_array,"<===========classroom_array")
      //                return resolve({result:classroom_array})
      //         }
      // }

      //                else{
      //                 let auto = [];
      //                 let obj ={}
      //                 for(j=0;no_of_seats_selected>0;j++){
      //                     console.log(no_of_seats_selected,"working")
      //                   //   if(param[0][1]<=result[j].no_available_seats){value.push(result[j].classroom_id)}

      //                     console.log(classrooms[i].number_of_available_seats,"goood")
      //                     obj={classroom_id:classrooms[j].classroom_id,no_available_seats:classrooms[j].number_of_available_seats}
      //                     // auto.push(classrooms[j].classroom_id)
      //                     auto.push(obj)
      //                     no_of_seats_selected=no_of_seats_selected-classrooms[j].number_of_available_seats
      //                     console.log(no_of_seats_selected,"welldone")

      //                }

      //                return resolve({result:auto})

      //            }
    }
  });
}
//=====================================================================================//
function bulk_booking(
  course_id,
  no_of_seats_selected,
  language,
  Emirates_ID,
  Company_Trade_Lincense_No,
  scheduling_date,
  amount
) {
  return new Promise(async function (resolve, reject) {
    // if (language == 'en'){
    console.log(Emirates_ID.length, "length of the employees");

    var res_value = await mysqlConnection.query_execute(
      "select * from Classroom where number_of_available_seats <> 0 and course_id=? order by available_date asc",
      [course_id]
    );
    console.log("kavitha_res_value", res_value.data.length);
    var classroom_id;
    let classrooms = res_value.data;
    let classroom_array = [];
    let noOfClassRooms = classrooms.length;
    var total_seats = 0;
    for (i = 0; i < noOfClassRooms; i++) {
      console.log(classrooms[i].number_of_available_seats, "tesing");
      total_seats = total_seats + classrooms[i].number_of_available_seats;
      console.log(total_seats, " in loop");
    }
    console.log(total_seats, "totalseats");
    if (total_seats < no_of_seats_selected) {
      return resolve({ result: "Booking Slots are not available" });
    }

    var employees = Emirates_ID;

    var seats = [];

    for (classroom of classrooms) {
      for (i = 0; i < classroom.number_of_available_seats; i++) {
        seats.push(classroom);
      }
    }
    console.log(seats.length, "seatsssssssssss");

    var counter = 0;
    var final_list = {};
    var final_array = [];
    //  for(employee of Emirates_ID){
    for (i = 0; i < Emirates_ID.length; i++) {
      //    let classroom_id = seats[counter++].classnum;
      //    let start_time = seats[counter++].start_time;
      //    let end_time = seats[counter++].end_time;

      //    let trainer_id =seats[counter++].trainer_id;
      // //    Company_Trade_Lincense_No,
      // //    "null",
      // //    scheduling_date,
      //     let scheduled_date=seats[counter++].available_date;
      // //    "Pending",
      // //    amount,
      // //    "Booked"

      //    let query_values=[
      //      classroom_id,
      //    employee,
      //   start_time ,
      //    end_time,
      //     course_id,
      //    trainer_id,
      //   Company_Trade_Lincense_No,
      //    "null",
      //    scheduling_date,
      //   scheduled_date ,
      //    "Pending",
      //    amount,
      //    "Booked"

      //   ]
      //   final_array.push(query_values)
      //    console.log(query_values,"query__________________value")

      // var res2= await
      //   mysqlConnection.insert_query("INSERT INTO Schedule(classroom_id,Emirates_ID,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?",query_values)
      // console.log("resvalue=========>res2",res2)

      console.log(
        "employee " + Emirates_ID[i] + " allocated to seat " + seats[counter++]
      );
      console.log("hi");
      //      final_list={id:employee,classroom_allocate:seats[counter++].classnum}
    }
    for (i = 0; i < Emirates_ID.length; i++) {
      let classroom_id = seats[i].classnum;
      let start_time = seats[i].start_time;
      let end_time = seats[i].end_time;

      let trainer_id = seats[i].trainer_id;
      //    Company_Trade_Lincense_No,
      //    "null",
      //    scheduling_date,
      let scheduled_date = seats[i].available_date;
      //    "Pending",
      //    amount,
      //    "Booked"

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

      var res2 = await mysqlConnection.insert_query(
        "INSERT INTO Schedule(classroom_id,National_Id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?",
        query_values
      );
      console.log("resvalue=========>res2", res2);
      var Employee_update = await mysqlConnection.query_execute(
        "UPDATE Employee_Profile SET assigned_for_training =? where National_Id=?",
        ["Booked", Emirates_ID[i]]
      );
      console.log("pavannnnnnnnnnn", Employee_update);
    }
    return resolve({ result: res2.data });
  });
}
//========================================Trainer_classroom ==Start=====================================================/ /
async function classroom_id(params) {
  return new Promise(async function (resolve, reject) {
    mysqlConnection
      .query_execute(query.getclassroom, [params])
      .then(function (result, err) {
        if (err) {
          //  console.log(result,"achieved")
          console.log("something", err);
          return resolve({ status: 400, err: err });
        } else {
          console.log(result);
          return resolve({ result });
        }
      });
  });
}
//========================================Trainer_classroom ==END=========================
module.exports = {
  Classroom_insert: Classroom_insert,
  Classroom_select: Classroom_select,
  Availability: Availability,
  Availability_Date: Availability_Date,
  Seat_count: Seat_count,
  auto_allocation: auto_allocation,
  trainer_update: trainer_update,
  classroom_details_for_training: classroom_details_for_training,
  classroom_for_exam: classroom_for_exam,
  seat_update: seat_update,
  insert_count: insert_count,
  time_slots_lists: time_slots_lists,
  bulk_booking: bulk_booking,
  Classroom_num: Classroom_num,
  classroom_id: classroom_id
};

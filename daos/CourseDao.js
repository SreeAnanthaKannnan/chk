const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");

/*========insering data into course table==========*/
function Course_insert(param) {

    return new Promise(async function(resolve, reject) {
        console.log("param", param)

        let res1 = await mysqlConnection
            .insert_query(query.courseinsert, param)
        console.log(res1, "dbresult")
        /*======if db error exists throwing the error message=====*/
        if (res1.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }else {
            return resolve({
                status: 200,
                result: res1.data
            });

        }
    })
}
/*====================course select function================*/
function Course_select(param) {

    return new Promise(async function(resolve, reject) {

        var res1 = await mysqlConnection
            /*==============selecting the course name for the given course id=============*/
            .query_execute(query.courseselect, [param])
        console.log(res1, "dbresult")
        /*======if db error exists throwing the error message=====*/
        if (res1.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }else {
            return resolve({
                status: 200,
                result: res1.data
            });

        }

    })
}
/*===========displaying the course data for english version======*/
function Course_display() {

    return new Promise(async function(resolve, reject) {
        /*======selecting the course names form the course table==========*/
        var res1 = await mysqlConnection
            .query_execute(query.coursenames, [])
        console.log(res1, "dbresult")
        /*======if db error exists throwing the error message=====*/

        if (res1.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }else {
            console.log(res1.data.length, "name")
            let value = []
            let myobject = new Object;
            for (i = 0; i < res1.data.length; i++) {
                /*========based on the front end searchable diaglog box, push the object data into value array=====*/
                var data = {}
                console.log(res1.data[i].name_en, "name_En")
                data = {
                    id: i + 1,
                    name: res1.data[i].name_en
                }
                value.push(data)

            }
            console.log(value, "value")

            return resolve({
                result: value
            });
        }

    });


}

/*===================display the course names in arabic===========*/
function Course_display_arabic() {

    return new Promise(async function(resolve, reject) {
        /*======selecting the course names form the course table and assign into res1 variable==========*/

        var res1 = await mysqlConnection
            .query_execute(query.coursenames, [])
        console.log(res1, "dbresult")

        if (res1.data.errno) {
            return reject({
                status:400,
                message:"هناك خطأ ما"
            })
        } else {
            console.log(res1.data.length, "name")
            let value = []
            for (i = 0; i < res1.data.length; i++) {
                /*========based on the front end searchable diaglog box, push the object data into value array=====*/
                var data = {}
                console.log(res1.data[i].name_ar, "name_Ar")
                data = {
                    id: i + 1,
                    name: res1.data[i].name_ar
                }
                value.push(data)

            }
            console.log(value, "value")

            return resolve({
                result: value
            });
        }

    });
}
//===========================================================================================//
function Course_amount(course_id, language) {

    return new Promise(async function(resolve, reject) {
        /*============selecting training amount from course table for the given course id==========*/
        var res1 = await mysqlConnection.query_execute(query.trainingamount, [course_id])
        if (res1.data.errno) {
            return reject({
                status:400,
                message:"something went wrong"
            })
        }


        console.log("res1===>", res1.data)
        return resolve({
            result: res1.data
        })

    })

}
/*============course id select from course table=================*/

function Course_id_select(course_name, language) {

    return new Promise(async function(resolve, reject) {
        /*=========selecting course name in english for given course name========*/
        if (language == "en") {
            var res1 = await mysqlConnection.query_execute(query.courseidforenglish, [course_name])

            if (res1.data.errno) {
                return reject("something went wrong")
            }
            console.log("res1===>", res1.data)
            return resolve({
                result: res1.data
            })
        }



        if (language == "ar") {
            /*=========selecting course name in arabic for given course name========*/

            var res1 = await mysqlConnection.query_execute(query.courseidforarabic, [course_name])

            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"هناك خطأ ما"
                })
            } 
            console.log("res1===>", res1.data)
            return resolve({
                result: res1.data
            })
        }

    })

}
//=====================================================================================//
function course_name_schedule(course_id, language) {

    return new Promise(async function(resolve, reject) {
        /*=====================selecting course name in arabic for the given course id=============*/
        if (language == "ar") {
            var res1 = await mysqlConnection.query_execute(query.arabiccoursename, [course_id])
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"هناك خطأ ما"
                })
            } else{    
            console.log("res1===>", res1.data)
            return resolve({
                result: res1.data
            })
        }
        }



        if (language == "en") {
            /*=====================selecting course name in english for the given course id=============*/

            var res1 = await mysqlConnection.query_execute(query.englishcoursename, [course_id])
            if (res1.data.errno) {
                return reject({
                    status:400,
                    message:"something went wrong"
                })
            }else{
            console.log("res1===>", res1.data)
            return resolve({
                result: res1.data
            })
        }
        }




    })

}

/*==========Exporting all the above functions to core function=============*/
module.exports = {
    Course_insert: Course_insert,
    Course_display: Course_display,
    Course_display_arabic: Course_display_arabic,
    Course_id_select: Course_id_select,
    Course_amount: Course_amount,
    course_name_schedule: course_name_schedule,
    Course_select: Course_select
}
/********************************Code Ends************************************** */
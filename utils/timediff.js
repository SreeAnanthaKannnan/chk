

let moment = require('moment')
function Session_time_difference(param1,param2) {
    return new Promise((resolve,reject)=>{
let session_created_time = moment(param1,"YYYY-MM-DD HH:mm:ss").format("LT")
     session_created_time = session_created_time.split(' ')[0]
     let Entry_time = moment(param2,"YYYY-MM-DD HH:mm:ss").format("LT")
     Entry_time = Entry_time.split(' ')[0]
     var Session_time_difference = moment.utc(moment(Entry_time, "HH:mm:ss").diff(moment(session_created_time, "HH:mm:ss"))).format("hh:mm")
   
        return resolve({
            Session_time_difference


        })
    })
}

module.exports = {
    Session_time_difference : Session_time_difference
}
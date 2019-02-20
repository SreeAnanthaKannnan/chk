let insertquery = require('../daos/AppealDao');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
// let date = require('date-and-time');
//let moment = require('moment')

exports.Appeal = (Appeal_Object) => new Promise(async(resolve, reject) => {
    let service = Appeal_Object.service;
    let Description = Appeal_Object.Description;
    //let today = new Date();
   // let Appeal_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
    let query_value =[service,Description]
    console.log(query_value,"query_value")
    let query= await insertquery.Appeal_insert(query_value)
       console.log(query !=0,"data inserted")
    // let language = await language_detect.languageDetect(service)
    // console.log(language.result,"language")
    //  let messagevalue =  await  message.getmessage(language.result,"S01")
    //   console.log(messagevalue,"last")
  
      return  resolve({
        status: 200,
        message:"Appeal Done", 
    }) 
})
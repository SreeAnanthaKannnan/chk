let insertquery = require('../daos/ImageDao');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
//const message = require('../Util/messages')
//const language_detect = require('../Util/language_detect')
// let date = require('date-and-time');
//let moment = require('moment')

exports.Image = (Imageobject) => new Promise(async(resolve, reject) => {
  
    let Image= Imageobject.Image;
    //let today = new Date();
   // let Appeal_date = moment(today).format("YYYY/MM/DD HH:mm:ss");
    let query_value =Image
    logger.fatal(query_value,"query_value")
    let query= await insertquery.Image_insert(query_value)
       logger.fatal(query !=0,"data inserted")
    // let language = await language_detect.languageDetect(service)
    // logger.fatal(language.result,"language")
    


    //  let messagevalue =  await  message.getmessage(language.result,"S01")
    //   logger.fatal(messagevalue,"last")
  
  
      return  resolve({
        status: 200,
        message:"Appeal Done",
        
        
    }) 
          


})
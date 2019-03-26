var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var translate = require('../utils/translate.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const langdetect = require('../utils/languagedetect');
let now = new Date();
//const moment =require("moment");
let date = require('date-and-time');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
module.exports={
  verify_user:verify_user,
  // user_type:user_type,
  insert_user:insert_user

}
//Here verify the user already exits or not, if exits through error
 function verify_user(registerobject){
  return new Promise( async function (resolve,reject){
   logger.fatal("i am in daos of verifyuser")
  var email_id= registerobject.email;
  var sql = "SELECT  * FROM citizens where email_id ='" + email_id + "'";
  con.query(sql,function(err,result){
    if(err) { logger.fatal("something",err)
        return reject({ "status": 400, "body": 'Cannot fetch the data' })}
        else{
              logger.fatal(result,"achieved")
        return resolve({ result});
        }
        
    }); 
  })
}
//if new user insert the data into DataBase
function insert_user(registerobject,otp){
  return new Promise(async function (resolve,reject){
  var email_id = registerobject.email;
  var firstname = registerobject.firstname;
  var lastname = registerobject.lastname;
  var company = registerobject.company;
  var nationality = registerobject.nationality.value;
  var alter_number = registerobject.phone;
  var mobile_number = registerobject.mobile;
  var address = registerobject.address;
  var po_box = registerobject.po_box;
  var language = registerobject.language;
  var emirates_id= registerobject.emirates_id;
  var newsletter = registerobject.newsletter;
  var user_type =registerobject.user_type;
  var type_description = registerobject.typedescription;
  var firstname_ar,firstname_en,lastname_ar,lastname_en,company_ar,company_en,nationality_ar,nationality_en,address_ar,address_en;
  var value;
  var verify_email ="N";
  var verify_mobile ="N";
  var password = cryptr.encrypt(registerobject.password);
  var reg_date = now;
  console.log(nationality,"in line 60")
  if(nationality==undefined){
    var nationality="united arab emirates"
  }
  else{
    var nationality=registerobject.nationality.value;
  }
  console.log(nationality,"in line 66")
  //Here the Registration Details converted into both arabic and english languages and stored in Data Base
 value = await langdetect.languageDetect(firstname)
    
        if(firstname ==""){
            firstname_ar = firstname;
          firstname_en = firstname;
        }
        else{
        logger.fatal(value.result,"value")
        if(value.result=="ar"){
        var temp =await translate.translate_en(firstname)
        firstname_en =temp.result;
        logger.fatal(firstname_en,"name_en")
        firstname_ar =firstname}
        else{ firstname_en = firstname
          var temp =await translate.translate_ar(firstname)
          logger.fatal(temp,"temp")
          firstname_ar = temp.result}
        }
        if(lastname ==""){
            lastname_ar = lastname;
            lastname_en = lastname;
          }
          else{
          logger.fatal(value.result,"value")
          if(value.result=="ar"){
          var temp =await translate.translate_en(lastname)
          lastname_en =temp.result;
          logger.fatal(lastname_en,"name_en")
          lastname_ar =lastname}
          else{ lastname_en = lastname
            var temp =await translate.translate_ar(lastname)
            logger.fatal(temp,"temp")
          lastname_ar = temp.result}
          }
        if(address ==""){
          address_en =address;
          address_ar = address;
        }
        else{
     if(value.result=="ar"){   
    var temp =await translate.translate_en(address)
    logger.fatal(temp,"999999999999999")
    address_en =temp.result
    address_ar = address;
     }
     else{ address_en = address
      var temp =await translate.translate_ar(address)
      logger.fatal(temp,"999999999999999")
    address_ar = temp.result}
     }
    
    
    if(company ==""){
      company_ar = company;
      company_en = company;
    }
    else{
    if(value.result=="ar"){
    var temp =await translate.translate_en(company)
    company_en =temp.result
    }
      else{ company_en = company
        var temp =await translate.translate_ar(company)
        logger.fatal(temp,"999999999999999")
      company_ar = temp.result}
    }
    
    if(nationality =="")
    {
      nationality_ar = nationality;
      nationality_en = nationality
    }
    else{
    if(value.result=="ar"){
    
    var temp =await translate.translate_en(nationality)
    nationality_en =temp.result;
    nationality_ar = nationality
    }
    else{ nationality_en = nationality
      var temp =await translate.translate_ar(nationality)
      logger.fatal(temp,"999999999999999")
    nationality_ar = temp.result}
    }
    logger.fatal(firstname_en,firstname_ar,"test 124")
    var params=[firstname_en, firstname_ar,lastname_en,lastname_ar,company_en,company_ar,nationality_en,nationality_ar,alter_number,address_en,address_ar,emirates_id,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,newsletter,user_type,reg_date,otp]
    await mysqlConnection
    .insert_query(query.resgister,params)
    .then(function(result, err) {
      if (err) {
        //  console.log(result,"achieved")
        console.log("something", err);
        return resolve({ status: 400, err: err });
      } else {
        console.log(result);
        return resolve({ status: 200, message: result });
      }
    });
  
  })
}
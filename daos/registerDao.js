var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');
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
 function verify_user(registerobject){
  return new Promise( async function (resolve,reject){
   console.log("i am in daos of verifyuser")
  var email_id= registerobject.email;
  var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
  con.query(sql,function(err,result){
    if(err) { logger.fatal("something",err)
        return reject({ "status": 400, "body": 'Cannot fetch the data' })}
        else{
              console.log(result,"achieved")
        return resolve({ result});
        }
        
    }); 
  })
}

function insert_user(registerobject,otp){
  return new Promise(async function (resolve,reject){
  var email_id = registerobject.email;
  var name = registerobject.name;
  var company = registerobject.company;
  var nationality = registerobject.nationality;
  var phone_nmuber = registerobject.phone;
  var mobile_number = registerobject.mobile;
  var address = registerobject.address;
  var po_box = registerobject.po_box;
  var language = registerobject.language;
  var newsletter = registerobject.newsletter;
  var user_type = "1";
  var type_description = registerobject.typedescription;
  var name_ar,name_en,company_ar,company_en,nationality_ar,nationality_en,address_ar,address_en;
  var value;
  var verify_email ="N";
  var verify_mobile ="N";
  let password = cryptr.encrypt(registerobject.password);
        var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
        dbFunc.connectionRelease;
        value = await langdetect.languageDetect(name)
    
        if(name ==""){
          name_ar = name;
          name_en = name;
        }
        else{
        console.log(value.result,"value")
        if(value.result=="ar"){
        var temp =await translate.translate_en(name)
        name_en =temp.result;
        console.log(name_en,"name_en")
        name_ar =name}
        else{ name_en = name
          var temp =await translate.translate_ar(name)
          console.log(temp,"temp")
        name_ar = temp.result}
        }
        if(address ==""){
          address_en =address;
          address_ar = address;
        }
        else{
     if(value.result=="ar"){   
    var temp =await translate.translate_en(address)
    console.log(temp,"999999999999999")
    address_en =temp.result
    address_ar = address;
     }
     else{ address_en = address
      var temp =await translate.translate_ar(address)
      console.log(temp,"999999999999999")
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
        console.log(temp,"999999999999999")
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
      console.log(temp,"999999999999999")
    nationality_ar = temp.result}
    }
    console.log(name_en,name_ar,"test 124")
  var sql = "INSERT INTO Residents (name_en, name_ar,company_en,company_ar,nationality_en,nationality_ar,phone_nmuber,address_en,address_ar,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,newsletter,user_type,reg_date,otp) VALUES ('" + name_en + "','" + name_ar + "','" +company_en + "','" + company_ar + "','" + nationality_en + "','" + nationality_ar + "','" + phone_nmuber + "','" + address_en + "','" + address_ar + "', '" + po_box + "', '" + mobile_number + "', '" + email_id + "', '" + password + "','" + verify_mobile + "','" + verify_email + "', '" + language + "', '" + newsletter + "','" + user_type + "','" + date.format(now, 'YYYY/MM/DD HH:mm:ss') +"','" + otp + "')";
  con.query(sql,function(err,result){
    if(err) { console.log("something",err)
        return reject({ "status": 400, "body": 'Cannot fetch the data' })}
        else{
              console.log(result,"achieved")
        return resolve({ result});
        }
        
    }); 
  })
}
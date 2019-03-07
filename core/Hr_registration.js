const util = require("../utils/mobile_otp");
const emailOTP = require("../utils/email_otp_generation");
const hr_registrationDao = require("../daos/Hr_RegistrationDao");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const date = require("date-and-time");

exports.hr_registration = hr => {
  return new Promise(async (resolve, reject) => {
    let PhoneNumber = hr.PhoneNumber;
    //    let  Trade_Licence_No= hr.Trade_Licence_No;
    let CompanyName = hr.CompanyName;
    let Contact_Number = hr.Contact_Number;
    let Company_Email = hr.Company_Email;
    let Contact_Name = hr.Contact_Name;
    let Address1 = hr.Address1;
    let Address2 = hr.Address2;
    let Address3 = hr.Address3;
    let Password = cryptr.encrypt(hr.Password);
    let Contact_Mobile = hr.Contact_Mobile;
    let City = hr.City;
    //    let Company_Category = hr.Company_Category;
    //    let Mandatory_Training_Percentage = hr.Mandatory_Training_Percentage;
    //    let Total_Employee_Count = hr.Total_Employee_Count;
    let mobile_otp, email_verify_link, verify_mobile, verify_email;

    let now = new Date();

    let select_query = await hr_registrationDao.Hr_select(Company_Email);
    console.log(select_query.length, "kavitha");
    if (select_query.length == 1) {
      return resolve({
        status: 401,
        message: "User Already Exists"
      });
    } else {
      let otp = await util.otp(Contact_Mobile);
      console.log(otp, "testing");
      let query_value = [
        CompanyName,
        Company_Email,
        Address1,
        Address2,
        Address3,
        City,
        PhoneNumber,
        Contact_Number,
        Contact_Name,
        Contact_Mobile,
        Password,
        otp,
        date.format(now, "YYYY/MM/DD HH:mm:ss")
      ];

      let emailotp = await emailOTP.email_otp(otp, Company_Email);
      console.log(emailotp);
      let query = await hr_registrationDao.Hr_insert(query_value);

      return resolve({
        status: 200,
        message: "Please Check your mail for one time password"
      });
    }
  });
};

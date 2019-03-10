const util = require("../utils/mobile_otp");
const emailOTP = require("../utils/email_otp_generation");
//const hr_registrationDao = require("../DAO/Hr_RegistrationDao");

const gr_registrationDao = require("../daos/General_RegisterDAO");



const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const date = require("date-and-time");

exports.gr_registration = gr => {
    console.log("enter in to the core")
    return new Promise(async (resolve, reject) => {
        let First_Name = gr.First_Name;
        let Last_Name = gr.Last_Name;
        let Emirates_ID = gr.Emirates_ID;
        let Contact_Mobile = gr.Contact_Mobile;
        let AlternateNumber = gr.AlternateNumber;
        let Email = gr.Email;
        let Password = cryptr.encrypt(gr.Password);
        let Nationality = gr.Nationality;
        let Address1 = gr.Address1
        let Company = gr.Company;
        let POBOX = gr.POBOX;
        let usertype = "residence"


        //    let Company_Category = hr.Company_Category;
        //    let Mandatory_Training_Percentage = hr.Mandatory_Training_Percentage;
        //    let Total_Employee_Count = hr.Total_Employee_Count;
        let mobile_otp, email_verify_link, verify_mobile, verify_email;

        let now = new Date();

        let select_query = await gr_registrationDao.gr_select(Email);
        console.log(select_query.length, "core_query_length");
        if (select_query.length == 1) {
            return resolve({
                status: 401,
                message: "User Already Exists"
            });
        } else {
            let otp = await util.otp(Contact_Mobile);
            console.log(otp, "otp_core");
            let query_value = [
                First_Name,
                Last_Name,
                Emirates_ID,
                Contact_Mobile,
                AlternateNumber,
                Email,
                Password,
                Nationality,
                Address1,
                Company,
                POBOX,
                otp,
                usertype,
                date.format(now, "YYYY/MM/DD HH:mm:ss")
            ];

            let emailotp = await emailOTP.email_otp(otp, Email);
            console.log(emailotp);
            let query = await gr_registrationDao.gr_insert(query_value);
            console.log("query_core==>", query)

            return resolve({
                status: 200,
                message: "Please Check your mail for one time password"
            });
        }
    });
};

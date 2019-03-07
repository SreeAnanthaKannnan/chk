

const language_detect = require('../utils/language_detect')
const translate = require('../utils/translate')
const token_gen = require('../utils/token')



exports.employee_registration = (employee_Object) => new Promise(async(resolve, reject) => {

   let name    = employee_Object.employee_name;
   let company     = employee_Object.employee_company;
   let  nationality = employee_Object.employee_nationality;
   let  phoneNumber = employee_Object.employee_phonenumber;
   let address     = employee_Object.employee_address;
   let name_en,name_ar,company_en,company_ar,nationality_ar,nationality_en,address_en,address_ar 

    let language = await language_detect.languageDetect(name)
    console.log(language.result,"language")
    if(language.result =="en"){
       let temp = await translate.translate_ar(name)
       console.log(temp)
       name_ar = temp.result;
       name_en = name
            
    }
    else{
        name_ar =name
        let temp = await translate.translate_en(name)
        name_en = temp.result;
    }
     language = await language_detect.languageDetect(company)
    console.log(language.result,"language")
    if(language.result =="en"){
       let temp = await translate.translate_ar(company)
       console.log(temp)
       company_ar = temp.result;
       name_en = name
            
    }
    else{
        company_ar =company
        let temp = await translate.translate_en(company)
        company_en = temp.result;
    }
     language = await language_detect.languageDetect(address)
    console.log(language.result,"language")
    if(language.result =="en"){
       let temp = await translate.translate_ar(address)
       console.log(temp)
       address_ar = temp.result;
       address_en = name
            
    }
    else{
        address_ar =company
        let temp = await translate.translate_en(address)
        address_en = temp.result;
    }
     language = await language_detect.languageDetect(nationality)
    if(language.result =="en"){
        let temp = await translate.translate_ar(nationality)
        console.log(temp)
        nationality_ar = temp.result;
        nationality_en = nationality
             
     }
     else{
         nationality_ar = nationality
         let temp = await translate.translate_en(nationality)
         nationality_en = temp.result;
     }

//      let value = await token_gen.token(name)
// let token = value.result; 
    


    return  resolve({
        status: 200,
        message:"success",
        
        
    })




})

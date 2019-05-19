var puppeteer = require('puppeteer');
var fs = require('fs-extra');
// const fs = require('fs');
var hbs = require('handlebars');
var path = require('path');
var moment = require('moment');
const nodemailer = require('nodemailer')
let insertquery = require('../daos/pdfDao')
var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})
var dateFormat = require('dateformat');
var citizen = require('../daos/loginDao');
var service = require('../daos/loginDao');
var dateFormat = require("dateformat");
var os = require('os');
const {
    EOL
} = os;
let buildingDao = require('../daos/buildingDao')
var JSZip = require('jszip');

// let createReport =require( 'docx-templates');




// var docxConverter = require('docx-pdf');
// var unoconv = require('unoconv');
// const unoconv = require('unoconv-promise');
// var office2pdf = require('office2pdf');
var unoconv = require('lib-unoconv')
async function pdf1_ar(
    supplier_id,
    schedule_id,
    building_id,
    PC,
    FA,
    SC,
    TS,
    TL,
    FPP,
    FAS,
    FPF,
    FAR,
    D1v,
    D2v,
    D3v,
    D4v,
    D5v,
    D6v,
    D7v,
    D8v,
    D9v,
    signalcheckedv,
    timesignalcheckedv,
    timearrivedv,
    timeleftv,
    BRAND,
    telno,
    simno

) {


    // function Pdf(yesvalue1,novalue1,yesvalue2,novalue2,yesvalue3,novalue3,yesvalue4,novalue4,yesvalue5,novalue5,yesvalue6,novalue6,yesvalue7,novalue7,yesvalue8,novalue8,yesvalue9,novalue9,email,checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,D1,D2)  {
    // var yesValue = checked == "yes" ? "checked" : ""
    // var noValue = checked === "no" ? "checked" : ""

    return new Promise(async function(resolve, reject) {




        console.log(supplier_id,
            schedule_id,
            building_id,
            PC,
            FA,
            SC,
            TS,
            TL,
            FPP,
            FAS,
            FPF,
            FAR,
            D1v,
            D2v,
            D3v,
            D4v,
            D5v,
            D6v,
            D7v,
            D8v,
            D9v,
            signalcheckedv,
            timesignalcheckedv,
            timearrivedv,
            timeleftv,
            BRAND,
            telno,
            simno, "myvaluesssssssssssss======>")
        var query = await buildingDao.pdf_insert1(
            supplier_id,
            schedule_id,
            building_id,
            PC,
            FA,
            SC,
            TS,
            TL,
            FPP,
            FAS,
            FPF,
            FAR,
            D1v,
            D2v,
            D3v,
            D4v,
            D5v,
            D6v,
            D7v,
            D8v,
            D9v,
            signalcheckedv,
            timesignalcheckedv,
            timearrivedv,
            timeleftv,
            BRAND,
            telno,
            simno)

        console.log(query, "query====>")



        var building_owner_email_id = await buildingDao.building_owner_email_id(building_id)
        console.log(building_owner_email_id.result.data[0].email_id, "id==========>")
        let owner_email_id = building_owner_email_id.result.data[0].email_id;
        var result = await citizen.citizendao(schedule_id);
        // var mobile_number=result.result[0].mobile_number;
        console.log(result, "citizen ================>")
        var date = dateFormat(new Date(), "yyyy-mm-dd");
        console.log(date);

        var lat = result.result[0].lat;
        var lon = result.result[0].lon;
        var buildingname = result.result[0].Buildingname;
        var plot = result.result[0].plotno;
        var supplier_name = await buildingDao.supplier_name(supplier_id)
        console.log(supplier_name, "supplier=============>")
        // supplier_name = supplier_name.result.data[0].firstname_en;
        var supplier_name_ar = supplier_name.result.data[0].firstname_ar;
        console.log(supplier_name_ar, "name================?")
        var building_owner_name = await buildingDao.building_owner_name(owner_email_id)
        building_owner_name = building_owner_name.result.data[0].firstname_en;
        console.log(building_owner_name,"wonerrrrrrrr")
        var b_ar = building_owner_name;

      
        var jobs = result.result[0].orderid
        var Ass_No = "0" + result.result[0].Ass_No;
        console.log(Ass_No, "Ass_No")
        console.log(jobs, "jobs")
        var job = jobs + -(Ass_No)
        
        if (signalcheckedv == "Y") {
            signalcheckedv = signalcheckedv + "ES"
        } else if (signalcheckedv == "N") {
            signalcheckedv = signalcheckedv + "O"
        } else {
            signalcheckedv = "NILL"
        }

        // var D1 = result.result[0].D1;
        // var D2 = result.result[0].D2;
        // var D3 = result.result[0].D3;
        // var D4 = result.result[0].D4;
        // var D5 = result.result[0].D5;
        // var D6 = result.result[0].D6;
        // var D7 = result.result[0].D7;
        // var D8 = result.result[0].D8;
        // var D9 = result.result[0].D9;
  
        var buildingaddress = result.result[0].address;

        if (PC == "N" ||
            FA == "N" ||
            SC == "N" ||
            TS == "N" ||
            TL == "N" ||
            FPP == "N" ||
            FAS == "N" ||
            FPF == "N" ||
            FAR == "N") {

            // var myResult = [{
            //         " Power 220 V": PC
            //     },
            //     {
            //         "Fire Alarm Signal": FAS
            //     },
            //     {
            //         "Fire Alarm Fault Signal": FA
            //     },
            //     {
            //         "Fire Pump Run Signal": FPP
            //     },
            //     {
            //         "Fire Pump Fault Signal": FPF
            //     },
            //     {
            //         "Tamper Signal": TS
            //     },
            //     {
            //         "Telephone Line": TL
            //     },

            //     {
            //         "SIM Card": SC
            //     },
            //     {
            //         "Fire Alarm Reset": FAR
            //     }
            // ]

    //         var myResult_ar = [{
    //           "السلطة V220": PC //v220--
    //       },
    //       {
    //           "اشاره إنذار الحريق": FAS  //Fire Alarm Signal--
    //       },
    //       {
    //           "خطا إنذار الحريق": FA //fire alaram--
    //       },
    //       {
    //           "مضخة الحريق السلطة": FPP  //Fire Pump Run Signal--
    //       },
    //       {
    //           "مضخة الحريق": FPF //"Fire Pump Fault Signal"
    //       },
    //       {
    //         "اشاره العبث": TS //Tamper Signal--
    //       },
    //       {
    //           "خط الهاتف": TL //Telephone Line--
    //       },

    //       {
    //           "بطاقة SIM": SC //SIM Card--
    //       },
    //       {
    //           "أعاده تعيين إنذار الحريق": FAR  //Fire Alarm Reset--
    //       }
    //   ]






            //var discription = [D1v, D2v, D3v, D4v, D5v, D6v, D7v, D8v, D9v]
            
            // console.log("1456456" + str, "str========================>")
            var JSZip = require('jszip');
            var Docxtemplater = require('docxtemplater');

            var fs = require('fs');

            //Load the docx file as a binary
            var path = require('path');

            var content = fs
                .readFileSync(path.resolve( './report/21910-10270-008-R1 -  أمان - تقرير التقييم.docx'), 'binary');
                
            var zip = new JSZip(content);

            var doc = new Docxtemplater();
            doc.loadZip(zip);
            doc.setData({
                "date": date,
                "buildingname": buildingname,
                "buildingaddress": buildingaddress,
                "Ass_No": Ass_No,
                "job": job,
                "mobile": telno,
                "plot": plot,
                "lat": lat,
                "lan": result.result[0].lon,
                "Brand": BRAND,
                "timearrived": timearrivedv,
                "timeleft": timeleftv,
                "timesignalchecked": timesignalcheckedv,
                "signalverification": signalcheckedv,
                "D1":D1v,
                "D2":D2v,
                "D3":D3v,
                "D4":D4v,
                "D5":D5v,
                "D6":D6v,
                "D7":D7v,
                "D8":D8v,
                "D9":D9v,
                "simno": simno,
                "supplier_name_ar": supplier_name_ar,
                "b_ar":b_ar
            })
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            } catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({
                    error: e
                }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }

            var buf = doc.getZip()
                .generate({
                    type: 'nodebuffer'
                });


            console.log("above", './report/assessmentreport.docx')
            fs.writeFileSync(path.resolve('./report/21910-10270-008-R11 -أمان -تقريرالتقييم.docx'), buf, 'binary');

            await unoconv.convert('./report/21910-10270-008-R11 -أمان -تقريرالتقييم.docx', 'pdf', async function(err, result) {
                // result is returned as a Buffer
                await fs.writeFile('./report/21910-10270-008-R11 -أمان -تقريرالتقييم.docx' + date + supplier_id + '.pdf', result);
            });
            // fs.writeFileSync(path.resolve(__dirname, "../report/outAman Assessment.docx"), buf);

            // await unoconv.convert('../report/outAman Assessment.docx', 'pdf', async function (err, result) {
            // // result is returned as a Buffer
            // await fs.writeFile('../report/outAman Assessment.docx'+datetime+email+'.pdf', result);
            // });
            // docxConverter('../report/assessmentreports.docx','../report/assessmentreports.docx'+date+supplier_id+'.pdf',function(err,result){
            //   if(err){
            //     console.log(err,"=========================>>>>>>");
            //   }
            //   console.log('result'+result);
            // });




            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "Amanservice2019@gmail.com",
                    pass: "Aman@2019"
                }
            });

            var mailOptions = {
                transport: transporter,
                from: "Saned Services" + "<Amanservice2019@gmail.com>",
                to: supplier_id,
                subject: 'Saned Services',
                cc: owner_email_id,
                attachments: [{ // filename and content type is derived from path
                    // filename and content type is derived from path
                    path: './report/21910-10270-008-R11 -أمان -تقريرالتقييم.docx' + date + supplier_id + '.pdf'
                }, ],

                html: "Dear " + supplier_id + "<br>This is your survey Report for your building" + " " + supplier_id + "  with SANED as a Supplier.  SANED will be rolling out new services for Sharjah residents." + "<br><br>" + "We will contact you for further information.<br><br><br>" + "Best Regards,<br>" + "SANED Team."

            };
            transporter.sendMail(mailOptions, (error, info) => {
                console.log("error", error)

                if (error) {
                    console.log("Mail send error: ", error);
                }
            })
            return resolve({
                status: 200,
                message: "pdf sent successfully"
            })
        }
        //=======================================installation completes===============//
        else {
            var JSZip = require('jszip');
            var Docxtemplater = require('docxtemplater');

            var fs = require('fs');

            //Load the docx file as a binary
            var path = require('path');

            var content = fs
                .readFileSync(path.resolve('./report/21910-10270-021-R1 -  أمان - تقرير التثبيت.docx'), 'binary');

            var zip = new JSZip(content);

            var doc = new Docxtemplater();
            doc.loadZip(zip);
            doc.setData({
                "date": date,
                "buildingname": buildingname,
                "buildingaddress": buildingaddress,
                "Ass_No": Ass_No,
                "job": job,
                "mobile": telno,
                "plot": plot,
                "lat": lat,
                "lan": result.result[0].lon,
                "Brand": BRAND,
                "timearrived": timearrivedv,
                "timeleft": timeleftv,
                "timesignalchecked": timesignalcheckedv,
                "signalverification": signalcheckedv,
                "simno": simno,
                "supplier_name": supplier_name_ar,
                "building_owner_name": b_ar
            })
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            } catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({
                    error: e
                }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }

            var buf = doc.getZip()
                .generate({
                    type: 'nodebuffer'
                });


            console.log("above", './report/Aman Installation.docx')
            fs.writeFileSync(path.resolve('./report/21910-10270-021-R11-أمان -تقرير التثبيت.docx'), buf, 'binary');

            await unoconv.convert('./report/21910-10270-021-R11-أمان -تقرير التثبيت.docx', 'pdf', async function(err, result) {
                // result is returned as a Buffer
                await fs.writeFile('./report/21910-10270-021-R11-أمان -تقرير التثبيت.docx' + date + supplier_id + '.pdf', result);
            });
            // fs.writeFileSync(path.resolve(__dirname, "../report/outAman Assessment.docx"), buf);

            // await unoconv.convert('../report/outAman Assessment.docx', 'pdf', async function (err, result) {
            // // result is returned as a Buffer
            // await fs.writeFile('../report/outAman Assessment.docx'+datetime+email+'.pdf', result);
            // });
            // docxConverter('../report/assessmentreports.docx','../report/assessmentreports.docx'+date+supplier_id+'.pdf',function(err,result){
            //   if(err){
            //     console.log(err,"=========================>>>>>>");
            //   }
            //   console.log('result'+result);
            // });




            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "Amanservice2019@gmail.com",
                    pass: "Aman@2019"
                }
            });

            var mailOptions = {
                transport: transporter,
                from: "Saned Services" + "<Amanservice2019@gmail.com>",
                to: supplier_id,
                subject: 'Saned Services',
                cc: owner_email_id,
                attachments: [{ // filename and content type is derived from path
                    // filename and content type is derived from path
                    path: './report/21910-10270-021-R11-أمان -تقرير التثبيت.docx' + date + supplier_id + '.pdf'
                }, ],

                html: "Dear " + supplier_id + "<br>هذا هو تقرير المسح الخاص بك لمبنى" + " " + supplier_id + "  with SANED as a Supplier.  SANED will be rolling out new services for Sharjah residents." + "<br><br>" + "We will contact you for further information.<br><br><br>" + "Best Regards,<br>" + "SANED Team."

            };
            transporter.sendMail(mailOptions, (error, info) => {
                console.log("error", error)

                if (error) {
                    console.log("Mail send error: ", error);
                }
            })
            return resolve({
                status: 200,
                message: "pdf sent successfully"
            })




        }




    })


}

module.exports = {
    pdf1_ar: pdf1_ar
}
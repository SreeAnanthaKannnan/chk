var puppeteer = require("puppeteer");
var fs = require("fs-extra");
var hbs = require("handlebars");
var path = require("path");
var moment = require("moment");
const nodemailer = require("nodemailer");
let insertquery = require("../daos/pdfDao");
var express = require("express");
var multer = require("multer");
var upload = multer({
  dest: "uploads/"
});
var dateFormat = require("dateformat");
var log4js = require("log4js");
const logger = log4js.getLogger("Aman_project");
const checktoken = require("../utils/checkToken");

function Pdf(
  yesvalue1,
  novalue1,
  yesvalue2,
  novalue2,
  yesvalue3,
  novalue3,
  yesvalue4,
  novalue4,
  yesvalue5,
  novalue5,
  yesvalue6,
  novalue6,
  yesvalue7,
  novalue7,
  yesvalue8,
  novalue8,
  yesvalue9,
  novalue9,
  email,
  token
) {
  return new Promise(async function(resolve, reject) {
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
        } else {
            try {

                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                //==================================================Html File generation for creating pdf===================================================================//
                await page.setContent(`<!DOCTYPE html>
        <html>
                 
        </head>
        <body>
        
        <div> <p style='text-align:center'>CheckList(قائمة التحقق)</p> </div>
        <div style='display:flex; flex-direction:row'>
        
        <div style='width:50%; flex-direction:column '>
        
        <div>
            <p>Fire Alarm system ready? </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox"${yesvalue1}>Yes </input>
             <input type="checkbox"${novalue1} >No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
        
           <div>
            <p>Fire Alarm cable ready?   </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue2}>Yes </input>
             <input type="checkbox" ${novalue2}>No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
        
        
             <div>
            <p>Fire Alarm reset cable ready?  </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue3}>Yes </input>
             <input type="checkbox" ${novalue3}>No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
          <div>
            <p>Fire fighting water pump status cable ready?  </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue4}>Yes </input>
             <input type="checkbox" ${novalue4}>No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
        <div>
            <p>Power 220Vac cable ready?  </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue5}>Yes </input>
             <input type="checkbox" ${novalue5} >No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
          <div>
            <p>Telephone line ready?  </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox"${yesvalue6} >Yes </input>
             <input type="checkbox"${novalue6} >No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
          <div>
            <p>Telephone cable ready?  </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue7}>Yes </input>
             <input type="checkbox"${novalue7} >No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
          <div>
            <p> 
        
        Fire Alarm and Fire Fighting Contractors available onsite?   </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue8}>Yes </input>
             <input type="checkbox" ${novalue8}>No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
          <div>
            <p>GSM Signal Available near the fire alarm panel?  </p>
            <div style='margin-bottom:1px'>
            <input type="checkbox" ${yesvalue9}>Yes </input>
             <input type="checkbox" ${novalue9}>No </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:30px;'></div>
          </div>
        
        </div>
        
        
        
        
        
        <div style='width:50%; flex-direction:column ' dir="rtl">
        
        <div>
            <p>نظام إنذار الحريق على استعداد؟</p>
            <div style='margin-bottom:9px'>
            <input type="checkbox" ${yesvalue1}>نعم </input>
             <input type="checkbox" ${novalue1}>لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
        
           <div>
            <p>كابل إنذار الحريق جاهز؟  </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue2}>نعم </input>
             <input type="checkbox" ${novalue2}>لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
        
        
             <div>
            <p>كابل إعادة إنذار الحريق جاهز؟  </p>
            <div style='margin-bottom:9px'>
           <input type="checkbox" ${yesvalue3}>نعم </input>
             <input type="checkbox" ${novalue3}>لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
          <div>
            <p>كابل مكافحة الحرائق وضع كابل المياه جاهز؟ </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue4}>نعم </input>
             <input type="checkbox" ${novalue4}>لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
        <div>
            <p>كابل الطاقة 220Vac جاهزة؟
         </p>
            <div style='margin-bottom:8px'>
            <input type="checkbox" ${yesvalue5}>نعم </input>
             <input type="checkbox" ${novalue5}>لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
          <div>
            <p>خط هاتفي جاهز؟ </p>
            <div style='margin-bottom:10px'>
            <input type="checkbox" ${yesvalue6}>نعم </input>
             <input type="checkbox"${novalue6} >لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
          <div>
            <p>كابل الهاتف جاهز؟ </p>
            <div style='margin-bottom:9px'>
           <input type="checkbox" ${yesvalue7}>نعم </input>
             <input type="checkbox"${novalue7} >لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
          <div>
            <p> 
        الانذار ومكافحة الحرائق والمقاولين المتاحة على  </p>
            <div style='margin-bottom:8px'>
          <input type="checkbox" ${yesvalue8}>نعم </input>
             <input type="checkbox"${novalue8} >لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
          <div>
            <p>متاح بالقرب من لوحة إنذار الحريق؟  </p>
            <div style='margin-bottom:1px'>
            <input type="checkbox" ${yesvalue9} >نعم </input>
             <input type="checkbox" ${novalue9}>لا </input>
            </div>
        
            <div style='border-bottom: solid black 1px; margin-right:1px;'></div>
          </div>
        
        </div>
        
        
        
        </div>
        
        </div>
        
        
        </div>
        
        </body>
        </html>
        `);

        await page.emulateMedia("screen");
        var datetime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        console.log(datetime);

        //============================================================storing pdf file path==============================================================//
        var path = "/pdf" + datetime + email + ".pdf";
        //Here the path of the pdf will be stored in DataBase
        let query = await insertquery.pdf_insert(path, email);
        console.log(query != 0, "data inserted");
        console.log("guess done");
        await page
          .pdf({
            path: "./uploads/pdf" + datetime + email + ".pdf",
            format: "A4",
            printBackground: true
          })
          .then(result => {
            return resolve({
              message: "pdf conversion done",
              result: new Buffer(result).toString("base64")
            });
          });

        //==========================================================pdf file sent through Building owner mail======================================================================//
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "Amanservice2019@gmail.com",
            pass: "Aman@2019"
          }
        });
        //=============================== filename and content type is derived from path=================================================================================//

        var mailOptions = {
          transport: transporter,
          from: "Saned Services" + "<Amanservice2019@gmail.com>",
          to: email,
          subject: "Saned Services",
          attachments: [
            {
              path: "./uploads/pdf" + datetime + email + ".pdf"
            }
          ],

          html:
            "Dear " +
            email +
            "<br>This is your survey Report for your building" +
            "" +
            email +
            "  with SANED as a Supplier.  SANED will be rolling out new services for Sharjah residents." +
            "<br><br>" +
            "We will contact you for further information.<br><br><br>" +
            "Best Regards,<br>" +
            "SANED Team."
        };
        console.log(path, "pathfghfff");
        transporter.sendMail(mailOptions, (error, info) => {
          console.log("error", error);

          if (error) {
            console.log("Mail send error: ", error);
          }
        });

        return resolve({
          message: ""
        });
      } catch (e) {
        console.log("our error", e);
        return reject({
          message: "not done"
        });
      }
    }
  });
}

module.exports = {
  Pdf: Pdf
};

//====================================================================Code End======================================================================================//

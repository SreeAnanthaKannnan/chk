var puppeteer=require('puppeteer');
var fs=require('fs-extra');
// const fs = require('fs');
var hbs=require('handlebars');
var path=require('path');
var moment=require('moment');
const nodemailer = require('nodemailer')
let insertquery = require('../daos/pdfDao')
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var dateFormat = require('dateformat');
var citizen = require('../daos/loginDao');
var dateFormat = require("dateformat");
// var docxConverter = require('docx-pdf');
// var unoconv = require('unoconv');
// const unoconv = require('unoconv-promise');
// var office2pdf = require('office2pdf');
var unoconv = require('lib-unoconv')

function Pdf  (yesvalue1,novalue1,yesvalue2,novalue2,yesvalue3,novalue3,yesvalue4,novalue4,yesvalue5,novalue5,yesvalue6,novalue6,yesvalue7,novalue7,yesvalue8,novalue8,yesvalue9,novalue9,yesvalue10,novalue10,email,checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,checked10)  {
  // var yesValue = checked == "yes" ? "checked" : ""
  // var noValue = checked === "no" ? "checked" : ""

  return new Promise(async function(resolve,reject){
  console.log(yesvalue1,novalue1,yesvalue2,novalue2,"kieue=============")
    try{
      // var yesvalue1 = checked1 == "yes" ? "checked" : ""
      // var novalue1 = checked1== "no" ? "checked" : ""
      // var yesvalue2 = checked2 == "yes" ? "checked" : ""
      // var novalue2 = checked2== "no" ? "checked" : ""
      // var yesvalue3=checked3=="yes"?"checked":""


      const browser= await puppeteer.launch();
      const page=await browser.newPage();
     // const HeadingName="Hall Ticket"
      // const ImgSrc=__dirname+'/survey.png'
      // console.log("ImgSrc==========",ImgSrc)
      // console.log(yesvalue3)

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
        <div>
        <p>FA Company Representative Available?  </p>
        <div style='margin-bottom:1px'>
        <input type="checkbox" ${yesvalue10}>Yes </input>
         <input type="checkbox" ${novalue10}>No </input>
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
        <div>
        <p>ممثل شركة FA متاح؟</p>
        <div style='margin-bottom:1px'>
        <input type="checkbox" ${yesvalue10} >نعم </input>
         <input type="checkbox" ${novalue10}>لا </input>
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
      // <input type="checkbox" style="margin-right=293px" name="vehicle1" value="Bike" ${yesvalue3}><p style="text-align:justify;margin:3px;margin-left: 20px;
      // margin-top: -18px;">All the information provided above is true <br>the best of my knowledge.I understand I will be<br>levied a penality if found to be incorrect
      //   <div style="margin-top: 53px;
//     margin-left: 182px;">
//   <input type="submit" value="Submit">
//   </div>
      await page.emulateMedia('screen');
      var datetime = dateFormat (new Date(),"yyyy-mm-dd h:MM:ss");
      console.log(datetime);
      var  path='/pdf'+datetime+email+'.pdf';

      let query= await insertquery.pdf_insert(path,email,checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,checked10)
      console.log(query !=0,"data inserted")
       console.log("guess done");
      await page.pdf({
       
        path: './uploads/pdf'+datetime+email+'.pdf',
          format:'A4',
          printBackground:true
         
      }).then(result=>{
          // var path1=[path1]
          // var path=upload.array('filepath')
          // let query_value =[path,email]
          // console.log(query_value,"query_value")
       
          return resolve({
          message:"pdf conversion done",
          result: (new Buffer(result)).toString('base64')
         
      })
  })
//==========================================================================================================

var result = await citizen.citizendao(email);
  var _mobile=result.result[0].mobile_number;
  var lat=result.result[0].lat;
  var lon=result.result[0].lon;
  var buildname=result.result[0].Buildingname;
  var plot=result.result[0].plotno;
  var loc=result.result[0].location;
  var simno=result.result[0].simnumber;
  var scp=result.result[0].NSP;
  var scn=result.result[0].SPCN;
  var fac=result.result[0].FAC;

  var p220v=result.result[0].P220V;
     if(p220v=="yes"){
         yes1='✓';
         no1='x'
     }
     else{
         yes1='x';
         no1='✓'
     }
   
     var fasa=result.result[0].FASA;
     if(fasa=='yes'){
      yes2='✓';
      no2='x'
     }
     else{
      yes2='x';
      no2='✓'
     }
     var fars=result.result[0].FARS;
     if(fars=='yes'){
      yes3='✓';
      no3='x'
     }
     else{
      yes3='x';
      no3='✓'
  }
     var fafs=result.result[0].FAFS;
     if(fafs=='yes'){
      yes4='✓';
      no4='x'
     }
     else{
      yes4='x';
      no4='✓'
     }
     var tams=result.result[0].TAMS;
     if(tams=='yes'){
      yes5='✓';
      no5='x'
     }
     else{
      yes5='x';
      no5='✓'
     }
     var fpps=result.result[0].FPPS;
     if(fpps=='yes'){
      yes6='✓';
      no6='x'
     }
     else{
      yes6='x';
      no6='✓'
     }
     var fpfs=result.result[0].FPFS;
     if(fpfs=='yes'){
      yes7='✓';
      no7='x'
  }
  else{
      yes7='x';
      no7='✓'
  }
     var sim=result.result[0].SIM;
     if(sim=='yes'){
      yes8='✓';
      no8='x'
  }
  else{
      yes8='x';
      no8='✓'
  }
     var tla=result.result[0].TLA;
     if(tla=='yes'){
      yes9='✓';
      no9='x'
  }
  else{
      yes9='x';
      no9='✓'
  }
     var facr=result.result[0].FACR;
     if(facr=='yes'){
      yes10='✓';
      no10='x'
  }
  else{
      yes10='x';
      no10='✓'
  }
    

  dateFormat("yyyy-mm-dd HH:MM:ss")
  console.log(_mobile,lat,lon,"login"); 
 

var zip = new require('node-zip')
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

//Load the docx file as a binary
var content = fs
  .readFileSync(path.resolve(__dirname, "/home/bahirathy/saned_spsa_backend/report/AMANPrerequisiteReport.docx"), 'binary');

var zip = new JSZip(content);

var doc = new Docxtemplater();
await doc.loadZip(zip);

//set the templateVariables
console.log("mobile",_mobile)
console.log("lat",lat)
console.log("lon",lon)
// console.log(checked10,"hhhhhhhh")

await doc.setData({
  
    "yes1":yes1,
    "no1":no1,
    "yes2":yes2,
    "no2":no2,
    "yes3":yes3,
    "no3":no3,
    "yes4":yes4,
    "no4":no4,
    "yes5":yes5,
    "no5":no5,
    "yes6":yes6,
    "no6":no6,
    "yes7":yes7,
    "no7":no7,
    "yes8":yes8,
    "no8":no8,
    "yes9":yes9,
    "no9":no9,
    "yes10":yes10,
    "no10":no10,
        
    "mobile":_mobile,
    "lat":lat,                                    
    "lon":lon,
    "pname":buildname,
    "plot":plot,
    "loct":loc,
    "sim":simno,
    "scp":scp,
    "scn":scn,
    "fac":fac,
    "date":dateFormat("dd-mm-yyyy"),
    "email_id":email
  
});

try {
  doc.render()
}
catch (error) {
  var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
  }
  console.log(JSON.stringify({error: e}));
  // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
  throw error;
}

var buf = doc.getZip()
           .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
fs.writeFileSync(path.resolve(__dirname, "/home/bahirathy/saned_spsa_backend/report/outprerequist.docx"), buf);

await unoconv.convert('/home/bahirathy/saned_spsa_backend/report/outprerequist.docx', 'pdf', async function (err, result) {
// result is returned as a Buffer
await fs.writeFile('/home/bahirathy/saned_spsa_backend/report/outprerequist.docx'+datetime+email+'.pdf', result);
});

//==============================================================================================    
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
            to: email,
            subject: 'Saned Services',
            attachments: [{   // filename and content type is derived from path
            // filename and content type is derived from path
          path: '/home/bahirathy/saned_spsa_backend/report/outprerequist.docx'+datetime+email+'.pdf'
      },
          ],
          
            html: "Dear "+ email +"<br>This is your survey Report for your building"  +""+ email + "  with SANED as a Supplier.  SANED will be rolling out new services for Sharjah residents."+"<br><br>" + "We will contact you for further information.<br><br><br>"+"Best Regards,<br>"+"SANED Team."
      
          };
          console.log(path,"pathfghfff");
          transporter.sendMail(mailOptions, (error, info) => {
            console.log("error",error)
            
            if (error) {
              console.log("Mail send error: ", error);
            }
          })

          return resolve({message:""})
      
        // await browser.close();
        //  var result=await process.exit(    
        //  )
      
      } catch(e){
        console.log('our error',e)
        return reject({
            message:"not done"
        })
    }
 
 
      
        })
    }


module.exports={
  
 Pdf:Pdf
}
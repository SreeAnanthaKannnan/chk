// var updatedao = require('../daos/updatedao.js');
// var log4js = require('log4js');
// const logger = log4js.getLogger('SPSA_project');
// module.exports = {
//     update: update
// }

// function update(installation, token) {
//     logger.fatal(installation, "installation")
//     return new Promise(async (resolve, reject) => {
//         var verifytoken = await checktoken.checkToken(token)
//         if (verifytoken.status == 405) {
//             return resolve({
//                 status: verifytoken.status,
//                 message: verifytoken.message
//             })
//         } else if (verifytoken.status == 403) {
//             return resolve({
//                 status: verifytoken.status,
//                 message: verifytoken.message
//             })
//         }
//         else {
//                 var responseObj = {};
//                 //updatin
//                 var user = updatedao.updatedao(installation).then((data) => {
//                     logger.fatal(user, "user")
//                     responseObj.data = data;
//                     responseObj.errors = [];
//                     responseObj.meta = {};

//                     resolve(responseObj);
//                 }).catch((error) => {
//                     responseObj.data = [];
//                     responseObj.errors = [error];
//                     responseObj.meta = {};
//                 });
//             }
//         })
//     }

var updatedao = require('../daos/updatedao.js');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
var citizen = require('../daos/loginDao');
var dateFormat = require("dateformat");
var unoconv = require('lib-unoconv');
const nodemailer = require('nodemailer')





module.exports={
    update:update
}
async function update(installation) {
    console.log(installation,"installationdfdfdfd")
    console.log("mjfdjfdjj")
   return new Promise(async (resolve, reject) => {
       var responseObj = {};
       var datetime = dateFormat (new Date(),"yyyy-mm-dd h:MM:ss");
       var result = await citizen.service(installation.email);
       console.log("result=============>",result)
        var email=installation.email
       var mobile=result.result[0].mobile_number;
       var lat=result.result[0].lat;
       var lon=result.result[0].lon;
       var buildname=result.result[0].Buildingname;
       var plot=result.result[0].plotno;
       var loc=result.result[0].location;
       var simno=result.result[0].simnumber;
       var scp=result.result[0].NSP;
       var scn=result.result[0].SPCN;
       var fac=result.result[0].FAC;
       var FACP=result.result[0].FACP;
       var CSI=result.result[0].CSI;
       var BRAND=result.result[0].BRAND;
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
       var ass1=result.result[0].Assessment1;
       if(ass1=='yes' && result.result[0].Flag=='1'){
           var job='1';
           ass1='✓'
       }
       else{
           ass1=''
       }
        var ass2=result.result[0].Assessment2;
       if(ass2=='yes' && result.result[0].Flag=='2'){
        var job='2';
        ass2='✓'
       }
       else{
        ass2=''
    }
       var ass3=result.result[0].Assessment3;
       if(ass3=='yes' && result.result[0].Flag=='3'){
        var job='3';
        ass3='✓'
       }
       else{
        ass3=''
    }
    if(result.result[0].status=='assessed'){
        console.log("yttttttt")
        var ni='✓';
        var ppm='';
        var sv='';
         
    }
   
  if(result.result[0].status=='installed')
    {
         ppm= '✓';   
         ni='';
         sv='';
    }
   
    console.log("reuweuw",ni)
     
       var user = updatedao.updatedao(installation).then((data) => {
           console.log(user, "user")
           responseObj.data = data;
           responseObj.errors = [];
           responseObj.meta = {};
           resolve(responseObj);
       }).catch((error) => {
           responseObj.data = [];
           responseObj.errors = [error];
           responseObj.meta = {};
       });
       var zip = new require('node-zip')
       var Docxtemplater = require('docxtemplater');
       
       var fs = require('fs');
       var path = require('path');
       
       //Load the docx file as a binary
       var content = fs
           .readFileSync(path.resolve(__dirname, "/home/bahirathy/saned_spsa_backend/report/ServiceReport.docx"), 'binary');
       
       var zip = new JSZip(content);
       
       var doc = new Docxtemplater();
       doc.loadZip(zip);
       
       
       doc.setData({
        //  "p220v":p220v,
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
        "ass1":ass1,
        "ass2":ass2,
        "ass3":ass3,
        "job":job,
        "mobile":mobile,
        "lat":lat,                                    
        "lon":lon,
        "pname":buildname,
         "plot":plot,
             "loct":loc,
             "simno":simno,
             "scp":scp,
             "scn":scn,
             "fac":fac,
             "FACP":FACP,
             "CSI":CSI,
             "BRAND":BRAND,
             "ni":ni,
             "sv":sv,
             "ppm":ppm,
             "date":dateFormat("dd-mm-yyyy"),
             "email_id":email
           
       });
       console.log("set================",doc.setData)
       
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
       fs.writeFileSync(path.resolve(__dirname, "/home/bahirathy/saned_spsa_backend/report/outServiceReport.docx"), buf);
   
   unoconv.convert('/home/bahirathy/saned_spsa_backend/report/outServiceReport.docx', 'pdf', async function (err, result) {
       // result is returned as a Buffer
       await fs.writeFile('/home/bahirathy/saned_spsa_backend/report/outServiceReport.docx'+datetime+email+'.pdf', result);
   });
 
//================================================================================================
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
        path: '/home/bahirathy/saned_spsa_backend/report/outServiceReport.docx'+datetime+email+'.pdf'
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
        
           } )}
    
      
  


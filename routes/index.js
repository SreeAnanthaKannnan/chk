/**
 * @author: Vikram Viswanathan
 * @version: 1.0.0
 * @date: February 20, 2019
 * @description: This would be the routes file where all the API definitions and implementations are described.
 */

/**
 * Usage of strict mode
 * 1. It catches some common coding bloopers, throwing exceptions.
 * 2. It prevents, or throws errors, when relatively “unsafe” actions are taken (such as gaining access to the 
 *    global object).
 * 3. It disables features that are confusing or poorly thought out.
 */
'use strict';

var express = require('express'),
    router = express.Router(),
    cors = require('cors');

var con = require('../mysql_connection/dbConfig.js'),
    login = require('../core/login.js'),
    login1 = require('../core/login1.js'),
    consentform = require('../core/consentform.js'),
    register = require('../core/register.js'),
    aregister = require('../core/aregister.js'),
    cregister = require('../core/cregister.js'),
    history = require('../core/history'),
    building = require('../core/building'),
    assesserview = require('../core/assesserview'),
    schedule = require('../core/schedule'),
    schedulefun = require('../core/Bulkschedule'),
    getBuildings= require('../core/getBuildings'),
    profile= require('../core/profile'),
    check = require('../utils/checkToken'),
    phone = require('../utils/phonecheck.js'),
    image = require('../core/image.js'),
    pdf = require('../core/pdf.js'),
    upload=require('../core/upload.js'),
    pdf1=require('../core/pdfviewer.js'),
    update = require('../core/update'),
    assessment = require('../core/assessment'),
    book = require('../core/servicehistory'),
    multer = require("multer"),
   
    path = require('path');
    
    
let Appeal = require('../core/Appeal'),
    moment = require('moment');

const Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey'),
    nodemailer = require('nodemailer'),
   
  // logger = require('morgan'),
    fs = require('fs');
var  log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

/* GET home page. */
router.get('/', function (request, response, next) {
    response.render('index', {
        title: 'Express Page for Saneds SPSA application.'
    });
});

//=======================loginservice==================================================//
router.post('/login', cors(), function(req, res) {
    var loginobject = req.body;       
    login.loginuser(loginobject).then(result => {
        res.send({
            result:result,
        })
    }).catch(err => res.status(err.status).json({
        message: err.message
    }))
})

//=======================loginservice==================================================//
router.post('/login-supplier', cors(), function(req, res) {
    var loginobject = req.body;       
    login1.loginuser(loginobject).then(result => {
        res.send({
            result:result,
        })
    }).catch(err => res.status(err.status).json({
        message: err.message
    }))
})

//=======================registerservice===============================================//
router.post('/register', cors(), function(req, res){
    var registerobject= req.body;
    register.register(registerobject)
    .then(result=>{
             res.send({
                 result:result,
           
        })
      })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
  })
//=======================registerservice==========================================================//
router.post('/admin-register', cors(), function(req, res){
    var registerobject= req.body;
    logger.fatal(registerobject,"registerobject");
    aregister.aregister(registerobject)
    .then(result=>{
            res.send({
                result:result,
        
        })
    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
    })     
     //=========================citizen-registration-start===========================================
  router.post('/citizen-register', cors(),async function(req, res){
    var registerobject= req.body;
    logger.fatal(registerobject,"registerobject");
    var mobile=registerobject.mobile;
    var result=await phone.validateMobileNumber(mobile)
    if(result==false)
    {
        res.send({
            message:"Please check Your Mobile number"
        })
    }
    else{
    cregister.cregister(registerobject)
    .then(result=>{
             res.send({
                 result:result,
           
        })
      })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
}
  }) 
  router.post("/emailotpverification1", cors(), async function(req, res){
    //var id = await check.checkToken(req);
    
    // if(id.status==400 || id.status==403){
    //     res.send({
    //         result:id
    //     })
    // }
    // else{
    var otp = req.body.otp;
    logger.fatal(req.body);
    var email_id = req.body.email;
  logger.fatal(otp);
  con.query("SELECT otp FROM citizens where email_id = '" + email_id + "'",  function(error, results, fields) {
      if (error) {
          throw error;
      } else {
     
          if (results.length != 0) {
           
              if (results[0].otp == req.body.otp) {
                  
                 var verify_email = "Y"
                  con.query("UPDATE citizens SET verify_email = '" + verify_email + "' WHERE otp = '" + results[0].otp + "'",  function(error, results, fields) {});
                  res.send({
                      status: 200,
                      "message": "You are successfully registered",
                      الرسالة: "أنت مسجل بنجاح"
                  });
              }} else {
                  res.send({
                      status: 401,
                      "message": "Invalid one time password",
                      رسالة: "كلمة مرور غير صالحة مرة واحدة"
                  });
              }
        }
  });
// }
  });
//========================================citizen-registration-end=====================================
    //=====================================emailotpverification========================================
    router.post("/emailotpverification", cors(), async function(req, res){
    //var id = await check.checkToken(req);

    // if(id.status==400 || id.status==403){
    //     res.send({
    //         result:id
    //     })
    // }
    // else{
    var otp = req.body.otp;
    logger.fatal(req.body);
    var email_id = req.body.email_id;
    logger.fatal(otp);
    con.query("SELECT * FROM Residents where otp = '" + otp+ "'",  function(error, results, fields) {
    if (error) {
        throw error;
    } else {
    
        if (results.length != 0) {
        
            if (results[0].otp == req.body.otp) {
                
                var verify_email = "Y"
                con.query("UPDATE Residents SET verify_email = '" + verify_email + "' WHERE otp = '" + results[0].otp + "'",  function(error, results, fields) {});
                res.send({
                    status: "true",
                    "message": "You are successfully registered",
                    الرسالة: "أنت مسجل بنجاح"
                });
            }} else {
                res.send({
                    status: "false",
                    "message": "Invalid one time password",
                    رسالة: "كلمة مرور غير صالحة مرة واحدة"
                });
            }
        }
    });
    // }
    });


    //=================================================================================================    
    router.post('/consentform', cors(), async function(req, res){
        var id = await check.checkToken(req);

    if(id.status==400 || id.status==403){
        res.send({
            result:id
        })
    }
    else{
        var consentformobject= req.body;
        consentform.consentform(consentformobject)
        .then(result=>{
                res.send({
                    result:result,
                
            })
        })
        .catch(err => res.status(err.status).json({
            message: err.message
        }))
    }
    })
   
    router.post('/getdetails', cors(),async function(req, res){
        var id = await check.checkToken(req);

        if(id.status==400 || id.status==403){
            res.send({
                result:id
            })
        }
        else{
        var id= req.body.id;
        history.getHistory(id)
        .then(result=>{
                res.send({
                    result:result,
                
            })
        })
        .catch(err => res.status(err.status).json({
            message: err.message
        }))
    }
    })
    //=================================Appeal====================================================      
    router.post('/Appeal', cors(),async function (req, res){
        var id = await check.checkToken(req);

    if(id.status==400 || id.status==403){
        res.send({
            result:id
        })
    }
    else{
        const Appeal_Object = req.body;
        logger.fatal(Appeal_Object);
        Appeal.Appeal(Appeal_Object)
                .then(result => {
                    logger.fatal(result)
                    res
                        .status(result.status)
                        .json({
                            message: result,
                        });
    })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
            }
        
    });

    //===================================addbuilding=============================================//
    router.post('/AddsingleBuilding', cors(), async function(req, res){
    var id = await check.checkToken(req);
    logger.fatal(id);
    if(id.status == 400 && id.status == 403){
        res.send({
            result:id
        })
    }
    else{
        var email_id = id.result;
    var buildingobject= req.body;

    building.buildings(buildingobject,email_id)
    .then(result=>{
            res.send({
                result:result,
        message: "Your Building Details added successfully"
    })
  })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))

}

});
//===================================getbuildings======================================================//
router.post('/getBuildings', cors(), async function(req, res){
    var id =await check.checkToken(req);
    if(id.status==400 || id.status==403){
        res.send({
            result:id
        })
    }
    else{
    var buildingobject= id.result;
    logger.fatal(buildingobject,"data");
    getBuildings.getbuildings(buildingobject)
    .then(result=>{
            res.send({
                result:result,
                message: "mock mock"
        })
    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
    }
    })
//==============================Residentsdetails===========================================//    
    router.post('/profile', cors(), async function(req, res){
        // var id =await check.checkToken(req);
        // if(id.status==400 || id.status==403){
        //     res.send({
        //         result:id
        //     })
        // }
        // else{
        //var buildingobject= id.result;
        var buildingobject=req.body.email;
        logger.fatal(buildingobject,"data");
        profile.getbuildings(buildingobject)
        .then(result=>{
                res.send({
                    result:result,
                    message: "mock mock"
            })
        })
        .catch(err => res.status(err.status).json({
            message: err.message
        }))
       // }
        })
    //=======================================================================================================
    router.post('/installationdetails', cors(), function(req, res){
        var installation= req.body;
        logger.fatal(installation,"installation");
        update.update(installation)
        .then(result=>{
                 res.send({
                     result:result,
               
            })
          })
        .catch(err => res.status(err.status).json({
            message: err.message
        }))
      }) 
      //=============================upload=====================================================
var uploads = multer({ dest: '/var/www/html/'});
router.use('/download', express.static(path.join(__dirname, 'upload')))
// File input field name is simply 'file'
//router.use('/static', express.static(path.join(__dirname, 'uploads')))
router.post('/file_upload', uploads.single('file'), function(req, res) {
 var file = '/var/www/html/' + '/' + req.file.filename;
 var email_id=req.body.email

 var filepath=req.file.path
  fs.rename(filepath, file, function(err) {

   if (err) {
     logger.fatal(err);
     res.send(500);
   } else {
   
    upload.upload(filepath,email_id)
    .then(result=>{
      res.send({
        message:'file uploaded successfully',
          result:req.file.filename
     
 })
})
.catch(err => res.status(err.status).json({
 message: err.message
}))

   }
 });
});
//==============================Booking-History============================================//
router.post('/serviceHistory', cors(),function(req, res){
    var email_id= req.body.email_id;       
    book.bookservice(email_id)
    .then(result=>{
             res.send({
                 result:result,
        })
      })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
  })
//==============================================================================================
    router.post('/Assessment', cors(),async function(req, res){
    // var id = await check.checkToken(req);
    //  if(id.status==400 || id.status==403){
    //  res.send({
    //     result:id
    //   })
    // }
    //  else{
    logger.fatal(req.body);
    var id= req.body.id
    var status=req.body.status
    if (!id || !status.trim()) {
            res
            .status(40)
            .json({
                message: 'Please enter the details completely !'
            });
        }
    else {
        assessment.assessment(id,status)
        .then(result => {
        res.send({
            "message": "schedule details saved",
            "status": true,
            result:result,
            
        });
            })
        .catch(err => res.status(err.status).json({
            message: err.message
        }))
    
    }
    //    }
    });
    //==========================assesser-view=====================================================//
    router.get('/assesser-view', cors(),async function(req, res){
    var id = await check.checkToken(req);

    if(id.status==400 || id.status==403){
        res.send({
            result:id
        })
    }
    else{
    assesserview.assesserview()
    .then(result=>{
            res.send({
                result:result.result.result,
            
        })
    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
    }
    })
   
    router.post('/textimage', cors(), (req, res,next) => {
    const uploadFile=req.files.file;
    const fileName = req.files.file.name
    //   logger.fatal(Appeal_Object)
    const Image= uploadFile.mv(
        `${__dirname}/public/files/${fileName}`,
    image.Image(Image)
            .then(result => {
                logger.fatal(result)
                res
                    .status(result.status)
                    .json({
                        message: result,
                    });
    })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
    }))
    )
    });
    //======================================forgetpassword===========================================
    //===============================forgetpassword==============================================//
    router.post('/forgetpassword',(req,res) =>{

    let forgetpassword = req.body;
    logger.fatal("body",forgetpassword);
    let password = req.body.password;
    logger.fatal(password)
    let confirmpassword = req.body.confirmpassword;
    let username = req.body.email;
    if(!username || !password || !confirmpassword)
    {
    res.send({
        "message":"Please fill all the details"
    })
    }
    else{
    logger.fatal(username)
            let sql = "SELECT * FROM Residents where email_id ='" + username + "'";
        
            con.query(sql, function (err, result) {
            // logger.fatal(result,"select")
            if (err) throw err;
            // dbFunc.connectionRelease;
            // logger.fatal("DataBase ERR:",err)
            //logger.fatal("Database Error while selecting from register table:",err)
            if(result.length == 0){
                logger.fatal("i am here")
                res.send({message:"Invalid User Name",
                الرسالة: "اسم المستخدم غير صالح"              })
            // dbFunc.connectionRelease;
            }
            
    else{
    if(password !=confirmpassword){
    res.send({message:"password doesn't match",
    الرسالة: "كلمة المرور غير متطابقة"})
    }
    else{
        

            if(cryptr.decrypt(result[0].password) == password ){
                logger.fatal("previous");
            res.send({
                message:"Password should not be a previously used one",
                رسالة:"مرور سبق استخدامهاكلمة المرور لا يجب أن تكون كلمة"
            });
            //dbFunc.connectionRelease;
            }
            // });
            else{
            var otp = "";
            var possible = "0123456789";
            var namea;
            var namen;
            for (var i = 0; i < 4; i++)
                otp += possible.charAt(Math.floor(Math.random() * possible.length));
        
            logger.fatal(otp,"otp");
            // var encodedMail = new Buffer(req.body.email).toString('base64');
            let sql = "SELECT * FROM Residents where email_id ='" + username + "'";
            con.query(sql,function (err,result){
                if (err) throw err;
                //dbFunc.connectionRelease;
                namen=result[0].name_en;
                namea=result[0].name_ar;

            //  })
            logger.fatal("datanames",result[0].name_en);
            logger.fatal(result[0].name_ar);
            logger.fatal("copy",namen);
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                user: "sanedservices2019@gmail.com",
                pass: "Sanedwebservices1!"
                }
            });
            var mailOptions = {
            transport: transporter,
            from: "Saned Services" + "<sanedservices2019@gmail.com>",
            to: req.body.email,
            subject: 'Saned Service-OTP Verification',
            
            html: "Dear  "+ result[0].name_en+"/"+ result[0].name_ar +"<br>Your one Time Password for forgotPassword recovery for Saned services,<br> Your one time password is.<br> " + otp + "<br>" +
                "كلمة المرور الخاصة بك مرة واحدة نسيت استرداد كلمة المرور لخدمات Saned" + namea + "  العزيز,<br> Your One time password is. <br> " + otp +"<br>"
            
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
            
            if (error) {
                logger.fatal("Mail send error: ", error);
            }
            })
            var sql ="UPDATE Residents SET otp = '" + otp + "' WHERE email_id = '" + username + "'";
            con.query(sql, function (err) {
            if (err) throw err;
            // dbFunc.connectionRelease;
            // logger.fatal("DataBase ERR:",err)
            res.send({message:"Please check your mail for One time Password",
            رسالة:"يرجى التحقق من بريدك مرة واحدة لكلمة المرور"});
            });
        // dbFunc.connectionRelease;
        })
        }
        }
    }
        
    } );
    }
    });
    //========================forgetpassword-otp===============================//
    router.post("/forgetotpverification", cors(), (req, res) => {
    var otp = req.body.otp;
    var password = cryptr.encrypt(req.body.password)

    logger.fatal(otp);

    con.query("SELECT * FROM Residents where otp='" + otp+ "'",  function(error, results, fields) {
    if (error) {
        res.send({
            "status": false,
            "message": "error"
        })
    } else {
        
        if (results.length > 0) {
            if (results[0].otp == otp) {
                logger.fatal(otp);
                con.query("UPDATE Residents SET password = '" + password + "' WHERE otp = '" + otp + "'",  function(error, results, fields) {});
                    res.send({
                    status: "true",
                    "message": "one time password is verified and Password updated successfully",
                    رسالة: "كلمة مرور مرة واحدة تم التحقق من كلمة المرور وتحديثها بنجاح"
                });
            } 
        }
        else {
            res.send({
                status: "false",
                "message": "Invalid one time password",
                رسالة: "كلمة مرور غير صالحة مرة واحدة"
            });
        }
    }
    });
    });


   
    router.post('/schedules', cors(),async function(req, res){
    logger.fatal(req.body);
    var time=req.body.schedule_time;
    var reqdate= req.body.requestdate;
    var building_id=req.body.building_id;
    //logger.fatal("id",req.body.id);
    logger.fatal("building_id",building_id);
    var date = moment(new Date(reqdate.substr(0, 16)));
    var rdate=date.format("YYYY-MM-DD HH:mm:ss");
    schedule.sup(time,rdate,building_id)
    .then(result=>{
            res.send({
                result:result,
            
        })
    })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
    //}
    })
    //============================================convert pdf===================================================//

  router.post('/Convert_Pdf', cors(), async function (req, res) {
    let checked1=req.body.SelectedValues1;
    let checked2=req.body.SelectedValues2;
    let checked3=req.body.SelectedValues3;
    let checked4=req.body.SelectedValues4;
    let checked5=req.body.SelectedValues5;
    let checked6=req.body.SelectedValues6;
    let checked7=req.body.SelectedValues7;
    let checked8=req.body.SelectedValues8;
    let checked9=req.body.SelectedValues9;
    let email=req.body.email;
   // let checked3=req.body.SelectedValues3;
    if(checked1=="yes"){
        yesvalue1="checked";
        novalue1="unchecked"
    }
    else{
        yesvalue1="unchecked";
        novalue1="checked"
    }
    if(checked2=="yes"){
        yesvalue2="checked";
        novalue2="unchecked"
    }
    else{
        yesvalue2="unchecked";
        novalue2="checked"
    }
    if(checked3=="yes"){
        yesvalue3="checked";
        novalue3="unchecked"
    }
    else{
        yesvalue3="unchecked";
        novalue3="checked"
    }
    if(checked4=="yes"){
        yesvalue4="checked";
        novalue4="unchecked"
    }
    else{
        yesvalue4="unchecked";
        novalue4="checked"
    }
    if(checked5=="yes"){
        yesvalue5="checked";
        novalue5="unchecked"
    }
    else{
        yesvalue5="unchecked";
        novalue5="checked"
    }
    if(checked6=="yes"){
        yesvalue6="checked";
        novalue6="unchecked"
    }
    else{
        yesvalue6="unchecked";
        novalue6="checked"
    }
    if(checked7=="yes"){
        yesvalue7="checked";
        novalue7="unchecked"
    }
    else{
        yesvalue7="unchecked";
        novalue7="checked"
    }
    if(checked8=="yes"){
        yesvalue8="checked";
        novalue8="unchecked"
    }
    else{
        yesvalue8="unchecked";
        novalue8="checked"
    }
    if(checked9=="yes"){
        yesvalue9="checked";
        novalue9="unchecked"
    }
    else{
        yesvalue9="unchecked";
        novalue9="checked"
    }
//    var yesvalue3="checked";

   
    //logger.fatal("All data=====>>", checked1,checked2,checked3);
   pdf.Pdf(yesvalue1,novalue1,yesvalue2,novalue2,yesvalue3,novalue3,yesvalue4,novalue4,yesvalue5,novalue5,yesvalue6,novalue6,yesvalue7,novalue7,yesvalue8,novalue8,yesvalue9,novalue9,email)
      // pdf.mail(email)
       res.send({
           "message":"success"
       })
})

//=========================================pdfviewer=============================================

router.post('/pdfviewer', cors(),async function (req, res){
//     var id = await check.checkToken(req);

// if(id.status==400 || id.status==403){
//     res.send({
//         result:id
//     })
// }
//else{
    const email = req.body.email;
    pdf1.pdf1(email)
            .then(result => {
                logger.fatal(result)
                res
                    .status(result.status)
                    .json({
                        message: result,
                     });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
        // }
    
});
//================================installationdetails=================================//
router.post('/installationdetails', cors(), function(req, res){
    var installation= req.body;
    logger.fatal(installation,"installation");
    update.update(installation)
    .then(result=>{
             res.send({
                 result:result,
           
        })
      })
    .catch(err => res.status(err.status).json({
        message: err.message
    }))
  })  
//==================================bulkschedules============================================//
  router.post('/BulkSchedules', cors(),async function(req, res){
    console.log(req.body);

   var schedules=req.body;
    console.log("schedules",schedules.schedule.schedule);
    console.log("length",schedules.schedule.schedule.length);
    console.log("reqdate",schedules.schedule.schedule[0].selectedStartDate);
    for(let i=0;i<schedules.schedule.schedule.length;i++){
        console.log(i,"i")
    let uidate = schedules.schedule.schedule[i].selectedStartDate;
   var date =  moment(new Date(uidate.substr(0, 16)));
   var rdate=  date.format("YYYY-MM-DD");
  await schedulefun.sup(schedules.schedule.schedule[i].time,rdate,schedules.schedule.schedule[i].building_id)
    
    }
    
    res.send({
        "message":"Your Buildings are scheduled for service. Please visit booking history for details"
    })
   
  })

router.post('/blockchain', cors(),async function(req, res){

    var transaction={
        name:"manoj",
        address:"chennai"
    }
var params={
    id:"1",
    fun:"create",
    data:transaction
}
 
     
     bc.main(params)
     .then(result=>{
        res.send({
            result:result,
       
   })
 })
.catch(err => res.status(err.status).json({
   message: err.message
}))
    })
       



module.exports = router;
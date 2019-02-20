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
    history = require('../core/history'),
    building = require('../core/building'),
    assesserview = require('../core/assesserview'),
    schedule = require('../core/schedule'),
    getBuildings= require('../core/getBuildings'),
    check = require('../utils/checkToken'),
    image = require('../core/image.js'),
    pdf = require('../core/pdf.js'),
    assessment = require('../core/assessment');
    
let Appeal = require('../core/Appeal'),
    moment = require('moment');

const Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey'),
    nodemailer = require('nodemailer');

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
    console.log(registerobject,"registerobject");
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
    //====================================consentform==================================================   
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
    console.log(req.body);
    var email_id = req.body.email_id;
    console.log(otp);
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
    //=============================schedule=====================================================
    // router.post('/schedules', cors(), async function(req, res){
    //     var id = await check.checkToken(req);

    //     if(id.status==400 || id.status==403){
    //         res.send({
    //             result:id
    //         })
    //     }
    //     else{
    //     var s= req.body;
    //     console.log(s,"s");
    //     var schedule_time= req.body.schedule_time;
    // //     let dateTime = new Date(trade_license_validity);
    // //    trade_license_validity = moment(dateTime).format("YYYY/MM/DD HH:mm:ss");
    //     var requestdate1=req.body.requestdate
    //     var building_id = req.body.building_id
    //      if (!schedule_time || !requestdate1) {

    //         res
    //             .status(40)
    //             .json({
    //                 message: 'Please enter the details completely !'
    //             });

    //     }
    //     else {

    //         schedule.schedule(schedule_time,requestdate1,building_id)
    //         .then(result => {
    //         res.send({
    //             "message": "schedule details saved",
    //             "status": true,
    //             result:result,
        
    //        });
    //             })
    //         .catch(err => res.status(err.status).json({
    //             message: err.message
    //         }))
    //     }
    // }
    // })
    //==============================================================================================
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
        console.log(Appeal_Object);
        Appeal.Appeal(Appeal_Object)
                .then(result => {
                    console.log(result)
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
    console.log(id);
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
    console.log(buildingobject,"data");
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
    //=======================================================================================================

    router.post('/Assessment', cors(),async function(req, res){
    // var id = await check.checkToken(req);
    //  if(id.status==400 || id.status==403){
    //  res.send({
    //     result:id
    //   })
    // }
    //  else{
    console.log(req.body);
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
    //   router.post('/upload', (req, res, next) => {
    //     let uploadFile = req.files.file
    //     const fileName = req.files.file.name
    //     uploadFile.mv(
    //       `${__dirname}/public/files/${fileName}`,
    //       function (err) {
    //         if (err) {
    //           return res.status(500).send(err)
    //         }

    //         res.json({
    //           file: `public/${req.files.file.name}`,
    //         })
    //       },
    //     )
    //   })
    router.post('/textimage', cors(), (req, res,next) => {
    const uploadFile=req.files.file;
    const fileName = req.files.file.name
    //   console.log(Appeal_Object)
    const Image= uploadFile.mv(
        `${__dirname}/public/files/${fileName}`,
    image.Image(Image)
            .then(result => {
                console.log(result)
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
    console.log("body",forgetpassword);
    let password = req.body.password;
    console.log(password)
    let confirmpassword = req.body.confirmpassword;
    let username = req.body.email;
    if(!username || !password || !confirmpassword)
    {
    res.send({
        "message":"Please fill all the details"
    })
    }
    else{
    console.log(username)
            let sql = "SELECT * FROM Residents where email_id ='" + username + "'";
        
            con.query(sql, function (err, result) {
            // logger.fatal(result,"select")
            if (err) throw err;
            // dbFunc.connectionRelease;
            // logger.fatal("DataBase ERR:",err)
            //logger.fatal("Database Error while selecting from register table:",err)
            if(result.length == 0){
                console.log("i am here")
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
                console.log("previous");
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
        
            console.log(otp,"otp");
            // var encodedMail = new Buffer(req.body.email).toString('base64');
            let sql = "SELECT * FROM Residents where email_id ='" + username + "'";
            con.query(sql,function (err,result){
                if (err) throw err;
                //dbFunc.connectionRelease;
                namen=result[0].name_en;
                namea=result[0].name_ar;

            //  })
            console.log("datanames",result[0].name_en);
            console.log(result[0].name_ar);
            console.log("copy",namen);
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
                console.log("Mail send error: ", error);
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

    console.log(otp);

    con.query("SELECT * FROM Residents where otp='" + otp+ "'",  function(error, results, fields) {
    if (error) {
        res.send({
            "status": false,
            "message": "error"
        })
    } else {
        
        if (results.length > 0) {
            if (results[0].otp == otp) {
                console.log(otp);
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


    //==========================forgetotpend===================================//
    //================================pdf===========================================//
    router.post('/Convert_Pdf', cors(), async function (req, res) {
    //    var id = await check.checkToken(req);
    //  if(id.status==400 || id.status==403){
    //    res.send({
    //      result:id
    // })
    //}
    // else{
    console.log(req.body);
    let checked1=req.body.SelectedValues1;
    let checked2=req.body.SelectedValues2;
    //let email=id.result;
    // let checked3=req.body.SelectedValues3;
    if(checked1=="1"){
        yesvalue1="checked";
        novalue1="unchecked"
    }
    else{
        yesvalue1="unchecked";
        novalue1="checked"
    }
    if(checked2=="1"){
        yesvalue2="checked";
        novalue2="unchecked"
    }
    else{
        yesvalue2="unchecked";
        novalue2="checked"
    }
    //    var yesvalue3="checked";

    var email = req.body.email_id;
    //console.log("All data=====>>", checked1,checked2,checked3);
    pdf.Pdf(yesvalue1,novalue1,yesvalue2,novalue2)
    pdf.mail(email)
    res.send({
        "message":"success"
    })
    //}
    })
    //===============================pdfend==========================================//
    router.post('/schedules', cors(),async function(req, res){
    console.log(req.body);
    var time=req.body.schedule_time;
    var reqdate= req.body.requestdate;
    var building_id=req.body.building_id;
    //console.log("id",req.body.id);
    console.log("building_id",building_id);
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

module.exports = router;
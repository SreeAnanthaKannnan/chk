/**
 * @author: Manoj V
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
"use strict";

var express = require("express"),
  router = express.Router(),
  cors = require("cors"),
  multipart = require("connect-multiparty"),
  multer = require("multer"),
  path = require("path");
// log4js = require('log4js');

var con = require("../mysql_connection/dbConfig.js"),
  login = require("../core/login.js"),
  cregister = require("../core/cregister.js"),
  history = require("../core/history"),
  building = require("../core/building"),
  assesserview = require("../core/assesserview"),
  schedule = require("../core/schedule"),
  schedulefun = require("../core/Bulkschedule"),
  getBuildings = require("../core/getBuildings"),
  profile = require("../core/profile"),
  check = require("../utils/checkToken"),
  phone = require("../utils/phonecheck.js"),
  pdf = require("../core/pdf.js"),
  upload = require("../core/upload.js"),
  pdf1 = require("../core/pdfviewer.js"),
  update = require("../core/update"),
  assessment = require("../core/assessment"),
  book = require("../core/servicehistory"),
  image_upload = require("../core/image_upload");

let moment = require("moment");
let Appeal = require("../core/Appeal"),



  Employee_profile = require("../core/Employee_profile"),


  safety_officer_details = require("../core/Employee_safetyofficer_profile_showup"),

  classroom = require("../core/Classroom"),
  scheduling = require("../core/Scheduling"),
  available_date1 = require("../core/Available_date_showup"),
  //  photo = require("../core/Photo_upload"),
  company_profile = require("../core/Company_profile"),
  company_trading_license = require("../core/Company_trade_license"),
  trainer_account = require("../core/Trainer_registration"),
  course_view = require("../core/Course_view"),
  trainer_names = require("../core/Trainer_names"),
  course_creation = require("../core/Course_creation"),
  time_slots_list = require("../core/Time_slots_list"),
  Trained_Employees = require("../core/Trained_Employees_list"),
  Untrained_Employees = require("../core/Untrained_Employees_showup"),
  schedule_summary = require("../core/Schedule_summary"),
  bulk_booking = require("../core/Bulk_booking"),
  certificate = require("../core/certificate"),
  uploadSalama = require("../core/uploadbulkemployee"),

  Untrained_Employees_schedule = require("../core/Untrained_Employees_showup_schedule"),
  number_validation_schedule = require("../core/Number_validation_schedule"),
  ip = require("ip");

const trainer_attendance = require("../core/Trainer_attendance");

const Cryptr = require("cryptr"),
  cryptr = new Cryptr("myTotalySecretKey"),
  nodemailer = require("nodemailer"),
  fs = require("fs"),
  logger = require("morgan");
//logger = log4js.getLogger('Aman_project');

let ipAddress = ip.address();
console.log("ips====>", ipAddress);
// const storage = multer.diskStorage({
//     // notice you are calling the multer.diskStorage() method here, not multer()
//     // destination: function(req, file, cb) {
//     //     cb(null, '/home/kavitha/Videos/salama_docs/Salama_backend_v0.1/uploads/')
//     // },
//     destination: function(req, file, cb) {
//         cb(null, "/var/www/html/");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

var multipartMiddleware = multipart();

/* GET home page. */
router.get("/", function (request, response, next) {
  response.render("index", {
    title: "Express Page for Saneds SPSA application."
  });
});

//=======================loginservice==================================================//
router.post("/login", cors(), function (req, res) {
  var loginobject = req.body;
  login
    .loginuser(loginobject)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});


//=========================citizen-registration-start===========================================
router.post("/citizen-register", cors(), async function (req, res) {
  var registerobject = req.body;
  console.log(registerobject, "registerobject");
  var mobile = registerobject.mobile;
  var result = await phone.validateMobileNumber(mobile);
  if (result == false) {
    res.send({
      message: "Please check Your Mobile number"
    });
  } else {
    cregister
      .cregister(registerobject)
      .then(result => {
        res.send({
          result: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//====================================================================================//
router.post("/number_validation_schedule", cors(), function (req, res) {
  var data = req.body;
  var request = req.headers;
  number_validation_schedule
    .number_validation_schedule(data, request)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

//======================================================================================//
router.post("/emailotpverification1", cors(), async function (req, res) {
  var otp = req.body.otp;
  console.log(req.body);
  var email_id = req.body.email;
  console.log(otp);
  con.query(
    "SELECT otp FROM citizens where email_id = '" + email_id + "'",
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        if (results[0].otp == req.body.otp) {
          var verify_email = "Y";
          con.query(
            "UPDATE citizens SET verify_email = '" +
            verify_email +
            "' WHERE otp = '" +
            results[0].otp +
            "'",
            function (error, results, fields) { }
          );
          res.send({
            status: 200,
            message: "You are successfully registered",
            الرسالة: "أنت مسجل بنجاح"
          });
        } else {
          res.send({
            status: 401,
            message: "Invalid one time password",
            رسالة: "كلمة مرور غير صالحة مرة واحدة"
          });
        }
      }
    }
  );
});
//========================================citizen-registration-end=====================================


router.post("/getdetails", cors(), async function (req, res) {
  var id = await check.checkToken(req);

  if (id.status == 400 || id.status == 403) {
    res.send({
      result: id
    });
  } else {
    var id = req.body.id;
    history
      .getHistory(id)
      .then(result => {
        res.send({
          result: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//=================================Appeal====================================================

//===================================addbuilding=============================================//
router.post("/AddsingleBuilding", cors(), async function (req, res) {
  var id = await check.checkToken(req);
  console.log(id);
  if (id.status == 400 && id.status == 403) {
    res.send({
      result: id
    });
  } else {
    var email_id = id.result;
    var buildingobject = req.body;

    building
      .buildings(buildingobject, email_id)
      .then(result => {
        res.send({
          result: result,
          message: "Your Building Details added successfully"
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//===================================getbuildings======================================================//
router.post("/getBuildings", cors(), async function (req, res) {
  var id = await check.checkToken(req);
  if (id.status == 400 || id.status == 403) {
    res.send({
      result: id
    });
  } else {
    var buildingobject = id.result;
    console.log(buildingobject, "data");
    getBuildings
      .getbuildings(buildingobject)
      .then(result => {
        res.send({
          result: result,
          message: "mock mock"
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//=======================================================================================================
router.post("/installationdetails", cors(), function (req, res) {
  var installation = req.body;
  console.log(installation, "installation");
  update
    .update(installation)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//==============================Residentsdetails===========================================//
router.post("/profile", cors(), async function (req, res) {
  var id = await check.checkToken(req);
  if (id.status == 400 || id.status == 403) {
    res.send({
      result: id
    });
  } else {
    var buildingobject = id.result;
    //var buildingobject=req.body.email;
    console.log(buildingobject, "data");
    profile
      .getbuildings(buildingobject)
      .then(result => {
        res.send({
          result: result,
          message: "mock mock"
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//=======================================================================================================
router.post("/installationdetails", cors(), function (req, res) {
  var installation = req.body;
  console.log(installation, "installation");
  update
    .update(installation)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=============================upload=====================================================
var uploads = multer({
  dest: "var/www/html/"
});
//router.use("/download", express.static(path.join(__dirname, "../upload")));
// File input field name is simply 'file'
router.use("/static", express.static(path.join(__dirname, "../uploads")));
router.post("/file_upload", uploads.single("file"), function (req, res) {
  var file = "var/www/html/" + "/" + req.file.filename;
  console.log(req.file, "ffg");
  var email_id = "manoj";

  var filepath = req.file.path;
  fs.rename(filepath, file, function (err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      upload
        .upload(filepath, email_id)
        .then(result => {
          res.send({
            message: "file uploaded successfully",
            result: req.file.filename
          });
        })
        .catch(err =>
          res.status(err.status).json({
            message: err.message
          })
        );
    }
  });
});
//=================================image===============================================//
//=============================imageupload==================================================//

router.post("/image_upload", uploads.single("file"), function (req, res) {
  var file = "var/www/html/" + "/" + req.file.filename;
  console.log(req.file);
  console.log(req.body);
  var id = req.body.id;
  var filepath = req.file.path;
  fs.rename(filepath, file, function (err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      image_upload
        .image_upload(filepath, id)
        .then(result => {
          res.send({
            message: "file uploaded successfully",
            result: req.file.filename
          });
        })
        .catch(err =>
          res.status(err.status).json({
            message: err.message
          })
        );
    }
  });
});
//==============================Booking-History============================================//
router.post("/serviceHistory", cors(), async function (req, res) {
  var id = await check.checkToken(req);
  console.log(id);
  if (id.status == 400 && id.status == 403) {
    res.send({
      result: id
    });
  } else {
    var email_id = id.result;
    book
      .bookservice(email_id)
      .then(result => {
        res.send({
          result: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//==============================================================================================
router.post("/Assessment", cors(), async function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var status = req.body.status;
  if (!id || !status.trim()) {
    res.status(40).json({
      message: "Please enter the details completely !"
    });
  } else {
    assessment
      .assessment(id, status)
      .then(result => {
        res.send({
          message: "schedule details saved",
          status: true,
          result: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});

//=======================================================================================
router.get("/Schedule_summary", cors(), (req, res) => {
  //let data = req.body;
  let request = req.headers;
  // console.log(data);

  schedule_summary
    .schedule_summary(request)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//==========================assesser-view=====================================================//
router.get("/assesser-view", cors(), async function (req, res) {
  // var id = await check.checkToken(req);

  // if(id.status==400 || id.status==403){
  //     res.send({
  //         result:id
  //     })
  // }
  // else{
  assesserview
    .assesserview()
    .then(result => {
      res.send({
        result: result.result.result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
  // }
});

router.post("/textimage", cors(), (req, res, next) => {
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;
  //   console.log(Appeal_Object)
  const Image = uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    image
      .Image(Image)
      .then(result => {
        console.log(result);
        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      )
  );
});
//===============================forgetpassword==============================================//
router.post("/forgetpassword", (req, res) => {
  let forgetpassword = req.body;
  console.log("body", forgetpassword);
  let password = req.body.password;
  console.log(password);
  let confirmpassword = req.body.confirmpassword;
  let username = req.body.email;
  if (!username || !password || !confirmpassword) {
    res.send({
      message: "Please fill all the details"
    });
  } else {
    console.log(username);
    let sql = "SELECT * FROM citizens where email_id ='" + username + "'";

    con.query(sql, function (err, result) {
      // console.log(result,"select")
      if (err) throw err;
      // dbFunc.connectionRelease;
      // console.log("DataBase ERR:",err)
      //console.log("Database Error while selecting from register table:",err)
      if (result.length == 0) {
        console.log("i am here");
        res.send({
          message: "Invalid User Name",
          الرسالة: "اسم المستخدم غير صالح"
        });
        // dbFunc.connectionRelease;
      } else {
        if (password != confirmpassword) {
          res.send({
            message: "password doesn't match",
            الرسالة: "كلمة المرور غير متطابقة"
          });
        } else {
          if (cryptr.decrypt(result[0].password) == password) {
            console.log("previous");
            res.send({
              message: "Password should not be a previously used one",
              رسالة: "مرور سبق استخدامهاكلمة المرور لا يجب أن تكون كلمة"
            });
            //dbFunc.connectionRelease;
          }
          // });
          else {
            var otp = "";
            var possible = "0123456789";
            var namea;
            var namen;
            for (var i = 0; i < 4; i++)
              otp += possible.charAt(
                Math.floor(Math.random() * possible.length)
              );

            console.log(otp, "otp");
            // var encodedMail = new Buffer(req.body.email).toString('base64');
            let sql =
              "SELECT * FROM citizens where email_id ='" + username + "'";
            con.query(sql, function (err, result) {
              if (err) throw err;
              //dbFunc.connectionRelease;
              namen = result[0].name_en;
              namea = result[0].name_ar;

              //  })
              console.log("datanames", result[0].name_en);
              console.log(result[0].name_ar);
              console.log("copy", namen);
              var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
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
                subject: "Saned Service-OTP Verification",

                html: "Dear  " +
                  result[0].name_en +
                  "/" +
                  result[0].name_ar +
                  "<br>Your one Time Password for forgotPassword recovery for Saned services,<br> Your one time password is.<br> " +
                  otp +
                  "<br>" +
                  "كلمة المرور الخاصة بك مرة واحدة نسيت استرداد كلمة المرور لخدمات Saned" +
                  namea +
                  "  العزيز,<br> Your One time password is. <br> " +
                  otp +
                  "<br>"
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log("Mail send error: ", error);
                }
              });
              var sql =
                "UPDATE citizens SET otp = '" +
                otp +
                "' WHERE email_id = '" +
                username +
                "'";
              con.query(sql, function (err) {
                if (err) throw err;
                // dbFunc.connectionRelease;
                // console.log("DataBase ERR:",err)
                res.send({
                  message: "Please check your mail for One time Password",
                  رسالة: "يرجى التحقق من بريدك مرة واحدة لكلمة المرور"
                });
              });
              // dbFunc.connectionRelease;
            });
          }
        }
      }
    });
  }
});
//========================forgetpassword-otp===============================//
router.post("/forgetotpverification", cors(), (req, res) => {
  var otp = req.body.otp;
  var password = cryptr.encrypt(req.body.password);

  console.log(otp);

  con.query("SELECT * FROM citizens where otp='" + otp + "'", function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        status: false,
        message: "error"
      });
    } else {
      if (results.length > 0) {
        if (results[0].otp == otp) {
          console.log(otp);
          con.query(
            "UPDATE citizens SET password = '" +
            password +
            "' WHERE otp = '" +
            otp +
            "'",
            function (error, results, fields) { }
          );
          res.send({
            status: "true",
            message: "one time password is verified and Password updated successfully",
            رسالة: "كلمة مرور مرة واحدة تم التحقق من كلمة المرور وتحديثها بنجاح"
          });
        }
      } else {
        res.send({
          status: "false",
          message: "Invalid one time password",
          رسالة: "كلمة مرور غير صالحة مرة واحدة"
        });
      }
    }
  });
});

router.post("/schedules", cors(), async function (req, res) {
  console.log(req.body);
  var time = req.body.schedule_time;
  var reqdate = req.body.requestdate;
  var building_id = req.body.building_id;
  console.log("building_id", building_id);
  var date = moment(new Date(reqdate.substr(0, 16)));
  var rdate = date.format("YYYY-MM-DD");
  schedule
    .sup(time, rdate, building_id)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
  //}
});
//============================================convert pdf===================================================//

router.post("/Convert_Pdf", cors(), function (req, res) {
  //var flag=0;
  let checked1 = req.body.SelectedValues1;
  let checked2 = req.body.SelectedValues2;
  let checked3 = req.body.SelectedValues3;
  let checked4 = req.body.SelectedValues4;
  let checked5 = req.body.SelectedValues5;
  let checked6 = req.body.SelectedValues6;
  let checked7 = req.body.SelectedValues7;
  let checked8 = req.body.SelectedValues8;
  let checked9 = req.body.SelectedValues9;
  let email = req.body.email;
  let flag = 0;
  // let checked3=req.body.SelectedValues3;
  if (checked1 == "1") {
    var yesvalue1 = "checked";
    var novalue1 = "unchecked";
  } else {
    var yesvalue1 = "unchecked";
    var novalue1 = "checked";
    flag = 1;
  }
  if (checked2 == "1") {
    var yesvalue2 = "checked";
    var novalue2 = "unchecked";
  } else {
    var yesvalue2 = "unchecked";
    var novalue2 = "checked";
    flag = 1;
  }
  if (checked3 == "1") {
    var yesvalue3 = "checked";
    var novalue3 = "unchecked";
  } else {
    var yesvalue3 = "unchecked";
    var novalue3 = "checked";
    flag = 1;
  }
  if (checked4 == "1") {
    var yesvalue4 = "checked";
    var novalue4 = "unchecked";
  } else {
    var yesvalue4 = "unchecked";
    var novalue4 = "checked";
    flag = 1;
  }
  if (checked5 == "1") {
    var yesvalue5 = "checked";
    var novalue5 = "unchecked";
  } else {
    var yesvalue5 = "unchecked";
    var novalue5 = "checked";
    flag = 1;
  }
  if (checked6 == "1") {
    var yesvalue6 = "checked";
    var novalue6 = "unchecked";
  } else {
    var yesvalue6 = "unchecked";
    var novalue6 = "checked";
    flag = 1;
  }
  if (checked7 == "1") {
    var yesvalue7 = "checked";
    var novalue7 = "unchecked";
  } else {
    var yesvalue7 = "unchecked";
    var novalue7 = "checked";
    flag = 1;
  }
  if (checked8 == "1") {
    var yesvalue8 = "checked";
    var novalue8 = "unchecked";
  } else {
    var yesvalue8 = "unchecked";
    var novalue8 = "checked";
    flag = 1;
  }
  if (checked9 == "1") {
    var yesvalue9 = "checked";
    var novalue9 = "unchecked";
  } else {
    var yesvalue9 = "unchecked";
    var novalue9 = "checked";
    flag = 1;
  }
  //    var yesvalue3="checked";

  console.log("in 781", flag);
  //console.log("All data=====>>", checked1,checked2,checked3);
  pdf.Pdf(
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
    email
  );
  // pdf.mail(email)

  res.send({
    message: "success",
    flag: flag
  });
});

//=========================================pdfviewer=============================================

router.post("/pdfviewer", cors(), async function (req, res) {
  const email = req.body.email;
  pdf1
    .pdf1(email)
    .then(result => {
      console.log(result);
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//================================installationdetails=================================//
router.post("/installationdetails", cors(), function (req, res) {
  var installation = req.body;
  console.log(installation, "installation");
  update
    .update(installation)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//==================================bulkschedules============================================//
router.post("/BulkSchedules", cors(), async function (req, res) {
  console.log(req.body);
  var schedules = req.body;

  console.log("length of data from UI", schedules.schedule.schedule.length);
  /*If data from UI is empty Error Message will be sent*/
  if (schedules.schedule.schedule.length == 0) {
    res.send({
      message: "Please Schedule the selected Buildings",
      flag: 1
    });
  } else {
    /*Here the Bulk Buildings are scheduled one by one*/
    for (let i = 0; i < schedules.schedule.length; i++) {
      console.log(i, "i");
      let uidate = schedules.schedule.schedule[i].selectedStartDate;
      var date = moment(new Date(uidate.substr(0, 16)));
      var rdate = date.format("YYYY-MM-DD");
      await schedulefun.sup(
        schedules.schedule.schedule[i].time,
        rdate,
        schedules.schedule.schedule[i].building_id
      );
    }

    res.send({
      message: "Your Buildings are scheduled for service. Please visit booking history for details"
    });
  }
});
//=============================Blockchain-API's============================================
router.post("/blockchain", cors(), async function (req, res) {
  var transaction = {
    name: "manoj",
    address: "chennai"
  };
  var params = {
    id: "1",
    fun: "create",
    data: transaction
  };

  bc.main(params)
    .then(result => {
      res.send({
        result: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

//=========================================Login=============================================//
router.post("/Trainer_account_creation", cors(), (req, res) => {
  const data = req.body;
  const token = req.headers.token;
  const language = req.headers.language
  console.log(token, "initialtest");

  trainer_account
    .trainer_account(data, token, language)
    .then(result => {
      console.log(result);
      res.status(result.status).json({
        message: result.message
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//=======================Appeal===============================================//
router.post("/Appeal", cors(), (req, res) => {
  const Appeal_Object = req.body;
  const token = req.headers.token;
  const language = req.headers.language;

  console.log(Appeal_Object);
  console.log(token, "token");
  let service = Appeal_Object.service;
  let Description = Appeal_Object.Description;
  if (!service || !Description) {
    return res.send({
      status: 400,
      message: "Please fill all the fields"
    });
  } else {
    Appeal.Appeal(Appeal_Object, token, language)
      .then(result => {
        console.log(result);

        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});


//=============================================Trainer account creation============
router.post("/Trainer_account_creation", cors(), (req, res) => {
  const trainer_Object = req.body;
  console.log(trainer_Object, "initialtest");

  trainer
    .trainer_account(trainer_Object)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result.message
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//=============================================================================//



//=============================================================================================//
router.post("/Untrained_Employees_list", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(data, token, language);

  Untrained_Employees.Untrained_Employees(data, token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//=============================================================================================//


//=============================================================================================//
router.post("/Schedule", cors(), (req, res) => {
  const data = req.headers;
  const request = req.body;
  console.log(data);
  console.log(request, "<======request");

  if (!data) {
    return res.send({
      status: 400,
      message: "Please fill required the fields"
    });
  } else {
    scheduling
      .scheduling(data, request)
      .then(result => {
        console.log(result);
        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//====================================================================================//
router.post("/Untrained_Employees_Schedule", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(data, token, language);

  Untrained_Employees_schedule.Untrained_Employees_schedule(
    data,
    token,
    language
  )
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//=============================================================================================//

//=======================================Schedule=================================================//
router.post("/Classroom", cors(), (req, res) => {
  const data = req.body;
  const token = req.headers.token;
  const language = req.headers.language;
  console.log(data, "request data");
  console.log(token, "token");
  let classroom_id = data.classroom_id;
  let trainer_name = data.trainer_name;
  // let trainer_email_id = data.trainer_email_id;
  let address = data.address;
  let number_of_seats = data.number_of_seats;
  let available_date = data.available_date;

  if (
    !classroom_id ||
    !trainer_name ||
    !address ||
    !number_of_seats ||
    !available_date
  ) {
    return res.send({
      status: 402,
      message: "Please fill all the fields"
    });
  } else {
    classroom
      .classroom(data, token, language)
      .then(result => {
        console.log(result);
        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//=============================================================================================//

//====================================================================================//
router.post("/Untrained_Employees_Schedule", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(data, token, language);

  Untrained_Employees.Untrained_Employees(data, token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//==========================Trained Employees List===============================//

router.post("/Trained_Employees_list", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(data, token, language);

  Trained_Employees.Trained_Employees(data, token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//==============================================================================================//
router.post(
  "/Employee_Profile",
  // upload.single("file"),
  cors(),
  (req, res) => {
    const EmployeeProfile = req.headers;
    console.log(EmployeeProfile);
    // let file = req.file;
    // var ipAddress = ip.address();
    // console.log("ips====>", ipAddress);
    // console.log(file, "file_details");
    // var path = "http://" + ipAddress + "/" + file.filename;
    // console.log(path, "path");
    // const filename_blob = fs.readFileSync(req.file.path);
    // const filename_url = req.file.path;
    // // let filename = new Buffer(fs.readFileSync(req.file.path)).toString("base64")

    // console.log(filename_url, "Avanthiiii");
    // console.log("http://" + ipAddress + "/" + file.filename);

    // console.log(req.file, "fileeeee");

    Employee_profile.Employee_profile(
      EmployeeProfile
      // filename_blob,
      // filename_url,
      // path
    )
      .then(result => {
        console.log(result);

        res.status(result.status).json({
          message: result
        });
      })

      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
);


//====================================Company_Profile============================================//
router.get("/Company_trading_license", cors(), (req, res) => {
  let data = req.headers;

  console.log("routes===>", data);
  // console.log(data);

  company_trading_license
    .company_trading_license(data)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//================================================================================================//
router.post("/Hr_forget_password_otp_verify", cors(), (req, res) => {
  const otp_verify_request = req.body;
  console.log("otp", otp_verify_request);
  if (!req.body.otp) {
    return res.send({
      status: 400,
      message: "Please provide a valid otp"
    });
  } else {
    hr_forget_password_otp_verify
      .hr_forget_password_otp_verify(otp_verify_request)
      .then(result => {
        console.log(result);

        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//==============================================================================================//
router.post("/Trainer_forget_password", cors(), (req, res) => {
  const trainer_forget_password_request = req.body;
  console.log(trainer_forget_password_request);
  if (!req.body.password || !req.body.confirmpassword || !req.body.email_id) {
    return res.send({
      status: 400,
      message: "Please fill all the fields"
    });
  } else {
    trainer_forget_password
      .trainer_forget_password(trainer_forget_password_request)
      .then(result => {
        console.log(result);

        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//===============================================================================================//
router.post("/Trainer_forget_password_otp_verify", cors(), (req, res) => {
  const otp_verify_request = req.body;
  console.log(otp_verify_request);
  if (!req.body.otp) {
    return res.send({
      status: 400,
      message: "Please provide a valid otp"
    });
  } else {
    trainer_forget_password_otp_verify
      .trainer_forget_password_otp_verify(otp_verify_request)
      .then(result => {
        console.log(result);

        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//========================================Safetyofficer_detail_showup===========================//
router.post("/Safetyofficer_details", cors(), (req, res) => {
  const token = req.headers.token;
  const request = req.body;
  console.log(request);

  safety_officer_details
    .safety_officer_details(request, token)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//==================================================================================================//

//=============================================================================================//
router.post("/Untrained_Employees_list", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(data, token, language);

  Untrained_Employees.Untrained_Employees(data, token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//=============================================================================================//

//=======================================Schedule=================================================//
router.post("/Classroom", cors(), (req, res) => {
  const data = req.body;
  const token = req.headers.token;
  const language = req.headers.language;
  console.log(data, "request data");
  console.log(token, "token");
  let classroom_id = data.classroom_id;
  let trainer_id = data.trainer_id;
  let trainer_email_id = data.trainer_email_id;
  let address = data.address;
  let number_of_seats = data.number_of_seats;
  let available_date = data.available_date;

  if (
    !classroom_id ||
    !trainer_name ||
    !address ||
    !number_of_seats ||
    !available_date
  ) {
    return res.send({
      status: 402,
      message: "Please fill all the fields"
    });
  } else {
    classroom
      .classroom(data, token, language)
      .then(result => {
        console.log(result);
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//=============================================================================================//
router.post("/Schedule", cors(), (req, res) => {
  const data = req.headers;
  const request = req.body;
  console.log(data);
  console.log(request, "<======request");

  if (!data) {
    return res.send({
      status: 400,
      message: "Please fill required the fields"
    });
  } else {
    scheduling
      .scheduling(data, request)
      .then(result => {
        console.log(result);
        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res
          .status(err.status)
          .json({
            message: err.message
          })
          .json({
            status: err.status
          })
      );
  }
});
//====================================================================================//
router.post("/Untrained_Employees_Schedule", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(data, token, language);
  console.log(data, "data====>");

  Untrained_Employees_schedule.Untrained_Employees_schedule(
    data,
    token,
    language
  )
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//====================================================================================//

//==============================================================================================//
router.post("/Classroom_available_date", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  const data = req.body;
  console.log(language, "<=================language");

  available_date1
    .available_date1(token, data, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//========================Photo_upload===================================================================//
// router.get('/Photo_upload', cors(), (req, res) => {

// let file = req.photo;
// let Employee_ID = req.Employee_ID;
//     let ipAddress = ip.address();
//     console.log("ips====>", ipAddress);
//     console.log(file,"file_details")
//     let path = 'http://' + ipAddress + '/' + file.filename;
//     console.log(path,"path")
//     const filename_blob = fs.readFileSync(req.file.path)
//     const filename_url = req.file.path

//                       photo
//                             .photo(filename_url,Employee_ID)
//                                    .then(result => {
//                                            console.log(result)

//                        res
//                           .status(result.status)
//                           .json({
//                                   message: result,

//     });

// })
// .catch(err => res.status(err.status).json({
// message: err.message
// }).json({
// status: err.status
// }));

// });
//============================================================================================//
router.post("/Seat_availability", cors(), (req, res) => {
  let data = req.body;
  let token = req.headers.token;

  console.log(data);

  seat_availability
    .seat_availability(data, token)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//================================Trainer_trainee_view=========================================//
//============================================//
router.post("/Feedback", cors(), function (req, res) {
  // var id= req.body.id
  var Company_Email = req.body.Company_Email;
  var comments = req.body.comments;
  console.log(Company_Email, "fhdkhfd");
  feedback.feedback(Company_Email, comments);

  if (!Company_Email || !comments.trim()) {
    res.status(400).json({
      message: "Please enter the details completely !"
    });
  } else {
    feedback
      .feedback(Company_Email, comments)
      .then(result => {
        res.send({
          message: "schedule details saved",
          status: true,
          result: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
});
//=============================================
router.post("/Trainer_trainee_view", cors(), (req, res) => {
  let data = req.body;
  let token = req.headers.token;

  console.log(data);

  trainer_trainee_view
    .trainer_trainee_view(data, token)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//====================================Company_Profile============================================//
router.post("/Company_Profile", cors(), (req, res) => {
  let data = req.body;
  let token = req.headers.token;

  console.log(data);

  company_profile
    .company_profile(data, token)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//====================================Company_Profile============================================//


//================================================================================================//

//================================================================================================//
//   router.post("/Safety_officer_direct_exam", cors(), (req, res) => {
//     let data = req.body;
//     let token = req.headers.token;

//     console.log(data);

//             })
//             .catch(err => res.status(err.status).json({
//                 message: err.message
//             }).json({
//                 status: err.status
//             }));

// });
//================================================================================================//


//=============================================================================================//

//==========================================================================================//
router.post("/Course_names", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  console.log(token);

  course_view
    .course_view(token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//=============================================================================================//
router.get("/Trainer_names", cors(), (req, res) => {
  const token = req.headers.token;
  const language = req.headers.language;
  console.log(token);

  trainer_names
    .trainer_names(token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//===============================================================================================//

router.post("/Course_creation", cors(), (req, res) => {
  let data = req.body;
  let token = req.headers.token;
  let language = req.headers.language;
  console.log(data);

  course_creation
    .course_creation(data, token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//============================================================================================//
router.post("/Time_slots_list", cors(), (req, res) => {
  let data = req.body;
  let token = req.headers.token;
  let language = req.headers.language;

  console.log(data);

  time_slots_list
    .time_slots_list(data, token, language)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//===========================================================================================//
router.get("/Schedule_summary", cors(), (req, res) => {
  //let data = req.body;
  let request = req.headers;
  // console.log(data);

  schedule_summary
    .schedule_summary(request)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//========================================================================================//
router.post("/Bulk_booking", cors(), (req, res) => {
  //let data = req.body;
  let request = req.headers;
  let data = req.body;
  // console.log(data);

  bulk_booking
    .bulk_booking(request, data)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
// console.log(data);

// course_creation
//   .course_creation(data, token)
//   .then(result => {
//     console.log(result);



//====================================EXAM RESULTS===================================================================================//
//====Static API is used for fetching the file and certificates which is located under a path of upload directory===================//
router.use("/static", express.static(path.join(__dirname, "upload")));
//====Results API is used for generating certificates which will navigate to utils and there will be certificategenerate file which consits the structure for creating certificate and after get inputs from UI store the results and certificate in DB====//
router.post("/Results", cors(), (request, response) => {
  certificate.Certificate(request, function (error, result) {
    // console.log("result", result);
    if (error) {
      response.status(error.status).json({
        message: error
      });
    } else {
      response.status(result.status).json({
        message: result.message
      });
    }
  });
});
//====================================FETCH CERTIFICATE============================================//
// ====Fetching the certificate which is stored in the DB and it picks the certificate under a upload directory====//
router.post("/getCertificate", cors(), (request, response) => {
  certificate.getCertificate(request, function (error, result) {
    if (error) {
      response.status(error.status).json({
        message: error.message
      });
    } else {
      response.status(result.status).json({
        message: result.message
      });
    }
  });
});
//====================================FETCH ATTENDANCE LIST============================================//
//====Fetching the attendance list from attendance table from DB====//
router.post("/getAttendance", cors(), (request, response) => {
  certificate.getAttendance(request, function (error, result) {
    if (error) {
      response.status(error.status).json({
        message: error.message
      });
    } else {
      response.status(result.status).json({
        message: result.message
      });
    }
  });
});

//=================================Trainer Attendance=============================================//
router.post("/Trainer_employee_list", cors(), (req, res) => {
  const trainer_data = req.body;
  console.log("Trainer_data_Index===>", trainer_data)


  trainer_attendance
    .trainer_attendance(trainer_data)
    .then(result => {
      console.log(result);
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
})
// =================================================================================
router.post("/Selecting_date_trainer", cors(), (req, res) => {
  const Trainer_selecting_date = req.body;
  console.log("Trainer_selecting_date_INDEX", Trainer_selecting_date);

  trainer_attendance
    .trainer_date_select(Trainer_selecting_date)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//  =====================================================================

//=================================Trainer Attendance=============================================//
router.post("/attendence", cors(), (req, res) => {
  const Employee_attendance = req.body;
  console.log("Employee_attendance_ROUTES", Employee_attendance)

  trainer_attendance
    .trainer_attendance_list(
      Employee_attendance
    )
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//=====================================================
router.post("/get_employee_attendance_list", cors(), (req, res) => {
  const data = req.body;
  const token = req.headers.token;
  trainer_attendance
    .get_employee_attendance(data)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
router.post("/uploadbulkemployee", multipartMiddleware, cors(), (req, res) => {
  const data = req.files.file.path;
  console.log("file", data);
  const token = req.headers.token;
  // const email = req.headers.email;
  uploadSalama
    .uploadbulkemployee(data)
    .then(result => {
      console.log(result);
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//=================================Certificate download========================================//

router.use("/download", express.static(path.join(__dirname, "../upload")));

//=================================Trainer Attendance=============================================//
router.post("/Trainer_employee_list", cors(), (req, res) => {
  const trainer_employee = req.body;
  console.log("Trainer_employee_list_routes", trainer_employee);

  const Trainer_Email = req.body.Trainer_emailid;
  console.log("Trainer_Company_Email_routes", Trainer_Email);

  trainer_attendance
    .trainer_attendance(Trainer_Email)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

//select date================================================================
router.post("/Selecting_date_trainer", cors(), (req, res) => {
  const trainer_employee = req.body;
  console.log("Trainer_date_list_routes", trainer_employee);

  const Trainer_id = req.body.Trainer_id;
  console.log("Trainer_Trainer_id_routes", Trainer_id);

  const selected_date = req.body.select_date;
  console.log("Trainer_Company_selected_date_routes", selected_date);

  const start_time = req.body.start_time;
  console.log("Trainer_Company_Email_routes", start_time);

  const end_time = req.body.end_time;
  console.log("Trainer_Company_Email_routes", end_time);

  trainer_attendance
    .trainer_date_select(Trainer_id, selected_date, start_time, end_time)
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});
//===========================================================

//=================================Trainer Attendance=============================================//
router.post("/attendence", cors(), (req, res) => {
  const trainer_employee = req.body;
  console.log("Trainer_attendance_list_routes", trainer_employee);

  const getdata = req.body.getdata;
  console.log("Trainer_Company_employee_id_routes", getdata);

  const attendance_status = "Present";
  console.log("Trainer_Company_attendance_status_routes", attendance_status);

  const trainer_id = req.body.Trainer_id;
  console.log("Trainer_Company_trainer_id_routes", trainer_id);

  const Attended_date_val = req.body.attended_date;

  var Attended_date = moment(Attended_date_val).format("YYYY/MM/DD");

  console.log("Trainer_Company_Attended_date_routes", Attended_date);

  const start_time = req.body.start_time;
  console.log("Trainer_Company_start_time_routes", start_time);

  const end_time = req.body.end_time;
  console.log("Trainer_Company_end_time_routes", end_time);

  const classroom = req.body.classroom_id;
  console.log("Trainer_Company_classroom_routes", classroom);

  const course_name = req.body.course_name;
  console.log("Trainer_Company_course_name_routes", course_name);

  trainer_attendance
    .trainer_attendance_list(
      getdata,
      attendance_status,
      trainer_id,
      Attended_date,
      start_time,
      end_time,
      classroom,
      course_name
    )
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res
        .status(err.status)
        .json({
          message: err.message
        })
        .json({
          status: err.status
        })
    );
});

module.exports = router;
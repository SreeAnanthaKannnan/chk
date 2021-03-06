/**
 * @author: Saned_team
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
  admin = require("../core/admin"),
  feedback = require("../core//Feedback"),
  cregister = require("../core/cregister.js"),
  history = require("../core/history"),
  building = require("../core/building"),
  delbuilding = require("../core/DeleteBuilding"),
  assesserview = require("../core/assesserview"),
  schedule = require("../core/schedule"),
  schedule_temp = require("../core/schedules_temp"),
  schedulefun = require("../core/Bulkschedule"),
  getBuildings = require("../core/getBuildings"),
  getbuildpay = require("../core/buildpayments"),
  profile = require("../core/profile"),
  check = require("../utils/checkToken"),
  email = require("../utils/emailbytoken"),
  phone = require("../utils/phonecheck.js"),
  buildingDao = require("../daos/buildingDao"),
  upload = require("../core/upload.js"),
  //pdf1 = require("../core/pdfviewer.js"),
  update = require("../core/update"),
  assessment = require("../core/assessment"),
  book = require("../core/servicehistory"),
  image_upload = require("../core/image_upload"),
  Employee_grid_view1 = require("../core/Employee_Grid_view1"),
  Employee_grid_view = require("../core/Employee_Grid_view"),
  payment_salama = require("../core/payment_salama"),
  bc = require("../fabcar/javascript/invoke"),
  verify = require("../core/otpverify"),
  pdf = require("../core/pdf.js"),
  emailotpfun = require("../utils/spsaemail"),
  pdf2 = require("../core/pdf.js");
let moment = require("moment"),
  Appeal = require("../core/Appeal"),
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
  request_service_aman = require("../core/request_aman_service"),
  certificate = require("../core/certificate"),
  certificate_issue = require("../core/certificate_issue"),
  uploadSalama = require("../core/uploadbulkemployee"),
  upload_aman_web = require("../core/upload_aman_web"),
  upload_salama_web = require("../core/upload_salama_web"),
  request_service = require("../core/request_service"),
  trainer = require("../core/Trainer_registration"),
  Untrained_Employees_schedule = require("../core/Untrained_Employees_showup_schedule"),
  number_validation_schedule = require("../core/Number_validation_schedule"),
  allBuildings = require("../core/allBuildings");
var payment_statusupdate_salama = require("../core/payment_statusupdate_salama");
var certificate_issue1 = require("../core/certificate_issue");
var getBuildings_web = require("../core/getBuildings_web");
var Adminmap = require("../core/Adminmap.js");
var Adminmapactive = require("../core/Adminmap.js");
var updateprofile = require("../core/updateProfile");
var schedule_temp = require("../core/schedules_temp");
var receipt_upload = require("../core/image_upload");
var Reschedule = require("../core/Reschedule");
var ip = require("ip");
var { emailotp } = require("../utils/spsaemail");
var otpfun = require("../utils/otp.js");
const trainer_attendance = require("../core/Trainer_attendance");
var session_delete = require("../core/session_delete");
var payment = require("../core/payment");
let salama_order_details = require("../core/Company_profile");
let Contactus_comments = require("../core/Appeal");
const Contactus_feedback = require("../core/Appeal"),
building_reschedule = require("../core/building_rechedule"),
pdf1 = require("../core/pdf1.js"),
  pdf1_ar = require("../core/pdf1_ar.js"),
  Cryptr = require("cryptr"),
  cryptr = new Cryptr("myTotalySecretKey"),
  nodemailer = require("nodemailer"),
  fs = require("fs"),
  checktoken = require("../utils/checkToken"),
  logger = require("morgan");
//logger = log4js.getLogger('Aman_project');

let ipAddress = ip.address();
console.log("ips====>", ipAddress);
const {
  getInstaller,
  getMothlyInstallerDetails
} = require("../daos/dashboardDetails");
const { forgetPasswordOTPAdditon } = require("../daos/otpverifydao");
var file1;
let date = require("date-and-time");
let now = new Date();
var file_date = date.format(now, "YYYY-MM-DD HH:mm");
console.log(file_date, "file_date");
var dateFormat = require("dateformat");
var storage = multer.diskStorage({
  // notice you are calling the multer.diskStorage() method here, not multer()
  // destination: function(req, file, cb) {
  //     cb(null, '/home/kavitha/Videos/salama_docs/Salama_backend_v0.1/uploads/')
  // },
  destination: function(req, file, cb) {
    console.log(file, "file");
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let file_string = JSON.stringify(file.originalname);
    console.log(file_string, "file string");
    file1 =
      file_string.substring(0, file_string.length - 6) +
      dateFormat("yyyy-mm-dd HH:MM") +
      path.extname(file.originalname);
    cb(null, file1.substring(1));
    console.log(file1, "file string");
  }
});
const upload1 = multer({ storage });

const upload_aman = multer({
  dest: "./upload_aman"
});

var multipartMiddleware = multipart();

/* GET home page. */
router.get("/", function(request, response, next) {
  response.render("index", {
    title: "Express Page for Saneds SPSA application."
  });
});

//=======================loginservice==================================================//
router.post("/login", cors(), function(req, res) {
  var loginobject = req.body;
  console.log("login===>", loginobject);
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
//================================================================//
router.post("/request_for_service", cors(), (req, res) => {
  console.log("enter into req for service");
  var file_name = req.body.filename;
  console.log("frontend", req.body);
  var token = req.headers.authorization;
  var file1 = file_name.substring(1);
  var file_path = "./uploads/" + file1;
  console.log(file_path, "filepath");
  request_service
    .request_service(file_path, file_name, token)
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

router.post("/schedules_temp_123", cors(), async function(req, res) {
  console.log(req.body);
  const token = req.headers.authorization;
  var time = req.body.schedule_time;
  var reqdate = req.body.requestdate;
  var building_id = req.body.building_id;
  console.log("building_id", building_id);
  var date = moment(new Date(reqdate.substr(0, 16)));
  var rdate = date.format("YYYY-MM-DD");
  schedule_temp
    .sup_temp(time, rdate, building_id, token)
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
//===================================getbuildings======================================================//
router.post("/getEmployees", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var employeedetails = req.body.email;
  console.log("data", employeedetails);
  getBuildings
    .getemployees(employeedetails, token)
    .then(result => {
      console.log("res_index", result);
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
});
//=========================citizen-registration-start===========================================
router.post("/citizen-register", cors(), async function(req, res) {
  var registerobject = req.body;
  console.log(registerobject, "registerobject");
  var news = req.body.newsletter;
  console.log("news======>", news);

  var mobile = registerobject.mobile;
  var result = await phone.validateMobileNumber(mobile);
  console.log(result);
  if (result == false) {
    res.send({
      status: 400,
      message: "Please check Your Mobile number"
    });
  } else {
    cregister
      .cregister(registerobject)
      .then(result => {
        console.log("result", result);
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
router.post("/number_validation_schedule", cors(), function(req, res) {
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
router.post("/emailotpverification1", cors(), function(req, res) {
  var otpobject = req.body;
  console.log("login===>", otpobject);
  verify
    .verifyuser(otpobject)
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
//========================================citizen-registration-end=====================================
router.post("/getdetails", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var object = req.body;
  console.log(object, "object");
  history.getHistory(object, token).then(result => {
    res.send({
      result: result
    });
  });
});
//=================================Appeal====================================================
router.post("/getdetailsforkey", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var email = req.body.email;
  history
    .getHistory1(email, token)
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
//===================================addbuilding=============================================//
router.post("/AddsingleBuilding", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var email_id = req.body.email;
  var buildingobject = req.body;
  console.log("ui o/p====>",req.body)
  building
    .buildings(buildingobject, token, email_id)
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
});

//===================================allbuildings======================================================//
router.post("/allBuildings", cors(), async function(req, res) {
  const token = req.headers.authorization;
  allBuildings
    .getbuildings(token)
    .then(result => {
      res.send({
        result: [result],
        message: "mock mock"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=================================== ildings======================================================//
router.post("/getBuildings", cors(), async function(req, res) {
  const token = req.headers.authorization;

  var id = await email.checkToken(req);

  var buildingobject = id.result;
  console.log(buildingobject, "data");
  getBuildings
    .getbuildings(buildingobject, token)
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
});
router.post("/getBuildingsbymail", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var email_id = req.body.email;
  console.log(email_id, "data");
  building
    .buildingsbymail(email_id, token)
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
});
//=========================buildingwithpayment=============================================//
router.post("/getBuildings_web", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var buildingobject = req.body.orderid;
  console.log(buildingobject, "data");
  getBuildings_web
    .getbuildings(buildingobject, token)
    .then(result => {
      res.send({
        result: result,
        message: "Buildings"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

router.post("/getBuildingspayment", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var buildingobject = req.body.email_id;
  console.log(buildingobject, "data");
  getbuildpay
    .getbuildings(buildingobject, token)
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
});
//=======================================================================================================
router.post("/installationdetails", cors(), function(req, res) {
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
router.post("/profile", cors(), async function(req, res) {
  var buildingobject = req.body.email;
  console.log(req.body.email, "profile EMAIL from UI");
  var token = req.headers.authorization;
  console.log(req.headers.authorization, "profile token from UI");
  profile
    .getbuildings(buildingobject, token)
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
});
router.post("/clearnote", cors(), async function(req, res) {
  var buildingobject = req.body.email_id;
  //const token = req.headers.authorization;
  console.log(buildingobject, "data");
  payment
    .clearnotify(buildingobject)
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
});
//=======================================================================================================
router.post("/installationdetails", cors(), function(req, res) {
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
router.post("/file_upload", uploads.single("file"), function(req, res) {
  var file = "var/www/html/" + "/" + req.file.filename;
  console.log(req.file, "ffg");
  const token = req.headers["authorization"];
  var filepath = req.file.path;
  fs.rename(filepath, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      upload
        .upload(filepath, token)
        .then(result => {
          res.status(result.status).json({
            message: result.Message
          })
        })
        .catch(err =>
          res.status(err.status).json({
            message: err.Message
          })
        );
    }
  });
});
//=================================image===============================================//
//=============================imageupload==================================================//

router.post("/image_upload", uploads.single("file"), function(req, res) {
  var file = "var/www/html/" + "/" + req.file.filename;
  console.log(req.file);
  console.log(req.body);
  var id = req.body.id;
  var filepath = req.file.path;
  fs.rename(filepath, file, function(err) {
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
router.post("/serviceHistory", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var email_id = req.body.email;
  book
    .bookservice(email_id, token)
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
//==============================================================================================
router.post("/Assessment", cors(), async function(req, res) {
  console.log(req.body);
  const token = req.headers.authorization;
  var id = req.body.id;
  var status = req.body.status;
  if (!id || !status.trim()) {
    res.status(40).json({
      message: "Please enter the details completely !"
    });
  } else {
    assessment
      .assessment(id, status, token)
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
//=======================================================================================
// router.get("/Reschedule", cors(), (req, res) => {
//   //let data = req.body;
//   // let request = req.headers;
// console.log("data");

//   Reschedule
//     .Rescheduleadmin()
//     .then(result => {
//       console.log(result);

//       res.status(result.status).json({
//         message: result
//       });
//     })
//     .catch(err =>
//       res
//         .status(err.status)
//         .json({
//           message: err.message
//         })
//         .json({
//           status: err.status
//         })
//     );
// });



router.post("/Reschedule", cors(), async function(req, res) {
  console.log(req.body);

  var email_id = req.body.email_id;
 
  
    Reschedule
      .Rescheduleadmin(email_id)
      .then(result => {
        res.send({
          message: "success",
          status: true,
          result: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
 
});


//==========================assesser-view=====================================================//
router.get("/assesser-view", cors(), async function(req, res) {
  const token = req.headers.authorization;
  assesserview
    .assesserview(token)
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

router.post("/textimage", cors(), (req, res, next) => {
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;
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
// router.post("/forgetpassword", async (req, res) => {
//   const username = req.body.email;
//   if (!username) {
//     res.status(400).json({
//       status: 400,
//       message: "Please fill all the details"
//     });
//   }
//   let otp = await otpfun.otpgen();
//   otp = otp.otp;

//   const result = await forgetPasswordOTPAdditon(otp, username);
//   if (result.status != 200) {
//     res.status(result.status).json({
//       message: result.message,
//       status: result.status
//     });
//   }

//   const sendMail = await emailotp(username, otp);

//   res.status(result.status).json({
//     message: result.message,
//     status: result.status,
//     otp: otp
//   });
//   //  else {
//   //   console.log("username=>", username);
//   //   // console.log("password======>>", password);

//   //   // let sql = "SELECT * FROM citizens where email_id ='" + username + "'";
//   //   // console.log("sql==>", sql)
//   //   // =========email==============
//   //   await con.query(
//   //     "SELECT * FROM citizens where email_id ='" + username + "'",
//   //     async function (error, results, fields) {
//   //       if (error) {
//   //         res.send({
//   //           status: false,
//   //           message: "error"
//   //         });
//   //       } else {
//   //         if (results.length > 0) {
//   //           console.log("email=====>>>", username);
//   //           //  console.log("password=====>>>", otp);
//   //           console.log("results=>", results.length);
//   //           console.log("results=======>", results);
//   //           if (results[0].email_id == username) {
//   //             console.log("enter in to the if condition==>>>", username);
//   //             // console.log("password=====>>>", password);
//   //             var data = await con.query(
//   //               "UPDATE citizens SET otp = '" +
//   //               otp +
//   //               "' WHERE email_id = '" +
//   //               username +
//   //               "'",
//   //               function (error, results1, fields) {
//   //                 console.log("result,", results1);
//   //                 console.log("error", error);
//   //               }
//   //             );
//   //             // console.log("data", data),
//   //             //console.log("table_results", results1)
//   //             console.log(otp);
//   //             res.send({
//   //               status: "true",
//   //               results: otp
//   //               // message: "Password updated successfully",
//   //               // رسالة:
//   //               //   "كلمة مرور مرة واحدة تم التحقق من كلمة المرور وتحديثها بنجاح"
//   //             });
//   //           }
//   //         }
//   //       }
//   //     }
//   //   );
//   // }
// });

router.post("/Payment", cors(), async function(req, res) {
  var payment1 = req.body;
  console.log(payment1);
  payment
    .payment(payment1)
    .then(result => {
      res.send({
        result: result,
        message: "Your Payment Details added successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

router.post("/Payment_aman", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var payment1 = req.body;
  console.log("payment", payment1);
  payment
    .payment_aman(payment1, token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
router.post("/Payment_aman_status", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var payment1 = req.body;
  console.log("payment", payment1);
  payment
    .payment_aman_status(payment1, token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
router.post("/Payment_statusupdate_salama", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var payment1 = req.body;
  console.log("payment", payment1);
  payment_statusupdate_salama
    .payment_statusupdate_salama(payment1, token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
router.post("/pushcount", cors(), async function(req, res) {
  //const token = req.headers.authorization;
  var details = req.body;
  console.log(details);
  payment
    .getpushcount(details)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=============================================
router.post("/update_installation", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var payment1 = req.body;
  console.log(payment1);
  payment
    .payment_aman_install(payment1, token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
router.post("/update_preschedule", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var payment1 = req.body;
  console.log(payment1);
  payment
    .payment_aman_pref(payment1, token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
router.post("/pushcount_1", cors(), async (req, res) => {
  var details = req.body;
  console.log("buildings==>index==>", details);
  var token = req.headers.authorization;
  payment
    .getpushcount(details, token)
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
//=============================forgetpassword============================================//
router.post("/forgetpassword", async (req, res) => {
  let forgetpassword = req.body;
  console.log("body", forgetpassword);
  let username = req.body.email;
  console.log("forgot_email=>", username);
  // let password = req.body.password;
  var otp1 = await otpfun.otpgen();
  var otp = otp1.otp;
  console.log(otp);
  var finalotp = await emailotpfun.emailotp(username, otp);

  if (!username) {
    res.send({
      status: 400,
      message: "Please fill all the details"
    });
  } else {
    console.log("username=>", username);
    // console.log("password======>>", password);

    // let sql = "SELECT * FROM citizens where email_id ='" + username + "'";
    // console.log("sql==>", sql)
    // =========email==============
    await con.query(
      "SELECT * FROM citizens where email_id ='" + username + "'",
      async function(error, results, fields) {
        if (error) {
          res.send({
            status: 401,
            message: "error"
          });
        } else {
          if (results.length > 0) {
            console.log("email=====>>>", username);
            //  console.log("password=====>>>", otp);
            console.log("results=>", results.length);
            console.log("results=======>", results);
            if (results[0].email_id == username) {
              console.log("enter in to the if condition==>>>", username);
              // console.log("password=====>>>", password);
              var data = await con.query(
                "UPDATE citizens SET otp = '" +
                  otp +
                  "' WHERE email_id = '" +
                  username +
                  "'",
                function(error, results1, fields) {
                  console.log("result,", results1);
                  console.log("error", error);
                }
              );
              // console.log("data", data),
              //console.log("table_results", results1)
              console.log(otp);
              res.send({
                status: 200,
                results: otp
                // message: "Password updated successfully",
                // رسالة:
                //   "كلمة مرور مرة واحدة تم التحقق من كلمة المرور وتحديثها بنجاح"
              });
            }
          }
          else{
            res.send({
              status: 400,
              message: "Invalid username"
            });

          }
        }
      }
    );
  }
});

//========================forgetpassword-otp===========================================//
router.post("/forgetotpverification", cors(), (req, res) => {
  var otp = req.body.otp;
  var password = cryptr.encrypt(req.body.password);

  console.log(otp);

  con.query("SELECT * FROM citizens where otp='" + otp + "'", function(
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
            function(error, results, fields) {}
          );
          res.send({
            status: "true",
            message:
              "one time password is verified and Password updated successfully",
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

router.post("/schedules_temp", cors(), async function(req, res) {
  console.log(req.body);
  const token = req.headers.authorization;
  var time = req.body.schedule_time;
  var reqdate = req.body.requestdate;
  var building_id = req.body.building_id;
  console.log("building_id", building_id);
  var date = moment(new Date(reqdate.substr(0, 16)));
  var rdate = date.format("YYYY-MM-DD");
  console.log(rdate,"rdate");
 schedule
    .supply(time, rdate, building_id, token)
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
router.post("/schedules_temp123", cors(), async function(req, res) {
  console.log(req.body);
  const token = req.headers.authorization;
  var time = req.body.schedule_time;
  var reqdate = req.body.requestdate;
  var building_id = req.body.building_id;
  console.log("building_id", building_id);
  var date = moment(new Date(reqdate.substr(0, 16)));
  var rdate = date.format("YYYY-MM-DD");
  schedule_temp
    .sup_temp(time, rdate, building_id, token)
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
//============================================convert pdf===================================================//

router.post("/Convert_Pdf", cors(), async function(req, res) {
  //var flag=0;
  console.log("ui",req.body);
  let checked1 = req.body.SelectedValues1;                                                                                       
  let checked2 = req.body.SelectedValues2;
  let checked3 = req.body.SelectedValues3;
  let checked4 = req.body.SelectedValues4;
  let checked5 = req.body.SelectedValues5;
  let checked6 = req.body.SelectedValues6;
  let checked7 = req.body.SelectedValues7;
  let checked8 = req.body.SelectedValues8;
  let checked9 = req.body.SelectedValues9;
  // let checked10 = req.body.SelectedValues10;
  let email = req.body.email;
  let flag = 'Y';
  console.log(flag,"initilal flag");
  // let checked3=req.body.SelectedValues3;
  if (checked1 == "Y") {
    var yesvalue1 = "checked";
    var novalue1 = "unchecked";
  } else {
    var yesvalue1 = "unchecked";
    var novalue1 = "checked";
    flag = 'N';
  }
  if (checked2 == "Y") {
    var yesvalue2 = "checked";
    var novalue2 = "unchecked";
  } else {
    var yesvalue2 = "unchecked";
    var novalue2 = "checked";
    flag = 'N';
  }
  if (checked3 == "Y") {
    var yesvalue3 = "checked";
    var novalue3 = "unchecked";
  } else {
    var yesvalue3 = "unchecked";
    var novalue3 = "checked";
    flag = 'N';
  }
  if (checked4 == "Y") {
    var yesvalue4 = "checked";
    var novalue4 = "unchecked";
  } else {
    var yesvalue4 = "unchecked";
    var novalue4 = "checked";
    flag = 'N';
  }
  if (checked5 == "Y") {
    var yesvalue5 = "checked";
    var novalue5 = "unchecked";
  } else {
    var yesvalue5 = "unchecked";
    var novalue5 = "checked";
    flag = 'N';
  }
  if (checked6 == "Y") {
    var yesvalue6 = "checked";
    var novalue6 = "unchecked";
  } else {
    var yesvalue6 = "unchecked";
    var novalue6 = "checked";
    flag = 'N';
  }
  if (checked7 == "Y") {
    var yesvalue7 = "checked";
    var novalue7 = "unchecked";
  } else {
    var yesvalue7 = "unchecked";
    var novalue7 = "checked";
    flag = 'N';
  }
  if (checked8 == "Y") {
    var yesvalue8 = "checked";
    var novalue8 = "unchecked";
  } else {
    var yesvalue8 = "unchecked";
    var novalue8 = "checked";
    flag = 'N';
  }
  if (checked9 == "Y") {
    var yesvalue9 = "checked";
    var novalue9 = "unchecked";
  } else {
    var yesvalue9 = "unchecked";
    var novalue9 = "checked";
    flag = 'N';
  }
  
  //    var yesvalue3="checked";
 // console.log(checked10, "jdfdkljd");

  console.log("in 781", flag);
  console.log("All data===00000==>>", checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9);

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
       email,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5,
    checked6,
    checked7,
    checked8,
    checked9
    
  );
  // pdf.mail(email)
  // pdf2.citizendao(checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,email)

  res.send({
    message: "success",
    flag: flag
  });
});
//=========================================pdfviewer=============================================

router.post("/pdfviewer", cors(), async function(req, res) {
  const email = req.body.email;
  const token = req.headers.authorization;
  pdf1
    .pdf1(email, token)
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
router.post("/installationdetails", cors(), function(req, res) {
  var installation = req.body;
  // var email=req.body.email;
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
router.post("/BulkSchedules_temp", cors(), async function(req, res) {
  const token = req.headers.authorization;
  console.log(req.body);
  var schedules = req.body;
  console.log("length of data from UI", schedules.schedule.length);
  /*If data from UI is empty Error Message will be sent*/
  if (schedules.schedule.length == 0) {
    res.send({
      message: "Please Schedule the selected Buildings",
      flag: 1
    });
  } else {
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      res.send({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      res.send({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      var getorder = await buildingDao.order_id_select_aman();
      console.log(getorder, "getorder");
      console.log(getorder.result.data[0], "order_id_select=====>");
      var orderid = getorder.result.data[0].num;
      //var orderid2 = getorder.result.data[1].num;
      //console.log(orderid1, orderid2, "1 and 2");
      //var orderid = Math.max(orderid1, orderid2);
      console.log(orderid, "ORDER");
      console.log(orderid == "null");
      if (orderid == "null" || orderid == "NULL" || orderid == "NoInterest") {
        orderid = "A0001";
      } else {
        console.log(orderid, "inside the loop");
        console.log("orderid" + orderid);
        orderid = orderid + 1;
        console.log("orderid=====>" + orderid);

        orderid = orderid.toString();
        if (orderid.length == 1) {
          orderid = "A000" + orderid;
        } else if (orderid.length == 2) {
          orderid = "A00" + orderid;
        } else if (orderid.length == 3) {
          orderid = "A0" + orderid;
        } else {
          orderid = "A" + orderid;
        }
      }
      /*Here the Bulk Buildings are scheduled one by one*/
      for (let i = 0; i < schedules.schedule.length; i++) {
        console.log(i, "i");
        let uidate = schedules.schedule[i].selectedStartDate;
        var date = moment(new Date(uidate.substr(0, 16)));
        var rdate = date.format("YYYY-MM-DD");
        await schedulefun.sup(
          schedules.schedule[i].time,
          rdate,
          schedules.schedule[i].building_id,
          orderid
        );
      }
      res.send({
        status: 200,
        orderid: orderid,
        message:
          "Your Buildings are scheduled for service. Please visit booking history for details"
      });
    }
  }
});
//=============================bulkschedules_temp============================
router.post("/BulkSchedules_temp12", cors(), async function(req, res) {
  const token = req.headers.authorization;
  console.log(req.body);
  var schedules = req.body;
  console.log("length of data from UI", schedules.schedule.length);
  /*If data from UI is empty Error Message will be sent*/
  if (schedules.schedule.length == 0) {
    res.send({
      message: "Please Schedule the selected Buildings",
      flag: 1
    });
  } else {
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      res.send({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      res.send({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      var getorder = await buildingDao.order_id_select_aman();
      console.log(getorder, "getorder");
      console.log(getorder.result.data[0], "order_id_select=====>");
      var orderid = getorder.result.data[0].num;
      console.log(orderid, "ORDER");
      console.log(orderid == "null");
      if (orderid == "null" || orderid == "NULL" || orderid == "NoInterest") {
        orderid = "A0001";
      } else {
        console.log(orderid, "inside the loop");
        console.log("orderid" + orderid);
        orderid = orderid + 1;
        console.log("orderid=====>" + orderid);

        orderid = orderid.toString();
        if (orderid.length == 1) {
          orderid = "A000" + orderid;
        } else if (orderid.length == 2) {
          orderid = "A00" + orderid;
        } else if (orderid.length == 3) {
          orderid = "A0" + orderid;
        } else {
          orderid = "A" + orderid;
        }
      }
      /*Here the Bulk Buildings are scheduled one by one*/
      for (let i = 0; i < schedules.schedule.length; i++) {
        console.log(i, "i");
        let uidate = schedules.schedule[i].selectedStartDate;
        var date = moment(new Date(uidate.substr(0, 16)));
        var rdate = date.format("YYYY-MM-DD");
        await schedule_temp.sup_bulk_temp(
          schedules.schedule[i].time,
          rdate,
          schedules.schedule[i].building_id,
          orderid
        );
      }
      res.send({
        status: 200,
        message:
          "Your Buildings are scheduled for service. Please visit booking history for details",
        orderid: orderid
      });
    }
  }
});
//=============================Blockchain-API's============================================//
router.post("/blockchain", cors(), async function(req, res) {
  var Buildingdetails = req.body.Buildingdetails;
  var name = req.body.name;
  var data = {
    name: name,
    Buildingdetails: Buildingdetails
  };
  var params = {
    id: req.body.key,
    fun: "create",
    data: data
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

//=======================Appeal===============================================//
router.post("/Appeal", cors(), (req, res) => {
  const Appeal_Object = req.body;
  const token = req.headers.authorization;
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
//=============================================Trainer account creation========================
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
    Employee_profile.Employee_profile(EmployeeProfile)
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

//====================================company_trading_license============================================//
router.get("/Company_trading_license", cors(), (req, res) => {
  const token = req.headers.authorization;
  console.log("routes_token===>", token);
  var data = req.headers;
  console.log("routes===>", data);
  // console.log(data);

  company_trading_license
    .company_trading_license(token, data)
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

//=======================================classroom=================================================//
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

//============================================//
//============================================//
router.post("/Feedback", cors(), function (req, res) {
  // var id= req.body.id

  var token = req.headers.authorization;
  console.log("token_index", token)
  var language = req.headers.language;

  var Company_Email = req.body.email_id;
  console.log("emaili_d_index", Company_Email);
  var comments = req.body.comments;
  console.log("comment_index", comments)


  if (!Company_Email || !comments.trim()) {
    res.status(400).json({
      message: "Please enter the details completely !"
    });
  } else {
    feedback
      .feedback(Company_Email, comments, token, language)
      .then(result => {
        console.log("result", result);
        res.status(result.status).json({
          message: result
        });
      })
      .catch(err =>
        res.status(err.status).json({
          message: err.message
        })
      );
  }
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
//====================================EXAM RESULTS===================================================================================//
//====Static API is used for fetching the file and certificates which is located under a path of upload directory===================//
router.use("/static", express.static(path.join(__dirname, "upload")));
//====Results API is used for generating certificates which will navigate to utils and there will be certificategenerate file which consits the structure for creating certificate and after get inputs from UI store the results and certificate in DB====//
router.post("/Results", cors(), (request, response) => {
  certificate.Certificate(request, function(error, result) {
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
  certificate.getCertificate(request, function(error, result) {
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
router.post("/request_for_service_aman", cors(), (req, res) => {
  console.log("enter into req for aman service");
  const token = req.headers.authorization;
  var file_name = req.body.filename;

  var file1 = file_name;
  var file_path = "./uploads/" + file1;
  console.log(file_path, "filepath");
  var email_id = req.body.email;
  request_service_aman
    .request_service_aman(file_path, email_id, token)
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
//====================================FETCH ATTENDANCE LIST============================================//
//====Fetching the attendance list from attendance table from DB====//
router.post("/getAttendance", cors(), (request, response) => {
  certificate.getAttendance(request, function(error, result) {
    console.log("result", error);
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
  console.log("Trainer_data_Index===>", trainer_data);
  const token = req.headers.token;
  const language = req.headers.language;

  trainer_attendance
    .trainer_attendance(trainer_data, token, language)
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
// =================================================================================
router.post("/Selecting_date_trainer", cors(), (req, res) => {
  const Trainer_selecting_date = req.body;
  console.log("Trainer_selecting_date_INDEX", Trainer_selecting_date);
  const token = req.headers.token;
  const language = req.headers.language;
  trainer_attendance
    .trainer_date_select(Trainer_selecting_date, token, language)
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

//=================================Trainer Attendance=============================================//
router.post("/attendence", cors(), (req, res) => {
  const Employee_attendance = req.body;
  console.log("Employee_attendance_ROUTES", Employee_attendance);
  const token = req.headers.token;
  const language = req.headers.language;
  trainer_attendance
    .trainer_attendance_list(Employee_attendance, token, language)
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
//=================================Trainer Attendance=============================================//
router.post("/attendence_absent", cors(), (req, res) => {
  const Employee_attendance = req.body;
  console.log("Employee_attendance_ROUTES", Employee_attendance);

  trainer_attendance
    .trainer_attendance_absent_list(Employee_attendance)
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

//=========================================================================================//

router.post("/uploadbulkemployee", multipartMiddleware, cors(), (req, res) => {
  const data = req.files.file.path;
  console.log("file", data);
  const token = req.headers.token;
  const language = req.headers.language;
  uploadSalama
    .uploadbulkemployee(data, token, language)
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
//=============================================================================================
router.get("/Employee_whole_details_grid_view", cors(), (req, res) => {
  const token = req.headers.authorization;
  console.log("token====>", token);
  const language = req.headers.language;
  const id = req.headers.id;
  Employee_grid_view.Employee_grid_view(token, language)
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

router.post("/Employee_whole_details_grid_view1", cors(), (req, res) => {
  const token = req.headers.authorization;

  const language = req.headers.language;
  const order_id = req.body.order_id;
  Employee_grid_view1.Employee_grid_view1(order_id, token, language)
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
//================================================
//=================================Certificate download========================================//

//==============================================================//

router.post("/file_upload_web", upload1.single("file"), function(req, res) {
  // var filepath = "./upload_aman/" + req.file.originalname;
  const file = req.file;
  const filename = file.filename;
  console.log("data======>", req.file.filename);
  console.log("file", file);
  const token = req.headers["authorization"];
  var email_id = req.headers.email;
  var filepath = req.file.path;
  upload_aman_web
    .upload_aman_web(filepath, token, email_id)
    .then(result => {
      console.log(result, "result");
      res.status(result.status).json({
        message: result,
        result: req.file.filename,
        file: file1
        // order_Id: result.order_Id
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

router.post(
  "/uploadbulkemployee_web",
  upload1.single("file"),
  cors(),
  (req, res) => {
    var test = req.body;
    console.log("test", test);
    const data = req.file.path;
    const hr_email = req.headers.hr_email;
    console.log("hr_email===>", hr_email);
    const trade_license_number = req.headers.company_trade_license_no;
    console.log("company_trade_license_no===>", trade_license_number);
    //const filename = req.files.file.originalFilename

    const file = req.file;
    const filename = file.filename;
    console.log("data", data);
    console.log("file", file);
    const token = req.headers.authorization;
    console.log("token_routes==>", token);
    const language = req.headers.language;

    upload_salama_web
      .upload_salama_web(data, token, filename, hr_email, trade_license_number)
      .then(result => {
        console.log(result);
        res.status(result.status).json({
          message: result,
          file: file1
        });
        console.log("file", file1);
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
//================================================================//
//================================================================//
router.post(
  "/uploadbulkemployee_web_ar",
  upload1.single("file"),
  cors(),
  (req, res) => {
    var test = req.body;
    console.log("test", test);
    const data = req.file.path;
    const hr_email = req.headers.hr_email;
    console.log("hr_email===>", hr_email);
    const trade_license_number = req.headers.company_trade_license_no;
    console.log("company_trade_license_no===>", trade_license_number);
    //const filename = req.files.file.originalFilename

    const file = req.file;
    const filename = file.filename;
    console.log("data", data);
    console.log("file", file);
    const token = req.headers.authorization;
    console.log("token_routes==>", token);
    const language = req.headers.language;

    upload_salama_web
      .upload_salama_web(data, token, filename, hr_email, trade_license_number)
      .then(result => {
        console.log(result);
        res.status(result.status).json({
          message: result,
          file: file1
        });
        console.log("file", file1);
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
//=====================================================
//=====================================================
router.post("/uploadaman", upload_aman.single("file"), cors(), (req, res) => {
  const data = req.file.path;
  //const filename = req.files.file.originalFilename
  const file = req.file;
  console.log("data", data);
  console.log("file", file);
  const token = req.headers.token;
  const language = req.headers.language;

  uploadaman
    .uploadaman(data, token, language)
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
router.post("/DeleteBuilding", cors(), async function(req, res) {
  // var id = await check.checkToken(req);
  // const token = req.headers['authorization'];
  // console.log(id);
  // if (id.status == 400 && id.status == 403) {
  //   res.send({
  //     result: id
  //   });
  // } else {
  var buildingobject = req.body;
  console.log("buildingobject", req.body);
  delbuilding
    .buildings(buildingobject)
    .then(result => {
      res.send({
        result: result,
        message: "Your Building Details Deleted successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
  // }
});
router.post("/EditBuildingdetails", cors(), async function(req, res) {
  // var id = await check.checkToken(req);
  // const token = req.headers['authorization'];
  // console.log(id);
  // if (id.status == 400 && id.status == 403) {
  //   res.send({
  //     result: id
  //   });
  // } else {
  var buildingobject = req.body;
  console.log("buildingobject", req.body);
  delbuilding
    .editbuildings(buildingobject)
    .then(result => {
      res.send({
        result: result,
        message: "Your Building Details Deleted successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
  // }
});

router.post("/updateProfile", cors(), async function(req, res) {
  var updateProf = req.body;
  console.log("updateProfile", req.body);
  updateprofile
    .updateprofile(updateProf)
    .then(result => {
      res.send({
        result: result,
        message: "Updated successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
  // }
});

router.get("/download1", express.static(path.join(__dirname, "../uploads")));

//======================================================================================//
router.get("/download1/:file(*)", function(req, res, next) {
  // this routes all types of file
  var path = require("path");
  var file = req.params.file;
  var path = path.resolve(".") + "/uploads/" + file;
  res.download(path); // magic of download fuction
});

//=================================Contactus_feedback=============================================//
router.post("/Contactus_feedback", cors(), (req, res) => {
  const contact_feedback = req.body;
  const token = req.headers.authorization;
  console.log("token_contact", token);
  // console.log("contact_feedback_ROUTES", contact_feedback)
  console.log("hello");

  // Contactus_feedback.callme();

  Contactus_feedback.Contactus_comments(contact_feedback, token)
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

//=================================Contactus_feedback=============================================//
router.post("/salama_order", cors(), (req, res) => {
  const salama_order = req.body;
  console.log("salama_order_ROUTES", salama_order);

  salama_order_details
    .salama_order(salama_order)
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
//===========================================================================//
router.post("/Payment", cors(), async function(req, res) {
  //const token = req.headers.authorization;
  var payment1 = req.body;
  console.log(payment1);
  payment
    .payment(payment1)
    .then(result => {
      res.send({
        result: result,
        message: "Your Payment Details added successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//==========================================certificate_issue=============//

router.post("/certificate_issue1", cors(), async function(req, res) {
  //const token = req.headers.authorization;
  var national_id = req.body;
  const token = req.headers.token;
  const language = req.headers.language;
  console.log(national_id, "jdlkfjdkjfd;lkj");
  certificate_issue1
    .certificate_issue(national_id, token, language)
    .then(result => {
      res.send({
        result: result,
        message: "Your Payment Details added successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//===================================================================================
router.post("/Payment_salama", cors(), async function(req, res) {
  const token = req.headers.authorization;
  var payment1 = req.body;
  console.log(payment1);
  payment
    .payment(payment1, token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=====================================================
router.post("/session_close", cors(), async function(req, res) {
  //const token = req.headers.authorization;
  var token = req.headers.authorization;
  console.log(token);

  session_delete
    .session_delete(token)
    .then(result => {
      res.status(result.status).json({
        message: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=====================================================
//---------------------Owner Details------------------------------------
router.post("/owner_details", cors(), function(req, res) {
  var owner_details = req.body;
  console.log("owner_details", owner_details);
  var token = req.headers.authorization;
  console.log("token", token);
  cregister
    .owner_details(owner_details, token)
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
//=============================================================================
router.post("/hr_details", cors(), function(req, res) {
  var hr_details = req.body;

  var token = req.headers.authorization;
  console.log("token", token);
  cregister
    .hr_details(hr_details, token)
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
//==========================Admin Map (InActive-Yellow)==============================================
router.get("/AdminMap", cors(), (req, res) => {
  //let data = req.body;
  // let request = req.headers;
  // console.log(data);
  // const token = req.headers.authorization;
  Adminmap.Adminmap()
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result.result
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
//==============================Admin map( Active-Green)==========================================
router.get("/AdminMapActive", cors(), (req, res) => {
  //let data = req.body;
  // let request = req.headers;
  // console.log(data);
  // const token = req.headers.authorization;
  Adminmapactive.Adminmapactive()
    .then(result => {
      console.log(result);

      res.status(result.status).json({
        message: result.result
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
//========================================================================
router.use("/download", express.static(path.join(__dirname, "../upload")));
//===================================================================================
router.post("/certificate_issue", cors(), async function(req, res) {
  // const token = req.headers.authorization;
  var token = req.headers.authorization;
  console.log("token", token);
  var certificate_issue1 = req.body.national_id;
  var certificate_status_emp = req.body.certificate_status_emp;
  var result = req.body.result;
  console.log(certificate_status_emp, "status_emp=====>");
  // const token = req.headers.token;
  // const language = req.headers.language;
  console.log("front", req.body);
  certificate_issue
    .certificate_issue(
      certificate_issue1,
      certificate_status_emp,
      result,
      token
    )
    .then(result => {
      res.send({
        result: result,
        message: "Your Payment Details added successfully"
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=============Installers DashBoard Details API =======//

router.post("/installers_dashboard", cors(), async (req, res) => {
  const token = req.headers.authorization;
  const result = await getInstaller(req.body, token);
  console.log("result", result);
  if (result.status != 200) {
    res.status(result.status).json({
      status: result.status,
      message: "Data Cant Fetch"
    });
  } else {
    res.status(result.status).json({
      Data: result
    });
  }
});

//=============================================================================
router.post("/addAdmin", cors(), function(req, res) {
  var add_admin = req.body;
  console.log("add_admin", add_admin);

  cregister
    .add_admin(add_admin)
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

//========================================================================
//=============================================================================
router.post("/getinstalleremployees", cors(), function(req, res) {
  var installer_employees = req.body;
  console.log("installer_employees", installer_employees);
  var token = req.headers.authorization;
  console.log("token", token);
  login
    .getinstallereployees(installer_employees, token)
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

//========================================================================
//=============================================================================
// router.post("/getownerprofile", cors(), function(req, res) {
//   var ownerprofile = req.body;
//   console.log("ownerprofile", ownerprofile);
//   var token = req.headers.authorization;
//   console.log("token", token);
//   ownerprofile
//     .getownerprofile(ownerprofile, token)
//     .then(result => {
//       res.send({
//         result: result
//       });
//     })
//     .catch(err =>
//       res.status(err.status).json({
//         message: err.message
//       })
//     );
// });

//========================================================================
//=============Installers DashBoard Details API =======//

// router.post('/installers_dashboard', cors(), async (req, res) => {
//   const result = await getInstaller(req.body);
//   console.log("result",result);
//   if (result[0].status != 200) {
//     res.status(400).json({
//       status: 400,
//       message: 'Data Cant Fetch'
//     });
//   } else {
//     console.log("active_installer:", result[0].data[0].active_installers);
//     console.log("total_installers:", result[0].data[0].total_installers);

//     res.status(200).json({
//       status: 200,
//       active_installer: result[0].data[0].active_installers,
//       total_installers: result[0].data[0].total_installers,
//     });
//   }

// });

router.get("/installers_dashboard_monthwise", async (req, res) => {
  const token = req.headers.authorization;
  const installer = await getMothlyInstallerDetails(token);
  console.log(installer[0].data);
  const installerDetails = [];
  installer[0].data.map(tr => {
    installerDetails.push({
      active_installers: tr.active_installers,
      total_installers: tr.total_installers,
      month: tr.month,
      year: tr.year
    });
  });
  if (installer[0].status != 200) {
    res.status(400).json({
      status: 400,
      message: "Data Cant Fetch"
    });
  } else {
    console.log("active_installer:", installer[0].data[0].active_installers);
    console.log("total_installers:", installer[0].data[0].total_installers);
    res.status(200).json({
      status: 200,
      installerDetails: installerDetails
    });
  }
});

//=============Installers DashBoard Details API =======//

//=============================adminApproved================================================
router.post("/adminApproved", cors(), function(req, res) {
  var adminApproved = req.body;
  console.log("adminApproved", adminApproved);
  var token = req.headers.authorization;
  console.log("token", token);
  admin
    .adminapproveddetails(adminApproved, token)
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

//=================================adminApproved=======================================
//=============================adminApproved================================================
router.post("/adminReject", cors(), function(req, res) {
  var adminReject = req.body;
  console.log("adminReject", adminReject);
  var token = req.headers.authorization;
  console.log("token", token);
  admin
    .adminRejectdetails(adminReject, token)
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

//=================================adminApproved=======================================
//=============================adminApproved================================================
router.post("/adminFreeze", cors(), function(req, res) {
  var adminFreeze = req.body;
  console.log("adminFreeze", adminFreeze);
  var token = req.headers.authorization;
  console.log("token", token);
  admin
    .adminFreezedetails(adminFreeze, token)
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

//=================================adminApproved=======================================
//===================================allbuildings======================================================//
router.get("/getavgBuildings", cors(), async function(req, res) {
  admin
    .getbuildings()
    .then(result => {
      res.send({
        data: result.result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=================================== ildings======================================================//
//=============Buildings DashBoard Details API =======//

router.post("/buildings_dashboard", cors(), async (req, res) => {
  var buildings_month = req.body;
  console.log("buildings==>index==>", buildings_month);
  var token = req.headers.authorization;
  admin
    .getbuildings_month(buildings_month, token)
    .then(result => {
      res.send({
        result: result.res_data
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

//===================================order avg======================================================//
router.get("/getavgOrder", cors(), async function(req, res) {
  await admin
    .getavgOrder()
    .then(result => {
      console.log(result);
      res.send({
        data: result.result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=================================== order======================================================//

//=============Buildings DashBoard Details API =======//

router.post("/order_dashboard", cors(), async (req, res) => {
  var order_month = req.body;
  console.log("order==>index==>", order_month);
  var token = req.headers.authorization;
  admin
    .getorder_month(order_month, token)
    .then(result => {
      res.send({
        result: result.res_data
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

//===================================allbuildings======================================================//
//=============Buildings DashBoard Details API =======//

router.post("/admin_month", cors(), async (req, res) => {
  var adminmonth = req.body;
  console.log("order==>index==>", adminmonth);
  var token = req.headers.authorization;
  admin
    .getadmin_month(adminmonth, token)
    .then(result => {
      res.send({
        result: result.res_data
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});

//===================================allbuildings======================================================//
//===================================order avg======================================================//
router.get("/getavgadmin", cors(), async function(req, res) {
  admin
    .getavgadmin()
    .then(result => {
      console.log("result", result);
      res.send({
        data: result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=================================== order======================================================//
//===================================order avg======================================================//
router.get("/getapplicationstatistics", cors(), async function(req, res) {
  admin
    .getapplicationstatistics()
    .then(result => {
      res.send({
        data: result.result
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
//=================================== order======================================================//

//=============Buildings DashBoard Details API =======//

router.post("/application_statics_month", cors(), async (req, res) => {
  var adminmonth = req.body;
  console.log("order==>index==>", adminmonth);
  var token = req.headers.authorization;
  admin
    .getadmin_month(adminmonth, token)
    .then(result => {
      res.send({
        result: result.res_data
      });
    })
    .catch(err =>
      res.status(err.status).json({
        message: err.message
      })
    );
});
// ===================================receiptupload======================================================//
router.post("/receipt_upload", uploads.single("file"), function(req, res) {
  var file = "var/www/html/" + "/" + req.file.filename;
  console.log("file", req.file);
  console.log("body", req.body);
  console.log("body", req.headers.authorization);
  var order_id = req.body.id;
  var filepath = req.file.path;
  var token = req.headers.authorization;
  fs.rename(filepath, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      receipt_upload
        .receipt_upload(filepath, order_id, token)
        .then((result, error) => {
          console.log("result", result);
          if (result) {
            res.status(result.status).json({
              message: result
            });
          } else {
            res.status(error.status).json({
              message: error
            });
          }
        });
    }
  });
});
//=======================================================Appeal_file_upload===================================
router.post("/file_upload_Appeal", uploads.single("file"), function(req, res) {
  var file = "var/www/html/" + "/" + req.file.filename;
  console.log(req.file);
  console.log(req.body);
  var email_id = req.body.email_id;
  var filepath = req.file.path;
  fs.rename(filepath, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      image_upload
        .image_upload_Appeal(filepath, email_id)
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

// ========================Payment Gateway Integration==========================================
router.post("/payment_hash", cors(), (req, res) => {
  payment.payment_hash(req).then((result, error) => {
    if (result) {
      res.status(result.status).json({
        message: result
      });
    } else {
      res.status(error.status).json({
        message: error
      });
    }

    console.log("result", result);
  });
});
// router.post("/tahsheel_payment", cors(), (req, res) => {
//   payment.tahsheel_payment(req).then((result, error) => {
//     console.log("result", result);
//     if (result) {
//       res.status(result.status).json({
//         message: result
//       });
//     } else {
//       res.status(error.status).json({
//         message: error
//       });
//     }

//     console.log("result", result);
//   });
// });
// ==================================GetResponse=====================================================
router.get("/getResponse", cors(), async (req, res) => {
  // console.log("response from gateway", req.url);

  let q = req.url.split("?"),
    result = {};
  if (q.length >= 2) {
    q[1].split("&").forEach(item => {
      try {
        result[item.split("=")[0]] = item.split("=")[1];
      } catch (e) {
        result[item.split("=")[0]] = "";
      }
    });
  }
  var TP_Extrafees = decodeURIComponent(result.TP_ExtraFees);
  var TP_Paymentdate1 = decodeURIComponent(result.TP_PaymentDate);
  var TP_Paymentdate = TP_Paymentdate1.replace("+", " ");
  var Taxfees = decodeURIComponent(result.TP_TaxFees);

  (result["TP_Extrafees"] = TP_Extrafees),
    (result["TP_Paymentdate"] = TP_Paymentdate),
    (result["Taxfees"] = Taxfees);
  console.log("result", result);
  var res_payment = await payment.payment_res(result);
  console.log("res", res_payment);
  if (res_payment == true&&result.TP_ResultCode==0) {
    res.render("index", {
      title:
        "Your payment has been successfully proccessed.Kindly note down the below ",
      result: result
    });
    // res.send({ status: 200, result: result });
  } else if (res_payment == false&&result.TP_ResultCode==-11) {
    res.render("main", {
      refNo: result.TP_RefNo,
      title:
        "Your payment was not processed successfully your order id " +
        result.TP_RefNo +
        " is cancelled kindly contact call centre for further details "
    });
  } else if  (res_payment == true&&result.TP_ResultCode==-4) {
      res.render("index", {
        title:
          "Your payment for the order id "+ result.TP_RefNo+" already done",
        result: result
      });
  }
   else {
    res.send({ result: "Data not saved" });
  }
});
router.post("/Convert_Pdf1", cors(), async function(req, res) {
  //var flag=0;
  
  // let checked10 = req.body.SelectedValues10;
  let PC = req.body.SelectedValues1;                                                                                       
  let FAS = req.body.SelectedValues2;
  let FA  = req.body.SelectedValues3;
  let FPP = req.body.SelectedValues4;
  let FPF = req.body.SelectedValues5;
  let TS = req.body.SelectedValues6;
  let TL = req.body.SelectedValues7;
  let SC = req.body.SelectedValues8;
  let FAR = req.body.SelectedValues9;
  let D1v = req.body.D1;
  let D2v = req.body.D2;
  let D3v = req.body.D3;
  let D4v = req.body.D4;
  let D5v = req.body.D5;
  let D7v = req.body.D7;
  let D8v = req.body.D8;
  let D9v = req.body.D9;
  let D6v = req.body.D6;

  let building_id = req.body.building_id;
  let schedule_id = req.body.schedule_id;
  let supplier_id = req.body.supplier_id;
  let timearrivedv = req.body.timearrived;
  let timeleftv = req.body.timeleft;
  let timesignalcheckedv = req.body.timesignalchecked;
  let signalcheckedv = req.body.signalchecked;
  let BRAND = req.body.brand;
  let simno = req.body.simno;
  let telno = req.body.telno;

  let flag = 'Y';
 
  await pdf1.pdf1(
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

    


    
  );

  // pdf2.citizendao(checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,email)

  res.send({
    message: "success",
    flag: flag
  });
});
router.post("/Convert_Pdf1_ar", cors(), async function(req, res) {
  //var flag=0;
  
  // let checked10 = req.body.SelectedValues10;
  let PC = req.body.SelectedValues1;                                                                                       
  let FAS = req.body.SelectedValues2;
  let FA  = req.body.SelectedValues3;
  let FPP = req.body.SelectedValues4;
  let FPF = req.body.SelectedValues5;
  let TS = req.body.SelectedValues6;
  let TL = req.body.SelectedValues7;
  let SC = req.body.SelectedValues8;
  let FAR = req.body.SelectedValues9;
  let D1v = req.body.D1;
  let D2v = req.body.D2;
  let D3v = req.body.D3;
  let D4v = req.body.D4;
  let D5v = req.body.D5;
  let D7v = req.body.D7;
  let D8v = req.body.D8;
  let D9v = req.body.D9;
  let D6v = req.body.D6;

  let building_id = req.body.building_id;
  let schedule_id = req.body.schedule_id;
  let supplier_id = req.body.supplier_id;
  let timearrivedv = req.body.timearrived;
  let timeleftv = req.body.timeleft;
  let timesignalcheckedv = req.body.timesignalchecked;
  let signalcheckedv = req.body.signalchecked;
  let BRAND = req.body.brand;
  let simno = req.body.simno;
  let telno = req.body.telno;

  let flag = 'Y';
 
  await pdf1_ar.pdf1_ar(
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

    


    
  );

  // pdf2.citizendao(checked1,checked2,checked3,checked4,checked5,checked6,checked7,checked8,checked9,email)

  res.send({
    message: "success",
    flag: flag
  });
});
router.post("/building_reschedule", function(req, res) {
  console.log(req.body);
  var time_slot = req.body.time_slot;
  var token = req.headers.authorization;
 var reschedule_date = req.body.reschedule_date;
 var schedule_id = req.body.schedule_id;
 building_reschedule
 .building_reschedule(time_slot,reschedule_date,schedule_id, token)
 .then(result => {
  res.send({
    result: "Successfully rescheduled"
  });
 })
 .catch(err =>
  res.status(err.status).json({
    message: err.message
  })
 );
 });
 router.post("/assesser-view", cors(), async function(req, res) {
  const token = req.headers.authorization;
  const supplier_email_id = req.body.supplier_email_id
  assesserview
    .assesserview(token,supplier_email_id)
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
//===================================allbuildings======================================================//
module.exports = router;

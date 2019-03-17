module.exports.findemployeeResults =
  "SELECT * FROM Results where National_Id  = ?";
module.exports.insertemployeeResults =
  "INSERT INTO Results (date_attended,employee_id,score,result_en,result_ar,certificate,National_Id,course_name_en,course_name_ar) VALUES ? ";
module.exports.deleteattendance =
  "delete from Attendance where National_Id = ?";
module.exports.getemployeedetails =
  "select * from Schedule where scheduled_date =? AND start_time=? AND end_time=?";
module.exports.findemployee =
  "SELECT * FROM Employee_Profile where National_Id =?";
module.exports.insertemployee =
  "INSERT INTO Employee_Profile (Employee_ID,Name_en,Name_ar,Position,National_Id,Company_Trade_Lincense_No,assigned_for_training,Category) VALUES ?";
module.exports.deleteemployee =
  "delete from Employee_Profile where National_Id = ?";
module.exports.getclassroom = "SELECT * FROM Classroom where classnum =?";
module.exports.insertattendance =
  "INSERT INTO Attendance (employee_id, attendance_status, National_id, Name_en, trainer_id, Attended_date, start_time, end_time, classroom, course_name) VALUES ? ";
module.exports.courseinsert=
 "INSERT INTO Course (name_ar,name_en,exam_amount,training_amount,duration) VALUES ?" ;
module.exports.courseselect =
"SELECT name_en FROM Course where name_en=?";
module.exports.coursenames =
"SELECT * FROM Course ";
module.exports.session=
"SELECT * FROM Session where token =?";
module.exports.Appeal=
"INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date,Compliant_NO) VALUES ?";
module.exports.trainerid=
"SELECT id FROM Trainer where Name_en = ?";
module.exports.trainerid_ar=
"SELECT id FROM Trainer where Name_ar = ?";
module.exports.appealidcount =
"SELECT count(id) as count FROM Appeal"

module.exports.getdatedetails =
"SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
 module.exports.getlogindetails = "SELECT * FROM citizens where email_id =?";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
module.exports.addbuilding = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
module.exports.resgister = "INSERT INTO citizens (firstname_en, firstname_ar,lastname_en,lastname_ar,company_en,company_ar,nationality_en,nationality_ar,alter_number,address_en,address_ar,emirates_id,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,newsletter,user_type,reg_date,otp) VALUES ?";
/* Fetching the list of trained employees from "Results" table */
module.exports.trained_employees=
"select * from Employee_Profile where Company_Trade_Lincense_No=? and National_Id in (select National_Id from Results where result_en=?) ";

/* Fetching the list of untrained employees from "Results" table */
module.exports.untrained_employees=
"select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ";

  module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
 module.exports.getlogindetails = "SELECT * FROM citizens where email_id =?";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
module.exports.availabledate =
"SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";
module.exports.getinstallers = "SELECT email_id FROM citizens where user_type=?";
module.exports.imagepdf = "UPDATE Schedules SET filepath =? WHERE id =?";
module.exports.pdfviewer = "SELECT path,path1,path2,path3 FROM Buildings where email_id= ?";
module.exports.scheduleinfo ="INSERT INTO Schedules(schedule_time,requestdate,suplier_id,building_id,status) VALUES ? ";
module.exports.servicehistory ="SELECT * FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Buildings.email_id=?";
module.exports.installationdetails = "UPDATE Schedules SET FACP = ?,CSI = ?,BRAND = ?,status = ? WHERE id = ?";



  

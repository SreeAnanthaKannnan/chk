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
"INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date) VALUES ?";
module.exports.trainerid=
"SELECT id FROM Trainer where Name_en = ?";
module.exports.trainerid_ar=
"SELECT id FROM Trainer where Name_ar = ?";

  module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
 module.exports.getlogindetails = "SELECT * FROM citizens where email_id =?";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
  

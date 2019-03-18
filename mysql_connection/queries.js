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




module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";

//======================Trainer Attendance start================================
module.exports.verify_email =
  "SELECT * FROM Trainer where trainer_email_id =? "

module.exports.getschedule =
  "SELECT distinct Scheduled_date,start_time,end_time,course_id FROM Schedule where Trainer_id =? "

module.exports.getcoursear =
  "SELECT name_ar FROM Course where course_id =? "

module.exports.getcourseen =
  "SELECT name_en FROM Course where course_id =? "

module.exports.getschedulerdateselect =
  "SELECT * FROM Schedule where trainer_id =?  AND scheduled_date=? AND start_time=? AND end_time=?"

module.exports.getclassroom = "SELECT * FROM Classroom where classnum =?";

module.exports.insertattendance =
  "INSERT INTO Attendance (employee_id, attendance_status, National_id, Name_en, trainer_id, Attended_date, start_time, end_time, classroom, course_name) VALUES ? ";



  //======================Trainer Attendance End================================

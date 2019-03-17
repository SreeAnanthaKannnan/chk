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
module.exports.courseinsert =
  "INSERT INTO Course (name_ar,name_en,exam_amount,training_amount,duration) VALUES ?";
module.exports.courseselect =
  "SELECT name_en FROM Course where name_en=?";
module.exports.coursenames =
  "SELECT * FROM Course ";
module.exports.session =
  "SELECT * FROM Session where token =?";
module.exports.Appeal =
  "INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date,Compliant_NO) VALUES ?";
module.exports.trainerid =
  "SELECT id FROM Trainer where Name_en = ?";
module.exports.trainerid_ar =
  "SELECT id FROM Trainer where Name_ar = ?";
module.exports.appealidcount =
  "SELECT count(id) as count FROM Appeal"

module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
module.exports.getlogindetails = "SELECT * FROM citizens where email_id =?";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
module.exports.availabledate =
"SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";
module.exports.addtime=
"SELECT ADDTIME(?,?)as started_time";
module.exports.classroominsert =
"INSERT INTO Classroom (classroom_id,trainer_id,address_en,address_ar,number_of_seats,number_of_available_seats,available_date,start_time,end_time,course_id)Values ?";
module.exports.classroomidselect =
"SELECT classroom_id FROM Classroom where available_date =? and trainer_id=? ";
module.exports.classroomdataselect = 
"SELECT start_time,end_time,number_of_available_seats FROM Classroom where classroom_id =?";
module.exports.starttimeformat =
"SELECT TIME_FORMAT(?, '%h:%i %p') as start_time";
module.exports.endtimeformat =
"SELECT TIME_FORMAT(?, '%h:%i %p') as end_time";
module.exports.alldatafromclassroom =
"SELECT * FROM Classroom where classroom_id=?";
module.exports.courseidselect =
"SELECT course_id FROM Course where name_ar =?";
module.exports.timedifference =
"SELECT TIMEDIFF( ? ,?) as starting_time";
module.exports.classroomdataforbulkbooking =
"select * from Classroom where number_of_available_seats <> 0 and course_id=? order by available_date asc"
module.exports.scheduleinsertbulkbooking =
"INSERT INTO Schedule(classroom_id,National_Id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?";
module.exports.updateemployeetablebulkbooking =
"UPDATE Employee_Profile SET assigned_for_training =? where National_Id=?";
module.exports.companyprofileselect =
"SELECT Company_Trade_License_No FROM Company_Profile where Company_Email =?";
module.exports.companyprofileinsert =
"INSERT INTO Company_Profile (Company_Trade_License_No,Mandatory_Training_Percentage,Category,Company_Email,Number_of_employees) VALUES ?";
module.exports.trainingamount =
"SELECT training_amount FROM Course where course_id=?";
module.exports.courseidforenglish =
"SELECT * FROM Course where name_en=?";
module.exports.courseidforarabic =
"SELECT * FROM Course where name_ar=?";
module.exports.arabiccoursename =
"SELECT name_ar FROM Course where course_id=?";
module.exports.englishcoursename =
"SELECT name_en FROM Course where course_id=?";
module.exports.selectingemployeeprofile =
"SELECT * FROM Employee_Profile where Company_Trade_Lincense_No =? and Category =?";
module.exports.numbervalidation =
"SELECT count(National_Id) as count from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ";
module.exports.notbooked =
"SELECT * from Employee_Profile where Category=? and assigned_for_training <> ? ";
module.exports.employeeupdate =
"update Employee_Profile set assigned_for_training =? where Company_Trade_Lincense_No = ? and National_Id =?";
module.exports.untrainedschedule =
"SELECT * from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ";
module.exports.employeenameschedule =
"SELECT Name_en from Employee_Profile where National_Id =?";
module.exports.employeenameschedulearabic =
"SELECT Name_ar from Employee_Profile where National_Id =?";
module.exports.scheduleinsertpartialbooking =
"INSERT INTO Schedule(classroom_id,National_Id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?";
module.exports.schedulesummary =
"SELECT * from Schedule where Company_Trade_Lincense_No=? and status =? ";
module.exports.sessioninsert =
"INSERT INTO Session (user_ID,token,session_created_at) VALUES ? ";
module.exports.sessiondelete =
"Delete from Session where user_ID =?";
module.exports.addbuilding = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
module.exports.resgister = "INSERT INTO citizens (firstname_en, firstname_ar,lastname_en,lastname_ar,company_en,company_ar,nationality_en,nationality_ar,alter_number,address_en,address_ar,emirates_id,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,newsletter,user_type,reg_date,otp) VALUES ?";
/* Fetching the list of trained employees from "Results" table */
module.exports.trained_employees =
  "select * from Employee_Profile where Company_Trade_Lincense_No=? and National_Id in (select National_Id from Results where result_en=?) ";

/* Fetching the list of untrained employees from "Results" table */
module.exports.untrained_employees =
  "select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ";

module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
module.exports.getlogindetails = "SELECT * FROM citizens where email_id =?";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
module.exports.findemployeeAttendance = "SELECT * FROM Attendance where trainer_id =? AND attendance_status='Present'"
module.exports.availabledate =
  "SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";
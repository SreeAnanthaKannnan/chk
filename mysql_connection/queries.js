
//======================Result queries================================
module.exports.findemployeeResults =
  "SELECT * FROM Results where National_Id  = ?";
module.exports.insertemployeeResults =
  "INSERT INTO Results (date_attended,employee_id,score,result_en,result_ar,certificate,National_Id,course_name_en,course_name_ar) VALUES ? ";
module.exports.deleteattendance =
  "delete from Attendance where National_Id = ?";
module.exports.getemployeedetails =
  "select * from Schedule where scheduled_date =? AND start_time=? AND end_time=?";
/*========selecting employee's data for the given emirates_id=====*/
module.exports.findemployee =
  "SELECT * FROM Employee_Profile where National_Id =?";
/*===============inserting employee  details into employee_profile table=========*/
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
  "SELECT distinct Scheduled_date,start_time,end_time,course_id FROM Schedule where Trainer_id =? AND Scheduled_date >= now()+1 "

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

/*========inserting course details into course table=========*/
module.exports.courseinsert =
  "INSERT INTO Course (name_ar,name_en,exam_amount,training_amount,duration) VALUES ?";
/*============selecting course name=======*/
module.exports.courseselect =
  "SELECT name_en FROM Course where name_en=?";
/*=================selecting all data from course ======*/
module.exports.coursenames =
  "SELECT * FROM Course ";
/*==================selecting all the data from session table for the particular token======*/
module.exports.session =
  "SELECT * FROM Session where token =?";
/*=============inserting appeal data in to appeal table=========*/
module.exports.Appeal =
  "INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date,Compliant_NO) VALUES ?";
/*=============selecting trainer id for the particular trainer name(english)=========*/
module.exports.trainerid =
  "SELECT id FROM Trainer where Name_en = ?";
/*=====================selecting trainer id for the particular trainer name(Arabic)======*/
module.exports.trainerid_ar =
  "SELECT id FROM Trainer where Name_ar = ?";
/*=======finding the row count from the Appeal table for compliant no=========*/
module.exports.appealidcount =
  "SELECT count(id) as count FROM Appeal"







module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
module.exports.getlogindetails = "SELECT * FROM citizens where email_id =?";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
/*================fetching the availabledate for the number of available seats greater than the selected seats and particular trainer
course id========*/
module.exports.availabledate =
  "SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";
/*==========Add the two times and displayed as started_time========*/
module.exports.addtime =
  "SELECT ADDTIME(?,?)as started_time";
/*==================inserting the classroom details into classroom table=========*/
module.exports.classroominsert =
  "INSERT INTO Classroom (classroom_id,trainer_id,address_en,address_ar,number_of_seats,number_of_available_seats,available_date,start_time,end_time,course_id)Values ?";
/*============selecting classroom id for the particular available date and the trainer id=========*/
module.exports.classroomidselect =
  "SELECT classroom_id FROM Classroom where available_date =? and trainer_id=? ";
/*========selecting start and end time and number of available seats from class room table for the particular class room id======*/
module.exports.classroomdataselect =
  "SELECT start_time,end_time,number_of_available_seats FROM Classroom where classroom_id =?";
/*===========changing the time format as the am and pm format and displayed as start_time=====*/
module.exports.starttimeformat =
  "SELECT TIME_FORMAT(?, '%h:%i %p') as start_time";
/*===========changing the time format as the am and pm format and displayed as end_time=====*/
module.exports.endtimeformat =
  "SELECT TIME_FORMAT(?, '%h:%i %p') as end_time";
/*================fetching all the data from class room for the particular classroom_id=====*/
module.exports.alldatafromclassroom =
  "SELECT * FROM Classroom where classroom_id=?";
/*=======selecting course id for the paricular coure name(english)=====*/
module.exports.courseidselect =
  "SELECT course_id FROM Course where name_ar =?";
/*=============finding the time difference and displyed as starting_time=====*/
module.exports.timedifference =
  "SELECT TIMEDIFF( ? ,?) as starting_time";
/*=================classroom details for number of available seats not equla to 0 and given coure id by the available date as asc=======*/
module.exports.classroomdataforbulkbooking =
  "select * from Classroom where number_of_available_seats <> 0 and course_id=? order by available_date asc"
/*============inserting the data into schedule for the partial booking====*/
module.exports.scheduleinsertbulkbooking =
  "INSERT INTO Schedule(classroom_id,National_Id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?";
/*==============update the employees for those are scheduled for training=======*/
module.exports.updateemployeetablebulkbooking =
  "UPDATE Employee_Profile SET assigned_for_training =? where National_Id=?";
/*==============selecting company profile from company profile table=======*/
module.exports.companyprofileselect =
  "SELECT Company_Trade_License_No FROM Company_Profile where Company_Email =?";
/*===========inserting the data intp company profile table=======*/
module.exports.companyprofileinsert =
  "INSERT INTO Company_Profile (Company_Trade_License_No,Mandatory_Training_Percentage,Category,Company_Email,Number_of_employees) VALUES ?";
/*=========selecting training amount for the given course=====*/
module.exports.trainingamount =
  "SELECT training_amount FROM Course where course_id=?";
/*=========course id for the given course name in englsh=========*/
module.exports.courseidforenglish =
  "SELECT * FROM Course where name_en=?";
/*=========course id for the given course name in arabic==========*/
module.exports.courseidforarabic =
  "SELECT * FROM Course where name_ar=?";
/*==================selecting course name in arabic for the particular course id=======*/
module.exports.arabiccoursename =
  "SELECT name_ar FROM Course where course_id=?";
/*==================selecting course name in english for the particular course id=======*/
module.exports.englishcoursename =
  "SELECT name_en FROM Course where course_id=?";
/*============selecting all the details for the employees for the particular company and category=======*/
module.exports.selectingemployeeprofile =
  "SELECT * FROM Employee_Profile where Company_Trade_Lincense_No =? and Category =?";
/*==============count the number of employees who are all not passed and assigned for training is NO======*/
module.exports.numbervalidation =
  "SELECT count(National_Id) as count from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ";
/*=====================selecting the not booked employees=======*/
module.exports.notbooked =
  "SELECT * from Employee_Profile where Category=? and assigned_for_training <> ? ";
/*===================updating the employess as assigned for training as booked for the particular company and the given emirated id=======*/
module.exports.employeeupdate =
  "update Employee_Profile set assigned_for_training =? where Company_Trade_Lincense_No = ? and National_Id =?";
/*===============selecting untrained employees =========*/
module.exports.untrainedschedule =
  "SELECT * from Employee_Profile where  National_Id not in(select National_Id from Results where result_en=?) and assigned_for_training =?  and Company_Trade_Lincense_No=? and Category=?  ";
/*=================selecting employee names those are scheudled for training=========*/
module.exports.employeenameschedule =
  "SELECT Name_en from Employee_Profile where National_Id =?";
/*====================selecting employee names as arabic those are scheduled for training======*/
module.exports.employeenameschedulearabic =
  "SELECT Name_ar from Employee_Profile where National_Id =?";
/*=====================inserting into schedule table for the partial booking=========*/
module.exports.scheduleinsertpartialbooking =
  "INSERT INTO Schedule(classroom_id,National_Id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?";
/*================selecting the schedule data for the particular company========*/
module.exports.schedulesummary =
  "SELECT * from Schedule where Company_Trade_Lincense_No=? and status =? ";
/*======================inserting the data into session table=========*/
module.exports.sessioninsert =
  "INSERT INTO Session (user_ID,token,session_created_at) VALUES ? ";
/*======================delete the entry from session for the particular user id======*/
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
/*=========selecting the distinct available date for the number of available seats greater then the selected seats and particular trainerid and course id=======*/
module.exports.availabledate =
  "SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";

  module.exports.getcoursename =
  "SELECT course_name_en FROM Results where National_Id =?"  

module.exports.getinstallers = "SELECT email_id FROM citizens where user_type=?";
module.exports.imagepdf = "UPDATE Schedules SET filepath =? WHERE id =?";
module.exports.pdfviewer = "SELECT path,path1,path2,path3 FROM Buildings where email_id= ?";
module.exports.scheduleinfo = "INSERT INTO Schedules(schedule_time,requestdate,suplier_id,building_id,status) VALUES ? ";
module.exports.servicehistory = "SELECT * FROM Schedules INNER JOIN Buildings ON Schedules.building_id=Buildings.id AND Buildings.email_id=?";
module.exports.installationdetails = "UPDATE Schedules SET FACP = ?,CSI = ?,BRAND = ?,status = ? WHERE id = ?";
module.exports.otpverify = "SELECT otp FROM citizens where email_id = ?";
module.exports.updateotp =   "UPDATE citizens SET verify_email = ? WHERE otp = ?";
module.exports.deleteBuilding = "Delete from Buildings where id = ?";




  
 

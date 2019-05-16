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
  "SELECT * FROM Employee_Profile where national_id=?";
//   "SELECT distinct order_id, id, uid, REPLACE(name_en,'||',' ') AS name_en,REPLACE(name_ar,'||',' ') AS name_ar, national_id,company_trade_license_no,hr_email, category, date_scheduled, date_preferred,payment_type, result,amount,trnx,order_status,certificate_status,DATE_FORMAT(date_created, '%Y-%m-%d') as date_created,date_modified FROM SHARJAH.Employee_Profile where hr_email=? AND order_id is not null AND (order_id !='NOInterest' AND order_id !='NULL')";
module.exports.find_employee =
  "SELECT DISTINCT e.company_trade_license_no, e.hr_email, e.order_id, e.payment_type, e.amount,e.trnx,e.order_status,DATE_FORMAT(e.date_created, '%Y-%m-%d') AS date_created ,e.certificate_status, c.Company_name FROM SHARJAH.Employee_Profile e, SHARJAH.Company_Profile c where (lower(trim(e.order_id)) !='nointerest')AND (lower(trim(e.order_id))!='null') AND e.hr_email=c.Company_Email AND e.hr_email=?";
("SELECT * FROM citizens where firstname_en=? AND email_id= ?");
module.exports.gethrdetails = "SELECT * FROM citizens where email_id = ?";

("SELECT * FROM citizens where firstname_en=? AND email_id= ?");

module.exports.gethrdetails = "SELECT * FROM citizens where email_id = ?";
module.exports.feedback =
  "INSERT INTO Feedback(Company_Email,comments_en,comments_ar,created_at) VALUES ? ";
// "select distinct order_id, company_trade_license_no,hr_email,payment_type,amount,trnx,order_status,certificate_status FROM SHARJAH.Employee_Profile where hr_email = ? AND order_id is not null AND(order_id != 'NOInterest' AND order_id != 'NULL'); ";
// "SELECT distinct id, uid, name_en, name_ar, national_id, category, date_scheduled, date_preferred, result FROM Employee_Profile where order_id is not null AND 'NOIntrest' where hr_email =?";
// "SELECT distinct order_id, id, uid, name_en, name_ar, national_id,company_trade_licence_no,hr_email, category, date_scheduled, date_preferred,date_prefered,payment_type,result,amount,trnx,order_status result FROM SHARJAH.Employee_Profile where hr_email=? AND order_id is not null AND (order_id !='NoInterest'AND order_id !='NULL')";
// "SELECT * FROM Employee_Profile where hr_email =?";
/*===============inserting employee  details into employee_profile table=========*/
// module.exports.insertemployee =
//   "INSERT INTO Employee_Profile (Employee_ID,Name_en,Name_ar,Position,National_Id,Company_Trade_Lincense_No,assigned_for_training,Category) VALUES ?";
module.exports.insertemployee =
  "INSERT INTO Employee_Profile (uid,national_id,category,date_scheduled,name_en,name_ar,company_trade_license_no,hr_email,date_created) VALUES ?";
("delete from Employee_Profile where National_Id = ?");
module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
//======================Trainer Attendance start================================
module.exports.verify_email =
  "SELECT * FROM Trainer where trainer_email_id =? ";
module.exports.getschedule =
  "SELECT distinct Scheduled_date,start_time,end_time,course_id FROM Schedule where Trainer_id =? AND Scheduled_date >= now()+1 ";
module.exports.getcoursear = "SELECT name_ar FROM Course where course_id =? ";
module.exports.getcourseen = "SELECT name_en FROM Course where course_id =? ";
module.exports.getschedulerdateselect =
  "SELECT * FROM Schedule where trainer_id =?  AND scheduled_date=? AND start_time=? AND end_time=?";
module.exports.getclassroom = "SELECT * FROM Classroom where classnum =?";
module.exports.insertattendance =
  "INSERT INTO Attendance (employee_id, attendance_status, National_id, Name_en, trainer_id, Attended_date, start_time, end_time, classroom, course_name) VALUES ? ";
module.exports.insertcontactfeedback =
  "INSERT INTO tbl_contactus (tbl_fullname,tbl_emailid,tbl_mobilenumber,tbl_subject,tbl_comments) VALUES ?";
module.exports.insertsalamaorder =
  "INSERT INTO Company_Profile (Company_Trade_License_No,Company_Email,Company_name)Values ?";
//======================Trainer Attendance End================================
/*========inserting course details into course table=========*/
module.exports.courseinsert =
  "INSERT INTO Course (name_ar,name_en,exam_amount,training_amount,duration) VALUES ?";
/*============selecting course name=======*/
module.exports.courseselect = "SELECT name_en FROM Course where name_en=?";
/*=================selecting all data from course ======*/
module.exports.coursenames = "SELECT * FROM Course ";
/*==================selecting all the data from session table for the particular token======*/
module.exports.session = "SELECT * FROM Session where user_ID =?";
/*=============inserting appeal data in to appeal table=========*/
module.exports.Appeal =
  "INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date,Compliant_NO) VALUES ?";

module.exports.appealpdf =
  "UPDATE Appeal SET appeal_file_path =? WHERE email_id =?";
module.exports.appealpdfinsert =
  "insert into Appeal (appeal_file_path,email_id) VALUES ?";
module.exports.appealpdfcheck = "select email_id from Appeal where email_id=?";
/*=============selecting trainer id for the particular trainer name(english)=========*/
module.exports.trainerid = "SELECT id FROM Trainer where Name_en = ?";
/*=====================selecting trainer id for the particular trainer name(Arabic)======*/
module.exports.trainerid_ar = "SELECT id FROM Trainer where Name_ar = ?";
/*=======finding the row count from the Appeal table for compliant no=========*/
module.exports.appealidcount = "SELECT count(id) as count FROM Appeal";
module.exports.delete_user_name = "SELECT * FROM citizens where email_id =?";
module.exports.delete_user_entry =
  "DELETE  FROM citizens where email_id =? and verify_email ='N'";

module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
module.exports.getlogindetails =
  // "SELECT * FROM citizens where email_id =?";

  "SELECT * FROM citizens where email_id =?  AND verify_email='Y'";
module.exports.getinstalleremployeelist =
  "SELECT * FROM citizens where user_type=? order by firstname_en";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
module.exports.updatestatuslist =
  "UPDATE citizens SET status = ? WHERE emirates_id = ?";
/*================fetching the availabledate for the number of available seats greater than the selected seats and particular trainer
course id========*/
module.exports.availabledate =
  "SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";
/*==========Add the two times and displayed as started_time========*/
module.exports.addtime = "SELECT ADDTIME(?,?)as started_time";
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
module.exports.endtimeformat = "SELECT TIME_FORMAT(?, '%h:%i %p') as end_time";
/*================fetching all the data from class room for the particular classroom_id=====*/
module.exports.alldatafromclassroom =
  "SELECT * FROM Classroom where classroom_id=?";
/*=======selecting course id for the paricular coure name(english)=====*/
module.exports.courseidselect = "SELECT course_id FROM Course where name_ar =?";
/*=============finding the time difference and displyed as starting_time=====*/
module.exports.timedifference = "SELECT TIMEDIFF( ? ,?) as starting_time";
/*=================classroom details for number of available seats not equla to 0 and given coure id by the available date as asc=======*/
module.exports.classroomdataforbulkbooking =
  "select * from Classroom where number_of_available_seats <> 0 and course_id=? order by available_date asc";
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
module.exports.courseidforenglish = "SELECT * FROM Course where name_en=?";
/*=========course id for the given course name in arabic==========*/
module.exports.courseidforarabic = "SELECT * FROM Course where name_ar=?";
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
//==============================================================//
module.exports.payupdate =
  "update Employee_Profile set payment_type=?, trnx=?,amount =?, order_status=?, certificate_status=? where order_id=?";
module.exports.payment_aman =
  "UPDATE Buildings SET paymenttype = ?,trnx = ?,Amount = ?, status = ? WHERE orderid = ? ";
module.exports.payment_aman_install =
  "UPDATE Buildings SET installeddate = ? WHERE email_id = ? AND Buildingname=?";
module.exports.pushnotifycount =
  "select push_notify_count,preschedule,id,Buildingname from Buildings WHERE email_id = ? AND push_notify_count!=0";
module.exports.pushnotifycountclear =
  "update Buildings set push_notify_count='0' WHERE email_id = ?";

module.exports.payment_aman_pref =
  "UPDATE Buildings SET preschedule = ?, push_notify_count = ? WHERE email_id = ? AND Buildingname=?";
// ===========================salama Payment======================//
module.exports.payment_aman_status =
  "UPDATE Buildings SET status = ? WHERE orderid = ?";
module.exports.Payment =
  "UPDATE Employee_Profile SET payment_type = ?,Amount = ?, trnx = ?,order_status = ?,certificate_status=? WHERE order_id = ? ";
module.exports.payment_check =
  "SELECT payment_type,amount,trnx,order_status FROM Employee_Profile where order_id=?";

module.exports.not_interested_aman =
  "UPDATE Buildings SET orderid=? where orderid IS NULL AND email_id=?";
module.exports.not_interested =
  "UPDATE Employee_Profile SET order_id=? where order_id IS NULL";
module.exports.update_order_id =
  "UPDATE Employee_Profile SET order_id=? where national_id =?";
module.exports.order_id_select =
  "SELECT max(convert(substring(order_id FROM 2),UNSIGNED INTEGER)) as num FROM Employee_Profile where order_id !='NULL' and order_id is not null and order_id !='NoInterest'";
module.exports.order_id_select_aman =
  // "SELECT max(convert(substring(orderid FROM 2),UNSIGNED INTEGER)) as num FROM Buildings  where orderid !='NULL' and orderid is not null and orderid !='NoInterest' union SELECT max(convert(substring(orderid FROM 2),UNSIGNED INTEGER)) as num FROM Schedules  where orderid !='NULL' and orderid is not null and orderid !='NoInterest'";
  "SELECT max(convert(substring(orderid FROM 2),UNSIGNED INTEGER)) as num FROM Buildings where orderid !='NULL' and orderid is not null and orderid !='NoInterest'";
module.exports.update_order_id_aman =
  "UPDATE Buildings SET orderid=? where email_id =? AND orderid IS NULL";
module.exports.insertbulkbuilding =
  "INSERT INTO Buildings(Buildingname,preschedule,address,alternumber,email_id,datecreated) VALUES ?";
//====================================aman and salma=====================================//
module.exports.employee_grid_view =
  "SELECT DISTINCT e.company_trade_license_no, e.hr_email, e.order_id, e.payment_type, e.amount,e.trnx,e.order_status,DATE_FORMAT(e.date_created, '%Y-%m-%d') AS date_created ,e.certificate_status, c.Company_name FROM SHARJAH.Employee_Profile e, SHARJAH.Company_Profile c where (lower(trim(e.order_id)) !='nointerest') AND (lower(trim(e.order_id))!='null') AND e.hr_email=c.Company_Email";
module.exports.employee_grid_view2 =
  "update Employee_Profile set certificate_status_emp=? where national_id = ?";
module.exports.employee_grid_view1 =
  "SELECT distinct order_id, id, uid, REPLACE(name_en,'||',' ') AS name_en,REPLACE(name_ar,'||',' ') AS name_ar, national_id,company_trade_license_no,hr_email, category, DATE_FORMAT(date_scheduled, '%Y-%m-%d %H:%M') AS date_scheduled, DATE_FORMAT(date_preferred, '%Y-%m-%d %H:%M') AS date_preferred,payment_type, result,amount,trnx,order_status,certificate_status, certificate_status_emp, DATE_FORMAT(date_created, '%Y-%m-%d') as date_created FROM SHARJAH.Employee_Profile WHERE order_id is not null AND (order_id !='NOInterest' AND order_id !='NULL') AND order_id =?";
//====================================aman and salma=====================================//
module.exports.sessiondelete = "Delete from Session where user_ID =?";
module.exports.addbuilding =
  "INSERT INTO Buildings(email_id ,type,address,alternumber,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
module.exports.resgister 
  "INSERT INTO citizens (firstname_en, firstname_ar,lastname_en,lastname_ar,company_en,company_ar,nationality_en,nationality_ar,alter_number,address_en,address_ar,emirates_id,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,newsletter,user_type,reg_date,otp,countvalue) VALUES ?";
/*======================update the entry from session for the particular user id======*/
module.exports.registeradmin =
  "INSERT INTO citizens (firstname_en,lastname_en,alter_number,emirates_id,mobile_number,email_id,password,verify_email,user_type,reg_date,services) VALUES ?";

module.exports.sessionupdate =
  "update Session set token=?,session_created_at=? where user_ID = ?";

// /* Fetching the list of trained employees from "Results" table */
module.exports.trained_employees =
  "select * from Employee_Profile where Company_Trade_Lincense_No=? and National_Id in (select National_Id from Results where result_en=?) ";
/* Fetching the list of untrained employees from "Results" table */
module.exports.untrained_employees =
  "select * from Employee_Profile where Company_Trade_Lincense_No=? and Employee_ID in (select National_Id from Results where result_ar=?) ";
module.exports.getdatedetails =
  "SELECT DISTINCT Scheduled_date,start_time,end_time from SHARJAH.Schedule where Trainer_id=? ";
module.exports.updatestatus = "UPDATE Schedules SET status = ? WHERE id = ?";
module.exports.findemployeeAttendance =
  "SELECT * FROM Attendance where trainer_id =? AND attendance_status='Present'";
/*=========selecting the distinct available date for the number of available seats greater then the selected seats and particular trainerid and course id=======*/
module.exports.availabledate =
  "SELECT distinct available_date FROM Classroom where number_of_available_seats >=?and trainer_id=? and course_id =?";
module.exports.getcoursename =
  "SELECT course_name_en FROM Results where National_Id =?";
module.exports.getinstallers =
  "SELECT email_id,countvalue FROM citizens WHERE countvalue = (SELECT MIN(countvalue) FROM citizens where user_type='installer')";
module.exports.imagepdf = "UPDATE Schedules SET filepath =? WHERE id =?";
module.exports.pdfviewer =
  "SELECT path,path1,path2,path3 FROM Buildings where email_id= ?";
module.exports.scheduleinfo =
  "INSERT INTO Schedules(schedule_time,requestdate,suplier_id,building_id,status,orderid) VALUES ? ";
module.exports.scheduleinfo_temp =
  "update Buildings set preschedule=?,orderid=?,status=? where id=?";
module.exports.servicehistory = "SELECT * from Buildings where email_id=?";
module.exports.installationdetails =
  "UPDATE Schedules SET FACP = ?,CSI = ?,BRAND = ?,status = ?  WHERE email_id= ?";
module.exports.otpverify = "SELECT otp FROM citizens where email_id = ?";
module.exports.updateotp = "UPDATE citizens SET verify_email = ? WHERE otp = ?";
module.exports.checktoken = "SELECT * FROM Session where token =?";
module.exports.updateotp = "UPDATE citizens SET verify_email = ? WHERE otp = ?";
module.exports.deleteBuilding = "Delete from Buildings where id = ?";
module.exports.getownerdetails =
  "select * from citizens where firstname_en =? AND email_id=?";
module.exports.certificate_issue =
  " UPDATE Employee_Profile SET certificate_issue = ? WHERE national_id = ?";
module.exports.deletetoken = "Delete from Session where token=?";
module.exports.employee_grid_view2 =
  "SELECT certificate_status_emp from Employee_Profile where national_id=?";
module.exports.employee_grid_view3 =
  "UPDATE Employee_Profile SET certificate_status_emp =?,result =? WHERE national_id=?";
module.exports.allbuildings =
  "SELECT  distinct c.firstname_en, b.paymenttype, b.Amount,b.email_id, b.status, b.trnx, b.datecreated, b.orderid FROM Buildings b inner join citizens c ON b.email_id=c.email_id where (lower(trim(orderid)) !='nointerest') AND (lower(trim(orderid))!='null')";
module.exports.getbuildings =
  "SELECT DISTINCT orderid,datecreated,paymenttype,trnx,Amount,status FROM Buildings where (lower(trim(orderid)) !='nointerest') AND (lower(trim(orderid))!='null') AND email_id= ?";
module.exports.getbuildings_web =
  "SELECT Buildingname, address, DATE_FORMAT(preschedule, '%Y-%m-%d %H:%M') AS preschedule,  REPLACE(alternumber,'||',', ') AS alternumber, installeddate from Buildings where orderid=?";
module.exports.pay_verify = "SELECT status from Buildings where orderid =?";
module.exports.pay_verify_status =
  "SELECT order_status from Employee_Profile where order_id =?";
module.exports.getbuildingsbyemail =
  "select * from Buildings where email_id = ?";
module.exports.payment_callcenter_salama =
  "UPDATE Employee_Profile SET order_status=?, certificate_status=? where order_id =?";
("select * from Buildings where email_id = ?");
module.exports.editBuilding =
  "update Buildings set Buildingname=?,address=?,lat=?,lon=?,cdccn=?,AMC=?,NSP=?,SPCN=?,alternumber=? where id =?";
module.exports.getinstallersDetailsForDashBoard =
  "select ROUND(sum(active)) as active_installers, ROUND(sum(installations)) as total_installers from vw_installer_trend  where month = ? and year = ?";
module.exports.getinstallerDetailsMonthWise =
  "select ROUND(sum(`active`)) as active_installers, ROUND(sum(installations)) as total_installers,month,year from vw_installer_trend group by month,year";
module.exports.getavgbuildings =
  "SELECT round(sum(number_of_buildings)) as number_of_buildings,round(sum(number_of_building_complaint)) as number_of_building_complaint,round(sum(number_of_building_progress)) as number_of_building_progress from Buildings_view;";
module.exports.getbuildingsDetailsForDashBoard =
  "select ROUND(sum(number_of_buildings)) as number_of_buildings, ROUND(sum(number_of_building_complaint)) as number_of_building_complaint, ROUND(sum(number_of_building_progress)) as number_of_building_progress from Buildings_view  where month = ? and year = ?";
module.exports.getavgorder =
  "SELECT round(sum(order_recieved)) as order_recieved,round(sum(order_closed)) as order_closed,round(sum(order_pending_closure)) as order_pending_closure,ROUND(sum(call_center)) as call_center, ROUND(sum(self_booking)) as self_booking,ROUND(sum(bulk)) as bulk,ROUND(sum(single_booking)) as single_booking  from SHARJAH.order_view";
module.exports.getOrderDetailsForDashBoard =
  "select ROUND(sum(order_recieved)) as order_recieved, ROUND(sum(order_closed)) as order_closed,ROUND(sum(order_pending_closure)) as order_pending_closure ,ROUND(sum(call_center)) as call_center, ROUND(sum(self_booking)) as self_booking,ROUND(sum(bulk)) as bulk,ROUND(sum(single_booking)) as single_booking from order_view where month = ? and year = ?";
module.exports.getavgadmin =
  "select Format(sum(Revenue),'##,##0') as Revenue ,sum(Revenue) as Revenue_amount ,sum(order_to_close) as order_to_close,sum(project_demand) as project_demand,month, year from SHARJAH.vw_admin group by month,year;";
module.exports.getadminDetailsseperateForDashBoard =
  "select Format(sum(Revenue),'##,##0') as Revenue ,sum(Revenue) as Revenue_amount,ROUND(sum(order_to_close)) as order_to_close,ROUND(sum(project_demand)) as project_demand from vw_admin where month = ? and year = ?";
module.exports.getavgstatistics =
  "SELECT * FROM SHARJAH.tbl_application_statistics;";
module.exports.getTopPerfomerOfTheMonth =
  "select installer,sum(number_of_installations) from vw_top_performents where month = ? and year = ? group by installer,number_of_installations order by number_of_installations desc limit 3";
module.exports.updatecountvalue =
  "update citizens set countvalue=? where email_id=?";
module.exports.payment_callcenter_salama =
  "UPDATE Employee_Profile SET order_status=?, certificate_status=? where order_id =?";
("select * from Buildings where email_id = ?");
// module.exports.editBuilding =
//   "update Buildings set Buildingname=?,address=?,lat=?,lon=?,cdccn=?,AMC=?,NSP=?,SPCN=? where id =?";
module.exports.updateprofile =
  "update citizens set firstname_en=?,firstname_ar=?,lastname_en=?,lastname_ar=?,alter_number=?,emirates_id=?,mobile_number=?,email_id=?,nationality_en=?,nationality_ar=?,address_en=?,address_ar=?,company_en=?,company_ar=? where email_id =?";

module.exports.getinstallersDetailsForDashBoard =
  "select active as active_installers, total  as total_installers from vw_installer_details where month=? and year=?";
module.exports.getinstallerDetailsMonthWise =
  "select ROUND(avg(active)) as active_installers, ROUND(avg(total)) as total_installers,month,year from vw_installer_details group by month,year";
module.exports.getavgbuildings =
  "SELECT round(sum(number_of_buildings)) as number_of_buildings,round(sum(number_of_building_complaint)) as number_of_building_complaint,round(sum(number_of_building_progress)) as number_of_building_progress from vw_building_details;";
module.exports.getbuildingsDetailsForDashBoard =
  "select ROUND(sum(number_of_buildings)) as number_of_buildings, ROUND(sum(number_of_building_complaint)) as number_of_building_complaint, ROUND(sum(number_of_building_progress)) as number_of_building_progress from vw_building_details  where month = ? and year = ?";

module.exports.getavgorder =
  "select a.order_received,a.order_closed,b.order_pending_closure  from (SELECT sum(number_of_orders_received) as order_received, sum(number_of_orders_closed) as order_closed from SHARJAH.vw_order_stats) a  join(select number_of_orders_pendingclosure as order_pending_closure from SHARJAH.vw_order_stats where month(str_to_date(concat('2019-',month,'-1'),'%Y-%b-%e')) = month(now())) b";
module.exports.getOrderDetailsForDashBoard =
  " SELECT round(sum(number_of_orders_received)) as order_received,round(sum(number_of_orders_closed)) as order_closed,round(sum(number_of_orders_pendingclosure)) as order_pending_closure from SHARJAH.vw_order_stats where month =? and year=?";
module.exports.getcallcentre =
  "select count(booking_source) as call_centre from vw_order_booking_count  where booking_source='call_centre'";
module.exports.getselfbooking =
  "select count(booking_source) as self_booking from vw_order_booking_count where booking_source='self_booking'";
module.exports.getsinglebooking =
  "select count(booking_type) as single from vw_order_booking_count where booking_type='single'";
module.exports.getbulkbooking =
  "select count(booking_type) as bulk from vw_order_booking_count where booking_type='bulk'";
module.exports.getcallcentrebymonth =
  "select count(booking_source) as call_centre from vw_order_booking_count  where booking_source='call_centre' and month=? and year =?";
module.exports.getselfbookingbymonth =
  "select count(booking_source) as self_booking from vw_order_booking_count where booking_source='self_booking' and month=? and year =?";
module.exports.getsinglebookingbymonth =
  "select count(booking_type) as single from vw_order_booking_count where booking_type='single' and month=? and year =?";
module.exports.getbulkbookingbymonth =
  "select count(booking_type) as bulk from vw_order_booking_count where booking_type='bulk' and month=? and year =?";
module.exports.getavgadmin =
  "select Format(sum(Revenue),'##,##0') as Revenue  from SHARJAH.vw_admin ";
module.exports.getprojected_demand =
  "select round(avg(projected_demand),2) as projected_demand from vw_projected_demand_by_month ";
module.exports.getduration =
  "select round(avg(duration),2) as duration from vw_average_duration_by_month  ";
module.exports.getadminDetailsseperateForDashBoard =
  "select ROUND(avg(Revenue)) as Revenue from vw_admin where month = ? and year = ?";
module.exports.getavgstatistics =
  "SELECT * FROM SHARJAH.tbl_application_statistics;";
module.exports.getRevenue = "SELECT * FROM SHARJAH.vw_admin";

module.exports.getdurationbymonth =
  "select round((duration),2) as duration,month,year from vw_average_duration_by_month order by month,year";
module.exports.getTopPerfomerOfTheMonth =
  "select installer,sum(number_of_installations) from vw_top_performents where month = ? and year = ? group by installer,number_of_installations order by number_of_installations desc limit 3";

module.exports.employeecheck =
  "select order_id from Employee_Profile where national_id=?";

module.exports.scheduleinfo_temp =
  "update Buildings set preschedule=?,orderid=?,status=? where id=?";
module.exports.receipt =
  "UPDATE Buildings SET receipt_path=? where orderid =? ";
module.exports.profile = "select * from citizens where email_id=?";
// ========================Tahseel payment update==========================================

module.exports.payment_req =
  "UPDATE Buildings SET rq_TP_BranchId = ?,rq_TP_InternalDep= ?,rq_TP_Language= ?,rq_TP_Merchant= ?,rq_TP_PayerName= ?,rq_TP_RefNo= ?,rq_TP_ReturnURL= ?,rq_TP_ServiceInfo= ? where  orderid = ?";
module.exports.payment_res =
  "UPDATE Buildings SET res_TP_Amount = ?,res_TP_ExtraFees= ?,res_TP_PaymentDate= ?,res_TP_PayMethod= ?,res_TP_ReceiptNo= ?,res_TP_RefNo= ?,res_TP_ResultCode= ?,res_TP_TaxFees= ? WHERE  orderid = ?";
  module.exports.getemail= "select orderid from Buildings where id =?";
module.exports.get_bc_view= "select * from blockchain where orderid = ?"

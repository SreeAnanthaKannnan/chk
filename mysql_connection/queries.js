module.exports.findemployeeResults =
  "SELECT * FROM Results where National_Id  = ?";
module.exports.insertemployeeResults =
  "INSERT INTO Results (date_attended,employee_id,attendance_id,score,result_en,result_ar,certificate,National_Id) VALUES ? ";
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

  module.exports.getcoursename =
  "SELECT * FROM Results where National_Id =?";
  
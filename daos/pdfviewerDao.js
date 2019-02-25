var con = require('../mysql_connection/dbConfig.js');
var dbFunc = require('../mysql_connection/connection.js');

function pdf1(email){
  return new Promise((resolve, reject)=>{
      console.log(email,"=>email");
      var owner_id=email
     // var id = buildingobject.id;
    //  var email_id=buildingobject.email_id;
   //   var type=buildingobject.type;

   //   var address=buildingobject.address;
   //   var buildingname=buildingobject.buildingname;


      var sql = "SELECT path,path1,path2 FROM Buildings where owner_id= '" + owner_id + "'";
     // var sql= "SELECT *,Residents.mobile_number FROM Buildings INNER JOIN Residents ON Buildings.owner_id=Residents.email_id;"

      //var sql = await("INSERT INTO Buildings(owner_id ,type,address,Buildingname) VALUES ('"+ owner_id + "','" +type + "','" + address + "','" + Buildingname +"')");
      con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      //logger.fatal("DataBase ERR:",err)
      console.log(result,"inserted.......")
     resolve({
          Message: "get pdf done",
           result:result
        })
      })
  })
}

module.exports={
 pdf1:pdf1
}
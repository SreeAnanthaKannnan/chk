const con = require('../mysql_connection/dbConfig');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');

function Image_insert(Image) {

    return new Promise( function (resolve,reject){
        // console.log("hiiiii",params)
       // var image=image;
        sql= "INSERT INTO Image (uploadFile,fileName) VALUES ? ";
       con.query(sql, Image ,function(err,result){
        if(err) { logger.fatal("something",err)
            return reject({ "status": 400, "body": 'Cannot insert the data' })}
            else{
                //  console.log(result,"achieved")
            return resolve({ result});
            }
            
        }); 
    })
}

module.exports={
    Image_insert : Image_insert
}
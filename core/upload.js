var express = require('express');
var multer = require('multer');
var fs = require('fs');
var formidable = require('formidable');
var csvParser = require('csv-parse');
var cm = require('csv-mysql');
const con = require('../mysql_connection/dbConfig');
var dbFunc = require('../mysql_connection/connection.js');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
var xlsx = require('node-xlsx');
var app = express();
const {insertBuildingOwner } = require('./../daos/uploaddao');





// function upload(filepath){    // console.log("body " + req.body);
// return new Promise( function (resolve,reject){

// console.log(filepath)
   

// fs.readFile(filepath, { encoding: 'utf-8' }, function(err, csvData) {

//     if (err) 
//     {
//         console.log(err);
//     }


//     csvParser(csvData, { delimiter: ',' }, function(err, data) {
//         var params=[]; 
//         if (err)
//         {
//             console.log(err);
//         } 
//         else 
//         {  
               
//         console.log(data.length);  
//         for(var i=1;i<data.length;i++){
//             params.push(data[i])

//         } 
//         console.log(params); 
//        // var owner_id=email_id
//             var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
//             // con.query(sql, [params], function(result,err) {
//             //     if(err) { logger.fatal("something",err)
//             //     return reject({ "status": 400, "body": 'Cannot insert the data' })}
//             //     else{
                    
//             //     return resolve({ result});
//             //     }
//             // });   
//             con.query(sql,[params],function(err,result)
//             {
//              if(err) { console.log("something",err)
//                  return reject({ "status": 400, "body": 'Cannot insert the data' })}
//                  else{
//                  return resolve({ result});
     
//                  }
//              }); 

//         }
//     });
// });
// })
// };


// module.exports={
    
//    upload:upload
//  }
// async function upload(filepath, email_id) {
//     return new Promise(function(resolve, reject) {
//         var XLSX = require('xlsx');
//         var workbook = XLSX.readFile(filepath);
//         var sheet_name_list = workbook.SheetNames;
//         sheet_name_list.forEach(function(y) {
//             var worksheet = workbook.Sheets[y];
//             var headers = {};
//             var data = [];
//             for (z in worksheet) {
//                 if (z[0] === '!') continue;
//                 //parse out the column, row, and value
//                 var tt = 0;
//                 for (var i = 0; i < z.length; i++) {
//                     if (!isNaN(z[i])) {
//                         tt = i;
//                         break;
//                     }
//                 };
//                 var col = z.substring(0, tt);
//                 var row = parseInt(z.substring(tt));
//                 var value = worksheet[z].v;

//                 //store header names
//                 if (row == 1 && value) {
//                     headers[col] = value;
//                     continue;
//                 }

//                 if (!data[row]) data[row] = {};
//                 data[row][headers[col]] = value;
//             }
//             //drop those first two rows which are empty
//             data.shift();
//             data.shift();
//             console.log(data, "jhkjhkjhkjh");
//             var params = []
//             var test = params.push(Object.values(data[0]))
//             console.log(test);
//             var sql = "INSERT INTO Buildings(email_id ,type,address,Buildingname,lat,lon,cdccn,AMC,NSP,SPCN) VALUES ?";
//             con.query(sql, [params], async function(err, result) {
//                 console.log(result, "result")

//                 if (err) {
//                     return resolve({
//                         "status": 200,
//                         "message": 'file uploaded successfully'
//                     })
//                 } else {
//                     return resolve({
//                         result
//                     });

//                 }
//             });
//             // }
//         });

//         // });

//     });
// }

// module.exports = {
//     upload: upload
// };
//===============================================================Code End=============================================================================================//
function upload(filepath){    // console.log("body " + req.body);
return new Promise( function (resolve,reject){
const response = {};
fs.readFile(filepath, { encoding: 'utf-8' }, function(err, csvData) {
    if (err){
        console.log(err);
        return reject({ "Status": 400, "Message": 'Cannot Read the File' });
    }
    csvParser(csvData, { delimiter: ',' }, async(err, data) => {
        if (err){
            console.log(err);
        }else{  
        const csvParams = [];
        for(let i=1;i<data.length;i++){
            const  params=[]; 
            let address = '';
            let alternateNumber = '';
            for(let j=0;j<data[i].length;j++){
                if( j == 2 || j == 10  ){
                    address += `${data[i][j]}||`;
                    console.log(address);
                }else if(j==11){
                    address += `${data[i][j]}`;
                    console.log(address);
                }else if(j == 12){
                    alternateNumber += `${data[i][j]}||`;
                }else if(j == 13){
                    alternateNumber += `${data[i][j]}`;
                } else {
                    params.push(data[i][j]);
                }
            }
                params.push(address);
                params.push(alternateNumber);
                csvParams.push(params);
        }
    for(let i=0;i<csvParams.length;i++){
        const response =  await insertBuildingOwner(csvParams[i]);
        console.log('upload js Response===>',response)
        if(response.response.status != 200){
            reject({ "Status": response.response.status, "Message": 'Cannot Insert the  the File'});
        }
    }
    response['status'] = 200;
    return resolve({
        response : response
    });
        
          

        }
    });
});
});
};

module.exports = {
    upload: upload
};
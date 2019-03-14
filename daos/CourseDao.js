
const con = require('../mysql_connection/dbConfig');
const moment = require('moment')
//const mysqlConnection = require('../mysql_connection/config_test')
const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");


function Course_insert(param) {

    return new Promise( async function (resolve,reject){
         console.log("hiiiii",param)
        
      let res1=  await mysqlConnection
      .insert_query(query.courseinsert, param)
      console.log(res1,"dbresult")
      if(res1.data.errno){
          return reject("something went wrong")
      }
      else{
        return resolve({ status: 200, result: res1.data});

      }
    //   .then(function(result) {
    //     return resolve({ status: 200, message: result });
    //   }).catch(async function(err) {
    //       console.log(error,"dberr")
    //     return reject(err)
    //   });


       
    })
  }
  function Course_select(param) {

    return new Promise( async function (resolve,reject){
        
      var res1= await mysqlConnection
        .query_execute(query.courseselect,[param])
      console.log(res1,"dbresult")
      if(res1.data.errno){
          return reject("something went wrong")
      }
      else{
        return resolve({ status: 200, result: res1.data});

      }
      
    })
  }

function Course_display() {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
        //  console.log(param,"date")
                
        var res1= await mysqlConnection
        .query_execute(query.coursenames,[])
      console.log(res1,"dbresult")
            
            if(res1.data.errno){
                return reject("something went wrong")
            }
          
        else{
            console.log(res1.data.length,"name")
            let value =[]
            let myobject = new Object;
            for(i=0;i<res1.data.length;i++){
            //    let b= myobject[result[i].name] ;
            //     // value.push(myobject[result[i].name])
            //     console.log(b,"value===========>")
            //     value.push (b)
            var data = {}
            console.log(res1.data[i].name_en,"kkkkkkkkkkkkkkkkkkkkkk")
            data = {id:i+1 , name :res1.data[i].name_en}
            value.push(data)
            
            }
            console.log(value,"value")
              
            return resolve({ result:value});
            }
            
        }); 
    //})

}
function Course_display_arabic() {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
        //  console.log(param,"date")
                
        var res1= await mysqlConnection
        .query_execute(query.coursenames,[])
      console.log(res1,"dbresult")
            
            if(res1.data.errno){
                return reject("something went wrong")
            }
          
        else{
            console.log(res1.data.length,"name")
            let value =[]
            let myobject = new Object;
            for(i=0;i<res1.data.length;i++){
            //    let b= myobject[result[i].name] ;
            //     // value.push(myobject[result[i].name])
            //     console.log(b,"value===========>")
            //     value.push (b)
            var data = {}
            console.log(res1.data[i].name_ar,"kkkkkkkkkkkkkkkkkkkkkk")
            data = {id:i+1 , name :res1.data[i].name_ar}
            value.push(data)
            
            }
            console.log(value,"value")
              
            return resolve({ result:value});
            }
            
        }); 
}
//===========================================================================================//
function Course_amount(course_id,language) {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
       
         
            var res1= await mysqlConnection.query_execute("SELECT training_amount FROM Course where course_id=?",[course_id])
            
            console.log("res1===>",res1.data)
            return resolve({result:res1.data})
             
    })

}

function Course_id_select(course_name,language) {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
       
         if(language =="en"){
            var res1= await mysqlConnection.query_execute("SELECT * FROM Course where name_en=?",[course_name])
            
            console.log("res1===>",res1.data)
            return resolve({result:res1.data})
        }        
          
       
    
    else{
    //  course_name= course_name.split("").reverse().join("")
   //course_name= course_name.split("").reduce((rev, char)=> char + rev, '')
     console.log(course_name,"kaviiiiiiiiiiiii")
        var res1= await mysqlConnection.query_execute("SELECT * FROM Course where name_ar =?",[course_name])
            
            console.log("res1===>",res1.data)
            return resolve({result:res1.data})
        }    
          
    })

}
//=====================================================================================//
function course_name_schedule(course_id,language) {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
       
         if(language =="ar"){
            var res1= await mysqlConnection.query_execute("SELECT name_ar FROM Course where course_id=?",[course_id])
            
            console.log("res1===>",res1.data)
            return resolve({result:res1.data})
        }        
          
       
    
    else{
        var res1= await mysqlConnection.query_execute("SELECT name_en FROM Course where course_id =?",[course_id])
            
            console.log("res1===>",res1.data)
            return resolve({result:res1.data})
        }    
        
          
      
            
      

    
          
    })

}
module.exports ={
   Course_insert : Course_insert,
    Course_display : Course_display,
    Course_display_arabic : Course_display_arabic,
    Course_id_select : Course_id_select,
    Course_amount : Course_amount,
    course_name_schedule : course_name_schedule,
    Course_select : Course_select
    }

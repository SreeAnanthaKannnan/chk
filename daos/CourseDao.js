
const con = require('../mysql_connection/dbConfig');
const moment = require('moment')
const mysqlConnection = require('../mysql_connection/config_test')


function Course_insert(param) {

    return new Promise( async function (resolve,reject){
         console.log("hiiiii",param)
         param =[param]
        //  param = moment(param).format("YYYY-MM-DD")
        //  console.log(param,"date")
                
         sql= "INSERT INTO Course (name_ar,name_en,exam_amount,training_amount,duration) VALUES ?";
         await con.query(sql,  [param] ,function(err,result){
            if(!result) { 
                //  console.log(result,"achieved")
                console.log("something",err)
                return resolve({ status: 400, err : err })
        }
          
        else{
            console.log(result)
            return resolve({ result:result});
            }
            
        }); 
    })

}
function Course_display() {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
        //  console.log(param,"date")
                
        await  con.query("SELECT name FROM Course ", (err, result) => {
            if(!result) { 
                //  console.log(result,"achieved")
                console.log("something",err)
                return resolve({ status: 400, err : err })
        }
          
        else{
            console.log(result.length,"name")
            let value =[]
            let myobject = new Object;
            for(i=0;i<result.length;i++){
            //    let b= myobject[result[i].name] ;
            //     // value.push(myobject[result[i].name])
            //     console.log(b,"value===========>")
            //     value.push (b)
            var data = {}
            data = {id:i+1 , name :result[i].name}
            value.push(data)
            
            }
            console.log(value,"value")
              
            return resolve({ result:value});
            }
            
        }); 
    })

}
function Course_display_arabic() {

    return new Promise( async function (resolve,reject){
        //  param = moment(param).format("YYYY-MM-DD")
        //  console.log(param,"date")
                
        await  con.query("SELECT name_ar,course_id FROM Course ", (err, result) => {
            if(!result) { 
                //  console.log(result,"achieved")
                console.log("something",err)
                return resolve({ status: 400, err : err })
        }
          
        else{
            console.log(result.length,"name")
            let value =[]
            let myobject = new Object;
            for(i=0;i<result.length;i++){
            //    let b= myobject[result[i].name] ;
            //     // value.push(myobject[result[i].name])
            //     console.log(b,"value===========>")
            //     value.push (b)
            var data = {}
            data = {id:result[i].course_id , name :result[i].name_ar}
            value.push(data)
            
            }
            console.log(value,"value")
              
            return resolve({ result:value});
            }
            
        }); 
    })

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
        var res1= await mysqlConnection.query_execute("SELECT course_id FROM Course where name_ar =?",[course_name])
            
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
    Course_amount : Course_amount
    }

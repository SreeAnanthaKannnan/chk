
// const con = require('../config/DBConfig');
// const mysqlConnection = require('../config/config_test')
const mysqlConnection = require("../mysql_connection/connection");



function Schedule(query_value) {

    return new Promise( async function (resolve,reject){
        let classroom_id =query_value[0];
        var Emirates_ID = query_value[1];
        let start_time = query_value[2];
        let end_time = query_value[3]
        let course_id = query_value[4];
        let trainer_id = query_value[5];
        let Company_Trade_Lincense_No = query_value[6];
        let number_of_seats_selected = query_value[7];
        let scheduling_date = query_value[8];
        let scheduled_date = query_value[9];
        let payment_status = query_value[10];
        let amount = query_value[11];
        let status = query_value[12];
        console.log(Emirates_ID,"testing")
        for(i=0;i<Emirates_ID.length;i++){
        console.log("hiiiii",Emirates_ID[i])
        console.log( Emirates_ID[i],"Emirates_ID")
        query_value =[
            classroom_id,
            Emirates_ID[i],
            start_time,
            end_time,
            course_id,
            trainer_id,
            Company_Trade_Lincense_No,
            number_of_seats_selected,
            scheduling_date,
            scheduled_date,
            payment_status,
            amount,
            status


        ]
        console.log(query_value,"query_value")
        var res1= await mysqlConnection.insert_query("INSERT INTO Schedule(classroom_id,National_Id,start_time,end_time,course_id,trainer_id,Company_Trade_Lincense_No,number_of_seats_selected,scheduling_date,scheduled_date,payment_status,amount,status)VALUES ?",query_value)
        // sql= "INSERT INTO Employee_Profile (Employee_ID,Name_en,Name_ar,Position,National_ID,Safety_Officer,Company_Trade_Lincense_No) VALUES ? ";
            console.log(res1,"result")
        }
       
          if(res1.data.affectedRows ==1){    
          return resolve({result:res1})
          }
          else{
              return resolve({err:"Something Went Wrong"})
          }
         
        
        
    })

}

//========================================================================================================//
function schedule_summary_value(Company_Trade_Lincense_No,language,status){
    return new Promise( async function (resolve,reject){
       
         await mysqlConnection.query_execute("select * from Schedule where Company_Trade_Lincense_No=? and status =? ",[Company_Trade_Lincense_No,status])
         .then(async function(result,err) {
            return resolve({result:result})
          })
        
          .catch(async function(err) {
            console.log(err,"err")
            return resolve({err:err});
        });
    
    })

}
//==================================================================================================//
function Schedule_select(classroom_id,Emirates_id,Company_Trade_Lincense_No){
    return new Promise( async function (resolve,reject){
        let value =[]
        for(i=0;i<Emirates_id.length;i++){
           let  Emirates_ID = Emirates_id[i]
         query_value =[
                          Company_Trade_Lincense_No,
                          Emirates_ID,
                          classroom_id

             
         ]
        let res1= await mysqlConnection.query_execute("select * from Schedule where Company_Trade_Lincense_No=? and National_Id =? and classroom_id=? ",query_value)
        // for(j=0;j<res1.data[i].length;j++){
            console.log(res1,"tesinggggggggggggg") 
            if(res1.data!=[]) {  
        return resolve({result:res1.data})
            }
            else{
                return resolve({result:value})
            }
                  
        // .then(async function(result,err) {
        //     console.log(result,"<=====avanthika")
        //     // return resolve({result:value})
            
        //   })
        
        
        //   .catch(async function(err) {
        //     console.log(err,"err")
        //     return resolve({err:err});
        // });
        //}
    }
    // console.log(value,"value==============")
    // return resolve({result:value})
    
    })

}




module.exports ={
    Schedule : Schedule,
    schedule_summary_value : schedule_summary_value,
    Schedule_select : Schedule_select
}
const con = require('../mysql_connection/dbConfig');






function Appeal_insert(params) {

    return new Promise( async function (resolve,reject){
        // console.log("hiiiii",params)
        params =[params]
        sql= "INSERT INTO Appeal (service_en,service_ar,Description_en,Description_ar,Appeal_date) VALUES ? ";
      await con.query(sql,  [params] ,async function(err,result){
        if(err) { 
            //  console.log(result,"achieved")
            console.log("something",err)
            return resolve({ status: 400, err: err })
    }
      
    else{
        console.log(result)
        return resolve({ status: 200, message: result});
        }
        
    }); 
})
}

module.exports={
    Appeal_insert : Appeal_insert
}
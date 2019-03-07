function validation(params,callback) {
    // return new Promise((resolve,reject)=>{
        console.log(params,"test")
    let Company_Email = params.Company_Email;
    let Password = params.Password;
    console.log(Company_Email)
   
    if(!Company_Email || !Password){
        console.log("hiiii")
        callback("",  {
            status : 400,
            message : "Please fill all the fields"
        })
        
    }
    else{
      
     
    }
       
  
// })
}
module.exports = {
    validation : validation
}

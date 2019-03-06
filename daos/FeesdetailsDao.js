const con = require('../mysql_connection/dbConfig');

async function Amount() {

    return  new Promise( async function (resolve,reject){

       await  con.query("SELECT * FROM Fees_details", (err, result) => {
            if(err) { 
                //  console.log(result,"achieved")
                console.log("something",err)
                return resolve({ status: 400, err: err })
        }
          
        else{
            console.log(result,"result")
            return resolve({result});
            }
            
        }); 
    })
    }
    async function Exam_amount() {

        return  new Promise( async function (resolve,reject){
    
           await  con.query("SELECT * FROM Fees_details", (err, result) => {
                if(err) { 
                    //  console.log(result,"achieved")
                    console.log("something",err)
                    return resolve({ status: 400, err: err })
            }
              
            else{
                console.log(result,"result")
                return resolve({result});
                }
                
            }); 
        })
        }
    module.exports ={
        Amount : Amount,
        Exam_amount : Exam_amount
    }
const  Employee_profileDao = require ('../daos/Employee_profileDao')

exports.photo = (filename_url,Employee_ID) => new Promise(async(resolve, reject) => {

    let photo_url = request.filename_url;
    console.log(photo_url,"photo_url")
    await Employee_profileDao.Photo_upload(filename_url,Employee_ID)
    .then(async function(result) {
        console.log("result", result);
        if(result.result.length !=0){
        return resolve({status:200, message :"Photo is uploaded successfully"});}
    })
        .catch(async function(err) {
            return resolve({status : 400,message :"something went wrong"});
        });
    
    

})
function languageDetect(params){
    return new Promise( function (resolve,reject){
        if(params[0]===""){
            return reject("something went wrong")
        }
        else{
    if((65<=params[0].charCodeAt(0) && params[0].charCodeAt(0)<=90) || (97<=params[0].charCodeAt(0) && params[0].charCodeAt(0)<=122)){
        return resolve ({result:"en"})
    }
    else
    return resolve ({result:"ar"})
}
})
    

}

module.exports ={languageDetect : languageDetect}
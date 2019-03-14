var translate = require('node-google-translate-skidz');
//    googleTranslate =require('google-translate-api');

function translate_ar(params) {
  return new Promise((resolve,reject) => {
    console.log(params,"params")
    if(params ==""){
      return reject("something went wrong")
    }
    else{
    if(params) {
      translate({
        text: params,
        source: 'en',
        target: 'ar'
      }, function(result,err) {
        console.log(err,"translate error")
        return resolve({ result:result.sentences[0].trans });
      });
    } else {
      params1=params;
      return resolve({result:params})
    }
  }
  });    
}

function translate_en(params) {
  return new Promise((resolve,reject) => {
    console.log(params,"params")
    if(params ==""){
      return reject("something went wrong")
    }
    else{
      if(params) {
        translate({
          text: params,
          source: 'ar',
          target: 'en'
        }, function(result,err) { 
                  
          console.log(result,"arabic conversion")
          return resolve({ result:result.sentences[0].trans });
        });
      } else {
        params1=params;
        return resolve({result:params})
      }
    }
  });
}

module.exports={translate_ar:translate_ar,
translate_en:translate_en}
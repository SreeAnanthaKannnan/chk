var pdfviewer = require('../daos/pdfviewerDao.js');
module.exports={
  pdf1:pdf1
}
function pdf1(email) {
  logger.fatal(email,"email");
 return new Promise(async (resolve, reject) => {
     var info=[];
     var result = await pdfviewer.pdf1(email);
     logger.fatal("result",result);
    // logger.fatal("result1",result1);
     info.push(result);
     //info.push(result1.result[0].mobile_number);
     resolve({
        status:200,
        result:info
     })
 })
}
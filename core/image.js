let insertquery = require('../daos/ImageDao');
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');


exports.Image = (Imageobject) => new Promise(async(resolve, reject) => {
 
  //=======================================================Image path stored into Daos============================================================//
  
    let Image= Imageobject.Image;
        let query_value =Image
    logger.fatal(query_value,"query_value")
    let query= await insertquery.Image_insert(query_value)
       logger.fatal(query !=0,"data inserted")
    
      return  resolve({
        status: 200,
        message:"Appeal Done",
        
        
    }) 
          
})
//============================================================Code End=============================================================================//
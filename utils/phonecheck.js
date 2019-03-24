/**
 * @author: Vikram Viswanathan
 * @date: March 03, 2019
 * @description: This function would valide the UAE mobile number format.
 * 
 * @param {*} mobileNumber 
 */
function validateMobileNumber(mobileNumber) {
    //var regexFormat = "/^(?:\+971|00971|971|0)?(?:50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/m";
    //if (mobileNumber.match(/^(?:\+971|00971|0)?(?:50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/m))
    if (mobileNumber.match(/^((\+971|00971|971|0){1}([0-9]{2})(2|3|4|6|7|9|50|51|52|55|56|58){7})$/m))
       return true;
    else
        return false;
}
module.exports={
    validateMobileNumber:validateMobileNumber  
}
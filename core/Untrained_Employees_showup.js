const SessionDao = require('../daos/SessionDao')
const Employee_profileDao = require('../daos/Employee_profileDao')
const session_time = require('../utils/session_time_difference')
const checktoken = require("../utils/checkToken")

// Getting the Company trade license no. from UI //
exports.Untrained_Employees = (data, token, language) => new Promise(async (resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No
    /*==========token validation=================*/
    var verifytoken = await checktoken.checkToken(token)
    if (verifytoken.status == 402) {
        return resolve({
            status: verifytoken.status,
            message: verifytoken.message
        })
    } else if (verifytoken.status == 403) {
        return resolve({
            status: verifytoken.status,
            message: verifytoken.message
        })
    } else {
        /* Fetching the untrained employee's from "Employee_profile" table who are all not passed in the "Results" table*/
        let Untrained_Employees = await Employee_profileDao.Untrained_Employees_list(Company_Trade_Lincense_No, language)

        return resolve({
            status: 200,
            message: Untrained_Employees
        })

    }



})
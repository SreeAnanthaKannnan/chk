const SessionDao = require("../daos/SessionDao");
const Employee_profileDao = require("../daos/Employee_profileDao");
const session_time = require("../utils/session_time_difference");
const Result = require("../daos/ResultsDao");
const checktoken = require("../utils/checkToken");

/* Getting the Company trade license no. from UI */
exports.Trained_Employees = (data, token, language) =>
  new Promise(async (resolve, reject) => {
    let Company_Trade_Lincense_No = data.Company_Trade_Lincense_No;
    let status = "pass";
    /*==========Token validation=================*/
    var verifytoken = await checktoken.checkToken(token);
    if (verifytoken.status == 405) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else if (verifytoken.status == 403) {
      return resolve({
        status: verifytoken.status,
        message: verifytoken.message
      });
    } else {
      /* Fetching the trained employee's National Id from "Employee_profile" table who are all passed in the "Results" table */
      let Trained_Employees = await Employee_profileDao.Trained_Employees_list(
        Company_Trade_Lincense_No,
        language,
        status
      );
      var data_val = [];
      for (i = 0; i < Trained_Employees.result.length; i++) {
        var result = Trained_Employees.result[i].National_Id;
        let national_id = await Result.result_national_id(result, language);
        data_val.push(national_id);
      }
      return resolve({
        status: 200,
        message: Trained_Employees
      });
    }
  });

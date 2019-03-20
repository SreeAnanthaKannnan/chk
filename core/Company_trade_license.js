const SessionDao = require('../daos/SessionDao')
const session_time = require('../utils/session_time_difference')
const CompanyDao = require('../daos/Company_ProfileDao')

exports.company_trading_license = (data, token) => new Promise(async (resolve, reject) => {
    let Company_Email = data.company_email;
    console.log("core_companytrade_licence", Company_Email)
    let token = data.token;
    /*============================token validation==========================*/
    console.log(token, "token")
    let query = await SessionDao.Session_select(token)
    console.log(query, "testinggggggggg")
    if (query.length == 0) {
        resolve({
            status: 403,
            message: "Invalid token"
        })
    } else {
        /*====================Session validation===========================*/
        console.log(query[0].session_created_at)
        let Name_ar, Name_en, query_value
        let now = new Date();

        let Db_time = query[0].session_created_at;
        let time_difference_minutes = await session_time.Session_time_difference(Db_time, now)
        console.log(time_difference_minutes, "function")

        console.log(time_difference_minutes >= "00:30:00", "session time difference validation")


        if (time_difference_minutes >= "00:30:00") {
            return resolve({
                status: 440,
                message: "session expired"
            })
        } else {

            /*=======================checking whether company already exists or not=================*/
            await CompanyDao.company_trading_license(Company_Email)
                .then(async function (result) {
                    console.log("result===>", result);
                    if (result.result.data.length != 0) {
                        return resolve({
                            status: 200,
                            message: result
                        });
                    } else {
                        return resolve({
                            status: 402,
                            message: "Please add your company profile in the profile page"
                        })
                    }
                })
                /*=========Error Capturing===========*/
                .catch(async function (err) {
                    return resolve({
                        status: 400,
                        message: "something went wrong"
                    });
                });

        }
    }

})
/************************************Code Ends**********************************************/
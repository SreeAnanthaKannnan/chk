const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');


getInstallerDetailsForDashBoard = async (data) => {
    // const params = [date.startDate, date.toDate];

    const response = [];
    const res = await mysqlConnection.query_execute(
        query.getinstallersDetailsForDashBoard,
        [data.month, data.year]
    );
    console.log('result', res);

    if (res.status != 200) {
        response.push({
            status: res.status,
            message: 'Cant able to fetch the data'
        })
    } else {
        response.push({
            status: res.status,
            data: res.data,
        })
    }
    return response;
}

getMonthlyDetailsOfInsatallers = async () => {
    const response = [];
    const res = await mysqlConnection.query_execute(
        query.getinstallerDetailsMonthWise
    );
    console.log('result', res);
    if (res.status != 200) {
        response.push({
            status: res.status,
            message: 'Cant able to fetch the data'
        })
    } else {
        response.push({
            status: res.status,
            data: res.data,
        })
    }
    return response;

}


module.exports.getInstaller = getInstallerDetailsForDashBoard;
module.exports.getMothlyInstallerDetails = getMonthlyDetailsOfInsatallers;

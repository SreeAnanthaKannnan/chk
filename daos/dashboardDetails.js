const mysqlConnection = require("../config/Connection");
const query = require("../mysql_connection/queries");
var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');


getInstallerDetailsForDashBoard = async (data) => {
    const response = {};
    const installerReport = await mysqlConnection.query_execute(
        query.getinstallersDetailsForDashBoard,
        [data.month, data.year]
    );
    if (installerReport.status != 200) {
        response['status'] = installerReport.status;
        response['message'] = 'Cant able to fetch the data';
        return response;
    }
    const topPerformer = await mysqlConnection.query_execute(
        query.getTopPerfomerOfTheMonth,
        [data.month, data.year]

    );
    if (topPerformer.status != 200) {
        response['status'] = topPerformer.status;
        response['message'] = 'Cant able to fetch the data';
        return response;
    }
    response['status'] = 200;
    response['installers_details'] = {};
    response['installers_details']['active_installers'] = installerReport.data[0].active_installers;
    response['installers_details']['total_installers'] = installerReport.data[0].total_installers;
    response['topPerfomer'] = topPerformer.data;
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

const mysqlConnection = require("../mysql_connection/connection");

const query = require("../mysql_connection/queries");
const session = require("../daos/SessionDao");
const checktoken = require("../utils/checkToken");
function session_delete(token) {
    return new Promise(async function (resolve, reject) {
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
            var session_delete = await session.session_delete(token);
            console.log("session", session_delete);
            if (session_delete.affectedRows == 1) {
                return resolve({
                    status: 200,
                    message: "Session closed"
                });
            }
        }
    });
}
module.exports = {
    session_delete: session_delete
};
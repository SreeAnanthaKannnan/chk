const SessionDao = require("../daos/SessionDao");

const session_time = require("../utils/session_time_difference");
async function checkToken(token, res) {
  return new Promise(async (resolve, reject) => {
    console.log(token, "token");
    if (token) {
      let query = await SessionDao.check_token(token);
      console.log("query", query);
      if (query.length == 0) {
        console.log(query.length == 0);
        return resolve({
          status: 405,
          message: "Invalid token"
        });
      } else {
        /*===================Session validation======================*/
        console.log(query[0].session_created_at);
        let now = new Date();

        let Db_time = query[0].session_created_at;
        let time_difference_minutes = await session_time.Session_time_difference(
          Db_time,
          now
        );
        console.log(
          time_difference_minutes.Session_time_difference,
          "session time difference"
        );
        if (time_difference_minutes.Session_time_difference >= "00:01") {
          // let deletetoken = await SessionDao.Session_delete(Db_time)
          // console.log("deletetoken", deletetoken)
          return resolve({
            status: 403,
            message: "Token has expired"
          });
        } else {
          return resolve(true);
        }
      }
    }
  });
}
module.exports = {
  checkToken: checkToken
};

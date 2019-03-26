var bcSdk = require('../fabric_SDK/query');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
const checktoken = require("../utils/checkToken")

exports.getHistory = (id, token) => {
    return new Promise(async (resolve, reject) => {
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
                bcSdk.getHistory({
                        userId: id


                    })


                    .then((docs) => {
                        var len = docs.length;
                        logger.fatal(len)

                        logger.fatal("docs....123>>>", docs)

                        return resolve({
                            status: 201,
                            docs: docs,

                        })
                    })
            }
        })

        .catch(err => {

            logger.fatal("error occurred" + err);

            return reject({
                status: 500,
                message: 'Internal Server Error !'
            });
        })

};
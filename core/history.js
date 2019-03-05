var bcSdk = require('../fabric_SDK/query');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
exports.getHistory = (id) => {
    return new Promise((resolve, reject) => {

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
        })

        .catch(err => {

            logger.fatal("error occurred" + err);

            return reject({
                status: 500,
                message: 'Internal Server Error !'
            });
        })

};
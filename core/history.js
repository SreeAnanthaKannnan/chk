var log4js = require('log4js');
const logger = log4js.getLogger('SPSA_project');
var bcSdk = require('../fabcar/javascript/query');
exports.getHistory = (id) => {
    console.log(id, "id");
    return new Promise((resolve, reject) => {
            var fun = "queryHistory";
            //Retrieve data from block chain
            bcSdk.queryrecord(fun, id)
                .then((docs) => {
                    var len = docs.length;
                    logger.fatal("length of data from Blockchain" + len)
                    return resolve({
                        status: 201,
                        docs: docs,

                    })
                })
        })
        .catch(err => {
            logger.fatal("error occurred while fetching data from Block chain" + err);
            return reject({
                status: 500,
                message: 'Internal Server Error !'
            });
        })

};
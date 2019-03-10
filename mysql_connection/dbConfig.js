const mysql = require('mysql');
// module.exports = mysql.createPool({
//    connectionLimit : 100,
//    host : 'db4free.net',
//    user :  'rapidqube',
//    password: 'root1234',
//    database: 'mysaned'
// })
// module.exports = mysql.createPool({
//    connectionLimit : 100,
//    host : '127.0.0.1',
//    user :  'root',
//    password: 'Rpqb$2018',
//    database: 'SHARJAH'
//    })

// module.exports = mysql.createPool({
//     connectionLimit: 100,
//     host: "127.0.0.1",
//     user: "root",
//     password: "Rpqb$2018",
//     database: "SHARJAH"
// });

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : '68.183.86.120',
    user :  'rapiduser',
    password: 'Rpqb$2018',
    database: 'SHARJAH'
})
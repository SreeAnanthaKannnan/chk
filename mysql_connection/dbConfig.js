const mysql = require("mysql");
module.exports = mysql.createPool({
   connectionLimit: 100,
   host: '68.183.86.120',
   user: 'rapiduser',
   password: 'Rpqb$2018',
   database: 'SHARJAH'
})
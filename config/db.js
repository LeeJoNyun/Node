const sql = require('mssql')
// const config = {
//   user: 'statncodb',
//   password: 'rpdladnjs!23',
//   database: 'racket',
//   server: 'ms1901.gabiadb.com',
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   },
//   options: {
//     encrypt: true, // for azure
//     trustServerCertificate: true // change to true for local dev / self-signed certs
//   }
// }


const config = {
    server: 'ms1901.gabiadb.com',
    port: 1433,
    options: { encrypt:false, database: 'racket' , trustServerCertificate: true},
     pool: { max: 5, min: 1, idleTimeoutMillis: 30000, },
    authentication:{
        type:"default",
        options:{
            userName:'statncodb',
            password:'rpdladnjs!23',
        }
    }
};
const pool = new sql.ConnectionPool(config)
                    .connect()
                    .then(pool => {
                        console.log('Connected to MSSQL')
                        return pool
                    })
                    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


module.exports = pool;
const sql = require('mssql');

const sqlConfig = {
    user: 'sa_clarkij',
    password: 'Rmk2022cj!@',
    database: 'Datatrac',
    server: '47.176.4.141',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
 

  module.exports = {sql, sqlConfig}
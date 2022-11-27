const {sql, sqlConfig } = require('../../config/db')



module.exports = async () => {
    try {
     // make sure that any items are correctly URL encoded in the connection string
     await sql.connect(sqlConfig)
     const result = await sql.query`select top 1 * from member`
     console.dir(result)
    } catch (err) {
     // ... error checks
    }
   }


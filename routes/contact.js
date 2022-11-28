const {sql, sqlConfig} = require('../config/db')
const express = require('express')
const router = express.Router();

router.get('/i_list', async (req,res) => {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .query('')
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});

module.exports = router
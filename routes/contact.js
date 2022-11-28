const {sql, sqlConfig} = require('../config/db')
const express = require('express')
const router = express.Router();

const list_ex = [
    {key : "login_name", value : 'SANDY.CHEN'},
    {key : "login_name", value : 'RMIN'},
    {key : "login_name", value : 'SCHEN'},
    {key : "login_name", value : 'SEANPARK'},
    {key : "login_name", value : 'BPARK'},
    {key : "login_name", value : 'SPHAN'},
    {key : "login_name", value : 'CYI'},
    {key : "employ_id", value : `'AA\'`},
    {key : "employ_id", value : '587'},
    {key : "employ_id", value : '589'},
    {key : "employ_id", value : '079'},
    {key : "employ_id", value : '813'},
    {key : "employ_id", value : '170'},
    {key : "employ_id", value : 'C02'},
    {key : "employ_id", value : 'C67'},
    {key : "employ_id", value : '557'},
    {key : "employ_id", value : 'J47'},
    {key : "employ_id", value : 'K53'},
    {key : "employ_id", value : '640'},
]

router.get('/', async (req,res) => {

    try {
        let pool = await sql.connect(sqlConfig)
        let result = await pool.request()
            .query(`select 1`
            )
            
            res.send(result)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});

module.exports = router
const {sql, sqlConfig} = require('../config/db')
const express = require('express');
const { query } = require('mssql');
const router = express.Router();




        
router.post('/', async (req,res)=>{
    var s_user_id = req.body.s_user_id == '' ? "''" : req.body.s_user_id
    var s_r_id = req.body.s_r_id == '' ? "''" : req.body.s_r_id
    var report_permission = req.body.report_permission
    var q1 = `select  *
            from  t_report_header
            where  h_id not in (select  h_id
                                from  t_custom_report_header
                            where  r_id = ${s_r_id} and user_id = ${s_user_id})`
                q1 += ` and ISNULL(permission,0) <= ${report_permission} order by h_name`

    var q2 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select loan_processor_id  from gen) order by full_name`
    var q3 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select submission_id  from gen) order by full_name`
    var q4 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct underwrtr from und) order by full_name`
    var q5 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct processor_id from und) order by full_name`
    var q6 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct funder from fun) order by full_name`
    
    var q7 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct lo_rep from gen) order by full_name`
    var q8 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct loan_officer_id from gen) order by full_name`
    var q9 = `select employ_id,full_name from v_user where (exclude = 'N' and (wholesale_rep = 'Y' or cam = 'Y')) or employ_id='B48' order by full_name`
    var q10 = `select employ_id, full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct drawn_by from doc) order by full_name`
    var q11 = `select employ_id,full_name from v_user_ae where isNull(first_name,'') <> '' and isNull(exclude,'N') = 'N' and employ_id in (select distinct shipper from shp) order by full_name`
    try {
        let pool = await sql.connect(sqlConfig)
        let reportColumnOptions = await pool.request()
        .query(q1)
        let processor = await pool.request()
        .query(q2)
        let submission = await pool.request()
        .query(q3)
        let underwriter =  await pool.request()
        .query(q4)
        let underwriterAsst = await pool.request()
        .query(q5)
        let funder = await pool.request()
        .query(q6)
        let ae = await pool.request()
        .query(q7)
        let loanOffier = await pool.request()
        .query(q8)
        let projectManager = await pool.request()
        .query(q9)
        let drawnBy = await pool.request()
        .query(q10)
        let shipper = await pool.request()
        .query(q11)
        var rtnValue = {
            status : 200,
            reportColumnOptions : reportColumnOptions.recordsets[0],
            processor : processor.recordsets[0],
            underwriter : underwriter.recordsets[0],
            underwriterAsst : underwriterAsst.recordsets[0],
            funder : funder.recordsets[0],
            ae : ae.recordsets[0],
            loanOffier : loanOffier.recordsets[0],
            projectManager : projectManager.recordsets[0],
            drawnBy : drawnBy.recordsets[0],
            shipper : shipper.recordsets[0],
        }
        res.send(rtnValue)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }

})

module.exports = router;

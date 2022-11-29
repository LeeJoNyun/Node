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
    {key : "employ_id", value : `AA\\`},
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
    var q = 'select ';
        q += 'u.employ_id ,u.first_name ,u.last_name ,u.phone_ext ,u.work_phone_pre ,u.work_phone ,u.cell_phone_pre ,u.cell_phone ,u.fax_phone_pre ,u.fax_phone ,u.employ_email ,u.TV_ID, u.tmp_job_position'
        q += `,case when u.branch_id = 'COSTA MESA' then '116'`
        q += `else u.contact_dept end contact_dept`
        q += `,u.branch_id ,u.user_picture`
        q += `,dept.code_name as contact_dept_name`
        q += `, pos.code_name as job_position_name`
        q += `,case when dept.code_name = 'CHIEF OFFICER' then 'a' `
        q += `when dept.code_name = 'COST MESA BRANCH' then 'zzz'`
        q += `when u.branch_id = 'COSTA MESA' then 'zzz'`
        q += `else dept.code_name end as display_order_dept_name ,dept.display_order ,u.user_display `
        q += ` from userinfo u `
        q += ` left join tbCode dept on dept.code_id = 'contact_dept' and`
        q += ` case when u.branch_id = 'COSTA MESA' then '116'`
        q += ` else u.contact_dept end = dept.code`
        q += ` left join tbCode pos on u.job_position = pos.code and pos.code_id = 'job_position'`
        q += ` where isNull(u.first_name,'') <> '' and (isNull(u.exclude,'N') = 'N' or u.exclude = 'I')`
        q += ` and (isnull(u.branch_id,'') <> 'db' or isnull(u.branch_id,'') = '') and u.display is null`
        q += ` and isnull(contact_dept,'') <> ''`
        q += ` and isnull(u.display_internal_contact,1) = 1 `
        for(var i = 0 ; i < list_ex.length ; i++){
            q += ` and `+ list_ex[i]["key"]+` <> '`+list_ex[i]["value"]+`'`
        }
        q += `union all `
        q += `select `
        q += `lo_id as employ_id ,lo_first_name as first_name ,lo_last_name as last_name ,'' as phone_ext `
        q += `,lo.lo_comp_phone_pre as work_phone_pre ,lo.lo_comp_phone as work_phone ,'' as cell_phone_pre ,'' as cell_phone ,lo_fax_pre as fax_phone_pre ,lo_fax as fax_phone ,lo_email as employ_email ,'' as TV_ID, '' as tmp_job_position,'116' as contact_dept ,'COSTA MESA' as branch_id ,'' as user_picture `
        q += `,dept.code_name as contact_dept_name ,lo_type.code_name as job_position_name ,'zzz' as display_order_dept_name ,dept.display_order ,'99' as user_display `
        q += `from t_brokers_lo lo `
        q += `left join tbCode dept on '116' = dept.code and dept.code_id = 'contact_dept' `
        q += `left join t_code lo_type on lo_type.code_id = 'lo_type' and lo_type.code = lo.lo_type `
        q += ` where lo.brokers_id = 'Z011002' and lo_last_name <> 'test' and lo.del_flag<>'Y' `
        // '-------------------------------------------------------
		// ' Hide temporary by AMANDA GRANADOS 
		// '-------------------------------------------------------
        q += ` And  lo_last_name='for_hide_user' `
        q += ` order by`
        // 'query = query & ",isnull(u.sales_manager,'N') desc "
        // 'query = query & ",isnull(u.team_leader,'N') desc "
        // 'query = query & ",pos.display_order "
        q += ` display_order_dept_name , user_display, first_name `

    try {
        let pool = await sql.connect(sqlConfig)
        let result = await pool.request()
            .query(q)
            var rtnValue = {
                status : 200,
                data : result.recordsets[0]
            }
            
        res.send(rtnValue)
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});

module.exports = router
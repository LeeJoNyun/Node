const {sql, sqlConfig} = require('../config/db')
const express = require('express')
const router = express.Router();


router.get('/', async(req,res) => {
    var type = req.params.type;
    var choice = req.params.choice;
    var search = req.params.search;
    var lo_rep = req.params.lo_rep;
    var employ_id = req.params.employ_id;
    var q = `select	A.* 
             from	(
             Select  ROW_NUMBER() over(order by dba ) no,
                    dba,
                    company,
                    case 
                        when cur_status = 1 then 'FULLY APPROVED'
                        when cur_status = 2 then 'ONLY U/W APPROVED'
                        when cur_status = 3 then 'SUSPENDED'
                        when cur_status = 4 then 'INACTIVE'
                        when cur_status = 5 then 'REVIED'
                        when cur_status = 6 then 'DECLINED'
                        when cur_status = 7 then 'PROSPECT'
                        when cur_status = 8 then 'TERMINATED'
                        when cur_status = 9 then 'OPEN'
                        when cur_status = 10 then 'DOC OK/FUND NO '
                        when cur_status = 11 then 'EXPIRED'
                        when cur_status = 12 then 'DOC OK/FUND OK'
                        when cur_status = 13 then 'CLOSED'
                    end status,
                    address,
                    whole_rep,
                    idnum,
                    brokers_id
            from brokers`;
    q += ` where isNull(brokers_id,'') <> '' `
    if (type == 'aeee'){
        q += ` and whole_rep_id ='${employ_id}'  and dba like '%'${search}'%' `
    }elseif( type == '')
    {
        if (choice = 1){
            q += ` and cur_status <> '3' and cur_status <> '6' and dba like '%'${search}'%' `
        }else{
            q += ` and cur_status <> '3' and cur_status <> '6' and whole_rep_id ='${lo_rep}' `
        }
    }
    q += ` `
    switch (choice) {
        case 1:
            q += ` and idnum like '%'${search}'%' `
            break;
        case 2:
            q += ` and company like '%'${search}'%' `
            break;
        case 3:
            q += ` and whole_rep like '%'${search}'%' `
            break;
        case 4:
            q += ` and city like '%'${search}'%' `
            break;
        case 5:
            q += ` and state like '%'${search}'%' `
            break;
        case 6:
            q += ` and cur_status like '%'${search}'%' `
            break;
        case 7:
            q += ` and idnum like '%'${search}'%' `
            break; 
        case 8:
            q += ` and phone like '%'${search}'%' `
        case 9:
            q += ` and fha_no like '%'${search}'%' `
            break; 
        case 10:
            q += ` and brok_record like '%'${search}'%' `
            break; 
        case 11:
            q += ` and site_id like '%'${search}'%' `
            break; 
        case 12:
            q += ` and replace(brok_record_ssn,'-','') like '%'${search}'%' `
            break; 
        case 13:
            q += ` and replace(president_ssn,'-','') like '%'${search}'%' `
            break; 
        default:
            q += ` and dba like '%'${search}'%' `
            break;
    }

    q += ` and isnull(dba, '') <> '' `
    q += ` and cur_status in ('1','2','5','7','9','10','12') `

});

module.exports = router;
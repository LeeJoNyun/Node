var express = require('express');
var router = express.Router();

const pool = require('../../config/db');			// 사전에 생성산 pool 로드

router.post('/', async (req, res) => {
    try{
        const query = await pool;               // Query 실행을 위한 Pool 지정
        const result = await query.request()    // Query 요청
        // .input('KEY', 'ASDF')				// 하단 query에 @로 들어가는 파라미터 값을 사전에 설정
        .query("SELECT TOP 1 * FROM MEMBER");
        res.send(result);
        } catch(err) {
            res.status(500);
            res.send(err.message);
        }
});

module.exports = router;
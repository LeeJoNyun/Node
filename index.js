//필요한 모듈 선언
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//라우팅 모듈 선언
var contact = require('./routes/contact')
var reportForm = require('./routes/reportForm')
var broker = require('./routes/broker')
//express 서버 포트 설정
app.set('port', process.env.PORT || 3000);

//post 사용시 body-parser 설정
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json


//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use('/contact', contact);
app.use('/reportForm', reportForm);
app.use('/broker', broker);



//서버 생성
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

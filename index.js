var express = require('express');
var logger = require('morgan');
var moment = require('moment');
var app = express();

app.use(logger('combined'));
app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/api/whoami', function(request, response) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    response.send({
        'ip': ip,
        'language': request.headers["accept-language"].split(',')[0],
        'software': request.headers['user-agent'].split(') ')[0].split(' (')[1]
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});



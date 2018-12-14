// server
const express = require('express'),
    request = require('request'),
    HttpsProxyAgent = require('https-proxy-agent'),
    app = express();

var Https = require('https');
var agent = new HttpsProxyAgent('http://mutpoit:8085');

app.set('trust proxy');

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/getquote', function(req, result) {
    Https.request({
        // like you'd do it usually...
        host: 'kaamelott.kyane.fr',
        method: 'GET',
        path: '/api/v1/quote/random',

        // ... just add the special agent:
        agent: agent
    }, function (res) {
        res.on('data', function (data) {
            console.log(data.toString());
            result.send(data.toString());
        });
    }).end();
});

app.get('/getquote/author/:name', function(req, result) {
    Https.request({
        // like you'd do it usually...
        host: 'kaamelott.kyane.fr',
        method: 'GET',
        path: '/api/v1/character/'+ req.params.name +'/random',

        // ... just add the special agent:
        agent: agent
    }, function (res) {
        res.on('data', function (data) {
            console.log(data.toString());
            result.send(data.toString());
        });
    }).end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
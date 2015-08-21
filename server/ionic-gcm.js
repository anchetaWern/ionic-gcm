var express = require('express');
var gcm = require('node-gcm');


var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


var server = app.listen(3000, function(){

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

var device_token;

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/register', function(req, res){

    device_token = req.body.device_token;
    console.log('device token received');
    console.log(device_token);
    res.send('ok');
});

app.get('/push', function(req, res){

    var device_tokens = [];
    var message = new gcm.Message();
    var sender = new gcm.Sender('your project server key');

    message.addData('title', 'New Message');
    message.addData('message', 'Hello this is a push notification');
    message.addData('sound', 'notification');

    message.collapseKey = 'testing';
    message.delayWhileIdle = true;
    message.timeToLive = 3;

    console.log('sending to: ' + device_token);

    device_tokens.push(device_token);

    sender.send(message, device_tokens, 4, function(result){
        console.log(result);
        console.log('push sent to: ' + device_token);
    });

    res.send('ok');
});
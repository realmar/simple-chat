
var port = process.env.PORT || 5000;

var path = require('path');
var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/../client/')));
server.listen(port);

var handler = app.listen(app.get('port'), function() {
    var port = handler.address().port;
});


io.on('connection', function(socket){
    var username = generate();
    
    io.emit('status message', username + " joined!");

    socket.on('chat message', function(msg){
        io.emit('chat message', {message: msg, user: username, time: getTimeOfDay()});
    });

    socket.on('disconnect', function(){
        io.emit('status message', username + " left!");
    });
});

//random name generator
var names = require('./animals.json');
var adjectives = require('./adjectives.json');

var generate = function(){
    var first = Math.floor(Math.random() * adjectives.length);
    var second = Math.floor(Math.random() * names.length);
    return adjectives[first] + " " + names[second];
}

var getTimeOfDay = function(){
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min; 
    return hour + ":" + min;
}

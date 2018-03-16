
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
    var username = generateUsername();
    var userColor = generateUserColor();

    io.emit('status message', {message: username + " joined!", usercolor: userColor});

    socket.on('chat message', function(msg){
        io.emit('chat message', {message: msg, user: username, time: getDateTimeString(), usercolor: userColor});
    });

    socket.on('disconnect', function(){
        io.emit('status message', {message: username + " left!", usercolor: userColor});
    });
});

//random name generator
var names = require('./animals.json');
var adjectives = require('./adjectives.json');

var generateUsername = function(){
    var first = Math.floor(Math.random() * adjectives.length);
    var second = Math.floor(Math.random() * names.length);
    return adjectives[first] + " " + names[second];
}

//random user color
var randomColor = require('randomcolor');

var generateUserColor = function(){
    return randomColor({
        luminosity: 'dark',
        hue: 'random'
    });
}

var getDateTimeString = function(){
    return new Date().toUTCString();
}
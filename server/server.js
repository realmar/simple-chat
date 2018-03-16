
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
    console.log('a user connected');

    var username = generate();
    io.emit('new user', username);

    socket.on('chat message', function(msg){
        io.emit('chat message', {message: msg, user: username});
    });

    socket.on('disconnect', function(){
        io.emit('user left', username);
        console.log('a user disconnected');
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

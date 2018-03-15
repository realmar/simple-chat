
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

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        console.log('a user disconnected');
    });
});

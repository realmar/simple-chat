var app = require('http').createServer(handler).listen(3000);
var io = require('socket.io')(app);
var fs = require('fs');

function handler(req, res){
    fs.readFile(__dirname + '/../client/index.html',
    function (err, data) {
        if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        console.log('a user disconnected');
    });
});

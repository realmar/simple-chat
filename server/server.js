
var port = process.env.PORT || 5000;
var app = require('http').createServer(handler).listen(port);
var io = require('socket.io')(app);
var fs = require('fs');

console.log(port);


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

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
console.log("Server Listen port 80");
app.listen(80);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function(socket) {
	// setTimeout(function(){
	// 	socket.emit('server', { detail: 'From Server' }); // 發送資料
	// },5000);
    io.sockets.connected[socket.id].emit('id',socket.id);
    socket.on('client', function(data) {
    	data.id = socket.id;
    	io.emit('server', data);
        console.log(data.msg); // 接收資料
    });
});

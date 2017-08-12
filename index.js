var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express(); // invoke function
var server = app.listen(4000, function(){
  console.log('Listening to requests on port 4000');
});

// static files
app.use(express.static('public'));

//setup socket.io
var io = socket(server);

//each client will have it's own socket io connection with server
io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

  //listen for chat message
  socket.on('chat', function(data){
    //receive data
    //send out to all different clients
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    //emit to everyother single client except the original
    socket.broadcast.emit('typing', data)
  });


});

//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle : handle.value
  });
});

//event listerner to typing
message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});

//listen for events from server
socket.on('chat', function(data){
  //output to DOM
  output.innerHTML += "<p><strong>"+data.handle+"</strong> "+ data.message+"</p>"
  feedback.innerHTML = "";
});

socket.on('typing', function(data){
  feedback.innerHTML = "<p><em>"+data+" is typing message...</em></p>"
});

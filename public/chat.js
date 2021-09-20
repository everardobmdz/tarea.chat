//Make connection
let socket = io.connect('http://localhost:4000');
//Query DOM
var message = document.getElementById("message");
var handle = document.getElementById('handle');
var btn = document.getElementById('send-btn');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var chatWindow = document.getElementById('chat-window');

//Emit events
btn.addEventListener('click',()=>{
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
        chatWindow.innerHTML += '<div class="output sent"><p>' + message.value + '</p></div><br>';
})

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
});

//Listen for Events
socket.on('chat',(data)=>{
    feedback.innerHTML = '';
    chatWindow.innerHTML += '<div class="output"><p><strong>' + data.handle + ': </strong>' + data.message + '</p></div><br>';

})
socket.on('typing',(data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})
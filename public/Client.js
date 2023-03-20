const socket = io();
var name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area')

do {
     name= prompt('Enter your name')
} while (!name);

textarea.addEventListener( 'keyup' , (e) =>{
    if (e.key === 'Enter') {
        SendMessage(e.target.value)
    }
})

function SendMessage(message){
    let msg ={
        user: name,
        message: message.trim()
    }

    // Append
    appendMessage(msg , 'outgoing')
    textarea.value = ''
    scrollToBottom()

    //Send to Server
    socket.emit('message' , msg)
} 

function appendMessage(msg ,type){
    let maindiv = document.createElement('div')
    let className = type
    maindiv.classList.add(className , 'message')

    let markup = `
       <h4>${msg.user}</h4> 
       <p>${msg.message}</p>
    `
    maindiv.innerHTML = markup;
    messageArea.appendChild(maindiv)
};
 //Recieve messages
 socket.on('message' , (msg) => {
    appendMessage(msg , 'incoming')
    scrollToBottom();
 })

function scrollToBottom () {
    messageArea.scrollTop = messageArea.scrollHeight
}

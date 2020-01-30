const socket = new WebSocket('ws://localhost:9000');
const sendButton = document.querySelector('button');
const messageInput = document.querySelector('input');
const form = document.querySelector('form');
const messageOutput = document.querySelector('output');

// We will use this function for posting messages to the message board.
function postMessage(message) {
  const newMessage = document.createElement('p');
  newMessage.textContent = message;

  messageOutput.appendChild(newMessage);
}

// Listen for messages from the server and post them
socket.addEventListener('message', event => {
  postMessage(event.data);
});

// Allow the user to post their own messages
form.addEventListener('submit', event => {
  event.preventDefault();

  // Post the message to the message board
  postMessage(messageInput.value);

  // Send the message to the server
  socket.send(messageInput.value);

  // Clear the input
  messageInput.value = '';
});

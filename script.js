const socket = io('https://chat-app-backend-l5r3.onrender.com'); // Replace with your Render backend URL
let username = '';

document.getElementById('startChatBtn').addEventListener('click', () => {
    username = document.getElementById('nicknameInput').value;
    if (!username) return alert('Enter a nickname!');
    socket.emit('set_username', { username });
    document.getElementById('setupContainer').style.display = 'none';
    document.getElementById('chatArea').style.display = 'block';
});

document.getElementById('sendBtn').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (!message) return;
    socket.emit('send_message', { username, text: message });
    document.getElementById('messageInput').value = '';
});

socket.on('receive_message', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${data.username}: ${data.text}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

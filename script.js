const socket = io();
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const joinButton = document.getElementById('joinButton');
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const currentUserSpan = document.getElementById('currentUser');
const userCountSpan = document.getElementById('userCount');
const typingIndicator = document.getElementById('typingIndicator');
const typingText = document.getElementById('typingText');

let username = '';
let isTyping = false;
let typingTimer;

function addMessage(messageData) {
    const messageDiv = document.createElement('div');
    const isOwnMessage = messageData.username === username;
    
    if (messageData.type === 'system') {
        messageDiv.className = 'message system';
        messageDiv.innerHTML = `<div class="message-text">${messageData.message}</div>`;
    } else {
        messageDiv.className = `message ${isOwnMessage ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            ${!isOwnMessage ? `<div class="message-header">${messageData.username}</div>` : ''}
            <div class="message-text">${messageData.message}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    
    if (messageText !== '' && username !== '') {
        const messageData = {
            message: messageText
        };
        
        socket.emit('new message', messageData);
        messageInput.value = '';
        stopTyping();
    }
}

function joinChat() {
    const enteredUsername = usernameInput.value.trim();
    
    if (enteredUsername !== '') {
        username = enteredUsername;
        currentUserSpan.textContent = `Welcome, ${username}!`;
        usernameModal.style.display = 'none';
        chatContainer.style.display = 'flex';
        socket.emit('user joined', username);
        messageInput.focus();
    }
}

function handleTyping() {
    if (!isTyping) {
        isTyping = true;
        socket.emit('typing', username);
    }
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        stopTyping();
    }, 1000);
}

function stopTyping() {
    if (isTyping) {
        isTyping = false;
        socket.emit('stop typing');
    }
}

joinButton.addEventListener('click', joinChat);
sendButton.addEventListener('click', sendMessage);

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinChat();
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

messageInput.addEventListener('input', handleTyping);

socket.on('new message', (messageData) => {
    addMessage(messageData);
});

socket.on('user count', (count) => {
    userCountSpan.textContent = `Users online: ${count}`;
});

socket.on('typing', (typingUsername) => {
    if (typingUsername !== username) {
        typingText.textContent = `${typingUsername} is typing...`;
        typingIndicator.style.display = 'block';
    }
});

socket.on('stop typing', () => {
    typingIndicator.style.display = 'none';
});

window.addEventListener('load', () => {
    usernameInput.focus();
});
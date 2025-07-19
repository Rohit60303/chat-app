# chat-app

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: BHUPATHIRAJU SURYA SRI ROHIT VARMA

*INTERN ID*: CT08DF1032

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 8 WEEKS

*MENTOR*: NEELA SANTHOSH KUMAR

*Project Description* :

So this is my 2nd task, This is a real-time chat application built using Node.js, Express, and Socket.io which allows multiple users to communicate instantly at a time in a shared chat room. 

*The application features* :

- Username entry before joining the chat. The user need to enter a username to join the chat room.

- The users can experience real-time messaging with other connected users.

- User count to track the number of active participants.

- Responsive design that works on both desktop and mobile devices.

- It can used whether for team collaboration, casual chatting, or learning real-time web development, this project demonstrates the power of WebSockets for instant communication.

*Features* :

1. User Authentication (Username Entry) -

     - Users must enter a username before joining the chat. So that the entered username is displayed in the chat interface.

     - It revents anonymous messaging.
   
2. Real-Time Messaging -

     - The messages are sent and received instantly without page refresh.

     - All the messages are displayed with the sender’s username.

     - There is distinct styling for sent vs. received messages.

3. Active User Count -

     - Displays the number of online users in real-time.

     - It updates dynamically as users join or leave.

4. Responsive UI -

     - Works on desktops, tablets, and mobile devices.

     - Clean and intuitive design with a dark theme.

# Technologies Used :

*Frontend* :

`HTML5 & CSS3` – Structure and styling.

`JavaScript (ES6+)` – Client-side interactivity.

`Socket.io Client` – Real-time WebSocket communication.

*Backend* :

`Node.js` – JavaScript runtime.

`Express.js` – Web server framework.

`Socket.io` – Enables real-time bidirectional communication.

*Project Structure* :

- We create a folder named chat-app, inside this folder we create aother folder named public and this public folder contains index.hmtl, script.js, style.css.

- Outside the public folder and inside the chat-app folder we have three more folders - server.js, package.json, package-lock.json.

*Setup & Installation* :
 
Prerequisites -

 - Node.js 

 - npm (which comes with Node.js)

Steps to Run - 

You can clone this repository

    bash
    git clone https://github.com/your-username/chat-app.git
    cd chat-app
    
Install dependencies

    bash
    npm install
    
Start the server

    bash
    npm start
    
Open browser and Visit `http://localhost:3000` in your browser.

*How It Works* :

1. Server-Side (Node.js + Socket.io)

     The Express server handles HTTP requests.

     Socket.io manages WebSocket connections for real-time updates.

- When a user joins, the server:

   Stores their username and socket ID.

   Broadcasts the updated user count to all clients.

- When a message is sent:

   The server relays it to all connected clients.

- When a user disconnects:

   Their session is removed, and the user count updates.

2. Client-Side (JavaScript + Socket.io) :

      Users enter a username before joining.

      Messages are sent via socket.emit('new message').

      The UI updates in real-time using socket.on('new message').

      Typing indicators are triggered when a user inputs text.

*Key Functions in server.js* :

  `io.on('connection')` – Handles new WebSocket connections.

  `socket.on('user joined')` – Stores new users and updates the count.

  `socket.on('new message')` – Broadcasts messages to all clients.

  `socket.on('disconnect')` – Removes disconnected users.

*Key Functions in script.js* :

  `addMessage()` – Displays messages in the chat UI.

  `sendMessage()` – Emits messages to the server.

  `joinChat()` – Handles username submission.

  `handleTyping()` – Shows/hides typing indicators.

*Many other improvements can be done, like* -

- Storing chats in a database.

- File Uploading like images, documents, etc.

*Here are some useful links* :

~ Socket.io

~ Express.js

~ Node.js

*Conclusion* :

This real-time chat app demonstrates the power of WebSockets for instant communication. It’s a great project for learning Node.js, Express, and Socket.io, and can be extended with more features like user authentication, databases, and multimedia support.

So, Have a try!

# OUTPUT

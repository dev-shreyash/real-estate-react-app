import { Server } from 'socket.io';
import http from 'http';
import fetch from 'node-fetch';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "https://real-estate-react-app-shreyash.netlify.app", // Your client URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find(user => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find(user => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);  // Debugging connection

  socket.on('newUser', (userId) => {
    addUser(userId, socket.id);
    console.log('New user connected:', userId);  // Debugging new user
  });

  socket.on('sendMessage', ({ receiverId, data }) => {
    console.log('Sending message to:', receiverId);  // Debugging sendMessage event
    const receiver = getUser(receiverId);
    if (receiver) {
      console.log('Emitting message to receiver:', receiver.socketId);  // Debugging message emission
      io.to(receiver.socketId).emit('getMessage', data);  // Emit the message
      socket.emit('sendMessage', { receiverId, data });

    } else {
      console.log('Receiver not found');
    }
  
  });



  socket.on('disconnect', () => {
    removeUser(socket.id);
    console.log('User disconnected:', socket.id);  // Debugging disconnect
  });

  // Emit a "ping" event every 5 minutes to keep socket server alive
  setInterval(() => {
    socket.emit('ping', 'keep alive');  // Keep socket server alive with "ping"
    console.log("Socket server health check 👍");
  }, 300000); // every 5 minutes (300000 ms)
});

// Health check for Socket server
server.on('request', (req, res) => {
  if (req.url === '/health') {
    res.write('Socket server is alive');
    res.end();
  }
});

// Periodically send a "ping" to the API server to keep it alive
setInterval(async () => {
  try {
    const response = await fetch('https://real-estate-react-app-knh7.onrender.com/health'); // Request to the API server's health check
    if (response.ok) {
      console.log('Socket server: API server health check successful');
    } else {
      console.log('Socket server: API health check failed, status code:', response.status);
    }
  } catch (error) {
    console.error('Socket server: Error with API health check:', error);
  }
}, 300000); // every 5 minutes (300000 ms)

io.listen(4000, () => {
  console.log('Socket server is running on port 4000');
});

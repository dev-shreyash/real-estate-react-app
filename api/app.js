import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';
import fetch from 'node-fetch'; // Import node-fetch for making HTTP requests
import toggleCity from './utils/DbAwakeScript.js';

dotenv.config({
  path: './.env',
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
console.log(process.env.CLIENT_URL, 'Client url');
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('products api running new deploy');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

// API Server Health Check Route
app.get('/health', (req, res) => {
  res.send('API server is alive');
});

// Periodically send a "ping" to the Socket server to keep it alive
setInterval(async () => {
  try {
    const response = await fetch('http://localhost:4000/health'); // Request to the Socket server's health check
    if (response.ok) {
      console.log('API server: Socket server health check successful');
    } else {
      console.log('API server: Socket health check failed. Status:', response.status);
    }
  } catch (error) {
    console.error('API server: Error with Socket server health check:', error);
  }
}, 300000); // every 5 minutes (300000 ms)

// Schedule the toggleCity function to run every 1 day
setInterval(toggleCity, 1 * 24 * 60 * 60 * 1000); // 1 day in milliseconds

// Optionally, invoke it immediately at server startup
toggleCity();

app.listen(5000, () => {
  console.log('API server is running on port 5000');
});

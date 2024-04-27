import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
import dotenv from  'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import testRoute from './routes/test.route.js'

dotenv.config({
    path:'./.env'
})
const app=express()
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({origin: process.env.CLIENT_URL, credentials:true}))
app.use(cookieParser())

app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use("/api/test", testRoute);


console.log('test')

app.listen(5000,()=>{
    
    console.log('server is running on port 5000')
})
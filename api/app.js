import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'



const app=express()

app.use(cors({origin: process.env.CLIENT_URL, credentials:true}))
app.use(cookieParser())

app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)

console.log('test')

app.listen(5000,()=>{
    
    console.log('server is running on port 5000')
})
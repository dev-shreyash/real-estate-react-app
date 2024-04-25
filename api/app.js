import express from 'express'

import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'



const app=express()


app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)

console.log('test')

app.listen(5000,()=>{
    
    console.log('server is running on port 5000')
})
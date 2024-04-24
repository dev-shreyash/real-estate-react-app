import express from 'express'

import postRoute from './routes/posts.js'
import authRoute from './routes/auth.js'



const app=express()

app.use(express.json())

app.use('/api/auth',authRoute)
app.use('api/posts',postRoute)
console.log('test')

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
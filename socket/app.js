import {Server} from "socket.io"


const io= new Server({
    cors:{
        origin:"http://localhost:5173",
    }
})


let onlineUser=[]

const addUser =(userId,socketId)=>{
    const userExits=onlineUser.find(user=>user.userId===userId)
    if(!userExits){
        onlineUser.push({userId,socketId})
    
    }
}


const removeUser=(socketid)=>{
    onlineUser=onlineUser.filter(user=>user.socketId!==socketid)
}

const getUser =(userId)=>{
  //  console.log(userId)
    return onlineUser.find((user)=>user.userId===userId)
}

io.on("connection",(socket)=>{
   socket.on('newUser',(userId)=>{
    addUser(userId,socket.id)
   // console.log( onlineUser)
   })

   socket.on("sendMessage",({receiverId,data})=>{
    console.log(receiverId)
    const receiver =getUser(receiverId)
    console.log("reciever",receiver)

    io.to(receiver.socketId).emit("getMessage",data)
   })
   socket.on("disconnect",()=>{
    removeUser(socket.id)
   })
})


io.listen("4000")
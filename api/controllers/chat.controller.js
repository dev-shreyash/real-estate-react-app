
import prisma from '../lib/prisma.js'


export const getChats=async(req,res)=>{
    const tokenUserId=req.userId
    console.log(tokenUserId)






    try {
        const chats= await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[tokenUserId]
                }
            }
        })
        
       // console.log(chats)
       // console.log(chats[0].userIDs)
       for (const chat of chats) {
        const receiverId = chat.userIDs.find(id => {
            return id !== tokenUserId;  
        });
       // console.log(receiverId);  // Log or process receiverId as needed
    

            const receiver = await prisma.user.findUnique({
                where:{
                    id:receiverId
                },
                select:{
                    id:true,
                    username:true,
                    avatar:true,
                }
            })

            chat.receiver=receiver
        }

        return res.status(200).json({data:chats})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while fetching chats",
        })
    }
}

export const getChat=async(req,res)=>{
    const tokenUserId=req.userId





    try {
        const chat =await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    },
                    
                }
            }

        })
        
        await prisma.chat.update({
            where:{
                id:req.params.id
            },
            data:{
                seenBy:{
                    set:[tokenUserId]
                }
            }
        })
        console.log("chat:",chat)
        return res.status(200).json({data:chat})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while fetching chat ",
        })
    }
}


export const addChat=async(req,res)=>{

    const tokenUserId=req.userId
    const {senderId,receiverId,message}=req.body;


    try {

        const newChat=await prisma.chat.create({
            data:{
                userIDs:[tokenUserId, receiverId]
            }
        })

        return res.status(200).json({data:newChat})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while adding chat",
        })
    }
}


export const readChat=async(req,res)=>{

    const tokenUserId=req.userId





    try {
        const chat =await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    set:[tokenUserId]
                }
            }

        })
        return res.status(200).json({data:chat})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while reading chat",
        })
    }
}


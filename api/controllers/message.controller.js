
import prisma from '../lib/prisma.js'


export const addMessage=async(req,res)=>{

    const tokenUserId=req.userId

    const chatId=req.params.chatId
    const text=req.body.text





    try {

        const chat = await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            }
        })

        if (!chat) {
            return res.status(404).json({message:"chat not found"})

        }

        const message =await prisma.message.create({
            data:{
                text,
                chatId,
                userId:tokenUserId
            }
        })

        await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                seenBy:[tokenUserId],
                lastMessage:text
            } 
        
        })
        console.log("message Added", message.text)

        return res.status(200).json({message:'message fetched successfully', message})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while adding message",
        })
    }
}

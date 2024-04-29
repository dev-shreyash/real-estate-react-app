import prisma from "../lib/prisma.js"
import bcrypt from 'bcrypt'








export const getUsers=async(req,res)=>{
    res.json({message:'it works'})
    try {

        const users =await prisma.user.findMany()
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to get users'})
    }
}


export const getUser=async(req,res)=>{

    const id=req.params.id
    try {
        const users =await prisma.user.findUnique({
            where:{id}
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to get user'})
    }
}


export const updateUser=async(req,res)=>{
    const id=req.params.id
    const tokenUserId=req.userId
    const {password, ...otherInputs}=req.body

    if(id!==tokenUserId){
        res.status(401).json({message:'Your no Authorized'})

    }
    const updatedpass=null
    try {

       if(password){
        updatedpass=await bcrypt.hash(password,10)

       }

        const updateduser=await prisma.user.update({
            where:{id},
            data:{
                ...otherInputs,
                ...(updatedpass&&{password:updatedpass})
            }
            
        })
        res.status(200).json({message:'user updated successfully',data:updateduser})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to update user'})
    }
}


export const deleteUser=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to delete user'})
    }
}





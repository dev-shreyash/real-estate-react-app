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
    console.log(tokenUserId)
    console.log(id)
    const {password, avatar, ...otherInputs}=req.body

    if(id !==tokenUserId){
        res.status(401).json({message:'Your not Authorized'})

    }
    let updatedpass=null
    try {

       if(password){
        updatedpass=await bcrypt.hash(password,10)

        if(!updatedpass){
        res.status(500).json({message:'failed to update user password'})
        }

       }
       const user =await prisma.user.findUnique({
        where:{id}
        })

        const updateduser=await prisma.user.update({
            where:{id},
            data:{
                ...otherInputs,
                ...(updatedpass&&{password:updatedpass}),
                ...(avatar&&{avatar}),
                email: req.body.email !== prisma.user.email ? req.body.email : undefined // Only update email if it's different

            }
            
        })
        console.log("user updated succesfully")

        const {password:userPassword, ...rest} =updateUser
        res.status(200).json({message:'user updated successfully',data:updateduser})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to update user'})
    }
}


export const deleteUser=async(req,res)=>{
    const id=req.params.id
    const tokenUserId=req.userId
    //console.log(tokenUserId)
   // console.log(id)

    if(id !==tokenUserId){
        res.status(401).json({message:'Your not Authorized'})

    }
    try {

        const deletedUser=await prisma.user.delete({
            where:{id}
        })
        

        if(!deletedUser){
            res.status(404).json({message:'user not found'})
        }
        res.status(200).json({message:'user deleted successfully',data:deletedUser})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to delete user'})
    }
}





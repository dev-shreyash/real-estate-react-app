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
    console.log(id)
    try {
        const user =await prisma.user.findUnique({
            where:{id}
        })

        res.status(200).json({message:'user fetched successfully',data:user})


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


export const savePost=async(req,res)=>{
    const postId=req.body.postId
    //const userId=req.body.userId
    console.log(postId)
    // const id=req.params.id

    const tokenUserId=req.userId

    // if(id !==tokenUserId){
    //     res.status(401).json({message:'Your not Authorized'})

    // }
    try {

       const savedPost= await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId:tokenUserId,
                    postId,
                }
            }
        })
        //console.log(savePost)


        if(savedPost){
            await prisma.savedPost.delete({
                where:{
                    id:savedPost.id
                }
            })
            console.log("post unsaved")
            res.status(200).json({message:'post unsaved successfully'})
        }else{
            await prisma.savedPost.create({
                data:{
                    userId:tokenUserId,
                    postId
                }
        })
        console.log("post saved")
        res.status(200).json({message:'post saved successfully'})

        }

       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to save or unsave post'})
    }
}

export const profilePosts=async(req,res)=>{
    const tokenUserId=req.params.id
    const id=req.params.id
    try {
        const userPosts =await prisma.post.findMany({
            where:{userId:tokenUserId}
        })

        const saved =await prisma.savedPost.findMany({
            where:{userId:tokenUserId},
            include:{
                post:true
            }
        })

        const savedPost=saved.map(item=>item.post)
        res.status(200).json({message:'user fetched successfully',data:{userPosts, savedPost}})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to get profile posts'})
    }
}



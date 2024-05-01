import prisma from "../lib/prisma.js";


export const getPosts = async(req,res)=>{

    try {

        const posts=await  prisma.post.findMany()
        
        res.status(200).json({
            status:'success',
            data:{posts},
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while fetching posts",
        })
    }
}


export const getPost = async(req,res)=>{
    const id= req.params.id
    try {
        const post=await  prisma.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                user:{
                   select:{
                    username:true,
                    avatar:true
                   }
                }
            }
        })

        res.status(200).json({
            status:'success',
            data:{post},
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while fetching post",
        })
    }
}

export const addPost = async(req,res)=>{

    const body= req.body
    const tokenUserId= req.userId

    try {
        const newPost= await prisma.post.create({
            data:{
                ...body.postData,
                userId:tokenUserId,
                postDetail:{
                    create:body.postDetail,

                }
            }
        })

        res.status(200).json({
            status:'success',
            data:{newPost},
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while creating new post",
        })
    }
}

export const updatePost = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while updating postr",
        })
    }
}

export const deletePost = async(req,res)=>{
    const id=req.params.id
    const tokenUserId= req.userId

    try {
        const post = await prisma.post.findUnique({
          where: { id },
        });
    
        if (post.userId !== tokenUserId) {
          return res.status(403).json({ message: "Not Authorized!" });
        }
    
        await prisma.post.delete({
          where: { id },
        });
    
        res.status(200).json({ message: "Post deleted" });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while deleting post",
        })
    }
}
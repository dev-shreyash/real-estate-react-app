import prisma from "../lib/prisma.js";


export const getPosts = async(req, res) => {
    const { city, type, property, bedroom, minPrice, maxPrice } = req.query;
    
    const where = {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: bedroom ? parseInt(bedroom, 10) : undefined,
        price: {}
    };
    console.log(where)

    if (minPrice) where.price.gte = parseInt(minPrice, 10);
    if (maxPrice) where.price.lte = parseInt(maxPrice, 10);

    if (Object.keys(where.price).length === 0) delete where.price;

    try {
        
        const posts = await prisma.post.findMany({ where });
        res.status(200).json({
            status: 'success',
            data: { posts },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: "Something went wrong while fetching posts",
        });
    }
};



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

    const { postData, postDetail } = req.body;
    const tokenUserId= req.userId

    
    if (!tokenUserId) {
        return res.status(401).json({
            status: 'fail',
            message: "Unauthorized: No user ID found in the request."
        });
    }
    try {
        const newPost = await prisma.post.create({
            data: {
                ...postData,
                userId: tokenUserId,
                postDetail: {
                    create: postDetail
                }
            }
        });
        if(!newPost){
            console.log("error creating post")
        }
        console.log(newPost)
        res.status(200).json({
            status: 'success',
            data: { newPost }
        })
        
    } catch (error) {
        console.log(error)
        let message = "Something went wrong while creating new post";
        res.status(500).json({
            status: 'fail',
            message,
        });
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
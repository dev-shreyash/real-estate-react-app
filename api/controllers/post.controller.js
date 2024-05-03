import prisma from "../lib/prisma.js";
import  jwt  from 'jsonwebtoken';

export const getPosts = async(req, res) => {
    const { city, type, property, bedroom, minPrice, maxPrice } = req.query;
    const query = {
        city,
        type,
        property,
        bedroom,
        minPrice,
        maxPrice,
    };
    //console.log(query)

    try {
        const posts = await prisma.post.findMany({
            where: {
              city: query.city || undefined,
              type: query.type || undefined,
              property: query.property || undefined,
              bedroom: parseInt(query.bedroom) || undefined,
              price: {
                gte: parseInt(query.minPrice) || undefined,
                lte: parseInt(query.maxPrice) || undefined,
              },
            },
          });

          setTimeout(() => {
            res.status(200).json({
                status: 'success',
                data: { posts },
                
            });
          }, 200);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: "Something went wrong while fetching posts",
        });
    }
};



export const getPost = async(req, res) => {
    const id = req.params.id; // Assuming `id` is the correct parameter name
    try {
        // Fetch the post with detailed information and user details
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            }
        });

        // Handle case when no post found
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        const token = req.cookies?.token;

        // If there is a token, verify it and check if the post is saved by the user
        if (token) {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                const saved = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            postId: id,
                            userId: payload.id,
                        },
                    },
                });
                console.log('Saved post:', saved);
                return res.status(200).json({ data: { post }, isSaved: !!saved });
            } catch (err) {
                console.log('JWT verification error:', err);
                // If there is an error verifying the token, you might still want to return the post, but indicate it is not saved.
                return res.status(200).json({ data: { post }, isSaved: false });
            }
        }

        // If there is no token, return the post and indicate it is not saved
        return res.status(200).json({ data: { post }, isSaved: false });
    } catch (error) {
        console.log('Database or server error:', error);
        res.status(500).json({
            status: 'fail',
            message: "Something went wrong while fetching the post"
        });
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
        console.log("post submitted")
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
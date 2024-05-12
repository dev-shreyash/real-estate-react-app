import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import  jwt  from 'jsonwebtoken';


export const register=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body

    if (!(username&&email&&password)) {
        throw new ApiError(400,"Please provide your All Details")
    }
   
    try{
        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });
    
        if (existedUser) {
            res.status(401).json({
                status: 'fail',
                message: "user already exist",
            });          }
        //password hashing
        
        const hashedPass=await bcrypt.hash(password,10)

        console.log(hashedPass)
        const newUser=await prisma.user.create({
           data:{
            username,
            email,
            password:hashedPass
           }
        })
        console.log(newUser)
        if(!newUser){
            res.status(401).json({
                status: 'fail',
                message: "faild to create user ",
            });  
            console.log("faild to create user")
        }
        res.status(201).json({status:'success',data:{newUser},message:"user created successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:"Something went wrong while creating new user",
        })
    }
})

export const login=asyncHandler(async(req,res)=>{
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
        throw new ApiError(400, "Please provide username and password");
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: username }, // Assuming username can be email or username
                    { username: username }
                ]
            }
        });

        if (!user) {
            res.status(401).json({
                status: 'fail',
                message: "user does not exist",
            });       
         }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
           // throw new ApiError(400, "Password is not valid");
            // 401 Unauthorized
            res.status(401).json({
                status: 'fail',
                message: "user password not matched",
            });           
        }

        // Set cookie token or session
        const cookieAge=1000*60*60*24*7;

        const token=jwt.sign(
            {
                id:user.id,
                isAdmin:false
            },
            process.env.JWT_SECRET,
            {
                expiresIn:cookieAge
            });

            console.log('token: ', token)

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            maxAge:cookieAge
        })

        const {password:userPassword, ...userInfo}=user


        res.status(200).json({status:'success',data:{user},message:"user Logged in successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: "Something went wrong while logging in user",
        });
    }
})
export const logout=async(req,res)=>{
    try{

        res.clearCookie("token")
        .status(200).json({status:'success',message:"user logged out successfully"})

        
    }catch(error){

    }

}
import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from '../utils/asyncHandler.js';
  


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
            throw new ApiError(409, 'User already exists');
        }
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
    const {username, password}=req.body
    console.log(username,password)
    if (!(username&&password)) {
        
        throw new ApiError(400,"plz provide username and password")
        
    }
    try{
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        })
        if(!user){
            throw new ApiError(400,"user dose not exist")
        }
    
        //check pass

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new ApiError(400,"password is not valid")
        }
        
        //cookie tokes

       res.setHeader("set-Cookie","test="+"myValue").json("success")
    }catch(error){

    }

})
export const logout=(req,res)=>{
    try{

        
    }catch(error){

    }

}
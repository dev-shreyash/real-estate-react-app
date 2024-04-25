import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'

export const register=async(req,res)=>{
    const {username,email,password}=req.body
    try{

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
}

export const login=(req,res)=>{
    const {username, password}=req.body

    if (!username) {
        res.json
    }
    try{


    }catch(error){

    }

}
export const logout=(req,res)=>{
    try{

        
    }catch(error){

    }

}
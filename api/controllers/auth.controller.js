import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const register=async(req,res)=>{
    const {username,email,password}=req.body
    try{

        //password hashing

        const hashedPass=await bcrypt.hash(password,10)

    }catch(error){

    }
}

export const login=(req,res)=>{
    try{


    }catch(error){

    }

}
export const logout=(req,res)=>{
    try{

        
    }catch(error){

    }

}
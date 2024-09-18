const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const register = async(req,res)=>{
    try {
        const {username,password} = req.body;

        const user = await AuthSchema.findOne({username})

        if(user){
            return res.status(500).json({msg:"Böyle bir kullanici var"})
        }
        if(password.length < 6){
            return res.status(500).json({msg:"Şifreniz 6 karakterden küçük olamaz"})
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await AuthSchema.create({username, password:passwordHash})

        const token = jwt.sign({id:newUser._id}, "SECRET_KEY", {expiresIn:"1h"})

        res.status(201).json({
            status:"ok",
            newUser,
            token
        })
        
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}


const login = async(req,res)=>{
    try {
        const {username, password} = req.body
        const user = await AuthSchema.findOne({username})

        if(!user){
            return res.status(500).json({msg:"Böyle bir kullanici yok"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)

        if(!passwordCompare){
            return res.status(500).json({msg:"Şifre Hatalı"})
        }
        const token = jwt.sign({id:user._id}, "SECRET_KEY", {expiresIn:"1h"})

        res.status(200).json({
            status:"ok",
            user,
            token
        })


    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}


module.exports = {register ,login}
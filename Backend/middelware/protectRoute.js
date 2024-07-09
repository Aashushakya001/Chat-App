import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const protecRoute= async(req,res,next)=>{

    try {

        const token=req.cookies.jwt

        // console.log(token);

        if(!token){

            res.status(401).json({message:"You are not authorized to access this route becase token is not found" })   

        }

        const decode=jwt.verify(token,process.env.JWT_SECRET)

        // console.log(decode.userId);

        if(!decode){

            res.status(401).json({message:"You are not authorized to access this route becuse token is not verified" })

        }

        const user=await User.findOne(decode.userid).select("-password")
        if(!user){
            res.status(401).json({message:"You are not authorized to access this route becuse user is not found"})
        }

        req.user=user
        // console.log(req.);
        next()

    } catch (error) {

        console.log("Error in protectRoute:",error.message);

        res.status(500).json({error:"Internal serrver error"})

    }
}

export default protecRoute
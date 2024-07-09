import jwt from "jsonwebtoken"

const genrateToken=(userId,res)=>{
    // console.log(res);
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie('jwt',token,{
        maxAge:15*24*60*60*100,
        httpOnly:true,// prevent xss attachs coress-site scripting attack
        sameSite:"strict",// CSRF attacks 
        secure:process.env.NODE_ENV !== "development",
    })
}   


export default genrateToken;
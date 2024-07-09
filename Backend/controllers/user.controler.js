import User from "../models/user.models.js";

export const  getAllUsers=async(req,res)=>{
    try {
        // const logedinId=req.user._id

        const allUsers=await User.find()
        console.log(allUsers);
        return res.status(200).json(allUsers)
    } catch (error) {
        console.log("internal error in usercontroller :",error.mesage);
        return res.status(500).json("intenal error");
    }
}
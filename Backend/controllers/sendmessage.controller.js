import convschema from "../models/conversatio.mode.js"
import messagemodel from '../models/message.model.js'

export const sendMessage=async (req,res)=>{
    try {
        const {message}=req.body
        // console.log(message);
        const {id:reciverId}=req.params
        console.log(reciverId);
        const senderId=req.user._id
        

        let conversation = await convschema.findOne({
            participants:{$all:[senderId,reciverId]}
        })

        if(!conversation){
            conversation=await convschema.create({
                participants:[senderId,reciverId],
            })
        }

        const newMessage=messagemodel({
            senderId,
            reciverId,
            message
        })
        // console.log(message);
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(),newMessage.save()])
        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendmessage.controller:",error.message);
        res.status(500).json({error:"Internal error"})
        
    }
}

export const getMessage=async (req,res)=>{
    try {
        const { id: reciverId } = req.params;   
        const senderId=req.user._id
        // console.log(senderId,reciverId);
        const conversation=await convschema.findOne({
            participants:{$all:[senderId,reciverId]}
        }).populate('messages')
        // console.log(conversation);

        if(!conversation){
            return res.status(500).json([])
        }   
        const message=conversation.messages;
        // console.log(message);
        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getmessage.controller:",error.message);
        res.status(500).json({error:"Internal error"})
    }
}

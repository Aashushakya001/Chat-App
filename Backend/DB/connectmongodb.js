import mongoose from "mongoose"


const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_BD_URL)
        console.log("connected to mongodb");
    } catch (error) {
        console.log("error connecting to database" ,error.message);
    }
}


export default connectToMongoDB
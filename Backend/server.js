import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


import messageRoute from "./routes/messasge.route.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"


import connectToMongoDB from "./DB/connectmongodb.js"



const app=express()
const PORT = process.env.PORT || 5000


dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)
app.use("/api/users",userRoutes)



app.get('/',(req,res)=>{
  res.send("hello world")
})


app.listen(PORT,()=>{
  connectToMongoDB()
   console.log(`swevwe runing on the port ${PORT}`);
 }) 
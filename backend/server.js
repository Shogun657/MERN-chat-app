// importing dependencies
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// importing routes
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDb from "./db/connect.js"

dotenv.config();

const  app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) // to parse the incoming requests with the JSON payloads
app.use(cookieParser()) // to parse cookies in isLoggedIn middleware
// // root route
// app.get('/',(req,res)=>{
//     res.send("Hello World!");
// })

// auth routes
app.use('/api/auth',authRoutes)
// messsage routes
app.use('/api/messages',messageRoutes)
// user routes
app.use('/api/users',userRoutes)

app.listen(PORT ,()=>{
    connectToMongoDb()
    console.log("SERVER IS UP AND RUNNING ON PORT " + PORT)
});
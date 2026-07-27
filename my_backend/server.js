import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'





const app=express()

app.use(cors())

app.use(express.json())

const connectDB= async()=>{
    try{
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB connected ❤️👍👌(❁´◡`❁)")
    }
    catch(err){
        console.log("error while connecting to db",err.message)
        console.error(err);
        console.error(err.cause);
    }
}
connectDB();

app.use('/api/auth',authRoutes)
app.use('/api/profile',profileRoutes)

const PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log(`server listning at port: ${PORT}`)
})
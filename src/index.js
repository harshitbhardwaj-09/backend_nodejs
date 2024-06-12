//import mongoose from  "mongoose";
//import { DB_NAME } from "../constants";
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
   path: './env'
})



connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000,()=>{
      console.log(` server is running at port: ${process.env.PORT}`);
   })
})
.catch((err)=>{
   console.log("MONGO db connection failed !!!",err)
})





// import express from "express"
// const app=express();

// ( async ()=>{
//     try{
//       console.log(process.env.MONGODB_URI);
//       //  await mongoose.connect(process.env.MONGODB_URI.toString())
//       //  await mongoose.connect("mongodb+srv://harshitbhardwaj99999:harshit123@cluster0.qtmyv9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//       //  app.on("error",(error)=>{
//       //   console.log("ERROR: ",error);
//       //   throw error
//       //  })
//       try {
//          await mongoose.connect(process.env.MONGODB_URI);
//          console.log("Connected to mongoDB!");
//        } catch (error) {
//          console.log(error);
//        }
//        app.listen(process.env.PORT,()=>{
//          console.log(`app is listening on port ${process.env.PORT}`);
//        })
//     }catch(error){
//        console.error("ERROR: ",error);
//        throw err
//     }
// })()

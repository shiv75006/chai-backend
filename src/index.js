// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongodb connection failed");
})  //function imported from index.js in db folder



















// import express from "express"

// const app = express()

// (async () => {
//    try{
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       application.on("error",(error)=>{
//         console.log("Error :",error);
//         throw error
//       })

//       app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening in ${process.env.PORT}`)
//       })
//    }catch(error){
//     console.log(error);
//     throw error
//    }
// })()  // ; befor iffy is used for cleaning the code


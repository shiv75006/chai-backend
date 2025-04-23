import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

//configuring cors
app.use(cors({
    origin:process.env.CORS_ORIGIN, //link from where data is requested
    credentials: true
}))
//handling different form of data

app.use(express.json({
    limit:'16kb'  //limit of json data that can be accepted at the backend
}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))

//cookieparser is used to access the cokkies form the users browser and perform CRUD operation on them

app.use(cookieParser())

export default app
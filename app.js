require('dotenv').config()
require('express-handler-errors')
const express = require('express')
const app = express()

const connectDB =require('./connectDB/connectDB')
const productRouter = require('./router/productRouter')
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')


//Middleware
app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('<h1>StoreAPI</h1> <a href ="/api/v1/products">Products Router</a>')
})

app.use('/api/v1/products',productRouter)

//product router
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)





const port = process.env.PORT || 3000
const start = async()=>{
    try{
        //connectDb
       await connectDB(process.env.MONGO_URI)
        app.listen(port,
            console.log(`Server is Running in Port ${port}`))
        }
    catch(err){
        console.log(err)
    }}

start()

//this file Add product dynamic to data base

require('dotenv').config()

const connectDB =require('./connectDB/connectDB')
const productsJson = require('./products.json')
const Product = require('./models/productModule')






const start =async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(productsJson)
        console.log('Add is Success')
        process.exit(0)

    }catch(error){
        console.log(error)
        process.exit(1)

    }
}
start()


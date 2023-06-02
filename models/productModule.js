const mongoose = require('mongoose')


const productShcema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Product Name Must Be Provided']
    },
    price:{
        type:Number,
        required:[true, 'Product Price Must Be Provided']
    },
    featured:{
        type:Boolean,
        defualt:false
    },
    rating:{
        type:Number,
        defualt:4.5
    },
    craeteAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','caressa','Liddy','marcos'],
            message:'{VALUE} Is Not Supported'
        },
    },
})

module.exports= mongoose.model('Product',productShcema)
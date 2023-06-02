const mongoose = require('mongoose')


const connectDB = (url)=>{
     mongoose.connect(url) .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Failed to connect to MongoDB Atlas', err));
    
    
}
module.exports= connectDB

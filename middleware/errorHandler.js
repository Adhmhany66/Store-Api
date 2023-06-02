const errorHandler = async(err ,req,res , next)=>{
    console.log(err)
    return res.status(500).json({status:'something went Wrong, please try again'})
}
module.exports =errorHandler
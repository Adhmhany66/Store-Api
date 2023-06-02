const Product = require('../models/productModule')
const getAllProductsStatic = async(req,res)=>{
    const products = await Product.find({})
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async(req,res)=>{
    
    const {featured,company,name,sort,fileds,numircFilters}= req.query 
    const queryObject={}
    
    if(featured){
        queryObject.featured = featured === 'true'?true : false
    }
    if(company){
        queryObject.company=company 
    }
    if(name){
        queryObject.name = {$regex:name , $options:'i' }
    }

    if(numircFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|=>|=|<=|)\b/g
        let filters =numircFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`) //becuse monoose accept to query
        // console.log(filters)
        const options =['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const [filed,operator,value]=item.split('-')
            if(options.includes(filed)){
                queryObject[filed]={[operator]:Number(value)}
            }
        })
    }
    // console.log(  queryObject)

    let result = Product.find(queryObject)
    
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createAt')
    }
    if(fileds){
        const filedsList = fileds.split(',').join(' ')
        result = result.select(filedsList)
    }

    const page= Number(req.query.page)||1
    const limit = Number(req.query.limit)||10
    const skip = (page-1) *limit

    result = result.skip(skip).limit(limit)

    
    
    
    
    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports= {getAllProductsStatic,getAllProducts}
// Create mini exp app
const { default: axios } = require('axios')
const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const productAPI=exp.Router()
// MulterObj
const multerObj=require('./middlewares/fileUpload')
// parching API
productAPI.use(exp.json())
let productCollectionObj;
// Middleware to get productCollectionObj
productAPI.use('/',(req,res,next)=>{
    productCollectionObj=req.app.get('productCollectionObj')
    next()
})


//create product using await
productAPI.post('/createproduct',multerObj.single('photo'),expressAsyncHandler(async(req,res,next)=>{
    // getting product from admin
    let newproduct=JSON.parse(req.body.productObj)
    // Checking weather product exist
    let product=await productCollectionObj.findOne({productname:newproduct.productname})
    //if existed//
    if(product===null){
        newproduct.profileImage=req.file.path
        await productCollectionObj.insertOne(newproduct)
        res.send({message:"New product created"})
    }
    else{
        res.send({message:"product already existed"})
    }
}))

// Display all data
productAPI.get('/getproducts',expressAsyncHandler(async(req,res)=>{
    let productlist=await productCollectionObj.find().toArray()
    res.send({message:productlist})
}))

//get product by Type
productAPI.get("/getproducts/bytype/:producttype",expressAsyncHandler(async(req,res,next)=>{
    let prdType=req.params.producttype;
    let productObj=await productCollectionObj.find({type:prdType}).toArray()
    if(productObj===null){
        res.send({message:"no product found "})
    }
    else{
        res.send({message:productObj})
    }
}))

// Get product by Name
productAPI.get("/getproducts/byname/:prdName",expressAsyncHandler(async(req,res,next)=>{
    let prdName=req.params.prdName;
    let productObj=await productCollectionObj.findOne({productname:prdName})
    if(productObj===null){
        res.send({message:"no product found "})
    }
    else{
        res.send({message:productObj})
    }
}))


//delete product by name
productAPI.delete('/deleteproducts/:productname',expressAsyncHandler(async(req,res,next)=>{
    let prodname=req.params.productname
    let deleted=await productCollectionObj.deleteOne({productname:prodname})
    if(deleted.deletedCount===0){
        res.send({message:"product not existed"})
    }
    else{
        // let userWishListCollectionObj=req.app.get('userWishListCollectionObj')
        // await userWishListCollectionObj.findOne({productname:prodname})
        // // await userWishListCollectionObj.delete({productname:prodname})
        // let userCartCollectionObj=req.app.get('userCartCollectionObj')
        // // await userWishListCollectionObj.delete({productname:prodname})
        res.send({message:`${prodname} deleted`})
    }
}))


// Search prd by name for Prd
productAPI.get('/getproducts/search/:prdName',expressAsyncHandler(async(req,res)=>{
    let searchterm=req.params.prdName
    let productlist=await productCollectionObj.find().toArray()
    let searchPrd=[]
    productlist.filter(prdObj=>{
        if(searchterm===""){
          return ''
        }
        else if(prdObj.productname.toLowerCase().includes(searchterm.toLowerCase())){
          searchPrd=[...searchPrd,prdObj]
        }
    })
    res.send({message:searchPrd})
}))

// Get products by filter
productAPI.post('/getproducts/filter',expressAsyncHandler(async(req,res)=>{
  let filterObj=req.body;
  let allPrd=await productCollectionObj.find({type:filterObj[1]}).toArray()
  let filterPrice=filterObj[0]
    //all Prd   
    if(filterPrice==="all"){
    res.send({message:allPrd})
    }
    // Prd Between 500 and 1000
    if(filterPrice==="above500"){
        let prd=[]
        allPrd.map(prdObj=>{
        if(parseInt(prdObj.price)>=500 && parseInt(prdObj.price)<=1000){
             prd=[...prd,prdObj]
         }
     })
     prd.sort(function(a, b) {
         var nameA =parseInt(a.price); 
         var nameB =parseInt(b.price); 
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         return 0;
       });
     res.send({message:prd})
    }
    // Prd between 1000 and 2000
    if(filterPrice==="above1000"){
        let prd=[]
        allPrd.map(prdObj=>{
         if(parseInt(prdObj.price)>=1000 && parseInt(prdObj.price)<=2000){
             prd=[...prd,prdObj]
         }
        })
        prd.sort(function(a, b) {
         var nameA =parseInt(a.price); 
         var nameB =parseInt(b.price); 
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         return 0;
       });
     res.send({message:prd})
    }
    //Above 2000 and 3000
    if(filterPrice==="above2000"){
     let prd=[]
     allPrd.map(prdObj=>{
         if(parseInt(prdObj.price)>=2000 && parseInt(prdObj.price)<=3000){
             prd=[...prd,prdObj]
         }
     })
     prd.sort(function(a, b) {
         var nameA =parseInt(a.price); 
         var nameB =parseInt(b.price); 
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         return 0;
       });
     res.send({message:prd})
    } 
    //Above 3000
    if(filterPrice==="above3000"){
     let prd=[]
     allPrd.map(prdObj=>{
         if(parseInt(prdObj.price)>=3000){
             prd=[...prd,prdObj]
         }
     })
     prd.sort(function(a, b) {
         var nameA =parseInt(a.price); 
         var nameB =parseInt(b.price); 
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         return 0;
       });
     res.send({message:prd})
    } 
}))










// Err handiling
productAPI.use((err,req,res,next)=>{
    res.send({message:err.message})
})

// Export
module.exports=productAPI;
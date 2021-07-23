// Create express server
const exp=require('express')
const app=exp()
const path=require('path')
const robots = require("express-robots-txt");
const expressSitemapXml = require('express-sitemap-xml')
// For DB link
require('dotenv').config()
// To Connect Front end backend
app.use(exp.static(path.join(__dirname,'./dist/')))
// Connect to DB
const mongoClient=require('mongodb').MongoClient
const databaseUrl=process.env.databaseUrl
mongoClient.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("err in db connection",err)
    }else{
      // Database obj
        let databaseObj=client.db("BouquetFlowerShop")
      // Collection Obj
        let userCollectionObj=databaseObj.collection("usercollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let adminCollectionObj=databaseObj.collection("admincollection")
        let userCartCollectionObj=databaseObj.collection("usercartcollection")
        let userWishListCollectionObj=databaseObj.collection("userwishlistcollection")
        let contactUsCollectionObj=databaseObj.collection("contactuscollection")
        let reviewCollectionObj=databaseObj.collection("reviewcollection")
        let myOrdersCollectionObj=databaseObj.collection("myordercollection")
        // Sharing collection obj to API
        app.set("userCollectionObj",userCollectionObj)
        app.set("productCollectionObj",productCollectionObj)
        app.set("adminCollectionObj",adminCollectionObj)
        app.set("userCartCollectionObj",userCartCollectionObj)
        app.set("userWishListCollectionObj",userWishListCollectionObj)
        app.set("contactUsCollectionObj",contactUsCollectionObj)
        app.set("reviewCollectionObj",reviewCollectionObj)
        app.set("myOrdersCollectionObj",myOrdersCollectionObj)
        console.log(" Database connected")
    }
})

// Importing API
const userAPI=require('./APIs/user-api')
const productAPI=require('./APIs/product-api')
const adminAPI=require('./APIs/Admin-api')
// To evaluate path to execute espcific api
app.use('/users',userAPI)
app.use('/products',productAPI)
app.use('/admin',adminAPI)

// For robots.txt
app.use(robots(__dirname + '/public/robots.txt'));

// For sitemap.xml
const staticURLs = [
  "/home", 
  "/aboutus",
  "/contactus",
  "/policy",
  "/terms",
  "/registration/login",
  "/registration/signup",
  "/productlist/Congratulations",
  "/productdetails/Pink%20Elan"
];
app.use(expressSitemapXml(getUrls, 'http://localhost:8080'))
async function getUrls () {
  return await staticURLs;
}




// Redirecting for Invalid path
app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./dist/index.html'),function(err){
      if(err){
          res.status(500).send(err)
      }
  })
})


// assign port
const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})

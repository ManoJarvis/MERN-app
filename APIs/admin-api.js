// Create mini exp app
const exp=require('express')
const adminAPI=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { ObjectID, ObjectId } = require('mongodb')
// parching API
adminAPI.use(exp.json())
let adminCollectionObj;
// Middleware to set adminCollectionObj
adminAPI.use('/',(req,res,next)=>{
    adminCollectionObj=req.app.get('adminCollectionObj')
    next()
})



// Create users for admin
adminAPI.post("/createadmin",expressAsyncHandler(async(req,res,next)=>{
    let newUser=req.body;
    let user=await adminCollectionObj.findOne({username:newUser.username})
    if(user===null){
        // hash the password
        let hashedpw= await bcryptjs.hash(newUser.password,7)
        // replace old pw with hashed pw
        newUser.password=hashedpw
        // newUser.profileImg=req.file.path;
        // Insert data into database
        await adminCollectionObj.insertOne(newUser)
        res.send({message:"user created successfully"})
    }else{
        res.send({message:"user already exist"})
    }
}))

// Admin Login
adminAPI.post("/login",expressAsyncHandler(async(req,res)=>{
    let user=req.body
    // check for username
    let dbuser=await adminCollectionObj.findOne({username:user.username})
    if(dbuser===null){
        res.send({message:"invalid username"})
    }else{
        // compare password
        let pwstatus=await bcryptjs.compare(user.password,dbuser.password)
        // if password not matched
        if(pwstatus===false){
            res.send({message:"invalid password"})
        }else{
            let token= await jwt.sign({username:user.username},process.env.secret,{expiresIn:120})
            delete dbuser.password
            res.send({message:"login successfull",token:token,user:dbuser})
        }
    }
}))

// Get users
adminAPI.get("/getusers",expressAsyncHandler(async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userlist=await userCollectionObj.find().toArray()
    res.send({message:userlist})
}))


//delete users
adminAPI.delete('/deleteuser/:username',expressAsyncHandler(async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let deleteduser=req.params.username
    let deleted=await userCollectionObj.findOne({username:deleteduser})
    if(deleted==null){
        res.send("user not existed")
    }
    else{
        // deleteing user
        await userCollectionObj.deleteOne({username:deleteduser})
        // deleting Cart
        let usercartCollectionObj=req.app.get("userCartCollectionObj")
        let cart=await usercartCollectionObj.find({username:deleteduser}).toArray()
        if(cart.length!==0){
            await usercartCollectionObj.deleteOne({username:deleteduser})    
        }
        // deleting wishlist
        let userWishListCollectionObj=req.app.get("userWishListCollectionObj")
        let wish=await userWishListCollectionObj.find({username:deleteduser}).toArray()
        if(wish.length!==0){
            await userWishListCollectionObj.deleteOne({username:deleteduser})
        }
        // Deleting Review
        let reviewCollectionObj=req.app.get("reviewCollectionObj")
        let review=await reviewCollectionObj.find({username:deleteduser}).toArray()
        if(review.length!==0){
            await reviewCollectionObj.deleteMany({username:deleteduser})
        }
        // deleting Myorders
        let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj")
        let orders=await myOrdersCollectionObj.find({username:deleteduser}).toArray()
        if(orders.length!==0){
            await myOrdersCollectionObj.deleteMany({username:deleteduser})
        }
        res.send({message:"user deleted"})
    } 
}))

// Get queries Info
adminAPI.get("/getqueries",expressAsyncHandler(async(req,res,next)=>{
    let contactUsCollectionObj=req.app.get("contactUsCollectionObj")
    let queries=await contactUsCollectionObj.find().toArray()
    res.send({message:queries})
}))

// Delete Query
adminAPI.delete('/deletequery/:_id',expressAsyncHandler(async(req,res,next)=>{
    let contactUsCollectionObj=req.app.get("contactUsCollectionObj")
    let _id=req.params._id
    let deleted=await contactUsCollectionObj.deleteOne({_id:ObjectId(_id)})
    if(deleted.deletedCount===0){
        res.send({message:" not existed"})
    }
    else{
        res.send({message:"query deleted"})
    }
}))




// Get pending or accepted review Details
adminAPI.get('/getreviews/:status',expressAsyncHandler(async(req,res)=>{
    let status=req.params.status
    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    let prd=await reviewCollectionObj.find().toArray()
    let filteredPrd=prd.filter(prdObj=>prdObj.status===status)
    if(filteredPrd.length===0){
        res.send({message:"No Reviews Found"})
    }
    else{
        res.send({message:filteredPrd})
    }
}))


// To change review status to accept
adminAPI.post('/acceptreview',expressAsyncHandler(async(req,res)=>{
    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    let reviewObj=req.body;
    let id=req.body._id;
    reviewObj.status="accepted"
    let filteredReview=await reviewCollectionObj.find(ObjectId(id)).toArray()
    filteredReview[0].status="accepted"
    await reviewCollectionObj.updateOne({_id:ObjectId(filteredReview[0]._id)},{$set:{...filteredReview[0]}})
    res.send({message:"Review Submitted"})
}))



//delete reviews
adminAPI.delete('/deletereview/:id',expressAsyncHandler(async(req,res,next)=>{
    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    let id=req.params.id
    console.log(id)
    let deleted=await reviewCollectionObj.deleteOne({_id:ObjectId(id)})
    console.log(deleted)
    if(deleted.deletedCount===0){
        res.send({message:"not existed"})
    }
    else{
        res.send({message:"review deleted"})
    }
}))


// Get Order Details
adminAPI.get('/getorders',expressAsyncHandler(async(req,res)=>{
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj")
    let myOrders=await myOrdersCollectionObj.find().toArray()
    let totalOrdObj=[];
    myOrders.map(ordObj=>{return ordObj.orders})
    .map(ordObj=>{return ordObj[0]})
    .map(ordObj=>{
        totalOrdObj=[...totalOrdObj,ordObj]
    })
    if(myOrders===null){
        res.send({message:"No orders found"})
    }
    else{
        res.send({message:totalOrdObj})
    }
}))








// Export
module.exports=adminAPI;
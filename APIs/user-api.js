// Create mini exp app
const exp=require('express')
const userAPI=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const checkToken=require('./middlewares/verifyToken')
// parching API
userAPI.use(exp.json())
let userCollectionObj;
let userCartCollectionObj;
let userWishListCollectionObj;
const multerObj=require('./middlewares/fileUpload')


// Middle ware to asign userCollectionObj
userAPI.use('/',(req,res,next)=>{
    userCollectionObj=req.app.get("userCollectionObj")
    userCartCollectionObj=req.app.get("userCartCollectionObj")
    userWishListCollectionObj=req.app.get("userWishListCollectionObj")
    next()
})

// Get users by name
userAPI.get("/getusers/:username",expressAsyncHandler(async(req,res,next)=>{
    let username=req.params.username
    let userDetails=await userCollectionObj.findOne({username:username})
    res.send({message:userDetails})
}))
// Create user
userAPI.post("/createusers",multerObj.single('dp'),expressAsyncHandler(async(req,res)=>{
    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObj.findOne({username:newUser.username})
    if(user===null){
        // hash the password
        let hashedpw= await bcryptjs.hash(newUser.password,7)
        // replace old pw with hashed pw
        newUser.password=hashedpw
        // add img path 
        newUser.profileImg=req.file.path;
        // Add usertype
        newUser.userType="user";
        // Insert data into database
        await userCollectionObj.insertOne(newUser)
        res.send({message:"user created successfully"})
    }else{
        res.send({message:"user already exist"})
    }
}))

// Update Data using Async
userAPI.post("/updateuser",expressAsyncHandler(async(req,res)=>{
    let modifieduser=req.body;
    let user=await userCollectionObj.findOne({username:modifieduser.username})
    // Updating Data
    user.email=modifieduser.email;
    user.mobile=modifieduser.mobile;
    if(modifieduser.password.length!==0){
        // Hashed password
        let hashedpw= await bcryptjs.hash(modifieduser.password,7)
        user.password=hashedpw
    }
    await userCollectionObj.updateOne({username:modifieduser.username},{$set:{...user}})
    res.send({message:"Data modified"})
}))

// user Login
userAPI.post("/login",expressAsyncHandler(async(req,res)=>{
    let credential=req.body
    // check for username
    let dbuser=await userCollectionObj.findOne({username:credential.username})
    if(dbuser===null){
        res.send({message:"invalid username"})
    }else{
        // compare password
        let pwstatus=await bcryptjs.compare(credential.password,dbuser.password)
        // if password not matched
        if(pwstatus===false){
            res.send({message:"invalid password"})
        }else{
            let token= await jwt.sign({username:credential.username},process.env.secret,{expiresIn:1200})
            delete dbuser.password
            res.send({message:"login successfull",token:token,user:dbuser})
        }
    }
}))

// Add Product to cart
userAPI.post('/addtocart',expressAsyncHandler(async(req,res)=>{
    let cartObj=req.body
    delete cartObj.prdObj.description
    cartObj.prdObj.quantity=1
    cartObj.prdObj.price=parseInt(cartObj.prdObj.price)
    cartObj.prdObj.totalprice=cartObj.prdObj.price
    // Checking weather user has prd or not
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    if(prdPresent===null){
        // IF user has no prd
        userCartCollectionObj.insertOne({username:cartObj.username,products:[
            {
            productname:cartObj.prdObj.productname,
            category:cartObj.prdObj.catagory,
            type:cartObj.prdObj.type,
            price:cartObj.prdObj.price,
            totalprice:cartObj.prdObj.totalprice,
            quantity:cartObj.prdObj.quantity,
            dateOfDelivery:cartObj.prdObj.dateOfDelivery,
            profileImage:cartObj.prdObj.profileImage
            }
        ]})
        res.send({message:"New Product Added"})
    }else{
        let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===cartObj.prdObj.productname)
        // If user has prd,but not the selected one
        if(filteredPrd.length===0){
            prdPresent.products.push(cartObj.prdObj)
            await userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
            res.send({message:"New Product Added"})
        }
        else{
            // If user has the selected prd, increase the count
            prdPresent.products.forEach((prdObj,ind) => {
                if(prdObj===filteredPrd[0]){
                    filteredPrd[0].quantity=filteredPrd[0].quantity+1
                    filteredPrd[0].totalprice=filteredPrd[0].totalprice+filteredPrd[0].price
                    prdPresent.products=[...prdPresent.products.slice(0,ind),filteredPrd[0],...prdPresent.products.slice(ind+1)]
                }
            });
            await userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
            res.send({message:"New Product Added"})
        }
    }
}))

// Remove product in cart
userAPI.post('/removefromcart',expressAsyncHandler(async(req,res)=>{
    let cartObj=req.body
    delete cartObj.prdObj.description
    // Getting the present data
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===cartObj.prdObj.productname)
    //If only 1Prd present 
    if(prdPresent.products.length===1){
        prdPresent.products.forEach((prdObj,ind)=>{
            // If quantity is One
            if(prdObj.quantity===1){
                res.send({message:"Quantity is 1"})
            }else{
            // If quantity is more than one
                    filteredPrd[0].quantity=filteredPrd[0].quantity-1
                    filteredPrd[0].totalprice=filteredPrd[0].totalprice-filteredPrd[0].price
                    prdPresent.products=[...prdPresent.products.slice(0,ind),filteredPrd[0],...prdPresent.products.slice(ind+1)]
                    userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
                    res.send({message:"quant is decreased"})
            }
        })
    }else{
        // If more then one prd
        prdPresent.products.map((prdObj,ind)=>{
            // If prd has only one count, leave it
            if(prdObj===filteredPrd[0] && prdObj.quantity===1){
                res.send({message:"quantity is 1"})
            }// If prd don't have quantity 1,decrease it
            else if(prdObj===filteredPrd[0] && prdObj.quantity>1){
                filteredPrd[0].quantity=filteredPrd[0].quantity-1
                filteredPrd[0].totalprice=filteredPrd[0].totalprice-filteredPrd[0].price
                prdPresent.products=[...prdPresent.products.slice(0,ind),filteredPrd[0],...prdPresent.products.slice(ind+1)]
                userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
                res.send({message:"quant is decreased"})
            }
        })
    }
}))


// Delete Prd from Cart

userAPI.post('/deletefromcart',expressAsyncHandler(async(req,res)=>{
    let cartObj=req.body
    // Getting the present data
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===cartObj.prdObj.productname)
    // if Only 1 prd is there
    if(prdPresent.products.length===1){
        userCartCollectionObj.deleteOne({username:cartObj.username})
        res.send({message:"Item Deleted from Cart"})
    }else{
        // Delete the selected one
    prdPresent.products.forEach((prdObj,ind)=>{
        // If prd don't have quantity 1,decrease it
        if(prdObj===filteredPrd[0]){
            prdPresent.products=[...prdPresent.products.slice(0,ind),...prdPresent.products.slice(ind+1)]
            userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
            res.send({message:"Item Deleted From Cart"})
        }
    })
    }
}))

// To get prduct in Cart
userAPI.get('/getproducts/fromcart/:username',expressAsyncHandler(async(req,res)=>{
    let username=req.params.username
    let prd= await userCartCollectionObj.findOne({username:username})
    if(prd===null){
        res.send({message:"product no found"})
    }else{
        res.send({message:prd})
    }
}))


// Add Product to wishlist
userAPI.post('/addtowishlist',expressAsyncHandler(async(req,res)=>{
    let prd=req.body
    // Checking weather user has prd or not
    let prdPresent=await userWishListCollectionObj.findOne({username:prd.username})
    if(prdPresent===null){
        // IF user has no prd
        userWishListCollectionObj.insertOne({username:prd.username,products:[prd.prdObj]})
        res.send({message:"New Product Added"})
    }else{
        let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===prd.prdObj.productname)
        // If user has prd,but not the selected one
        if(filteredPrd.length===0){
            prdPresent.products.push(prd.prdObj)
            await userWishListCollectionObj.updateOne({username:prd.username},{$set:{...prdPresent}})
            res.send({message:"New Product Added"})
        }
        else{
            res.send({message:"New Product Added"})
        }
    }
}))

// To get prduct in Wish
userAPI.get('/getproducts/fromwish/:username',expressAsyncHandler(async(req,res)=>{
    let username=req.params.username
    let prd= await userWishListCollectionObj.findOne({username:username})
    if(prd===null){
        res.send({message:"product no found"})
    }else{
        res.send({message:prd})
    }
}))

// Delete Prd From wishlist
userAPI.post('/deletefromwish',expressAsyncHandler(async(req,res)=>{
    let wishObj=req.body
    // Getting the present data
    let prdPresent=await userWishListCollectionObj.findOne({username:wishObj.username})
    let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===wishObj.prdObj.productname)
    // if Only 1 prd is there
    if(prdPresent.products.length===1){
        userWishListCollectionObj.deleteOne({username:wishObj.username})
        res.send({message:"Item Deleted from Cart"})
    }else{
        // Delete the selected one
    prdPresent.products.forEach((prdObj,ind)=>{
        if(prdObj===filteredPrd[0]){
            prdPresent.products=[...prdPresent.products.slice(0,ind),...prdPresent.products.slice(ind+1)]
            userWishListCollectionObj.updateOne({username:wishObj.username},{$set:{...prdPresent}})
            res.send({message:"Item Deleted From Cart"})
        }
    })
    }
}))

// Add Products to Myorders
userAPI.post('/myorders',expressAsyncHandler(async(req,res)=>{
   let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj")
    let myorders=req.body
    // Deleting unwanted info
        delete myorders[0].cardholdername
        delete myorders[0].cardnumber
        delete myorders[0].cvv
        delete myorders[0].expiry
    myorders[1].map(orders=>{
        delete orders.catagory
        delete orders.category
        delete orders.type
        delete orders.profileImage 
        
    })
    // To generate Order Id
    let orderId =parseInt(Date.now() + Math.random())
    // Creating myOrder obj
    let myOrder={
        username:myorders[2],
        orders:[{
        userDetails:{
            orderid:orderId,
            name:myorders[0].name,
            email:myorders[0].email,
            street:myorders[0].street,
            city:myorders[0].city,
            state:myorders[0].state,
            pincode:myorders[0].pincode,
            mobile:myorders[0].mobile,
            message:myorders[0].message,
            paymentStatus:"success"
            },
        productDetails:myorders[1],
        }]
    }
    await userCartCollectionObj.deleteOne({username:myorders[2]})
    await myOrdersCollectionObj.insertOne(myOrder)
    res.send({message:"Order Placed"})
}))

// Get myorder items

userAPI.get('/getorders/:username',expressAsyncHandler(async(req,res)=>{
 
    let myOrdersCollectionObj=req.app.get("myOrdersCollectionObj")
    let username=req.params.username
    let myOrders=await myOrdersCollectionObj.find({username:username}).toArray()
    let ord=[]
     if(myOrders.length<1){
         res.send({message:"No orders found"})
     }
     else{
        myOrders.map(ordObj=>{
            ord=[...ord,...ordObj.orders]
        })
        res.send({message:ord})
     }
}))


// Store Contact us Info
userAPI.post('/contactus',expressAsyncHandler(async(req,res)=>{
    let contactUsCollectionObj=req.app.get("contactUsCollectionObj")
    let contactus=req.body;
    await contactUsCollectionObj.insertOne(contactus)
    res.send({message:"Query Submitted"})
}))


// Store review Info
userAPI.post('/addreview',expressAsyncHandler(async(req,res)=>{
    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    let reviewObj=req.body;
    reviewObj.status="pending"
    await reviewCollectionObj.insertOne(reviewObj)
    res.send({message:"Review Submitted"})
}))


// Get review Details
userAPI.get('/getreviews/:prdName',expressAsyncHandler(async(req,res)=>{
    let prdName=req.params.prdName
    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    let prd=await reviewCollectionObj.find({productName:prdName}).toArray()
    let filteredPrd=prd.filter(prdObj=>prdObj.status==="accepted")
    if(filteredPrd.length===0){
        res.send({message:"No Reviews Found"})
    }
    else{
        res.send({message:filteredPrd})
    }
}))














// User Auth
userAPI.get('/auth',checkToken,(req,res)=>{
    res.send({message:"success"})
})

// Err handiling
userAPI.use((err,req,res,next)=>{
    res.send({message:err.message})
})

// Export
module.exports=userAPI;
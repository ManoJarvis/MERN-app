// Import Packages
import './css/App.css';
import {BrowserRouter,Link,Switch,Route,Redirect,useHistory} from 'react-router-dom'
import { useState,useEffect } from 'react';
import React,{Suspense} from 'react'
import axios from 'axios'
// Component Imports for userside
import NavBar from './components/Home/NavBar'
import AboutUs from './components/Home/AboutUs';
import ContactUs from './components/Home/ContactUs';
import Home from './components/Home'
import Registration from './components/registration/Registration';
import Category from './components/Home/Category';
import Letterbox from './components/Home/Letterbox';
import Addproducts from './components/admin/productManagement/Addproducts';
import Footer from './components/Home/Footer';
import ProductDetails from './components/product/ProductDetails';
import WishList from './components/user/WishList'
import UserProfile from './components/user/userProfile/UserProfile';
import Cart from './components/user/Cart';
import Checkout from './components/user/Checkout';
import MyOrders from './components/user/Myorders';
import Policy from './components/Home/TermsAndPolicy/Policy';
import Terms from './components/Home/TermsAndPolicy/Terms';

// Component for admin side
import AdminLogin from './components/admin/AdminLogin';
import AdminDashBoard from './components/admin/AdminDashBoard';
// Lazy Loading
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";
const override = css`
display: block;
margin-left:500px;
margin-bottom:500px;
margin-top:200px;`;
const ProductList=React.lazy(()=>
  import('./components/product/ProductList')
)


function App() {
  // User Auth
  // Get token
  let token=localStorage.getItem("token")
  // API url
  let apiURL="http://localhost:8080"
  // Create axios Obj
       let authAxios=axios.create({
        baseURL:apiURL,
        headers:{
            authorization:`bearer ${token}`
        }
    })
  
  useEffect(()=>{
      let userDetails=JSON.parse(localStorage.getItem('user'))
      authAxios.get('/users/auth')
      .then(res=>{
      let result=res.data.message
      if(result==="success"){
        if(userDetails.userType==="user"){
          loginStatus(true)
        }
        if(userDetails.userType==="admin"){
          setAdminStatus(true)
        }

      }
      else if(result==="Login Expired, Please Login again"){
        alert("Login Expired, Please Login again")
        loginStatus(false)
        setAdminStatus(false)
        localStorage.clear()
      }
      else if(result==="Token does not exist"){
        loginStatus(false)
        setAdminStatus(false)
        localStorage.clear()
      }
  }) 
  .catch(err=>alert(err))
  })



  //  Login Status
  let [loginMonitor,setLoginMonitor]=useState(false)
  const loginStatus=(status)=>{
    setLoginMonitor(status)    
  }

  // Cart Status
  let [cartMonitor,setCartMonitor]=useState(1)
  const setCartStatus=(status)=>{
      setCartMonitor(cartMonitor+1)
  }

  // Wish Status
  let [wishMonitor,setWishMonitor]=useState(1)
  const setWishStatus=(status)=>{
      setWishMonitor(wishMonitor+1)
  }

  // Category Monitor
  let [categoryMonitor ,setCategoryMonitor]=useState(1)
  const setCategoryStatus=(status)=>{
    setCategoryMonitor(categoryMonitor+1)
  }

  // Admin Monitor
  let [adminMonitor,setAdminMonitor]=useState(false)
  const setAdminStatus=(status)=>{
    setAdminMonitor(status)
  }

  // user details from localStorage
  let userDetails=JSON.parse(localStorage.getItem('user'))
  

  return (
  <div className="container-fluid">
    <BrowserRouter>
    <div className="">
      {/* Nav Bar */}
      {!adminMonitor?
      <NavBar loginMonitor={loginMonitor} setLoginMonitor={setLoginMonitor}
      cartMonitor={cartMonitor} wishMonitor={wishMonitor} setCategoryStatus={setCategoryStatus}/>:<h1></h1>}
    </div>
    {/* Nav Bar for Category */}
    {!adminMonitor?
            <Category class="cc" setCategoryStatus={setCategoryStatus}/>:<h1></h1>}
      <Switch>
            <Route path="/registration">
              <Registration loginStatus={loginStatus} />
            </Route>
            <Route path="/:username/wishlist">
              <WishList setWishStatus={setWishStatus}/>
            </Route>
            <Route path="/:username/cart">
              <Cart setCartStatus={setCartStatus}/>
            </Route>
            <Route path="/:username/checkout">
              <Checkout/>
            </Route>
            <Route path="/:username/myOrders">
              <MyOrders setCartStatus={setCartStatus}/>
            </Route>    
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/productlist/:prdList">
              <Suspense fallback={<PacmanLoader color={"#c71585"} css={override} size={50} />}>
                <ProductList categoryMonitor={categoryMonitor}/>
              </Suspense>
            </Route>
          <Route path={`/productdetails/:prdName`}>
                <ProductDetails setCartStatus={setCartStatus} setWishStatus={setWishStatus}categoryMonitor={categoryMonitor}  />
            </Route>
            <Route path="/addproducts">
              <Addproducts />
            </Route>
            <Route path="/admin">
              <AdminLogin setAdminStatus={setAdminStatus}/>
            </Route>
            <Route path="/adminprofile/admin">
              <AdminDashBoard setAdminStatus={setAdminStatus} setLoginMonitor={setLoginMonitor}/>
            </Route>
            <Route path="/policy">
              <Policy/>
            </Route>
            <Route path="/terms">
              <Terms/>
            </Route>
            <Route path="/userprofile/:username">
              <UserProfile />
            </Route>
            <Route path="/">
              <Redirect to="/home"/>
            </Route>
          
          </Switch>
        {/* Letter box component */}
        {!adminMonitor?
        <Letterbox />:<h1></h1>}
        {/* Footer Component */}
        {!adminMonitor?
        <Footer setCategoryStatus={setCategoryStatus} />:<h1></h1>}
        {/* Switch for routing */}
    </BrowserRouter>
   
  </div>
  );
}

export default App;

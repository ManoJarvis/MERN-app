import '../../css/NavBarCSS.css'
// Package Import
import {Link,useHistory} from 'react-router-dom'
import {Navbar,Dropdown,NavDropdown} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import axios from 'axios';

// Logo Import
import Logo from '../../logo.png'


function NavBar(props){
  let history=useHistory()
  // Login Monitor
  let loginMonitor=props.loginMonitor
  let setLoginMonitor=props.setLoginMonitor

  // object for prd and search
  let [productlist,setProductlist]=useState('')
  let [searchterm,setSearchterm]=useState('')
  
  // Cart Length
  let [cartLength,setCartLength]=useState(0)
  let cartMonitor=props.cartMonitor

  // Wish Length
  let [wishLength,setWishLength]=useState(0)
  let wishMonitor=props.wishMonitor

  // For search Update
  let setCategoryStatus=props.setCategoryStatus

  // Getting userData from local Storage
  let userDetails=JSON.parse(localStorage.getItem('user'))

  // Use Effect For Search
  useEffect(()=>{
    if(searchterm.length>=2){
      axios.get(`/products/getproducts/search/${searchterm}`)
      .then(res=>{
        setProductlist(res.data.message)
      })
    }
  },[searchterm])

  // UseEffect for Cart length Update
  useEffect(()=>{
    let userDetails=JSON.parse(localStorage.getItem('user'))
    if(userDetails!==null){
      axios.get(`/users/getproducts/fromcart/${userDetails.username}`)
      .then(res=>{
        if(res.data.message==="product no found"){
          setCartLength(0)
        }else{
          setCartLength(res.data.message.products.length)
        }
      })
      .catch(err=>console.log(err))
    }
  },[loginMonitor,cartMonitor])
  

  // UseEffect for wish length Update
  useEffect(()=>{
    let userDetails=JSON.parse(localStorage.getItem('user'))
    if(userDetails!==null){
      axios.get(`/users/getproducts/fromwish/${userDetails.username}`)
      .then(res=>{
        if(res.data.message==="product no found"){
          setWishLength(0)
        }else{
          setWishLength(res.data.message.products.length)
        }
      })
      .catch(err=>console.log(err))
    }
  },[loginMonitor,wishMonitor])

  // On logout
  const onLogout=()=>{
    setLoginMonitor(false)
    localStorage.clear();
    history.push('/home')
  }

  // On search Click
  const onSearchClick=(prdObj)=>{
    let prdName=prdObj.productname
    setCategoryStatus(true)
    history.push(`/productdetails/${prdName}`)
    setProductlist('')
  }

  // For Search clearing
  useEffect(()=>{
    let myUL=document.getElementById('myUL')
    document.addEventListener('click',(e)=>{
        e.stopPropagation()
        myUL.style.display="none"
    })
    let myInput=document.getElementById('myInput')
        myInput.addEventListener('click',(e)=>{
            e.stopPropagation()
        myUL.style.display="flex"
    })
  })

  

    return (
        <Navbar expand="lg" className="navClr shadow"> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Link className="nav-link" to="/home">
            <img className="navbar-brand" src={Logo} href="/" alt="Logo"/>
          </Link>
          <form className="form search-bar-form">
                <input className="form-control ms-sm-5" type="search" autoComplete="off"
                 placeholder="Search" aria-label="Search" id="myInput"
                  onChange={e=>{setSearchterm(e.target.value)}} />
                  {/* For Product Search */}
                  <ul id="myUL" className="list-group">
                 {productlist &&
                   productlist.map(prdObj=>{
                     return(
                      
                        <li className="list-group-item list-group-item-action"id="navc">
                          <p onClick={()=>onSearchClick(prdObj)}>{prdObj.productname}</p>
                        </li>
                     
                      )
                    })
                  }
                  </ul>
              </form>
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="col-lg-3">
            </div>
            <div className="col-lg-9">
            {/* Nav bar items */}
            <ul className="navbar-nav mt-2 mt-lg-0">
                {/* For Login and logout Functionality */}
                {
                  loginMonitor?
                  <li className="nav-item">
                    <NavDropdown className="text-center nav-link" align="end" title={
                      <div>
                      <span>{userDetails && <img className="profileImg" src={userDetails.profileImg} alt="Profile photo" width="40px"></img>}</span>
                      <span className="d-block">{userDetails && userDetails.username}</span></div>
                    }>
                      <li className="nav-item">
                        <Link className="nav-link text-center" to={`/userprofile/${userDetails.username}`}>My Profile</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-center" to={`/${userDetails.username}/myorders`}>My Orders</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-center" onClick={()=>onLogout()}>Logout</Link>
                      </li>
                    </NavDropdown>
                  </li>  
                  :
                  <li className="nav-item">
                    <Link className="nav-link text-center" to="/registration">
                    <span className="navicon">
                    <i class="fas fa-user-circle"></i>
                      </span>
                      <span className="d-block text-dark">SIGN IN</span>
                    </Link>
                  </li>
                  // For WishList
                }{userDetails &&
                <li className="nav-item">
                  <Link className="nav-link text-center" to={`/${userDetails.username}/wishlist`}>
                  <span className="navicon"><i class="fas fa-heart"></i></span>
                    <span className="d-block text-dark">WISHLIST({wishLength})</span>
                  </Link>
                </li>}
                <li className="nav-item">
                  {/* For Cart */}
                  {userDetails &&
                  <Link className="nav-link text-center" to={`/${userDetails.username}/cart`}>
                    <span className="navicon" > <i class="fas fa-shopping-bag"></i> </span>
                    <span className="d-block text-dark">CART({cartLength})</span>
                  </Link>}
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-center" to="/aboutus">
                  <span className="navicon"> <i class="fas fa-building"></i> </span>
                    <span className="d-block text-dark">ABOUT US</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-center" to="/contactus">
                  <span className="navicon"><i class="fas fa-address-card"></i></span>
                    <span className="d-block text-dark">CONTACT US</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Navbar.Collapse>
      </Navbar>
      
           )
}

export default NavBar
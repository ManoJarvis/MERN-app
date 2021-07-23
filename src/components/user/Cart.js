import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
 import '../../css/CartCSS.css'
 import cart from '../../imgs/cartImg.jpg'
 import {animateScroll as scroll} from 'react-scroll'

function Cart(props){
    let setCartStatus=props.setCartStatus
    let [cartObj,setCartObj]=useState([])
    let [pageMonitor,setPageMonitor]=useState(1)
    let [grandTotal,setGrandTotal]=useState(0)
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let history=useHistory()
    // For finding cart items
    useEffect(()=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        axios.get(`/users/getproducts/fromcart/${userDetails.username}`)
            .then(res=>{
                if(res.data.message.products===[]){
                    setCartObj(undefined)
                }else{
                    setCartStatus(true)
                    setCartObj(res.data.message.products)
                    setGrandTotal(0)
                }
            })
            .catch(err=>console.log(err))
    },[pageMonitor])

    // To Find Grand Total
    useEffect(()=>{
        let gt=0;
        if(cartObj!==undefined){
            cartObj.map((cartObj,ind)=>{
            gt+=cartObj.totalprice
            })
        }
        setGrandTotal(gt)
    },[cartObj])
  

    // Adding items to cart
    const addtoCart=(prdObj)=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        let username=userDetails.username
        let cartObj={username,prdObj}
         // Make req to save data in cart
         axios.post('/users/addtocart',cartObj)
         .then(res=>{
             setPageMonitor(pageMonitor+1)
         })
         .catch(err=>console.log(err))
    }
    // Remove Items from cart
    const removefromCart=(prdObj)=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        let username=userDetails.username
        let cartObj={username,prdObj}
        // Make Req to remove item from cart
        axios.post('/users/removefromcart',cartObj)
        .then(res=>{
            setPageMonitor(pageMonitor+1)
        })
        .catch(err=>console.log(err))
    }

    // Delete Items from Cart
    const deletefromCart=(prdObj)=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        let username=userDetails.username
        let cartObj={username,prdObj}
         // Make Req to Delete item from cart
         axios.post('/users/deletefromcart',cartObj)
         .then(res=>{
             alert(res.data.message)
             setCartStatus(5)
             setPageMonitor(pageMonitor+1)
         })
         .catch(err=>console.log(err))
    }

    // On Checkout 
    const onCheckout=()=>{
        history.push(`/${userDetails.username}/checkout`)
    }
    // To go to product page
    const onClickToProductPage=(prdName)=>{
        scroll.scrollToTop()
        history.push(`/productdetails/${prdName}`)
    }

    return(
        <div >
        <h1 className="text-center mt-2 mb-2"style={{fontWeight:'lighter'}}>My Cart</h1>
        <div className="container">
        {cartObj?
        <div className="row row-cols-1 row-cols-md-2">
            <div className="col col-md-8">
            {cartObj.map((prdObj,ind)=>{
                return(
                <div class="card mb-3 " >
                    <div class="row row-cols-1">
                        <div class="col-md-4">
                            <img src={prdObj.profileImage} class="img-fluid rounded-start w-100 h-100"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <FontAwesomeIcon icon={faTrashAlt} className="btdel"onClick={()=>deletefromCart(prdObj)} />
                                <h5 className="" id="pdnam"onClick={()=>onClickToProductPage(prdObj.productname)}>{prdObj.productname}</h5>
                                <p>₹{prdObj.price}</p>
                                <p>Catagory: {prdObj.type}</p>
                                <button type="button"className="btn" id="but" onClick={()=>removefromCart(prdObj)} >-</button>
                                <input type="number" id="but1"value={prdObj.quantity}></input>
                                <button type="button"className="btn" id="but2" onClick={()=>addtoCart(prdObj)}>+</button><br/>
                                <p>Total Price: ₹{prdObj.totalprice}</p>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
            <div className="col col-md-4">
                <div className="card">
                    <div className="card-header" >
                        <h4>Cart summary</h4>
                    </div>
                    <div className="card-body">
                        <p style={{fontSize:'20px'}}>Grand Total: ₹{grandTotal}</p>              
                        <button type="button" className="btn d-block mx-auto" id="lgbt"onClick={()=>onCheckout()}>CHECKOUT</button>
                    </div>
               </div>
            </div>
        </div>
        :
        <div className="text-center">
            <img src={cart} alt="Empty Cart" width="400px"></img>
            <h2 className="h2" style={{fontWeight:"lighter"}}>Hey, You have nothing in your cart. Let’s add gifts to your cart</h2>
        </div>
        }
        </div>
    </div>
    )}



export default Cart
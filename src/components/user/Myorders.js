import axios from "axios"
import { useEffect, useState } from "react"
import '../../css/App.css'
import cart from '../../imgs/myOrders.png'
function MyOrders(props){
    // Cart Count
    let setCartStatus=props.setCartStatus
    
    // order Details
    let [orderDetails,setOrderDetails]=useState([])

    // Get Order Details
    useEffect(()=>{
        let userDetails=JSON.parse(localStorage.getItem("user"))
        axios.get( `/users/getorders/${userDetails.username}`)
        .then(res=>{
            if(res.data.message==="No orders found"){
                setOrderDetails(false)
            }else{
                let temp=[];
                setCartStatus(true)
                res.data.message.map((order)=>{
                    temp=[...temp,...order.productDetails]
                })
                setOrderDetails(temp)
            }
        })
        .catch(err=>console.log(err))
    },[])

    


    return(
        <div>
        <h1 className="heading mb-5 mt-5 text-center" >My Orders</h1>
        <div className="row ms-2">
            {orderDetails?
                orderDetails.map((ordObj,ind)=>{
                    return(
                          <div className="col-md-3">
                        <div className="card mb-5 p-3" >
                         <div className="card-body">
                             <h5 className="card-title"style={{fontWeight:'normal'}}>{ordObj.productname}</h5>
                              <p className="card-text">price:₹{ordObj.price}</p>
                              <p className="card-text">Quantity: {ordObj.quantity}</p>
                              <p className="card-text">dateOfDelivery: {ordObj.dateOfDelivery}</p>
                              <p className="card-text">Totalprice:₹{ordObj.totalprice}</p>

                            </div>
                          </div>
                        </div>
                    )
                })     
            :
            <div className="text-center">
               <img src={cart} alt="Empty My Orders " width="400px"></img>
               <h3 className="mb-4" style={{fontWeight:'normal'}}>Hey, You have nothing in your Order. Let’s add gifts to your Orders</h3>
            </div>
        }
                            
                             
   </div></div>
    )
}

export default MyOrders
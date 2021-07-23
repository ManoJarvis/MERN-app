import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import cart from '../../imgs/cartImg.jpg'
import '../../css/App.css'
import {animateScroll as scroll} from 'react-scroll'

function WishList(props){
    let setWishStatus=props.setWishStatus
    let [wishObj,setWishObj]=useState('')
    let [pageMonitor,setPageMonitor]=useState(1)
    let history=useHistory()

    // For finding wishlist items
    useEffect(()=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        axios.get(`/users/getproducts/fromwish/${userDetails.username}`)
            .then(res=>{
                setWishObj(res.data.message.products)
            })
            .catch(err=>console.log(err))
    },[pageMonitor])

    // Deleting Wishlist item
    const deleteFromWish=(prdObj)=>{
        let userDetails=JSON.parse(localStorage.getItem('user'))
        let username=userDetails.username
        let cartObj={username,prdObj}
         // Make Req to Delete item from cart
         axios.post('/users/deletefromwish',cartObj)
         .then(res=>{
             alert(res.data.message)
             setWishStatus(true)
             setPageMonitor(pageMonitor+1)
         })
         .catch(err=>console.log(err))
    }

    // To go to product page
    const onClickToProductPage=(prdName)=>{
        scroll.scrollToTop()
        history.push(`/productdetails/${prdName}`)
    }


    return(
        <div>
            <h1 className="heading mb-5 mt-5 text-center">My Wishlist</h1>
                {wishObj?
                    wishObj.map((wishObj,ind)=>{
                        return(
                          
                            <div className="card wishlistcard mx-auto mb-5" >
                            <div className="row ">
                              <div className="col-md-4">
                                <img src={wishObj.profileImage} className="w-100" alt="" height=""/>
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                <FontAwesomeIcon icon={faTrashAlt} className="redicon float-right" onClick={()=>deleteFromWish(wishObj)} />
                                  <h5 className="prodname card-title" onClick={()=>onClickToProductPage(wishObj.productname)}>
                                      {wishObj.productname}
                                  </h5>
                                  <p className="card-text">₹{wishObj.price}</p>
                                  <p className="card-text">Catagory: {wishObj.type}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                            
                    
                        )
                    })     
                :
                <div className="text-center">
                    <img src={cart}alt="Empty Wishlist" width="400px" ></img>
                    <h2 className="h2" style={{fontWeight:"lighter"}}>Hey, You have nothing in your wishlist. Let’s add gifts to your wishlist</h2>
                </div>
                
            }
                                
                                 
       </div>
    )
}

export default WishList
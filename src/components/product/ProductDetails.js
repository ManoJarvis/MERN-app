import '../../css/ProductDetailsCSS.css'
// Import Packages
import axios from "axios"
import {Tabs,Tab} from 'react-bootstrap'
import {useEffect,useState} from 'react'
import {bindActionCreators} from 'redux'
import { faShippingFast,faStarHalfAlt,faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Importing Modules
import ReviewForm from './ReviewForm'
import ProductReview from './ProductReview'
import ScrollingContent from '../Home/ScrollingContent/ScrollingContent'

function ProductDetails(props){
    // To Get PrdName
    let url=useParams();
    // Cart Monitor
    let setCartStatus=props.setCartStatus
    let setWishStatus=props.setWishStatus
    // Search Monitor
    let categoryMonitor=props.categoryMonitor


    
    // PrdObj
    let [productobj,setproductobj]=useState('')
    // Scroll Monitor
    let [scrollMonitor,setScrollMonitor]=useState(true)
    
    // To get Date
    let minimum = new Date();
    minimum.setDate(minimum.getDate() + 3);
    const [selectedDate, setSelectedDate] = useState(minimum);
    

    // To fetch prd Data
    useEffect(()=>{
        axios.get(`/products/getproducts/byname/${url.prdName}`)
        .then(res=>{       
            setproductobj(res.data.message)     
        })
        .catch(err=>console.log(err.message))
    },[categoryMonitor,scrollMonitor])

    let history=useHistory();
    let userDetails=JSON.parse(localStorage.getItem('user'))
    

    // Addding prd to cart
    const addtoCart=(prdObj)=>{
        if(userDetails!==null){
            let username=userDetails.username
            prdObj.dateOfDelivery=selectedDate
            let cartObj={username,prdObj}
             // Make req to save data in cart
             axios.post('/users/addtocart',cartObj)
             .then(res=>{
                 let responseObj=res.data
                 setCartStatus(true)
                 alert(responseObj.message)
             })
             .catch(err=>console.log(err))
        }else{
            alert("Login to Access the Cart")
            history.push('/registration')
        }
        
    }
    // Adding prd to WishList
    const addtowish=(prdObj)=>{
        if(userDetails!==null){
            let username=userDetails.username
            let wishObj={username,prdObj}
             // Make req to save data in wishList
             axios.post('/users/addtowishlist',wishObj)
             .then(res=>{
                 let responseObj=res.data
                 setWishStatus(true)
                 alert(responseObj.message)
             })
             .catch(err=>console.log(err))
        }else{
            alert("Login to add Products to WishList")
        }
    }

    // moving to Checkout page
    const buyNow=(prdObj)=>{
        if(userDetails!==null){
            let username=userDetails.username
            prdObj.dateOfDelivery=selectedDate
            let cartObj={username,prdObj}
             // Make req to save data in cart
             axios.post('/users/addtocart',cartObj)
             .then(res=>{
                setCartStatus(true)
                history.push(`/${userDetails.username}/checkout`)     
             })
             .catch(err=>console.log(err))
        }else{
            alert("Login to Buy this product")
            history.push('/registration')
        }
    }    



    return(
        <div>
           <div className="row row-cols-1 row-cols-md-2">
               <div className="col text-center mt-4">
                   <img src={productobj.profileImage} alt={`${productobj.productname} img`} id="pdimg"className="w-75"/>
               </div>
               <div className="col mt-3">
                   <p className="pdn1">{productobj.productname}</p>
                   <h3 className="mb-3">₹{productobj.price}</h3>
                   <form >
                       {/* DOD */}
                       <label htmlFor="date"><strong>DATE OF DELIVERY:</strong></label><br></br>
                        <DatePicker selected={selectedDate}
                         onChange={date=>setSelectedDate(date)}
                         value={selectedDate} required={true}
                         placeholderText="dd/mm/yyyy"
                         minDate={minimum}
                         dateFormat="dd/MM/yyyy"
                         /> <br></br>        
                        {/* Add to Cart */}
                        <button type="button" className="btn sb1" onClick={()=>addtoCart(productobj)}
                        >ADD TO CART</button>
                        {/* Buy Now */}
                        <button type="button" className="btn sb1" onClick={()=>buyNow(productobj)}>BUY NOW</button><br/>
                        {/* Add to wishlist */}
                        <button type="button" id="ch" name="ch" value="wishlist" className="m-3 btn"
                        onClick={()=>addtowish(productobj)}>
                            <FontAwesomeIcon className=" heart" icon={faHeart}/>
                        </button>
                        <label htmlFor="ch">Add to Wishlist</label>
                    </form>
                    <h5 className="text-left"><strong className="cat1">catagory:</strong>{productobj.catagory}</h5>
                    <p className="des"><strong>description:</strong> {productobj.description}</p>
                </div>
            </div>
            {/* tabs */}
            <Tabs defaultActiveKey="ShippingDetails" transition={false} id="noanim-tab-example"className="mt-5">
                <Tab eventKey="ShippingDetails" title={
                     <span>
                      <FontAwesomeIcon icon={faShippingFast}/>ShippingDetails</span>
                }>
                    <div className="m-2 pt-5">
                        <p id="psd1">SHIPPING DETAILS</p>
                        <p className="mt-4 mb-5">All shipment and delivery will be done by road within BANGALORE. 
                        All orders placed before 5pm INDIAN time would be delivered on the same day within BANGALORE.
                        Notifications would be sent on confirmation and delivery through email. We have a free delivery
                        policy for all orders above INR 2399. Seperate charges are applicable for deliveries below 
                        INR 2399 mwntioned in the checkout page for particular location:<br/>
                        While we always strive to ensure that products are accurately 
                        represented in our photographs, from season to season and subject to availability,
                        our florists may be required to substitute one or more flowers for a variety of
                        equal or greater quality, appearance, and value</p>
                    </div>           
                </Tab>
                {/* Review */}
                <Tab eventKey="Review" title={
                    <span>
                        <FontAwesomeIcon icon={faStarHalfAlt}/>Review
                    </span>
                }>
                    <ReviewForm />
                </Tab>                 
            </Tabs>
            {/* Product Review */}
            <ProductReview />
            {/* Related Products */}
            <ScrollingContent productType={productobj.type} scrollMonitor={scrollMonitor} 
            setScrollMonitor={setScrollMonitor} heading="Related Products"/>
            
            
        </div>

    )
}


export default ProductDetails
    
            
        